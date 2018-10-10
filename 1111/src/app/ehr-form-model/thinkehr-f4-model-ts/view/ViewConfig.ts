import {FormObjectModel} from "./../model/FormObjectModel";
import {Label} from "./Label";
import {Size} from "./Size";
import {Layout} from "./Layout";
import {Field} from "./Field";
import {ThinkEhrUtil} from "./../ThinkEhrUtil";
import {ViewConfigParser} from "../parsing/ViewConfigParser";
import {EventDispatcher} from "../../event-dispatcher";
import {ModelEventDispatcher} from "../../ehr-model-event-dispatcher";
import {LabelSize} from "./LabelSize";
import {EhrModelEventType} from "../../ehr-model-event";
import {NodeModel} from "../../";
import {FormRepeatableElementModel} from "../model/FormRepeatableElementModel";
/**
 * Created by matjazhi on 14.4.2016.
 */

export class ViewConfig implements ModelEventDispatcher{

  model:FormObjectModel;
  label:Label;
  size:Size;
  layout:Layout;
  field:Field;
  hidden:boolean;
  readonly:boolean;
  min:number;
  max:number;
  tags = [];
  annotations:Object = {};
  datasource:Object = {};
  advanced:any = {};
  ehrFormScript: string[];
  //TODO test dispatching events
  eventDispatcher: EventDispatcher = new EventDispatcher();
  private _multiplicityStr:string;
  private keepVisibleIndexList: number[] = [];

  constructor() {}

  addEventListener(handlerFn:Function, eventName:EhrModelEventType):Function{
    return this.eventDispatcher.addEventListener(handlerFn, eventName);
  }

  getModel():FormObjectModel {
    return this.model;
  }

  setModel(model:FormObjectModel) {
    this.model = model;
  }

  getLabel():Label {
    return this.label;
  }

  setLabel(label:Label) {
    this.label = label;
  }

  getSize(hierarchy:boolean = true):Size {
    return this._getHierarchicalViewConfigProperty<Size>(hierarchy, "size", this.getSize);
  }

  setSize(size:Size) {
    this.size = size;
  }

  getLayout(hierarchy:boolean = true):Layout {
    return this._getHierarchicalViewConfigProperty<Layout>(hierarchy, "layout", this.getLayout);
  }

  setLayout(layout:Layout) {
    this.layout = layout;
  }

  getFields(forInput?:string):Field {
    var f;
    if (forInput !== undefined) {
      f = this.field?this.field[forInput]:null;
      if (!f) {
        f = null;
      }
    } else {
      var keyCount = ThinkEhrUtil.countProperties(this.field);
      //TODO loop over prop vals and return type Field - after component unit tests are written
      f = keyCount === 1 ? ThinkEhrUtil.getNthProperty(this.field, 0) : null;
      //TODO should 'input' be declared Field's property
      if (!f && this.field && this.field['input']) {
        f = this.field['input'];
      }
    }

    return f;
  }
/*///
  setField(field:Field):void {
    this.field = field;
  }

  getField():Field {
    return this.field;
  }*/

  isHidden():boolean {
    //if hidden prop true and keepList empty
    return !!this.hidden  && !this.keepVisibleIndexList.length;
  }

  getKeepVisibleIndexList():number[] {
    return this.keepVisibleIndexList;
  }

  setKeepVisibleIndexList(indexes:number[]) {
    if(indexes==null) {
      indexes = [];
    }
    this.keepVisibleIndexList=indexes;
    this.eventDispatcher.dispatchEvent(EhrModelEventType.EVENT_IS_HIDDEN, this.isHidden());
  }

  setHidden(hidden:boolean):void {
    this.hidden = !!hidden;
    this.eventDispatcher.dispatchEvent(EhrModelEventType.EVENT_IS_HIDDEN, this.isHidden());
  }

  isReadOnly():boolean {
    return !!this.readonly;
  }

  setReadOnly(readonly:boolean) {
    this.readonly = !!readonly;
    this.eventDispatcher.dispatchEvent(EhrModelEventType.EVENT_IS_READ_ONLY, this.isReadOnly());
  }

  isLabelHidden():boolean {
    return this.getSize(true).getLabel(true) === LabelSize.COLUMN_HIDDEN;
/*///
    if (this.size && this.size.label != null) {
      //console.log("llllllll",this.model.labelFor(null),this.model.descEl['viewConfig']['size'])
      /!*var valInt:number = parseInt(this.size.label);
       return !isNaN(valInt) && valInt == -1;*!/
      //TODO check if this is OK from the old code above
      return this.getSize(true).getLabel(true) === LabelSize.COLUMN_HIDDEN;
      //return this.size.getLabel(false) == null;
    }
    return false;*/
  }

  getMin(hierarchy:boolean = true):number {
    return this._getModelPropertyIfNotOwn<number>(hierarchy, "min", "getMin");
  }

  setMin(min:number):void {
    this.min = min;
  }

  getMax(hierarchy:boolean = true):number {
    return this._getModelPropertyIfNotOwn<number>(hierarchy, "max", "getMax");
  }

  setMax(max:number):void {
    this.max = max;
  }

  getMultiplicityString():string {
    if (!this._multiplicityStr) {
      var min:any = this.min, max:any = this.max;

      if (min == undefined || min < 0) min = "*";
      if (max == undefined || max < 0) max = "*";

      this._multiplicityStr = "[" + min + ".." + max + "]";
    }

    return this._multiplicityStr;
  }

  getTerminology():string {
    if (this.datasource && this.datasource['loadRemote']) {
      return this.datasource['loadRemoteUrl'] || this.datasource['terminologyLoaderService'] as string;
    }
    return null;
  }

  getTags():Array<string> {
    return this.tags;
  }

  hasTag(tag:string):boolean {
    return this.tags.indexOf(tag) >= 0;
  }

  getAnnotations():Object {
    return this.annotations;
  }

  hasAnnotation(key:string):boolean {
    return this.annotations[key] !== undefined;
  }

  annotationValue(key:string):string {
    return this.annotations[key];
  }

  setAnnotationValue(key:string, value:string):void {
    this.annotations[key]=value;
    this.eventDispatcher.dispatchEvent(EhrModelEventType.EVENT_ANNOTATION_VALUE, this.getAnnotations());
  }

  getTooltip(currentLanguage?:string):string{
    let ttp:string = this.annotationValue('tooltip');
    if(ttp==null && (this.model as any) && (this.model as any).localizedLabels) {
      ttp = (this.model as any).localizedLabels[currentLanguage];
    }
    return ttp;
  }

  setTooltip(value:string):void{
    this.setAnnotationValue('tooltip', value);
    this.eventDispatcher.dispatchEvent(EhrModelEventType.EVENT_TOOLTIP_VALUE, this.getTooltip());
  }

  getAdvanced():any {
    return this.advanced;
  }

  _getModelPropertyIfNotOwn <T>(hierarchy:boolean, property:string, getterProperty:string):T {
    if (hierarchy === false || this[property] != null) {
      return this[property];
    }

    if (this.model && this.model[getterProperty]) {
      return this.model[getterProperty].call(this.model);
    }

    return null;
  }

  _getHierarchicalViewConfigProperty<T>(hierarchy:boolean, property:string, getter:Function):T {
    if (hierarchy === false || this[property] != null) {
      return this[property];
    }
    if (this.model != null && this.model.getParentModel()) {
      return getter.call((<FormObjectModel> this.model.getParentModel()).getViewConfig(), true);
    }

    return null;
  }

  getEhrFormScript():string[]{
    let ehrFormScriptArr = this.ehrFormScript;
    if(!ehrFormScriptArr && this.hasAnnotation('ehrFormScript')) {
      ehrFormScriptArr = [this.annotationValue('ehrFormScript')];
    }
    return ehrFormScriptArr;
  }

  /*
   * @Override
   */
  toString() {
    return "thinkehr.f4.ViewConfig";
  }

}

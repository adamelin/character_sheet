/**
 * Created by matjazhi on 13.4.2016.
 */

import {Model} from './Model';
import {ViewConfig} from './../view/ViewConfig';
import {EhrContext} from './../EhrContext';
import {Label} from './../view/Label';
import {RmType} from './../RmType';
import {ThinkEhrUtil} from './../ThinkEhrUtil';
import {FormRepeatableElementModel} from './FormRepeatableElementModel';
import {ModelViewConfigParser} from '../parsing/ViewConfigParser';
import {FormRootModel} from "./FormRootModel";
import {EhrModelEventType} from "../../ehr-model-event";
import {NodeModel} from './NodeModel';
import {RmTypeModelValueGetter} from './RmTypeModelValueGetter';

export class FormObjectModel extends Model {

  static SEARCH_WITHIN_PARENT_CONTAINER = '__PARENT';

  id: string;
  formId: string;
  name: string;
  viewConfig: ViewConfig;
  valueNodeRef: any;
  valueNodeParentRef: any;
  dependencyNode: any;
  protected _childPathIdMap: Object;
  protected _context: EhrContext;
  protected _elementName: string;
  private __onModelRefreshed: any = [];
  protected _customComponentName: string;
  isGenericField: boolean;
  protected _childPathIdIndex: number;
  childPathId: string;
  rmType: RmType;
  private _validationErrors: string[] = [];

  private isValueSetCache: { [cacheCycleId: number]: boolean } = {};

  constructor(formDescriptionSnippet?: Object, viewConfigParser?: ModelViewConfigParser) {
    super(formDescriptionSnippet, viewConfigParser);
    if (this._childPathIdMap === undefined) {
      this._childPathIdMap = {};
    }
  }


  addEventListener(handlerFn: Function, eventName: EhrModelEventType): Function {
    if (eventName == EhrModelEventType.EVENT_IS_HIDDEN || eventName == EhrModelEventType.EVENT_IS_READ_ONLY || eventName == EhrModelEventType.EVENT_TOOLTIP_VALUE) {
      return this.getViewConfig().addEventListener(handlerFn, eventName);
    }
    return super.addEventListener(handlerFn, eventName);
  }


  setValuesFromObject(formDesc: Object, viewConfParser?: ModelViewConfigParser) {
    super.setValuesFromObject(formDesc, viewConfParser);
    if (formDesc['viewConfig']) {
      if (formDesc['viewConfig'] instanceof ViewConfig) {
        this.setViewConfig(formDesc['viewConfig']);
      } else if (ThinkEhrUtil.isObject(formDesc['viewConfig'])) {
        /// let viewConfigParser = new ViewConfigParser();
        if (!this.viewConfigParser && !viewConfParser) {
          throw new Error('viewConfig parser not defined');
        }
        if (!viewConfParser) {
          viewConfParser = this.viewConfigParser;
        }
        this.setViewConfig(viewConfParser.parseViewConfig(formDesc['viewConfig']));
      }
    }
  }

  getFormId(): string {
    return this.formId;
  }

  setFormId(id: string) {
    this.formId = id;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string) {
    this.name = name;
  }

  getViewConfig(): ViewConfig {
    return this.viewConfig;
  }

  setViewConfig(viewConfig: ViewConfig) {
    this.viewConfig = viewConfig;
    if (viewConfig) {
      viewConfig.setModel(this);
    }
  }

  getRmType(): RmType {
    return null;
  }

  getIsGenericField(): boolean {
    return this.isGenericField;
  }

  setIsGenericField(value: boolean) {
    this.isGenericField = value;
  }

  getPath(): string {
    return this.formId;
  }

  isValueModel(): boolean {
    return false;
  }

  isAttachableToValueNode(): boolean {
    return true;
  }

  getValueNodeRef(): Array<Object> {
    return this.valueNodeRef;
  }

  setValueNodeRef(valueNodeRef: Array<Object>): void {
    this.valueNodeRef = valueNodeRef;
  }

  getValueNodeParentRef(): Array<Object> {
    return this.valueNodeParentRef;
  }

  setValueNodeParentRef(valueNodeParentRef: Object): void {
    this.valueNodeParentRef = valueNodeParentRef;
  }

  // TODO is there any other getter for this??
  getValueNodeParentRefPropertyName(): string {
    let pathArr = this.getFormId().split('/');
    return pathArr[pathArr.length - 1];
  }

  getContext(): EhrContext {
    if (this._context) {
      return this._context;
    } else {
      let pm: Model = this.getParentModel();
      if (pm) {
        return (<FormObjectModel> this.getParentModel()).getContext();
      }

      return null;
    }
  }

  setContext(context: EhrContext) {
    this._context = context;
  }

  isContainer(): boolean {
    return false;
  }

  labelFor(language: string) {

    let lbl;
    if (this.getViewConfig() && this.getViewConfig().getLabel()) {

      let labelConfig: Label = this.getViewConfig().getLabel();
      if (labelConfig.isCustom()) {
        if (labelConfig.isUseLocalizations()) {
          lbl = labelConfig.getLocalization(language);
        }
        if (!lbl) {
          lbl = labelConfig.getValue();
        }
      } else if (labelConfig.isUseLocalizations()) {
        lbl = labelConfig.getLocalization(language);
      }
    }

    /*/// in FormRepeatableElementModel
     if (!lbl && this instanceof FormRepeatableElementModel) {
     let frem:FormRepeatableElementModel =  this;
     if (!lbl && (!labelConfig || !labelConfig.isCustom())) {
     lbl = frem.getLocalizedName(language);
     }
     if (!lbl) {
     lbl = frem.getLocalizedName();
     if (!lbl) {
     lbl = this.getName();
     }
     }
     }*/

    return lbl;
  }

  descriptionFor(language: string) {

    let descr;
    if (this.getViewConfig() && this.getViewConfig().getLabel()) {

      let labelConfig: Label = this.getViewConfig().getLabel();
      if (labelConfig.isCustom()) {
        if (labelConfig.isUseLocalizations()) {
          descr = labelConfig.getLocalization(language);
        }
        if (!descr) {
          descr = labelConfig.getValue();
        }
      } else if (labelConfig.isUseLocalizations()) {
        descr = labelConfig.getLocalization(language);
      }
    }

    /*/// in FormRepeatableElementModel
     if (!lbl && this instanceof FormRepeatableElementModel) {
     let frem:FormRepeatableElementModel =  this;
     if (!lbl && (!labelConfig || !labelConfig.isCustom())) {
     lbl = frem.getLocalizedName(language);
     }
     if (!lbl) {
     lbl = frem.getLocalizedName();
     if (!lbl) {
     lbl = this.getName();
     }
     }
     }*/

    return descr;
  }

  getContainerChildModels(withModelPath?: string): Array<FormObjectModel> {
    return this.getChildModelsMatching(function (model: FormObjectModel) {
      let isContainer = model.isContainer();
      if (withModelPath) {
        return isContainer && model.getPath() === withModelPath;
      }
      return isContainer;
    }) as Array<FormObjectModel>;
  }

  /* Override */
  addChildModel(model: FormObjectModel): void {
    super.addChildModel(model);
    this._increaseChildPathIdIndexFor(model);
    this.processDependenciesFromRoot();
  }

  /* Override */
  insertChildModelAt(index: number, model: FormObjectModel, muteEvent?: boolean): void {
    super.insertChildModelAt(index, model, muteEvent);
    this._increaseChildPathIdIndexFor(model);
    this.processDependenciesFromRoot();
  }

  insertChildModelAfterLastOfSamePath(model: FormObjectModel, insertAsLastIfNotFound: boolean): void {
    let lastChildIndex: number = -1;
    for (let i = 0; i < this.getChildCount(); i++) {
      let child: FormObjectModel = <FormObjectModel>this.getChildModel(i);
      if (child.getPath() === model.getPath()) {
        lastChildIndex = i;
      }
    }

    if (lastChildIndex >= 0) {
      this.insertChildModelAt(lastChildIndex + 1, model);
    } else if (insertAsLastIfNotFound) {
      this.addChildModel(model);
    }

  }

  moveChildPosition(model: FormObjectModel, toIndexNr: number = 0): void {
    this.removeChildModel(model, true);
    const len = this.getChildModels().length;
    if (!(toIndexNr < len)) {
      toIndexNr = len;
    }
    this.insertChildModelAt(toIndexNr, model, false);
  }

  /* Override */
  removeChildModel(model: FormObjectModel, muteEvent?: boolean): void {
    super.removeChildModel(model, muteEvent);
    this.processDependenciesFromRoot();
  }

  /* Override */
  removeFromParent(): void {
    let pm: FormObjectModel = <FormObjectModel>this.getParentModel();
    ///console.log("RRRRRemoveFF FOM")
    if (pm) {
      super.removeFromParent();
      this.processDependenciesFromRoot();
    }
  }

  destroy(): void {
    const model: FormObjectModel = this;
    model.removeFromParent();

    var parentValRef = model.getValueNodeParentRef();
    var valRef = model.getValueNodeRef();
    if (parentValRef && valRef) {
      if (ThinkEhrUtil.isArray(parentValRef)) {
        var index = parentValRef.indexOf(valRef);
        if (index >= 0) {
          parentValRef.splice(index, 1);
        }
      }
    }
  }

  _increaseChildPathIdIndexFor(model: FormObjectModel): number {
    let path: string = model.getPath() ? model.getPath() : 'none';
    if (this._childPathIdMap[path] !== undefined) {
      this._childPathIdMap[path] += 1;
    } else {
      this._childPathIdMap[path] = 0;
    }

    let idIndex = this._childPathIdMap[path];
    model._childPathIdIndex = idIndex;

    return idIndex;
  }

  //TODO check if this is unique when multiple forms exist on page - prepend ehrForm element id
  getUniqueId(): string {
    if (!this.childPathId) {
      if (!this.getPath()) {
        this.childPathId = null;
      } else {
        let index: number = this._childPathIdIndex === undefined ? 0 : this._childPathIdIndex;
        let modelPath: string = this.getPath();
        let p: string = modelPath + ':' + index.toString();
        let parent: FormObjectModel = <FormObjectModel>this.getParentModel();
        while (parent != null) {
          if (!parent.getPath() || parent.getRmType() === RmType.FORM_DEFINITION) {
            parent = null;
          } else {
            index = parent._childPathIdIndex === undefined ? 0 : parent._childPathIdIndex;
            let parentPath = parent.getPath();
            if (p.indexOf(parentPath) === 0) {
              let parentPart = p.substring(0, parentPath.length);
              p = parentPart + ':' + index + p.substr(parentPath.length);
            } else {
              p = parentPath + ':' + index + '/' + p;
            }
            parent = <FormObjectModel>parent.getParentModel();
          }
        }

        this.childPathId = p;
      }
    }
    return this.childPathId;
  }

  getSanitizedUniqueId(multiIndex?: number): string {
    let uniqueId: string = this.getUniqueId();

    if (!uniqueId) {
      return null;
    }

    return ThinkEhrUtil.sanitizeName(uniqueId) + (multiIndex === undefined ? '' : '_multi-id_' + multiIndex);
  }

  getTags(): Array<string> {
    return this.getViewConfig().getTags();
  }

  hasTag(tag: string): boolean {
    /*TODO is this viable fix?*/
    let viewConfig: ViewConfig = this.getViewConfig();
    return viewConfig ? viewConfig.hasTag(tag) : false;
    // return this.getViewConfig().hasTag(tag);
  }

  getAnnotations(): Object {
    return this.getViewConfig().getAnnotations();
  }

  hasAnnotation(key: string): boolean {
    return this.getViewConfig().hasAnnotation(key);
  }

  annotationValue(key: string): string {
    return this.getViewConfig().annotationValue(key);
  }

  getAnnotationValue(key: string): string {
    return this.annotationValue(key);
  }

  setAnnotationValue(key: string, value: string): void {
    this.getViewConfig().setAnnotationValue(key, value);
  }

  getElementName(): string {
    if (!this._elementName) {
      let sUid: string = this.getSanitizedUniqueId();
      this._elementName = sUid ? sUid : ThinkEhrUtil.guid();
    }

    return this._elementName;
  }

  setElementName(elementName: string): void {
    this._elementName = elementName;
  }

  getElementNameChain(): Array<string> {
    let chain = [this.getElementName()];
    let pm: FormObjectModel = this.getParentModel() as FormObjectModel;
    while (pm) {
      if (pm.isContainer() && pm.getRmType() !== RmType.FORM_DEFINITION && pm.getElementName()) {
        chain.splice(0, 0, pm.getElementName());
      }

      pm = pm.getParentModel() as FormObjectModel;
    }

    return chain;
  }

// TODO set type
  getDependencyNode(): any {
    return this.dependencyNode;
  }

  setDependencyNode(dependencyNode: any) {
    this.dependencyNode = dependencyNode;
  }

  processDependenciesFromRoot(): void {
    return;
    // dependencies deprecated
    /*let rm: FormObjectModel = this.getRootModel() as FormObjectModel;
    if (rm) {
      let dn = rm.getDependencyNode();
      if (dn) {
        dn.process({});
      }
    }*/
  }

  findSuccessorsWithAqlPath(aqlPath: string): Array<NodeModel> {
    let result: Array<NodeModel> = [];

    this._findSuccessorsWithAqlPathRecursive(aqlPath, result);

    return result;
  }

  private _findSuccessorsWithAqlPathRecursive(path: string, result: Array<NodeModel>): void {
    for (let i = 0; i < this.getChildCount(); i++) {
      let childModel: NodeModel = this.getChildModel(i) as NodeModel;
      if (childModel.getAqlPath && childModel.getAqlPath() === path || (childModel['getDelegateModel'] && childModel['getDelegateModel']() && childModel['getDelegateModel']().getAqlPath && childModel['getDelegateModel']().getAqlPath() === path)) {
        result.push(childModel);
      }

      childModel._findSuccessorsWithAqlPathRecursive(path, result);
    }
  }

  findSuccessorWithChildPathId(path: string): NodeModel {
    let found: NodeModel;
    for (let i = 0; i < this.getChildCount(); i++) {
      let childModel: NodeModel = this.getChildModel(i) as NodeModel;
      if (childModel.childPathId === path || (childModel['getDelegateModel'] && childModel['getDelegateModel']() && childModel['getDelegateModel']().childPathId === path)) {
        return childModel;
      }
      found = childModel.findSuccessorWithChildPathId(path);
      if (found) {
        return found;
      }
    }
    return null;
  }

  findAncestorWithPath(path: string): FormObjectModel {
    let pm: FormObjectModel = this.getParentModel() as FormObjectModel;
    while (pm) {
      if (pm.getPath() === path || (pm['getDelegateModel'] && pm['getDelegateModel']().getPath() === path)) {//instanceof breaks the prototype chain inheritance / (pm instanceof CustomModel && pm.getDelegateModel().getPath()===path)) {
        return pm;
      }

      pm = pm.getParentModel() as FormObjectModel;
    }

    return null;
  }

  // TODO write tests
  findMultiAncestor(includeCurrent = false): FormRepeatableElementModel {
    let pm: any = includeCurrent ? this : this.getParentModel();
    while (pm) {
      // TODO how to solve
      if (pm['isMulti'] && pm['isMulti']()) {
        return pm as FormRepeatableElementModel;
      }

      pm = pm.getParentModel();
    }

    return null;
  }

  // TODO write tests
  findAncestorContainer(includeCurrent = false): FormObjectModel {
    let pm: FormObjectModel = includeCurrent ? this : this.getParentModel() as FormObjectModel;
    while (pm) {
      if (pm.isContainer()) {
        return pm;
      }

      pm = pm.getParentModel() as FormObjectModel;
    }

    return null;
  }

  findChildWithPath(path: string, index?: number): FormObjectModel {
    if (this.getChildCount() > 0) {
      let ic = 0;
      for (let i = 0; i < this.getChildCount(); i++) {
        let childModel: FormObjectModel = this.getChildModel(i) as FormObjectModel;
        if (childModel.getPath() === path || (childModel['getDelegateModel'] && childModel['getDelegateModel']().getPath() === path)) {
          if (index === undefined) {
            return childModel;
          } else {
            if (ic++ === index) {
              return childModel;
            }
          }
        }
      }
    }

    return null;
  }

  findChildrenWithPath(path: string): Array<FormObjectModel> {
    let children = [];
    for (let i = 0; i < this.getChildCount(); i++) {
      let childModel: FormObjectModel = this.getChildModel(i) as FormObjectModel;
      if (childModel.getPath() === path || (childModel['getDelegateModel'] && childModel['getDelegateModel']().getPath() === path)) {
        children.push(childModel);
      }
    }

    return children;
  }

  findSuccessorWithPath(path: string): FormObjectModel {
    for (let i = 0; i < this.getChildCount(); i++) {
      let childModel: FormObjectModel = this.getChildModel(i) as FormObjectModel;
      if (childModel.getPath() === path || (childModel['getDelegateModel'] && childModel['getDelegateModel']().getPath() === path)) {
        return childModel;
      } else {
        let cm = childModel.findSuccessorWithPath(path);
        if (cm != null) {
          return cm;
        }
      }
    }

    return null;
  }

  findSuccessorWithTag(tag: string): FormObjectModel {
    for (let i = 0; i < this.getChildCount(); i++) {
      let childModel: FormObjectModel = this.getChildModel(i) as FormObjectModel;
      if (childModel.hasTag(tag) || (childModel['getDelegateModel'] && childModel['getDelegateModel']().hasTag(tag))) {
        return childModel;
      } else {
        let cm = childModel.findSuccessorWithTag(tag);
        if (cm != null) {
          return cm;
        }
      }
    }

    return null;
  }

  findSuccessorsWithPath(path: string): Array<FormObjectModel> {
    let result: Array<FormObjectModel> = [];

    this._findSuccessorsWithPathRecursive(path, result);

    return result;
  }

  private _findSuccessorsWithPathRecursive(path: string, result: Array<FormObjectModel>): void {
    for (let i = 0; i < this.getChildCount(); i++) {
      let childModel: FormObjectModel = this.getChildModel(i) as FormObjectModel;
      if (childModel.getPath() === path || (childModel['getDelegateModel'] && childModel['getDelegateModel']().getPath() === path)) {
        result.push(childModel);
      }

      childModel._findSuccessorsWithPathRecursive(path, result);
    }
  }

  findSuccessorsWithTag(tag: string): Array<FormObjectModel> {
    let result: Array<FormObjectModel> = [];

    this._findSuccessorsWithTagRecursive(tag, result);

    return result;
  }

  private _findSuccessorsWithTagRecursive(tag: string, result: Array<FormObjectModel>): void {
    for (let i = 0; i < this.getChildCount(); i++) {
      let childModel: FormObjectModel = this.getChildModel(i) as FormObjectModel;
      if (childModel.hasTag(tag) || (childModel['getDelegateModel'] && childModel['getDelegateModel']().hasTag(tag))) {
        result.push(childModel);
      }

      childModel._findSuccessorsWithTagRecursive(tag, result);
    }
  }

  findAncestorWithTag(tag: string, includeCurrent: boolean): FormObjectModel {
    let currModel: FormObjectModel = includeCurrent ? this : this.getParentModel() as FormObjectModel;

    while (currModel) {
      if (currModel.hasTag(tag)) {
        return currModel;
      }

      currModel = currModel.getParentModel() as FormObjectModel;
    }

    return null;
  }

  //TODO test
  findModelWithTag(tagName: string, searchFromRootOnly?: boolean, disableSearchFromRootFallback?: boolean): FormObjectModel {
    if (this.getViewConfig().hasAnnotation(tagName)) {
      //this model has custom annotation - use its value as search tagName
      tagName = this.getViewConfig().annotationValue(tagName);
      if (!disableSearchFromRootFallback) {
        searchFromRootOnly = true;
      }
    }

    if (!searchFromRootOnly) {
      var searchFromModel = this.findAncestorContainer(true);
      if (searchFromModel) {
        var modelWithTagWithinFieldset = searchFromModel.findSuccessorWithTag(tagName);
        if (modelWithTagWithinFieldset) {
          return modelWithTagWithinFieldset;
        }
      }
      var ancestorModelWithTag = this.findAncestorWithTag(tagName, true);
      if (ancestorModelWithTag) {
        return ancestorModelWithTag;
      }
    }

    return (<FormRootModel>this.getRootModel()).findSuccessorWithTag(tagName);
  }

  //TODO test
  findModelsWithTag(tagName: string, searchWithinContainerTag?: string): FormObjectModel[] {
    if (this.getViewConfig().hasAnnotation(tagName)) {
      //this model has custom annotation - use its value as search tagName
      tagName = this.getViewConfig().annotationValue(tagName);
    }

    if (searchWithinContainerTag) {
      var searchWithinModel;
      if (searchWithinContainerTag === FormObjectModel.SEARCH_WITHIN_PARENT_CONTAINER) {
        searchWithinModel = this.findAncestorContainer(true);
      } else {
        searchWithinModel = this.getRootModel().findSuccessorWithTag(searchWithinContainerTag);
      }
      if (searchWithinModel) {
        var modelWithTagWithinFieldset = searchWithinModel.findSuccessorsWithTag(tagName);
        return modelWithTagWithinFieldset ? modelWithTagWithinFieldset : [];
      }
      /*var ancestorModelWithTag = this.findAncestorWithTag(tagName, true);
      if (ancestorModelWithTag) {
        return [ancestorModelWithTag];
      }*/
    } else {
      return (<FormRootModel>this.getRootModel()).findSuccessorsWithTag(tagName);
    }
  }

  /*

    findModelsWithTag(tagName: string, searchFromRootOnly?: boolean, disableAnnTagNamesFromRoot?: boolean):FormObjectModel[] {
      if (this.getViewConfig().hasAnnotation(tagName)) {
        //this model has custom annotation - use its value as search tagName
        tagName = this.getViewConfig().annotationValue(tagName);
        if (!disableAnnTagNamesFromRoot) {
          searchFromRootOnly = true;
        }
      }

      if (!searchFromRootOnly) {
        var searchFromModel = this.findAncestorContainer(true);
        if (searchFromModel) {
          var modelWithTagWithinFieldset = searchFromModel.findSuccessorsWithTag(tagName);
          if (modelWithTagWithinFieldset) {
            return modelWithTagWithinFieldset;
          }
        }
        /!*var ancestorModelWithTag = this.findAncestorWithTag(tagName, true);
        if (ancestorModelWithTag) {
          return [ancestorModelWithTag];
        }*!/
      }
  console.log("mmmmmmmmmmm")
      return (<FormRootModel>this.getRootModel()).findSuccessorsWithTag(tagName);
    }
  */

  findClosestWithPath(path: string): FormObjectModel {
    let m: FormObjectModel = this;

    while (m) {
      let s: FormObjectModel = m.findSuccessorWithPath(path) as FormObjectModel;
      if (s) {
        return s;
      }

      m = m.getParentModel() as FormObjectModel;
    }

    return null;
  }

  findAncestorWithRmType(rmTypeEnum: RmType, includeCurrent = false): FormObjectModel {
    let currModel: FormObjectModel = includeCurrent ? this : this.getParentModel() as FormObjectModel;

    while (currModel) {
      if (currModel.getRmType() === rmTypeEnum) {
        return currModel;
      }

      currModel = currModel.getParentModel() as FormObjectModel;
    }

    return null;
  }

  onModelRefreshed(f: Function): void {
    this.__onModelRefreshed.push(f);
  }

  removeOnModelRefreshed(f: Function): void {
    this.__onModelRefreshed.splice(this.__onModelRefreshed.indexOf(f), 1);
  }

  _triggerModelRefreshed() {
    for (let i = 0; i < this.__onModelRefreshed.length; i++) {
      let f = this.__onModelRefreshed[i];
      f(this);
    }
  }

  getCustomFunction(): string {
    if (!this._customComponentName && (this.hasAnnotation('function') || this.hasAnnotation('component'))) {
      this._customComponentName = this.annotationValue('component') || this.annotationValue('function');
    }
    return this._customComponentName;
  }

  getCustomComponentId(): string {
    return this.getCustomFunction();
  }

  isCustomFunctionCustomComponent(): boolean {
    return !!this.getCustomComponentId(); /// || (new ThinkEhrModelParser(rmTypeModelDictionary) ).isCustomFunctionCustomComponent(this.getCustomFunction(), this.hasTag('custom'));
  }

  setCustomFunction(globalCustomFuncName: string): void {
    this._customComponentName = globalCustomFuncName;
  }

  isValueSet(cacheCycleId?: number) {
    if (this.isContainer()) {
      if (cacheCycleId && this.isValueSetCache[cacheCycleId] !== undefined) {
        return this.isValueSetCache[cacheCycleId];
      }
      let someSet = this.getChildModels().some((child: Model) => {
        return (child as FormObjectModel).isValueSet(cacheCycleId);
      });
      if (cacheCycleId) {
        this.isValueSetCache[cacheCycleId] = someSet;
      }
      return someSet;
    } else {

      if (cacheCycleId && this.isValueSetCache[cacheCycleId] !== undefined) {
        return this.isValueSetCache[cacheCycleId];
      }

      let vals: any[] = RmTypeModelValueGetter.getValue(this) as any[];

      let retIsValSet: boolean;

      if (ThinkEhrUtil.isArray(vals)) {
        if (vals.length === 0) {
          retIsValSet = false;
        }

        if (retIsValSet === undefined && this.getRmType() === RmType.DV_BOOLEAN) {
          let bVAl = vals[0];
          retIsValSet = bVAl === null || bVAl === true || bVAl === false;
        }

        if (retIsValSet === undefined) {
          retIsValSet = vals.some((val: any) => {
            if (ThinkEhrUtil.isObject(val)) {

              switch (this.getRmType()) {
                case RmType.DV_PROPORTION:
                  return val.hasOwnProperty('numerator') && val.hasOwnProperty('denominator') ? this.evaluateValueSet(val.numerator) && this.evaluateValueSet(val.denominator) : true;

                case RmType.DV_QUANTITY:
                  return val.hasOwnProperty('magnitude') ? this.evaluateValueSet(val.magnitude) : true;

                case RmType.DV_CODED_TEXT:
                  return this.evaluateValueSet(val.value);

                case RmType.CUSTOM:
                  return this['getDelegateModel']().isValueSet(cacheCycleId);
                default:
                  if (val.hasOwnProperty('value')) {
                    return this.evaluateValueSet(val.value);
                  }
                  break;
              }

              throw new Error('Can not resolve if isValueSet val=' + val);

            }
            return this.evaluateValueSet(val);
            ///throw new Error('value should be object but is='+JSON.stringify(val))
          });
        }

        if (cacheCycleId) {
          this.isValueSetCache[cacheCycleId] = retIsValSet;
        }
        return retIsValSet;
      }
      throw new Error('value should be array');
    }
  }

  private evaluateValueSet(val: any): boolean {
    if (!ThinkEhrUtil.isString(val) && isNaN(val)) {
      return false;
    }
    return !isNaN(parseFloat(val)) || (val != null && val !== '');
  }


  isChildStructuredRequired(forModel: FormRepeatableElementModel, cacheCycleId?: number): boolean {
    if (forModel.isInitRequired() && !forModel.isValueSet(cacheCycleId)) {
      let childModelsExcluding = this.getChildModels().filter(m => m !== forModel);
      const anySiblingHasValue: boolean = childModelsExcluding.some((model: FormRepeatableElementModel) => {
        return model.isValueSet(cacheCycleId);
      });
      // check if parent container is required
      const parentRequired: boolean = anySiblingHasValue ? false : this.isParentRequired(forModel);

      return anySiblingHasValue || parentRequired;
    }
    // if container - is it required even if empty
    if (forModel['isContainer'] && forModel['isContainer']()) {
      return forModel.isInitRequired();
    }
    return false;
  }

  isParentRequired(ofModel: Model): boolean {
    const p = ofModel.getParentModel();
    if (p) {
      if (!!p['isRequired'] && p['isRequired']()) {
        return true;
      }
    }
    return false;
  }

  addValidationErrors(valErrors: string[]) {
    const oldLen = this._validationErrors.length;
    valErrors.forEach((valErr: string) => {
      if (!this._validationErrors.some(modelVErr => modelVErr === valErr)) {
        this._validationErrors.push(valErr);
      }
    });
    if (oldLen !== this._validationErrors.length) {
      this.eventDispatcher.dispatchEvent(EhrModelEventType.EVENT_MODEL_VALIDATION_CHANGE, {
        model: this,
        validationErrors: this._validationErrors
      });
    }
  }

  set validationErrors(errorIds: string[]) {
    if ( !(this._validationErrors.length === errorIds.length
        && errorIds.every(paramErrId => this._validationErrors.some(modelEId => modelEId === paramErrId)))) {
      this._validationErrors = errorIds;
      this.eventDispatcher.dispatchEvent(EhrModelEventType.EVENT_MODEL_VALIDATION_CHANGE, {
        model: this,
        validationErrors: this._validationErrors
      });
    }
  }

  get validationErrors(): string[] {
    return this._validationErrors.slice();
  }

  /*
   * @Override
   */
  toString() {
    return 'FormObjectModel';
  }

}

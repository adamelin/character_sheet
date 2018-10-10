import {EventDispatcher} from "../../event-dispatcher";
import {EhrModelEventType} from "../../ehr-model-event";
import {ModelEventDispatcher} from "../../ehr-model-event-dispatcher";
import {FormRootModel} from "./FormRootModel";
import {ModelViewConfigParser} from "../parsing/ViewConfigParser";

/**
 * Created by matjazhi on 13.4.2016.
 */

export class Model implements ModelEventDispatcher {

  /*///static EVENT_CHILDREN_UPDATED: string = "getChildModels";
  static EVENT_MIN_UPDATED: string = "minUpdated";
  static EVENT_MAX_UPDATED: string = "maxUpdated";*/

  parentModel: Model;
  childModels: Array<Model> = [];
  descEl: Object;
  //TODO test dispatching events
  eventDispatcher: EventDispatcher = new EventDispatcher();
  wrappingModel: Model;


  constructor(formDescriptionSnippet?: Object, protected viewConfigParser?: ModelViewConfigParser) {
    this.setDescEl(formDescriptionSnippet, viewConfigParser);
  }

  addEventListener(handlerFn: Function, eventName: EhrModelEventType): Function {
    return this.eventDispatcher.addEventListener(handlerFn, eventName);
  }

  removeEventListener(handlerFn: Function, eventName: EhrModelEventType): void {
    return this.eventDispatcher.removeEventListener(handlerFn, eventName);
  }

  setValuesFromObject(formDescSnippet: Object, viewConfParser?: ModelViewConfigParser): void {
    if (!!viewConfParser && viewConfParser !== this.viewConfigParser) {
      this.viewConfigParser = viewConfParser;
    }
    for (let prop in formDescSnippet) {
      if (formDescSnippet.hasOwnProperty(prop)) {
        let val = formDescSnippet[prop];
        if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') {
          let setterName = 'set' + prop.substr(0, 1).toUpperCase() + prop.substr(1);
          if (this[setterName]) {
            this[setterName](val);
          } else {
            this[prop] = val;
          }
        }
      }
    }
  }

  getChildModels(): Array<Model> {
    return this.childModels;
  }

  getChildModel(i: number): Model {
    return this.childModels[i];
  }

  getChildCount(): number {
    return this.childModels.length;
  }

  getChildModelsMatching<T>(func: Function): Array<T> {
    let models = [];
    for (let i = 0; i < this.childModels.length; i++) {
      let model = this.childModels[i];
      if (func(model)) {
        models.push(model);
      }
    }

    return models;
  }

  addChildModel(model: Model) {
    model.setParentModel(this);
    this.childModels.push(model);
    // containers redispatch events
    this.redispatchChildValidationEvents(model);
  }

  private childModelValidationChangeHandler(val: { data: { model: Model, validationErrors: string[] } }): void {
    this.eventDispatcher.dispatchEvent(EhrModelEventType.EVENT_MODEL_VALIDATION_CHANGE, val.data);
  }

  private redispatchChildValidationEvents(model: Model): void {
    model.addEventListener(this.childModelValidationChangeHandler.bind(this), EhrModelEventType.EVENT_MODEL_VALIDATION_CHANGE);
  }

  private removeChildValidationEventsListener(model: Model): void {
    model.removeEventListener(this.childModelValidationChangeHandler.bind(this), EhrModelEventType.EVENT_MODEL_VALIDATION_CHANGE);
  }

  insertChildModelAt(index: number, model: Model, muteEvent?: boolean): void {
    model.setParentModel(this);
    if (index < -1) {
      index = 0;
    } else if (index === -1) {
      index = this.childModels.length;
    }
    if (index >= this.childModels.length) {
      this.childModels.push(model);
    } else {
      this.childModels.splice(index, 0, model);
    }
    // containers redispatch events
    this.redispatchChildValidationEvents(model);
    if (!muteEvent) {
      this.eventDispatcher.dispatchEvent(EhrModelEventType.EVENT_CHILDREN_UPDATED, this.childModels);
    }
  }

  removeChildModel(model: Model, muteEvent?: boolean) {
    let index = this.childModels.indexOf(model);
    if (index >= 0) {
      this.childModels.splice(index, 1);
      model.setParentModel(null);
    }
    // containers redispatch events
    this.removeChildValidationEventsListener(model);
    if (!muteEvent) {
      this.eventDispatcher.dispatchEvent(EhrModelEventType.EVENT_CHILDREN_UPDATED, this.childModels);
    }
  }

  removeFromParent() {
    if (this.getParentModel()) {
      this.getParentModel().removeChildModel(this);
    }
  }

  getParentModel(): Model {
    return this.parentModel;
  }

  setParentModel(model: Model) {
    this.parentModel = model;
  }

  childValueUpdated(updatedModel: Model, previousValue: any[]) {
    let parent = this.getParentModel();
    if (parent) {
      parent.childValueUpdated(updatedModel, previousValue);
    } else if (this['onModelValueUpdated']) {
      this['onModelValueUpdated'](updatedModel, previousValue);
    }
  }

  getRootModel(): FormRootModel {
    let m: Model = this;

    while (m.getParentModel()) {
      m = m.getParentModel();
    }

    return m as FormRootModel;
  }

  getDescEl(): Object {
    return this.descEl;
  }

  setDescEl(descEl: Object, viewConfParser?: ModelViewConfigParser) {
    this.descEl = descEl;
    if (descEl != null) {
      this.setValuesFromObject(descEl, viewConfParser);
    }
  }

  getWrappingModel() {
    return this.wrappingModel;
  }

  setWrappingModel(wrappingModel) {
    this.wrappingModel = wrappingModel;
  }

  isWrapped() {
    return this.wrappingModel !== null && this.wrappingModel !== undefined;
  }

  toString(): string {
    return 'Model';
  }
}

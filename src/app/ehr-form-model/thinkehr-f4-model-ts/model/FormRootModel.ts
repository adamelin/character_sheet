import {FormObjectModel} from './FormObjectModel';
import {ViewConfig} from './../view/ViewConfig';
import {RmType} from './../RmType';
import {EhrContext} from '../EhrContext';
import {ModelViewConfigParser} from '../parsing/ViewConfigParser';
import {Model} from './Model';
import {FormRepeatableElementModel} from './FormRepeatableElementModel';
import {AbstractContainerModel} from './AbstractContainerModel';
import {EhrModelEventType} from '../../ehr-model-event';

/**
 * Created by matjazhi on 18.4.2016.
 */

export class FormRootModel extends FormObjectModel {

  protected _updatedValueCallbacks: Function[] = [];
  private _uniqueId: string;
  private structuredValDisabled = true;

  constructor(formDesc?: Object, viewConfigParser?: ModelViewConfigParser) {
    super(formDesc, viewConfigParser);
    this._uniqueId = Math.random().toString(10).substr(3);
  }

  getContext() {
    return this._context;
  }

  getRmType() {
    return RmType.FORM_DEFINITION;
  }

  getUniqueId() {
    ///return null;
    return this._uniqueId;
  }

  isMulti(): boolean {
    return false;
  }

  set structuredValidationDisabled(value: boolean) {
    this.structuredValDisabled = value;
    if (!this.structuredValDisabled) {
      this.resetStructuredValidation();
    }
  }

  get structuredValidationDisabled(): boolean {
    return this.structuredValDisabled;
  }

  onModelValueUpdated(model: Model, previousValue: any[]) {
    if (!this.structuredValDisabled) {
      this.resetStructuredValidation();
    }
    this._updatedValueCallbacks.forEach((cbFn: Function) => {
      cbFn({model: model, previousValue: previousValue});
    });
  }

  resetStructuredValidation(cacheCycleId?: number) {
    if (!cacheCycleId) {
      cacheCycleId = Math.random();
    }
    this.getChildModels().forEach((m: FormRepeatableElementModel) => {
      if (!m.isContainer()) {
        m.resetStructuredValidation(cacheCycleId);
      } else {
        (<AbstractContainerModel>m).resetChildrenStructuredValidation(cacheCycleId);
      }
    });
  }

  addUpdatedValueCallback(callbackFn: Function): Function {
    if (this._updatedValueCallbacks.indexOf(callbackFn) < 0) {
      this._updatedValueCallbacks.push(callbackFn);
    }
    return () => {
      this.removeUpdatedValueCallback(callbackFn);
    };
  }

  removeUpdatedValueCallback(callbackFn: Function): void {
    let ind: number = this._updatedValueCallbacks.indexOf(callbackFn);
    if (ind > -1) {
      this._updatedValueCallbacks.splice(ind, 1);
    }
  }

  dispatchStructuredValidationChange(model: FormRepeatableElementModel) {
    this.eventDispatcher.dispatchEvent(EhrModelEventType.EVENT_STRUCTURED_VALIDATION_CHANGE, {model: model});
  }

  toString() {
    return 'FormRootModel/' + this.getName() + '/' + RmType[this.getRmType()];
  }
}

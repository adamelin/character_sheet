import {FormRepeatableElementModel} from "./FormRepeatableElementModel";
import {ThinkEhrUtil} from "./../ThinkEhrUtil";
import {RmType} from "../RmType";
import {ModelViewConfigParser} from "../parsing/ViewConfigParser";
import {Model} from './Model';

export class AbstractContainerModel extends FormRepeatableElementModel {

  constructor(fromObject?: Object, viewConfigParser?: ModelViewConfigParser) {
    super(fromObject, viewConfigParser);
  }

  isContainer(): boolean {
    return true;
  }

  getElementName(): string {
    if (!this._elementName) {
      this._elementName = this.getNamePrefix() + ThinkEhrUtil.guid('_');
    }

    return this._elementName;
  }

  getNamePrefix(): string {
    return 'container_';
  }

  childValueUpdated(updatedModel: Model, previousValue: any[]) {
    //if (this.getChildModels().indexOf(updatedModel) > -1) {
    //this.resetChildrenStructuredValidation();
    //}
    super.childValueUpdated(updatedModel, previousValue);
  }

  resetChildrenStructuredValidation(cacheCycleId?: number) {
    if (!cacheCycleId) {
      cacheCycleId = Math.random();
    }
    let childModels = this.getChildModels();
    const initReqModels: Model[] = childModels.filter((model: FormRepeatableElementModel) => {
      return model.isInitRequired();
    });
    initReqModels.forEach((initRModel: FormRepeatableElementModel) => {
      initRModel.resetStructuredValidation(cacheCycleId);
    });

    childModels.filter(m => {
      return m['isContainer'] && m['isContainer']();
    }).forEach((containerModel: AbstractContainerModel) => {
      containerModel.resetChildrenStructuredValidation(cacheCycleId);
    });

  }

  toString(): string {
    return 'AbstractContainerModel/' + this.getName() + '/' + RmType[this.getRmType()];
  }

}

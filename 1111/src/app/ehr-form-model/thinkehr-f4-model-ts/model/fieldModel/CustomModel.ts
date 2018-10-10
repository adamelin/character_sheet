import {NodeModel} from '../NodeModel';
import {RmType} from '../../RmType';
import {ModelViewConfigParser} from '../../parsing/ViewConfigParser';

/**
 * Created by matjazhi on 15.2.2017.
 */

export class CustomModel extends NodeModel {

  delegateModel: any;
  private _valueFuncName: string;

  constructor(formDescriptionSnippet?: Object, viewConfigParser?: ModelViewConfigParser) {
    super(formDescriptionSnippet, viewConfigParser);
    this._configureWrapperModel(this.delegateModel);
  }

  getDelegateModel() {
    return this.delegateModel;
  }

  setDelegateModel(delegateModel) {
    this.delegateModel = delegateModel;
    // Set delegate model in NodeModel
    delegateModel.delegateOf = this;
    this._configureWrapperModel(delegateModel);
  }

  resetValue(multiIndex: number): void{
    this.getDelegateModel().resetValue(multiIndex);
  }

  isValueModel(): boolean {
    return this.getDelegateModel().isValueModel();
  }

  isValueSet(): boolean {
    return this.getDelegateModel().isValueSet();
  }

  getPath() {
    let path = super.getPath();
    if (!path) {
      path = this.delegateModel.formId;
    }

    return path;
  }

  getRmType() {
    return RmType.CUSTOM;
  }

  toString(): string {
    return 'CustomModel/' + this._valueFuncName;
  }

  private _configureWrapperModel(wrapperModel) {
    if (wrapperModel) {
      wrapperModel.setWrappingModel(this);
    }
  }
}

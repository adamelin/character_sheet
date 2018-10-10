/**
 * Created by matjazhi on 14.4.2016.
 */
import {ViewConfig} from './ViewConfig';
import {FormObjectModel} from './../model/FormObjectModel';
import {ModelViewConfigParser} from '../parsing/ViewConfigParser';

export class ViewConfigProperty {
  viewConfig: ViewConfig;

  constructor(fromObj: Object, viewConfParser:ModelViewConfigParser) {
    if (fromObj['viewConfig'] && fromObj['viewConfig'] instanceof ViewConfig) {
      this.setViewConfig(fromObj['viewConfig']);
    }
    //const viewConfigParser = new ViewConfigParser();
    viewConfParser.setPropsFromObject(fromObj, this);
  }

  getViewConfig(): ViewConfig {
    return this.viewConfig;
  }

  setViewConfig(viewConfig: ViewConfig) {
    this.viewConfig = viewConfig;
  }

  /**
   * Calls a hierarchical property, sort of reflectively up the chain.
   *
   */
  _getHierarchicalProperty <T>(hierarchy: boolean, propKey: string, inheritValue: any, fieldGetter: Function, containingObjGetterProp: string): T {
    if (hierarchy === false || (this[propKey] && this[propKey] !== inheritValue)) {
      return this[propKey];
    }

    let containingObjGetter = this._getParentViewConfig() ? this._getParentViewConfig()[containingObjGetterProp] : null;
    if (containingObjGetter && containingObjGetter.call(this._getParentViewConfig(), true)) {
      return fieldGetter.call(containingObjGetter.call(this._getParentViewConfig(), true), true);
    }

    return this[propKey];
  }

  _getParentViewConfig(): ViewConfig {
    if (this.viewConfig.getModel() && this.viewConfig.getModel().getParentModel() &&
      this.viewConfig.getModel().getParentModel() instanceof FormObjectModel) {
      return (<FormObjectModel> this.viewConfig.getModel().getParentModel()).getViewConfig();
    }

    return null;
  }

  /*
   * @Override
   */
  toString(): string {
    return 'thinkehr.f4.ViewConfigProperty';
  }

}

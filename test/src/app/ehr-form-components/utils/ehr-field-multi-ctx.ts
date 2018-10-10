import {Observable} from 'rxjs/Rx'
import {NodeModel} from "../../ehr-form-model/thinkehr-f4-model-ts/model/NodeModel";
import {EhrModelObservable} from "../../ehr-form-model/ehr-model-observable";
import {ViewConfig} from "../../ehr-form-model/thinkehr-f4-model-ts/view/ViewConfig";
import {EhrModelEvent} from "../../ehr-form-model/ehr-model-event";
import {ThinkEhrUtil} from "../../ehr-form-model/thinkehr-f4-model-ts/ThinkEhrUtil";

export class EhrFieldMultiCtx {

  constructor( ) {
    ///this.readOnly = this.ehrModelObservable.fromEvent(model.getViewConfig(), EhrModelEventType.EVENT_IS_READ_ONLY).map((ev: ModelEvent)=>ev.data as boolean);
  }

  static displayMultiControls(readOnly: boolean, isMulti:boolean): boolean {
    return isMulti && !readOnly;
  }

  static getAddDisabledIndexes(modelValsArr:any[], model:NodeModel): boolean[] {
      ///!(this.addMultiFieldEnabled() && ( this.isLast(multiIndex) && (this.singleFieldMultiValuesList.length && !this.anyTextValueEmpty())) )
      let retArr = Array(modelValsArr.length).fill(true);

      if (modelValsArr.length && !EhrFieldMultiCtx._anyTextValueEmpty(modelValsArr) && EhrFieldMultiCtx._addMultiFieldEnabled(modelValsArr, model)) {
        retArr[retArr.length - 1] = false;
      }
      ///console.log("VALS FOR addDisabledIndexes")
      return retArr;
  }

  static getRemoveDisabledIndexes(modelValsArr:any[], model:NodeModel): boolean[] {
      let retArr = Array(modelValsArr.length).fill(!EhrFieldMultiCtx._removeMultiFieldEnabled(modelValsArr, model));

      if (retArr[0]===false && modelValsArr.length===1) {
        retArr[0] = true;
      }
      ///console.log("VALS FOR removeDisabledIndexes")
      return retArr;
  }

  static _addMultiFieldEnabled(valsArr:any[], model:NodeModel): boolean {
    return valsArr.length < model.getMax() || model.getMax() == -1;
  }

  static _removeMultiFieldEnabled(valsArr:any[], model:NodeModel):boolean {
    return valsArr.length > model.getMin();
  };

  static _anyTextValueEmpty(valsArr): boolean {
      return valsArr.findIndex((value)=> {
          return value == null || (!ThinkEhrUtil.isString(value) && !ThinkEhrUtil.isObject(value) && isNaN(value)) || value.toString().length < 1;
        }) > -1;
  };

}

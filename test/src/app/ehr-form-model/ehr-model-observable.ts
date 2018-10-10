import {NodeModel} from "./thinkehr-f4-model-ts/model/NodeModel";
import {BehaviorSubject, Observable, Subject} from "rxjs/Rx";
import {EhrModelEvent, EhrModelEventType} from "./ehr-model-event";
import {ModelEventDispatcher} from "./ehr-model-event-dispatcher";
import {RmTypeModelValueGetter} from "./thinkehr-f4-model-ts/model/RmTypeModelValueGetter";
import {ViewConfig} from "./thinkehr-f4-model-ts/view/ViewConfig";

interface ModelPaths {
  [id: string]: ModelPathVal;
}

interface ModelPathVal {
  models: ModelValueClearCallback[];
  value$: BehaviorSubject<NodeModel>;
}

interface ModelValueClearCallback {
  model: NodeModel;
  removeCbFn: Function;
  viewConfigEvents: ModelViewConfigEvents;
}

interface ModelViewConfigEvents {
  [ehrModelEventType: number]: {
    removeViewConfigCbFn: Function;
    viewConfigEventSubject: BehaviorSubject<EhrModelEvent>;
  };
}

export class EhrModelObservable {

  private modelPaths: ModelPaths = {};

  getModelPathObservable(model: NodeModel): Observable<NodeModel> {

    const mpv_isNew = this.getOrCreateModelPathVal(model);
    const mv: ModelPathVal = mpv_isNew.modelPathVal;

    if (mpv_isNew.modelInstanceIsNew || !this.getModelValueClearCallback(model, mpv_isNew.modelPathVal).removeCbFn) {
      const removeFn = model.addUpdatedValueCallback(() => {
        //console.log("CB", model.getValue());
        mv.value$.next(model);
      });
      mv.models.forEach((mr: { model: NodeModel, removeCbFn: Function }) => {
        if (mr.model === model) {
          mr.removeCbFn = removeFn;
        }
      });
    }

    return mv.value$.asObservable();
  }

  fromValue(model: NodeModel, valueMethodName?: string, multiIndex?: number): Observable<any> {
    let updatedModel$: Observable<NodeModel> = this.getModelPathObservable(model);
    return updatedModel$.map((updatedModel: NodeModel) => {
      ///let path = updatedModel?updatedModel.getPath():'';
      //console.log("FROM VALUE HANDLER", updatedModel[valueMethodName](undefined, multiIndex));
      ///if(updatedModel.textValue)console.log("UPDATED=",updatedModel.textValue())
      return valueMethodName ? updatedModel[valueMethodName](undefined, multiIndex) : RmTypeModelValueGetter.getValue(updatedModel, multiIndex);
    });
  }

  fromEvent(model: ModelEventDispatcher, eventName: EhrModelEventType, initValue?: any): Observable<EhrModelEvent> {
    if (model instanceof ViewConfig) {
      model = model.getModel();
    }
    return this.getModelViewConfigEventObservable(eventName, initValue, model);
  }

  destroyModelPathObservable(model: NodeModel) {
    const modelId = this.getModelUniqueId(model);
    const mv: ModelPathVal = this.modelPaths[modelId];
    if (mv) {
      this.destroyModelPathVal(mv, modelId);
    }
  }

  destroyAllModelPathObservables() {
    Object.keys(this.modelPaths).forEach((modelId: string) => {
      if(modelId!=null){
        this.destroyModelPathVal(this.modelPaths[modelId], modelId);
      }
    });
  }

  constructor() {
  }

  private getOrCreateModelPathVal(model: NodeModel): { modelPathVal: ModelPathVal, modelInstanceIsNew: boolean } {
    let modelInstanceIsNew = false;
    const modelPath = this.getModelUniqueId(model);
    let modelPathVal = this.modelPaths[modelPath];
    if (!modelPathVal) {
      modelPathVal = {models: [{model: model, removeCbFn: null, viewConfigEvents: []}], value$: new BehaviorSubject(model)};
      modelInstanceIsNew = true;
      this.modelPaths[modelPath] = modelPathVal;

    } else if (!modelPathVal.models.some(itm => itm.model === model)) {
      modelPathVal.models.push({model: model, removeCbFn: null, viewConfigEvents: []});
      modelInstanceIsNew = true;
    }
    return {modelPathVal: modelPathVal, modelInstanceIsNew};
  }

  private getModelUniqueId(model: NodeModel) {
    return model.getSanitizedUniqueId(model.isMulti() ? model.getMultiIndex(false) : 0);
  }

  private destroyModelPathVal(mv: ModelPathVal, modelId) {
    mv.models.forEach((mRFn: ModelValueClearCallback) => {
      if (mRFn.removeCbFn) {
        mRFn.removeCbFn();
      }
      const evIds = Object.keys(mRFn.viewConfigEvents);
      if (evIds.length) {
        evIds.forEach(evId => {
          mRFn.viewConfigEvents[evId].removeViewConfigCbFn();
          mRFn.viewConfigEvents[evId].removeViewConfigCbFn = null;
          mRFn.viewConfigEvents[evId].viewConfigEventSubject.complete();
        });
      }
    });
    const value$: BehaviorSubject<NodeModel> = mv.value$;
    value$.complete();
    this.modelPaths[modelId] = null;
  }

  private getModelViewConfigEventObservable(eventName: EhrModelEventType, initValue: any, model: ModelEventDispatcher) {

    const mpv_isNew: { modelPathVal: ModelPathVal, modelInstanceIsNew: boolean } = this.getOrCreateModelPathVal(model as NodeModel);
    let mvcc: ModelValueClearCallback;
    if (mpv_isNew.modelInstanceIsNew || !this.getModelValueClearCallback(model as NodeModel, mpv_isNew.modelPathVal).viewConfigEvents[eventName]) {

      let eventSubject: BehaviorSubject<EhrModelEvent> = new BehaviorSubject({
        name: eventName,
        data:
          initValue !== undefined ?
            initValue
            : RmTypeModelValueGetter.getGetterForEhrEventType(model as NodeModel, eventName).call(model)
      });

      const remFn = model.addEventListener((eventObj: EhrModelEvent) => {
        eventSubject.next(eventObj);
      }, eventName);

      mvcc = this.getModelValueClearCallback(model as NodeModel, mpv_isNew.modelPathVal);
      mvcc.viewConfigEvents[eventName] = {removeViewConfigCbFn: remFn, viewConfigEventSubject: eventSubject};

    }

    if (!mvcc) {
      mvcc = this.getModelValueClearCallback(model as NodeModel, mpv_isNew.modelPathVal);
    }

    return mvcc.viewConfigEvents[eventName].viewConfigEventSubject.asObservable();
  }

  private getModelValueClearCallback(model: NodeModel, modelPathVal: ModelPathVal): ModelValueClearCallback {
    return modelPathVal.models.find((val: ModelValueClearCallback) => {
      return val.model === model;
    });
  }

}

import {EhrModelEventType} from "./ehr-model-event";

export interface ModelEventDispatcher {
  addEventListener(handlerFn: Function, eventName?: EhrModelEventType): Function;
}

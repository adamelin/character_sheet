import {EhrModelEventType} from './ehr-model-event';

export class EventDispatcher {

  private eventHandlerFns: { [id: number]: Function[] } = {};

  constructor() {
  }

  addEventListener(handlerFn: Function, eventName: EhrModelEventType):Function {
    let evNameHandlersArr: Function[] = this.eventHandlerFns[eventName];
    if (!evNameHandlersArr) {
      evNameHandlersArr = this.eventHandlerFns[eventName] = [];
    }
    if (!evNameHandlersArr.some((hFn: Function) => {
        return hFn === handlerFn;
      })) {
      evNameHandlersArr.push(handlerFn);
    }
    return () => {
      this.removeEventListener(handlerFn, eventName)
    };
  }

  dispatchEvent(eventName: EhrModelEventType, value: any) {
    let evNameHandlersArr: Function[] = this.eventHandlerFns[eventName];
    let callHandlers: Function[] = [];
    if (evNameHandlersArr) {
      callHandlers = callHandlers.concat(evNameHandlersArr);
    }
    if (this.eventHandlerFns[''] && this.eventHandlerFns[''].length) {
      callHandlers = callHandlers.concat(this.eventHandlerFns['']);
    }
    callHandlers.forEach((handlerFn) => {
      handlerFn.call(null, {name: eventName, data: value});
    });
  }

  removeEventListener(handlerFn: Function, eventName: EhrModelEventType) {
    let evNameHandlersArr: Function[] = this.eventHandlerFns[eventName];
    let fnAt = evNameHandlersArr.indexOf(handlerFn);
    if (fnAt>-1) {
      ///console.log('removed Listener', fnAt);
      evNameHandlersArr.splice(fnAt, 1);
    }
  }
}

export interface EhrModelEvent {
  name:string;
  data:any;
}

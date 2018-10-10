import {NodeModel} from '../ehr-form-model/thinkehr-f4-model-ts/model/NodeModel';
import {RmTypeModelValueGetter} from '../ehr-form-model/thinkehr-f4-model-ts/model/RmTypeModelValueGetter';
import {Injectable} from '@angular/core';
import {ViewComponentsRegistryService} from './registered-components.service';
import {Observable, Subscription} from 'rxjs';
import {EhrModelObservable} from '../ehr-form-model/ehr-model-observable';
import {EhrModelEvent, EhrModelEventType} from '../ehr-form-model/ehr-model-event';
import {AbstractEhrComponent} from './abstract-ehr-component.component';
import {ValidationErrorMessage} from 'mrd-ui-components';
import {RmType} from '../ehr-form-model/thinkehr-f4-model-ts/RmType';
import {FormObjectModel} from '../ehr-form-model/thinkehr-f4-model-ts/model/FormObjectModel';
import {FormScriptApi} from './ehr-form/FormScriptApi';
import {FormRepeatableElementModel} from '../ehr-form-model/thinkehr-f4-model-ts/model/FormRepeatableElementModel';
import {CustomModel} from '../ehr-form-model/thinkehr-f4-model-ts/model/fieldModel/CustomModel';

@Injectable()
export class ScriptApi implements FormScriptApi {
  ///api: ModelScriptExecutor;

  exeFormScript(forModel: FormObjectModel, ehrFormScriptArr: string[], ehrModelObservable: EhrModelObservable): ModelScriptExecutor {
    'use strict';
    let api = new ModelScriptExecutor(forModel, this.componentsRegistry, ehrModelObservable);
    if (!ehrFormScriptArr || !ehrFormScriptArr.length) {
      return api;
    }
    if(typeof ehrFormScriptArr==='string'){
      ehrFormScriptArr=[ehrFormScriptArr];
    }

    let window = undefined;
    let self = undefined;
    let parent = undefined;
    let document = undefined;

    eval(ehrFormScriptArr.join(';'));

    return api;
  }

  componentsRegistry: ViewComponentsRegistryService;

  constructor() {
    this.componentsRegistry = new ViewComponentsRegistryService();
  }

  registerComponent(componentInstance: any, model: FormObjectModel): void {
    return this.componentsRegistry.registerComponent(componentInstance, model);
  }

  unregisterComponent(componentInstance: any, model: FormObjectModel): void {
    return this.componentsRegistry.unregisterComponent(componentInstance, model);
  }

  destroy(){
    this.componentsRegistry.destroy();
  }
}

export class ModelScriptExecutor {

  private callbackFnArr: Function[] = [];
  private callbackFnArrByEvent: { [eventName: string]: [{ unFn: Function[], tagOrPath: string }] } = {};
  private subscriptionArr: Subscription[] = [];
  private subscriptionsByEvent: { [eventName: string]: [{ subs: Subscription[], tagOrPath: string }] } = {};

  constructor(private forModel: FormObjectModel, private modelCompsRegistry: ViewComponentsRegistryService, private ehrModelObservable: EhrModelObservable) {
  }

  addListener(tagOrPath: string, eventType: string, callbackFn: onChangeFieldValue) {

    switch (EventType[eventType]) {
      case EventType.CHANGE:
        this.addToEventListeners(this.onChange(tagOrPath, callbackFn), eventType, tagOrPath);
        break;
      case EventType.EDIT_START:
        this.addToEventSubscriptions(this.onEditStart(tagOrPath, callbackFn), eventType, tagOrPath);
        break;
      case EventType.EDIT_END:
        this.addToEventSubscriptions(this.onEditEnd(tagOrPath, callbackFn), eventType, tagOrPath);
        break;
      case EventType.MOUSEOVER:
        this.addToEventSubscriptions(this.onMouseOver(tagOrPath, callbackFn), eventType, tagOrPath);
        break;
      case EventType.MOUSEOUT:
        this.addToEventSubscriptions(this.onMouseOut(tagOrPath, callbackFn), eventType, tagOrPath);
        break;
      case EventType.ENABLED_CHANGE:
        this.addToEventSubscriptions(this.onEnabledChange(tagOrPath, callbackFn), eventType, tagOrPath);
        break;
      case EventType.VALIDATION_CHANGE:
        this.addToEventSubscriptions(this.onValidationChange(tagOrPath, callbackFn), eventType, tagOrPath);
        break;
      case EventType.VISIBILITY_CHANGE:
        this.addToEventSubscriptions(this.onVisibilityChange(tagOrPath, callbackFn), eventType, tagOrPath);
        break;
    }
  }

  removeListener(tagOrPath: string, eventType: string) {

    switch (EventType[eventType]) {
      case EventType.CHANGE:
        this.removeFromEventListeners(eventType, tagOrPath);
        break;
      default:
        this.removeFromEventSubscriptions(eventType, tagOrPath);
        break;
    }
  }

  private removeFromEventListeners(eventType: string, tagOrPath: string) {
    let unFunctionsArr: Function[] = [];
    if (this.callbackFnArrByEvent[eventType]) {
      let allByTagOrPath: { unFn: Function[], tagOrPath: string }[] = this.callbackFnArrByEvent[eventType].filter((fnTag: { unFn: Function[], tagOrPath: string }) => {
        return fnTag.tagOrPath === tagOrPath;
      });
      unFunctionsArr = allByTagOrPath.reduce((unFnArr: Function[], fnTag: { unFn: Function[], tagOrPath: string }) => {
        fnTag.unFn.forEach(fn => unFnArr.push(fn));
        return unFnArr;
      }, unFunctionsArr);
      allByTagOrPath.forEach((top: { unFn: Function[], tagOrPath: string }) => {
        this.callbackFnArrByEvent[eventType].splice(this.callbackFnArrByEvent[eventType].indexOf(top), 1);
      });
      unFunctionsArr.forEach((unFn: Function) => {
        unFn();
      });
    }
  }

  private addToEventListeners(unsubFn: Function[], eventType: string, tagOrPath: string) {
    let subsByTag: { unFn: Function[], tagOrPath: string };
    if (unsubFn.length) {
      subsByTag = {unFn: unsubFn, tagOrPath: tagOrPath};
    }
    if (subsByTag) {

      if (!this.callbackFnArrByEvent[eventType]) {
        this.callbackFnArrByEvent[eventType] = [subsByTag];
      } else {
        this.callbackFnArrByEvent[eventType].push(subsByTag);
      }
    }
  }

  private addToEventSubscriptions(subs: Subscription[], eventType: string, tagOrPath: string) {
    let subsByTag: { subs: Subscription[], tagOrPath: string };
    if (subs.length) {
      subsByTag = {subs: subs, tagOrPath: tagOrPath};
    }
    if (subsByTag) {

      if (!this.subscriptionsByEvent[eventType]) {
        this.subscriptionsByEvent[eventType] = [subsByTag];
      } else {
        this.subscriptionsByEvent[eventType].push(subsByTag);
      }
    }
  }

  private removeFromEventSubscriptions(eventType: string, tagOrPath: string) {
    let activeSubscriptions: Subscription[] = [];
    if (this.subscriptionsByEvent[eventType]) {
      let allByTagOrPath = this.subscriptionsByEvent[eventType].filter((subsByTag: { subs: Subscription[], tagOrPath: string }) => {
        return tagOrPath === subsByTag.tagOrPath;
      });
      activeSubscriptions = allByTagOrPath.reduce((subsArr: Subscription[], subsByTag: { subs: Subscription[], tagOrPath: string }) => {
        subsByTag.subs.forEach(sub => subsArr.push(sub));
        return subsArr;
      }, activeSubscriptions);

      activeSubscriptions.forEach(s => s.unsubscribe());

      allByTagOrPath.forEach((subsByTag: { subs: Subscription[], tagOrPath: string }) => {
        this.subscriptionsByEvent[eventType].splice(this.subscriptionsByEvent[eventType].indexOf(subsByTag), 1);
      });
    }

  }

  destroy() {
    this.subscriptionArr.forEach((subs: Subscription) => {
      subs.unsubscribe();
    });
    this.subscriptionArr.length = 0;
    this.callbackFnArr.forEach((unsubFn: Function) => {
      unsubFn();
    });
    this.callbackFnArr.length = 0;
  }

  getFieldValue(tagOrPath: string, searchWithinContainerTag?: string): { elementName: string, elementType: string, value: any } {
    let models: FormObjectModel[] = this.findByIdent(tagOrPath, searchWithinContainerTag);
    if (models && models.length == 1) {
      return this.formatFieldValue(tagOrPath, models[0]);
    } else if (models.length > 1) {
      console.warn("ScriptApi.getValue() for tagOrPath or path (" + tagOrPath + ") returned multiple models. 'tagOrPath' value must return single model!");
    }
  }

  setFieldValue(tagOrPath: string, value: any, prop: string = RmTypeModelValueGetter.MODEL_PROP_VALUE, multiIndex?: number, searchWithinContainerTag?: string) {
    this.forEachModelByTagOrPath(tagOrPath, (model) => {
      RmTypeModelValueGetter.setValue(model as NodeModel, value, prop, multiIndex);
    }, searchWithinContainerTag);
  }

  onChange(tagOrPath: string, callbackFn: onChangeFieldValue, searchWithinContainerTag?: string): Function[] {
    let stopListeners: Function[] = [];
    let models: FormObjectModel[] = this.findByIdent(tagOrPath, searchWithinContainerTag);
    if (models && models.length) {
      models.forEach((model) => {
        if (model instanceof CustomModel) {
          model = model.getDelegateModel();
        }
        let callbackFn2 = () => {
          callbackFn(this.formatFieldValue(tagOrPath, model));
        };
        stopListeners.push((<NodeModel>model).addUpdatedValueCallback(callbackFn2));
      });
    }
    stopListeners.forEach((stFn) => {
      this.callbackFnArr.push(stFn);
    });
    return stopListeners;
  }

  onEnabledChange(tagOrPath: string, callbackFn: Function, searchWithinContainerTag?: string): Subscription[] {
    let subs: Subscription[] = [];
    this.forEachModelByTagOrPath(tagOrPath, (forModel) => {
      subs.push(this.ehrModelObservable.fromEvent(forModel.getViewConfig(), EhrModelEventType.EVENT_IS_READ_ONLY, forModel.getViewConfig().isReadOnly())
        .map((ev: EhrModelEvent) => ev.data as boolean).distinctUntilChanged()
        .subscribe((isEnabled) => {
          callbackFn({elementName: tagOrPath, isEnabled: isEnabled});
        })
      );
    }, searchWithinContainerTag);
    subs.forEach((s) => {
      this.subscriptionArr.push(s);
    });
    return subs;
  }

  onVisibilityChange(tagOrPath: string, callbackFn: Function, searchWithinContainerTag?: string): Subscription[] {

    let subs: Subscription[] = [];
    this.forEachModelByTagOrPath(tagOrPath, (forModel) => {
      subs.push(this.ehrModelObservable.fromEvent(forModel.getViewConfig(), EhrModelEventType.EVENT_IS_HIDDEN, forModel.getViewConfig().isReadOnly())
        .map((ev: EhrModelEvent) => ev.data as boolean).distinctUntilChanged()
        .subscribe((isHidden) => {
          callbackFn({elementName: tagOrPath, isHidden: isHidden});
        })
      );
    }, searchWithinContainerTag);
    subs.forEach((s) => {
      this.subscriptionArr.push(s);
    });
    return subs;
  }

  onValidationChange(tagOrPath: string, callbackFn: Function): Subscription[] {
    let subs: Subscription[] = [];
    this.subscriptionArr.push(
      this.viewComponentsWithTag$(tagOrPath).subscribe((components: any[]) => {
        components.forEach((component) => {
          if (component instanceof AbstractEhrComponent) {
            subs.push(
              component.onTranslatedValidationErrors
                .subscribe((displayedValidationErrors: ValidationErrorMessage[]) => {
                  callbackFn({elementName: tagOrPath, errors: displayedValidationErrors});
                })
            );
          }
        });
      })
    );
    subs.forEach((s) => {
      this.subscriptionArr.push(s);
    });
    return subs;
  }

//TODO test onEditStart, onEditEnd
  onEditStart(tagOrPath: string, callbackFn: Function): Subscription[] {
    let subs: Subscription[] = [];
    this.subscriptionArr.push(
      this.viewComponentsWithTag$(tagOrPath).subscribe((components: any[]) => {
        components.forEach((component) => {
          if (component instanceof AbstractEhrComponent) {
            subs.push(
              component.onEditStart.subscribe((ev) => {
                callbackFn({elementName: tagOrPath, value: ev.value, multiIndex: ev.multiIndex});
              })
            );
          }
        });
      })
    );
    subs.forEach((s) => {
      this.subscriptionArr.push(s);
    });
    return subs;
  }

  onEditEnd(tagOrPath: string, callbackFn: Function): Subscription[] {
    let subs: Subscription[] = [];
    this.subscriptionArr.push(
      this.viewComponentsWithTag$(tagOrPath).subscribe((components: any[]) => {
        components.forEach((component) => {
          if (component instanceof AbstractEhrComponent) {
            subs.push(
              component.onEditEnd.subscribe((ev) => {
                callbackFn({elementName: tagOrPath, value: ev.value, multiIndex: ev.multiIndex});
              })
            );
          }
        });
      })
    );
    subs.forEach((s) => {
      this.subscriptionArr.push(s);
    });
    return subs;
  }

  onMouseOver(tagOrPath: string, callbackFn: Function): Subscription[] {
    let subs: Subscription[] = [];
    this.subscriptionArr.push(
      this.viewComponentsWithTag$(tagOrPath).subscribe((components: any[]) => {
        components.forEach((component) => {
          if (component instanceof AbstractEhrComponent) {
            subs.push(
              component.onMouseEnter.subscribe((ev) => {
                callbackFn({elementName: tagOrPath, value: ev.value, multiIndex: ev.multiIndex});
              })
            );
          }
        });
      })
    );
    subs.forEach((s) => {
      this.subscriptionArr.push(s);
    });
    return subs;
  }

  onMouseOut(tagOrPath: string, callbackFn: Function): Subscription[] {
    let subs: Subscription[] = [];
    this.subscriptionArr.push(
      this.viewComponentsWithTag$(tagOrPath).subscribe((components: any[]) => {
        components.forEach((component) => {
          if (component instanceof AbstractEhrComponent) {
            subs.push(
              component.onMouseLeave.subscribe((ev) => {
                callbackFn({elementName: tagOrPath, value: ev.value, multiIndex: ev.multiIndex});
              })
            );
          }
        });
      })
    );
    subs.forEach((s) => {
      this.subscriptionArr.push(s);
    });
    return subs;
  }

  log(val: any) {
    let args = ["api.log= "];
    for (let i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    console.log.apply(this, args);
  }

  isWeb() {
    return true;
  }

  isIos() {
    return false;
  }

  resetFormElement(tagOrPath: string, searchWithinContainerTag?: string) {
    this.forEachModelByTagOrPath(tagOrPath, (model: NodeModel) => {
      model.resetValue(undefined);
    }, searchWithinContainerTag, true);
  }

  clearFormElement(tagOrPath: string, searchWithinContainerTag?: string) {
    this.forEachModelByTagOrPath(tagOrPath, (model: NodeModel) => {
      model.clearValue(undefined);
    }, searchWithinContainerTag, true);
  }

  hideFormElement(tagOrPath: string, searchWithinContainerTag?: string) {
    this.forEachModelByTagOrPath(tagOrPath, (model) => {
      model.getViewConfig().setHidden(true);
    }, searchWithinContainerTag);
  }

  showFormElement(tagOrPath: string, searchWithinContainerTag?: string) {
    this.forEachModelByTagOrPath(tagOrPath, (model) => {
      model.getViewConfig().setHidden(false);
    }, searchWithinContainerTag);
  }

  enableFormElement(tagOrPath: string, searchWithinContainerTag?: string) {
    this.forEachModelByTagOrPath(tagOrPath, (model) => {
      model.getViewConfig().setReadOnly(false);
    }, searchWithinContainerTag);
  }

  disableFormElement(tagOrPath: string, searchWithinContainerTag?: string) {
    this.forEachModelByTagOrPath(tagOrPath, (model) => {
      model.getViewConfig().setReadOnly(true);
    }, searchWithinContainerTag);
  }

  requireFormElement(tagOrPath: string, value: boolean, searchWithinContainerTag?: string) {
    //TODO check why same tag on multiple fields is not displaying required validation message on all fields
    this.forEachModelByTagOrPath(tagOrPath, (model) => {
      if (model['setMin']) {
        let minVal: number = value ? 1 : 0;
        model['setMin'](minVal);
      }
    }, searchWithinContainerTag);
  }

  setFieldTooltip(tagOrPath: string, value: string, searchWithinContainerTag?: string) {
    this.forEachModelByTagOrPath(tagOrPath, (model) => {
      model.getViewConfig().setTooltip(value);
    }, searchWithinContainerTag);
  }

  moveFieldToPosition(tagOrPath: string, indexNr: number, searchWithinContainerTag?: string) {
    this.forEachModelByTagOrPath(tagOrPath, (model) => {
      (<FormRepeatableElementModel>model.getParentModel()).moveChildPosition(model, indexNr);
    }, searchWithinContainerTag);
  }

  moveFieldToStart(tagOrPath: string, searchWithinContainerTag?: string) {
    this.forEachModelByTagOrPath(tagOrPath, (model) => {
      (<FormRepeatableElementModel>model.getParentModel()).moveChildPosition(model, 0);
    }, searchWithinContainerTag);
  }

  moveFieldToEnd(tagOrPath: string, searchWithinContainerTag?: string) {
    this.forEachModelByTagOrPath(tagOrPath, (model) => {
      (<FormRepeatableElementModel>model.getParentModel()).moveChildPosition(model, -1);
    }, searchWithinContainerTag);
  }

  getFieldPosition(tagOrPath: string, searchWithinContainerTag?: string): number {
    let models: FormObjectModel[] = this.findByIdent(tagOrPath, searchWithinContainerTag);
    if (models && models.length == 1) {
      return (<FormRepeatableElementModel>models[0]).getMultiIndex(false);
    } else if (models.length > 1) {
      console.warn("ScriptApi.getFieldPosition() for tagOrPath or path (" + tagOrPath + ") returned multiple models. 'tagOrPath' value must return single model!");
    }
  }

  private forEachModelByTagOrPath(tagOrPath: string, callbackFn: (value: FormObjectModel, index: number, array: FormObjectModel[]) => void, searchWithinContainerTag?: string, customDelegateModels?: boolean) {
    let models: FormObjectModel[] = this.findByIdent(tagOrPath, searchWithinContainerTag);
    if (models && models.length) {
      models
        .map(m => {
          return (m instanceof CustomModel) ? m.getDelegateModel() : m;
        })
        .forEach(callbackFn as (value: FormObjectModel, index: number, array: FormObjectModel[]) => void);
    }
  }

  private findByIdent(tagOrPathOrAqlPathOrChildPathId: string, withinContainerTag?: string): FormObjectModel[] {
    let ret: FormObjectModel[] = this.forModel.findModelsWithTag(tagOrPathOrAqlPathOrChildPathId, withinContainerTag) as FormObjectModel[];

    if (!ret || !ret.length) {
      ret = this.forModel.getRootModel().findSuccessorsWithPath(tagOrPathOrAqlPathOrChildPathId) as FormObjectModel[];
    }
    if (!ret || !ret.length) {
      ret = this.forModel.getRootModel().findSuccessorsWithAqlPath(tagOrPathOrAqlPathOrChildPathId) as FormObjectModel[];
    }
    if (!ret || !ret.length) {
      const found = this.forModel.getRootModel().findSuccessorWithChildPathId(tagOrPathOrAqlPathOrChildPathId);
      ret = found ? ([found] as FormObjectModel[]) : [];
    }

    if (!ret || !ret.length) {
      console.warn("ScriptApi - no model found for tagOrPath or path =", tagOrPathOrAqlPathOrChildPathId);
    }
    return ret;
  }

  private formatFieldValue(elementName: string, model: FormObjectModel): { elementName: string, elementType: string, value: any } {
    let modelValue: any = RmTypeModelValueGetter.getValue(model as NodeModel);
    return {elementName: elementName, elementType: RmType[model.getRmType()], value: modelValue};
  }

  viewComponentsWithTag$(tagOrPath: string, withinContainerTag?: string): Observable<any> {
    let models: FormObjectModel[] = this.findByIdent(tagOrPath, withinContainerTag);
    if (!models || !models.length) {
      return Observable.empty();
    }

    let componentsByModel$ = models.reduce((prevVal: Observable<{ model: FormObjectModel, components: any[] }>, model: FormObjectModel) => {
      let modelComponents$: Observable<any> = this.modelCompsRegistry.componentsWithModel$(model);
      if (modelComponents$) {
        return prevVal ? prevVal.merge(modelComponents$) : modelComponents$;
      }
      return prevVal;
    }, null);

    if (!componentsByModel$) {
      return Observable.empty();
    }
    return componentsByModel$.scan((prevModelComponents: { model: FormObjectModel, components: any[] }[], currModelComponents: { model: FormObjectModel, components: any[] }) => {
      if (currModelComponents) {
        let existingModelIndex = prevModelComponents.findIndex((mComp: { model: FormObjectModel, components: any[] }) => {
          return mComp.model === currModelComponents.model;
        });
        if (existingModelIndex > -1) {
          prevModelComponents.splice(existingModelIndex, 1, currModelComponents);
        } else {
          prevModelComponents.push(currModelComponents);
        }
      }
      return prevModelComponents;
    }, []).map((modelComponentsArr: { model: FormObjectModel, components: any[] }[]) => {
      let collectedComponents: any[] = [];
      if (modelComponentsArr) {
        modelComponentsArr.forEach((mComp: { model: FormObjectModel, components: any[] }) => {
          mComp.components.forEach((comp: any) => {
            collectedComponents.indexOf(comp) < 0 ? collectedComponents.push(comp) : null;
          });
        });
      }
      return collectedComponents;
    });
  }

}

enum EventType {
  CHANGE,
  EDIT_START,
  EDIT_END,
  MOUSEOVER,
  MOUSEOUT,
  VISIBILITY_CHANGE,
  ENABLED_CHANGE,
  VALIDATION_CHANGE
}

export interface onChangeFieldValue {
  (changeValue: { elementName: string, elementType: string, value: any }): void;
}

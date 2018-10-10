import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {EhrContext} from '../../ehr-form-model/thinkehr-f4-model-ts/EhrContext';
import {TranslateService} from 'ng2-translate';
import {DictionaryKeys} from '../dictionary/DictionaryKeys';
import {ValidateOptions, EhrValidationHelper} from 'mrd-ui-components';
import {Observable} from 'rxjs';
import {EhrLayoutHelper} from '../utils/EhrLayoutHelper';
import {EhrFormState} from '../utils/EhrFormState';
import {EhrModelObservable} from './../../ehr-form-model/ehr-model-observable';
import {Subscription} from 'rxjs/Subscription';
import {NodeModel} from '../../ehr-form-model/thinkehr-f4-model-ts/model/NodeModel';
import {FormRootModel} from '../../ehr-form-model/thinkehr-f4-model-ts/model/FormRootModel';
import {ModelScriptExecutor} from '../ScriptApi';
import {TabService} from '../utils/TabService';
import {FormObjectModel} from '../../ehr-form-model/thinkehr-f4-model-ts/model/FormObjectModel';
import {EhrModelEvent, EhrModelEventType} from '../../ehr-form-model/ehr-model-event';
import {FORM_SCRIPT_API, FORM_SCRIPT_PROVIDER} from './FormScriptApiProvider';
import {FormScriptApi} from './FormScriptApi';
import {ViewComponentsRegistryService} from '../registered-components.service';
import {ThinkEhrModelParser} from '../../ehr-form-model/thinkehr-f4-model-ts/parsing/ThinkEhrModelParser';
import {Observer} from 'rxjs/Observer';
import {filter, map, switchMap, take} from 'rxjs/operators';
import {ThinkEhrUtil} from "../../ehr-form-model/thinkehr-f4-model-ts/ThinkEhrUtil";
import {FormRepeatableElementModel} from "../..";
import {NgbTypeahead} from "@ng-bootstrap/ng-bootstrap";

export let EHR_DICT_KEYS = new InjectionToken<any[]>('DictionaryKeysArr');

@Component({
  selector: 'ehr-form',
  templateUrl: 'ehr-form.component.html',
  styleUrls: ['ehr-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FORM_SCRIPT_PROVIDER, EhrModelObservable, EhrValidationHelper, TabService, EhrFormState]
})

export class EhrFormComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {

  @Input()
  formRootModel: any; // when FormRootModel type is set AbstractContainerModel throws .prototype null error;

  @Input()
  ehrContext: EhrContext;

  @Input()
  layout: any;

  @Input()
  displayFormIds: string[];

  @Output()
  onValidationChange: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  onFieldValidationChange: EventEmitter<{ model: FormObjectModel, errors: string[] }>
    = new EventEmitter<{ model: FormObjectModel, errors: string[] }>();

  @Output()
  onFormRendered: EventEmitter<FormRootModel> = new EventEmitter<FormRootModel>();

  @Output()
  onFormRenderedOneByOne: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  onFormGroup: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  @Output()
  onValueChange: EventEmitter<EhrFormValueChangeEvent> = new EventEmitter<EhrFormValueChangeEvent>();

  public api: ModelScriptExecutor;

  public get componentsRegistry(): ViewComponentsRegistryService {
    return this.scriptApi.componentsRegistry;
  }

  private EhrLayoutHelper: any = EhrLayoutHelper;

  private validateFormEvent: EventEmitter<ValidateOptions> = new EventEmitter<ValidateOptions>();

  rootFormGroup: FormGroup;

  private validationSubs: Subscription;

  private valueChangesSubs: Subscription;

  private isReadOnlySubs: Subscription;
  private isReadOnly: boolean;
  private isHiddenSubs: Subscription;
  private langSubs: Subscription;
  isHidden$: Observable<boolean>;
  private keepCompsFilterSubsArr: Subscription[] = [];
  private removeFormValueChangeListener: Function;
  private removeStructuredValidationChangeListener: Function;
  private removeFieldValidationChangeListener: Function;
  private valueChangeSubs: Subscription;

  constructor(private translateService: TranslateService, private ehrFormState: EhrFormState, private ehrModelObservable: EhrModelObservable,
              @Inject(FORM_SCRIPT_API) private scriptApi: FormScriptApi, private tabService: TabService, private changeDetectorRef: ChangeDetectorRef,
              private renderer2: Renderer2, private elementRef: ElementRef, private thinkEhrModelParser: ThinkEhrModelParser, @Inject(EHR_DICT_KEYS) dictKeys: DictionaryKeys[]) {

    dictKeys.forEach((dict: DictionaryKeys) => {
      this.setTranslation(dict.language, dict.keys);
    });

    this.ehrFormState.oneByOneRenderingState.filter(v => v === true)
      .subscribe((value) => {
          this.onFormRenderedOneByOne.emit(value);
      });
  }

  ngOnInit() {
    this.langSubs = this.translateService.onLangChange.subscribe(() => {
      this.validateFormEvent.next({alwaysForceIfNotDirty: null, nowForceIfNotDirty: false});
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('formRootModel')) {
      let simpleChange = changes['formRootModel'];
      let currentModel: FormRootModel = simpleChange.currentValue;

      this.tabService.clearTabGroups();
      this.rootFormGroup = new FormGroup({});
      this.onFormGroup.emit(this.rootFormGroup);
      if (this.valueChangesSubs) {
        this.valueChangesSubs.unsubscribe();
      }

      /*let obs = Observable.create((emitter: Observer<any>) => {
        currentModel.addUpdatedValueCallback((val: { model: Model }) => {
          emitter.next(val);
        });
      });

      this.valueChangesSubs = this.rootFormGroup.valueChanges.debounceTime(0).withLatestFrom(obs).subscribe((value) => {
        this.onValueChange.emit(value[1]);
      });*/

      this.updateValidationStatusSubscription();
      this.ehrModelObservable.destroyAllModelPathObservables();

      if (this.isReadOnlySubs) {
        this.isReadOnlySubs.unsubscribe();
      }
      if (this.isHiddenSubs) {
        this.isHiddenSubs.unsubscribe();
      }

      if (this.api) {
        this.api.destroy();
      }

      this.ehrFormState.clearOneByOneRenderingState();
      if (currentModel) {

        this.isReadOnlySubs = this.ehrModelObservable.fromEvent(currentModel.getViewConfig(), EhrModelEventType.EVENT_IS_READ_ONLY, currentModel.getViewConfig().isReadOnly())
          .map((ev: EhrModelEvent) => ev.data as boolean).subscribe((val) => {
            this.isReadOnly = val;
            this.changeDetectorRef.markForCheck();
          });

        this.isHidden$ = this.ehrModelObservable.fromEvent(currentModel.getViewConfig(), EhrModelEventType.EVENT_IS_HIDDEN, currentModel.getViewConfig().isHidden())
          .map((ev: EhrModelEvent) => ev.data as boolean);
        this.isHiddenSubs = this.isHidden$.subscribe((value: boolean) => {
          if (!!value) {
            this.renderer2.addClass(this.elementRef.nativeElement, 'ehr-hidden');
          } else {
            this.renderer2.removeClass(this.elementRef.nativeElement, 'ehr-hidden');
          }
        });

        this.scriptApi.registerComponent(this, currentModel);
        this.api = this.scriptApi.exeFormScript(currentModel, currentModel.getViewConfig().getEhrFormScript(), this.ehrModelObservable);
        this.tabService.registerTabGroupsForModel(currentModel);
      }

      //TODO try to move it to ngAfterViewInit
      if (simpleChange || !simpleChange.isFirstChange()) {
        if (this.removeFormValueChangeListener) {
          this.removeFormValueChangeListener();
        }

        if (this.removeStructuredValidationChangeListener) {
          this.removeStructuredValidationChangeListener();
        }
        setTimeout(() => {
          if (currentModel) {
            // structured validation event
            this.removeStructuredValidationChangeListener = currentModel.addEventListener(this.onStructuredValidationChange.bind(this), EhrModelEventType.EVENT_STRUCTURED_VALIDATION_CHANGE);

            if (this.valueChangeSubs) {
              this.valueChangeSubs.unsubscribe();
            }
            //value change event
            this.valueChangeSubs = Observable.create((emitter: Observer<any>) => {
              // creating observable from model change event
              this.removeFormValueChangeListener = currentModel.addUpdatedValueCallback((val: { model: FormObjectModel, previousValue: any[] }) => {
                emitter.next(val);
              });
            }).pipe(
              filter(() => {
                return !this.rootFormGroup.pristine;
              }),
              switchMap((modelChVal: { model: FormObjectModel, previousValue: any[] }) => {
                // getting components from registry
                if (modelChVal && modelChVal.model) {
                  return this.componentsRegistry.componentsWithModel$(modelChVal.model)
                    .pipe(
                      map((m_comps: { model: FormObjectModel, components: any[], previousValue?: any[] }) => {
                        m_comps.previousValue = modelChVal.previousValue;
                        return m_comps;
                      }),
                      take(1)
                    );
                } else {
                  return Observable.of(Object.assign(modelChVal, {components: []}));
                }
              }),
            ).subscribe((modComps: EhrFormValueChangeEvent) => {
              // dispatch change event with model and components
              this.onValueChange.emit(modComps);
            });

            if (this.removeFieldValidationChangeListener) {
              this.removeFieldValidationChangeListener();
            }
            this.removeFieldValidationChangeListener = currentModel.addEventListener((val: { data: { model: FormObjectModel, validationErrors: string[] } }) => {
              this.onFieldValidationChange.emit({model: val.data.model, errors: val.data.validationErrors});
            }, EhrModelEventType.EVENT_MODEL_VALIDATION_CHANGE);
            currentModel.structuredValidationDisabled = false;
          }

          this.onFormRendered.emit(currentModel);
        });
      }
    }

    if (changes.hasOwnProperty('displayFormIds')) {
      let currDispFormIdVal = changes.displayFormIds.currentValue;
      if (currDispFormIdVal) {
        this.displayByFormId(currDispFormIdVal, this.formRootModel);
      }
    }

    if (changes.hasOwnProperty('ehrContext')) {
      let newVal: EhrContext = changes['ehrContext'].currentValue;
      if (newVal) {
        if (newVal.language) {
          this.translateService.use(newVal.language);
        }
        this.ehrFormState.setFormContext(newVal);
      }
    }

  }

  ngAfterViewInit() {
    ///this.onFormRendered.emit(this.formRootModel);
  }

  ngOnDestroy() {
    this.unsubscribeAll();

    if (this.api) {
      this.api.destroy();
    }
    this.scriptApi.unregisterComponent(this, this.formRootModel);
    this.scriptApi.destroy();
    this.ehrFormState.setFormContext(null);
    this.removeFormValueChangeListener();
    this.removeFormValueChangeListener = null;

    if (this.removeStructuredValidationChangeListener) {
      this.removeStructuredValidationChangeListener();
      this.removeStructuredValidationChangeListener = null;
    }

    if (this.removeFieldValidationChangeListener) {
      this.removeFieldValidationChangeListener();
      this.removeFieldValidationChangeListener = null;
    }

    this.ehrModelObservable.destroyAllModelPathObservables();
  }

  private onStructuredValidationChange(ev: EhrModelEvent) {
    if (ev.data.model) {
      this.scriptApi.componentsRegistry.componentsWithModel$(ev.data.model).take(1).subscribe((res) => {
        if (res) {
          if (!res.model.isContainer()) {
            res.components.forEach((comp: EhrFormComponent) => {
              comp.validateFormEvent.next({alwaysForceIfNotDirty: true});
            });
          }
        }
      });
    }
  }

  validate(alwaysForceIfNotDirty: boolean = true, ignoreStructuredValidation: boolean = false): boolean {
    if (!ignoreStructuredValidation) {
      this.formRootModel.resetStructuredValidation();
    }
    // TODO with structured validation each field shows validation messages so this call is probably redundant?
    this.validateFormEvent.next({alwaysForceIfNotDirty: alwaysForceIfNotDirty});
    return this.isValid;
  }

  get isValid(): boolean {
    return this.rootFormGroup ? this.rootFormGroup.valid : false;
  }

  setTranslation(lang: string, keyVals: Object, isDefault: boolean = false) {
    this.translateService.setTranslation(lang, keyVals, true);
    if (isDefault) {
      this.translateService.setDefaultLang(lang);
    }
  }

  getFieldValueObservable(fieldModel: NodeModel): Observable<any> {
    return this.ehrModelObservable.fromValue(fieldModel);
  }

  private updateValidationStatusSubscription() {
    if (this.validationSubs) {
      this.validationSubs.unsubscribe();
    }
    this.validationSubs = this.rootFormGroup.statusChanges.filter(v => {
      return v === 'VALID' || v === 'INVALID';
    }).distinctUntilChanged().debounceTime(0).subscribe((val) => {
      this.onValidationChange.next(val);
    });
  }

  private displayByFormId(displayFormIds: string[], rootModel: FormRootModel): void {
    if (displayFormIds && rootModel) {
      this.renderer2.addClass(this.elementRef.nativeElement, 'ehr-hidden');
      let keepPathIdMultiIndexes: { [pathId: string]: number[] } = {};

      displayFormIds.forEach((displayFormId: string) => {
        const delimInd: number = displayFormId.lastIndexOf(':');
        let [disPathId, disIndex]: [string, string] = (delimInd < 0) ? [displayFormId, ''] : [displayFormId.substring(0, delimInd), displayFormId.substring(delimInd + 1)];
        if (!disIndex) {
          disIndex = '-1';
        }
        //indexes can be comma delimited
        let pathIndArr: number[] = keepPathIdMultiIndexes[disPathId];
        if (!pathIndArr) {
          pathIndArr = [];
          keepPathIdMultiIndexes[disPathId] = pathIndArr;
        }
        disIndex.toString().split(',').map(v => parseInt(v, 10)).forEach((value) => {
          if (value > -1 && pathIndArr.indexOf(value) < 0) {
            pathIndArr.push(value);
          } else if (value == -1) {
            pathIndArr = [];
          }
        });
      });

      if (this.keepCompsFilterSubsArr && this.keepCompsFilterSubsArr.length) {
        this.keepCompsFilterSubsArr.forEach(s => s.unsubscribe());
        this.keepCompsFilterSubsArr.length = 0;
      }
      let pathIds = Object.keys(keepPathIdMultiIndexes);
      if (pathIds.length) {
        pathIds.forEach((pathId: string) => {
          let componentsWithFilter$ = this.scriptApi.componentsRegistry.componentsWithFilter$((model: FormObjectModel) => {
            return model && model.getPath() == pathId;
          });
          componentsWithFilter$.take(1).subscribe(() => {
            setTimeout(() => {
              this.renderer2.removeClass(this.elementRef.nativeElement, 'ehr-hidden');
            });
          });
          this.keepCompsFilterSubsArr.push(componentsWithFilter$.subscribe((value: any[]) => {
              let keepModels = value.reduce((state, curr) => {
                state.push(curr.model);
                return state;
              }, []);
              this.EhrLayoutHelper.hideOtherThan(rootModel, keepModels, keepPathIdMultiIndexes[pathId]);
            })
          );
        });
      } else {
        this.renderer2.removeClass(this.elementRef.nativeElement, 'ehr-hidden');
      }
    }

  }

  updateValues(newVals: any, discardCurrentValues?: boolean, onlyUpdateOldProps?: boolean): boolean {

    let oldVals = this.formRootModel.getValueNodeRef();
    if (!!discardCurrentValues) {
      oldVals = this.thinkEhrModelParser.clearValues(oldVals);
    }
    const hasNewProps = this.objectHasNewProps(oldVals, newVals);

    newVals = this.thinkEhrModelParser.addToValueObject(oldVals, newVals, onlyUpdateOldProps);
    this.thinkEhrModelParser._parseValues(this.formRootModel, newVals, newVals, true);
    return hasNewProps;
  }

  private objectHasNewProps(oldObj: any, newObj: any): boolean {
    if (ThinkEhrUtil.isObject(oldObj) && ThinkEhrUtil.isObject(newObj)) {

      const newProps = Object.keys(newObj);
      let isAnyPropNew: boolean = newProps.some((prop: string, i) => {
        return oldObj[prop] === undefined;
      });
      if (!isAnyPropNew) {
        isAnyPropNew = newProps.some((nProp: string) => {
          const propValOld = oldObj[nProp];
          const propValNew = newObj[nProp];
          if (ThinkEhrUtil.isArray(propValNew)) {
            const isContainer: boolean = !!propValNew.length && !propValNew.some((valItm) => {
              return !ThinkEhrUtil.isObject(valItm) || Object.keys(valItm).some((key: string) => key.startsWith('|'));
            });
            if (!isContainer) {
              return false;
            }
            return propValNew.some((propValItem, idx) => {
              return propValOld[idx] === undefined || this.objectHasNewProps(propValOld[idx], propValItem);
            });
          }
          return this.objectHasNewProps(propValOld, propValNew);
        });
      }
      return isAnyPropNew;
    }
    return false;
  }

  private unsubscribeAll() {
    if (this.keepCompsFilterSubsArr && this.keepCompsFilterSubsArr.length) {
      this.keepCompsFilterSubsArr.forEach(s => s.unsubscribe());
      this.keepCompsFilterSubsArr.length = 0;
    }
    if (this.validationSubs) {
      this.validationSubs.unsubscribe();
    }
    if (this.valueChangesSubs) {
      this.valueChangesSubs.unsubscribe();
    }
    if (this.isReadOnlySubs) {
      this.isReadOnlySubs.unsubscribe();
    }
    if (this.isReadOnlySubs) {
      this.isReadOnlySubs.unsubscribe();
    }
    if (this.langSubs) {
      this.langSubs.unsubscribe();
    }
    if (this.valueChangeSubs) {
      this.valueChangeSubs.unsubscribe();
    }
  }

}

export interface EhrFormValueChangeEvent {
  model: FormObjectModel;
  components: any[];
  previousValue: any[];
}

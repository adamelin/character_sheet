import {
  Component, EventEmitter, Input, ChangeDetectorRef, Renderer, ElementRef,
  OnChanges, SimpleChanges, transition, forwardRef, ViewChild, AfterViewInit, OnInit, Renderer2, OnDestroy, Inject
} from '@angular/core';
import {AbstractEhrComponent} from '../abstract-ehr-component.component';
import {FormGroup, FormControl} from '@angular/forms';
import {EhrValidationMessageResolver} from '../utils/validation/ehr-validation-message-resolver';
import {EhrFormConfig} from '../EhrFormConfig';
import {EhrFormState} from '../utils/EhrFormState';
import {EhrLayoutHelper} from '../utils/EhrLayoutHelper';
import {NodeModel} from '../../ehr-form-model/thinkehr-f4-model-ts/model/NodeModel';
import {FieldPresentation} from '../../ehr-form-model/thinkehr-f4-model-ts/view/FieldPresentation';
import {InputItem} from '../../ehr-form-model/thinkehr-f4-model-ts/InputItem';
import {CodedTextFieldModel} from '../../ehr-form-model/thinkehr-f4-model-ts/model/fieldModel/CodedTextFieldModel';
import {Observable, BehaviorSubject, Subscription} from 'rxjs';
import {Field} from '../../ehr-form-model/thinkehr-f4-model-ts/view/Field';
import {Input as EhrInput} from '../../ehr-form-model/thinkehr-f4-model-ts/Input';
import {CodeValueBasedFieldModel} from '../../ehr-form-model/thinkehr-f4-model-ts/model/fieldModel/CodeValueBasedFieldModel';
import {ScriptApi} from '../ScriptApi';
import {EhrModelObservable} from '../../ehr-form-model/ehr-model-observable';
import {ThinkEhrUtil} from '../../ehr-form-model/thinkehr-f4-model-ts/ThinkEhrUtil';
import {
  ValidateOptions,
  ResultListOptions,
  MrdCodedTextInputComponent,
  EhrValidationHelper,
  ValidationErrorMessage,
  ///MrdCodedTextInputSearchAction,
  MrdCodedTextInputValueAction,
  MrdCodedTextInputBehaviorType,
  MrdCodedTextInputActionTriggerType
} from 'mrd-ui-components';
import {EhrContext} from '../../ehr-form-model/thinkehr-f4-model-ts/EhrContext';
import {TranslateService} from 'ng2-translate';
import {FORM_SCRIPT_API} from '../ehr-form/FormScriptApiProvider';
import {FormScriptApi} from '../ehr-form/FormScriptApi';
import {Observer} from 'rxjs/Observer';
import {Subject} from 'rxjs/Subject';
import {TextFieldModel} from '../../ehr-form-model/thinkehr-f4-model-ts/model/fieldModel/TextFieldModel';
import {el} from '@angular/platform-browser/testing/src/browser_util';
import {EhrModelEventType} from '../../ehr-form-model/ehr-model-event';
import {EhrModelEvent} from "../../ehr-form-model/ehr-model-event";
import {filter, switchMap} from "rxjs/operators";
import {NgbTypeahead} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'ehr-coded-text',
  templateUrl: './ehr-coded-text.component.html',
  styleUrls: ['./ehr-coded-text.component.scss']
})
export class EhrCodedTextComponent extends AbstractEhrComponent implements OnChanges, OnDestroy, AfterViewInit, OtherValueGenerator, MinComboRenderer, ClearItemDisplayer {

  @Input()
  model: CodeValueBasedFieldModel;

  @Input()
  ehrFormGroup: FormGroup;

  @Input()
  validateFormEvent: EventEmitter<ValidateOptions>;

  @ViewChild('mrdCodedTextInput')
  mrdCodedTextInput: MrdCodedTextInputComponent;

  private searchResultItemsListFilterSelected$: Observable<any[]>; ///= [{label: 'onee', value:'id1'}, {label:"twoo",value: '2id'}];

  private searchResultItemsListTotal: BehaviorSubject<any> = new BehaviorSubject([]);

  private codedTxtInputResultObsOrArrValue: Observable<any> | any[];

  ///private OTHER_VALUE_IDENT: string = '__other__';
  private OTHER_VALUE_LABEL: string = 'Other>>';
  private OTHER_VALUE_SELECTED_LABEL: string = 'Other: ';
  private OTHER_VALUE_PROP = '__othervalue';
  private CLEAR_VALUE_LABEL = 'Clear';
  private otherValueControl: FormControl;
  private otherValueSubs: Subscription;
  private localComboOtherSelected: BehaviorSubject<any> = new BehaviorSubject(false);
  private setupOtherInputAfterViewInit: boolean;

  private otherValueLabel$: Observable<string>;
  private otherValueLabelSubs: Subscription;
  private codeValueLabel$: Observable<{ label: string, value: string }[]>;

  private translatedValidationErrorsSubs: any;
  private translatedValidationErrors: any;
  radioCheckboxColumns: number;
  minItemsForComboPresentation: number = 0;

  private selectInputLabelOnTop: boolean;
  private selectInputLabelHide: boolean;
  private comboActionsSubs: Subscription;
  private dropdownClearSubs: Subscription;
  private dropdownSearchClearSubs: Subscription;

  private clearButtonDisplay: boolean;
  private radioClearButtonHide: boolean;
  dropdownEmptyItemHide: boolean;

  private comboActions: MrdCodedTextInputValueAction[] = [];

  private terminologyItemChangeHandler: Function;
  private clearValueHandler: Function;

  private terminologyChange: Subject<any> = new Subject();
  radioClearItem: boolean;
  private readOnlySubs: Subscription;

  showHint: boolean;

  static addClearItem(component: ClearItemDisplayer, newModel: CodeValueBasedFieldModel | TextFieldModel) {
    return (valArr: any[]): any[] => {
      if (EhrCodedTextComponent.shouldAddClearItem(valArr, component, newModel)) {
        if (valArr[0]) {
          if (valArr[0].value !== '') {
            valArr.unshift({label: '', value: ''});
          }
        }
      }
      return valArr;
    };
  }

  static shouldAddClearItem(optionItemsList: any[], component: ClearItemDisplayer, newModel: CodeValueBasedFieldModel | TextFieldModel): boolean {
    let itemsListLen: number = optionItemsList.length;
    if (AbstractEhrComponent.shouldAddOtherOptionItem(newModel) && !AbstractEhrComponent.hasOtherOptionItem(optionItemsList)) {
      itemsListLen++;
    }

    let shouldDisplayClearItem: boolean = !component.radioClearItem ? (!component.dropdownEmptyItemHide && !component.radioCheckboxColumns) : (!component.dropdownEmptyItemHide || (!!component.radioCheckboxColumns && component.maxItems < 2) || (itemsListLen + 1 < component.minItemsForComboPresentation));

    if (shouldDisplayClearItem && component.maxItems < 2) {
      return true;
    }
    return false;
  }

  static updateClearItemAfterColsSet(component: ClearItemDisplayer) {
    return (valArr: any[]): any[] => {
      if (((!component.radioClearItem && !!component.radioCheckboxColumns && valArr[0]) || (!component.radioCheckboxColumns && component.dropdownEmptyItemHide)) && valArr[0] && valArr[0].value === '') {
        valArr.shift();
      }
      return valArr;
    };
  }

  static setRadioColumns(newModel: CodeValueBasedFieldModel | TextFieldModel, component: MinComboRenderer, autoColumns: number = 1) {
    return (itemsOptionListArr: any[]): any[] => {
      let finalValArrLen = itemsOptionListArr.filter((itm) => {
        return itm instanceof InputItem;
      }).length;

      if (!!itemsOptionListArr.length && component.minItemsForComboPresentation) {
        if (finalValArrLen < component.minItemsForComboPresentation) {
          if (!component.radioCheckboxColumns) {
            component.radioCheckboxColumns = autoColumns;
          }
        }
      }
      return itemsOptionListArr;
    };
  }

  static addOtherToOptions(valArr: any[], model: CodeValueBasedFieldModel, radioCheckboxCols: number, component: OtherValueGenerator) {
    const isFirstEmpty: boolean = !valArr[0] || !valArr[0].value;
    let positionAt: number = isFirstEmpty ? 1 : 0;
    if (radioCheckboxCols > 0) {
      positionAt = valArr.length;
    }
    if (AbstractEhrComponent.shouldAddOtherOptionItem(model)) {
      const currOtherInd = valArr.findIndex(v => v.value == AbstractEhrComponent.OTHER_VALUE_IDENT);
      if (currOtherInd > -1 && positionAt !== currOtherInd) {
        valArr.splice(currOtherInd, 1);
      }
      if (positionAt > -1 && positionAt !== currOtherInd) {
        valArr.splice(positionAt, 0, component.generateOtherValueObj(''));
      }
    }
    return valArr;
  }

  static resetEmptyItemClass(renderer: Renderer2, elementRef: ElementRef, clearValClass: string) {
    return (itemsListArr: any[]) => {
      if (itemsListArr.length && itemsListArr[0].value == '') {
        renderer.addClass(elementRef.nativeElement, clearValClass);
      } else {
        renderer.removeClass(elementRef.nativeElement, clearValClass);
      }
      return itemsListArr;
    };
  }


  constructor(elementRef: ElementRef, renderer: Renderer2, changeDetectorRef: ChangeDetectorRef, EhrLayoutHelper: EhrLayoutHelper,
              ehrFormState: EhrFormState, ehrFormConfig: EhrFormConfig, validationResolver: EhrValidationMessageResolver, @Inject(FORM_SCRIPT_API) public scriptApi: FormScriptApi, ehrModelObservable: EhrModelObservable, private translateService: TranslateService, public ehrValidationHelper: EhrValidationHelper) {
    super(elementRef, renderer, changeDetectorRef, EhrLayoutHelper, ehrFormState, ehrFormConfig, validationResolver, scriptApi, ehrModelObservable, ehrValidationHelper);
    AbstractEhrComponent.OTHER_VALUE_IDENT = InputItem.OTHER_VALUE;
    this.translateService.get('other.selectOptionLabel').subscribe((translatedVal: string) => {
      if (translatedVal) {
        this.OTHER_VALUE_LABEL = translatedVal;
      }
    });

    this.translateService.get('other.selectedLabel').subscribe((translatedVal: string) => {
      if (translatedVal) {
        this.OTHER_VALUE_SELECTED_LABEL = translatedVal;
      }
    });

    this.translateService.get('clearValue').subscribe((translatedVal: string) => {
      if (translatedVal) {
        this.CLEAR_VALUE_LABEL = translatedVal;
      }
    });

    this.readOnlySubs = this.modelSubj.asObservable().pipe(
      filter(v => !!v),
      switchMap((forModel: NodeModel) => {
        return this.ehrModelObservable.fromEvent(forModel.getViewConfig(), EhrModelEventType.EVENT_IS_READ_ONLY, forModel.getViewConfig().isReadOnly())
          .map((ev: EhrModelEvent) => ev.data as boolean) as Observable<boolean>;
      })
    ).subscribe((isReadOnly: boolean) => {
      if (this.otherValueControl) {
        if (isReadOnly) {
          this.otherValueControl.disable();
        } else {
          this.otherValueControl.enable();
        }
      }

    });
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    super.ngOnChanges(simpleChanges);


    if (simpleChanges.hasOwnProperty('model')) {
      let newModel: CodedTextFieldModel = simpleChanges['model'].currentValue as CodedTextFieldModel;

      if (this.clearValueHandler) {
        this.clearValueHandler();
      } else {
        this.clearValueHandler = () => {
          this.localComboOtherSelected.next(false);
        };
      }
      if (simpleChanges.model.previousValue) {
        simpleChanges.model.previousValue.removeEventListener(this.clearValueHandler, EhrModelEventType.CLEAR_VALUE_EVENT);
      }
      newModel.addEventListener(this.clearValueHandler, EhrModelEventType.CLEAR_VALUE_EVENT);

      if (simpleChanges['model'].previousValue) {
        simpleChanges['model'].previousValue.removeTerminologyItemUpdateListener(this.terminologyItemChangeHandler);
      }
      if (!this.terminologyItemChangeHandler) {
        this.terminologyItemChangeHandler = (ev) => {
          this.terminologyChange.next(ev);
        };
      }

      newModel.addTerminologyItemUpdateListener(this.terminologyItemChangeHandler);

      this.selectInputLabelOnTop = newModel.getViewConfig().hasTag('inputLabelOnTop');
      this.selectInputLabelHide = newModel.getViewConfig().hasTag('inputLabelHide');

      this.clearButtonDisplay = newModel.getViewConfig().hasTag('clearButton') || this.clearButtonDisplay;
      this.radioClearButtonHide = newModel.getViewConfig().hasTag('hideRadioClearButton') || this.radioClearButtonHide;
      this.dropdownEmptyItemHide = newModel.getViewConfig().hasTag('noEmptyValueItem') || this.dropdownEmptyItemHide;

      this.maxItems = AbstractEhrComponent.maxItemsViewNr(newModel);
      this.minItems = AbstractEhrComponent.minItemsViewNr(newModel);

      if (newModel.getViewConfig().getFields('code')) {
        this.radioCheckboxColumns = this.isCombo(newModel, newModel.getViewConfig().getFields('code'), 2) ? 0 : newModel.getViewConfig().getFields('code').columns;
      } else {
        this.radioCheckboxColumns = null;
      }

      let terminologyCode = this.getTerminology(newModel);
      if (!terminologyCode) {
        let modelItemsVOList = newModel.getInputFor('code').getList().map((ii: InputItem) => {
          return {
            value: ii.getValue(),
            label: ii.getLabel(this.ehrFormState.currentLanguage, this.model.hasTag('displayOrdinalValue') || this.model.annotationValue('displayOrdinalValue') === 'true')
          };
        });
        this.searchResultItemsListTotal.next(modelItemsVOList);
      }

      if (!this.comboActionsSubs) {
        this.comboActionsSubs = this.ehrFormState.getFormContext().subscribe((fCtx: EhrContext) => {

          this.showHint = fCtx.dropdownOpenPreselectFirst;
          /*// quick fix for melanoma project - custom component in NG6+
          if (this.showHint) {
            NgbTypeahead.prototype['_showHint'] = function () {
              if (this.showHint) {
                var userInputLowerCase = this._userInput ? this._userInput.toLowerCase() : '';
                var formattedVal = this._formatItemForInput(this._windowRef.instance.getActive());
                if (userInputLowerCase === formattedVal.substr(0, this._userInput ? this._userInput.length : 0).toLowerCase()) {
                  this._writeInputValue('' + formattedVal.substr(0));
                  this._elementRef.nativeElement['setSelectionRange'].apply(this._elementRef.nativeElement, [0, formattedVal.length]);
                }
                else {
                  this.writeValue(this._windowRef.instance.getActive());
                }
              }
            };
          }*/


          this.radioClearItem = fCtx.displayRadioClearItem;

          this.dropdownEmptyItemHide = fCtx.dropdownEmptyItemHide;
          this.clearButtonDisplay = fCtx.dropdownClearButtonShow;
          this.minItemsForComboPresentation = fCtx.dropdownPresentationMinItems;
          if (fCtx.comboboxActions) {
            this.comboActions = fCtx.comboboxActions.map((comboAct: MrdCodedTextInputValueAction) => {
              if (comboAct.trigger == MrdCodedTextInputActionTriggerType.SELECTED) {
                comboAct = Object.assign({}, comboAct);
                let originalCallbackFn = comboAct.callbackFn;
                let callbackFn = () => {
                  originalCallbackFn(newModel, this.elementRef.nativeElement);
                };
                comboAct.callbackFn = callbackFn;
              }
              return comboAct;
            });
          } else {
            this.comboActions = [];
          }

          if (!terminologyCode) {
            if (this.dropdownClearSubs) {
              this.dropdownClearSubs.unsubscribe();
            }

            //TODO set this.codedTxtInputResultObsOrArrValue = this.searchResultItemsListTotal.map(addClearItem).switchMap(translateClearItemObs(this.translateService)).map(...)
            // and display values in onSearch - this way 'clear' is translated on language change
            // add tests for different ctx.dropdownEmptyItemHide with dropdownPresentationMinItems (so radios are rendered)
            this.dropdownClearSubs = this.searchResultItemsListTotal
              .map(EhrCodedTextComponent.setRadioColumns(newModel, this, fCtx.dropdownPresentationMinItemsColumns || 1))
              .map(EhrCodedTextComponent.updateClearItemAfterColsSet(this))
              .map(EhrCodedTextComponent.addClearItem(this, newModel))
              .switchMap(AbstractEhrComponent.translateClearItemObs(this.translateService))
              .map((valArr: any[]) => EhrCodedTextComponent.addOtherToOptions(valArr, newModel, this.radioCheckboxColumns, this))
              .map(EhrCodedTextComponent.resetEmptyItemClass(this.renderer, this.elementRef, this.CLEAR_VALUE_USED_CLASS_NAME))
              .subscribe((itemsListArr: any[]) => {
                this.codedTxtInputResultObsOrArrValue = itemsListArr;
              });

          } else {
            this.searchResultItemsListFilterSelected$ = this.searchResultItemsListTotal
              .map(EhrCodedTextComponent.addClearItem(this, newModel))
              .switchMap(AbstractEhrComponent.translateClearItemObs(this.translateService))
              .map((valArr: any[]) => EhrCodedTextComponent.addOtherToOptions(valArr, newModel, this.radioCheckboxColumns, this))
              .map(EhrCodedTextComponent.resetEmptyItemClass(this.renderer, this.elementRef, this.CLEAR_VALUE_USED_CLASS_NAME));
            this.codedTxtInputResultObsOrArrValue = this.searchResultItemsListFilterSelected$;
          }
        });
      }

      this.otherValueControl = new FormControl(null);
      if (newModel.getViewConfig().isReadOnly()) {
        this.otherValueControl.disable();
      } else {
        this.otherValueControl.enable();
      }
      this.setupOtherValueValidators();

      if (this.otherValueSubs) {
        this.otherValueSubs.unsubscribe();
      }
      this.otherValueSubs = this.otherValueControl.valueChanges.distinctUntilChanged().subscribe((val) => {
        if (val != null) {
          this.model.otherValue(val);
          this.localComboOtherSelected.next(true);
        }
      });

      if (this.otherValueControl) {
        this.setupOtherInputSetter();
      } else {
        this.setupOtherInputAfterViewInit = true;
      }
    }
  }

  ngAfterViewInit() {
    if (this.setupOtherInputAfterViewInit) {
      this.setupOtherInputAfterViewInit = false;
      this.setupOtherInputSetter();
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    if (this.comboActionsSubs) {
      this.comboActionsSubs.unsubscribe();
    }

    if (this.dropdownClearSubs) {
      this.dropdownClearSubs.unsubscribe();
    }

    if (this.dropdownSearchClearSubs) {
      this.dropdownSearchClearSubs.unsubscribe();
    }

    if (this.otherValueLabelSubs) {
      this.otherValueLabelSubs.unsubscribe();
    }

    if (this.otherValueSubs) {
      this.otherValueSubs.unsubscribe();
    }

    if (this.translatedValidationErrorsSubs) {
      this.translatedValidationErrorsSubs.unsubscribe();
    }

    this.elementRef = null;
    this.readOnlySubs.unsubscribe();
    if (this.model) {
      this.model.removeTerminologyItemUpdateListener(this.terminologyItemChangeHandler);
      this.terminologyItemChangeHandler = null;
      this.model.removeEventListener(this.clearValueHandler, EhrModelEventType.CLEAR_VALUE_EVENT);
      this.clearValueHandler = null;
    }
    this.terminologyChange.complete();
  }

  protected updateModelValuesObs(forModel: NodeModel) {

    const modelValuesBase: Observable<any> = this.getModelValuesArrObs(forModel).distinctUntilChanged(ThinkEhrUtil.arrayValuesEqual)
      .combineLatest(this.terminologyChange.startWith(null), (valArr, terCh) => {
        this.notApplicableValue = this.isNotApplicableValue(valArr);
        if (this.notApplicableValue) {
          valArr = [];
        }
        if (valArr && valArr.length) {
          valArr = this.model.labelValue(this.ehrFormState.currentLanguage, true, this.model.hasTag('displayOrdinalValue') || this.model.annotationValue('displayOrdinalValue') === 'true');
          //TODO always return array from model
          if (!this.model.isMulti()) {
            valArr = [valArr];
          }
        } else {
          valArr = [];
        }
        return valArr;
      });

    const localComboSelectedValues = this.localComboOtherSelected.skip(1).distinctUntilChanged().withLatestFrom(modelValuesBase, (otherSel, valArr) => {
      if (!otherSel) {
        valArr = valArr.filter(v => v.value !== AbstractEhrComponent.OTHER_VALUE_IDENT);
      }
      return this.addOtherValueToValuesArr(valArr, forModel as CodeValueBasedFieldModel, otherSel);
    });

    const modelValuesUpdated = localComboSelectedValues.merge(modelValuesBase.map((valArr) => {
      return this.addOtherValueToValuesArr(valArr, forModel as CodeValueBasedFieldModel, this.localComboOtherSelected.getValue());
    })).filter((valArr) => {
      const hasOtherValue = valArr.some(v => v.value === AbstractEhrComponent.OTHER_VALUE_IDENT);
      if (!this.localComboOtherSelected.getValue() && hasOtherValue) {
        this.localComboOtherSelected.next(true);
        return false;
      }
      return true;
    });

    this.modelValues$ = modelValuesUpdated.map(valArr => {
      this.resetMultiButtonsState(valArr);
      return valArr;
    });

    this.otherValueLabel$ = <Observable<string>>this.modelValues$.map((val: { label: string, value: string }[]) => {
      return val.find((v) => !!v && v.value === InputItem.OTHER_VALUE) || {};
    }).pluck(this.OTHER_VALUE_PROP);

    this.codeValueLabel$ = <Observable<any>>this.modelValues$.startWith([])
      .combineLatest(this.otherValueLabel$.startWith(null), (valArr: any[], otherLabel: string) => {
        if (!valArr.length && this.radioClearItem && this.radioCheckboxColumns > 0 && this.maxItems < 2) {
          valArr.push({value: '', label: this.CLEAR_VALUE_LABEL});
          EhrCodedTextComponent.resetEmptyItemClass(this.renderer, this.elementRef, this.CLEAR_VALUE_USED_CLASS_NAME)(valArr);
        }
        this.resetOtherAndCodedTextValidators(valArr, this.otherValueControl);

        return valArr;
      });

    //TODO filter already selected data

  }

  getModelValuesArrObs(forModel: NodeModel): Observable<any> {
    //set default values
    (forModel as CodedTextFieldModel).codeValue(undefined);
    let updatedModel$: Observable<NodeModel> = this.ehrModelObservable.getModelPathObservable(forModel);
    let codeValueObs = updatedModel$.map((updatedModel: NodeModel) => {
      return updatedModel[this.modelGetterSetterMethodName](undefined, this.ehrFormState.currentLanguage);
    });
    return codeValueObs.map(v => {
      let newVal;
      if (v) {
        newVal = [...v];
      } else {
        newVal = [];
      }

      let otherVal: string = this.model.otherValue();
      if (otherVal) {
        newVal.push(otherVal);
      }

      return newVal && newVal.length ? newVal : null;
    });
  }

  onRemoveMultiInput(indexValueObj: { index: number, value: { value: string } }) {
    super.onRemoveMultiInput(null);
    let rIndex = indexValueObj.index;
    if (rIndex >= 0) {
      if (indexValueObj.value.value !== InputItem.OTHER_VALUE) {
        this.model.removeValue(indexValueObj.value.value);
        this.otherValueControl.markAsDirty();
      } else {
        this.localComboOtherSelected.next(false);
        this.model.removeOtherValue();
      }
    }
  }

  updateModel(labelValObj: any) {
    if (labelValObj.value === AbstractEhrComponent.OTHER_VALUE_IDENT) {
      // other was selected need to display "Other>>" and other input
      this.localComboOtherSelected.next(true);
      return;
    }
    if (!this.model.isMulti()) {
      this.localComboOtherSelected.next(false);
    }
    if (labelValObj) {
      this.model.codeValue(labelValObj.value, this.ehrFormState.currentLanguage);
    }

  }

  loadAllTerminologyItems() {
    this.codeInput(this.model).getTerminologyItemsWithLabel({showAll: true});
  }

  private terminologySearch(queryObj: any) {
    this.codeInput(this.model).getTerminologyItemsWithLabel({
      query: queryObj.showAll ? '' : queryObj.search,
      force: queryObj.showAll ///|| val.actionType == MrdCodedTextInputSearchAction.FORCE_ALL
    }, function (resArr) {

      let resList = resArr.map((resItem) => {
        return {label: resItem.label, value: resItem.value};
      });
      if (!!this.radioCheckboxColumns) {
        resList = resList.filter((v) => v && !!v.value);
      }
      this.searchResultItemsListTotal.next(resList);
      this.changeDetectorRef.markForCheck();

    }.bind(this));
  }

  onSearch(val: ResultListOptions) {
    if (this.dropdownSearchClearSubs) {
      this.dropdownSearchClearSubs.unsubscribe();
    }
    if (this.getTerminology(this.model)) {
      if (val.showAll || (val.search && val.search.length >= 1)) {
        this.terminologySearch(val);
      }
    }
  }

  getTerminology(model: NodeModel) {
    return model.getInputFor('code') && model.getInputFor('code').getTerminology();
  };

  codeInput(model: NodeModel): EhrInput {
    return model.getInputFor('code');
  };

  private setupOtherInputSetter() {
    if (this.otherValueLabelSubs) {
      this.otherValueLabelSubs.unsubscribe();
    }
    this.otherValueLabelSubs = this.otherValueLabel$.distinctUntilChanged().subscribe((val) => {
      if (this.otherValueControl) {
        this.otherValueControl.setValue(val, {onlySelf: false, emitViewToModelChange: false});
      }
    });
  }

  protected presentation(field: Field): FieldPresentation {
    let present: FieldPresentation = null;
    if (field && field.getPresentation && field.getPresentation()) {
      present = field.getPresentation();
    }
    let acceptedPresentations = [FieldPresentation.COMBOBOX, FieldPresentation.RADIOS];
    if (acceptedPresentations.indexOf(present) < 0) {
      present = FieldPresentation.COMBOBOX;
    }
    return present;
  };

  private addOtherValueToValuesArr(vArr: any[], model: CodeValueBasedFieldModel, force?: boolean): any[] {
    const present: boolean = vArr.some(v => v.value == AbstractEhrComponent.OTHER_VALUE_IDENT);
    // add other item
    if (!present && (force)) {
      if (model.isListOpen && model.isListOpen()) {
        vArr.push(this.generateOtherSelectedValueObj());
      }
    }
    // sets label to other item
    return vArr.map((valItem: any) => {
      if (valItem.value === AbstractEhrComponent.OTHER_VALUE_IDENT) {
        // if multi then value is displayed otherwise just display OTHER_VALUE_LABEL
        if (this.model.isMulti()) {
          let otherValue = valItem[this.OTHER_VALUE_PROP];
          if (otherValue == null) {
            otherValue = valItem.label;
          }
          return Object.assign(this.generateOtherSelectedValueObj(otherValue ? otherValue : ''), {[this.OTHER_VALUE_PROP]: otherValue});
        } else {
          let otherValue = valItem[this.OTHER_VALUE_PROP];
          if (otherValue == null) {
            otherValue = valItem.label;
          }
          return Object.assign(this.generateOtherSelectedValueObj(otherValue), {[this.OTHER_VALUE_PROP]: otherValue});
        }
      }
      return valItem;
    });
  }

  protected get modelGetterSetterMethodName(): string {
    return 'codeValue';
  };

  protected get modelEmptyValue(): any {
    return {'|code': null, '|value': null};
  };

  protected shouldDisplayClearBtn() {
    let displayRadioClear = (!(this.radioClearButtonHide || this.radioClearItem) && this.radioCheckboxColumns > 0);
    let displayDropdownClear = (this.clearButtonDisplay && !this.radioCheckboxColumns);
    return displayRadioClear || displayDropdownClear;
  }

  list(model: NodeModel) {
    let input: EhrInput = this.codeInput(model);
    return input ? input.getList() : [];
  };

  private generateOtherSelectedValueObj(lbl: string = '') {
    return this.model.isMulti() ? {
      label: this.OTHER_VALUE_SELECTED_LABEL + lbl,
      value: AbstractEhrComponent.OTHER_VALUE_IDENT,
      [this.OTHER_VALUE_PROP]: ''
    } : this.generateOtherValueObj();
  }

  generateOtherValueObj(lbl: string = '') {
    return {
      label: this.OTHER_VALUE_LABEL + lbl,
      value: AbstractEhrComponent.OTHER_VALUE_IDENT,
      [this.OTHER_VALUE_PROP]: ''
    };
  }

  private setupOtherValueValidators() {
    let controls = [this.otherValueControl];
    let outputFromObservables: Observable<ValidateOptions>[] = this.ehrValidationHelper.collectValidationErrorsObservables(controls, this.validateFormEvent, this.changeDetectorRef);
    if (this.translatedValidationErrorsSubs) {
      this.translatedValidationErrorsSubs.unsubscribe();
    }
    this.translatedValidationErrorsSubs = this.ehrValidationHelper.getTranslatedValidationErrors(outputFromObservables, controls, this.validationResolver).subscribe((errorsArr: ValidationErrorMessage[]) => {
      this.translatedValidationErrors = errorsArr;
      this.model.addValidationErrors(errorsArr.map(e => e.name));
      this.changeDetectorRef.markForCheck();
    });
  }

}

export interface OtherValueGenerator {
  generateOtherValueObj(lbl: string): any;
}

export interface MinComboRenderer {
  minItemsForComboPresentation: number;
  radioCheckboxColumns: number;

  generateOtherValueObj(lbl: string): any;

  radioClearItem: boolean;
  dropdownEmptyItemHide: boolean;
  maxItems: number;

  list(model: NodeModel);
}

export interface ClearItemDisplayer {
  radioClearItem: boolean;
  dropdownEmptyItemHide: boolean;
  radioCheckboxColumns: number;
  maxItems: number;
  minItemsForComboPresentation: number;

  list(model: NodeModel);
}

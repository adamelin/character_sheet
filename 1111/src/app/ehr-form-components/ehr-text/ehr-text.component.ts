import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {FieldPresentation} from '../../ehr-form-model/thinkehr-f4-model-ts/view/FieldPresentation';
import {ThinkEhrUtil} from '../../ehr-form-model/thinkehr-f4-model-ts/ThinkEhrUtil';
import {EhrLayoutHelper} from '../utils/EhrLayoutHelper';
import {TextFieldModel} from '../../ehr-form-model/thinkehr-f4-model-ts/model/fieldModel/TextFieldModel';
import {EhrFormConfig} from '../EhrFormConfig';
import {
  EhrValidationHelper,
  MrdCodedTextInputActionTriggerType,
  MrdCodedTextInputValueAction,
  ResultListOptions,
  ValidateOptions,
  ValidationErrorMessage
} from 'mrd-ui-components';
import {EhrFormState} from '../utils/EhrFormState';
import {AbstractEhrComponent} from '../abstract-ehr-component.component';
import {NodeModel} from '../../ehr-form-model/thinkehr-f4-model-ts/model/NodeModel';
import {EhrValidationMessageResolver} from '../utils/validation/ehr-validation-message-resolver';
import {EhrModelObservable} from '../../ehr-form-model/ehr-model-observable';
import {Field} from '../../ehr-form-model/thinkehr-f4-model-ts/view/Field';
import {Observable, Subscription} from 'rxjs';
import {FormRepeatableElementModel} from '../../ehr-form-model/thinkehr-f4-model-ts/model/FormRepeatableElementModel';
import {Input as EhrInput} from '../../ehr-form-model/thinkehr-f4-model-ts/Input';
import {EhrContext} from '../../ehr-form-model/thinkehr-f4-model-ts/EhrContext';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {TranslateService} from 'ng2-translate';
import {FORM_SCRIPT_API} from '../ehr-form/FormScriptApiProvider';
import {FormScriptApi} from '../ehr-form/FormScriptApi';
import {ViewConfigParser} from '../../ehr-form-model/thinkehr-f4-model-ts/parsing/ViewConfigParser';
import {InputItem} from '../../ehr-form-model/thinkehr-f4-model-ts/InputItem';
import {CodeValueBasedFieldModel} from '../../ehr-form-model/thinkehr-f4-model-ts/model/fieldModel/CodeValueBasedFieldModel';
import {
  ClearItemDisplayer, EhrCodedTextComponent, MinComboRenderer,
  OtherValueGenerator
} from '../ehr-coded-text/ehr-coded-text.component';
import {EhrModelEventType} from '../../ehr-form-model/ehr-model-event';
import {Subject} from "rxjs/Subject";
import {pluck, tap, withLatestFrom} from "rxjs/operators";

@Component({
  selector: 'ehr-text',
  templateUrl: 'ehr-text.component.html',
  styleUrls: ['ehr-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EhrTextComponent extends AbstractEhrComponent
  implements OnChanges,
    OnDestroy,
    OtherValueGenerator,
    MinComboRenderer,
    ClearItemDisplayer {

  @Input()
  model: TextFieldModel;

  @Input()
  ehrFormGroup: FormGroup;

  @Input()
  validateFormEvent: EventEmitter<ValidateOptions>;

  protected get modelGetterSetterMethodName(): string {
    return 'textValue';
  }

  protected get modelEmptyValue(): any {
    return '';
  }

  private OTHER_VALUE_LABEL = 'Other>>';
  private OTHER_VALUE_SELECTED_LABEL = 'Other: ';
  private CLEAR_VALUE_LABEL = 'Clear';
  private showOtherInput: boolean;
  private codedTxtInputResultObsOrArrValue: Observable<any> | any[];
  private searchResultItemsListFilterSelected$: Observable<any[]>; /// = [{label: 'onee', value:'id1'}, {label:"twoo",value: '2id'}];
  private searchResultItemsListTotal: BehaviorSubject<any> = new BehaviorSubject([]);

  private COMBOBOX_FIELD_TYPE: string = 'COMBOBOX_FIELD_TYPE';
  private TEXTFIELD_FIELD_TYPE: string = 'TEXTFIELD_FIELD_TYPE';
  private TEXTAREA_FIELD_TYPE: string = 'TEXTAREA_FIELD_TYPE';
  protected fieldType: string;
  private modelValues_LabelValues$: Observable<any[]>;
  private modelValues_LabelValues_FromListFlag$: Observable<any[]>;
  private inListValues$: Observable<any[]>;
  private resetValuesFromList: Subject<any> = new Subject<any>();
  private modelValues_LabelValues_FromListFlagSubscription: Subscription;

  private localComboOtherSelected: BehaviorSubject<any> = new BehaviorSubject(false);

  private translatedValidationErrorsSubs: any;
  private translatedValidationErrors: any;
  private otherValueControl: FormControl;
  private otherValueChangesSubscription: Subscription;
  private dropdownClearSubs: Subscription;
  radioCheckboxColumns: number;
  minItemsForComboPresentation: number = 0;

  private selectInputLabelOnTop: boolean;
  private selectInputLabelHide: boolean;

  protected displayTextInputClearButton: boolean;
  dropdownEmptyItemHide: boolean;
  radioClearItem: boolean;

  private clearButtonDisplay: boolean;
  private radioClearButtonHide: boolean;


  private comboActions: MrdCodedTextInputValueAction[] = [];
  private comboActionsSubs: Subscription;
  private translateService: TranslateService;

  private clearValueHandler: Function;
  private clearValueListener: Function;

  constructor(elementRef: ElementRef, renderer: Renderer2, changeDetectorRef: ChangeDetectorRef, EhrLayoutHelper: EhrLayoutHelper,
              ehrFormState: EhrFormState, ehrFormConfig: EhrFormConfig, validationResolver: EhrValidationMessageResolver, @Inject(FORM_SCRIPT_API) public scriptApi: FormScriptApi, ehrModelObservable: EhrModelObservable,
              translateService: TranslateService, private viewConfigParser: ViewConfigParser, public ehrValidationHelper: EhrValidationHelper) {
    super(elementRef, renderer, changeDetectorRef, EhrLayoutHelper, ehrFormState, ehrFormConfig, validationResolver, scriptApi, ehrModelObservable, ehrValidationHelper);
    AbstractEhrComponent.OTHER_VALUE_IDENT = InputItem.OTHER_VALUE;
    this.otherValueControl = new FormControl('');
    this.translateService = translateService;
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
  }

  private setupOtherValueValidators() {
    let controls = [this.otherValueControl];
    const outputFromObservables: Observable<ValidateOptions>[] = this.ehrValidationHelper
      .collectValidationErrorsObservables(controls, this.validateFormEvent, this.changeDetectorRef);
    if (this.translatedValidationErrorsSubs) {
      this.translatedValidationErrorsSubs.unsubscribe();
    }
    this.translatedValidationErrorsSubs = this.ehrValidationHelper.getTranslatedValidationErrors(outputFromObservables, controls, this.validationResolver)
      .subscribe((errorsArr: ValidationErrorMessage[]) => {
        this.translatedValidationErrors = errorsArr;
        this.model.addValidationErrors(errorsArr.map(e => e.name));
        this.changeDetectorRef.markForCheck();
      });
  }

  private subscribeValueToColsRows() {
    if (this.modelValues_LabelValues_FromListFlagSubscription) {
      this.modelValues_LabelValues_FromListFlagSubscription.unsubscribe();
    }
    this.modelValues_LabelValues_FromListFlagSubscription = this.modelValues_LabelValues_FromListFlag$.distinctUntilChanged(ThinkEhrUtil.arrayValuesEqual).subscribe((valueArr: any[]) => {
      let selectedListValues = valueArr.filter(v => !!v.fromList);
      let otherValueString: string = '';
      if (this.model.isMulti() || !selectedListValues.length) {
        let otherValues = valueArr.filter(v => !v.fromList);
        otherValueString = otherValues.map(v => v.value).join(',');
      }
      if (this.otherValueControl.value != otherValueString) {
        this.otherValueControl.setValue(otherValueString, {onlySelf: false, emitViewToModelChange: false});
      }

      this.resetOtherAndCodedTextValidators(valueArr, this.otherValueControl);

    });

  }

  getTerminology(model: NodeModel) {
    let inp: EhrInput = this.getInput(this.model);
    return inp && inp.getTerminology();
  };

  ngOnChanges(simpleChanges: SimpleChanges) {
    super.ngOnChanges(simpleChanges);
    if (simpleChanges.hasOwnProperty('model')) {
      let currModel = simpleChanges.model.currentValue;
      let previousModel: NodeModel = simpleChanges.model.previousValue;


      if (this.clearValueHandler) {
        if (previousModel) {
          previousModel.removeEventListener(this.clearValueHandler, EhrModelEventType.CLEAR_VALUE_EVENT);
        }
        this.clearValueHandler();
      }
      this.clearValueHandler = () => {
        this.localComboOtherSelected.next(false);
      };

      currModel.addEventListener(this.clearValueHandler, EhrModelEventType.CLEAR_VALUE_EVENT);


      this.selectInputLabelOnTop = currModel.getViewConfig().hasTag('inputLabelOnTop');
      this.selectInputLabelHide = currModel.getViewConfig().hasTag('inputLabelHide');

      this.displayTextInputClearButton = currModel.getViewConfig().hasTag('clearButton') || this.displayTextInputClearButton;
      this.dropdownEmptyItemHide = currModel.getViewConfig().hasTag('noEmptyValueItem') || this.dropdownEmptyItemHide;
      this.clearButtonDisplay = currModel.getViewConfig().hasTag('clearButton') || this.clearButtonDisplay;
      this.radioClearButtonHide = currModel.getViewConfig().hasTag('hideRadioClearButton') || this.radioClearButtonHide;

      this.minItems = AbstractEhrComponent.minItemsViewNr(currModel);
      this.maxItems = AbstractEhrComponent.maxItemsViewNr(currModel);

      if (currModel.getViewConfig().getFields() || (currModel.getViewConfig().getLayout(false) && currModel.getViewConfig().getLayout(false).field)) {
        this.radioCheckboxColumns = this.isCombo(currModel, currModel.getViewConfig().getFields(), 2) ? 0 : currModel.getViewConfig().getFields().columns;
        if (!this.radioCheckboxColumns) {

          let layField = currModel.getViewConfig().getLayout(false).field;
          if (layField) {
            layField = new Field(layField, this.viewConfigParser);
            this.radioCheckboxColumns = this.isCombo(currModel, layField, 2) ? 0 : parseInt(layField.columns, 10);
            this.radioCheckboxColumns = isNaN(this.radioCheckboxColumns) ? 0 : this.radioCheckboxColumns;
          }

        }
      } else {
        this.radioCheckboxColumns = null;
      }

      if (!this.getTerminology(currModel)) {
        this.searchResultItemsListTotal.next(this.list(currModel));
      }

      if (!this.comboActionsSubs) {
        this.comboActionsSubs = this.ehrFormState.getFormContext().subscribe((fCtx: EhrContext) => {
          this.dropdownEmptyItemHide = fCtx.dropdownEmptyItemHide;
          this.radioClearItem = fCtx.displayRadioClearItem;
          this.clearButtonDisplay = fCtx.dropdownClearButtonShow || this.clearButtonDisplay;
          this.minItemsForComboPresentation = fCtx.dropdownPresentationMinItems;
          this.displayTextInputClearButton = fCtx.textInputClearButtonShow || this.displayTextInputClearButton;

          if (!this.getTerminology(currModel)) {
            ///this.searchResultItemsListTotal.next(this.list(currModel));

            if (this.dropdownClearSubs) {
              this.dropdownClearSubs.unsubscribe();
            }

            this.dropdownClearSubs = this.searchResultItemsListTotal
              .map(EhrCodedTextComponent.setRadioColumns(currModel, this, fCtx.dropdownPresentationMinItemsColumns || 1))
              .map(EhrCodedTextComponent.updateClearItemAfterColsSet(this))
              .map(EhrCodedTextComponent.addClearItem(this, currModel))
              .switchMap(AbstractEhrComponent.translateClearItemObs(this.translateService))
              .map((valArr: any[]) => EhrCodedTextComponent.addOtherToOptions(valArr, currModel, this.radioCheckboxColumns, this))
              .map(EhrCodedTextComponent.resetEmptyItemClass(this.renderer, this.elementRef, this.CLEAR_VALUE_USED_CLASS_NAME))
              .subscribe((valArr: any[]) => {
                this.codedTxtInputResultObsOrArrValue = valArr;
              });
          } else {
            this.codedTxtInputResultObsOrArrValue = this.searchResultItemsListTotal
              .map(EhrCodedTextComponent.addClearItem(this, currModel))
              .switchMap(AbstractEhrComponent.translateClearItemObs(this.translateService))
              //TODO currently not displaying other option on terminology multi - multi terminology DV_TEXT has bug with setting other value
              .map((valArr: any[]) => EhrCodedTextComponent.addOtherToOptions(valArr, currModel, this.radioCheckboxColumns, this))
              .map(EhrCodedTextComponent.resetEmptyItemClass(this.renderer, this.elementRef, this.CLEAR_VALUE_USED_CLASS_NAME));
          }

          if (fCtx.comboboxActions) {
            this.comboActions = fCtx.comboboxActions.map((comboAct: MrdCodedTextInputValueAction) => {
              if (comboAct.trigger == MrdCodedTextInputActionTriggerType.SELECTED) {
                comboAct = Object.assign({}, comboAct);
                let originalCallbackFn = comboAct.callbackFn;
                let callbackFn = () => {
                  originalCallbackFn(currModel, this.elementRef.nativeElement);
                };
                comboAct.callbackFn = callbackFn;
              }
              return comboAct;
            });
          } else {
            this.comboActions = [];
          }

        });
      }

      if (this.isCombo(currModel, this.textValuesField(currModel), this.list(currModel).length) || this.isRadios(currModel, this.textValuesField(currModel)) || this.isCheckboxes(currModel, this.textValuesField(currModel)) || !!this.getTerminology(currModel)) {
        this.fieldType = this.COMBOBOX_FIELD_TYPE;
      } else if (this.isTextArea()) {
        this.fieldType = this.TEXTAREA_FIELD_TYPE;
      } else {
        this.fieldType = this.TEXTFIELD_FIELD_TYPE;
      }

      // all model values
      this.modelValues_LabelValues$ = this.modelValues$.map((vArr: any[]) => {
        return vArr.filter(v => !!v).map((v: string) => {
          return {label: v, value: v};
        });
      });

      // add prop so we know which ones are "other" and which are from provided Input.getList()
      const resetVals: Observable<any[]> = this.resetValuesFromList.pipe(
        withLatestFrom(this.modelValues_LabelValues$),
        pluck('1'),
      );
      this.modelValues_LabelValues_FromListFlag$ = this.modelValues_LabelValues$
        .merge(resetVals as Observable<any[]>).map((vArr: any[]) => {
          // display Other>> within combo list only if listOpen and not radio/checkboxes and not multi
          const otherInputVal = this.otherValueControl.value;
          let listArr: any[] = vArr.map(v => {
            /// v.fromList = !!this.list(currModel).find(ii => {return ii.value === v.value
            // || (ii.getLabel && !!ii.getLabel() && ii.getLabel()===v.value)
            // || (!!ii.label && ii.label===v.value)});
            v.fromList = !!this.list(currModel).find(ii => {
              return ii.value === v.value || (ii.getLabel && !!ii.getLabel() && ii.getLabel() === v.value);
            });
            return v;
          });
          const otherVal = listArr.find((v) => {
            return v.value === otherInputVal;
          });
          if (otherVal) {
            otherVal.fromList = false;
          }
          return listArr;
        });

      // when other is selected it is not set on model but just locally and handled here
      const localComboSelectedValues = this.localComboOtherSelected
        .skip(1)
        .withLatestFrom(this.modelValues_LabelValues_FromListFlag$, (otherSel, valArr) => {
          if (!currModel.isMulti() && otherSel) {
            valArr = [];
          }
          return this.addOtherValueToValuesArr(valArr, currModel, otherSel);
        });

      // this one merges local other changes and model changes
      const modelValuesWithOtherValue = localComboSelectedValues.merge(this.modelValues_LabelValues_FromListFlag$.map((vArr) => {
        return this.addOtherValueToValuesArr(vArr, currModel, this.localComboOtherSelected.getValue());
      }));

      // these are only values that come from the Input.getList() - without other
      this.inListValues$ = modelValuesWithOtherValue
        .map(valArr => {
          if (!valArr.length && this.radioClearItem && this.radioCheckboxColumns > 0 && this.maxItems < 2) {
            valArr.push({value: '', label: this.CLEAR_VALUE_LABEL, fromList: true});
            EhrCodedTextComponent.resetEmptyItemClass(this.renderer, this.elementRef, this.CLEAR_VALUE_USED_CLASS_NAME)(valArr);
          }
          return valArr.filter((v) => {
            return v.fromList;
          });
        });

      if (this.fieldType === this.COMBOBOX_FIELD_TYPE) {
        this.otherValueControl = new FormControl('');

        this.setupOtherValueValidators();

        if (this.otherValueChangesSubscription) {
          this.otherValueChangesSubscription.unsubscribe();
        }

        this.otherValueChangesSubscription = this.otherValueControl.valueChanges.subscribe((val) => {
          // adds other value to model
          if (this.model.isMulti()) {
            this.inListValues$.map(vArr => vArr.map(v => v)).take(1).subscribe((inListValues: any[]) => {
              inListValues = inListValues.filter(v => v && v.value !== AbstractEhrComponent.OTHER_VALUE_IDENT).map(v => v.value);
              if (val) {
                inListValues.push(val);
              }
              this.model.valueGetterSetter(inListValues, undefined);
            });
          } else {
            // cset new value or clear if there is no other inListValue set
            if (val) {
              // when the value of other is the same as option do not set - option is checked against other value on blur and set
              this.searchResultItemsListTotal.take(1).subscribe((valueOptions: any[]) => {
                // cif (!valueOptions.some(vo => vo == val || (vo.value && vo.value == val) )) {
                this.model.valueGetterSetter([val], undefined);
                // c}
              });

            } else {
              // if value is empty
              this.inListValues$.take(1).subscribe((inListValues: any[]) => {
                if (!inListValues.length
                  || (inListValues.length === 1
                    && inListValues.some(v => v
                      && v.value === AbstractEhrComponent.OTHER_VALUE_IDENT
                    )
                  )
                ) {
                  this.model.valueGetterSetter(null, undefined);
                }
              });
            }
          }
          if (val) {
            this.localComboOtherSelected.next(true);
          }
        });
        this.subscribeValueToColsRows();
      }

    }
  }

  private generateOtherSelectedValueObj(lbl: string = '') {
    return this.model.isMulti() ? {
      label: this.OTHER_VALUE_SELECTED_LABEL + lbl,
      value: AbstractEhrComponent.OTHER_VALUE_IDENT,
      fromList: true
    } : this.generateOtherValueObj();
  }

  generateOtherValueObj(lbl: string = '') {
    return {label: this.OTHER_VALUE_LABEL + lbl, value: AbstractEhrComponent.OTHER_VALUE_IDENT, fromList: true};
  }

  private addOtherValueToValuesArr(vArr: any[], model: TextFieldModel, isOtherSelected?: boolean): any[] {
    if (!isOtherSelected) {
      vArr = vArr.filter((val) => {
        return val.value !== AbstractEhrComponent.OTHER_VALUE_IDENT;
      });
      return vArr;
    }

    const present: boolean = vArr.some(v => v && v.value === AbstractEhrComponent.OTHER_VALUE_IDENT);
    if (!present && (isOtherSelected || vArr.some(v => !v.fromList))) {
      if (model.isListOpen && model.isListOpen()) {
        const otherVals: any[] = vArr.filter(v => !v.fromList).map(v => v.label);
        const otherVal = this.generateOtherSelectedValueObj(otherVals.length ? otherVals.join(',') : '');
        vArr.push(otherVal);
      }
    }
    return vArr;
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    if (this.comboActionsSubs) {
      this.comboActionsSubs.unsubscribe();
    }

    if (this.dropdownClearSubs) {
      this.dropdownClearSubs.unsubscribe();
    }

    if (this.modelValues_LabelValues_FromListFlagSubscription) {
      this.modelValues_LabelValues_FromListFlagSubscription.unsubscribe();
    }

    if (this.otherValueChangesSubscription) {
      this.otherValueChangesSubscription.unsubscribe();
    }
    if (this.clearValueHandler) {
      this.model.removeEventListener(this.clearValueHandler, EhrModelEventType.CLEAR_VALUE_EVENT);
    }
  }

  onOtherBlur(ev) {
    // if other matches some value from value options then select that option and deselect other
    if (!this.model.isMulti()) {
      this.searchResultItemsListTotal.take(1).subscribe((valueOptions: any[]) => {
        const otherInputValue = ev.target.value;
        if (valueOptions.some(vo => vo === otherInputValue || (vo.value && vo.value === otherInputValue))) {
          this.localComboOtherSelected.next(false);
          this.otherValueControl.setValue('', {onlySelf: true, emitEvent: false});
          this.model.valueGetterSetter([otherInputValue], undefined);
          this.resetValuesFromList.next();
          this.onEditEnd.emit({value: this.model.textValue(), multiIndex: null});
        }
      });
    } else {
      this.onEditEnd.emit({value: this.model.textValue(), multiIndex: null});
    }
  }

  isTextField() {
    return !!(!this.field() || !ThinkEhrUtil.isObject(this.field()) || this.field().getPresentation() !== FieldPresentation.TEXTAREA);
  }

  isTextArea(): boolean {
    return !!(this.field() && ThinkEhrUtil.isObject(this.field()) && this.field().getPresentation() === FieldPresentation.TEXTAREA);
  }

  list(model: NodeModel) {
    let input: EhrInput = this.getInput(this.model);
    return input ? input.getList() : [];
  }

  private getInput(model: NodeModel): EhrInput {
    return model ? model.getInputFor('textValues') : null;
  }

  private textValuesField(model: FormRepeatableElementModel): Field {
    return model ? model.getViewConfig().getFields() : null;
  }

  protected presentation(field: Field): FieldPresentation {
    if (field && ThinkEhrUtil.isObject(field)) {
      const presentation: FieldPresentation = field.getPresentation();
      return presentation != null && FieldPresentation[presentation] != null ? presentation : FieldPresentation.TEXTFIELD;
    }
    return FieldPresentation.TEXTFIELD;
  }

  onComboValueSelected(lblVal: { label: string, value: string }) {
    if (lblVal.value === AbstractEhrComponent.OTHER_VALUE_IDENT) {
      // other was selected need to display "Other>>" and other input
      this.localComboOtherSelected.next(true);
      return;
    } else if (!this.model.isMulti()) {
      this.localComboOtherSelected.next(false);
    }

    const selectedVal = lblVal.value;
    if (this.maxItems != null && (this.maxItems > 1 || this.maxItems < 0)) {
      this.modelValues$.take(1).subscribe((valArr: any[]) => {
        if (valArr) {
          const valueExistsAt: number = valArr.findIndex(cVal => cVal === selectedVal);
          if (valueExistsAt != null && valueExistsAt < 0) {
            let atInd = valArr.findIndex(v => !v);
            if (atInd == null || atInd < 0) {
              atInd = valArr.length;
            }
            this.updateModel(selectedVal, atInd);
          }
        }
      });
    } else {
      this.updateModel(selectedVal, 0);
    }
  }

  onSearch(val: ResultListOptions) {
    if (this.getTerminology(this.model) && ((val.search && val.search.length >= 1) || val.showAll)) {
      this.getInput(this.model).getTerminologyItemsWithLabel({
        query: val.showAll ? '' : val.search,
        force: val.showAll
      }, function (resArr) {
        let resList = resArr.map((resItem) => {
          return {label: resItem.label, value: resItem.label};
        });
        if (!!this.radioCheckboxColumns) {
          resList = resList.filter((v) => v && !!v.value);
        }
        this.searchResultItemsListTotal.next(resList);
        this.changeDetectorRef.markForCheck();
      }.bind(this));
    }
  }

  onRemoveMultiInput(ev) {
    if (ev.value && ev.value.value === AbstractEhrComponent.OTHER_VALUE_IDENT) {
      this.localComboOtherSelected.next(false);
    }
    super.onRemoveMultiInput(null);
    const ind: number = ev.index !== undefined ? ev.index : ev;
    this.updateModel(null, ind != null ? ind : 0);
  }

  protected shouldDisplayClearBtn() {
    const displayRadioClear = (!(this.radioClearButtonHide || this.radioClearItem) && this.radioCheckboxColumns > 0);
    const displayDropdownClear = (this.clearButtonDisplay && !this.radioCheckboxColumns);
    return displayRadioClear || displayDropdownClear;
  }

}

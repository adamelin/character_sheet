import {
  AfterViewInit,
  ChangeDetectorRef,
  ElementRef,
  EventEmitter, Inject,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import {EhrLayoutHelper} from './utils/EhrLayoutHelper';
import {EhrFieldMultiCtx} from './utils/ehr-field-multi-ctx';
import {EhrModelObservable} from './../ehr-form-model/ehr-model-observable';
import {Observable, Subject, Subscription} from 'rxjs';
import {EhrModelEvent, EhrModelEventType} from '../ehr-form-model/ehr-model-event';
import {EhrFormConfig} from './EhrFormConfig';
import {EhrValidationHelper, MrdValidators, ValidateOptions, ValidationErrorMessage} from 'mrd-ui-components';
import {EhrFormState} from './utils/EhrFormState';
import {NodeModel} from '../ehr-form-model/thinkehr-f4-model-ts/model/NodeModel';
import {EhrValidationMessageResolver} from './utils/validation/ehr-validation-message-resolver';
import {FormRepeatableElementModel} from '../ehr-form-model/thinkehr-f4-model-ts/model/FormRepeatableElementModel';
import {ModelScriptExecutor, ScriptApi} from './ScriptApi';
import {LabelHorizontalAlignment} from '../ehr-form-model/thinkehr-f4-model-ts/view/LabelHorizontalAlignment';
import {LabelVerticalAlignment} from '../ehr-form-model/thinkehr-f4-model-ts/view/LabelVerticalAlignment';
import {FieldHorizontalAlignment} from '../ehr-form-model/thinkehr-f4-model-ts/view/FieldHorizontalAlignment';
import {FieldVerticalAlignment} from '../ehr-form-model/thinkehr-f4-model-ts/view/FieldVerticalAlignment';
import {Field} from '../ehr-form-model/thinkehr-f4-model-ts/view/Field';
import {FieldPresentation} from '../ehr-form-model/thinkehr-f4-model-ts/view/FieldPresentation';
import {ThinkEhrUtil} from '../ehr-form-model/thinkehr-f4-model-ts/ThinkEhrUtil';
import {CodeValueBasedFieldModel} from '../ehr-form-model/thinkehr-f4-model-ts/model/fieldModel/CodeValueBasedFieldModel';
import {EhrContext} from '../ehr-form-model/thinkehr-f4-model-ts/EhrContext';
import {TranslateService} from 'ng2-translate';
import {lang} from 'moment';
import {FORM_SCRIPT_API} from './ehr-form/FormScriptApiProvider';
import {FormScriptApi} from './ehr-form/FormScriptApi';
import {TextFieldModel} from '../ehr-form-model';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {distinctUntilChanged} from "rxjs/operators";


export class AbstractEhrComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {

  ///@Input()
  model: NodeModel;//TextFieldModel;

  ///@Input()
  ehrFormGroup: FormGroup;

  ///@Input()
  validateFormEvent: EventEmitter<ValidateOptions>;

  @Output()
  onTranslatedValidationErrors: EventEmitter<ValidationErrorMessage[]> = new EventEmitter();

  @Output()
  onEditStart: EventEmitter<any> = new EventEmitter();

  @Output()
  onEditEnd: EventEmitter<any> = new EventEmitter();

  @Output()
  onMouseEnter: EventEmitter<any> = new EventEmitter();

  @Output()
  onMouseLeave: EventEmitter<any> = new EventEmitter();

  @Output()
  onEhrComponentRendered: EventEmitter<NodeModel> = new EventEmitter();

  protected static OTHER_VALUE_IDENT: string = '__other__';

  protected static getDropdownItemsClearTranslatedObservable(itemsListArr$: Observable<any[]>, translateSer: TranslateService, showTranslatedClearItem: boolean): Observable<any[]> {
    if (translateSer) {
      return itemsListArr$.combineLatest(translateSer.onLangChange.startWith(null)).switchMap((itemsArrLangChange: any[]) => {
        let itemsListArr: any[] = itemsArrLangChange[0];

        let translatedArr$: Observable<any[]> = Observable.of(itemsListArr);
        //if (showTranslatedClearItem && itemsListArr[0]) {
        if (itemsListArr[0] && itemsListArr[0].value === '') {
          /*if (itemsListArr[0].value !== '') {
            itemsListArr.unshift({label: '', value: ''});
          }*/
          return translatedArr$.merge(translateSer.get('clearValue').map((clearValTranslation: string) => {
            let newItemsArr: any[] = itemsListArr.slice();
            newItemsArr[0].label = clearValTranslation;
            return newItemsArr;
          }));
        }

        return translatedArr$;
      });
    } else {
      console.error('no translate service');
      return Observable.empty();
    }
  }

  protected static shouldAddOtherOptionItem(model: CodeValueBasedFieldModel | TextFieldModel) {
    return model.isListOpen && model.isListOpen(); //&& !valArr.some(v => v.value == this.OTHER_VALUE_IDENT);
  }

  protected static hasOtherOptionItem(valArr: any[]) {
    return valArr.some(v => v.value == AbstractEhrComponent.OTHER_VALUE_IDENT);
  }

  protected static translateClearItemObs = (translateSer: TranslateService) => {
    return (valArr: any[]): Observable<any> => {
      if (translateSer) {
        return translateSer.onLangChange.startWith(null).switchMap((langChange: any) => {
          let itemsListArr: any[] = valArr;

          let translatedArr$: Observable<any[]> = Observable.of(itemsListArr);
          //if (showTranslatedClearItem && itemsListArr[0]) {
          if (itemsListArr[0] && itemsListArr[0].value === '') {

            return translatedArr$.merge(translateSer.get('clearValue').map((clearValTranslation: string) => {
              let newItemsArr: any[] = itemsListArr.slice();
              newItemsArr[0].label = clearValTranslation;
              return newItemsArr;
            }));
          }

          return translatedArr$;
        });
      } else {
        console.error('no translate service');
        return Observable.of(valArr);
      }
    };
  };

  protected removeDisabledIndexes: boolean[] = [];
  protected addDisabledIndexes: boolean[] = [];

  protected ehrFormArray: FormArray = new FormArray([]);

  protected readonly CLEAR_VALUE_USED_CLASS_NAME = 'ehr-has-clear-item';

  private hideLongValueTooltips: boolean;

  protected get modelGetterSetterMethodName(): string {
    throw new Error('Must be implemented in extended class.');
  };

  protected get modelEmptyValue(): any {
    throw new Error('Must be implemented in extended class.');
  };

  protected get ehrInputPlaceholder() {
    return this.model.getViewConfig().annotationValue('placeholder') || '';
  }

  modelValues$: Observable<{ label: string, value: string }[]>;

  isReadOnlySubs: Subscription;
  tooltipSubs: Subscription;
  isReadOnlyValue: boolean;
  isHiddenSubs: Subscription;
  isHiddenSubs1: Subscription;
  isRequiredSubs: Subscription;
  isHiddenValue: boolean;
  multiControlsHidden: boolean;
  isLabelHidden: boolean;

  private valueValidationFunctions: ValidatorFn[];

  private scriptApiExecutor: ModelScriptExecutor;

  private labelClasses: string[] = [];
  private inputClasses: string[] = [];
  private inputWrapClasses: string[] = [];
  private inputHorizontalLayoutClass: string;

  maxItems: number;
  minItems: number;

  protected tooltipValue: string;
  protected cssClassList: string[];
  protected notApplicableValue: boolean;

  protected tooltipValidation: boolean;
  private ctxSubs: Subscription;
  private renderMin: number;
  thinkEhrUtil: ThinkEhrUtil;
  private annotSubs: Subscription;
  private displayValidationMessgesOnTouchedSubs: Subscription;
  protected modelSubj: BehaviorSubject<NodeModel> = new BehaviorSubject<NodeModel>(null);
  private validationErrorSubs: Subscription;
  protected onDestroySubj: Subject<void> = new Subject<void>();
  private mouseEnterHandler = (ev) => {
    this.onMouseEnter.emit(ev);
  }
  private mouseLeaveHandler = (ev) => {
    this.onMouseLeave.emit(ev);
  };
  constructor(protected elementRef: ElementRef, protected renderer: Renderer2, protected changeDetectorRef: ChangeDetectorRef,
              protected EhrLayoutHelper: EhrLayoutHelper, protected ehrFormState: EhrFormState, protected ehrFormConfig: EhrFormConfig,
              protected validationResolver: EhrValidationMessageResolver, protected scriptApi: FormScriptApi, protected ehrModelObservable: EhrModelObservable, public ehrValidationHelper: EhrValidationHelper) {
    renderer.addClass(elementRef.nativeElement, 'row');

    this.elementRef.nativeElement.addEventListener('mouseenter', this.mouseEnterHandler);

    this.elementRef.nativeElement.addEventListener('mouseleave', this.mouseLeaveHandler);

    this.validationErrorSubs = this.onTranslatedValidationErrors.pipe(
      distinctUntilChanged((val1: ValidationErrorMessage[], val2: ValidationErrorMessage[]) => {
        return val1.length === val2.length && val1.every(v1 => {
          return !!val2.some(v2 => v1.name === v2.name);
        });
      })
    ).subscribe((v) => {
      this.model.validationErrors = v.map(valErr => valErr.name);
    });
  }

  ngOnInit() {

    ///this.ehrFieldMultiCtx = new EhrFieldMultiCtx(this.model, this.isReadOnly$);

    /*setTimeout(()=> {
     this.model.getViewConfig().setReadOnly(true);
     setTimeout(()=> {
     this.model.getViewConfig().setHidden(true);
     setTimeout(()=> {
     this.model.getViewConfig().setHidden(false);
     setTimeout(()=> {
     this.model.getViewConfig().setReadOnly(false);
     }, 1700)
     }, 1700)
     }, 1700)
     }, 3000)*/
    this.ctxSubs = this.ehrFormState.getFormContext().subscribe((ctx: EhrContext) => {
      this.tooltipValidation = ctx.tooltipValidation;
      this.hideLongValueTooltips = ctx.hideLongValueTooltips;
      this.updateTooltipObs(this.model, ctx.language);
      if (ctx.displayValidationMessgesOnTouched) {
        if (!this.displayValidationMessgesOnTouchedSubs || (this.displayValidationMessgesOnTouchedSubs && this.displayValidationMessgesOnTouchedSubs.closed)) {
          this.displayValidationMessgesOnTouchedSubs = this.onEditEnd.subscribe((v) => {
            this.validateFormEvent.next({nowForceIfNotDirty: true});
          });
        }
      } else if (this.displayValidationMessgesOnTouchedSubs) {
        this.displayValidationMessgesOnTouchedSubs.unsubscribe();
      }
    });
  }

  ngAfterViewInit() {
    //ngif is not set on host element so this is emitted from template / this.onEhrComponentRendered.next(this.model);
  }

  protected isNotApplicableValue(valArr: any[]) {
    return valArr && valArr.length && ThinkEhrUtil.isObject(valArr[0]) && valArr[0].hasOwnProperty('_null_flavour');
  }

  protected updateModelValuesObs(forModel: NodeModel) {
    this.modelValues$ = this.getModelValuesArrObs(forModel).distinctUntilChanged(ThinkEhrUtil.arrayValuesEqual).map((valArr) => {
      /*this.notApplicableValue = this.isNotApplicableValue(valArr);
      if(this.notApplicableValue){
        this.valueValidationFunctions = [];
        this.ehrFormGroup.clearValidators();
        Object.keys(this.ehrFormGroup.controls).forEach((key: string) => {
          console.log("CCCCCCC",key, this.ehrFormGroup.get(key))
          this.ehrFormGroup.get(key).clearValidators();
          this.validateFormEvent.next({
            alwaysForceIfNotDirty: null,
            nowForceIfNotDirty: false
          });
        });
        valArr= [];
      }*/
      if (this.renderMin === undefined) {
        this.renderMin = this.model.getMin() || 1;

        let annMin = parseInt(this.model.getAnnotationValue('renderMin'), 10);
        if (!isNaN(annMin) && annMin && annMin > this.renderMin) {
          this.renderMin = annMin;
          let maxVal = this.model.getMax();
          if (this.renderMin > maxVal) {
            this.renderMin = maxVal;
          }
        }
      }

      let min = this.model.isMulti() && this.renderMin > 1 ? this.renderMin : 1;
      let delta = min - valArr.length;
      if (delta > 0) {
        for (let i = 0; i < delta; i++) {
          valArr.push(this.modelEmptyValue);
        }
      }

      this.resetMultiButtonsState(valArr);
      //console.log("MODEL VALUE OBSERVABLE VALUES =", this.addDisabledIndexes, valArr);
      return valArr;
    });
  }

  protected getModelValuesArrObs(forModel: NodeModel): Observable<any> {
    return this.ehrModelObservable.fromValue(forModel, this.modelGetterSetterMethodName).map((valArr) => {
      return valArr;
    });
  }

  private updateReadOnlyObs(forModel: FormRepeatableElementModel) {
    if (this.isReadOnlySubs) {
      this.isReadOnlySubs.unsubscribe();
    }
    this.isReadOnlySubs = this.ehrModelObservable.fromEvent(forModel.getViewConfig(), EhrModelEventType.EVENT_IS_READ_ONLY, forModel.getViewConfig().isReadOnly())
      .map((ev: EhrModelEvent) => ev.data as boolean)
      .subscribe((ro) => {
        this.isReadOnlyValue = ro;
        this.multiControlsHidden = !EhrFieldMultiCtx.displayMultiControls(this.isReadOnlyValue, this.model ? this.model.isMulti() : false);
        this.changeDetectorRef.markForCheck();
      });
  }

  private updateTooltipObs(forModel: FormRepeatableElementModel, language: string) {
    if (this.tooltipSubs) {
      this.tooltipSubs.unsubscribe();
    }
    if (forModel) {
      this.tooltipSubs = this.ehrModelObservable.fromEvent(forModel, EhrModelEventType.EVENT_TOOLTIP_VALUE, forModel.getViewConfig().getTooltip(language))
        .map((ev: EhrModelEvent) => ev.data as string)
        .subscribe((ttv: string) => {
          this.tooltipValue = ttv;
          this.changeDetectorRef.markForCheck();
        });
    }
  }

  private updateHiddenObs(forModel: FormRepeatableElementModel) {
    if (this.isHiddenSubs) {
      this.isHiddenSubs.unsubscribe();
    }
    if (this.isHiddenSubs1) {
      this.isHiddenSubs1.unsubscribe();
    }

    let isHiddenObs: Observable<boolean> = this.ehrModelObservable.fromEvent(forModel.getViewConfig(), EhrModelEventType.EVENT_IS_HIDDEN, forModel.getViewConfig().isHidden())
      .map((ev: EhrModelEvent) => ev.data as boolean);

    this.isHiddenSubs = isHiddenObs.subscribe((hv) => {
      this.isHiddenValue = hv;
      this.changeDetectorRef.markForCheck();
    });

    this.isHiddenSubs1 = isHiddenObs.distinctUntilChanged().subscribe((val: boolean) => {
      if (!val) {
        this.validateFormEvent.next({
          alwaysForceIfNotDirty: null,
          nowForceIfNotDirty: false
        });
      }
    });
  }

  private updateRequiredObs(forModel: FormRepeatableElementModel) {
    if (this.isRequiredSubs) {
      this.isRequiredSubs.unsubscribe();
    }

    let minVal$: Observable<number> = this.ehrModelObservable.fromEvent(forModel, EhrModelEventType.EVENT_MIN_UPDATED, forModel.getMin())
      .map((ev: EhrModelEvent) => ev.data as number);

    this.isRequiredSubs = minVal$.subscribe((minVal) => {
      this.minItems = minVal;
      this.resetValidators();
      this.validateFormEvent.next({
        alwaysForceIfNotDirty: null,
        nowForceIfNotDirty: false
      });
      this.changeDetectorRef.markForCheck();
    });

  }

  updateAnnotationsCssClasses(cssClasses: string[]) {
    if (this.cssClassList && this.cssClassList.length) {
      this.cssClassList.forEach((className: string) => {
        this.renderer.removeClass(this.elementRef.nativeElement, className);
      });
    }
    this.cssClassList = cssClasses;
    if (this.cssClassList && this.cssClassList.length) {
      this.cssClassList.forEach((className: string) => {
        this.renderer.addClass(this.elementRef.nativeElement, className);
      });
    }
  }

  ngOnChanges(simpleChanges: SimpleChanges) {

    if (simpleChanges.hasOwnProperty('model')) {
      let currentModel = simpleChanges['model'].currentValue;
      this.modelSubj.next(currentModel);
      if (this.annotSubs) {
        this.annotSubs.unsubscribe();
      }
      this.annotSubs = this.ehrModelObservable.fromEvent(currentModel.getViewConfig(), EhrModelEventType.EVENT_ANNOTATION_VALUE, currentModel.getViewConfig().getAnnotations())
        .subscribe((val) => {
          let cssClassAnnotation: string = val.data && val.data['cssClass'] ? val.data['cssClass'] : '';
          this.updateAnnotationsCssClasses(cssClassAnnotation ? cssClassAnnotation.split(' ') : []);
        });

      this.isLabelHidden = (currentModel as FormRepeatableElementModel).getViewConfig().isLabelHidden();

      this.resetValidators();
      this.ehrFormGroup.addControl(currentModel.getSanitizedUniqueId(currentModel.getMultiIndex(false)), this.ehrFormArray);

      if (simpleChanges.model.previousValue) {
        this.ehrModelObservable.destroyModelPathObservable(simpleChanges.model.previousValue);
      }

      this.updateModelValuesObs(currentModel);
      this.updateReadOnlyObs(currentModel);
      this.updateHiddenObs(currentModel);
      this.updateRequiredObs(currentModel);

      this.scriptApi.unregisterComponent(this, simpleChanges['model'].previousValue);
      this.scriptApi.registerComponent(this, currentModel);
      if (this.scriptApiExecutor) {
        this.scriptApiExecutor.destroy();
      }
      this.scriptApiExecutor = this.scriptApi.exeFormScript(currentModel, currentModel.getViewConfig().getEhrFormScript(), this.ehrModelObservable);

      this.updateFieldLayout(currentModel);
    }
  }

  private updateFieldLayout(currentModel: FormRepeatableElementModel) {
    this.labelClasses = [];
    this.inputClasses = [];
    this.inputWrapClasses = [];
    this.inputHorizontalLayoutClass = null;
    let labelHorizontalAlignment: LabelHorizontalAlignment = currentModel.getViewConfig().getLayout(true).getLabelHorizontalAlignment(true);
    let labelVerticalAlignment: LabelVerticalAlignment = currentModel.getViewConfig().getLayout(true).getLabelVerticalAlignment(true);
    let labelHorizontalLayoutClass = labelHorizontalAlignment !== LabelHorizontalAlignment.TOP ? EhrLayoutHelper.LABEL_HORIZONTAL_CLASS_MAP.get(labelHorizontalAlignment) : EhrLayoutHelper.LABEL_HORIZONTAL_CLASS_MAP.get(LabelHorizontalAlignment.LEFT);
    let labelVerticalLayoutClass = EhrLayoutHelper.LABEL_VERTICAL_CLASS_MAP.get(labelVerticalAlignment);
    if (!labelHorizontalLayoutClass) {
      labelHorizontalLayoutClass = EhrLayoutHelper.LABEL_HORIZONTAL_CLASS_MAP.get(LabelHorizontalAlignment.RIGHT);
    }

    let fieldHorizontalAlignment: FieldHorizontalAlignment = currentModel.getViewConfig().getLayout(true).getFieldHorizontalAlignment(true);
    let fieldVerticalAlignment: FieldVerticalAlignment = currentModel.getViewConfig().getLayout(true).getFieldVerticalAlignment(true);
    this.inputHorizontalLayoutClass = EhrLayoutHelper.FIELD_HORIZONTAL_CLASS_MAP.get(fieldHorizontalAlignment);
    if (!this.inputHorizontalLayoutClass) {
      this.inputHorizontalLayoutClass = EhrLayoutHelper.FIELD_HORIZONTAL_CLASS_MAP.get(FieldHorizontalAlignment.LEFT);
    }
    let fieldVerticalLayoutClass = EhrLayoutHelper.FIELD_VERTICAL_CLASS_MAP.get(fieldVerticalAlignment);
    if (!fieldVerticalLayoutClass) {
      fieldVerticalLayoutClass = EhrLayoutHelper.FIELD_VERTICAL_CLASS_MAP.get(FieldVerticalAlignment.MIDDLE);
    }

    let labelSizeCols = labelHorizontalAlignment !== LabelHorizontalAlignment.TOP ? EhrLayoutHelper.getLabelColumns(currentModel) : EhrLayoutHelper.TOTAL_GRID_COLUMNS;
    let inputSizeColsRemaining: number = labelSizeCols > -1 && labelSizeCols < 12 ? EhrLayoutHelper.TOTAL_GRID_COLUMNS - labelSizeCols : EhrLayoutHelper.TOTAL_GRID_COLUMNS;
    let inputSizeColsFromFormDesc: number = EhrLayoutHelper.getFieldInputColumns(currentModel);
    this.labelClasses.push(EhrLayoutHelper.getGridColumnsClass(labelSizeCols));
    this.inputWrapClasses.push(EhrLayoutHelper.getGridColumnsClass(inputSizeColsRemaining));


    this.labelClasses.push(labelHorizontalLayoutClass);
    this.labelClasses.push(labelVerticalLayoutClass);
    //this.inputClasses.push(fieldHorizontalLayoutClass);
    if (fieldVerticalLayoutClass) {
      this.inputWrapClasses.push(fieldVerticalLayoutClass);
    }
    this.inputClasses.push(EhrLayoutHelper.getGridColumnsClass(inputSizeColsFromFormDesc));
  }

  ngOnDestroy() {
    if (this.isHiddenSubs) {
      this.isHiddenSubs.unsubscribe();
    }
    if (this.isHiddenSubs1) {
      this.isHiddenSubs1.unsubscribe();
    }
    if (this.isRequiredSubs) {
      this.isRequiredSubs.unsubscribe();
    }
    if (this.isReadOnlySubs) {
      this.isReadOnlySubs.unsubscribe();
    }
    if (this.tooltipSubs) {
      this.tooltipSubs.unsubscribe();
    }
    if (this.scriptApiExecutor) {
      this.scriptApiExecutor.destroy();
    }
    if (this.ctxSubs) {
      this.ctxSubs.unsubscribe();
    }
    if (this.displayValidationMessgesOnTouchedSubs) {
      this.displayValidationMessgesOnTouchedSubs.unsubscribe();
    }
    if (this.validationErrorSubs) {
      this.validationErrorSubs.unsubscribe();
    }

    this.elementRef.nativeElement.removeEventListener('mouseenter', this.mouseEnterHandler);
    this.elementRef.nativeElement.removeEventListener('mouseleave', this.mouseLeaveHandler);

    if (this.annotSubs) {
      this.annotSubs.unsubscribe();
    }
    this.scriptApi.unregisterComponent(this, this.model);
    this.onDestroySubj.next();
  }


  protected resetMultiButtonsState(valArr) {
    this.addDisabledIndexes = EhrFieldMultiCtx.getAddDisabledIndexes(valArr, this.model);
    this.removeDisabledIndexes = EhrFieldMultiCtx.getRemoveDisabledIndexes(valArr, this.model);
  }

  trackByIndex(index: number) {
    return index;
  }

  field() {
    return this.model ? this.model.getViewConfig().getFields() : null;
  };

  onAddMultiInput() {
    this.modelValues$.take(1).map(arr => arr.length).subscribe((modelValuesLength) => {
      this.model[this.modelGetterSetterMethodName](this.modelEmptyValue, modelValuesLength);
    });
  }

  onRemoveMultiInput(atIndex: any) {
    if (this.renderMin > 1) {
      this.renderMin--;
    }
    if (atIndex != null) {
      this.model[this.modelGetterSetterMethodName](null, atIndex);
    }
  }

  updateModel(val: any, index: number): void {
    if (!this.notApplicableValue && this.model[this.modelGetterSetterMethodName](undefined, index) != val) {
      this.model[this.modelGetterSetterMethodName](val, index);
    }
  }

  collectModelValidators(model: NodeModel): any[] {
    if (model) {
      let validators: any[] = [];
      if (model.isRequired()) {
        validators.push(MrdValidators.required());
      }
      return validators;
    }

  }

  static maxItemsViewNr(model: FormRepeatableElementModel): number {
    let maxItems = 1;
    if (model.isMulti()) {
      maxItems = model.getMax();
      if (maxItems < 0) {
        maxItems = 99999;
      }
    }
    return maxItems;
  }

  static minItemsViewNr(model: FormRepeatableElementModel) {
    ///return model.isRequired() ? 1 : model.getMin();
    let min = model.getMin();
    if (min < 1 && model.isRequired()) {
      min = 1;
    }
    return min;
  }

  static getFieldColumnsViewNr(field: Field) {
    let cols = 1;
    if (field) {///&& field.getPresentation() === FieldPresentation.RADIOS) {
      cols = field.getColumns();
    }

    if (!cols || cols < 1) {
      cols = 1;
    }
    return cols;
  }


  protected isCombo(model: NodeModel, field: Field, inputItemsListLength: number): boolean {
    return (this.presentation(field) === FieldPresentation.COMBOBOX && (!model.getInputFor('code') || !model.getInputFor('code').terminology)) || (this.presentation(field) === FieldPresentation.TEXTFIELD && inputItemsListLength > 0);
  };

  protected isRadios(model: NodeModel, field: Field): boolean {
    return !model.isMulti() && this.presentation(field) === FieldPresentation.RADIOS;
  };

  protected isCheckboxes(model: NodeModel, field: Field): boolean {
    return model.isMulti() && this.presentation(field) === FieldPresentation.RADIOS;
  };

  protected presentation(field: Field): FieldPresentation {
    if (field && ThinkEhrUtil.isObject(field)) {
      let presentation: FieldPresentation = field.getPresentation();
      return presentation != null && FieldPresentation[presentation] != null ? presentation : FieldPresentation.COMBOBOX;
    }
    return FieldPresentation.TEXTFIELD;
  };


  protected resetOtherAndCodedTextValidators(valArr: any[], otherValueControl: AbstractControl) {
    if (this.model && (<CodeValueBasedFieldModel>this.model).isListOpen()) {

      let hasOtherValue: boolean = otherValueControl && !!otherValueControl.value;

      /* this was used becouse other value was not added to multi values
      let minItems = AbstractEhrComponent.minItemsViewNr(this.model);
      let maxItems = AbstractEhrComponent.maxItemsViewNr(this.model);
      if (hasOtherValue) {
        minItems--;
        maxItems--;
      }
      this.minItems = minItems;
      this.maxItems = maxItems;*/

      otherValueControl.clearValidators();
      let otherValidatorsArr = [];
      if (!hasOtherValue && this.minItems > valArr.length) {
        otherValidatorsArr.push((c: FormControl) => {
          if (c.value == null || c.value == '') {
            return MrdValidators.createResultErrorObj({valid: false}, 'min', 'listOpen');
          }
          return null;
        });
      }
      if (hasOtherValue && this.maxItems + 1 < valArr.length) {
        otherValidatorsArr.push((c: FormControl) => {
          if (c.value != null || c.value !== '') {
            return MrdValidators.createResultErrorObj({valid: false}, 'max', 'listOpen');
          }
          return null;
        });
      }
      otherValueControl.setValidators(otherValidatorsArr);
      otherValueControl.updateValueAndValidity();
    }
  }

  setAsNotApplicable() {
    if (this.model) {
      this.model.setValue([{_null_flavour: {'|code': 271}}]);
      this.model.getViewConfig().setReadOnly(true);
    }
  }

  removeNotApplicable() {
    if (this.model) {
      this.model.clearValue();
      this.model.getViewConfig().setReadOnly(false);
      this.resetValidators();
    }
  }

  resetValidators() {
    if (this.model) {
      if (!this.model['isListOpen'] || !(<CodeValueBasedFieldModel>this.model).isListOpen()) {
        this.minItems = AbstractEhrComponent.minItemsViewNr(this.model);
        this.maxItems = AbstractEhrComponent.maxItemsViewNr(this.model);
      }
      this.valueValidationFunctions = this.collectModelValidators(this.model);
      this.changeDetectorRef.markForCheck();
    }
  }
}

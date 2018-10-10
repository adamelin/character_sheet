import {
  Component, EventEmitter, Input, ChangeDetectorRef, Renderer, ElementRef,
  OnChanges, SimpleChanges, transition, Renderer2, Inject, ChangeDetectionStrategy
} from '@angular/core';
import {AbstractEhrComponent} from '../abstract-ehr-component.component';
import {FormGroup} from '@angular/forms';
import {EhrValidationMessageResolver} from '../utils/validation/ehr-validation-message-resolver';
import {EhrFormConfig} from '../EhrFormConfig';
import {EhrFormState} from '../utils/EhrFormState';
import {EhrLayoutHelper} from '../utils/EhrLayoutHelper';
import {ValidateOptions, MrdValidators, InputPresentationType, MrdQuantityUnit} from 'mrd-ui-components'
import {QuantityFieldModel} from '../../ehr-form-model/thinkehr-f4-model-ts/model/fieldModel/QuantityFieldModel';
import {InputType} from '../../ehr-form-model/thinkehr-f4-model-ts/view/InputType';
import {ThinkEhrUtil} from '../../ehr-form-model/thinkehr-f4-model-ts/ThinkEhrUtil';
import {NodeModel} from '../../ehr-form-model/thinkehr-f4-model-ts/model/NodeModel';
import {FieldPresentation} from '../../ehr-form-model/thinkehr-f4-model-ts/view/FieldPresentation';
import {InputItem} from '../../ehr-form-model/thinkehr-f4-model-ts/InputItem';
import {isUndefined} from 'util';
import {EhrFieldMultiCtx} from '../utils/ehr-field-multi-ctx';
import {ScriptApi} from '../ScriptApi';
import {EhrModelObservable} from '../../ehr-form-model/ehr-model-observable';
import {Observable} from 'rxjs/Observable';
import {FORM_SCRIPT_API} from '../ehr-form/FormScriptApiProvider';
import {FormScriptApi} from '../ehr-form/FormScriptApi';
import {TranslateService} from 'ng2-translate';
import {EhrContext} from '../../ehr-form-model/thinkehr-f4-model-ts/EhrContext';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/zip'
import {EhrValidationHelper} from "mrd-ui-components";

@Component({
  selector: 'ehr-quantity',
  templateUrl: './ehr-quantity.component.html',
  styleUrls: ['./ehr-quantity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EhrQuantityComponent extends AbstractEhrComponent implements OnChanges {
//TODO set on locale + input label
  private isCommaSeparator: boolean;

  private minValue: number;

  private maxValue: number;

  @Input()
  model: QuantityFieldModel;

  @Input()
  ehrFormGroup: FormGroup;

  @Input()
  validateFormEvent: EventEmitter<ValidateOptions>;

  unitList: BehaviorSubject<MrdQuantityUnit[]> = new BehaviorSubject<MrdQuantityUnit[]>([]);
  unitListTranslated: Observable<MrdQuantityUnit[]>;

  protected hideUnit: boolean;
  protected unitPresentation: InputPresentationType;
  protected decimalPrecision: number;
  protected decimalPrecisionDisplayRoundZeros: boolean;

  constructor(elementRef: ElementRef, renderer: Renderer2, changeDetectorRef: ChangeDetectorRef, EhrLayoutHelper: EhrLayoutHelper,
              ehrFormState: EhrFormState, ehrFormConfig: EhrFormConfig, validationResolver: EhrValidationMessageResolver,
              @Inject(FORM_SCRIPT_API) public scriptApi: FormScriptApi, ehrModelObservable: EhrModelObservable, private translateService: TranslateService, public ehrValidationHelper: EhrValidationHelper) {
    super(elementRef, renderer, changeDetectorRef, EhrLayoutHelper, ehrFormState, ehrFormConfig, validationResolver, scriptApi, ehrModelObservable, ehrValidationHelper);
    this.unitListTranslated = this.unitList.combineLatest(ehrFormState.getFormContext().pluck('language')).switchMap((units_lang: any[]) => {
      const units: MrdQuantityUnit[] = units_lang[0];
      let createDistionaryKey = function (unt: MrdQuantityUnit) {
        return 'unit.' + unt.value;
      };
      const tranlateObsArr: Observable<any>[] = units.map((unt: MrdQuantityUnit) => {
        return this.translateService.get(createDistionaryKey(unt));
      });
      tranlateObsArr.unshift(Observable.of(units_lang[0]));
      return Observable.zip(...tranlateObsArr)
        .map(unts_trans => {
          unts_trans[0].map((unt: MrdQuantityUnit, ind: number) => {
            const translatedUnt: string = unts_trans[ind + 1];
            unt.label = translatedUnt !== createDistionaryKey(unt) ? translatedUnt : unt.label;
          });
          return unts_trans[0].slice();
        });
    });
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    super.ngOnChanges(simpleChanges);
    if (simpleChanges.hasOwnProperty('model')) {
      let newModel: QuantityFieldModel = simpleChanges['model'].currentValue as QuantityFieldModel;

      let validation: any = newModel.getInputByType(InputType.DECIMAL).getValidation();
      if (validation && validation.range) {

        let range = validation.range;

        if (range.min != null) {
          this.minValue = ThinkEhrUtil.isString(range.min) ? parseInt(range.min) : range.min;
        } else {
          this.minValue = null;
        }

        if (range.max != null) {
          this.maxValue = ThinkEhrUtil.isString(range.max) ? parseInt(range.max) : range.max;
        } else {
          this.maxValue = null;
        }
      }

      this.decimalPrecisionDisplayRoundZeros = newModel.hasTag('displayPrecisionZeros');
      this.hideUnit = newModel.hasTag('hideUnit');
      let unitInputItems = newModel.getInputFor('unit').getList();
      if (!unitInputItems) {
        unitInputItems = [];
      }
      this.unitList.next(unitInputItems.map((iItem: InputItem): MrdQuantityUnit => {
        //TODO get for language
        let unit = iItem.value;
        let precisionForUnit: any = newModel.getPrecisionForUnit(unit);
        precisionForUnit = precisionForUnit == null ? 2 : precisionForUnit.max;
        let minObj: any = newModel.getMinValueForUnit(unit);
        let maxObj: any = newModel.getMaxValueForUnit(unit);
        let quantUnit: MrdQuantityUnit = {
          label: iItem.getLabel(this.ehrFormState.currentLanguage),
          value: unit,
          precision: precisionForUnit,
          step: 1 / Math.pow(10, precisionForUnit),
          maxValue: maxObj ? maxObj.max : null,
          maxValueOperator: maxObj ? maxObj.maxOp : null,
          minValue: minObj ? minObj.min : null,
          minValueOperator: minObj ? minObj.minOp : null
        };
        return quantUnit;
      }));

      let unitField = this.unitField(newModel);
      if (unitField && unitField.getPresentation()) {
        this.unitPresentation = InputPresentationType[FieldPresentation[unitField.getPresentation()]];
      } else {
        this.unitPresentation = InputPresentationType.DROPDOWN;
      }

      let precisionForUnit = newModel.getPrecisionForUnit(0);
      this.decimalPrecision = precisionForUnit != null ? precisionForUnit.max : 2;

      let minValueForUnit = newModel.getMinValueForUnit(0);
      this.minValue = minValueForUnit != null ? minValueForUnit.min : null;

      let maxValueForUnit = newModel.getMaxValueForUnit(0);
      this.maxValue = maxValueForUnit != null ? maxValueForUnit.max : null;

    }
  }

  getModelValuesArrObs(forModel: NodeModel): Observable<any> {
    //set default values
    (forModel as QuantityFieldModel).magnitudeValue(undefined, 0);
    (forModel as QuantityFieldModel).unitValue(undefined, 0);
    //TODO make model immutable - when model is reset values are not immutable - we have distinctUntilChanged problem and fixing it here
    return super.getModelValuesArrObs(forModel).map(v => v.map(v1 => Object.assign({}, v1)));
  }

  private unitField(model: NodeModel) {
    return model.getViewConfig().getFields('unit');
  };

  protected get modelGetterSetterMethodName(): string {
    return 'getValue';
  };

  protected get modelEmptyValue(): any {
    return {'|magnitude': null, '|unit': null};
  };

  updateModel(val: any, multiIndex: number): void {
    if (this.model.magnitudeValue(undefined, multiIndex) !== val) {
      this.model.magnitudeValue(val, multiIndex);
      if (this.hideUnit && this.unitList && this.unitList.getValue().length === 1 && this.unitList.getValue()[0].value) {
        this.updateUnit(this.unitList.getValue()[0].value, multiIndex);
      }
    }
  }

  updateUnit(val: any, multiIndex: number): void {
    if (this.model.unitValue(undefined, multiIndex) !== val) {
      this.model.unitValue(val, multiIndex);
    }
  }

  onAddMultiInput() {
    this.modelValues$.take(1).map(arr => arr.length).subscribe((modelValuesLength) => {
      this.model.setValue({}, modelValuesLength);
    });
  }

  onRemoveMultiInput(atIndex: number) {
    super.onRemoveMultiInput(null);
    //renderMin does not reflect on model value (just in UI) until user edits any field
    this.model.setValue(null, atIndex);
  }

  protected resetMultiButtonsState(valArr) {
    valArr = valArr.map((val) => {
      let magn = val['|magnitude'];
      return ThinkEhrUtil.isNumber(magn) ? true : null;
    });
    this.addDisabledIndexes = EhrFieldMultiCtx.getAddDisabledIndexes(valArr, this.model);
    this.removeDisabledIndexes = EhrFieldMultiCtx.getRemoveDisabledIndexes(valArr, this.model);
  }

  collectModelValidators(model: NodeModel): any[] {

    let validators: any[] = [];
    if (model.isRequired()) {
      validators.push(MrdValidators.numericRequired());
    }
    return validators;

  }

  private getPropValue(modelValueObj: any, prop: string) {
    return modelValueObj ? modelValueObj[prop] : this.modelEmptyValue;
  }

}

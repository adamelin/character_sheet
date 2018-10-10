import {
  Component, OnInit, OnChanges, Input, EventEmitter, ElementRef, Renderer,
  ChangeDetectorRef, SimpleChanges, ChangeDetectionStrategy, Renderer2, Inject
} from '@angular/core';
import {AbstractEhrComponent} from "../abstract-ehr-component.component";
import {FormGroup, ValidatorFn} from "@angular/forms";
import {EhrLayoutHelper} from "../utils/EhrLayoutHelper";
import {EhrFormState} from "../utils/EhrFormState";
import {EhrFormConfig} from "../EhrFormConfig";
import {EhrValidationMessageResolver} from "../utils/validation/ehr-validation-message-resolver";
import {ValidateOptions, MrdValidators} from "mrd-ui-components";
import {InputType} from "../../ehr-form-model/thinkehr-f4-model-ts/view/InputType";
import {EhrFieldMultiCtx} from "../utils/ehr-field-multi-ctx";
import {Validation} from "../../ehr-form-model/thinkehr-f4-model-ts/Validation";
import {ProportionFieldModel} from "../../ehr-form-model/thinkehr-f4-model-ts/model/fieldModel/ProportionFieldModel";
import {NodeModel} from "../../ehr-form-model/thinkehr-f4-model-ts/model/NodeModel";
import * as mrdInput from "../../ehr-form-model/thinkehr-f4-model-ts/Input";
import {ThinkEhrUtil} from "../../ehr-form-model/thinkehr-f4-model-ts/ThinkEhrUtil";
 import {ScriptApi} from "../ScriptApi";
 import {EhrModelObservable} from "../../ehr-form-model/ehr-model-observable";
import {Observable} from "rxjs/Observable";
import {FORM_SCRIPT_API} from "../ehr-form/FormScriptApiProvider";
import {FormScriptApi} from "../ehr-form/FormScriptApi";
import {EhrValidationHelper} from "mrd-ui-components";

@Component({
  selector: 'ehr-proportion',
  templateUrl: './ehr-proportion.component.html',
  styleUrls: ['./ehr-proportion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EhrProportionComponent extends AbstractEhrComponent implements OnChanges {

  @Input()
  model: ProportionFieldModel;

  @Input()
  ehrFormGroup: FormGroup;

  @Input()
  validateFormEvent: EventEmitter<ValidateOptions>;

  //TODO set separator based on locale
  private isCommaSeparator: number;

  private numeratorPrecision: number;
  private numeratorStep: number;
  private numeratorMinValue: number;
  private numeratorMinValueOp: string;
  private numeratorMaxValue: number;
  private numeratorMaxValueOp: string;
  private numeratorValidationFunctions: ValidatorFn[];


  private denominatorPrecision: number;
  private denominatorStep: number;
  private denominatorMinValue: number;
  private denominatorMinValueOp: string;
  private denominatorMaxValue: number;
  private denominatorMaxValueOp: string;
  private denominatorValidationFunctions: ValidatorFn[];

  constructor(elementRef: ElementRef, renderer: Renderer2, changeDetectorRef: ChangeDetectorRef, EhrLayoutHelper: EhrLayoutHelper,
              ehrFormState: EhrFormState, ehrFormConfig: EhrFormConfig, validationResolver: EhrValidationMessageResolver, @Inject(FORM_SCRIPT_API) scriptApi: ScriptApi, ehrModelObservable:EhrModelObservable, public ehrValidationHelper: EhrValidationHelper) {
    super(elementRef, renderer, changeDetectorRef, EhrLayoutHelper, ehrFormState, ehrFormConfig, validationResolver,scriptApi, ehrModelObservable, ehrValidationHelper) ;
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    super.ngOnChanges(simpleChanges);

    if (simpleChanges.hasOwnProperty('model')) {
      let newModel: ProportionFieldModel = simpleChanges['model'].currentValue as ProportionFieldModel;

      this.numeratorPrecision = this.inputPrecision(newModel.getInputFor("numerator"));
      this.denominatorPrecision = this.inputPrecision(newModel.getInputFor("denominator"));

      this.numeratorMinValue = newModel.getMinValueForNumerator();
      this.numeratorMinValueOp = newModel.getMinOperatorForNumerator();
      this.numeratorMaxValue = newModel.getMaxValueForNumerator();
      this.numeratorMaxValueOp = newModel.getMaxOperatorForNumerator();

      this.denominatorMinValue = newModel.getMinValueForDenominator();
      this.denominatorMinValueOp = newModel.getMinOperatorForDenominator();
      this.denominatorMaxValue = newModel.getMaxValueForDenominator();
      this.denominatorMaxValueOp = newModel.getMaxOperatorForDenominator();

      this.denominatorValidationFunctions = [MrdValidators.isNumeric()];
      this.numeratorValidationFunctions = [MrdValidators.isNumeric()];

      if (newModel.isRequired()) {
        this.numeratorValidationFunctions.push(MrdValidators.numericRequired());
        if (!this.isFixedDenominator) {
          this.denominatorValidationFunctions.push(MrdValidators.numericRequired());
        }
      }
    }
  }

  getModelValuesArrObs(forModel: NodeModel):Observable<any> {
    //TODO make model immutable - when model is reset values are not immutable - we have distinctUntilChanged problem and fixing it here
    //setting default values
    (forModel as ProportionFieldModel).denominatorValue(undefined, 0);
    (forModel as ProportionFieldModel).numeratorValue(undefined, 0);
    return super.getModelValuesArrObs(forModel).map(v => v.map(v1 => Object.assign({}, v1)));
  }

  protected get modelGetterSetterMethodName(): string {
    return 'getValue';
  };

  protected get modelEmptyValue(): any {
    return {'|numerator': null, '|denominator': null};
  };

  onNumeratorValue(val: number, multiIndex: number) {
    if (this.model.numeratorValue(undefined, multiIndex) !== val) {
      this.model.numeratorValue(val, multiIndex);
    }
  }

  onDenominatorValue(val: number, multiIndex: number) {
    if (this.model.denominatorValue(undefined, multiIndex) !== val) {
      this.model.denominatorValue(val, multiIndex);
    }
  }

  onAddMultiInput() {
    this.modelValues$.take(1).map(arr => arr.length).subscribe((modelValuesLength) => {
      this.model.setValue({}, modelValuesLength);
    });
  }

  onRemoveMultiInput(atIndex: number) {
    super.onRemoveMultiInput(null);
    this.model.setValue(null, atIndex);
  }

  protected resetMultiButtonsState(valArr) {
    valArr = valArr.map((val) => {
      let num = val['|numerator'];
      let den = val['|denominator'];
      return ThinkEhrUtil.isNumber(num) && ThinkEhrUtil.isNumber(den)? true : null;
    });
    this.addDisabledIndexes = EhrFieldMultiCtx.getAddDisabledIndexes(valArr, this.model);
    this.removeDisabledIndexes = EhrFieldMultiCtx.getRemoveDisabledIndexes(valArr, this.model);
  }

  private inputPrecision = function (input: mrdInput.Input) {

    if (input.getType() === InputType.DECIMAL) {
      if (input.getValidation()) {
        let p = input.getValidation().getPrecision();
        return p ? p.max : 3;
      } else {
        return 3;
      }
    } else {
      return 0;
    }
  };

  private get isPercentage(): boolean {
    let denominatorInput = this.model.getInputFor("denominator");
    if (denominatorInput.getValidation()) {
      let v: Validation = denominatorInput.getValidation();
      return (v.getRange() && v.getRange().min == 100.0 && v.getRange().max == 100.0);
    }

    return false;
  };

  private get isFixedDenominator(): boolean {
    let denominatorInput = this.model.getInputFor("denominator");
    if (denominatorInput.getValidation()) {
      let v = denominatorInput.getValidation();
      return (v.getRange() && v.getRange().min !== undefined && v.getRange().min == v.getRange().max);
    }

    return false;
  };
}

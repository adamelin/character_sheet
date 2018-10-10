import {
  Component, EventEmitter, Input, ChangeDetectorRef, Renderer, ElementRef,
  OnChanges, SimpleChanges, Renderer2, Inject
} from '@angular/core';
import {AbstractEhrComponent} from "../abstract-ehr-component.component";
import {FormGroup} from "@angular/forms";
import {EhrValidationMessageResolver} from "../utils/validation/ehr-validation-message-resolver";
import {EhrFormConfig} from "../EhrFormConfig";
import {EhrFormState} from "../utils/EhrFormState";
import {EhrLayoutHelper} from "../utils/EhrLayoutHelper";
import {ValidateOptions, MrdValidators} from "mrd-ui-components";
import {CountFieldModel} from "../../ehr-form-model/thinkehr-f4-model-ts/model/fieldModel/CountFieldModel";
import {InputType} from "../../ehr-form-model/thinkehr-f4-model-ts/view/InputType";
import {ThinkEhrUtil} from "../../ehr-form-model/thinkehr-f4-model-ts/ThinkEhrUtil";
import {NodeModel} from "../../ehr-form-model/thinkehr-f4-model-ts/model/NodeModel";
import {ScriptApi} from "../ScriptApi";
import {EhrModelObservable} from "../../ehr-form-model/ehr-model-observable";
import {FORM_SCRIPT_API} from "../ehr-form/FormScriptApiProvider";
import {FormScriptApi} from "../ehr-form/FormScriptApi";
import {EhrValidationHelper} from "mrd-ui-components";

@Component({
  selector: 'ehr-count',
  templateUrl: './ehr-count.component.html',
  styleUrls: ['./ehr-count.component.scss']
})
export class EhrCountComponent extends AbstractEhrComponent implements OnChanges {
//TODO set on locale
  private isCommaSeparator: boolean;

  minValue: number;
  minValueOperator: string;

  maxValue: number;
  maxValueOperator: string;

  @Input()
  model: CountFieldModel;

  @Input()
  ehrFormGroup: FormGroup;

  @Input()
  validateFormEvent: EventEmitter<ValidateOptions>;

  constructor(elementRef: ElementRef, renderer: Renderer2, changeDetectorRef: ChangeDetectorRef, EhrLayoutHelper: EhrLayoutHelper,
              ehrFormState: EhrFormState, ehrFormConfig: EhrFormConfig, validationResolver: EhrValidationMessageResolver, @Inject(FORM_SCRIPT_API) public scriptApi: FormScriptApi, ehrModelObservable: EhrModelObservable, public ehrValidationHelper: EhrValidationHelper) {
    super(elementRef, renderer, changeDetectorRef, EhrLayoutHelper, ehrFormState, ehrFormConfig, validationResolver, scriptApi, ehrModelObservable, ehrValidationHelper);
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    super.ngOnChanges(simpleChanges);
    if (simpleChanges.hasOwnProperty('model')) {
      let newModel: CountFieldModel = simpleChanges['model'].currentValue as CountFieldModel;

      let validation: any = newModel.getInputByType(InputType.INTEGER).getValidation();
      if (validation && validation.range) {

        let range = validation.range;

        if (range.min != null) {
          this.minValue = ThinkEhrUtil.isString(range.min) ? parseInt(range.min) : range.min;
          this.minValueOperator = range.minOp;
        } else {
          this.minValue = null;
        }

        if (range.max != null) {
          this.maxValue = ThinkEhrUtil.isString(range.max) ? parseInt(range.max) : range.max;
          this.maxValueOperator = range.maxOp;
        } else {
          this.maxValue = null;
        }
      }
    }
  }

  protected get modelGetterSetterMethodName(): string {
    return 'countValue';
  };

  protected get modelEmptyValue(): any {
    return '';
  };

  updateModel(val: any, index: number): void {
    if (isNaN(val)) {
      val = this.modelEmptyValue;
    }
    if (this.model[this.modelGetterSetterMethodName](undefined, index) != val) {
      //console.log("MODEL UPDATEEEEE=", val, " index=", index, " current=",this.model[this.modelGetterSetterMethodName](undefined, index), this.model.getValue(undefined, undefined));
      this.model[this.modelGetterSetterMethodName](val, index);
    }
  }

  collectModelValidators(model: NodeModel): any[] {

    let validators: any[] = [];
    if (model.isRequired()) {
      validators.push(MrdValidators.numericRequired());
    }
    return validators;

  }
}

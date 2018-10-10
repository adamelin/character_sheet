import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ElementRef,
  EventEmitter, ChangeDetectorRef, Renderer2, SimpleChanges, OnChanges, OnDestroy, Inject, OnInit
} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {EhrLayoutHelper} from "../utils/EhrLayoutHelper";
import {TextFieldModel} from "../../ehr-form-model/thinkehr-f4-model-ts/model/fieldModel/TextFieldModel";
import {EhrFormConfig} from "../EhrFormConfig";
import {
  ValidateOptions
} from "mrd-ui-components";
import {EhrFormState} from "../utils/EhrFormState";
import {AbstractEhrComponent} from "../abstract-ehr-component.component";
import {NodeModel} from "../../ehr-form-model/thinkehr-f4-model-ts/model/NodeModel";
import {EhrValidationMessageResolver} from "../utils/validation/ehr-validation-message-resolver";
import {ScriptApi} from "../ScriptApi";
import {EhrModelObservable} from "../../ehr-form-model/ehr-model-observable";
import {Field} from "../../ehr-form-model/thinkehr-f4-model-ts/view/Field";
import {FormRepeatableElementModel} from "../../ehr-form-model/thinkehr-f4-model-ts/model/FormRepeatableElementModel";
import {Input as EhrInput} from "../../ehr-form-model/thinkehr-f4-model-ts/Input";
import {FORM_SCRIPT_API} from "../ehr-form/FormScriptApiProvider";
import {FormScriptApi} from "../ehr-form/FormScriptApi";
import {EhrContext} from "../../ehr-form-model/thinkehr-f4-model-ts/EhrContext";
import {takeUntil} from "rxjs/operators";
import {EhrValidationHelper} from "mrd-ui-components";

@Component({
  selector: 'ehr-identifier',
  templateUrl: 'ehr-identifier.component.html',
  styleUrls: ['ehr-identifier.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EhrIdentifierComponent extends AbstractEhrComponent implements OnChanges, OnDestroy, OnInit {

  @Input()
  model: TextFieldModel;

  @Input()
  ehrFormGroup: FormGroup;

  @Input()
  validateFormEvent: EventEmitter<ValidateOptions>;


  protected displayTextInputClearButton: boolean;

  protected get modelGetterSetterMethodName(): string {
    return 'idValue';
  };

  protected get modelEmptyValue(): any {
    return '';
  };

  constructor(elementRef: ElementRef, renderer: Renderer2, changeDetectorRef: ChangeDetectorRef, EhrLayoutHelper: EhrLayoutHelper,
              ehrFormState: EhrFormState, ehrFormConfig: EhrFormConfig, validationResolver: EhrValidationMessageResolver, @Inject(FORM_SCRIPT_API) public scriptApi: FormScriptApi, ehrModelObservable: EhrModelObservable, public ehrValidationHelper: EhrValidationHelper) {
    super(elementRef, renderer, changeDetectorRef, EhrLayoutHelper, ehrFormState, ehrFormConfig, validationResolver, scriptApi, ehrModelObservable, ehrValidationHelper);
  }


  ngOnChanges(simpleChanges: SimpleChanges) {
    super.ngOnChanges(simpleChanges);
    if (simpleChanges.hasOwnProperty('model')) {
      const currModel = simpleChanges.model.currentValue;

      this.displayTextInputClearButton = currModel.getViewConfig().hasTag('clearButton') || this.displayTextInputClearButton;

    }
  }

  ngOnInit() {
    super.ngOnInit();
    this.ehrFormState.getFormContext().pipe(takeUntil(this.onDestroySubj)).subscribe((fCtx: EhrContext) => {
      this.displayTextInputClearButton = fCtx.textInputClearButtonShow || this.displayTextInputClearButton;
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  private getInput(model: NodeModel): EhrInput {
    return model.getInputFor('idValues');
  }

  private idValuesField(model: FormRepeatableElementModel): Field {
    return model.getViewConfig().getFields();
  };

}

import {
  Component, OnInit, ChangeDetectorRef, Renderer, ElementRef, EventEmitter, Input,
  Renderer2, Inject
} from '@angular/core';
import {EhrTextComponent} from "../ehr-text.component";
import {EhrValidationMessageResolver} from "../../utils/validation/ehr-validation-message-resolver";
import {EhrFormConfig} from "../../EhrFormConfig";
import {EhrFormState} from "../../utils/EhrFormState";
import {EhrLayoutHelper} from "../../utils/EhrLayoutHelper";
import {FormGroup, Validators} from "@angular/forms";
import {EhrValidationHelper, ValidateOptions} from "mrd-ui-components";
import {NodeModel} from "../../../ehr-form-model/thinkehr-f4-model-ts/model/NodeModel";
import {EhrUriFieldModel} from "../../../ehr-form-model/thinkehr-f4-model-ts/model/fieldModel/EhrUriFieldModel";
import {TranslateService} from "ng2-translate";
import {ScriptApi} from "../../ScriptApi";
import {EhrModelObservable} from "../../../ehr-form-model/ehr-model-observable";
import {FORM_SCRIPT_API} from "../../ehr-form/FormScriptApiProvider";
import {FormScriptApi} from "../../ehr-form/FormScriptApi";
import {ViewConfigParser} from "../../../ehr-form-model/thinkehr-f4-model-ts/parsing/ViewConfigParser";

@Component({
  selector: 'ehr-ehr-uri',
  templateUrl: '../ehr-text.component.html',
  styleUrls: ['../ehr-text.component.scss']
})
export class EhrEhrUriComponent extends EhrTextComponent {

  @Input()
  model: any;//TextFieldModel;

  @Input()
  ehrFormGroup: FormGroup;

  @Input()
  validateFormEvent: EventEmitter<ValidateOptions>;

  protected get modelGetterSetterMethodName(): string {
    return 'ehrUriValue';
  };

  protected get modelEmptyValue(): any {
    return '';
  };

  constructor(elementRef: ElementRef,
              renderer: Renderer2,
              changeDetectorRef: ChangeDetectorRef,
              EhrLayoutHelper: EhrLayoutHelper,
              ehrFormState: EhrFormState,
              ehrFormConfig: EhrFormConfig,
              validationResolver: EhrValidationMessageResolver,
              translate:TranslateService,  @Inject(FORM_SCRIPT_API) public scriptApi: FormScriptApi, ehrModelObservable:EhrModelObservable, viewConfigParser:ViewConfigParser, public ehrValidationHelper: EhrValidationHelper
  ) {
    super(elementRef, renderer, changeDetectorRef, EhrLayoutHelper, ehrFormState, ehrFormConfig, validationResolver,scriptApi, ehrModelObservable, translate, viewConfigParser, ehrValidationHelper) ;
    this.validationResolver = new EhrValidationMessageResolver(translate);
    this.validationResolver.setValidationErrorValueHandler((validationKey:string, validationValues:any)=>{
      if(validationKey==='pattern') {
        return {patternValidExample: this.model.getPatternValidExample()};
      }
    });
  }

  collectModelValidators(model: NodeModel): any[] {
    let validators: any[] = super.collectModelValidators(model);
    let ehrEhrUriPattern: any = (<EhrUriFieldModel>this.model).getEhrUriPattern();
    validators.push(Validators.pattern(ehrEhrUriPattern));
    return validators;
  }
}

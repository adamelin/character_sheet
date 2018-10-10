import {
  Component, OnInit, ChangeDetectorRef, Renderer, ElementRef, Input, EventEmitter,
  Renderer2, Inject
} from '@angular/core';
import {EhrTextComponent} from "../ehr-text.component";
import {EhrValidationMessageResolver} from "../../utils/validation/ehr-validation-message-resolver";
import {EhrFormConfig} from "../../EhrFormConfig";
import {EhrFormState} from "../../utils/EhrFormState";
import {EhrLayoutHelper} from "../../utils/EhrLayoutHelper";
import {FormGroup} from "@angular/forms";
import {TextFieldModel} from "../../../ehr-form-model/thinkehr-f4-model-ts/model/fieldModel/TextFieldModel";
import {EhrValidationHelper, ValidateOptions} from "mrd-ui-components";
import {ScriptApi} from "../../ScriptApi";
import {EhrModelObservable} from "../../../ehr-form-model/ehr-model-observable";
import {TranslateService} from "ng2-translate";
import {FORM_SCRIPT_API} from "../../ehr-form/FormScriptApiProvider";
import {FormScriptApi} from "../../ehr-form/FormScriptApi";
import {ViewConfigParser} from "../../../ehr-form-model/thinkehr-f4-model-ts/parsing/ViewConfigParser";

@Component({
  selector: 'ehr-uri',
  templateUrl: '../ehr-text.component.html',
  styleUrls: ['ehr-uri.component.scss']
})
export class EhrUriComponent extends EhrTextComponent {

  @Input()
  model: TextFieldModel;

  @Input()
  ehrFormGroup: FormGroup;

  @Input()
  validateFormEvent: EventEmitter<ValidateOptions>;

  protected get modelGetterSetterMethodName(): string {
    return 'uriValue';
  };

  protected get modelEmptyValue(): any {
    return '';
  };

  constructor(elementRef: ElementRef, renderer: Renderer2, changeDetectorRef: ChangeDetectorRef, EhrLayoutHelper: EhrLayoutHelper,
              ehrFormState: EhrFormState, ehrFormConfig: EhrFormConfig, validationResolver: EhrValidationMessageResolver,
              @Inject(FORM_SCRIPT_API) public scriptApi: FormScriptApi, ehrModelObservable:EhrModelObservable, translate:TranslateService, viewConfigParser:ViewConfigParser, public ehrValidationHelper: EhrValidationHelper) {
    super(elementRef, renderer, changeDetectorRef, EhrLayoutHelper, ehrFormState, ehrFormConfig, validationResolver, scriptApi, ehrModelObservable, translate, viewConfigParser, ehrValidationHelper) ;
  }


}

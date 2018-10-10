import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, Renderer2,
  SimpleChanges
} from '@angular/core';
import {TranslateService} from "ng2-translate";
import {EhrTextComponent} from '../../ehr-form-components/ehr-text/ehr-text.component';
import {EhrFormCustomComponent} from "../../";
import {CustomModel, EhrModelObservable} from "../../ehr-form-model";
import {EhrLayoutHelper} from "../../ehr-form-components/utils/EhrLayoutHelper";
import {EhrFormState} from "../../ehr-form-components/utils/EhrFormState";
import {EhrFormConfig} from "../../ehr-form-components/EhrFormConfig";
import {EhrValidationMessageResolver} from "../../ehr-form-components/utils/validation/ehr-validation-message-resolver";
import {FORM_SCRIPT_API} from "../../ehr-form-components/ehr-form/FormScriptApiProvider";
import {FormScriptApi} from "../../ehr-form-components/ehr-form/FormScriptApi";
import {ViewConfigParser} from "../../ehr-form-model/thinkehr-f4-model-ts/parsing/ViewConfigParser";
import {EhrValidationHelper} from "mrd-ui-components";


@Component({
  selector: 'extended-text-comp',
  templateUrl: './extended-text.component.html',
  styleUrls: ['./extended-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExtendedTextComponent extends EhrTextComponent implements OnDestroy, EhrFormCustomComponent {
  //need custom model if using it as annotation custom component
  customModel: CustomModel;

  constructor(elementRef: ElementRef, renderer: Renderer2, changeDetectorRef: ChangeDetectorRef, EhrLayoutHelper: EhrLayoutHelper,
              ehrFormState: EhrFormState, ehrFormConfig: EhrFormConfig, validationResolver: EhrValidationMessageResolver,
              @Inject(FORM_SCRIPT_API) public scriptApi: FormScriptApi, ehrModelObservable: EhrModelObservable, translateService: TranslateService, viewConfigParser: ViewConfigParser, public ehrValidationHelper: EhrValidationHelper) {
    super(elementRef, renderer, changeDetectorRef, EhrLayoutHelper, ehrFormState, ehrFormConfig, validationResolver, scriptApi, ehrModelObservable, translateService, viewConfigParser, ehrValidationHelper);

  }

  ngOnChanges(sc: SimpleChanges) {
    /*if(sc.model && !sc.customModel) {
      (sc.model.currentValue as NodeModel).setMax(4);
    }*/
    super.ngOnChanges(sc);
  }

}


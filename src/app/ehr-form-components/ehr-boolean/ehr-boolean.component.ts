import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {EhrLayoutHelper} from '../utils/EhrLayoutHelper';
import {EhrFormConfig} from '../EhrFormConfig';
import {MrdValidators, ValidateOptions} from 'mrd-ui-components';
import {EhrFormState} from '../utils/EhrFormState';
import {AbstractEhrComponent} from '../abstract-ehr-component.component';
import {NodeModel} from '../../ehr-form-model/thinkehr-f4-model-ts/model/NodeModel';
import {EhrValidationMessageResolver} from '../utils/validation/ehr-validation-message-resolver';
import {BooleanFieldModel} from '../../ehr-form-model/thinkehr-f4-model-ts/model/BooleanFieldModel';
import {EhrModelObservable} from '../../ehr-form-model/ehr-model-observable';
import {FORM_SCRIPT_API} from '../ehr-form/FormScriptApiProvider';
import {FormScriptApi} from '../ehr-form/FormScriptApi';
import {EhrValidationHelper} from "mrd-ui-components";

@Component({
  selector: 'ehr-boolean',
  templateUrl: 'ehr-boolean.component.html',
  styleUrls: ['ehr-boolean.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EhrBooleanComponent extends AbstractEhrComponent {

  @Input()
  model: BooleanFieldModel;

  @Input()
  ehrFormGroup: FormGroup;

  @Input()
  validateFormEvent: EventEmitter<ValidateOptions>;

  protected get modelGetterSetterMethodName(): string {
    return 'booleanValue';
  };

  protected get modelEmptyValue(): any {
    return '';
  };

  protected updateModelValuesObs(forModel:NodeModel) {
    this.model.booleanValue();
    this.modelValues$ = this.getModelValuesArrObs(forModel).distinctUntilChanged().map(valArr => {
      this.notApplicableValue = this.isNotApplicableValue(valArr);
      if(this.notApplicableValue){
        valArr= [];
      }
      return valArr
    });
  }

  private allowedValues: any[];
  protected textRight:string;

  constructor(elementRef: ElementRef, renderer: Renderer2, changeDetectorRef:ChangeDetectorRef, EhrLayoutHelper: EhrLayoutHelper,
              ehrFormState: EhrFormState, ehrFormConfig:EhrFormConfig, validationResolver: EhrValidationMessageResolver,  @Inject(FORM_SCRIPT_API) public scriptApi: FormScriptApi, ehrModelObservable:EhrModelObservable, public ehrValidationHelper: EhrValidationHelper) {
    super(elementRef, renderer, changeDetectorRef, EhrLayoutHelper, ehrFormState, ehrFormConfig, validationResolver, scriptApi, ehrModelObservable, ehrValidationHelper);
  }

  ngOnChanges(simpleChanges:SimpleChanges){
    super.ngOnChanges(simpleChanges);
    if(simpleChanges.hasOwnProperty('model')){
      const newModel = simpleChanges.model.currentValue;
      this.allowedValues = newModel.allowedValues().slice();
      if(!newModel.isThreeState() && newModel.allowedValues().length===1 && newModel.allowedValues().indexOf(null)<0) {
        this.allowedValues.push(null);
      }
      this.textRight = '';
      if(newModel.hasAnnotation('boolTextRight')){
        this.textRight = newModel.annotationValue('boolTextRight');
      }
    }
  }

  isThreeState(){
    let ret = this.model.isThreeState();
    if(!ret && this.model.allowedValues().length===1) {
      return true;
    }
    return ret;
  }

  collectModelValidators(model: NodeModel): any[] {
    let validators: any[] = [];
    if (model.isRequired()) {
      validators.push(MrdValidators.booleanRequired());
    }
    return validators;
  }

}

import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Renderer2
} from '@angular/core';
import {AbstractEhrComponent} from '../abstract-ehr-component.component';
import {FormGroup} from '@angular/forms';
import {EhrValidationMessageResolver} from '../utils/validation/ehr-validation-message-resolver';
import {EhrFormConfig} from '../EhrFormConfig';
import {EhrFormState} from '../utils/EhrFormState';
import {EhrLayoutHelper} from '../utils/EhrLayoutHelper';
import {MrdDateTimeValue, ValidateOptions, MrdTimePlaceholderFormat} from 'mrd-ui-components'
import {TimeFieldModel} from '../../ehr-form-model/thinkehr-f4-model-ts/model/fieldModel/TimeFieldModel';
import {NodeModel} from '../../ehr-form-model/thinkehr-f4-model-ts/model/NodeModel';
import {EhrModelObservable} from '../../ehr-form-model/ehr-model-observable';
import {Observable} from 'rxjs/Observable';
import {FORM_SCRIPT_API} from '../ehr-form/FormScriptApiProvider';
import {FormScriptApi} from '../ehr-form/FormScriptApi';
import {EhrContext} from '../../ehr-form-model/thinkehr-f4-model-ts/EhrContext';
import {takeUntil} from "rxjs/operators";
import {EhrValidationHelper} from "mrd-ui-components";

@Component({
  selector: 'ehr-time',
  templateUrl: './ehr-time.component.html',
  styleUrls: ['./ehr-time.component.scss']
})
export class EhrTimeComponent extends AbstractEhrComponent implements OnChanges, OnInit {

  @Input()
  model: TimeFieldModel;

  @Input()
  ehrFormGroup: FormGroup;

  @Input()
  validateFormEvent: EventEmitter<ValidateOptions>;

  /* Custom timepicker placeholders from EhrContext*/
  timePlaceholder: MrdTimePlaceholderFormat;

  constructor(elementRef: ElementRef, renderer: Renderer2, changeDetectorRef: ChangeDetectorRef, EhrLayoutHelper: EhrLayoutHelper,
              ehrFormState: EhrFormState, ehrFormConfig: EhrFormConfig, validationResolver: EhrValidationMessageResolver,  @Inject(FORM_SCRIPT_API) public scriptApi: FormScriptApi, ehrModelObservable:EhrModelObservable, public ehrValidationHelper: EhrValidationHelper) {
    super(elementRef, renderer, changeDetectorRef, EhrLayoutHelper, ehrFormState, ehrFormConfig, validationResolver, scriptApi, ehrModelObservable, ehrValidationHelper) ;
  }

  ngOnInit() {
    super.ngOnInit();
    this.ehrFormState.getFormContext().pipe(takeUntil(this.onDestroySubj)).subscribe((ctx: EhrContext) => {
      this.timePlaceholder = ctx.timePlaceholder;
    });
  }

  getModelValuesArrObs(forModel: NodeModel):Observable<any> {
    //set default values
    (forModel as TimeFieldModel).timeValue(undefined, 0);
    return super.getModelValuesArrObs(forModel).map(v => v.map((v1: any) => {
      let mrdTimeTimeValue = v1?this.toMrdObjectValue(v1):'';
      return mrdTimeTimeValue;
    }));
  }

  protected get modelGetterSetterMethodName(): string {
    return 'timeValue';
  };

  protected get modelEmptyValue(): any {
    return '';
  };

  updateModel(val: MrdDateTimeValue, index: number): void {
    if (this.isEmptyValue(val)) {
      val = this.modelEmptyValue;
    }
    let newModelValue = this.toModelValue(val);
    if (this.model[this.modelGetterSetterMethodName](undefined, index) != newModelValue) {
      //console.log("MODEL UPDATEEEEE=", val, " index=", index, " current=",this.model[this.modelGetterSetterMethodName](undefined, index), this.model.getValue(undefined, undefined));
      this.model[this.modelGetterSetterMethodName](newModelValue, index);
    }
  }

  private toModelValue(mrdDateTimeObj: MrdDateTimeValue): string {
    if(mrdDateTimeObj){
      return (mrdDateTimeObj.hour || 0) + ':' + (mrdDateTimeObj.minute ||0 )/// + ':' + mrdDateTimeObj.second;
    }
    return mrdDateTimeObj.toString();
  }

  private toMrdObjectValue(time: string): MrdDateTimeValue {

    let timeSplit = time.split(':');
    let hour = parseInt(timeSplit[0]);
    let minute = parseInt(timeSplit[1]);
    let second = parseInt(timeSplit[2]);

    if (isNaN(hour)) {
      hour = null;
    }
    if (isNaN(minute)) {
      minute = null;
    }
    if (isNaN(second)) {
      second = null;
    }
    return {hour: hour, minute: minute, second: second};

  }

  private isEmptyValue(val: MrdDateTimeValue):boolean {
    if (!val) {
      return false;
    }
    let validKeyNames: string[] = ['hour', 'minute', 'second'];
    return !Object.keys(val).find((keyName) => {
      return validKeyNames.indexOf(keyName) >= 0 && val[keyName] != null;
    });
  }
}

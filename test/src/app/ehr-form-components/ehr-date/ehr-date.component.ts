import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import {AbstractEhrComponent} from '../abstract-ehr-component.component';
import {FormGroup} from '@angular/forms';
import {EhrValidationMessageResolver} from '../utils/validation/ehr-validation-message-resolver';
import {EhrFormConfig} from '../EhrFormConfig';
import {EhrFormState} from '../utils/EhrFormState';
import {EhrLayoutHelper} from '../utils/EhrLayoutHelper';
import {MrdDateTimeValue, ValidateOptions} from 'mrd-ui-components';
import {DateFieldModel} from '../../ehr-form-model/thinkehr-f4-model-ts/model/fieldModel/DateFieldModel';
import {NodeModel} from '../../ehr-form-model/thinkehr-f4-model-ts/model/NodeModel';
import {EhrModelObservable} from '../../ehr-form-model/ehr-model-observable';
import {EhrContext} from '../../ehr-form-model/thinkehr-f4-model-ts/EhrContext';
import {Observable} from 'rxjs/Observable';
import {FORM_SCRIPT_API} from '../ehr-form/FormScriptApiProvider';
import {FormScriptApi} from '../ehr-form/FormScriptApi';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {DaysValidationUtils} from '../utils/validation/DaysValidationUtils';
import {takeUntil} from "rxjs/operators";
import {EhrValidationHelper} from "mrd-ui-components";

@Component({
  selector: 'ehr-date',
  templateUrl: './ehr-date.component.html',
  styleUrls: ['./ehr-date.component.scss']
})
export class EhrDateComponent extends AbstractEhrComponent implements OnInit, OnChanges {

  @Input()
  model: DateFieldModel;

  @Input()
  ehrFormGroup: FormGroup;

  @Input()
  validateFormEvent: EventEmitter<ValidateOptions>;

  displayDateInputMask: boolean;

  private clearButtonHide: boolean;
  private blurDateParserFn: (inputValue: string, currDateValue: NgbDateStruct | string) => NgbDateStruct;
  private dateWithinRangeDays: string[];

  constructor(elementRef: ElementRef,
              renderer: Renderer2,
              changeDetectorRef: ChangeDetectorRef,
              ehrLayoutHelper: EhrLayoutHelper,
              ehrFormState: EhrFormState,
              ehrFormConfig: EhrFormConfig,
              validationResolver: EhrValidationMessageResolver,
              @Inject(FORM_SCRIPT_API) public scriptApi: FormScriptApi,
              ehrModelObservable: EhrModelObservable, private dateValidationUtil:DaysValidationUtils, public ehrValidationHelper: EhrValidationHelper) {
    super(elementRef,
      renderer,
      changeDetectorRef,
      ehrLayoutHelper,
      ehrFormState,
      ehrFormConfig,
      validationResolver,
      scriptApi,
      ehrModelObservable,
      ehrValidationHelper);
  }

  ngOnChanges(sc: SimpleChanges) {
    if (sc.hasOwnProperty('model')) {
      const newModel: NodeModel = sc.model.currentValue;
      if (newModel) {
        const annotationValue = newModel.getAnnotationValue('dateInRange');
        this.dateWithinRangeDays = this.dateValidationUtil.toDaysRange(annotationValue);
      }
    }
    super.ngOnChanges(sc);
  }

  ngOnInit() {
    super.ngOnInit();
    this.ehrFormState.getFormContext().pipe(takeUntil(this.onDestroySubj)).subscribe((ctx: EhrContext) => {
      this.clearButtonHide = ctx.dateClearButtonHide;
      this.blurDateParserFn = ctx.blurDateParserFn;
      this.displayDateInputMask = ctx.displayDateInputMask;
    });
  }

  getModelValuesArrObs(forModel: NodeModel): Observable<any> {
    // Set default values
    (forModel as DateFieldModel).dateValue(undefined, 0);
    return super.getModelValuesArrObs(forModel).map(v => v.map((v1: any) => {
      const mrdDateTimeValue = v1 ? this.dateValidationUtil.toMrdObjectDateValue(v1) : '';
      return mrdDateTimeValue;
    }));
  }

  protected get modelGetterSetterMethodName(): string {
    return 'dateValue';
  };

  protected get modelEmptyValue(): any {
    return '';
  };

  updateModel(val: MrdDateTimeValue, index: number): void {

    if (this.isEmptyValue(val)) {
      val = this.modelEmptyValue;
    }
    let newModelValue = this.dateValidationUtil.toModelValue(val, this.modelEmptyValue);
    if (this.model[this.modelGetterSetterMethodName](undefined, index) != newModelValue) {
      //console.log("MODEL UPDATEEEEE=", val, " index=", index, "
      // current=",this.model[this.modelGetterSetterMethodName](undefined, index), this.model.getValue(undefined,
      // undefined));
      this.model[this.modelGetterSetterMethodName](newModelValue, index);
    }
  }


  collectModelValidators(model: NodeModel): any[] {
    let validators: any[] = super.collectModelValidators(this.model);
    this.dateValidationUtil.getDateRangeValidators(this.dateWithinRangeDays).forEach((vf: Function) => {
      validators.push(vf);
    });
    return validators;
  }

  private isEmptyValue(val: MrdDateTimeValue): boolean {
    if (!val) {
      return false;
    }
    let validKeyNames: string[] = ['year', 'month', 'day'];
    return !Object.keys(val).find((keyName) => {
      return validKeyNames.indexOf(keyName) >= 0 && val[keyName] != null;
    });
  }
}

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
import {MrdDateTimeValue, MrdTimePlaceholderFormat, ValidateOptions} from 'mrd-ui-components';
import {DateTimeFieldModel} from '../../ehr-form-model/thinkehr-f4-model-ts/model/fieldModel/DateTimeFieldModel';
import {NodeModel} from '../../ehr-form-model/thinkehr-f4-model-ts/model/NodeModel';
import {EhrModelObservable} from '../../ehr-form-model/ehr-model-observable';
import {Field} from '../../ehr-form-model/thinkehr-f4-model-ts/view/Field';
import {EhrContext} from '../../ehr-form-model/thinkehr-f4-model-ts/EhrContext';
import {Observable} from 'rxjs/Observable';
import {FORM_SCRIPT_API} from '../ehr-form/FormScriptApiProvider';
import {FormScriptApi} from '../ehr-form/FormScriptApi';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {DaysValidationUtils} from '../utils/validation/DaysValidationUtils';
import {takeUntil} from "rxjs/operators";
import {EhrValidationHelper} from "mrd-ui-components";

@Component({
  selector: 'ehr-date-time',
  templateUrl: './ehr-date-time.component.html',
  styleUrls: ['./ehr-date-time.component.scss']
})
export class EhrDateTimeComponent extends AbstractEhrComponent implements OnInit, OnChanges {

  @Input()
  model: DateTimeFieldModel;

  @Input()
  ehrFormGroup: FormGroup;

  @Input()
  validateFormEvent: EventEmitter<ValidateOptions>;

  displayDateInputMask = false;

  /* Custom timepicker placeholders from EhrContext*/
  timePlaceholder: MrdTimePlaceholderFormat;

  private hideTime: boolean;
  private hideDate: boolean;

  private clearButtonHide: boolean;

  private isoZuluTime = false;
  private blurDateParserFn: (inputValue: string, currDateValue: NgbDateStruct | string) => NgbDateStruct;

  private dateWithinRangeDays: string[];

  constructor(elementRef: ElementRef,
              renderer: Renderer2,
              changeDetectorRef: ChangeDetectorRef,
              EhrLayoutHelper: EhrLayoutHelper,
              ehrFormState: EhrFormState,
              ehrFormConfig: EhrFormConfig,
              validationResolver: EhrValidationMessageResolver,
              @Inject(FORM_SCRIPT_API) public scriptApi: FormScriptApi,
              ehrModelObservable: EhrModelObservable, private dateValidationUtil:DaysValidationUtils, public ehrValidationHelper: EhrValidationHelper) {
    super(elementRef,
      renderer,
      changeDetectorRef,
      EhrLayoutHelper,
      ehrFormState,
      ehrFormConfig,
      validationResolver,
      scriptApi,
      ehrModelObservable,
      ehrValidationHelper);
  }

  ngOnInit() {
    super.ngOnInit();
    this.ehrFormState.getFormContext().pipe(takeUntil(this.onDestroySubj)).subscribe((ctx: EhrContext) => {
      this.clearButtonHide = ctx.dateClearButtonHide;
      this.isoZuluTime = ctx.isoZuluTime;
      this.blurDateParserFn = ctx.blurDateParserFn;
      this.displayDateInputMask = ctx.displayDateInputMask;
      this.timePlaceholder = ctx.timePlaceholder;
    });
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
    if (sc.hasOwnProperty('model')) {
      let field: Field = sc.model.currentValue.getViewConfig().getFields();
      if (field) {
        this.hideDate = field.hideDate;
        this.hideTime = field.hideTime;
      }
    }
  }

  getModelValuesArrObs(forModel: NodeModel): Observable<any> {
    //set default values
    (forModel as DateTimeFieldModel).dateTimeValue(undefined, 0);
    return super.getModelValuesArrObs(forModel).map(v => v.map((v1: any) => {
      let mrdTimeDateTimeValue = v1 ? this.toMrdObjectDateTimeValue(v1) : '';
      return mrdTimeDateTimeValue;
    }));
  }

  protected get modelGetterSetterMethodName(): string {
    return 'dateTimeValue';
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
      this.model[this.modelGetterSetterMethodName](newModelValue, index);
    }
  }

  private toModelValue(mrdDateTimeObj: MrdDateTimeValue): string {
    if (mrdDateTimeObj) {
      let year = mrdDateTimeObj.year ? mrdDateTimeObj.year : 0;
      let month = mrdDateTimeObj.month ? mrdDateTimeObj.month : 0;
      let day = mrdDateTimeObj.day ? mrdDateTimeObj.day : 0;
      if (!this.hideDate && (!year || !month || !day)) {
        let now = new Date();
        year = year ? year : now.getFullYear();
        month = month ? month : now.getMonth() + 1;
        day = day ? day : now.getDate();
      }

      let hour = mrdDateTimeObj.hour ? mrdDateTimeObj.hour : 0;
      let minute = mrdDateTimeObj.minute ? mrdDateTimeObj.minute : 0;
      if (this.hideDate) {
        let hStr = this.padZero(hour.toString(10));
        let mStr = this.padZero(minute.toString(10));
        return hStr + ':' + mStr;
      }
      if (this.hideTime) {
        return year + '-' + this.padZero(month.toString(10)) + '-' + this.padZero(day.toString(10));
      }
      let dateString = year + '-' + this.padZero(month.toString(10)) + '-' + this.padZero(day.toString(10)) + 'T' +
        this.padZero(hour.toString(10)) + ':' + this.padZero(minute.toString(10));
      let res: string;
      if (this.isoZuluTime) {
        try {
          res = (new Date(dateString)).toISOString();
        } catch (e) {
          throw new Error('Can not parse date EhrDateTimeComponent.toModelValue param=' + mrdDateTimeObj +
            ' parsing date string=' + dateString + ' err=' + e);
        }
      } else {
        try {
          let dateVal = new Date(dateString);
          let toIsoOffset = function (date: Date) {
            let tzo = -date.getTimezoneOffset(),
              dif = tzo >= 0 ? '+' : '-',
              pad = function (num) {
                let norm = Math.floor(Math.abs(num));
                return (norm < 10 ? '0' : '') + norm;
              };
            return date.getFullYear() +
              '-' + pad(date.getMonth() + 1) +
              '-' + pad(date.getDate()) +
              'T' + pad(date.getHours()) +
              ':' + pad(date.getMinutes()) +
              ':' + pad(date.getSeconds()) +
              dif + pad(tzo / 60) +
              ':' + pad(tzo % 60);
          };
          res = toIsoOffset(dateVal);
        } catch (e) {
          throw new Error('Can not parse date EhrDateTimeComponent.toModelValue param=' + mrdDateTimeObj +
            ' parsing date string=' + dateString + ' err=' + e);
        }
      }

      return res;
    }
    return mrdDateTimeObj.toString();
  }

  private padZero(numStr: string) {
    if (numStr.length < 2) {
      return '0' + numStr;
    }
    return numStr;
  }

  private toMrdObjectDateTimeValue(dateTime: any): MrdDateTimeValue {
    let hour = null;
    let minute = null;
    let second = null;
    let year = null;
    let month = null;
    let day = null;
    let isString: boolean = typeof dateTime == 'string';
    let timeSplit: string[];
    let dateSplit: string[];
    if (isString) {
      timeSplit = dateTime.split(':');
      dateSplit = dateTime.split('-');
    }

    if (dateTime && dateTime instanceof Date || (isString && dateSplit.length > 1 && timeSplit.length > 1)) {
      let parsedDate;
      try {
        parsedDate = new Date(dateTime);
      } catch (e) {
        throw new Error('Can not parse date EhrDateTimeComponent.toMrdObjectDateTimeValue param=' + dateTime +
          ' parsing date string=' + dateTime + ' err=' + e);
      }
      year = parsedDate.getFullYear();
      month = parsedDate.getMonth() + 1;
      day = parsedDate.getDate();
      hour = parsedDate.getHours();
      minute = parsedDate.getMinutes();
      second = parsedDate.getSeconds();
    } else if (isString) {
      if (timeSplit.length > 1) {
        hour = timeSplit[0] != null ? parseInt(timeSplit[0]) : 0;
        minute = timeSplit[1] != null ? parseInt(timeSplit[1]) : 0;
        second = timeSplit[2] != null ? parseInt(timeSplit[2]) : 0;
      } else if (dateSplit.length > 1) {
        year = dateSplit[0] != null ? parseInt(dateSplit[0]) : 0;
        month = dateSplit[1] != null ? parseInt(dateSplit[1]) : 0;
        day = dateSplit[2] != null ? parseInt(dateSplit[2]) : 0;
      }
    }
    return {year: year, month: month, day: day, hour: hour, minute: minute, second: second};
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
    let validKeyNames: string[] = ['year', 'month', 'day', 'hour', 'minute', 'second'];
    return !Object.keys(val).find((keyName) => {
      return validKeyNames.indexOf(keyName) >= 0 && val[keyName] != null && val[keyName] != 0;
    });
  }
}

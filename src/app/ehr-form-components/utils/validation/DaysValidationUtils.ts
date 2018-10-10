import {MrdDateTimeValue, MrdValidators} from 'mrd-ui-components';
import {Injectable} from '@angular/core';
import {NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class DaysValidationUtils {

  constructor(private dateParser: NgbDateParserFormatter) {
  }

  toDaysRange(annotationValue: string): string[] {
    if (annotationValue != null) {
      let annValArr = annotationValue.split(',');
      return annValArr.slice(0, 2);
    }
    return [];
  }

  getDateRangeValidators(daysRange: string[]): Function[] {
    if (daysRange && daysRange.length) {
      return daysRange.reduce((state, dateAfterVal: string) => {
        let afterVal: number;
        if (dateAfterVal != '-0') {
          afterVal = parseInt(dateAfterVal, 10);
        }
        if (afterVal < 0 || afterVal == null) {
          let daysVal = afterVal == null ? 0 : afterVal;
          // date must be after number of days in past
          state.push(MrdValidators.dateAfter((ctrlValue): Date => {
            const modelValue = this.toModelValue(ctrlValue.value.value, null);
            return modelValue ? new Date(modelValue) : null;
          }, daysVal, null, (date: Date) => {
            return this.dateParser.format(this.toMrdObjectDateValue(date.toISOString()) as NgbDateStruct);
          }));
        }

        if (afterVal != null && afterVal >= 0) {
          // date must be before number of days in the future
          state.push(MrdValidators.dateBefore((ctrlValue): Date => {
              const modelValue = this.toModelValue(ctrlValue.value.value, null);
              return modelValue ? new Date(modelValue) : null;
          }, afterVal, null, (date: Date) => {
            return this.dateParser.format(this.toMrdObjectDateValue(date.toISOString()) as NgbDateStruct);
          }));
        }
        return state;
      }, []);
    }
    return [];
  }

  hasAnyPropValue(obj: any): boolean {
    return !!Object.getOwnPropertyNames(obj).find((propN: string) => {
      return obj[propN] != null && obj[propN] != '';
    });
  }

  toModelValue(mrdDateTimeObj: MrdDateTimeValue, emptyValue: string): string {
    if (mrdDateTimeObj) {
      if (!this.hasAnyPropValue(mrdDateTimeObj)) {
        return emptyValue;
      }
      return this.addLeadingZero(mrdDateTimeObj.year)
        + '-' + this.addLeadingZero(mrdDateTimeObj.month)
        + '-' + this.addLeadingZero(mrdDateTimeObj.day);
    }
    return mrdDateTimeObj ? mrdDateTimeObj.toString() : '';
  }

  toMrdObjectDateValue(date: string): MrdDateTimeValue {
    let dateSplit = date.split('-');
    let year = parseInt(dateSplit[0]);
    let month = parseInt(dateSplit[1]);
    let day = parseInt(dateSplit[2]);
    if (isNaN(year)) {
      year = null;
    }
    if (isNaN(month)) {
      month = null;
    }
    if (isNaN(day)) {
      day = null;
    }
    return {year: year, month: month, day: day};
  }

  private addLeadingZero(number: number): string {
    const num = number.toString();
    return num.length < 2 ? '0' + num : num;
  }
}

import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import * as moment from 'moment';
import {LongDateFormatKey} from 'moment';
import {MrdDateDisplayFormat} from "mrd-ui-components";
import {NgbMrdMomentDateParserFormatter} from "mrd-ui-components";

export class EhrMomentDateParserFormatter extends NgbMrdMomentDateParserFormatter {

  set locale(localeName: string) {
    if (localeName) {
      this.momentInstance.locale(localeName);
    }
  }

  set displayFormat(displayFormat: MrdDateDisplayFormat) {
    if (displayFormat) {
      this._displayFormat = displayFormat;
    }
  }

  getDateFormatString(): string {
    return this.momentInstance.localeData().longDateFormat(this._displayFormat.toString() as LongDateFormatKey);
  }

  private padNr(num, size) {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }

  parse(value: string): NgbDateStruct {
    let ds: NgbDateStruct = null;
    let dashFormat: boolean;
    if (value) {
      let dateFormatStr = this.getDateFormatString();
      let valCommaSplit = value.split(',');

      if (value.indexOf(',')>-1 && dateFormatStr.split('.').length == 3 && valCommaSplit.length == 3) {
        value = valCommaSplit.join('.')
      }
      let dotSplit = value.split('.');
      if(dotSplit.length==3 && dotSplit[0].length&& dotSplit[1].length&& dotSplit[2].length) {
        if (dotSplit[0].length==1) {
          dotSplit[0]=this.padNr(dotSplit[0],2)
        }
        if (dotSplit[1].length==1) {
          dotSplit[1]=this.padNr(dotSplit[1],2)
        }
        if(dotSplit[2].length==2) {
          let yearNr = parseInt(dotSplit[2], 10);
          if(!isNaN(yearNr)) {
            dotSplit[2] = '20' + this.padNr(yearNr.toString(10), 2);
          }
        }
        value = dotSplit.join('.');
      }

      let momVal = moment(value, dateFormatStr, this.momentInstance.locale(), true);
      if (momVal.isValid()) {
        ds = {year: momVal.year(), day: momVal.date(), month: momVal.month() + 1};
      }

      if (!ds) {
        let valSplit: string[] = value.split('-');
        dashFormat = valSplit.length == 3 && !!valSplit[2];
        let intVal: number = /^\d+$/.test(value) ? parseInt(value) : NaN;
        if (!isNaN(intVal) && intVal.toString(10).length > 4 && value.indexOf('-') < 0) {
          let date: Date = new Date(intVal);
          ds = {year: date.getFullYear(), day: date.getDate(), month: date.getMonth() + 1};
        }
      }

    }

    if (!ds && dashFormat) {
      ds = super.parse(value);
    }
    return ds;
  }

  format(date: NgbDateStruct): string {
    if (date && this._displayFormat) {
      this.momentInstance.year(date.year);
      this.momentInstance.month(date.month - 1);
      this.momentInstance.date(date.day);
      this.momentInstance.hour(0);
      this.momentInstance.minute(0);
      return this.momentInstance.format(this._displayFormat.toString());
    }
    return super.format(date);
  }

}

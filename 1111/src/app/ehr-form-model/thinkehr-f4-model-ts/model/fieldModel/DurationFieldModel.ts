import {DirectValueModel} from '../DirectValueModel';
import {ThinkEhrUtil} from '../../ThinkEhrUtil';
import {RmType} from '../../RmType';
import {Validation} from '../../Validation';
import {PeriodISO8601Parser} from '../../parsing/PeriodISO8601Parser';
import {ModelViewConfigParser} from "../../parsing/ViewConfigParser";
/**
 * Created by matjazhi on 31.5.2016.
 */

export class DurationFieldModel extends DirectValueModel {

  private periodsMultiArray: any[];
  private _columns: number;

  static mapPeriodStringValueToObject(durationStringValue: string, filterKeyNames: string[]): any {
    let retKeyVals: any = {};
    let parsedArr: number[] = PeriodISO8601Parser.parse(durationStringValue);
    parsedArr.forEach((perValue: number, index: number) => {
      let fName: string = DurationFieldModel.getFieldName(index);
      if (!filterKeyNames || filterKeyNames.some(kn => kn == fName)) {
        retKeyVals[fName] = perValue ? perValue : null;
      }
    });
    return retKeyVals;
  }

  static getFieldName(index: number) {
    return DurationFieldModel.fieldNames[index];
  }

  private static fieldNames = ['year', 'month', 'week', 'day', 'hour', 'minute', 'second'];

  constructor(fromObj?: Object, viewConfigParser?: ModelViewConfigParser) {
    super(fromObj, viewConfigParser);
    this.periodsMultiArray = [[null, null, null, null, null, null, null]];
    let self: DurationFieldModel = this;
    setTimeout(function () {
      let valsArr = self._getValuesArray();
      if (valsArr) {
        if (!ThinkEhrUtil.isArray(valsArr)) {
          throw new Error('_getValuesArray must return array');
        }
        let multiValsArr = valsArr.map(function (valStr) {
          return PeriodISO8601Parser.parse(valStr);
        });
        self._syncPeriodArray(multiValsArr);
      }
    }, 0);
  }

  durationValue(value?: any, multiIndex?: number) {
    if (multiIndex === null) {
      multiIndex = 0;
    }
    let prevVal = this.getValue(undefined, multiIndex);
    let strVal = this.valueGetterSetter.apply(this, arguments);

    if (arguments.length > 0 || strVal !== prevVal) {

      let multiValsArr = this.valueGetterSetter(undefined, undefined).map(function (valStr) {
        return PeriodISO8601Parser.parse(valStr);
      });
      this._syncPeriodArray(multiValsArr);
    }
    return strVal;
  }

  _syncPeriodArray(paNewMultiArr) {

    let setValuesOnMultiArray = function (srcArr, targetArr) {
      srcArr.forEach(function (p, i) {
        let pVal = targetArr[i];
        if (!(pVal === null && p === 0)) {
          targetArr[i] = p === 0 ? null : p;
        }
      });
    };

    if (paNewMultiArr && ThinkEhrUtil.isArray(paNewMultiArr) && paNewMultiArr.length && !ThinkEhrUtil.isArray(paNewMultiArr[0])) {
      throw new Error('paMulti is not multi array');
    }

    let tpaMulti = this.periodsMultiArray;
    if (paNewMultiArr.length < 1) {
      paNewMultiArr = [[null, null, null, null, null, null, null]];
    }
    let newMultiLocalArr = ThinkEhrUtil.deepClone(paNewMultiArr);

    for (let mInd = tpaMulti.length - 1; mInd > -1; mInd--) {
      let newMultiLocalDur = newMultiLocalArr.splice(mInd, 1)[0];
      let multiArrDur = tpaMulti[mInd];
      if (newMultiLocalDur) {
        setValuesOnMultiArray(newMultiLocalDur, multiArrDur);
      } else {
        tpaMulti.splice(mInd, 1);
      }
    }
    if (newMultiLocalArr.length) {
      for (let j = 0; j < newMultiLocalArr.length; j++) {
        let newMultiLocDur = newMultiLocalArr[j];
        let multiDurArr = [];
        tpaMulti.push(multiDurArr);
        setValuesOnMultiArray(newMultiLocDur, multiDurArr);
      }
    }
  }

  _durationArrayValue(multiIndex: number, index: number, value: any) {
    let v;
    multiIndex = multiIndex != null ? multiIndex : 0;
    if (arguments.length <= 2) {
      v = this.periodsMultiArray[multiIndex] ? this.periodsMultiArray[multiIndex][index] : null;
    } else {
      if (ThinkEhrUtil.isInteger(value)) {
        v = value;
      } else if (ThinkEhrUtil.isString(value)) {
        v = parseInt(value, 10);
      } else if (value === undefined) {
        value = null;
      } else {
        v = value;
      }

      let potentialArray = ThinkEhrUtil.deepClone(this.periodsMultiArray);
      potentialArray[multiIndex][index] = v;
      let potentialStrVal = PeriodISO8601Parser.periodToString(potentialArray[multiIndex]);

      if (PeriodISO8601Parser.isValid(potentialStrVal)) {
        this.periodsMultiArray[multiIndex][index] = v;
        if (potentialStrVal === null) {
          potentialStrVal = '';
        }
        this.valueGetterSetter(potentialStrVal, multiIndex);
      } else {
        throw new Error('Invalid duration period: \'' + v + '\'');
      }
    }

    return v;
  }

  yearsValue(value?: any, multiIndex?: number) {
    let args = [multiIndex, 0];
    if (arguments.length && value !== undefined) {
      args.push(value);
    }
    return this._durationArrayValue.apply(this, args);
  }

  monthsValue(value?: any, multiIndex?: number) {
    let args = [multiIndex, 1];
    if (arguments.length && value !== undefined) {
      args.push(value);
    }
    return this._durationArrayValue.apply(this, args);
  }

  weeksValue(value?: any, multiIndex?: number) {
    let args = [multiIndex, 2];
    if (arguments.length && value !== undefined) {
      args.push(value);
    }
    return this._durationArrayValue.apply(this, args);
  }

  daysValue(value?: any, multiIndex?: number) {
    let args = [multiIndex, 3];
    if (arguments.length && value !== undefined) {
      args.push(value);
    }
    return this._durationArrayValue.apply(this, args);
  }

  hoursValue(value?: any, multiIndex?: number) {
    let args = [multiIndex, 4];
    if (arguments.length && value !== undefined) {
      args.push(value);
    }
    return this._durationArrayValue.apply(this, args);
  }

  minutesValue(value?: any, multiIndex?: number) {
    let args = [multiIndex, 5];
    if (arguments.length && value !== undefined) {
      args.push(value);
    }
    return this._durationArrayValue.apply(this, args);
  }

  secondsValue(value?: any, multiIndex?: number) {
    let args = [multiIndex, 6];
    if (arguments.length && value !== undefined) {
      args.push(value);
    }
    return this._durationArrayValue.apply(this, args);
  }

  /*
   * @Override
   */
  defaultValue() {
    let dvf = this.defaultValueFor;
    let t = this;
    let dva = [dvf.call(t, 'year'), dvf.call(t, 'month'), dvf.call(t, 'week'), dvf.call(t, 'day'), dvf.call(t, 'hour'),
      dvf.call(t, 'minute'), dvf.call(t, 'second')];

    return PeriodISO8601Parser.periodToString(dva);
  }

  defaultValueFor(suffix: string) {
    let input = this.getInputFor(suffix);
    if (input) {
      let dv = input.getDefaultValue();
      if (dv !== undefined && dv !== null) {
        return dv;
      }
    }
    return null;
  }

  /*
   * @Override
   */
  setValue(value?: any) {
    super.setValue(value);
    let newMultiArr;
    if (value === null) {
      newMultiArr = [[null, null, null, null, null, null, null]];
    } else if (ThinkEhrUtil.isString(value)) {
      newMultiArr = [PeriodISO8601Parser.parse(value)];
    } else if (ThinkEhrUtil.isArray(value)) {
      newMultiArr = this.getValue().map(function (valStr) {
        return PeriodISO8601Parser.parse(valStr);
      });
    }
    this._setIsDefaultValue(false);
    if (newMultiArr) {
      this._syncPeriodArray(newMultiArr);
    }
  }

  /*
   * @Override
   */
  getRmType() {
    return RmType.DV_DURATION;
  }

  /*
   * @Override
   */
  resetValue() {
    this.setValue(this.defaultValue());
    this._setIsDefaultValue(true);
  }

  /*
   * @Override
   */
  applyValue(value: any, valueType: string, multiIndex?: number) {
    if (!this._applyValueFromObject(value)) {
      let args = [].splice.call(arguments, 0);
      args.splice(1, 1);
      args[1] = this._getDefaultMultiIndex(args[1]);
      //TODO use fieldValue method
      switch (valueType) {
        case 'year':
          this.yearsValue.apply(this, args); // value, multiIndex);
          break;
        case 'month':
          this.monthsValue.apply(this, args);
          break;
        case 'week':
          this.weeksValue.apply(this, args);
          break;
        case 'day':
          this.daysValue.apply(this, args);
          break;
        case 'hour':
          this.hoursValue.apply(this, args);
          break;
        case 'minute':
          this.minutesValue.apply(this, args);
          break;
        case 'second':
          this.secondsValue.apply(this, args);
          break;
        default:
          console.warn('Setting non-existent value type (' + valueType + ') with value=' + value + ' on RM type (' + this.toString() + ')');
          break;
      }
    }
  }

  clearValue() {
    super.clearValue();
    this.periodsMultiArray = [[null, null, null, null, null, null, null]];
    this._setIsDefaultValue(false);
  }

  clearDurationValue() {
    this.clearValue();
  }

  columns(columns?: number) {
    if (columns === undefined) {
      if (this._columns === undefined) {
        let maxCols = this.getInputs().length;
        let f = this.getViewConfig().getFields();
        let c = f && f.columns ? parseInt(f.columns.toString(), 10) : maxCols;
        this._columns = c <= maxCols ? c : maxCols;
      }
    } else {
      this._columns = columns;
    }

    return this._columns;
  }

  isFieldDisabled(suffix) {
    let f = this.getViewConfig().getFields(suffix);
    return f && f['disabled'] === true;
  }

  isFieldHidden(suffix) {
    let f = this.getViewConfig().getFields(suffix);
    return f && f['hidden'] === true;
  }

  isFieldRequired(multiIndex) {
    return this.isRequired() && !this.durationValue(undefined, multiIndex);
  }

  getFieldName(index) {
    return DurationFieldModel.getFieldName(index);
  }

  getFieldInputNames() {
    return this.getFieldNames().filter((fName: string) => {
      return !!this.getInputFor(fName);
    });
  }

  getFieldNames() {
    return DurationFieldModel.fieldNames;
  }

  fieldValue(suffix: string, value?: number, multiIndex?: number):number {
    let res: number;
      let args = [value, multiIndex];
      switch (suffix) {
        case 'year':
          res = this.yearsValue.apply(this, args);
          break;
        case 'month':
          res = this.monthsValue.apply(this, args);
          break;
        case 'week':
          res = this.weeksValue.apply(this, args);
          break;
        case 'day':
          res = this.daysValue.apply(this, args);
          break;
        case 'hour':
          res = this.hoursValue.apply(this, args);
          break;
        case 'minute':
          res = this.minutesValue.apply(this, args);
          break;
        case 'second':
          res = this.secondsValue.apply(this, args);
          break;
        default:
          throw new Error('Setting non-existent value type (' + suffix + ') with value=' + value + ' on RM type (' + this.toString() + ')');

      }
    return res;
  }

  _getValidation(suffix) {
    let input = this.getInputFor(suffix);
    return input ? input.getValidation() : null;
  }

  _getRange(suffix) {
    let vd: Validation = this._getValidation(suffix);
    return vd && vd['range'] ? vd['range'] : null;
  }

  minValueFor(suffix) {
    let range = this._getRange(suffix);
    return range && range.min ? range.min : null;
  }

  minOperatorFor(suffix) {
    let range = this._getRange(suffix);
    return range && range.minOp ? range.minOp : null;
  }

  maxValueFor(suffix) {
    let range = this._getRange(suffix);
    return range && range.max ? range.max : null;
  }

  maxOperatorFor(suffix) {
    let range = this._getRange(suffix);
    return range && range.maxOp ? range.maxOp : null;
  }

  hasValidation() {
    if (this.isRequired()) {
      return true;
    }

    let inputs = this.getInputs();
    for (let i = 0; i < inputs.length; i++) {
      let v: Validation = inputs[i].getValidation();
      if (v && v['range'] && (v['range']['min'] !== undefined || v['range']['max'] !== undefined)) {
        return true;
      }
    }

    return false;
  }

  /*
   * @Override
   */
  toString() {
    return 'DurationFieldModel/' + this.getName() + '/' + RmType[this.getRmType()];
  }
}

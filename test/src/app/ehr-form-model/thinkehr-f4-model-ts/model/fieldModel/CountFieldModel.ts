import {ThinkEhrUtil} from '../../ThinkEhrUtil';
import {InputType} from '../../view/InputType';
import {RmType} from '../../RmType';
import {DirectValueModel} from '../DirectValueModel';
import {Input} from "../../Input";
import {ModelViewConfigParser} from "../../parsing/ViewConfigParser";
/**
 * Created by matjazhi on 31.5.2016.
 */

export class CountFieldModel extends DirectValueModel {

  constructor(fromObj: Object, viewConfigParser?: ModelViewConfigParser) {
    super(fromObj, viewConfigParser, 'countValue');
  }

  countValue(value?: any, multiIndex?: number) {

    if (value !== undefined) {
      let val = arguments[0]!==null ? parseFloat(arguments[0]): null;
      if (isNaN(arguments[0])) {
        throw new Error('countValue (' + arguments[0] + ') is not number ');
      } else {
        arguments[0] = val;
      }
    }
    return this.valueGetterSetter.apply(this, arguments);
  }

  defaultValue() {
    let dv = this.getDefaultInput().getDefaultValue();
    if (ThinkEhrUtil.isString(dv)) {
      return dv.length > 0 ? parseInt(dv, 10) : null;
    } else if (dv !== null && dv !== undefined) {
      return dv;
    }
    return null;
  }

  getDefaultInput():Input {
    return this.getInputByType(InputType.INTEGER);
  }

  getRmType() {
    return RmType.DV_COUNT;
  }

  resetValue() {
    this.countValue(this.defaultValue(), undefined);
    this._setIsDefaultValue(true);
  }

  applyValue(value, valueType, multiIndex) {
    if (!this._applyValueFromObject(value)) {
      if (valueType == null || valueType === 'value') {
        multiIndex = this._getDefaultMultiIndex(multiIndex);
        this.countValue(value, multiIndex);
      } else {
        console.warn('Setting non-existent value type (' + valueType + ') with value=' + value + ' on RM type (' + this.toString() + ')');
      }
    }
  }

  clearCountValue() {
    this.clearValue();
  }

  toString() {
    return 'CountFieldModel/' + this.getName() + '/' + RmType[this.getRmType()];
  }
}

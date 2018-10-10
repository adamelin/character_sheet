import {ThinkEhrUtil} from '../../ThinkEhrUtil';
import {InputType} from '../../view/InputType';
import {RmType} from '../../RmType';
import {DirectValueModel} from '../DirectValueModel';
import {Input} from "../../Input";
import {ModelViewConfigParser} from "../../parsing/ViewConfigParser";

/**
 * Created by matjazhi on 30.5.2016.
 */

export class DateTimeFieldModel extends DirectValueModel {

  constructor(fromObj: Object, viewConfigParser?: ModelViewConfigParser) {
    super(fromObj, viewConfigParser);
  }

  dateTimeValue(value?: any, multiIndex?: number) {
    if (arguments[0]) {
      arguments[0] = ThinkEhrUtil.toLocalTimezoneOffsetISOString(value);
    }
    return this.valueGetterSetter.apply(this, arguments);
  }

  dateTimeObjectValue(multiIndex) {
    return ThinkEhrUtil.toDate(this.dateTimeValue(undefined, multiIndex));
  }

  /*
   * @Override
   */
  getDefaultInput(): Input {
    return this.getInputByType(InputType.DATETIME);
  }

  /*
   * @Override
   */
  getRmType() {
    return RmType.DV_DATE_TIME;
  }

  /*
   * @Override
   */
  resetValue() {
    this.dateTimeValue(this.defaultValue());
    this._setIsDefaultValue(true);
  }

  /*
   * @Override
   */
  applyValue(value: any, valueType?: string, multiIndex?: number) {
    if (!this._applyValueFromObject(value)) {
      if (valueType == null || valueType === 'value') {
        multiIndex = this._getDefaultMultiIndex(multiIndex);
        this.dateTimeValue(value, multiIndex);
      } else {
        console.warn('Setting non-existent value type (' + valueType + ') with value=' + value + ' on RM type (' + this.toString() + ')');
      }
    }
  }

  clearDateTimeValue() {
    this.clearValue();
  }

  /*
   * @Override
   */
  toString() {
    return 'DateTimeFieldModel/' + this.getName() + '/' + RmType[this.getRmType()];
  }
}

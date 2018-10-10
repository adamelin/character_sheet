import {RmType} from '../../RmType';
import {DirectValueModel} from '../DirectValueModel';
import {ThinkEhrUtil} from '../../ThinkEhrUtil';
import {InputType} from '../../view/InputType';
import {Input} from "../../Input";
import {ModelViewConfigParser} from "../../parsing/ViewConfigParser";
/**
 * Created by matjazhi on 30.5.2016.
 */

export class TimeFieldModel extends DirectValueModel {

  constructor(formDesc: Object, viewConfigParser?: ModelViewConfigParser) {
    super(formDesc, viewConfigParser);
  }

  timeValue(value?: any, multiIndex?: number) {
    return this.valueGetterSetter.apply(this, arguments);
  }

  timeObjectValue(multiIndex?: number) {
    return ThinkEhrUtil.toTime(this.timeValue(undefined, multiIndex));
  }

  /*
   * @Override
   */
  getDefaultInput() :Input{
    return this.getInputByType(InputType.TIME);
  }

  /*
   * @Override
   */
  getRmType() {
    return RmType.DV_TIME;
  }

  /*
   * @Override
   */
  resetValue() {
    this.timeValue(this.defaultValue());
    this._setIsDefaultValue(true);
  }

  /*
   * @Override
   */
  applyValue(value, valueType, multiIndex) {
    if (!this._applyValueFromObject(value)) {
      if (valueType == null || valueType === 'value') {
        multiIndex = this._getDefaultMultiIndex(multiIndex);
        this.timeValue(value, multiIndex);
      } else {
        console.warn('Setting non-existent value type (' + valueType + ') with value=' + value + ' on RM type (' + this.toString() + ')');
      }
    }
  }

  clearTimeValue() {
    this.clearValue();
  }

  toString() {
    return 'TimeFieldModel/' + this.getName() + '/' + RmType[this.getRmType()];
  }
}

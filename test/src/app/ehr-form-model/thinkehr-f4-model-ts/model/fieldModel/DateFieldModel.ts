import {RmType} from '../../RmType';
import {DirectValueModel} from '../DirectValueModel';
import {ThinkEhrUtil} from '../../ThinkEhrUtil';
import {InputType} from '../../view/InputType';
import {Input} from "../../Input";
import {ModelViewConfigParser} from "../../parsing/ViewConfigParser";
/**
 * Created by matjazhi on 30.5.2016.
 */

export class DateFieldModel extends DirectValueModel {

  constructor(fromObj: Object, viewConfigParser?: ModelViewConfigParser) {
    super(fromObj,viewConfigParser, 'dateValue');
  }

  dateValue(value?: any, multiIndex?: number) {
    return this.valueGetterSetter.apply(this, arguments);
  }

  dateObjectValue() {
    return ThinkEhrUtil.toDate(this.dateValue());
  }

  /*
   * @Override
   */
  getDefaultInput():Input {
    return this.getInputByType(InputType.DATE);
  }

  /*
   * @Override
   */
  getRmType() {
    return RmType.DV_DATE;
  }

  /*
   * @Override
   */
  resetValue() {
    this.dateValue(this.defaultValue());
    this._setIsDefaultValue(true);
  }

  /*
   * @Override
   */
  applyValue(value, valueType, multiIndex) {
    if (!this._applyValueFromObject(value)) {
      if (valueType == null || valueType === 'value') {
        multiIndex = this._getDefaultMultiIndex(multiIndex);
        this.dateValue(value, multiIndex);
      } else {
        console.warn('Setting non-existent value type (' + valueType + ') with value=' + value + ' on RM type (' + this.toString() + ')');
      }
    }
  }

  clearDateValue() {
    this.clearValue();
  }

  toString() {
    return 'DateFieldModel/' + this.getName() + '/' + RmType[this.getRmType()];
  }
}

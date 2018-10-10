import {UriFieldModel} from './UriFieldModel';
import {RmType} from '../../RmType';
import {ModelViewConfigParser} from "../../parsing/ViewConfigParser";
/**
 * Created by matjazhi on 31.5.2016.
 */

export class EhrUriFieldModel extends UriFieldModel {

  _ehrUriRegEx: RegExp;

  constructor(fromObj: Object, viewConfigParser?: ModelViewConfigParser) {
    super(fromObj, viewConfigParser, 'ehrUriValue');
    this._ehrUriRegEx = /^ehr:\/\/\S+$/i;
  }

  ehrUriValue(value?: string, multiIndex?: number) {
    return this.valueGetterSetter.apply(this, arguments);
  }

  /*
   * @Override
   */
  getRmType() {
    return RmType.DV_EHR_URI;
  }

  /*
   * @Override
   */
  resetValue() {
    this.ehrUriValue(this.defaultValue());
    this._setIsDefaultValue(true);
  }

  /*
   * @Override
   */
  applyValue(value, valueType, multiIndex) {
    if (!this._applyValueFromObject(value)) {
      if (valueType == null || valueType === 'value') {
        multiIndex = this._getDefaultMultiIndex(multiIndex);
        this.ehrUriValue(value, multiIndex);
      } else {
        console.warn('Setting non-existent value type (' + valueType + ') with value=' + value + ' on RM type (' + this.toString() + ')');
      }
    }
  }

  clearEhrUriValue() {
    this.clearValue();
  }

  getEhrUriPattern() {
    return this._ehrUriRegEx;
  }

  getPatternValidExample() {
    return 'ehr://uri/value';
  }

  /*
   * @Override
   */
  toString() {
    return 'EhrUriFieldModel/' + this.getName() + '/' + RmType[this.getRmType()];
  }
}

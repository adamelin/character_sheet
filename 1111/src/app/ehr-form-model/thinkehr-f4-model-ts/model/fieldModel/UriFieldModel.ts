import {RmType} from '../../RmType';
import {DirectValueModel} from '../DirectValueModel';
import {InputType} from '../../view/InputType';
import {Input} from "../../Input";
import {ModelViewConfigParser} from "../../parsing/ViewConfigParser";
/**
 * Created by matjazhi on 31.5.2016.
 */

export class UriFieldModel extends DirectValueModel {

  constructor(fromObj?: Object, viewConfigParser?: ModelViewConfigParser, valueFuncName = 'uriValue') {
    super(fromObj, viewConfigParser, valueFuncName);
  }

  uriValue(value?: any, multiIndex?: number) {
    return this.valueGetterSetter.apply(this, arguments);
  }

  getDefaultInput():Input {
    return this.getInputByType(InputType.TEXT);
  }

  getRmType() {
    return RmType.DV_URI;
  }

  resetValue() {
    this.uriValue(this.defaultValue());
    this._setIsDefaultValue(true);
  }

  applyValue(value, valueType, multiIndex) {
    if (!this._applyValueFromObject(value)) {
      if (valueType == null || valueType === 'value') {
        multiIndex = this._getDefaultMultiIndex(multiIndex);
        this.uriValue(value, multiIndex);
      } else {
        console.warn('Setting non-existent value type (' + valueType + ') with value=' + value + ' on RM type (' + this.toString() + ')');
      }
    }
  }

  clearUriValue() {
    this.clearValue();
  }

  toString() {
    return 'UriFieldModel/' + this.getName() + '/' + RmType[this.getRmType()];
  }
}

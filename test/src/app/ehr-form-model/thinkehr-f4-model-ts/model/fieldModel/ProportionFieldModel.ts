import {NodeModel} from '../NodeModel';
import {ThinkEhrUtil} from '../../ThinkEhrUtil';
import {RmType} from '../../RmType';
import {ModelViewConfigParser} from "../../parsing/ViewConfigParser";
/**
 * Created by matjazhi on 30.5.2016.
 */

export class ProportionFieldModel extends NodeModel {

  constructor(fromDesc: Object, viewConfigParser?: ModelViewConfigParser) {
    super(fromDesc, viewConfigParser);
  }

  numeratorValue(value?: any, multiIndex?: number, setEmptyValue?: boolean) {
    var val = this.getValue.apply(this, this._getMultiIndexArgs(arguments, '|numerator'));

    if(value===this._MULTI_ARR_PARAM){
      if ((val == null || val.length<1) && this.defaultValueNumerator() && !this._skipDefaultValue) {

        var nv = this.defaultValueNumerator();
        if (nv !== null && nv !== undefined) {

          var defMultiInd = multiIndex != null ? multiIndex : 0;
          var dv = this.defaultValueDenominator();
          if (dv) {
            this.denominatorValue(dv, defMultiInd);
          }

          this.numeratorValue(nv, defMultiInd);
          this._setIsDefaultValue(true);
          return this.getValue.apply(this, this._getMultiIndexArgs(arguments, '|numerator'));
        }

        return null;
      }
    }else{
      this._skipDefaultValue = true;
      this._setIsDefaultValue(false);
      var actualValue = value && ThinkEhrUtil.isString(value) ? parseFloat(value) : value;
      if (!setEmptyValue && ( actualValue === null || value === "" || value === undefined )) {
        this.clearNumeratorValue(multiIndex);
        return null;
      } else {
        this.setValueProp(actualValue, '|numerator', multiIndex);
        var fd=this._getFixedDenominator();
        if( fd!=null ) {
          this.setValueProp(fd, '|denominator', multiIndex);
        }
        return this.getValue.apply(this, this._getMultiIndexArgs(arguments, '|numerator'));
      }
    }

    return this._setFloatValueIfString(val, multiIndex, '|numerator');
  }

  defaultValueNumerator() {
    let dv = this.getInputFor('numerator').getDefaultValue();

    if (ThinkEhrUtil.isString(dv)) {
      return dv.length > 0 ? parseFloat(dv) : null;
    } else if (dv !== null && dv !== undefined) {
      return dv;
    }

    return null;
  }

  denominatorValue(value?: any, multiIndex?: number) {
    var val = this.getValue.apply(this, this._getMultiIndexArgs(arguments, '|denominator'));

    if(value===this._MULTI_ARR_PARAM){
      var defMultiInd = multiIndex != null ? multiIndex : 0;
      if((val == null|| val.length<1) && this.defaultValueDenominator() && !this._skipDefaultValue) {
        var dv = this.defaultValueDenominator();
        if (dv !== null && dv !== undefined) {
          var nv = this.defaultValueNumerator();
          if (nv) {
            this.numeratorValue(nv, defMultiInd);
          }

          this.denominatorValue(dv, defMultiInd);
          this._setIsDefaultValue(true);
          return this.getValue.apply(this, this._getMultiIndexArgs(arguments, '|denominator'));
        }

        return null;
      }
    }else{
      var fd=this._getFixedDenominator();
      if( fd!=null ) {
        value = fd;
      }
      this._skipDefaultValue = true;
      this._setIsDefaultValue(false);
      var actualValue = value && ThinkEhrUtil.isString(value) ? parseFloat(value) : value;
      if ( actualValue === null || value === "" || value === undefined ) {
        this.clearDenominatorValue(multiIndex);
        return null;
      } else {
        this.setValueProp(parseFloat(value), '|denominator', multiIndex);
        return this.getValue.apply(this, this._getMultiIndexArgs(arguments, '|denominator'));
      }
    }

    return this._setFloatValueIfString(val, multiIndex, '|denominator');
  }

  defaultValueDenominator(): number {
    let dv = this.getInputFor('denominator').getDefaultValue();

    if (ThinkEhrUtil.isString(dv)) {
      return dv.length > 0 ? parseFloat(dv) : null;
    } else if (dv !== null && dv !== undefined) {
      return dv;
    } else {
      return this._getFixedDenominator();
    }
  }

  _getFixedDenominator() {
    let minDn: any = this.getMinValueForDenominator();
    let maxDn = this.getMaxValueForDenominator();

    if (maxDn !== null && minDn !== undefined && maxDn !== undefined && minDn === maxDn) {
      let fd = parseFloat(minDn);
      return fd;
    }

    return null;
  }

  _getRangeNumericProperty(validation, property) {
    if (validation && validation.range && validation.range[property] !== undefined) {
      return parseFloat(validation.range[property]);
    }

    return null;
  }

  _getRangeStringProperty(validation, property) {
    if (validation && validation.range && ThinkEhrUtil.isString(validation.range[property])) {
      return validation.range[property];
    }

    return null;
  }

  getMinValueForNumerator() {
    return this._getRangeNumericProperty(this.getInputFor('numerator').getValidation(), 'min');
  }

  getMaxValueForNumerator() {
    return this._getRangeNumericProperty(this.getInputFor('numerator').getValidation(), 'max');
  }

  getMinValueForDenominator() {
    return this._getRangeNumericProperty(this.getInputFor('denominator').getValidation(), 'min');
  }

  getMaxValueForDenominator() {
    return this._getRangeNumericProperty(this.getInputFor('denominator').getValidation(), 'max');
  }

  getMinOperatorForNumerator() {
    return this._getRangeStringProperty(this.getInputFor('numerator').getValidation(), 'minOp');
  }

  getMaxOperatorForNumerator() {
    return this._getRangeStringProperty(this.getInputFor('numerator').getValidation(), 'maxOp');
  }

  getMinOperatorForDenominator() {
    return this._getRangeStringProperty(this.getInputFor('denominator').getValidation(), 'minOp');
  }

  getMaxOperatorForDenominator() {
    return this._getRangeStringProperty(this.getInputFor('denominator').getValidation(), 'maxOp');
  }

  /*
   * @Override
   */
  getRmType() {
    return RmType.DV_PROPORTION;
  }

  /*
   * @Override
   */
  resetValue(multiIndex?: number) {
    if(multiIndex===undefined && this.isMulti()) {
      multiIndex = null;
    }
    this.removeValue(multiIndex);
    var mInd = this._getDefaultMultiIndex(multiIndex);
    this.denominatorValue(this.defaultValueDenominator(),mInd);
    this.numeratorValue(this.defaultValueNumerator(),mInd);
    this._setIsDefaultValue(true);
  }

  /*
   * @Override
   */
  applyValue(value, valueType, multiIndex) {
    if (!this._applyValueFromObject(value)) {
      if (valueType === 'numerator') {
        multiIndex = this._getDefaultMultiIndex(multiIndex);
        this.numeratorValue(value, multiIndex);
      } else if (valueType === 'denominator') {
        multiIndex = this._getDefaultMultiIndex(multiIndex);
        this.denominatorValue(value, multiIndex);
      } else {
        console.warn('Setting non-existent value type (' + valueType + ') with value=' + value + ' on RM type (' + this.toString() + ')');
      }
    }
  }

  clearDenominatorValue(multiIndex?: number) {
    this.clearValueProp('|denominator', multiIndex);
  }

  clearNumeratorValue(multiIndex?: number) {
    this.clearValueProp('|numerator', multiIndex);
  }

  removeValue(multiIndex?: number) {
    this.clearValueProp(this._MULTI_ARR_PARAM, multiIndex);
  }

  clearValue(multiIndex?: number) {
    this.clearNumeratorValue(multiIndex);
    this.clearDenominatorValue(multiIndex);
  }

  /*
   * @Override
   */
  toString() {
    return 'ProportionFieldModel/' + this.getName() + '/' + RmType[this.getRmType()];
  }
}

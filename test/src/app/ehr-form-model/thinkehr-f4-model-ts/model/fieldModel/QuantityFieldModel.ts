import {NodeModel} from '../NodeModel';
import {RmType} from '../../RmType';
import {ThinkEhrUtil} from '../../ThinkEhrUtil';
import {ModelViewConfigParser} from "../../parsing/ViewConfigParser";

/**
 * Created by matjazhi on 26.5.2016.
 */

export class QuantityFieldModel extends NodeModel {

  private _skipDefaultValueMagnitude = false;
  private _skipDefaultValueUnit: boolean[] = [];

  constructor(fromObj?: Object, viewConfigParser?: ModelViewConfigParser) {
    super(fromObj, viewConfigParser);
    this._skipDefaultValueUnit = [];
  }

  _getSkipDefaultValueUnit(multiInd) {
    if (multiInd == null) {
      multiInd = 0;
    }
    return this._skipDefaultValueUnit[multiInd];
  }

  _setSkipDefaultValueUnit(val, multiInd) {
    if (multiInd == null) {
      multiInd = 0;
    }
    this._skipDefaultValueUnit[multiInd] = val;
  }

  magnitudeValue(value?: any, multiIndex?: number, setEmptyValue: boolean = false) {
    var val = this.getValue.apply(this, this._getMultiIndexArgs(arguments, '|magnitude'));

    if (value === this._MULTI_ARR_PARAM) {
      var defMagValue = this._setDefaultMagnitudeValue(val, multiIndex, false);
      if (defMagValue != null) {
        return defMagValue;
      }
    } else {
      this._setIsDefaultValue(false);
      var actualValue = value && ThinkEhrUtil.isString(value) ? parseFloat(value) : value;
      if (!setEmptyValue && (actualValue === null || value === "" || actualValue === undefined)) {
        this.clearMagnitudeValue(multiIndex);
        this._skipDefaultValueMagnitude = true;
        return null;
      } else {
        var currUnitVal = this.getValue.apply(this, this._getMultiIndexArgs(arguments, '|unit'));
        this._setDefaultUnitValue(currUnitVal, multiIndex, true);
        this._skipDefaultValueMagnitude = true;
        this.setValueProp(actualValue, '|magnitude', multiIndex);
        // adding default unit value when array of values are passed and new objects in values array don't have '|unit' property
        const newVals = this._getValuesArray();
        if (multiIndex === undefined && !!this.defaultValueUnit() && newVals && newVals.length) {
          newVals.forEach((nVal, ind) => {
            if (!nVal.hasOwnProperty('|unit')) {
              this.setValueProp(this.defaultValueUnit(), '|unit', ind);
            }
          });
        }
        return this.getValue.apply(this, this._getMultiIndexArgs(arguments, '|magnitude'));
      }
    }
    return this._setFloatValueIfString(val, multiIndex, '|magnitude');
  }

  defaultValueMagnitude(): any {
    var dv = this.getMultiContainerDefaultValue();
    if (dv != null) {
      dv = this._getPropertyValueFromMultiDefaultString(dv, 'magnitude', false);
      if (dv) {
        this.getInputFor("magnitude").setDefaultValue(dv);
      }
    }
    if (dv == null) {
      dv = this.getInputFor("magnitude").getDefaultValue();
    }

    if (ThinkEhrUtil.isString(dv)) {
      return dv.length > 0 ? parseFloat(dv) : null;
    } else if (dv !== null && dv !== undefined) {
      return dv;
    }

    return null;
  }

  _setDefaultMagnitudeValue(currValue, multiIndex, skipDefaultUnitValue) {
    if ((currValue == null || currValue.length < 1) && !this._skipDefaultValueMagnitude) {
      var mv = this.defaultValueMagnitude();
      if (mv !== null && mv !== undefined) {
        this._skipDefaultValueMagnitude = true;
        var defMultiInd = multiIndex != null ? multiIndex : 0;
        if (!this.isMulti()) {
          arguments[1] = defMultiInd;
        }
        if (!skipDefaultUnitValue) {
          var uv = this.defaultValueUnit();
          if (uv) {
            this.unitValue(uv, defMultiInd);
          }
        }

        this.magnitudeValue(mv, defMultiInd);
        this._setIsDefaultValue(true);
        return this.getValue.apply(this, this._getMultiIndexArgs(arguments, '|magnitude'));
      }
    }
    return null;
  }

  unitValue(value?: string, multiIndex?: number, setEmptyValue: boolean = false) {
    var val = this.getValue.apply(this, this._getMultiIndexArgs(arguments, '|unit'));

    if (value === this._MULTI_ARR_PARAM) {
      //var defUnitValue=this._setDefaultUnitValue(val, multiIndex);
      var defUnitValue = this._setDefaultUnitValue(val, multiIndex, true);
      if (defUnitValue != null) {
        return defUnitValue;
      }

    } else {
      this._setIsDefaultValue(false);
      if (!setEmptyValue && (value === null || value === "" || value === undefined)) {
        this.clearUnitValue(multiIndex);
        this._setSkipDefaultValueUnit(true, multiIndex);
        return null;
      } else {
        var currMagVal = this.getValue.apply(this, this._getMultiIndexArgs(arguments, '|magnitude'));
        this.setValueProp(value, '|unit', multiIndex);
        this._setDefaultMagnitudeValue(currMagVal, multiIndex, true);
        this._setSkipDefaultValueUnit(true, multiIndex);
        return this.getValue.apply(this, this._getMultiIndexArgs(arguments, '|unit'));
      }

    }
    return val;
  }

  _setDefaultUnitValue(val: string, multiIndex: number, skipDefaultMagnitudeValue: boolean = false) {
    if ((val == null || val.length < 1) && !this._getSkipDefaultValueUnit(multiIndex)) {
      var uv = this.defaultValueUnit();
      if (uv !== null && uv !== undefined) {
        this._setSkipDefaultValueUnit(true, multiIndex);
        var defMultiInd = multiIndex != null ? multiIndex : 0;
        this.unitValue(uv, defMultiInd);
        this._setIsDefaultValue(true);
        if (!skipDefaultMagnitudeValue) {
          var mv = this.defaultValueMagnitude();
          if (mv) {
            this.magnitudeValue(mv, defMultiInd);
            this._setIsDefaultValue(true);
          }
        }

        return this.getValue.apply(this, this._getMultiIndexArgs(arguments, '|unit'));
      }
    }
    return null;
  }

  defaultValueUnit() {
    var dv = this.getMultiContainerDefaultValue();
    if (dv != null) {
      dv = this._getPropertyValueFromMultiDefaultString(dv, 'unit', true);
      if (dv) {
        this.getInputFor("unit").setDefaultValue(dv);
      }
    }
    if (dv == null) {
      dv = this.getInputFor("unit").getDefaultValue();
    }

    if (!dv && this.getInputFor("unit").getList().length === 1) {
      dv = this.getInputFor("unit").getList()[0].value;
    }

    return ThinkEhrUtil.isString(dv) && dv.length > 0 ? dv : null;
  }

  _getValidationPropertyForUnit(unit, functionProperty) {
    let u = unit !== undefined ? unit : this.unitValue();
    if (u == null) {
      console.warn('Unit parameter must be passed in!');
      return null;
    }

    let isInt = ThinkEhrUtil.isInteger(unit);
    let l = this.getInputFor('unit').getList();
    for (let i = 0; i < l.length; i++) {
      let item = l[i];
      if ((isInt && u === i) || item.getValue() === u) {
        if (item.getValidation() && item.getValidation()[functionProperty] !== undefined) {
          if (ThinkEhrUtil.isFunction(item.getValidation()[functionProperty])) {
            return item.getValidation()[functionProperty].call(item.getValidation());
          } else {
            return item.getValidation()[functionProperty];
          }
        }

        return null;

      }
    }

    return null;
  }

  getPrecisionForUnit(unit) {
    if (unit == null) {
      throw new Error('getPrecisionForUnit() - unit parameter is required!');
    }
    return this._getValidationPropertyForUnit(unit, 'getPrecision');
  }

  getRangeForUnit(unit) {
    return this._getValidationPropertyForUnit(unit, 'range');
  }

  getMinValueForUnit(unit) {
    let range = this.getRangeForUnit(unit);
    if (range && range.min !== undefined) {
      let rangeMin = parseFloat(range.min);
      let minOp = range.minOp ? range.minOp : '>=';

      return {min: rangeMin, minOp: minOp};
    }

    return null;
  }

  getMaxValueForUnit(unit) {
    let range = this.getRangeForUnit(unit);
    if (range && range.max !== undefined) {
      let rangeMax = parseFloat(range.max);
      let maxOp = range.maxOp ? range.maxOp : '<=';

      return {max: rangeMax, maxOp: maxOp};
    }

    return null;
  }

  /*
   * @Override
   */
  applyValue(value, valueType, multiIndex) {
    if (!this._applyValueFromObject(value)) {
      if (valueType == null || valueType === 'magnitude' || valueType === 'value') {
        multiIndex = this._getDefaultMultiIndex(multiIndex);
        this.magnitudeValue(value, multiIndex);
      } else if (valueType === 'unit') {
        multiIndex = this._getDefaultMultiIndex(multiIndex);
        this.unitValue(value, multiIndex);
      } else {
        console.warn('Setting non-existent value type (' + valueType + ') with value=' + value + ' on RM type (' + this.toString() + ')');
      }
    }
  }

  /*
   * @Override
   */
  resetValue(multiIndex: number) {
    this.clearValue();
    let mInd = this._getDefaultMultiIndex(multiIndex);
    this.unitValue(this.defaultValueUnit(), mInd, true);
    this.magnitudeValue(this.defaultValueMagnitude(), mInd, true);
    this._setIsDefaultValue(true);
  }

  /*
   * @Override
   */
  clearValue() {
    this.removeValue(null);
  }

  clearUnitValue(multiIndex) {
    this.clearValueProp('|unit', multiIndex);
  }

  clearMagnitudeValue(multiIndex) {
    this.clearValueProp('|magnitude', multiIndex);
  }

  removeValue(multiIndex) {
    this.clearValueProp(this._MULTI_ARR_PARAM, multiIndex);
  }

  getRmType() {
    return RmType.DV_QUANTITY;
  }


  toString() {
    return 'QuantityFieldModel/' + this.getName() + '/' + RmType[this.getRmType()];
  }
}

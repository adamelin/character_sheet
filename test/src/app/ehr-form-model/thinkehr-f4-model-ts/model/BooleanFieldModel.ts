import {NodeModel} from './NodeModel';
import {InputType} from '../view/InputType';
import {ThinkEhrUtil} from '../ThinkEhrUtil';
import {RmType} from '../RmType';
import {ModelViewConfigParser} from "../parsing/ViewConfigParser";

/**
 * Created by matjazhi on 30.5.2016.
 */

export class BooleanFieldModel extends NodeModel {

  _skipDefaultValue: boolean;
  private _allowedValues: any[];

  constructor(fromDesc?: Object, viewConfigParser?: ModelViewConfigParser) {
    super(fromDesc, viewConfigParser);
    if (this._skipDefaultValue === undefined) {
      this._skipDefaultValue = false;
    }
  }

  isMulti() {
    return false;
  }

  setValue(value) {
    this.booleanValue(value);
  }

  booleanValue(value?: any) {
    if (value !== undefined) {

      const previousValue = ThinkEhrUtil.deepClone(this.value);
      this.value = value;
      var parentRef = this.getValueNodeParentRef();
      if (!ThinkEhrUtil.isArray(parentRef)) {
        throw new Error('boolean parent ref is not array (can happen if there are 2 equal formIds or max!=1');
      }

      if (parentRef) {
        if (parentRef.length > 0) {
          if (value !== null && value !== undefined) {
            parentRef[0] = this.value;
            this._skipDefaultValue = false;
          } else {
            parentRef.shift();
            if (this.value === null) {
              parentRef[0] = this.value;
            }
            this._skipDefaultValue = true;
          }
        } else if (value !== undefined) {
          //if(value !== null || (value===null && this.isThreeState()) ) {
          parentRef.push(this.value);
          this._skipDefaultValue = false;
          //}
        }
      }
      this._setIsDefaultValue(false);
      this._onValueUpdated(previousValue);

    } else if ((this.value == null || this.value === "") && !this._skipDefaultValue && !this.isDefaultValue()) {
      const val = this.defaultValueBoolean();
      ///console.log("def=",val)
      /*if (val === null) {
        if (!this.isThreeState() && this.allowedValues().indexOf(false)>-1) {
          this._setIsDefaultValue(true);
          return this.booleanValue(false);
        }
      } else {*/
      this._setIsDefaultValue(true);
      return this.booleanValue(val);
      //}
    }
    return this.value;
  }

  defaultValueBoolean() {
    let val;
    let dv = this.getInputByType(InputType.BOOLEAN).getDefaultValue();
    if (dv !== null && dv !== undefined) {
      let isStr = ThinkEhrUtil.isString(dv);
      if ((dv !== undefined && !isStr) || (isStr && dv.length > 0)) {
        val = isStr ? dv === 'true' : dv;
      } else if (!this.isThreeState()) {
        val = false;
      } else {
        val = null;
      }
    } else if (this.isThreeState() || (this.allowedValues().length === 1 && this.allowedValues()[0] === true)) {
      val = null;
    } else if (!this.isThreeState()) {
      val = null;
    }
    else {
      val = false;
    }

    if (this.allowedValues().indexOf(val) < 0 && val !== null) {
      val = !val;
    }

    return val;
  }

  /*
   * @Override
   */
  getRmType() {
    return RmType.DV_BOOLEAN;
  }

  /*
   * @Override
   */
  resetValue() {
    this.booleanValue(this.defaultValueBoolean());
  }

  /*
   * @Override
   */
  applyValue(value, valueType) {
    if (!this._applyValueFromObject(value)) {
      if (valueType == null || valueType === 'value') {
        this.booleanValue(value);
      } else {
        console.warn('Setting non-existent value type (' + valueType + ') with value=' + value + ' on RM type (' + this.toString() + ')');
      }
    }
  }

  clearBooleanValue() {
    let parentRef = this.getValueNodeParentRef();
    if (parentRef && parentRef.length > 0) {
      if (this.isThreeState()) {
        parentRef.shift();
        this.value = null;
      } else {
        this.value = false;
        parentRef[0] = this.value;
      }
    }

    this._skipDefaultValue = true;
  }

  isThreeState() {
    let field = this.getViewConfig().getFields();
    return field && field['threeState'];
  }

  allowedValues() {
    if (!this._allowedValues) {
      this._allowedValues = [];

      let input = this.getInput(0);
      if (input.hasItems()) {
        for (let i = 0; i < input.getList().length; i++) {
          let item = input.getItem(i);
          let val = item.value;
          if (val !== undefined) {
            if (ThinkEhrUtil.isString(val)) {
              if (val === 'true') {
                this._allowedValues.push(true);
              } else if (val === 'false') {
                this._allowedValues.push(false);
              }
            } else {
              this._allowedValues.push();
            }
          }
        }
      } else {
        this._allowedValues.push(true, false);
      }

      if (this.isThreeState()) {
        this._allowedValues.push(null);
      }
    }

    return this._allowedValues;
  }

  toString() {
    return 'BooleanFieldModel/' + this.getName() + '/' + RmType[this.getRmType()];
  }
}

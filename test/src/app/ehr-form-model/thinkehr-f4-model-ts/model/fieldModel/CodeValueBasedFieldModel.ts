import {NodeModel} from '../NodeModel';
import {ThinkEhrUtil} from '../../ThinkEhrUtil';
import {InputItem} from '../../InputItem';
import {Input} from "../../Input";
import {ModelViewConfigParser} from "../../parsing/ViewConfigParser";
import {EhrModelEventType} from '../../../ehr-model-event';

/**
 * Created by matjazhi on 26.5.2016.
 */

export class CodeValueBasedFieldModel extends NodeModel {

  static CODED_CLEAR_VALUE_EVENT: string = 'codedClearValueEvent';
  static TERMINOLOGY_ITEM_UPDATE: string = 'terminologyItemUpdate';

  eventListeners: Object;

  constructor(fromObj?: Object, viewConfigParser?: ModelViewConfigParser) {
    super(fromObj, viewConfigParser);
    if (this.eventListeners == null) {
      this.eventListeners = {};
    }
  }


  codeValue(value?: string, language?: string) {
    var val = this.getValue();
    if (value != null && ThinkEhrUtil.isString(this.value)) {
      value = value.trim();
    }
    if (arguments.length > 0 && value !== this._MULTI_ARR_PARAM) {
      if (!this.isMulti()) {
        this._deleteOtherProperty();
      }

      if (value === null || value === "" || value === undefined) {
        this.clearValue(undefined, true);
        return null;
      } else {
        val = this.addValue(value, language);
      }
    } else if (this.isMulti()) {
      var codeValues = [];
      this._getValuesArray().forEach(function (v) {
        var currMultiItemCode = v["|code"];
        /* labels for multi are generated so view will update with bindings to labelValue() or each InputItem*/
        if (currMultiItemCode != null) {
          codeValues.push(currMultiItemCode.toString());
        }
      }, this);
      if (!this._skipDefaultValue && !codeValues.length) {
        var defaultValueCode = this.defaultValueCode();

        if (defaultValueCode) {
          defaultValueCode.forEach(function (codeVal) {
            if (codeVal === InputItem.OTHER_VALUE || codeVal === '--other--') {
              const otherVal: string = this._getOtherInput().getDefaultValue();
              this._skipDefaultValue = true;
              this._setIsDefaultValue(true);
              this.otherValue(otherVal);
            } else {
              this.codeValue(codeVal, language);
            }
          }, this);
          var retCodeVal = this.codeValue();
          this._setIsDefaultValue(true);
          return retCodeVal;
        }
      }

      return codeValues;
    } else if (val == null) {
      if (val == null && this.defaultValueCode) {
        var defaultValueCode2 = this.defaultValueCode();
        var dvCode;
        if (defaultValueCode2 && !this._skipDefaultValue) {
          dvCode = defaultValueCode2[0];
          this._skipDefaultValue = true;
        }
        if (dvCode) {
          if (dvCode === InputItem.OTHER_VALUE || dvCode === '--other--') {
            const otherVal: string = this._getOtherInput().getDefaultValue();
            this.otherValue(otherVal);
          } else {
            let retCodeVal1 = this.codeValue(dvCode, language);
            this._setIsDefaultValue(true);
            return retCodeVal1;
          }
        }
      }

      return null;
    }

    if (!val["|code"]) {
      return null;
    }

    if (!ThinkEhrUtil.isArray(val["|code"])) {
      return val["|code"].toString();
    }

    return val["|code"].map((v) => {
      return v.toString();
    });

  }

  labelValue(language?: string, labelValueFormat?: boolean, removeOrdinalNr?: boolean) {
    if (this.isMulti()) {
      let cvm = this.codeValue();
      // TODO optimize by caching array locally
      let lv = cvm.map(function (c) {
        let item = this.findInputItemByCode(c, language);
        if (item) {
          let labelValue = language !== undefined ? item.getLabel(language, removeOrdinalNr) : item.getLabel(undefined, removeOrdinalNr);
          if (!labelValue) {
            labelValue = item.getLabel(undefined, removeOrdinalNr);
          }
          return labelValueFormat ? {label: labelValue, value: item.value, status: item.status} : labelValue;
        } else {
          let foreignItem = this.findValueObjectByCode(c);
          let lbl = '(' + c + ') ' + (foreignItem.value ? foreignItem.value : '');
          if (!foreignItem) {
            lbl = '(' + c + ') not found';
          }
          return labelValueFormat ? {label: lbl, value: c, status: InputItem.STATUS_NOT_FOUND} : lbl;
        }
      }.bind(this));
      lv = lv.filter(function (itm) {
        return itm != null;
      });
      let ovm = labelValueFormat && this.otherValue() != null ? {
        label: this.otherValue(),
        value: InputItem.OTHER_VALUE
      } : this.otherValue();
      if (ThinkEhrUtil.isString(ovm) || (ovm && ovm.value === InputItem.OTHER_VALUE)) {
        lv.push(ovm);
      }
      return lv;

    } else {
      let ov = labelValueFormat ? {label: this.otherValue(), value: InputItem.OTHER_VALUE} : this.otherValue();
      if (ThinkEhrUtil.isString(ov) || (ov && ov.value === InputItem.OTHER_VALUE && ov.label)) {
        return ov;
      } else {
        let cv = this.codeValue();
        let itemStatus;
        if (cv) {
          let item = this.findInputItemByCode(cv, language);
          if (item) {
            let labelValue = language !== undefined ? item.getLabel(language, removeOrdinalNr) : item.getLabel(undefined, removeOrdinalNr);
            if (labelValue == null) {
              labelValue = item.getLabel(undefined, removeOrdinalNr);
            }
            if (labelValue != null) {
              this.getValue()['|value'] = labelValue;
            }
            itemStatus = item.status;
          }
        }
        let labelVal = cv ? this.getValue()['|value'] : null;
        let ret = labelValueFormat ? {label: labelVal, value: cv, status: itemStatus} : labelVal;
        return cv ? ret : null;
      }
    }
  }

  setLabelValue(code, value, valueObject?: Object) {
    if (!valueObject || valueObject['|code'] !== code) {
      valueObject = this.findValueObjectByCode(code);
    }

    if (valueObject) {
      if (valueObject['|value'] != value) {
        valueObject['|value'] = value;
        return true;
      }
    }
    return false;
  }

  defaultValueCode(): string[] {
    let dv = this._getCodeInput().getDefaultValue();
    if (ThinkEhrUtil.isString(dv) && dv.length > 0) {
      dv = dv.split(',').map(function (codeVal) {
        return codeVal.toString().trim();
      });
    }
    if (dv && ThinkEhrUtil.isArray(dv)) {
      return dv.map(function (codeVal) {
        return codeVal.toString().trim();
      });
    }
    return null;
  }

  otherValue(value?: string) {
    if (!this.isListOpen()) {
      return null;
    }

    const val = this.getValue();
    const previousValue = ThinkEhrUtil.deepClone(val);
    // Getter
    if (arguments.length === 0) {
      if (!val) {
        return null;
      }
      else if (this.isMulti()) {
        var ov = this.findOtherValueObject();
        return ov ? ov["|other"] : null;
      } else {
        return val["|other"] ? val["|other"] : null;
      }
    } else {
      // Setter
      if (!this.isMulti()) {
        this.clearValue(undefined, true);
      }

      //this._skipDefaultValue = true;
      if (value === null || value === "" || value === undefined) {
        if (this.isMulti()) {
          this.removeOtherValue();
        } else {
          this.clearValue(undefined, true);
        }

        this._onValueUpdated(previousValue);
        return null;
      } else {
        if (this.isMulti()) {
          var otherVal = this.findOtherValueObject();
          if (otherVal) {
            otherVal["|other"] = value;
          } else {
            otherVal = this.addOtherValue(value);
          }

          this._setIsDefaultValue(false);
          this._onValueUpdated(previousValue);
          return otherVal["|other"];
        } else {
          var otherValObj = this.findOtherValueObject();
          if (!otherValObj) {
            otherValObj = this.setValue(value, this._getValuesArray().length, '|other');
          } else {
            otherValObj["|other"] = value;
          }
          this._setIsDefaultValue(false);
          this._onValueUpdated(previousValue);
          return otherValObj;
        }
      }
    }
  }

  findInputItemByCode(code: string, updateInLanguage?: string) {
    let valObj = this.findValueObjectByCode(code);
    let withDefaultValues;
    if (valObj) {
      withDefaultValues = {label: valObj['|value'], localizedLabels: {}};
      withDefaultValues.localizedLabels[updateInLanguage] = withDefaultValues.label;
    }
    let item = this._getCodeInput().findInputItemByValue(code, false, withDefaultValues);
    if (item) {
      item.setOnUpdateCallback(function (inputItem) {
        this._setValueFromInputItem(inputItem, updateInLanguage);
      }.bind(this));
    }
    return item;
  }

  findValueObjectByCode(code) {
    let searchInArr = this._getValuesArray();

    if (searchInArr) {
      for (let i = 0; i < searchInArr.length; i++) {
        let val = searchInArr[i];
        if (val['|code'] === code) {
          return val;
        }
      }
    }
    return null;
  }

  findOtherValueObject() {
    let valArray = this._getValuesArray();
    for (let i = 0; i < valArray.length; i++) {
      let val = valArray[i];
      if (val['|other']) {
        return val;
      }
    }

    return null;
  }

  addValue(code: string, language?: string) {
    if (!ThinkEhrUtil.isString(code)) {
      code = code.toString();
    }
    this._skipDefaultValue = true;
    this._setIsDefaultValue(false);
    var val = this.findValueObjectByCode(code);
    if (val) {
      return val;
    }

    var atMultiIndex = this.isMulti() ? this._getValuesArray().length : 0;
    val = this.setValue(code, atMultiIndex, "|code");

    var item = this.findInputItemByCode(code, language);

    if (item) {
      this._setValueFromInputItem(item, language,);
      this._updateOtherFields(val, item);
    }

    this._resetOtherFields(val);

    return val;
  }


  removeValue(code) {
    const valObj = this.findValueObjectByCode(code);
    if (valObj) {
      const valArray = this._getValuesArray();
      const previousValue = ThinkEhrUtil.deepClone(valArray);
      const index = valArray.indexOf(valObj);
      const newArr = valArray.slice();
      newArr.splice(index, 1);
      this._setValuesArray(newArr, previousValue);
    }

    this._skipDefaultValue = true;
    this._setIsDefaultValue(false);

    return valObj;
  }

  addOtherValue(value) {
    let val = {
      '|other': value
    };

    let valArray = this._getValuesArray();
    valArray.push(val);
    if (!this.getValue()) {
      this.setValue(valArray);
    }
    ///this._triggerModelRefreshed();

    return val;
  }

  removeOtherValue() {
    const valObj = this.findOtherValueObject();
    const valArray = this._getValuesArray();
    const previousValue = ThinkEhrUtil.deepClone(valArray);
    if (valObj) {
      const index = valArray.indexOf(valObj);
      valArray.splice(index, 1);
      ///this._triggerModelRefreshed();
    }
    this._skipDefaultValue = true;
    this._setIsDefaultValue(false);
    this._onValueUpdated(previousValue);
    return valObj;
  }

  isListOpen() {
    return this._getCodeInput().isListOpen();
  }

  addTerminologyItemUpdateListener(eventHandler) {
    if (!this.eventListeners[CodeValueBasedFieldModel.TERMINOLOGY_ITEM_UPDATE]) {
      this.eventListeners[CodeValueBasedFieldModel.TERMINOLOGY_ITEM_UPDATE] = [];
    }
    if (this.eventListeners[CodeValueBasedFieldModel.TERMINOLOGY_ITEM_UPDATE].indexOf(eventHandler) === -1) {
      this.eventListeners[CodeValueBasedFieldModel.TERMINOLOGY_ITEM_UPDATE].push(eventHandler);
    }
  }

  removeTerminologyItemUpdateListener(eventHandler) {
    if (this.eventListeners[CodeValueBasedFieldModel.TERMINOLOGY_ITEM_UPDATE] && this.eventListeners[CodeValueBasedFieldModel.TERMINOLOGY_ITEM_UPDATE].indexOf(eventHandler) > -1) {
      this.eventListeners[CodeValueBasedFieldModel.TERMINOLOGY_ITEM_UPDATE].splice(this.eventListeners[CodeValueBasedFieldModel.TERMINOLOGY_ITEM_UPDATE].indexOf(eventHandler), 1);
    }
  }

  _dispatchEvent(eventName, eventValue) {
    if (this.eventListeners[eventName]) {
      this.eventListeners[eventName].forEach(function (evHandler) {
        evHandler.call(null, {event: eventName, value: eventValue});
      });
    }
  }

  _setValueFromInputItem(inputItem, language) {

    //console.log("TERMIN_II_DEBUG CodeValueBasedFieldModel _setValueFromInputItem=",inputItem, language)
    let labelValue = language !== undefined ? inputItem.getLabel(language, true) : inputItem.getLabel(undefined, true);
    if (!labelValue) {
      labelValue = inputItem.getLabel(undefined, true);
    }
    if (this.setLabelValue(inputItem.value, labelValue)) {
      this._dispatchEvent(CodeValueBasedFieldModel.TERMINOLOGY_ITEM_UPDATE, inputItem);
    }
  }

  _getCodeInput(): Input {
    return this.getInputFor('code');
  }

  _getOtherInput(): Input {
    return this.getInputFor('other');
  }

  _updateOtherFields(val, item) {
    // For override
  }

  _resetOtherFields(val) {
    // For override
  }

  _deleteOtherProperty() {
    let val = this.getValue();
    if (val) {
      if (val['|other'] !== undefined) {
        delete val['|other'];
      }
    }
  }

  /*
   * @Override
   */
  resetValue() {
    this.clearValue();
    var defaultValueCodesArr = this.defaultValueCode();
    if (!defaultValueCodesArr || !defaultValueCodesArr.length) {
      defaultValueCodesArr = [null];
    }
    defaultValueCodesArr.forEach(function (codeVal) {
      this.codeValue(codeVal);
    }, this);
    this._setIsDefaultValue(true);
  }

  /*
   * @Override
   */
  applyValue(value, valueType) {
    if (!this._applyValueFromObject(value)) {
      if (valueType == null || valueType === 'value' || valueType === 'code') {
        this.codeValue(value);
      } else {
        console.warn('Setting non-existent value type (' + valueType + ') with value=' + value + ' on RM type (' + this.toString() + ')');
      }
    }
  }

  /*
   * @Override
   */
  clearValue(multiIndex?: number, muteEvent?: boolean) {
    const previousValue = ThinkEhrUtil.deepClone(this._getValuesArray());
    this._setValuesArray([], previousValue);
    this._skipDefaultValue = true;
    this._setIsDefaultValue(false);
    if (!muteEvent) {
      this.eventDispatcher.dispatchEvent(EhrModelEventType.CLEAR_VALUE_EVENT, {model: this});
    }
  }

  toString() {
    return 'CodeValueBasedFieldModel';
  }

}

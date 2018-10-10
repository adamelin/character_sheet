import {FormRepeatableElementModel} from './FormRepeatableElementModel';
import {Input} from './../Input';
import {ThinkEhrUtil} from './../ThinkEhrUtil';
import {InputType} from './../view/InputType';
import {FormObjectModel} from './FormObjectModel';
import {ModelViewConfigParser} from '../parsing/ViewConfigParser';
import {CustomModel} from './fieldModel/CustomModel';

/**
 * Created by matjazhi on 19.4.2016.
 */

export class NodeModel extends FormRepeatableElementModel {

  nodeId: string;
  aqlPath: string;
  inputs: Input[];
  value: any;
  valueTypes: any[];

  protected delegateOf: CustomModel;
  protected _MULTI_ARR_PARAM = undefined;
  protected _skipDefaultValue: boolean;
  protected _isDefaultValue: boolean = false;
  protected _updatedValueCallbacks: Function[] = [];

  constructor(formDescriptionSnippet?: Object, viewConfigParser?: ModelViewConfigParser) {
    super(formDescriptionSnippet, viewConfigParser);
    if (this.inputs === undefined) {
      this.inputs = [];
    }
    if (this.valueTypes === undefined) {
      this.valueTypes = [];
    }
    if (this.value === undefined) {
      this.value = null;
    }
  }

  getNodeId(): string {
    return this.nodeId;
  }

  setNodeId(nodeId: string): void {
    this.nodeId = nodeId;
  }

  getAqlPath(): string {
    return this.aqlPath;
  }

  setAqlPath(aqlPath: string) {
    this.aqlPath = aqlPath;
  }

  getInputs(): Input[] {
    return this.inputs;
  }

  getInput(index: number): Input {
    return index >= 0 && index < this.inputs.length ? this.inputs[index] : null;
  }

  getInputFor(suffix: string): Input {
    for (let i = 0; i < this.inputs.length; i++) {
      const input: Input = this.inputs[i];
      if (input.getSuffix() === suffix) {
        return input;
      }
    }

    return null;
  }

  getInputByType(type: InputType): Input {
    for (let i = 0; i < this.inputs.length; i++) {
      const input: Input = this.inputs[i];
      if (input.getType() === type) {
        return input;
      }
    }

    return null;
  }

  setInputs(inputs: Input[]) {
    this.inputs = inputs;
  }

  addInput(input: Input): void {
    input.setInputForModel(this);
    if (this.getViewConfig().getTerminology()) {
      input.setTerminology(this.getViewConfig().getTerminology(), null);
    }
    this.inputs.push(input);
  }

  isValueModel(): boolean {
    return true;
  }

// TODO getValue does not set default values
  getValue(property?: string, multiIndex?: number): any {
    const valsArr: Object[] = this._getValuesArray();

    if (valsArr) {
      if ((arguments.length > 1 && multiIndex === this._MULTI_ARR_PARAM) || (arguments.length < 2 && this.isMulti())) {
        return valsArr.map(function (multiVal: Object) {
          return property ? multiVal[property] : multiVal;
        });
      } else if (!multiIndex) {
        multiIndex = 0;
      }
      if (valsArr.length > 0 && valsArr[multiIndex] != null) {
        let retVal: any;
        if (property) {
          retVal = valsArr[multiIndex][property];
          if (retVal === undefined) {
            property = '|' + property;
            retVal = valsArr[multiIndex][property];
          }
        } else {
          retVal = valsArr[multiIndex];
        }
        return retVal !== undefined ? retVal : null;
      }
    }

    return null;
  }

  setValue(value: any, multiIndex?: number, propertyName?: string) {
    let retValue: any = null;
    if (multiIndex === undefined) {
      if (value != null && !ThinkEhrUtil.isArray(value)) {
        value = [value];
      }
      let oldVals: any[] = this._getValuesArray();
      const previousValue: any[] = ThinkEhrUtil.deepClone(oldVals);
      if (!!propertyName) {
        // propertyName exists so check if values are plain
        if (value.some(v => ThinkEhrUtil.isObject(v))) {
          throw new Error('NodeModel.setValue / when propertyName param is set with multiIndex===undefined values can not be objects');
        }

        if (!oldVals) {
          oldVals = [];
        }

        value = value.map((plainVal: any, ind: number) => {
          if (oldVals[ind] !== undefined && ThinkEhrUtil.isObject(oldVals[ind])) {
            oldVals[ind][propertyName] = plainVal;
            return oldVals[ind];
          }
          return {[propertyName]: plainVal};
        });
      }
      if (value == null && multiIndex == null) {
        value = [];
      }
      this._setValuesArray(value, previousValue);
      retValue = this._getValuesArray();
    } else {
      const valuesArr = this._getValuesArray();
      const previousValue: any[] = ThinkEhrUtil.deepClone(valuesArr);
      if (propertyName === undefined) {
        if (value === null) {
          valuesArr.splice(multiIndex, 1);
        } else {
          valuesArr[multiIndex] = value;
        }
        retValue = valuesArr;
      } else {
        if (propertyName == null && value === null) {
          valuesArr.splice(valuesArr.indexOf(valuesArr[multiIndex]), 1);
        } else if (propertyName != null) {
          if (valuesArr[multiIndex] == null) {
            valuesArr[multiIndex] = {};
          }
          valuesArr[multiIndex][propertyName] = value;
        } else {
          valuesArr[multiIndex] = value;
        }
        retValue = valuesArr;
      }
      this._setOnAllValuesArray(valuesArr, previousValue);
    }
    this._setSkipDefaultValue(true, multiIndex);
    return multiIndex != null ? retValue[multiIndex] : retValue;
  }

  clearValue(multiIndex?: number): void {
    let onModel = this;
    if (onModel instanceof CustomModel) {
      onModel = (onModel as CustomModel).getDelegateModel();
      if (!(onModel instanceof NodeModel)) {
        return;
      }
    }
    const previousValue = ThinkEhrUtil.deepClone(this._getValuesArray());
    onModel._setValuesArray([], previousValue);
    onModel._setIsDefaultValue(false);
  }

  // TODO is 2nd parameter used?
  _setSkipDefaultValue(val: boolean, multiIndex: number) {
    this._skipDefaultValue = val;
  }

  _applyValueFromObject(value: Object) {
    if (ThinkEhrUtil.isObject(value)) {
      for (let prop in value) {
        if (value.hasOwnProperty(prop)) {
          this.applyValue(value[prop], prop);
        }
      }
      return true;
    }
    return false;
  }

  applyValue(value: any, valTypeStr: string, multiIndex?: number): void {
    throw new Error('\'applyValue\' method not implemented on ' + this.toString());
  }

  resetValue(multiIndex: number): void {
    throw new Error('\'resetValue\' method not implemented on ' + this.toString());
  }

  setValueProp(value: any, valuePropertyName?: string, multiIndex?: number) {
    if (!this.isMulti() && multiIndex == null) {
      multiIndex = 0;
      if (ThinkEhrUtil.isArray(value)) {
        value = value[0];
      }
    } else if (this.isMulti() && multiIndex == null && (!ThinkEhrUtil.isArray(value) && valuePropertyName != null)) {
      throw new Error('multiIndex parameter is required on isMulti()==true models');
    }
    let currValAtIndex: any = this.getValue(this._MULTI_ARR_PARAM, multiIndex);
    if (multiIndex === undefined && currValAtIndex.length === 0) {
      currValAtIndex = null;
    }

    if (!currValAtIndex && value != null) {
      const val: Object = {};
      this.setValue(val, multiIndex);
      currValAtIndex = [val];
    }
    if (currValAtIndex) {
      if (!ThinkEhrUtil.isArray(currValAtIndex)) {
        currValAtIndex = [currValAtIndex];
      }
      currValAtIndex.forEach(function () {
        this.setValue(value, multiIndex, valuePropertyName);
      }, this);
    }
  }

  clearValueProp(valuePropertyName: string, multiIndex?: number) {
    if (!this.isMulti() && multiIndex == null) {
      multiIndex = 0;
    } else if (this.isMulti() && multiIndex === undefined) {
      throw new Error('multiIndex parameter must be null or integer on isMulti() model');
    }
    const previousValue = ThinkEhrUtil.deepClone(this._getValuesArray());
    if (multiIndex === null) {
      this._getValuesArray().length = 0;
    } else if (multiIndex != null) {
      this.setValueProp(null, valuePropertyName, multiIndex);
    } else {
      throw new Error('multiIndex param must be defined');
    }
    this._setIsDefaultValue(false);
    this._onValueUpdated(previousValue);
  }

  getMultiContainerDefaultValue() {
    const parentModel = this.getParentModel() as FormRepeatableElementModel;
    if (parentModel && parentModel.isMulti && parentModel.isMulti()) {
      const multiDefAnnVal = this.getViewConfig().annotationValue('multiDefault');
      if (multiDefAnnVal) {
        const vals = multiDefAnnVal.split(';');
        const retVal = vals[parentModel.getMultiIndex(false)];
        return retVal != null ? retVal.trim() : undefined;
      }
    }
    return undefined;
  }

  /*

    containsValue () {
      let checkOnModel = this.getDelegateModel ? this.getDelegateModel() : null;
      if (!checkOnModel) {
        checkOnModel = this;
      }
      if (checkOnModel.annotationValue("ignoreForContainsValue") === 'true') {
        return false;
      }

      function isSuitable(model) {
        return !model.isContainer() && model.getRmType() !== thinkehr.f4.RmType.FORM_DEFINITION && model.getValue !== undefined;
      }

      // console.debug("Contains value ", this.getRmType(), ": ", isSuitable(this) && thinkehr.f4.util.isValueNonEmpty(this.getValue()), ": ", this);

      if (isSuitable(this) && thinkehr.f4.util.isValueNonEmpty(this.getValue())) {
        return true;
      }

      for (let i = 0; i < this.getChildCount(); i++) {
        let model = this.getChildModel(i);
        if (model.containsValue() === true) {
          return true;
        }
      }

      return false;
    }
  */


  _getPropertyValueFromMultiDefaultString(multiDefaultValue, propName, skipGenericValue) {
    if (multiDefaultValue.indexOf('|') < 0 && multiDefaultValue.indexOf('=') < 0 && !skipGenericValue) {
      return multiDefaultValue;
    }
    var keyValsStrArr = multiDefaultValue.split('|');
    for (var i = 0; i < keyValsStrArr.length; i++) {
      var keyVal = keyValsStrArr[i].split('=');
      if (keyVal[0].trim() == propName) {
        return keyVal[1];
      }
    }
    return undefined;
  }


  _getMultiIndexArgs(arg: IArguments, propertyName?: string) {
    let retArgs = [];
    if (arg.length > 1) {
      retArgs = [undefined, arg[1]];
    }
    if (propertyName) {
      if (!retArgs) {
        retArgs = [];
      }
      retArgs[0] = propertyName;
    }

    return retArgs;
  }

  _getValuesArray(): Object[] {
    // console.log('TODO implement NodeModel _getValuesArray');
    let valuesArr: Object[] = this.getValueNodeParentRef();
    if (valuesArr == null && this.isGenericField) {
      valuesArr = this.value;
      if (!valuesArr) {
        valuesArr = [];
      }
    }
    if (!this.isMulti()) {
      if (valuesArr) {
        if (!ThinkEhrUtil.isArray(valuesArr)) {
          console.warn('ParentRef is not array!');
        }
      }
    } else {
      if (!ThinkEhrUtil.isArray(valuesArr)) {
        valuesArr = valuesArr[this.getValueNodeParentRefPropertyName()] as Object[];
      }
    }

    return valuesArr;
  }

  _setValuesArray(newValuesArr: Array<any>, previousValue: Array<any>): void {
    let currValsArr: any[] = this._getValuesArray();

    if (!currValsArr) {
      console.warn('No values arr=', currValsArr);
    } else {
      if (newValuesArr) {
        newValuesArr = ThinkEhrUtil.copyArrayShallow(newValuesArr);
        currValsArr.length = 0;
        if (newValuesArr.length) {
          let i = newValuesArr.length;
          while (i--) {
            currValsArr[i] = newValuesArr[i];
          }
        }
        this._setOnAllValuesArray(currValsArr, previousValue);
      }
    }
  }

  _setOnAllValuesArray(arr: any[], previousValue: any[]): void {
    this.value = arr;
    this.setValueNodeRef(arr);
        this._onValueUpdated(previousValue);
  }

  _onValueUpdated(previousValue: any[]) {
    const parent = this.getParentModel();
    if (parent) {
      parent.childValueUpdated(this, previousValue);
      /* If CustomModel */
    } else if (this.delegateOf && this.delegateOf.getParentModel()) {
      this.delegateOf.getParentModel().childValueUpdated(this.delegateOf, previousValue);
    }

    this._updatedValueCallbacks.forEach(function (callbackFn) {
      callbackFn({previousValue: previousValue});
    });
  }

  // TODO write tests for callback functionality
  addUpdatedValueCallback(callbackFn: Function): Function {
    if (this._updatedValueCallbacks.indexOf(callbackFn) < 0) {
      this._updatedValueCallbacks.push(callbackFn);
    }
    return () => {
      this.removeUpdatedValueCallback(callbackFn);
    };
  }

  removeUpdatedValueCallback(callbackFn: Function): void {
    const ind: number = this._updatedValueCallbacks.indexOf(callbackFn);
    if (ind > -1) {
      this._updatedValueCallbacks.splice(ind, 1);
    }
  }

  _setFloatValueIfString(val: any, multiIndex: number, propName: string) {
    if (val != null && ThinkEhrUtil.isString(val)) {
      if (multiIndex == null) {
        multiIndex = 0;
      }
      let floatVal: number = parseFloat(val);
      if (isNaN(floatVal)) {
        floatVal = null;
      }
      this.setValueProp(floatVal, propName, multiIndex);
      return this.getValue.apply(this, this._getMultiIndexArgs(arguments, propName));
    }
    return val;
  }

  _getDefaultMultiIndex(multiIndex: number): number {
    if (multiIndex != null) {
      return multiIndex;
    }
    return this.isMulti() ? 0 : undefined;
  }

  isDefaultValue() {
    return this._isDefaultValue;
  }

  _setIsDefaultValue(val) {
    this._isDefaultValue = val;
  }

  toString(): string {
    return 'NodeModel';
  }

}

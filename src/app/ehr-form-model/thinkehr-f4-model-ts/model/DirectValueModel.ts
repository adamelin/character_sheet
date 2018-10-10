import {NodeModel} from "./NodeModel";
import {ViewConfig} from "./../view/ViewConfig";
import {ThinkEhrUtil} from "./../ThinkEhrUtil";
import {ModelViewConfigParser} from "../parsing/ViewConfigParser";
/**
 * Created by matjazhi on 19.4.2016.
 */

export class DirectValueModel extends NodeModel {

  _skipDefaultValue: boolean;
  protected _valueFuncName: string;

  constructor(formDescriptionSnippet?: Object, viewConfigParser?: ModelViewConfigParser, valueFuncName?: string) {
    super(formDescriptionSnippet, viewConfigParser);
    this._valueFuncName = valueFuncName;
    if (this._skipDefaultValue === undefined) {
      this._skipDefaultValue = false;
    }
  }


  valueGetterSetter(value?: any, multiIndex?: number) {
    ///console.log("getterSetter call CALL VAL=",value, " index=",multiIndex, multiIndex!=null?this.getValue.apply(this, [undefined, undefined]):'')
    ///if(this.getValue.apply(this, [undefined, undefined]).length>2)debugger;
    //if(multiIndex!=undefined)debugger;
    if (arguments.length > 0 && value !== this._MULTI_ARR_PARAM) {
      //TODO use setValue ??

      let currValueArr = this._getValuesArray();
      let isValueDifferent: boolean = this.isValueDifferent(value, multiIndex, currValueArr);
      ///console.log(".............................DIFFFF", isValueDifferent, this.getPath(), value, this._getValuesArray());
      if (isValueDifferent) {
        const previousValue = ThinkEhrUtil.deepClone(currValueArr)
        this._setValuesArray(this.transformValue(value, currValueArr, multiIndex),  previousValue);
      }
      this._skipDefaultValue = true;
      this._setIsDefaultValue(false);
      ///console.log("getterSetter call RETURN VAL=",this.getValue.apply(this, this._getMultiIndexArgs(arguments)), multiIndex?this.getValue.apply(this, [undefined, undefined]):'')
      return this.getValue.apply(this, this._getMultiIndexArgs(arguments));

    } else if ((this.getValue() == null || this.getValue().length < 1) && this.defaultValue() && !this._skipDefaultValue) {
      this.valueGetterSetter(JSON.parse(JSON.stringify(this.defaultValue())), this._MULTI_ARR_PARAM);
      this._setIsDefaultValue(true);
      return this.getValue.apply(this, this._getMultiIndexArgs(arguments));
    }
    ///console.log("getterSetter call RETURN VAL=",this.getValue.apply(this, this._getMultiIndexArgs(arguments)), multiIndex?this.getValue.apply(this, [undefined, undefined]):'')
    return this.getValue.apply(this, this._getMultiIndexArgs(arguments));
  }

  //TODO write unit tests
  private isValueDifferent(val: any, mulitIndex: number = 0, existingValuesArr: any[]): boolean {
    if (ThinkEhrUtil.isArray(val)) {
      let valuesAreEqual = val.length === existingValuesArr.length && val.findIndex((currNewVal: any, index: number)=> {
          return currNewVal !== existingValuesArr[index];
        }) < 0;
      return !valuesAreEqual;
    } else {
      return existingValuesArr[mulitIndex] !== val;
    }
  }

  /*///_onValueUpdated(){
    console.log("DIRECT VAL=", this._getValuesArray())
    super._onValueUpdated();
  }*/

  _sanitizeArrayValue(retArr: any[]) {
    if (retArr.length == 1 && (retArr[0] == null || retArr[0].toString().length < 1 )) {
      retArr.length = 0;
    }
    return retArr;
  }

  transformValue(newValue: any, currValueArr: any[], multiIndex: number) {
    //update values in array and return updated array
    var retArr: any[] = currValueArr ? currValueArr : [];

    if (!ThinkEhrUtil.isArray(retArr)) {
      retArr = [retArr];
    }

    if (newValue !== undefined) {
      //if multiIndex parameter explicitly set to _MULTI_ARR_PARAM - set whole array
      if (arguments.length == 3 && multiIndex === this._MULTI_ARR_PARAM) {
        //explicitly reset whole arr - remove first and reset
        retArr.length = 0;
        if (ThinkEhrUtil.isArray(newValue)) {
          //fill the array with values
          for (var i = 0; i < newValue.length; i++) {
            retArr[i] = newValue[i];
          }
          return this._sanitizeArrayValue(retArr);
        } else {
          //set index - will set [0] with value
          multiIndex = 0;
        }
      } else if (multiIndex == null) {
        //set value on specific index - was not provided - setting to 0
        multiIndex = 0;
      }

      if (newValue != null) {
        if ((newValue == null || newValue.toString().length < 1 ) && multiIndex == 0 && retArr.length < 2) {
          //empty value - clear array
          retArr.length = 0;
        } else {
          //set index value
          retArr[multiIndex] = newValue;
        }
      } else {
        // value was null - remove at index
        retArr.splice(multiIndex, 1);
      }
    }

    return this._sanitizeArrayValue(retArr);
  }

  getDefaultInput() {
    return null;
  }

  setValue(val: any, multiIndex?: number) {
    super.setValue(this.transformValue(val, this.getValue(), this._MULTI_ARR_PARAM), multiIndex);
  }

  defaultValue() {
    var defaultInput = this.getDefaultInput();
    var dv = defaultInput ? defaultInput.getDefaultValue() : null;
    if ((ThinkEhrUtil.isString(dv) && dv.length > 0) || ThinkEhrUtil.isArray(dv)) {
      return dv;
    }
    return null;
  }

  /*
   * @Override
   */
  clearValue() {
    this.setValue(null);
    this._skipDefaultValue = true;
  }

  /*
   * @Override
   */
  toString() {
    return "DirectValueModel/" + this._valueFuncName;
  }

}

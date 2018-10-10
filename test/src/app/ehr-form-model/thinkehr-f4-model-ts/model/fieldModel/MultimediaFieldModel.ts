import {NodeModel} from '../NodeModel';
import {InputType} from '../../view/InputType';
import {RmType} from '../../RmType';
import {ModelViewConfigParser} from "../../parsing/ViewConfigParser";
/**
 * Created by matjazhi on 31.5.2016.
 */

export class MultimediaFieldModel extends NodeModel {
  _skipDefaultMimeTypeValue: boolean = false;

  constructor(fromObj: Object, viewConfigParser?: ModelViewConfigParser) {
    super(fromObj, viewConfigParser);
  }


  uriValue(value?: any, multiIndex?: number) {
    var val = this.getValue.apply(this, this._getMultiIndexArgs(arguments, '|uri'));

    if(value===this._MULTI_ARR_PARAM){
      if ((val == null || val.length<1) && this.defaultValueUri() && !this._skipDefaultValue) {
        var dUri = this.defaultValueUri();
        if (dUri !== null && dUri !== undefined) {

          var defMultiInd = multiIndex != null ? multiIndex : 0;
          this.uriValue(dUri, defMultiInd);
          this._setIsDefaultValue(true);
          return this.getValue.apply(this, this._getMultiIndexArgs(arguments, '|uri'));
        }

        return null;
      }
    }else{
      this._skipDefaultValue = true;
      this._setIsDefaultValue(false);
      if (value === null ) {
        this.clearUriValue(multiIndex);
        return null;
      } else {
        this.setValueProp(value, '|uri', multiIndex);
        return this.getValue.apply(this, this._getMultiIndexArgs(arguments, '|uri'));
      }
    }

    return val;
  }

  defaultValueUri() {
    let dv = this.getInputByType(InputType.TEXT).getDefaultValue();

    if (dv !== null && dv !== undefined) {
      return dv;
    }

    return null;
  }

  mimeTypeValue(value, multiIndex) {
    var val = this.getValue.apply(this, this._getMultiIndexArgs(arguments, '|mimetype'));
    if(value===this._MULTI_ARR_PARAM){
      if ((val == null || val.length<1) && this.defaultValueMimeType() && !this._skipDefaultMimeTypeValue) {
        var dMimeTy = this.defaultValueMimeType();
        if (dMimeTy !== null && dMimeTy !== undefined) {

          var defMultiInd = multiIndex != null ? multiIndex : 0;
          this.mimeTypeValue(dMimeTy, defMultiInd);
          this._setIsDefaultValue(true);
          return this.getValue.apply(this, this._getMultiIndexArgs(arguments, '|mimetype'));
        }

        return null;
      }
    }else{

      this._skipDefaultMimeTypeValue = true;
      this._setIsDefaultValue(false);
      if (value === null ) {
        this.clearMimeTypeValue(multiIndex);
        return null;
      } else {
        this.setValueProp(value, '|mimetype', multiIndex);
        return this.getValue.apply(this, this._getMultiIndexArgs(arguments, '|mimetype'));
      }
    }

    return val;
  }

  defaultValueMimeType(){
    var dv = this.getMultiContainerDefaultValue();
    if(dv!=null) {
      dv = this._getPropertyValueFromMultiDefaultString(dv, 'mimetype', true);
      //TODO get mimetype input and get uri input by suffix - it is not present at the moment
      //this.getInputByType(thinkehr.f4.InputType.TEXT).setDefaultValue(dv);
    }else{
      //TODO get mimetype input and get uri input by suffix - it is not present at the moment
      //dv = this.getInputByType(thinkehr.f4.InputType.TEXT).getDefaultValue();
    }

    if (dv !== null && dv !== undefined) {
      return dv;
    }

    return null;
  }

  clearValue(multiIndex) {
    this.clearUriValue(multiIndex);
    this.clearMimeTypeValue(multiIndex);
  }

  /*
   * @Override
   */
  getRmType() {
    return RmType.DV_MULTIMEDIA;
  }

  /*
   * @Override
   */
  resetValue(multiIndex) {
    if(multiIndex===undefined && this.isMulti()) {
      multiIndex = null;
    }
    this.removeValue(multiIndex);
    var mInd = multiIndex != null ? multiIndex : 0;
    this.uriValue(this.defaultValueUri(),mInd);
    this.mimeTypeValue(null,mInd);
    this._setIsDefaultValue(true);
  }

  /*
   * @Override
   */
  applyValue(value, valueType, multiIndex) {
    if (!this._applyValueFromObject(value)) {
      if (valueType == null || valueType === 'value' || valueType === 'uri') {
        multiIndex = this._getDefaultMultiIndex(multiIndex);
        this.uriValue(value, multiIndex);
      } else if (valueType === 'mimetype') {
        multiIndex = this._getDefaultMultiIndex(multiIndex);
        this.mimeTypeValue(value, multiIndex);
      } else {
        console.warn('Setting non-existent value type (' + valueType + ') with value=' + value + ' on RM type (' + this.toString() + ')');
      }
    }
  }

  clearUriValue(multiIndex?: number) {
    this.clearValueProp('|uri', multiIndex);
  }

  clearMimeTypeValue(multiIndex) {
    this.clearValueProp('|mimetype', multiIndex);
  }

  removeValue(multiIndex) {
    this.clearValueProp(this._MULTI_ARR_PARAM, multiIndex);
  }

  toString() {
    return 'MultimediaFieldModel/' + this.getName() + '/' + RmType[this.getRmType()];
  }

}

import {DirectValueModel} from "../DirectValueModel";
import {Input} from "../../Input";
import {InputType} from "../../view/InputType";
import {RmType} from "../../RmType";
import {ModelViewConfigParser} from "../../parsing/ViewConfigParser";

/**
 * Created by matjazhi on 19.4.2016.
 */

export class IdentifierFieldModel extends DirectValueModel {

  constructor(formDescriptionSnippet?: Object, viewConfigParser?: ModelViewConfigParser) {
    super(formDescriptionSnippet,viewConfigParser, 'idValue');
  }

  idValue(value?: string, multiIndex?: number): string {
    let issuer = this.getInputFor("issuer").defaultValue || "undefined";
    let type = this.getInputFor("type").defaultValue || "undefined";
    let assigner = this.getInputFor("assigner").defaultValue || "undefined";
    if (!!value) {
      arguments[0] = {"|id": value, "|type": type, "|issuer": issuer, "|assigner": assigner}
    }

    let retVal = this.valueGetterSetter.apply(this, arguments);
    if (retVal == null || !retVal.length) {
      return retVal;
    }
    if (multiIndex == null) {
      //return array
      return retVal.map(v => {
        if (v && v["|id"]) {
          return v["|id"];
        }
        return "";
      });
    }
    retVal = (retVal && retVal["|id"]) || retVal;
    return retVal;
  }

  getDefaultInput(): Input {
    return this.getInputByType(InputType.TEXT);
  }

  getInputFor(suffix: string): Input {
    return suffix == "idValues" ? this.getInput(0) : super.getInputFor(suffix);
  }

  resetValue(multiIndex: number): void {
    this.idValue(this.defaultValue());
    this._setIsDefaultValue(true);
  }

  applyValue(value: string, valueType: string, multiIndex?: number) {
    if (!this._applyValueFromObject(value)) {
      if (valueType == null || valueType == 'value') {
        multiIndex = this._getDefaultMultiIndex(multiIndex);
        this.idValue(value, multiIndex);
      } else {
        console.warn("Setting non-existent value type (" + valueType + ") with value=" + value + " on RM type (" + this.toString() + ")")
      }
    }
  }

  getRmType(): RmType {
    return RmType.DV_IDENTIFIER;
  }

  toString(): string {
    return "IdentifierFieldModel/" + this.getName() + "/" + RmType[this.getRmType()];
  }

}

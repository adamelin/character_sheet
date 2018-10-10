import {RmType} from "../../RmType";
import {CodeValueBasedFieldModel} from "./CodeValueBasedFieldModel";
import {ModelViewConfigParser} from "../../parsing/ViewConfigParser";
/**
 * Created by matjazhi on 26.5.2016.
 */

export class CodedTextFieldModel extends CodeValueBasedFieldModel {

  constructor(fromObj?:Object, viewConfigParser?: ModelViewConfigParser) {
    super(fromObj, viewConfigParser);
  }

  getRmType() {
    return RmType.DV_CODED_TEXT;
  }

  toString() {
    return "CodedTextFieldModel/" + this.getName() + "/" + RmType[this.getRmType()];
  }
}

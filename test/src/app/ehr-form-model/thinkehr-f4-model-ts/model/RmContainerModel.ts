import {AbstractContainerModel} from "./AbstractContainerModel";
import {RmType} from "./../RmType";
import {ModelViewConfigParser} from "../parsing/ViewConfigParser";
/**
 * Created by matjazhi on 18.4.2016.
 */

export class RmContainerModel extends AbstractContainerModel {

  constructor(fromObj?:Object, viewConfigParser?: ModelViewConfigParser) {
    super( fromObj, viewConfigParser);
  }

  getRmType():RmType {
    return this.rmType;
  }

  setRmType(rmType:RmType) {
    this.rmType = rmType;
  }

  getNamePrefix():string {
    return "cnt_rm_"
  }

  toString():string {
    return "RmContainerModel/" + this.getName() + "/" + RmType[this.getRmType()];
  }
}

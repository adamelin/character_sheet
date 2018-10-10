import {AbstractContainerModel} from './AbstractContainerModel';
import {RmType} from './../RmType';
import {ModelViewConfigParser} from "../parsing/ViewConfigParser";
/**
 * Created by matjazhi on 18.4.2016.
 */

export class GenericFieldsetModel extends AbstractContainerModel {

  constructor(fromObject: Object, viewConfigParser?: ModelViewConfigParser) {
    super(fromObject, viewConfigParser);
  }

  getRmType(): RmType {
    return RmType.GENERIC_FIELDSET;
  }

  isAttachableToValueNode(): boolean {
    return false;
  }

  getNamePrefix(): string {
    return 'cnt_gen_';
  }

  isMulti(): boolean {
    return false;
  }

  toString(): string {
    return 'GenericFieldsetModel/' + this.getName() + '/' + RmType[this.getRmType()];
  }

}

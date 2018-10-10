import {CodeValueBasedFieldModel} from './CodeValueBasedFieldModel';
import {RmType} from '../../RmType';
import {ThinkEhrUtil} from "../../ThinkEhrUtil";
import {Input} from "../../Input";
import {ModelViewConfigParser} from "../../parsing/ViewConfigParser";
/**
 * Created by matjazhi on 30.5.2016.
 */

export class OrdinalFieldModel extends CodeValueBasedFieldModel {

  constructor(fromObj: Object, viewConfigParser?: ModelViewConfigParser) {
    super(fromObj,viewConfigParser);
  }

  _getCodeInput():Input {
    return this.getInput(0);
  }

  /*
   * @Override
   */
  _updateOtherFields(val, item) {
    val['|ordinal'] = item['ordinal'];
  }

  /*
   * @Override
   */
  addValue(code, language) {
    let val = super.addValue(code, language);

    if (val) {
      let item = this.findInputItemByCode(code, language);
      if (item) {
        val['|ordinal'] = item.ordinal;
      }
    }
    return val;
  }

  /*
   * @Override
   */
  getInputFor(suffix) {
    return suffix === 'code' ? this.getInput(0) : super.getInputFor(suffix);
  }

  /*
   * @Override
   */
  getRmType() {
    return RmType.DV_ORDINAL;
  }

  /*
   * @Override
   */
  toString() {
    return 'OrdinalFieldModel/' + this.getName() + '/' + RmType[this.getRmType()];
  }
}

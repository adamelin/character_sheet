import {Field} from "../view/Field";
import {AstCollectionNode} from "./AstCollectionNode";
/**
 * Created by matjazhi on 8.6.2016.
 */

export class AstField extends AstCollectionNode{

  field:string;
    constructor(fromObj:Object) {
      super(fromObj);
      this.field = fromObj['field'];
    }

  getFieldId () {
  return this.field;
}

  setFieldId (fieldId) {
  this.field = fieldId;
}

  conditions (condition?:any) {
  return this.elements(condition);
}

  /*
   * @Override
   */
  toString () {
  return "AstField";
}
}

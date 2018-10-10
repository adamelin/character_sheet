import {AstCollectionNode} from "./AstCollectionNode";
/**
 * Created by matjazhi on 8.6.2016.
 */

export class Ast extends AstCollectionNode {

  constructor(fromObj?:Object) {
    super(fromObj);
  }

  fields(field?:any) {
    return this.elements(field);
  }

  getField(fieldId) {
    if (fieldId) {
      var fields = this.fields();
      for (var i = 0; i < fields.length; i++) {
        if (fields[i].getFieldId() == fieldId)return fields[i]
      }
    }

    return null
  }

  /*
   * @Override
   */
  toString() {
    return "Ast";
  }
}

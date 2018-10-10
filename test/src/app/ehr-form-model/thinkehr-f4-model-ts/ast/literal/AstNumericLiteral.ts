import {AstLiteral} from "./AstLiteral";
/**
 * Created by matjazhi on 8.6.2016.
 */

export class AstNumericLiteral extends AstLiteral {

  constructor(fromObj:Object) {
    super(fromObj);
  }

  toString() {
    return "AstNumericLiteral";
  }
}

import {AstLiteral} from "./AstLiteral";
/**
 * Created by matjazhi on 9.6.2016.
 */

export class AstStringLiteral extends AstLiteral{

    constructor(fromObj:Object) {
      super(fromObj);
    }
  
  toString () {
  return "AstStringLiteral";
}
}

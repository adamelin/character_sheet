import {AstExpression} from "./AstExpression";
/**
 * Created by matjazhi on 8.6.2016.
 */

export class AstFunctionExpression extends AstExpression{
  func:Function;
    constructor(fromObj:Object) {
      super(fromObj);
      this.func = fromObj['func'] ? fromObj['func'] : function () {};
    }
  getFunction () {
  return this.func;
}

  setFunction (func) {
  this.func = func;
}

  evaluate () {
  return this.getFunction().call(null);
}

  /*
   * @Override
   */
  toString () {
  return "AstFunctionExpression";
}
}

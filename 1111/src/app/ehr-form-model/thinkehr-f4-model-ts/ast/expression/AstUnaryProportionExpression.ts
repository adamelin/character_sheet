import {AstUnaryExpression} from "./AstUnaryExpression";
import {ThinkEhrUtil} from "../../ThinkEhrUtil";
/**
 * Created by matjazhi on 8.6.2016.
 */

export class AstUnaryProportionExpression extends AstUnaryExpression {

  constructor(fromObj:Object) {
    super(fromObj);
  }

  evaluate() {

    var lhs = this.getLhsOperand().evaluate();

    var lhsVals = lhs.numerator.map(function (numVal, i) {
      var denVal = lhs.denominator[i];
      if (ThinkEhrUtil.isNumber(numVal) && ThinkEhrUtil.isNumber(denVal)) {
        var calc = numVal / denVal;
        return isNaN(calc) ? null : calc;
      }
      return null;
    });
    if (!lhsVals.length) {
      lhsVals = [null];
    }

    return this.getOperatorFunc().call(null, lhsVals);
  }

  toString() {
    return "AstUnaryProportionExpression";
  }

}

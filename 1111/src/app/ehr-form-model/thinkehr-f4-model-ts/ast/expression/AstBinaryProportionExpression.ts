import {AstBinaryExpression} from "./AstBinaryExpression";
import {ThinkEhrUtil} from "../../ThinkEhrUtil";
/**
 * Created by matjazhi on 8.6.2016.
 */

export class AstBinaryProportionExpression extends AstBinaryExpression {

  constructor(fromObj:Object) {
    super(fromObj);
  }
  
  evaluate() {

    var rhs = this.getRhsValuesArr();
    if (!rhs
      || !rhs.length
      || !rhs.filter(function (rhsItem) {
        return ThinkEhrUtil.isNumber(rhsItem.numerator) && ThinkEhrUtil.isNumber(rhsItem.denominator);
      }).length) {
      return false;
    }

    var lhs = this.getLhsOperand().evaluate();

    if (!lhs
      || !lhs.numerator.length
      || !lhs.numerator.filter(function (numVal) {
        return ThinkEhrUtil.isNumber(numVal);
      }).length) {
      return false;
    }

    var lhsVals = lhs.numerator.map(function (numVal, i) {
      return numVal / lhs.denominator[i];
    });
    //var lhsVal = lhs.numerator / lhs.denominator;
    var rhsVals = rhs.map(function (rhsPropObj) {
      return rhsPropObj.numerator / rhsPropObj.denominator;
    });

    return this.getOperatorFunc().call(null, lhsVals, rhsVals);
  }

  toString() {
    return "AstBinaryProportionExpression";
  }
}

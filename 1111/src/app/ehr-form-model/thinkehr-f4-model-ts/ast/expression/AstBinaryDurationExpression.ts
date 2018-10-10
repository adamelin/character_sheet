import {AstBinaryExpression} from "./AstBinaryExpression";
import {PeriodISO8601Parser} from "../../parsing/PeriodISO8601Parser";
/**
 * Created by matjazhi on 8.6.2016.
 */

export class AstBinaryDurationExpression extends AstBinaryExpression {

  constructor(fromObj:Object) {
    super(fromObj);
  }

  evaluate() {

    var rhsVal = this.getRhsValuesArr();

    var lhs = this.getLhsValuesArr();
    var lhsVals = lhs.map(function (durVal) {
      return PeriodISO8601Parser.parseToTotalSeconds(durVal);
    });

    if (!lhsVals.length) {
      lhsVals.push(null);
    }
    return this.getOperatorFunc().call(null, lhsVals, rhsVal);
  }

  toString() {
    return "AstBinaryDurationExpression";
  }

}

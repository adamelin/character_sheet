import {AstUnaryExpression} from "./AstUnaryExpression";
import {PeriodISO8601Parser} from "../../parsing/PeriodISO8601Parser";
/**
 * Created by matjazhi on 8.6.2016.
 */

export class AstUnaryDurationExpression extends AstUnaryExpression {

  constructor(fromObj:Object) {
    super(fromObj);
  }

  evaluate() {

    var lhs = this.getLhsValuesArr();
    var lhsVals = lhs.map(function (durVal) {
      var toSecs = PeriodISO8601Parser.parseToTotalSeconds(durVal);
      return toSecs < 1 ? null : toSecs;
    });
    if (!lhsVals.length) {
      lhsVals.push(null);
    }

    return this.getOperatorFunc().call(null, lhsVals);
  }

  toString() {
    return "AstUnaryDurationExpression";
  }
}

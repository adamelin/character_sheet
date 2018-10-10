import {AstUnaryExpression} from "./AstUnaryExpression";
import {AstBinaryCodedTextExpression} from "./AstBinaryCodedTextExpression";
/**
 * Created by matjazhi on 8.6.2016.
 */

export class AstUnaryCodedTextExpression extends AstUnaryExpression{

    constructor(fromObj:Object) {
      super(fromObj);
    }
  evaluate () {
  var lhs = this.getLhsValuesArr();
  if(!this.getLhsIsMulti()) {
    lhs=AstBinaryCodedTextExpression.toAstCodedObj(lhs);
    var lhsVals = lhs.map(function (lhs) {
      var lhsVal;
      if (lhs.code) {
        lhsVal = lhs.code;
      } else {
        lhsVal = lhs.value ? lhs.value : null;
      }
      return lhsVal;
    });
  }else{
    lhsVals = lhs[0] && lhs[0].code ? lhs[0].code:lhs.code;
  }
  if(!lhsVals || !lhsVals.length) {
    lhsVals = [null];
  }
  return this.getOperatorFunc().call(null, lhsVals);
}

  toString () {
  return "AstUnaryCodedTextExpression";
}
}

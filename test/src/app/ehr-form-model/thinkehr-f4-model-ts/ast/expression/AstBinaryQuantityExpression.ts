import {AstBinaryExpression} from "./AstBinaryExpression";
/**
 * Created by matjazhi on 8.6.2016.
 */

export class AstBinaryQuantityExpression extends AstBinaryExpression {

  constructor(fromObj: Object) {
    super(fromObj);
  }

  static toAstQuantObj(magUnitObjArr) {
    if (!magUnitObjArr || !magUnitObjArr.magnitude || !magUnitObjArr.magnitude.length) {
      magUnitObjArr = [{magnitude: null, unit: null}];

    } else {
      magUnitObjArr = magUnitObjArr.magnitude.map(function (magVal, i) {
        return {magnitude: magVal, unit: magUnitObjArr.unit[i]};
      });
    }
    return magUnitObjArr;
  }

  evaluate(): boolean {
    var lhs = AstBinaryQuantityExpression.toAstQuantObj(this.getLhsOperand().evaluate());

    var rhs = this.getRhsValuesArr();
    let evalRes = this.getOperatorFunc().call(this, lhs, rhs);
    return evalRes
  }


  toString() {
    return "AstBinaryQuantityExpression";
  }
}

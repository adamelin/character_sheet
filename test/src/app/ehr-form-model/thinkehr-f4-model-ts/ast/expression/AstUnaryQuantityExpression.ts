import {AstUnaryExpression} from "./AstUnaryExpression";
import {AstBinaryQuantityExpression} from "./AstBinaryQuantityExpression";
/**
 * Created by matjazhi on 8.6.2016.
 */

export class AstUnaryQuantityExpression extends AstUnaryExpression {

  constructor(fromObj:Object) {
    super(fromObj);
  }

  evaluate() {
    var lhs = AstBinaryQuantityExpression.toAstQuantObj(this.getLhsOperand().evaluate());
    return this.getOperatorFunc().call(null, lhs);
  }

  toString() {
    return "AstUnaryQuantityExpression";
  }

}

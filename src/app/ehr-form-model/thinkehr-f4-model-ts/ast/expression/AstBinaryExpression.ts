import {AstOperatorExpression} from './AstOperatorExpression';
import {ThinkEhrUtil} from '../../ThinkEhrUtil';
/**
 * Created by matjazhi on 8.6.2016.
 */

export class AstBinaryExpression extends AstOperatorExpression {

  rhsOperand: any;

  constructor(fromObj: Object) {
    super(fromObj);
    this.rhsOperand = fromObj['rhsOperand'];
  }

  getRhsOperand() {
    return this.rhsOperand;
  }

  setRhsOperand(rhsOperand) {
    this.rhsOperand = rhsOperand;
  }

  getRhsValuesArr() {
    let rhsVal = this.getRhsOperand().evaluate();
    if (!ThinkEhrUtil.isArray(rhsVal)) {
      rhsVal = [rhsVal];
    } else if (!rhsVal || rhsVal.length === 0) {
      rhsVal = [null];
    }
    return rhsVal;
  }

  isBinary() {
    return true;
  }

  evaluate() {
    let lhs = this.getLhsValuesArr();
    if (!lhs.length) {
      lhs.push(null);
    }
    let rhs = this.getRhsValuesArr();
    return this.getOperatorFunc().call(null, lhs, rhs);
  }

  toString() {
    return 'AstBinaryExpression';
  }

}

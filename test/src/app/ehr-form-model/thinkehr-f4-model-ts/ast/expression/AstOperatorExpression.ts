import {ThinkEhrUtil} from '../../ThinkEhrUtil';
import {AstExpression} from './AstExpression';
/**
 * Created by matjazhi on 8.6.2016.
 */

export class AstOperatorExpression extends AstExpression {
  operatorFunc: Function;
  lhsOperand: any;
  operatorDef: any;
  lhsIsMulti: boolean;

  constructor(fromObj: Object) {
    super(fromObj);
    this.operatorFunc = fromObj['operatorFunc'];
    this.lhsOperand = fromObj['lhsOperand'];
    this.lhsIsMulti = fromObj['lhsIsMulti'];
    this.operatorDef = fromObj['operatorDef'];
  }

  getOperatorFunc() {
    return this.operatorFunc;
  }

  setOperatorFunc(operatorFunc) {
    this.operatorFunc = operatorFunc;
  }

  getLhsOperand() {
    return this.lhsOperand;
  }

  setLhsOperand(lhsOperand) {
    this.lhsOperand = lhsOperand;
  }

  setLhsIsMulti(value) {
    this.lhsIsMulti = value;
  }

  getLhsIsMulti() {
    return this.lhsIsMulti;
  }

  getLhsValuesArr() {
    let lhsVal = this.getLhsOperand().evaluate();
    if (!ThinkEhrUtil.isArray(lhsVal)) {
      lhsVal = [lhsVal];
    } else if (!lhsVal) {
      lhsVal = [];
    }
    return lhsVal;
  }

  /*
   * @Override
   */
  next(val) {
    return null;
  }

  /*
   * @Override
   */
  toString() {
    return 'AstOperatorExpression';
  }
}

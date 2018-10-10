import {AstOperatorExpression} from './AstOperatorExpression';
/**
 * Created by matjazhi on 8.6.2016.
 */

export class AstUnaryExpression extends AstOperatorExpression {

  constructor(fromObj: Object) {
    super(fromObj);
  }
  
  evaluate() {
    let lhs = this.getLhsValuesArr();
    if (!lhs.length) {
      lhs.push(null);
    }
    return this.getOperatorFunc().call(null, lhs);
  }

  /*
   * @Override
   */
  toString() {
    return 'AstUnaryExpression';
  }
}

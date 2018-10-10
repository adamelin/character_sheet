import {AstExpression} from '../expression/AstExpression';
/**
 * Created by matjazhi on 8.6.2016.
 */

export class AstLiteral extends AstExpression {
  value: any;

  constructor(fromObj: Object) {
    super(fromObj);
    this.value = fromObj['value'];
  }

  getValue() {
    return this.value;
  }

  setValue(value) {
    this.value = value;
  }

  /*
   * @Override
   */
  evaluate() {
    return this.getValue();
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
    return 'AstLiteral';
  }
}

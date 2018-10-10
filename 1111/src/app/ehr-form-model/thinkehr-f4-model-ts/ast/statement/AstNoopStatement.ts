import {AstStatement} from './AstStatement';
/**
 * Created by matjazhi on 9.6.2016.
 */

export class AstNoopStatement extends AstStatement {

  constructor(fromObj?: Object) {
    super(fromObj);
  }

  process(context) {
    // Do nothing
  }

  /*
   * @Override
   */
  evaluate(context) {
    // Do nothing
  }

  /*
   * @Override
   */
  toString() {
    return 'AstNoopStatement';
  }

}

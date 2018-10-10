import {AstNode} from '../AstNode';
/**
 * Created by matjazhi on 8.6.2016.
 */

export class AstExpression extends AstNode {

  constructor(fromObj: Object) {
    super(fromObj);
  }

  isBinary() {
    return false;
  }

  /*
   * @Override
   */
  toString() {
    return 'AstExpression';
  }
}

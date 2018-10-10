import {AstNode} from '../AstNode';
/**
 * Created by matjazhi on 9.6.2016.
 */

export class AstStatement extends AstNode {

  constructor(fromObj?: any) {
    super(fromObj);
  }

  toString() {
    return 'AstStatement';
  }

}

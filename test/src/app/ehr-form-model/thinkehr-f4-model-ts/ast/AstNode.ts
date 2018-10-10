import {AstVisitor} from './AstVisitor';
/**
 * Created by matjazhi on 8.6.2016.
 */

export class AstNode {
  public rawDesc: any;

  constructor(fromObj?: Object) {
    this.rawDesc = fromObj ? fromObj['rawDesc'] : null;
  }

  process(context) {
    let val = this.evaluate();
    let nextNode = this.next(val);
    if (nextNode) {
      nextNode.process(context);
    }
  }

  evaluate(context?: any) {
    return null;
  }

  next(evaluatedValue) {
    return null;
  }

  accept(visitor: AstVisitor): boolean {
    return visitor.visit(this);
  }

  getRawDesc() {
    return this.rawDesc;
  }

  setRawDesc(rawDesc) {
    this.rawDesc = rawDesc;
  }

  /*
   * @Override
   */
  toString() {
    return 'AstNode';
  }
}

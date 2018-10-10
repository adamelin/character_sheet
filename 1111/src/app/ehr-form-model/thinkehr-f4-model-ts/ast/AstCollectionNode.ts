import {AstNode} from './AstNode';
/**
 * Created by matjazhi on 8.6.2016.
 */

export class AstCollectionNode extends AstNode {

  public collection: any[];

  constructor(fromObj?: Object) {
    super(fromObj);
    this.collection = fromObj && fromObj['collection'] ? fromObj['collection'] : [];
  }

  elements(elementToAdd?: any) {
    if (elementToAdd !== undefined) {
      this.collection.push(elementToAdd);
    }
    return this.collection;
  }

  /*
   * @Override
   */
  process(context) {
    let val = this.evaluate();
    let nextNode = this.next(val);
    while (nextNode) {
      nextNode.process(context);
      nextNode = this.next(val);
    }
  }

  /*
   * @Override
   */
  evaluate() {
    return this.collection.slice();
  }

  /*
   * @Override
   */
  next(collectionObj) {
    return collectionObj.shift();
  }

  /*
   * @Override
   */
  toString() {
    return 'AstCollectionNode';
  }
}

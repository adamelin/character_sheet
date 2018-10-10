import {AstCollectionNode} from "../AstCollectionNode";
/**
 * Created by matjazhi on 9.6.2016.
 */

export class AstActionsStatement extends AstCollectionNode {

  constructor(fromObj?:Object) {
    super(fromObj);
  }

  actions(action?:any) {
    return this.elements(action);
  }

  /*
   * @Override
   */
  toString() {
    return "AstActionsStatement";
  }

}

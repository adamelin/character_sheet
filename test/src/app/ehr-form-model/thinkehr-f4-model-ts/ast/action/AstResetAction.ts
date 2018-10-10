import {AstActionStatement} from "../statement/AstActionStatement";
/**
 * Created by matjazhi on 9.6.2016.
 */

export class AstResetAction extends AstActionStatement {

  constructor(fromObj:Object) {
    super(fromObj);
    this.setName("reset");

    this.setActionFunc(function (target) {
      target.resetValue();
    });
  }

  toString() {
    return "AstResetAction";
  }
}

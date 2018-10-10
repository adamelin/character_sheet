import {AstActionStatement} from "../statement/AstActionStatement";
/**
 * Created by matjazhi on 9.6.2016.
 */

export class AstHideAction extends AstActionStatement {

  constructor(fromObj:Object) {
    super(fromObj);
    this.setName("hide");
    this.setActionFunc(function (target) {
      if (!target.getViewConfig().isHidden()) {
        target.getViewConfig().setHidden(true);
      }
    });
  }

  toString() {
    return "AstHideAction";
  }

}

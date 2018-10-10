import {AstActionStatement} from "../statement/AstActionStatement";
/**
 * Created by matjazhi on 9.6.2016.
 */

export class AstClearAction extends AstActionStatement {

  constructor(fromObj:Object) {
    super(fromObj);

    this.setName("clear");

    this.setActionFunc(function (target) {
      target.clearValue(null);
    });
  }
  
  toString() {
    return "AstClearAction";
  }
}

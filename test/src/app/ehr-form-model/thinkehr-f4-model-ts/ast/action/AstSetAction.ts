import {AstActionStatement} from "../statement/AstActionStatement";
/**
 * Created by matjazhi on 9.6.2016.
 */

export class AstSetAction extends AstActionStatement {

  constructor(fromObj:Object) {
    super(fromObj);
    this.setName("set");
    this.setActionFunc( (target)=> {
      target.applyValue(this.rawDesc.value);
    });
  }

  toString() {
    return "AstSetAction";
  }
}

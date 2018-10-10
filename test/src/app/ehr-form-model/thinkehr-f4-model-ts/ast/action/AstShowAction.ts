import {AstActionStatement} from "../statement/AstActionStatement";
import {FormObjectModel} from "../../model/FormObjectModel";
/**
 * Created by matjazhi on 9.6.2016.
 */

export class AstShowAction extends AstActionStatement {

  constructor(fromObj:Object) {
    super(fromObj);
    this.setName("show");
    this.setActionFunc(function (target:FormObjectModel) {
      if (target.getViewConfig().isHidden()) {
        target.getViewConfig().setHidden(false);
      }
    });
  }

  toString() {
    return "AstShowAction";
  }

}

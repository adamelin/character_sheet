import {AstActionStatement} from "../statement/AstActionStatement";
import {FormObjectModel} from "../../model/FormObjectModel";
/**
 * Created by matjazhi on 9.6.2016.
 */

export class AstEnableAction extends AstActionStatement {

  constructor(fromObj:Object) {
    super(fromObj);
    this.setName("enable");
    this.setActionFunc(function (target:FormObjectModel) {
      if (target.getViewConfig().isReadOnly()) {
        target.getViewConfig().setReadOnly(false);
      }
    });
  }

  toString() {
    return "AstEnableAction";
  }
}

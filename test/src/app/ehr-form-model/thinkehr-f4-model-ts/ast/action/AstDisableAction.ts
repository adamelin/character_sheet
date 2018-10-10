import {AstActionStatement} from "../statement/AstActionStatement";
import {FormObjectModel} from "../../model/FormObjectModel";
/**
 * Created by matjazhi on 9.6.2016.
 */

export class AstDisableAction extends AstActionStatement {

  constructor(fromObj:Object) {
    super(fromObj);
    this.setName("disable");
    this.setActionFunc(function (target:FormObjectModel) {
      if (!target.getViewConfig().isReadOnly()) {
        target.getViewConfig().setReadOnly(true);
      }
    });
  }

  toString() {
    return "AstEnableAction";
  }
}

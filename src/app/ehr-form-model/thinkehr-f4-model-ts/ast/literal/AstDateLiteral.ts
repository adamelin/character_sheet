import {AstLiteral} from './AstLiteral';
import {ThinkEhrUtil} from '../../ThinkEhrUtil';
/**
 * Created by matjazhi on 9.6.2016.
 */

export class AstDateLiteral extends AstLiteral {

  constructor(fromObj: Object) {
    super(fromObj);
    this.setValue(ThinkEhrUtil.toDate(this.getValue()));
  }

  toString() {
    return 'AstDateLiteral';
  }

}

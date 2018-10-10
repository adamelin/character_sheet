import {AstLiteral} from './AstLiteral';
import {ThinkEhrUtil} from '../../ThinkEhrUtil';
/**
 * Created by matjazhi on 9.6.2016.
 */

export class AstTimeLiteral extends AstLiteral {

  constructor(fromObj: Object) {
    super(fromObj);
    this.setValue(ThinkEhrUtil.toTime(this.getValue()));
  }

  toString() {
    return 'AstTimeLiteral';
  }
}

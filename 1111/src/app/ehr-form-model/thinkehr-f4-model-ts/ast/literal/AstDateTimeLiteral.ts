import {AstLiteral} from './AstLiteral';
import {ThinkEhrUtil} from '../../ThinkEhrUtil';
/**
 * Created by matjazhi on 9.6.2016.
 */

export class AstDateTimeLiteral extends AstLiteral {

  constructor(fromObj: Object) {
    super(fromObj);
    this.setValue(new Date(ThinkEhrUtil.toLocalTimezoneOffsetISOString(this.getValue())));
  }

  toString() {
    return 'AstDateTimeLiteral';
  }

}

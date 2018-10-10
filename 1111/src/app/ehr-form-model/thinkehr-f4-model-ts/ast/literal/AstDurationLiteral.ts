import {AstLiteral} from './AstLiteral';
import {ThinkEhrUtil} from '../../ThinkEhrUtil';
import {AstNumericLiteral} from './AstNumericLiteral';
/**
 * Created by matjazhi on 9.6.2016.
 */

export class AstDurationLiteral extends AstLiteral {

  totalSecondsLiteral: any;

  constructor(fromObj: Object) {
    super(fromObj);
    this.totalSecondsLiteral = fromObj['totalSecondsLiteral'];

    if (this.totalSecondsLiteral === undefined) {
      let val = 0;
      if (this.value) {
        let multiplicators: any = {
          'year': 31104000,
          'month': 2592000,
          'week': 604800,
          'day': 86400,
          'hour': 3600,
          'minute': 60,
          'second': 1
        };

        Object.keys(this.value).forEach(function (key) {
          let units = parseInt(this.value[key], 10);
          if (!ThinkEhrUtil.isInteger(units)) {
            units = 0;
          }
          let unitDuration = multiplicators[key] || 0;

          val += units * unitDuration;

        }.bind(this));
      }
      this.totalSecondsLiteral = new AstNumericLiteral({value: val});
    }
  }

  getValue() {
    return this.totalSecondsLiteral.evaluate();
  }

  getTotalSecondsLiteral() {
    return this.totalSecondsLiteral;
  }

  setTotalSecondsLiteral(totalSecondsLiteral) {
    this.totalSecondsLiteral = totalSecondsLiteral;
  }

  toString() {
    return 'AstDurationLiteral';
  }

}

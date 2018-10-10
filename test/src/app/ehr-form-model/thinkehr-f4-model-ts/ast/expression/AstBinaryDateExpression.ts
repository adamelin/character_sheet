import {AstBinaryExpression} from "./AstBinaryExpression";
import {ThinkEhrUtil} from "../../ThinkEhrUtil";
/**
 * Created by matjazhi on 8.6.2016.
 */

export class AstBinaryDateExpression extends AstBinaryExpression {

  constructor(fromObj:Object) {
    super(fromObj);
  }

  _valuesToUTCTimestamp(stringValsArr:any[]) {
    var currDate;
    return stringValsArr.map(function (currVal) {
      if (!ThinkEhrUtil.isDate(currVal)) {
        currDate = new Date(ThinkEhrUtil.toLocalTimezoneOffsetISOString(currVal));
        if (!ThinkEhrUtil.isDate(currDate)) {
          currDate = ThinkEhrUtil.toTime(currVal);
        }
      } else {
        currDate = currVal;
      }
      return currDate ? currDate.getTime() : null;
    });
  }

  getRhsValuesArr() {
    var stringVals = super.getRhsValuesArr();
    return stringVals.map(function (d) {
      return d.getTime();
    });
  }

  getLhsValuesArr() {
    var stringVals = super.getLhsValuesArr();
    return this._valuesToUTCTimestamp(stringVals);
  }

  toString() {
    return "AstBinaryDateExpression";
  }
}

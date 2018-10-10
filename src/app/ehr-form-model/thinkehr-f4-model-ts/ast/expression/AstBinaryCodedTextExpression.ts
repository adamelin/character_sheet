import {AstBinaryExpression} from "./AstBinaryExpression";
/**
 * Created by matjazhi on 8.6.2016.
 */

export class AstBinaryCodedTextExpression extends AstBinaryExpression {

  constructor(fromObj:Object) {
    super(fromObj);
  }

  static toAstCodedObj(codeValModelArr) {
    if (!codeValModelArr) {
      codeValModelArr = [];
    }
    if (!codeValModelArr.length) {
      codeValModelArr.push({code: null, value: null});
    } else {
      codeValModelArr = codeValModelArr.map(function (val) {
        return {code: val['code'] || val['|code'], value: val['value'] || val['|value']};
      });
    }
    return codeValModelArr;
  };

  evaluate() {
    var lhs = this.getLhsValuesArr();
    if (!this.getLhsIsMulti()) {
      lhs = AstBinaryCodedTextExpression.toAstCodedObj(lhs);
    }
    var rhs = this.getRhsValuesArr();//this.getRhsOperand().evaluate();

    var lhsVal;
    var rhsVal;
    var collectProp = function (propName) {
      return function (val) {
        return val[propName];
      };
    };
    //TODO add string values to constant
    if (this.operatorDef && (this.operatorDef.op === "equals" || this.operatorDef.op === "notequals")) {
      if (!this.getLhsIsMulti()) {
        lhsVal = lhs.map(collectProp('code'));
        rhsVal = rhs.map(collectProp('code'));
      } else {
        lhsVal = lhs[0] && lhs[0].code ? lhs[0].code : lhs.code;
        rhsVal = rhs.map(collectProp('code'));
      }
    } else {
      if (!this.getLhsIsMulti()) {
        lhsVal = lhs.map(collectProp('value'));
        rhsVal = rhs.map(collectProp('value'));
      } else {
        lhsVal = lhs[0] && lhs[0].value ? lhs[0].value : lhs.value;
        rhsVal = rhs.map(collectProp('value'));
      }
    }
    if (!lhsVal || !lhsVal.length) {
      lhsVal = [null];
    }

    return this.getOperatorFunc().call(null, lhsVal, rhsVal);
  }

  /*
   * @Override
   */
  toString() {
    return "AstBinaryCodedTextExpression";
  }
}

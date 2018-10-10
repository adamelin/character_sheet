import {ThinkEhrUtil} from "../ThinkEhrUtil";
import {AstStringLiteral} from "../ast/literal/AstStringLiteral";
import {AstNumericLiteral} from "../ast/literal/AstNumericLiteral";
import {AstQuantityLiteral} from "../ast/literal/AstQuantityLiteral";
import {AstCodedTextLiteral} from "../ast/literal/AstCodedTextLiteral";
import {AstProportionLiteral} from "../ast/literal/AstProportionLiteral";
import {AstDateLiteral} from "../ast/literal/AstDateLiteral";
import {AstTimeLiteral} from "../ast/literal/AstTimeLiteral";
import {AstDateTimeLiteral} from "../ast/literal/AstDateTimeLiteral";
import {AstLiteral} from "../ast/literal/AstLiteral";
import {AstUnaryExpression} from "../ast/expression/AstUnaryExpression";
import {AstBinaryExpression} from "../ast/expression/AstBinaryExpression";
import {AstNoopStatement} from "../ast/statement/AstNoopStatement";
import {AstField} from "../ast/AstField";
import {AstFunctionExpression} from "../ast/expression/AstFunctionExpression";
import {AstCondition} from "../ast/AstCondition";
import {AstActionsStatement} from "../ast/statement/AstActionsStatement";
import {AstDurationLiteral} from "../ast/literal/AstDurationLiteral";
import {Ast} from "../ast/Ast";
import {RmType} from "../RmType";
import {AstBinaryQuantityExpression} from "../ast/expression/AstBinaryQuantityExpression";
import {AstUnaryQuantityExpression} from "../ast/expression/AstUnaryQuantityExpression";
import {AstUnaryCodedTextExpression} from "../ast/expression/AstUnaryCodedTextExpression";
import {AstBinaryCodedTextExpression} from "../ast/expression/AstBinaryCodedTextExpression";
import {AstUnaryProportionExpression} from "../ast/expression/AstUnaryProportionExpression";
import {AstBinaryProportionExpression} from "../ast/expression/AstBinaryProportionExpression";
import {AstBinaryDateExpression} from "../ast/expression/AstBinaryDateExpression";
import {AstUnaryDurationExpression} from "../ast/expression/AstUnaryDurationExpression";
import {AstBinaryDurationExpression} from "../ast/expression/AstBinaryDurationExpression";
import {AstShowAction} from "../ast/action/AstShowAction";
import {AstHideAction} from "../ast/action/AstHideAction";
import {AstEnableAction} from "../ast/action/AstEnableAction";
import {AstDisableAction} from "../ast/action/AstDisableAction";
import {AstSetAction} from "../ast/action/AstSetAction";
import {AstClearAction} from "../ast/action/AstClearAction";
import {AstResetAction} from "../ast/action/AstResetAction";
/**
 * Created by matjazhi on 8.6.2016.
 */

export class ThinkEhrDependencyParser {

  /* operator functions */
  _operatorFunctions: any = {};

  private static _instance:ThinkEhrDependencyParser;

  /*static getInstance():ThinkEhrDependencyParser {
    console.warn("ThinkEhrDependencyParser is DEPRECATED");
    if (!ThinkEhrDependencyParser._instance) {
      ThinkEhrDependencyParser._instance = new ThinkEhrDependencyParser();
    }
    return ThinkEhrDependencyParser._instance;
  }*/

  constructor() {
    this.initOperatorFunctions();
  }

  private _depOperators: any = {
    "lt": {
      "op": "lt",
      "label": "<",
      "opType": "bin",
      "partial": false,
      "types": [RmType.DV_DATE, RmType.DV_TIME, RmType.DV_DATE_TIME, RmType.DV_QUANTITY, RmType.DV_DURATION, RmType.DV_INTEGER, RmType.DV_COUNT, RmType.DV_PROPORTION]
    },
    "gt": {
      "op": "gt",
      "label": ">",
      "opType": "bin",
      "partial": false,
      "types": [RmType.DV_DATE, RmType.DV_TIME, RmType.DV_DATE_TIME, RmType.DV_QUANTITY, RmType.DV_DURATION, RmType.DV_INTEGER, RmType.DV_COUNT, RmType.DV_PROPORTION, RmType.DV_EHR_URI]
    },
    "le": {
      "op": "le",
      "label": "<=",
      "opType": "bin",
      "partial": false,
      "types": [RmType.DV_DATE, RmType.DV_TIME, RmType.DV_DATE_TIME, RmType.DV_QUANTITY, RmType.DV_DURATION, RmType.DV_INTEGER, RmType.DV_COUNT, RmType.DV_PROPORTION]
    },
    "ge": {
      "op": "ge",
      "label": ">=",
      "opType": "bin",
      "partial": false,
      "types": [RmType.DV_DATE, RmType.DV_TIME, RmType.DV_DATE_TIME, RmType.DV_QUANTITY, RmType.DV_DURATION, RmType.DV_INTEGER, RmType.DV_COUNT, RmType.DV_PROPORTION]
    },
    "eq": {
      "op": "eq",
      "label": "=",
      "opType": "bin",
      "partial": false,
      "types": [RmType.DV_DATE, RmType.DV_TIME, RmType.DV_DATE_TIME, RmType.DV_QUANTITY, RmType.DV_DURATION, RmType.DV_INTEGER, RmType.DV_COUNT, RmType.DV_PROPORTION]
    },
    "ne": {
      "op": "ne",
      "label": "!=",
      "opType": "bin",
      "partial": false,
      "types": [RmType.DV_DATE, RmType.DV_TIME, RmType.DV_DATE_TIME, RmType.DV_QUANTITY, RmType.DV_DURATION, RmType.DV_INTEGER, RmType.DV_COUNT, RmType.DV_PROPORTION]
    },
    "empty": {
      "op": "empty",
      "label": "empty",
      "opType": "un",
      "partial": false,
      "types": [RmType.DV_TEXT, RmType.DV_URI, RmType.DV_MULTIMEDIA, RmType.DV_EHR_URI, RmType.DV_CODED_TEXT, RmType.DV_DATE, RmType.DV_TIME, RmType.DV_DATE_TIME, RmType.DV_QUANTITY, RmType.DV_DURATION, RmType.DV_INTEGER, RmType.DV_COUNT, RmType.DV_ORDINAL,
        RmType.DV_PROPORTION, RmType.DV_BOOLEAN]
    },
    "notempty": {
      "op": "notempty",
      "label": "not empty",
      "opType": "un",
      "partial": false,
      "types": [RmType.DV_TEXT, RmType.DV_URI, RmType.DV_MULTIMEDIA, RmType.DV_EHR_URI, RmType.DV_CODED_TEXT, RmType.DV_ORDINAL, RmType.DV_DURATION, RmType.DV_DATE, RmType.DV_TIME, RmType.DV_DATE_TIME, RmType.DV_QUANTITY, RmType.DV_COUNT]
    },
    "equals": {
      "op": "equals",
      "label": "equals",
      "opType": "bin",
      "partial": false,
      "types": [RmType.DV_TEXT, RmType.DV_URI, RmType.DV_MULTIMEDIA, RmType.DV_EHR_URI, RmType.DV_CODED_TEXT, RmType.DV_ORDINAL]
    },
    "notequals": {
      "op": "notequals",
      "label": "not equals",
      "opType": "bin",
      "partial": false,
      "types": [RmType.DV_TEXT, RmType.DV_URI, RmType.DV_MULTIMEDIA, RmType.DV_EHR_URI, RmType.DV_CODED_TEXT, RmType.DV_ORDINAL]
    },
    "contains": {
      "op": "contains",
      "label": "contains",
      "opType": "bin",
      "partial": true,
      "types": [RmType.DV_TEXT, RmType.DV_URI, RmType.DV_MULTIMEDIA, RmType.DV_EHR_URI, RmType.DV_CODED_TEXT, RmType.DV_ORDINAL]
    },
    "startswith": {
      "op": "startswith",
      "label": "starts with",
      "opType": "bin",
      "partial": true,
      "types": [RmType.DV_TEXT, RmType.DV_URI, RmType.DV_MULTIMEDIA, RmType.DV_EHR_URI, RmType.DV_CODED_TEXT, RmType.DV_ORDINAL]
    },
    "endswith": {
      "op": "endswith",
      "label": "ends with",
      "opType": "bin",
      "partial": true,
      "types": [RmType.DV_TEXT, RmType.DV_URI, RmType.DV_MULTIMEDIA, RmType.DV_EHR_URI, RmType.DV_CODED_TEXT, RmType.DV_ORDINAL]
    },
    "is": {
      "op": "is",
      "label": "is",
      "opType": "bin",
      "partial": false,
      "types": [RmType.DV_BOOLEAN]
    },
    "isnot": {
      "op": "isnot",
      "label": "is not",
      "opType": "bin",
      "partial": false,
      "types": [RmType.DV_BOOLEAN]
    }
  };

  private static ALL_TRUE_EVAL_ARRAY: string = 'allTrue';
  private static ANY_TRUE_EVAL_ARRAY: string = 'anyTrue';


  _lhsFunctions:any = {
    [RmType.DV_QUANTITY]: function (model) {
      return function () {
        return {
          magnitude: model.magnitudeValue(undefined, undefined),
          unit: model.unitValue(undefined, undefined)
        }
      }
    },

    [RmType.DV_CODED_TEXT]: function (model) {
      return function () {
        return {
          code: model.codeValue(),
          value: model.labelValue()
        }
      }
    },

    [RmType.DV_TEXT]: function (model) {
      return function () {
        return model.textValue(undefined, undefined);
      }
    },

    [RmType.DV_MULTIMEDIA]: function (model) {
      return function () {
        return model.uriValue(undefined, undefined);
      }
    },

    [RmType.DV_ORDINAL]: function (model) {
      return function () {
        return {
          code: model.codeValue(),
          value: model.labelValue()
        }
      }
    },

    [RmType.DV_PROPORTION]: function (model) {
      return function () {
        return {
          numerator: model.numeratorValue(undefined, undefined),
          denominator: model.denominatorValue(undefined, undefined)
        }
      }
    },

    [RmType.DV_COUNT]: function (model) {
      return function () {
        return model.countValue(undefined, undefined);
      }
    },

    [RmType.DV_BOOLEAN]: function (model) {
      return function () {
        return model.booleanValue();
      }
    },

    [RmType.DV_DATE]: function (model) {
      return function () {
        return model.dateObjectValue(undefined, undefined);
      }
    },

    [RmType.DV_TIME]: function (model) {
      return function () {
        return model.timeObjectValue(undefined, undefined);
      }
    },

    [RmType.DV_DATE_TIME]: function (model) {
      return function () {
        return model.dateTimeObjectValue(undefined, undefined);
      }
    },

    [RmType.DV_DURATION]: function (model) {
      return function () {
        return model.durationValue(undefined, undefined);
      }
    },

    [RmType.DV_URI]: function (model) {
      return function () {
        return model.uriValue(undefined, undefined);
      }
    },


    [RmType.DV_EHR_URI]: function (model) {
      return function () {
        return model.ehrUriValue(undefined, undefined);
      }
    },

    "_default": function (model) {
      return function () {
        return model.getValue();
      }
    }
  };


  _literalFactories: any = {
    [RmType.DV_QUANTITY]: function (operator, value) {
      return new AstQuantityLiteral({
        magnitudeLiteral: new AstNumericLiteral({value: value.magnitude}),
        unitLiteral: new AstStringLiteral({value: value.unit})
      });
    },
    [RmType.DV_CODED_TEXT]: function (operator, value) {
      return new AstCodedTextLiteral({
        codeLiteral: new AstStringLiteral({value: value.code}),
        valueLiteral: new AstStringLiteral({value: value.value})
      });
    },
    [RmType.DV_ORDINAL]: function (operator, value) {
      return this._literalFactories[RmType.DV_CODED_TEXT].call(this, operator, value);
    },
    [RmType.DV_PROPORTION]: function (operator, value) {
      return new AstProportionLiteral({
        numeratorLiteral: new AstNumericLiteral({value: value.numerator}),
        denominatorLiteral: new AstNumericLiteral({value: value.denominator})
      });
    },
    [RmType.DV_DATE]: function (operator, value) {
      return new AstDateLiteral({value: value.value});
    },
    [RmType.DV_TIME]: function (operator, value) {
      return new AstTimeLiteral({value: value.value});
    },
    [RmType.DV_DATE_TIME]: function (operator, value) {
      return new AstDateTimeLiteral({value: value.value});
    },
    [RmType.DV_DURATION]: function (operator, value) {
      return new AstDurationLiteral({value: value});
    },
    "_string": function (operator, value) {
      return new AstStringLiteral({value: value});
    },
    "_numeric": function (operator, value) {
      return new AstNumericLiteral({value: value});
    },
    "_default": function (operator, value) {
      if (ThinkEhrUtil.isString(value)) {
        return new AstStringLiteral({value: value});
      } else if (ThinkEhrUtil.isNumber(value)) {
        return new AstNumericLiteral({value: value});
      } else if (ThinkEhrUtil.isObject(value) && value.value !== undefined) {
        var val = value.value;
        if (ThinkEhrUtil.isString(val)) {
          return new AstStringLiteral({value: val});
        } else if (ThinkEhrUtil.isNumber(val)) {
          return new AstNumericLiteral({value: val});
        } else {
          return new AstLiteral({value: val});
        }
      } else {
        return new AstLiteral({value: value});
      }
    }
  };

  private getOperatorFunctionOnArray(evalArrayValuesAsTrue, operatorFunction) {
    return function (lHValuesArray, rHValuesArr) {
      var allEvaluationsTrue = evalArrayValuesAsTrue === ThinkEhrDependencyParser.ALL_TRUE_EVAL_ARRAY;
      var evaluationResult;

      var evaluateWithRHValuesArr = function (lrValue, rVArray) {
        var ret = false;
        if (rVArray && rVArray.length) {
          for (var j = 0; j < rVArray.length; j++) {
            ret = operatorFunction.call(null, lrValue, rVArray[j]);
            if (ret == true) {
              break;
            }
          }
        } else {
          ret = operatorFunction.call(null, lrValue);
        }
        return ret;
      };
      for (var i = 0; i < lHValuesArray.length; i++) {

        evaluationResult = evaluateWithRHValuesArr(lHValuesArray[i], rHValuesArr);
        if (!allEvaluationsTrue && evaluationResult == true) {
          return evaluationResult;
        }
        if (allEvaluationsTrue === true && evaluationResult != true) {
          return evaluationResult;
        }
      }

      return evaluationResult;
    }

  };

  private addDependencyOperatorFn(operatorFunctionsObject, operatorFnKey, operatorFn, evalArrayConst) {
    operatorFunctionsObject[operatorFnKey] = {};
    operatorFunctionsObject[operatorFnKey].operFn = operatorFn;
    operatorFunctionsObject[operatorFnKey].arrayOperFn = this.getOperatorFunctionOnArray(evalArrayConst, operatorFunctionsObject[operatorFnKey].operFn.bind(this));
  };

  private initOperatorFunctions() {

    this.addDependencyOperatorFn(this._operatorFunctions,
      "lt",
      function (o1, o2) {
        if (o1 === null || o1 === undefined) {
          return false;
        }
        return o1 < o2;
      },
      ThinkEhrDependencyParser.ANY_TRUE_EVAL_ARRAY);

    this.addDependencyOperatorFn(this._operatorFunctions,
      "lt/" + RmType.DV_QUANTITY,
      function (o1, o2) {
        if (o1 === null || o1 === undefined || !o1.unit) {
          return false;
        }
        return o1.unit == o2.unit && this._operatorFunctions["lt"].operFn.call(null, o1.magnitude, o2.magnitude);
      },
      ThinkEhrDependencyParser.ANY_TRUE_EVAL_ARRAY);

    this.addDependencyOperatorFn(this._operatorFunctions,
      "lt/" + RmType.DV_DATE,
      function (d1, d2) {
        if (d1 === null || d1 === undefined) {
          return false;
        }
        return +d1 < +d2;
      },
      ThinkEhrDependencyParser.ANY_TRUE_EVAL_ARRAY);

    this.addDependencyOperatorFn(this._operatorFunctions,
      "lt/" + RmType.DV_TIME,
      function (t1, t2) {
        return this._operatorFunctions["lt/" + RmType.DV_DATE].operFn.call(null, t1, t2);
      },
      ThinkEhrDependencyParser.ANY_TRUE_EVAL_ARRAY);

    this.addDependencyOperatorFn(this._operatorFunctions,
      "lt/" + RmType.DV_DATE_TIME,
      function (dt1, dt2) {
        return this._operatorFunctions["lt/" + RmType.DV_DATE].operFn.call(null, dt1, dt2);
      },
      ThinkEhrDependencyParser.ANY_TRUE_EVAL_ARRAY);

    this.addDependencyOperatorFn(this._operatorFunctions,
      "gt",
      function (o1, o2) {
        if (o1 === null || o1 === undefined) {
          return false;
        }
        return o1 > o2;
      },
      ThinkEhrDependencyParser.ANY_TRUE_EVAL_ARRAY);

    this.addDependencyOperatorFn(this._operatorFunctions,
      "gt/" + RmType.DV_QUANTITY,
      function (o1, o2) {
        if (o1 === null || o1 === undefined || !o1.unit) {
          return false;
        }
        return o1.unit == o2.unit && this._operatorFunctions["gt"].operFn.call(null, o1.magnitude, o2.magnitude);
      },
      ThinkEhrDependencyParser.ANY_TRUE_EVAL_ARRAY);

    this.addDependencyOperatorFn(this._operatorFunctions,
      "gt/" + RmType.DV_DATE,
      function (d1, d2) {
        if (d1 === null || d1 === undefined) {
          return false;
        }
        return +d1 > +d2;
      },
      ThinkEhrDependencyParser.ANY_TRUE_EVAL_ARRAY);

    this.addDependencyOperatorFn(this._operatorFunctions,
      "gt/" + RmType.DV_TIME,
      function (t1, t2) {
        return this._operatorFunctions["gt/" + RmType.DV_DATE].operFn.call(null, t1, t2);
      },
      ThinkEhrDependencyParser.ANY_TRUE_EVAL_ARRAY);

    this.addDependencyOperatorFn(this._operatorFunctions,
      "gt/" + RmType.DV_DATE_TIME,
      function (dt1, dt2) {
        return this._operatorFunctions["gt/" + RmType.DV_DATE].operFn.call(null, dt1, dt2);
      },
      ThinkEhrDependencyParser.ANY_TRUE_EVAL_ARRAY);

    this.addDependencyOperatorFn(this._operatorFunctions,
      "gt/" + RmType.DV_EHR_URI,
      function (dt1, dt2) {
        return this._operatorFunctions["startswith"].operFn.call(null, dt1, dt2) && dt1.length > dt2.length;
      },
      ThinkEhrDependencyParser.ANY_TRUE_EVAL_ARRAY);

    this.addDependencyOperatorFn(this._operatorFunctions,
      "le",
      function (o1, o2) {
        if (o1 === null || o1 === undefined) {
          return false;
        }
        return o1 <= o2;
      },
      ThinkEhrDependencyParser.ANY_TRUE_EVAL_ARRAY);

    this.addDependencyOperatorFn(this._operatorFunctions,
      "le/" + RmType.DV_QUANTITY,
      function (o1, o2) {
        if (o1 === null || o1 === undefined || !o1.unit) {
          return false;
        }
        return o1.unit == o2.unit && this._operatorFunctions["le"].operFn.call(null, o1.magnitude, o2.magnitude);
      },
      ThinkEhrDependencyParser.ANY_TRUE_EVAL_ARRAY);

    this.addDependencyOperatorFn(this._operatorFunctions,
      "le/" + RmType.DV_DATE,
      function (d1, d2) {
        if (d1 === null || d1 === undefined) {
          return false;
        }
        return +d1 <= +d2;
      },
      ThinkEhrDependencyParser.ANY_TRUE_EVAL_ARRAY);

    this.addDependencyOperatorFn(this._operatorFunctions,
      "le/" + RmType.DV_TIME,
      function (t1, t2) {
        return this._operatorFunctions["le/" + RmType.DV_DATE].operFn.call(null, t1, t2);
      },
      ThinkEhrDependencyParser.ANY_TRUE_EVAL_ARRAY);

    this.addDependencyOperatorFn(this._operatorFunctions,
      "le/" + RmType.DV_DATE_TIME,
      function (dt1, dt2) {
        return this._operatorFunctions["le/" + RmType.DV_DATE].operFn.call(null, dt1, dt2);
      },
      ThinkEhrDependencyParser.ANY_TRUE_EVAL_ARRAY);

    this.addDependencyOperatorFn(this._operatorFunctions,
      "ge",
      function (o1, o2) {
        if (o1 === null || o1 === undefined) {
          return false;
        }
        return o1 >= o2;
      },
      ThinkEhrDependencyParser.ANY_TRUE_EVAL_ARRAY);

    this.addDependencyOperatorFn(this._operatorFunctions,
      "ge/" + RmType.DV_QUANTITY,
      function (o1, o2) {
        if (o1 === null || o1 === undefined || !o1.unit) {
          return false;
        }
        return o1.unit == o2.unit && this._operatorFunctions["ge"].operFn.call(null, o1.magnitude, o2.magnitude);
      },
      ThinkEhrDependencyParser.ANY_TRUE_EVAL_ARRAY);

    this.addDependencyOperatorFn(this._operatorFunctions,
      "ge/" + RmType.DV_DATE,
      function (d1, d2) {
        if (d1 === null || d1 === undefined) {
          return false;
        }
        return +d1 >= +d2;
      },
      ThinkEhrDependencyParser.ANY_TRUE_EVAL_ARRAY);

    this.addDependencyOperatorFn(this._operatorFunctions,
      "ge/" + RmType.DV_TIME,
      function (t1, t2) {
        return this._operatorFunctions["ge/" + RmType.DV_DATE].operFn.call(null, t1, t2);
      },
      ThinkEhrDependencyParser.ANY_TRUE_EVAL_ARRAY);

    this.addDependencyOperatorFn(this._operatorFunctions,
      "ge/" + RmType.DV_DATE_TIME,
      function (dt1, dt2) {
        return this._operatorFunctions["ge/" + RmType.DV_DATE].operFn.call(null, dt1, dt2);
      },
      ThinkEhrDependencyParser.ANY_TRUE_EVAL_ARRAY);

    this.addDependencyOperatorFn(this._operatorFunctions,
      "eq",
      function (o1, o2) {
        return o1 == o2;
      },
      ThinkEhrDependencyParser.ANY_TRUE_EVAL_ARRAY);

    this.addDependencyOperatorFn(this._operatorFunctions,
      "eq/" + RmType.DV_QUANTITY,
      function (o1, o2) {
        if (o1 == o2) {
          return true;
        }
        return o1.unit == o2.unit && this._operatorFunctions["eq"].operFn.call(null, o1.magnitude, o2.magnitude);
      },
      ThinkEhrDependencyParser.ANY_TRUE_EVAL_ARRAY);

    this.addDependencyOperatorFn(this._operatorFunctions,
      "eq/" + RmType.DV_DATE,
      function (d1, d2) {
        if (d1 === null || d1 === undefined) {
          return false;
        }
        return +d1 == +d2;
      },
      ThinkEhrDependencyParser.ANY_TRUE_EVAL_ARRAY);

    this.addDependencyOperatorFn(this._operatorFunctions,
      "eq/" + RmType.DV_TIME,
      function (t1, t2) {
        return this._operatorFunctions["eq/" + RmType.DV_DATE].operFn.call(null, t1, t2);
      },
      ThinkEhrDependencyParser.ANY_TRUE_EVAL_ARRAY);

    this.addDependencyOperatorFn(this._operatorFunctions,
      "eq/" + RmType.DV_DATE_TIME,
      function (dt1, dt2) {
        return this._operatorFunctions["eq/" + RmType.DV_DATE].operFn.call(null, dt1, dt2);
      },
      ThinkEhrDependencyParser.ANY_TRUE_EVAL_ARRAY);

    this.addDependencyOperatorFn(this._operatorFunctions,
      "ne",
      function (o1, o2) {
        return o1 != o2;
      },
      ThinkEhrDependencyParser.ALL_TRUE_EVAL_ARRAY);


    this.addDependencyOperatorFn(this._operatorFunctions,
      "ne/" + RmType.DV_QUANTITY,
      function (o1, o2) {
        return o1.unit != o2.unit || this._operatorFunctions["ne"].operFn.call(null, o1.magnitude, o2.magnitude);
      },
      ThinkEhrDependencyParser.ANY_TRUE_EVAL_ARRAY);

    this.addDependencyOperatorFn(this._operatorFunctions,
      "ne/" + RmType.DV_DATE,
      function (d1, d2) {
        if (d1 === null || d1 === undefined) {
          return d2 !== null || d2 !== undefined;
        }
        return +d1 != +d2;
      },
      ThinkEhrDependencyParser.ALL_TRUE_EVAL_ARRAY);

    this.addDependencyOperatorFn(this._operatorFunctions,
      "ne/" + RmType.DV_TIME,
      function (t1, t2) {
        return this._operatorFunctions["ne/" + RmType.DV_DATE].operFn.call(null, t1, t2);
      },
      ThinkEhrDependencyParser.ALL_TRUE_EVAL_ARRAY);

    this.addDependencyOperatorFn(this._operatorFunctions,
      "ne/" + RmType.DV_DATE_TIME,
      function (dt1, dt2) {
        return this._operatorFunctions["ne/" + RmType.DV_DATE].operFn.call(null, dt1, dt2);
      },
      ThinkEhrDependencyParser.ALL_TRUE_EVAL_ARRAY);

    this.addDependencyOperatorFn(this._operatorFunctions,
      "empty",
      function (o) {
        var und = o === null || o === undefined;
        if (!und) {
          if (ThinkEhrUtil.isString(o) || ThinkEhrUtil.isArray(o)) {
            return o.length === 0;
          }
        }
        return und;
      },
      ThinkEhrDependencyParser.ALL_TRUE_EVAL_ARRAY);

    this.addDependencyOperatorFn(this._operatorFunctions,
      "empty/" + RmType.DV_QUANTITY,
      function (o) {

        var isLhsEmpty = function (val) {
          return !val;
        };

        var isMagnitudeEmpty = function (val) {
          return !ThinkEhrUtil.isNumber(val.magnitude);
        };

        var isUnitEmpty = function (val) {
          return !ThinkEhrUtil.isString(val.unit) || val.unit.length === 0;
        };

        return isLhsEmpty(o) || isMagnitudeEmpty(o) || isUnitEmpty(o) || this._operatorFunctions["empty"].operFn.call(null, o.magnitude.toString());
      },
      ThinkEhrDependencyParser.ALL_TRUE_EVAL_ARRAY);

    this.addDependencyOperatorFn(this._operatorFunctions,
      "notempty",
      function (o) {
        var def = o !== null && o !== undefined;
        if (def) {
          if (ThinkEhrUtil.isString(o) || ThinkEhrUtil.isArray(o)) {
            return o.length > 0;
          }
        }
        return def;
      },
      ThinkEhrDependencyParser.ALL_TRUE_EVAL_ARRAY);

    this.addDependencyOperatorFn(this._operatorFunctions,
      "notempty/" + RmType.DV_QUANTITY,
      function (o) {
        return !this._operatorFunctions["empty/" + RmType.DV_QUANTITY].operFn.call(null, o);
      },
      ThinkEhrDependencyParser.ALL_TRUE_EVAL_ARRAY);

    this.addDependencyOperatorFn(this._operatorFunctions,
      "equals",
      function (o1, o2) {
        if (ThinkEhrUtil.isString(o1) && ThinkEhrUtil.isString(o2)) {
          o1 = o1.toLowerCase();
          o2 = o2.toLowerCase();
        }
        return o1 === o2;
      },
      ThinkEhrDependencyParser.ANY_TRUE_EVAL_ARRAY);

    this.addDependencyOperatorFn(this._operatorFunctions,
      "notequals",
      function (o1, o2) {
        if (ThinkEhrUtil.isString(o1) && ThinkEhrUtil.isString(o2)) {
          o1 = o1.toLowerCase();
          o2 = o2.toLowerCase();
        }
        return o1 !== o2;
      },
      ThinkEhrDependencyParser.ALL_TRUE_EVAL_ARRAY);

    this.addDependencyOperatorFn(this._operatorFunctions,
      "startswith",
      function (o1, o2) {
        if (ThinkEhrUtil.isString(o1) && ThinkEhrUtil.isString(o2)) {
          o1 = o1.toLowerCase();
          o2 = o2.toLowerCase();
        }
        return o1 && o1.indexOf(o2) === 0;
      },
      ThinkEhrDependencyParser.ANY_TRUE_EVAL_ARRAY);

    this.addDependencyOperatorFn(this._operatorFunctions,
      "endswith",
      function (o1, o2) {
        if (o1) {
          if (ThinkEhrUtil.isString(o1) && ThinkEhrUtil.isString(o2)) {
            o1 = o1.toLowerCase();
            o2 = o2.toLowerCase();
          }

          var index = o1.indexOf(o2);
          if (index >= 0) {
            return index + o2.length === o1.length;
          }
        }
        return false;
      },
      ThinkEhrDependencyParser.ANY_TRUE_EVAL_ARRAY);

    this.addDependencyOperatorFn(this._operatorFunctions,
      "contains",
      function (o1, o2) {
        if (ThinkEhrUtil.isString(o1) && ThinkEhrUtil.isString(o2)) {
          o1 = o1.toLowerCase();
          o2 = o2.toLowerCase();
        }
        return o1 && o1.indexOf(o2) >= 0;
      },
      ThinkEhrDependencyParser.ANY_TRUE_EVAL_ARRAY);

    this.addDependencyOperatorFn(this._operatorFunctions,
      "is",
      function (o1, o2) {
        return o1 === o2;
      },
      ThinkEhrDependencyParser.ANY_TRUE_EVAL_ARRAY);

    this.addDependencyOperatorFn(this._operatorFunctions,
      "isnot",
      function (o1, o2) {
        return o1 !== o2;
      },
      ThinkEhrDependencyParser.ALL_TRUE_EVAL_ARRAY);

  }

  getDependancyOperatorFunction(operator, rmType:RmType) {
    var key = operator.op + "/" + rmType;
    var fnHostObj = this._operatorFunctions[key] || this._operatorFunctions[operator.op];
    return fnHostObj.arrayOperFn;
  }

  private _getLhsComparisonFunction(operator, rmType: RmType, model) {
    var key = operator.op + "/" + RmType[rmType];
    var lhsFunc = this._lhsFunctions[key] || this._lhsFunctions[rmType] || this._lhsFunctions["_default"];
    if (lhsFunc) {
      return lhsFunc.call(null, model);
    } else {
      return undefined;
    }
  }

  private _getRhsComparisonLiteralFactory(operator, rmType: RmType) {
    var key = operator.op + "/" + RmType[rmType];
    return this._literalFactories[key] || this._literalFactories[rmType] || this._literalFactories["_default"];
  }

  private _conditionExpressionClasses = {
    "[un]DV_QUANTITY": AstUnaryQuantityExpression,
    "[bin]DV_QUANTITY": AstBinaryQuantityExpression,
    "DV_QUANTITY": AstBinaryQuantityExpression,
    "[un]DV_CODED_TEXT": AstUnaryCodedTextExpression,
    "[bin]DV_CODED_TEXT": AstBinaryCodedTextExpression,
    "DV_CODED_TEXT": AstBinaryCodedTextExpression,
    "[un]DV_ORDINAL": AstUnaryCodedTextExpression,
    "[bin]DV_ORDINAL": AstBinaryCodedTextExpression,
    "DV_ORDINAL": AstBinaryCodedTextExpression,
    "[un]DV_PROPORTION": AstUnaryProportionExpression,
    "[bin]DV_PROPORTION": AstBinaryProportionExpression,
    "DV_PROPORTION": AstBinaryProportionExpression,
    "[bin]DV_DATE_TIME": AstBinaryDateExpression,
    "[bin]DV_DATE": AstBinaryDateExpression,
    "[bin]DV_TIME": AstBinaryDateExpression,
    "[un]DV_DURATION": AstUnaryDurationExpression,
    "[bin]DV_DURATION": AstBinaryDurationExpression,
    "DV_DURATION": AstBinaryDurationExpression
  };

  private _getConditionExpressionClass(operator, rmType: RmType) {
    var key = operator.op + "/" + RmType[rmType];
    var ce = this._conditionExpressionClasses[key] || this._conditionExpressionClasses["[" + operator.opType + "]" + RmType[rmType]] || this._conditionExpressionClasses[RmType[rmType]];
    if (ce) {
      return ce;
    } else {
      return operator.opType === "bin" ? AstBinaryExpression : AstUnaryExpression;
    }
  }

  _actionStatementClasses = {
    "show": AstShowAction,
    "hide": AstHideAction,
    "enable": AstEnableAction,
    "disable": AstDisableAction,
    "set": AstSetAction,
    "clear": AstClearAction,
    "reset": AstResetAction
  };

  private _getActionStatementClass(action, targetRmType: RmType) {
    var key = action.action + "/" + RmType[targetRmType];
    var aSt = this._actionStatementClasses[key] || this._actionStatementClasses[action.action];
    if (aSt) {
      return eval(aSt);
    } else {
      return AstNoopStatement;
    }
  }


  static _findDependencyDef(formId, deps) {

    for (var i = 0; i < deps.length; i++) {
      var f = deps[i];
      if (f.field == formId) {
        return f;
      }
    }

  }

  private _collectFieldDependencies(deps) {
    var collectedDeps = [];
    //collect conditions for the same fieldId that are defined separately
    for (var i = 0; i < deps.length; i++) {
      var currDepConfig = deps[i];
      var cleanDepConfig = ThinkEhrDependencyParser._findDependencyDef(currDepConfig.field, collectedDeps);
      if (cleanDepConfig) {
        cleanDepConfig.conditions = cleanDepConfig.conditions.concat(currDepConfig.conditions.slice());
      } else {
        collectedDeps.push(currDepConfig);
      }
    }
    return collectedDeps;
  }

  parseDependencies(rootModel, deps) {
    deps = this._collectFieldDependencies(deps);
    var ast = new Ast({
      rawDesc: deps
    });

    if (ThinkEhrUtil.isArray(deps)) {
      deps.forEach((fieldJson) => {
        var fieldId = fieldJson.field;
        var models = rootModel.findSuccessorsWithPath(fieldId);

        if (models.length > 0) {
          models.forEach((model) => {
            this.parseDependencyField(ast, fieldJson, model);
          });
        } else {
          console.warn("Could not find model for", fieldId, "skipping dependency creation for it.");
        }

      });
    }

    return ast;
  }

  parseDependencyField(ast, fieldJson, model) {
    var fieldId = fieldJson.field;

    var astField = new AstField({
      rawDesc: fieldJson,
      field: fieldId
    });

    if (astField.getFieldId() === null || astField.getFieldId() === "") {
      throw new Error("Could not determine dependency field id" + fieldJson);
    }

    if (ThinkEhrUtil.isArray(fieldJson.conditions)) {
      var rmType: RmType = model.getRmType();
      fieldJson.conditions.forEach((condition)=> {
        var astCondition = this._depCondition(fieldId, condition, rmType, model);
        if (astCondition) {
          astField.conditions(astCondition);
        }
      });

      if (astField.conditions().length > 0) {
        ast.fields(astField);
        model.setDependencyNode(astField);
      }
    }

    return astField;
  }

  static getThenStatementsWithModelPath(ast, modelPath) {
    var fields = ast.fields();
    var thenStatementsWithModelPath = [];
    if (fields) {
      fields.forEach((currField) => {
        currField.conditions().forEach((currCond) => {
          if (currCond.thenStatement) {
            currCond.thenStatement.elements().forEach((currThenStatement) => {
              currThenStatement.getTargets().forEach((actionTarget) => {
                if (actionTarget.getPath() === modelPath) {
                  thenStatementsWithModelPath.push(currThenStatement)
                }
              });
            });
          }
        });
      });
    }
    return thenStatementsWithModelPath;
  }

  private _depCondition(fieldId, condition, rmType: RmType, model) {
    var op = this._depOperator(fieldId, condition, rmType);
    if (op) {
      var lhsFunc = this._getLhsComparisonFunction(op.operator, rmType, model);
      if (!lhsFunc) {
        console.warn("Could not find lhs comparison function for operator", op.operator, "and RM type", RmType[rmType], ", skipping condition creation.");
        return null;
      }
      var lhsFunctionExpr = new AstFunctionExpression({func: lhsFunc});
      var astCondExprClass = this._getConditionExpressionClass(op.operator, rmType);
      var astCondExpr = new astCondExprClass({
        lhsOperand: lhsFunctionExpr,
        operatorFunc: op.operatorFunction,
        operatorDef: op.operator,
        lhsIsMulti: model.isMulti()
      });

      if (astCondExpr.isBinary()) {
        var rhsLitFact = this._getRhsComparisonLiteralFactory(op.operator, rmType);
        var rhsLit = rhsLitFact.call(this, op.operator, condition.value);
        if (!rhsLit) {
          console.warn("Could not create rhs literal for operator", op.operator, "and RM type", rmType,
            "and value", condition.value, ", skipping condition creation.");
          return null;
        }
        rhsLit.setRawDesc(condition.value);
        astCondExpr.setRhsOperand(rhsLit);
      }

      var thenStatement = this._depActions(condition.actions, model);

      return new AstCondition({
        rawDesc: condition,
        expression: astCondExpr,
        thenStatement: thenStatement
      });

    } else {
      return null;
    }
  }

  private _depOperator(fieldId, condition, rmType: RmType) {
    var op = this._depOperators[condition.operator];
    if (!op) {
      console.warn("Unknown or missing operator", condition.operator, "skipping dependency condition creation for", fieldId);
      return null;
    }

    if (op.types.indexOf(rmType) < 0) {
      console.warn("Operator", op.op, "not supported for RM type", RmType[rmType], "skipping condition creation for", fieldId);
      return null;
    }

    var opFunc = this.getDependancyOperatorFunction(op, rmType);
    if (!opFunc) {
      console.warn("No operator function defined for operator", op.op, "skipping condition creation for", fieldId);
      return null;
    }

    return {
      operator: op,
      operatorFunction: opFunc
    };
  }

  private _depActions(actions, model) {

    if (ThinkEhrUtil.isArray(actions) && actions.length > 0) {

      var actionsSt = new AstActionsStatement({rawDesc: actions});

      actions.forEach((action) => {
        var targetModel = model.findClosestWithPath(action.target);
        if (targetModel) {
          var targetRmType = targetModel.getRmType();
          var actClass = this._getActionStatementClass(action, targetRmType);

          var actSt = new actClass({
            rawDesc: action,
            name: action.action
          });
          actSt.addTarget(targetModel);

          actionsSt.actions(actSt);

        } else {
          console.warn("Could not find target model for", action, ", skipping this action.");
        }
      });

      return actionsSt.actions().length > 0 ? actionsSt : new AstNoopStatement();

    } else {
      return new AstNoopStatement();
    }
  }


}

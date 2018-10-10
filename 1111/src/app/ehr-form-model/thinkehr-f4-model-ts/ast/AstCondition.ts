import {AstExpression} from "./expression/AstExpression";
import {AstNode} from "./AstNode";
/**
 * Created by matjazhi on 8.6.2016.
 */

export class AstCondition extends AstNode{
  expression:AstExpression;
  thenStatement:any;

  constructor(fromObj?:Object) {
    super(fromObj);
    if(fromObj) {
      this.expression = fromObj['expression'];
      this.thenStatement = fromObj['thenStatement'];
    }    
  }

  getExpression() {
    return this.expression;
  }

  setExpression(expression:AstExpression) {
    this.expression = expression;
  }

  getThenStatement() {
    return this.thenStatement;
  }

  setThenStatement(statement) {
    this.thenStatement = statement;
  }

  evaluate() {
    return this.expression.evaluate() === true;
  }

  next(val) {
    if (val === true) {
      return this.thenStatement;
    }
  }

  toString() {
    return "AstCondition";
  }
}

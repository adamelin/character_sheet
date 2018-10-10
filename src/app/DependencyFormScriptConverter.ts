export class DependencyFormScriptConverter {

  static API_OBJECT = 'api';

  static toFormScript(deps: any[], formDesc: any): string {

    DependencyFormScriptConverter.sanitizeDeps(deps, formDesc);

    const parsedDeps: DependencyConfig[] = deps.map((dep) => {
      return new DependencyConfig(dep);
    });

    return DependencyFormScriptConverter.transformCallbackValueFn() + parsedDeps.map(d => d.toFormScript()).join('');
  }

  static sanitizeDeps(deps: any[], formDesc: any) {
    deps.forEach((dep: any) => {
      if (dep.conditions) {
        dep.conditions.forEach((cond) => {
          if (cond.hasOwnProperty('value') && cond.value === null) {
            cond.value = DependencyFormScriptConverter.getSuffixPropsForPath(dep.field, formDesc);
          }
        });
      }
    });
    return deps;
  }

  static getSuffixPropsForPath(p: string, desc: any): any {
    const fieldRmType = DependencyFormScriptConverter.getFieldRmType(p, desc);
    switch (fieldRmType.rmType) {
      case 'DV_QUANTITY':
        return {magnitude: null};
      case 'DV_CODED_TEXT':
        return {code: null};
      case 'DV_ORDINAL':
        return {code: null};
      case 'DV_PROPORTION':
        if (fieldRmType.fDesc.inputs) {
          const den = fieldRmType.fDesc.inputs.find((inp) => {
            return inp.suffix === 'denominator';
          });
          if (den && den.validation.range.min === den.validation.range.max) {
            return {numerator: null};
          }
        }
        return {numerator: null, denominator: null};
    }
    return null;
  }

  static getFieldRmType(p: string, desc: any): { rmType: string, fDesc: any } {
    if (desc.formId === p) {
      return {rmType: desc.rmType, fDesc: desc};
    }

    if (desc.children) {
      for (let i = 0; i < desc.children.length; i++) {
        const ch = desc.children[i];
        const fieldRmType = this.getFieldRmType(p, ch);
        if (fieldRmType.rmType) {
          return fieldRmType;
        }
      }
    }
    return {rmType: null, fDesc: null};
  }


  static generateCallbackMethod(operator: Operator, fieldId: string, actions: DepAction[]): string {
    const scriptMethodConfig: ScriptMethodConfig = this.getScriptMethodConfig(operator.name);
    if (scriptMethodConfig) {
      return `${DependencyFormScriptConverter.API_OBJECT}.${scriptMethodConfig.name}('${fieldId}', `
        + `'${scriptMethodConfig.evType}' ,${this.toOperatorCallback(operator, actions)});`;
    }
    console.warn('Script method NOT FOUND for=', operator);
    return null;
  }

  static generateScriptMethod(fieldId: string, methodName: string, value?: any) {
    return `${DependencyFormScriptConverter.API_OBJECT}.${methodName} ('${fieldId}' );`;
  }

  static toOperatorCallback(operator: Operator, actions: DepAction[]): string {
    const cbObj = 'obj';
    return `function(${cbObj}){${this.exeTransformCallbackValueFn(cbObj)}  ${this.generateConditionalActionsExe(cbObj, operator, actions)}}`;
  }

  static generateConditionalActionsExe(cbObj: string, operator: Operator, actions: DepAction[]) {
    const actionsScript: string = actions
      .map(a => a.toFormScript())
      .filter(v => !!v).join('');
    return `\nvar condVal= ${this.getCbCondition(cbObj, operator)};\nif(condVal===true){ ${actionsScript} }`;
  }

  static getCbCondition(cbObj: string, operator: Operator): string {
    return Object.keys(operator.propVals).map((propName: string) => {
      switch (operator.name) {
        case DepCondition.OPERATOR_NOT_EMPTY:
          return `(!!${DependencyFormScriptConverter.getCbValueArr(cbObj, propName)}.length && `
            + `${DependencyFormScriptConverter.getCbValueArr(cbObj, propName)}.some(function(v){return !!v || v===false || v===0}) )`;

        case DepCondition.OPERATOR_EMPTY:
          return `(!${DependencyFormScriptConverter.getCbValueArr(cbObj, propName)}.length || `
            + `!${DependencyFormScriptConverter.getCbValueArr(cbObj, propName)}.some(function(v){return !!v || v===false || v===0}) )`;

        case DepCondition.OPERATOR_NOTEQUALS:
          return `(!${DependencyFormScriptConverter.getCbValueArr(cbObj, propName)}`
            + `.some(function(v){return v == '${operator.propVals[propName]}'; }) )`;

        case DepCondition.OPERATOR_EQ:
        case DepCondition.OPERATOR_EQUALS:
        case DepCondition.OPERATOR_IS:
          return `(${DependencyFormScriptConverter.getCbValueArr(cbObj, propName)}`
            + `.some(function(v){ return String(v) === '${operator.propVals[propName]}';}) )`;
        default:
          console.warn('Operator not found=', operator);
          return '';
      }
    }).join('&&');
  }

  static exeTransformCallbackValueFn(cbObjName: string): string {
    return `_transformCbObjectValue(${cbObjName});`;
  }

  static transformCallbackValueFn(): string {
    // when:
    // code value is {code:string,...}[] we need {code:string[]}
    // magnitude value is {magnitude:string,...}[] we need {magnitude:number[]}
    const cbObjName = 'cbObj';
    return `var _transformCbObjectValue=function(${cbObjName}){if( ${cbObjName}.value && ${cbObjName}.value.length && ${cbObjName}.value[0]!=null && `
      + `${cbObjName}.value[0].hasOwnProperty && `
      + `( ${cbObjName}.value[0].hasOwnProperty('value') || ${cbObjName}.value[0].hasOwnProperty('code') )){${cbObjName}.value=`
      + `{'code':${cbObjName}.value.map(function(o){return o.value || o.code;})} };
    if( ${cbObjName}.value && ${cbObjName}.value.length && ${cbObjName}.value[0]!=null && ${cbObjName}.value[0].hasOwnProperty && `
      + `${cbObjName}.value[0].hasOwnProperty('magnitude') ){${cbObjName}.value={'magnitude':${cbObjName}.value.map(function(o){return o.magnitude;})} };
    if( ${cbObjName}.value && ${cbObjName}.value.length && ${cbObjName}.value[0]!=null && ${cbObjName}.value[0].hasOwnProperty && `
      + `${cbObjName}.value[0].hasOwnProperty('numerator') ){${cbObjName}.value={'numerator':${cbObjName}.value.map(function(o){return o.numerator;}), `
      + `'denominator':${cbObjName}.value.map(function(o){return o.denominator;})};};
    };`;
  }

  static getCbValueArr(cbObjName: string, prop: string) {
    if (prop) {
      if (prop === 'value') {
        return `(${cbObjName}.value?${cbObjName}.value:[])`;
      }

      return `(${cbObjName}.value&&${cbObjName}.value['${prop}']&&${cbObjName}.value['${prop}'].map?${cbObjName}.value['${prop}'].map(`
        + `function(v){return v && v.hasOwnProperty && v.hasOwnProperty('${prop}')? v['${prop}']:v;}):[])`;
    }
    return [];
  }

  static getScriptMethodConfig(fromOperator: string): ScriptMethodConfig {
    switch (fromOperator) {
      case DepCondition.OPERATOR_NOT_EMPTY:
        return {name: 'addListener', evType: 'CHANGE'};
      case DepCondition.OPERATOR_EMPTY:
        return {name: 'addListener', evType: 'CHANGE'};
      case DepCondition.OPERATOR_EQ:
        return {name: 'addListener', evType: 'CHANGE'};
      case DepCondition.OPERATOR_EQUALS:
        return {name: 'addListener', evType: 'CHANGE'};
      case DepCondition.OPERATOR_NOTEQUALS:
        return {name: 'addListener', evType: 'CHANGE'};
      case DepCondition.OPERATOR_IS:
        return {name: 'addListener', evType: 'CHANGE'};
      default:
        return null;
    }
  }

  static toScriptMethod(fieldId: string, actions: DepAction[], operator?: Operator): string {
    if (operator) {
      return this.generateCallbackMethod(operator, fieldId, actions);
    } else {
      return actions.map(a => this.generateScriptMethod(fieldId, DepAction.getActionMethodName(a.action))).join('');
    }
  }

}

export class DependencyConfig {
  field: string;
  conditions: DepCondition[];

  constructor(fromObject: any) {
    Object.assign(this, fromObject);
    this.conditions = fromObject.conditions.map(c => (new DepCondition(c)));
  }

  toFormScript(): string {
    return this.conditions.map(d => d.toFormScript(this.field)).filter(v => !!v).join('');
  }
}

export class DepCondition {
  static OPERATOR_NOT_EMPTY = 'notempty';
  static OPERATOR_EMPTY = 'empty';
  static OPERATOR_EQ = 'eq';
  static OPERATOR_EQUALS = 'equals';
  static OPERATOR_NOTEQUALS = 'notequals';
  static OPERATOR_IS = 'is';

  operator: Operator;
  actions: DepAction[];

  constructor(fromObject: any) {
    Object.assign(this, fromObject);

    let propVals = fromObject.value as { [k: string]: any };
    if (!propVals) {
      propVals = {value: null};
    }
    this.operator = {
      name: fromObject.operator,
      propVals: propVals
    };
    this.actions = fromObject.actions.map(a => (new DepAction(a)));
  }

  toFormScript(onFieldId: string) {
    return DependencyFormScriptConverter.toScriptMethod(onFieldId, this.actions, this.operator);
  }
}

export class DepAction {
  static ACTION_NAME_HIDE = 'hide';
  static ACTION_NAME_SHOW = 'show';
  static ACTION_NAME_CLEAR = 'clear';

  action: string;
  target: string;
  value: any;

  // TODO use same function for method config
  static getActionMethodName(actionName: string): string {
    switch (actionName) {
      case DepAction.ACTION_NAME_HIDE:
        return 'hideFormElement';
      case DepAction.ACTION_NAME_SHOW:
        return 'showFormElement';
      case DepAction.ACTION_NAME_CLEAR:
        return 'clearFormElement';
      default:
        console.warn('action not found=', actionName);
        break;
    }
    return '';
  }

  constructor(fromObject: any) {
    Object.assign(this, fromObject);
  }

  toFormScript(): string {
    const actionMethodName = DepAction.getActionMethodName(this.action);
    if (actionMethodName) {
      return DependencyFormScriptConverter.generateScriptMethod(this.target, actionMethodName, this.value);
    }
    console.warn('DepAction can not get method=', this.action);
    return null;
  }

}

export interface ScriptMethodConfig {
  name: string;
  evType: string;
}

export interface Operator {
  name: string;
  propVals: { [k: string]: any };
}

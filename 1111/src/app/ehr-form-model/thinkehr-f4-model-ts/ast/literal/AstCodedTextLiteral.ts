import {AstLiteral} from './AstLiteral';
/**
 * Created by matjazhi on 9.6.2016.
 */

export class AstCodedTextLiteral extends AstLiteral {
  codeLiteral: any;
  valueLiteral: any;

  constructor(fromObj: Object) {
    super(fromObj);
    this.codeLiteral = fromObj['codeLiteral'];
    this.valueLiteral = fromObj['valueLiteral'];
  }

  getValue() {
    return {
      code: this.getCodeLiteral().evaluate(),
      value: this.getValueLiteral().evaluate()
    };
  }

  getCodeLiteral() {
    return this.codeLiteral;
  }

  setCodeLiteral(codeLiteral) {
    this.codeLiteral = codeLiteral;
  }

  getValueLiteral() {
    return this.valueLiteral;
  }

  setValueLiteral(valueLiteral) {
    this.valueLiteral = valueLiteral;
  }

  toString() {
    return 'AstCodedTextLiteral';
  }

}

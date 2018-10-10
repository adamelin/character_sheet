import {AstLiteral} from './AstLiteral';
/**
 * Created by matjazhi on 9.6.2016.
 */

export class AstProportionLiteral extends AstLiteral {
  numeratorLiteral: any;
  denominatorLiteral: any;

  constructor(fromObj: Object) {
    super(fromObj);
    this.numeratorLiteral = fromObj['numeratorLiteral'];
    this.denominatorLiteral = fromObj['denominatorLiteral'];
  }

  getValue() {
    return {
      numerator: this.getNumeratorLiteral().evaluate(),
      denominator: this.getDenominatorLiteral().evaluate()
    };
  }

  getNumeratorLiteral() {
    return this.numeratorLiteral;
  }

  setNumeratorLiteral(numeratorLiteral) {
    this.numeratorLiteral = numeratorLiteral;
  }

  getDenominatorLiteral() {
    return this.denominatorLiteral;
  }

  setDenominatorLiteral(denominatorLiteral) {
    this.denominatorLiteral = denominatorLiteral;
  }

  toString() {
    return 'AstProportionLiteral';
  }

}

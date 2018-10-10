import {AstLiteral} from "./AstLiteral";
/**
 * Created by matjazhi on 9.6.2016.
 */

export class AstQuantityLiteral extends AstLiteral {

  magnitudeLiteral:any;
  unitLiteral:any;

  constructor(fromObj:Object) {
    super(fromObj);
    this.magnitudeLiteral = fromObj['magnitudeLiteral'];
    this.unitLiteral = fromObj['unitLiteral'];
  }

  getValue() {
    return {
      magnitude: this.getMagnitudeLiteral().evaluate(),
      unit: this.getUnitLiteral().evaluate()
    };
  }

  getMagnitudeLiteral() {
    return this.magnitudeLiteral;
  }

  setMagnitudeLiteral(magnitudeLiteral) {
    this.magnitudeLiteral = magnitudeLiteral;
  }

  getUnitLiteral() {
    return this.unitLiteral;
  }

  setUnitLiteral(unitLiteral) {
    this.unitLiteral = unitLiteral;
  }
  
  toString() {
    return "AstQuantityLiteral";
  }

}

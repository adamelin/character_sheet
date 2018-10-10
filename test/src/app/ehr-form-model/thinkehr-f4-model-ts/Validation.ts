/**
 * Created by matjazhi on 24.5.2016.
 */

export class Validation {

  precision: any;
  range: any;

  constructor(fromObj: Object) {
    this.precision = fromObj['precision'];
    this.range = fromObj['range'];
  }


  getPrecision() {
    return this.precision;
  }

  setPrecision(precision) {
    this.precision = precision;
  }

  getRange() {
    return this.range;
  }

  setRange(range) {
    this.range = range;
  }

  toString() {
    return 'thinkehr.f4.Validation';
  }

}

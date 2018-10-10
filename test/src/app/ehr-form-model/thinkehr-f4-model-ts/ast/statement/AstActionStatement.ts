import {AstStatement} from './AstStatement';
/**
 * Created by matjazhi on 9.6.2016.
 */

export class AstActionStatement extends AstStatement {

  name: string;
  targets: any[];
  actionFunc: Function;

  constructor (fromObj?: Object) {
    super(fromObj);
    if (fromObj) {
      this.name = fromObj['name'];
      this.targets = fromObj['targets'];
      this.actionFunc = fromObj['actionFunc'];
    }


    if (this.targets === undefined) {
      this.targets = [];
    }

    if (this.actionFunc === undefined) {
      this.actionFunc = function () {
      };
    }
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getTargets() {
    return this.targets;
  }

  addTarget(target) {
    this.targets.push(target);
  }

  getActionFunc() {
    return this.actionFunc;
  }

  setActionFunc(actionFunc) {
    this.actionFunc = actionFunc;
  }

  evaluate() {
    let ta = this.getTargets();
    let res = [];
    ta.forEach(function (target) {
      let fr = this.getActionFunc().call(null, target);
      if (fr !== undefined) {
        res.push(fr);
      }
    }.bind(this));

    return res;
  }

  toString() {
    return 'AstActionStatement';
  }

}

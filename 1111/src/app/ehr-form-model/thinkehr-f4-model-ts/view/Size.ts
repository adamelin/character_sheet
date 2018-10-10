import {FieldSize} from './FieldSize';
import {ViewConfigProperty} from './ViewConfigProperty';
import {ViewConfig} from './ViewConfig';
import {LabelSize} from './LabelSize';
import {Field} from './Field';
import {ModelViewConfigParser} from "../parsing/ViewConfigParser";
/**
 * Created by matjazhi on 15.4.2016.
 */

export class Size extends ViewConfigProperty {

  field: FieldSize;
  label: LabelSize;

  constructor(fromObj: Object, viewConfParser:ModelViewConfigParser) {
    super(fromObj, viewConfParser);
  }

  getField(hierarchy: boolean = true): FieldSize {
    return this._getHierarchicalProperty<FieldSize>(hierarchy, 'field', FieldSize.INHERIT, this.getField, 'getSize');
  }

  setField(field: FieldSize) {
    this.field = field;
  }

  getLabel(hierarchy: boolean = true): LabelSize {
    return this._getHierarchicalProperty<LabelSize>(hierarchy, 'label', LabelSize.INHERIT, this.getLabel, 'getSize');
  }

  setLabel(label: LabelSize) {
    this.label = label;
  }

  /*
   * @Override
   */
  toString(): string {
    return 'Size/ViewConfigProperty';
  }
}

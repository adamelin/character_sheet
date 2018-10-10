import {ViewConfigProperty} from './ViewConfigProperty';
import {FieldHorizontalAlignment} from './FieldHorizontalAlignment';
import {FieldVerticalAlignment} from './FieldVerticalAlignment';
import {LabelHorizontalAlignment} from './LabelHorizontalAlignment';
import {LabelVerticalAlignment} from './LabelVerticalAlignment';
import {ModelViewConfigParser} from "../parsing/ViewConfigParser";
/**
 * Created by matjazhi on 15.4.2016.
 */

export class Layout extends ViewConfigProperty {

  fieldHorizontalAlignment: FieldHorizontalAlignment;
  fieldVerticalAlignment: FieldVerticalAlignment;
  labelHorizontalAlignment: LabelHorizontalAlignment;
  labelVerticalAlignment: LabelVerticalAlignment;

  constructor(fromObj: Object, viewConfParser:ModelViewConfigParser) {
    super(fromObj, viewConfParser);
  }

  getFieldHorizontalAlignment(hierarchy: boolean = true): FieldHorizontalAlignment {
    return this._getHierarchicalProperty(
      hierarchy,
      'fieldHorizontalAlignment',
      FieldHorizontalAlignment.INHERIT,
      this.getFieldHorizontalAlignment,
      'getLayout'
    ) as FieldHorizontalAlignment;
  }

  setFieldHorizontalAlignment(alignment: FieldHorizontalAlignment): void {
    this.fieldHorizontalAlignment = alignment;
  }

  getFieldVerticalAlignment(hierarchy: boolean = true): FieldVerticalAlignment {
    return this._getHierarchicalProperty(
      hierarchy,
      'fieldVerticalAlignment',
      FieldVerticalAlignment.INHERIT,
      this.getFieldVerticalAlignment,
      'getLayout'
    ) as FieldVerticalAlignment;
  }

  setFieldVerticalAlignment(alignment: FieldVerticalAlignment): void {
    this.fieldVerticalAlignment = alignment;
  }

  getLabelHorizontalAlignment(hierarchy: boolean = true):LabelHorizontalAlignment {
    return this._getHierarchicalProperty(
      hierarchy,
      'labelHorizontalAlignment',
      LabelHorizontalAlignment.INHERIT,
      this.getLabelHorizontalAlignment,
      'getLayout'
    ) as LabelHorizontalAlignment;
  }

  setLabelHorizontalAlignment(alignment: LabelHorizontalAlignment): void {
    this.labelHorizontalAlignment = alignment;
  }

  getLabelVerticalAlignment(hierarchy: boolean = true): LabelVerticalAlignment {
    return this._getHierarchicalProperty<LabelVerticalAlignment>(
      hierarchy,
      'labelVerticalAlignment',
      LabelVerticalAlignment.INHERIT,
      this.getLabelVerticalAlignment,
      'getLayout'
    );
  }

  setLabelVerticalAlignment(alignment: LabelVerticalAlignment): void {
    this.labelVerticalAlignment = alignment;
  }

  /*
   * @Override
   */
  toString(): string {
    return 'thinkehr.f4.Layout/ViewConfigProperty';
  }
}

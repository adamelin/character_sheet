import {Size} from "../view/Size";
import {FieldSize} from "../view/FieldSize";
import {LabelSize} from "../view/LabelSize";
import {Layout} from "../view/Layout";
import {FieldHorizontalAlignment} from "../view/FieldHorizontalAlignment";
import {LabelHorizontalAlignment} from "../view/LabelHorizontalAlignment";
import {FieldVerticalAlignment} from "../view/FieldVerticalAlignment";
import {LabelVerticalAlignment} from "../view/LabelVerticalAlignment";
import {Label} from "../view/Label";
import {ThinkEhrUtil} from "../ThinkEhrUtil";
import {ViewConfig} from "../view/ViewConfig";
import {Field} from "../view/Field";
import {FieldPresentation} from "../view/FieldPresentation";
import {ViewConfigProperty} from "../view/ViewConfigProperty";
import {RmType} from "../RmType";
/**
 * Created by matjazhi on 9.5.2016.
 */

export class ViewConfigParser implements ModelViewConfigParser{

  /// private static _instance: ViewConfigParser;

  private _knownViewConfigProps = {
    "size": this._parseSizeViewConfig,
    "layout": this._parseLayoutViewConfig,
    "label": this._parseLabelViewConfig,
    "field": this._parseFieldViewConfig,
    "advanced": this._parseAdvancedViewConfig,
    "multiplicity": this._parseMultiplicityViewConfig
  };

  constructor() {

  }

  /*static getInstance(): ViewConfigParser {
    if (!ViewConfigParser._instance) {
      ViewConfigParser._instance = new ViewConfigParser();
    }
    return ViewConfigParser._instance;
  }*/


  _parseSizeViewConfig(viewConfig: ViewConfig, sizeJson: Object) {
    var size = new Size({viewConfig: viewConfig}, this);
    this.setPropsFromObject(sizeJson, size);

    return size;
  }

  setPropsFromObject(fromJsonObj: Object, viewConfigPropInstance: ViewConfigProperty): void {
    if (viewConfigPropInstance instanceof Size) {
      this.setSizePropsFromObject(fromJsonObj, viewConfigPropInstance);
    } else if (viewConfigPropInstance instanceof Layout) {
      this.setLayoutPropsFromObject(fromJsonObj, viewConfigPropInstance)
    } else if (viewConfigPropInstance instanceof Label) {
      this.setLabelPropsFromObject(fromJsonObj, viewConfigPropInstance)
    } else if (viewConfigPropInstance instanceof Field) {
      this.setFieldPropsFromObject(fromJsonObj, viewConfigPropInstance)
    }
  }

  protected setSizePropsFromObject(sizeJson: Object, size: Size) {
    for (var prop in sizeJson) {
      if (sizeJson.hasOwnProperty(prop)) {
        var propVal: any = sizeJson[prop]

        if (prop === "field") {
          propVal = isNaN(propVal) ? propVal.toUpperCase() : propVal;
          var fieldSize: any = FieldSize[propVal];
          size.setField(fieldSize);
        } else if (prop === "label") {
          propVal = ThinkEhrUtil.isString(propVal) ? propVal.toUpperCase() : propVal;
          var lbl: any = parseInt(propVal);
          let labelSizeEnum: any;
          if(!isNaN(lbl)){
            labelSizeEnum = lbl == -1 ? LabelSize.COLUMN_HIDDEN : lbl;
          }else{
            labelSizeEnum= LabelSize[propVal]
          }
          ///let labelSizeEnum: any = isNaN(lbl) ? LabelSize[propVal] : LabelSize[lbl];
          size.setLabel(labelSizeEnum);
        } else {
          size[prop] = propVal;
        }

      }
    }
  }

  _parseLayoutViewConfig(viewConfig, layoutJson) {
    var layout = new Layout({viewConfig: viewConfig}, this);
    this.setLayoutPropsFromObject(layoutJson, layout);

    return layout;
  }

  protected setLayoutPropsFromObject(layoutJson, layout: Layout) {
    for (var prop in layoutJson) {
      if (layoutJson.hasOwnProperty(prop)) {
        var alignVal: string = layoutJson[prop]["align"];
        if (alignVal) {
          alignVal = alignVal.toUpperCase();
        }
        var vAlignVal: string = layoutJson[prop]["valign"];
        if (vAlignVal) {
          vAlignVal = vAlignVal.toUpperCase();
        }
        if (prop === "field") {
          if (alignVal) {
            var fieldHorizontalAlignmentEnum: any = FieldHorizontalAlignment[alignVal];
            layout.setFieldHorizontalAlignment(fieldHorizontalAlignmentEnum);
          }
          if (vAlignVal) {
            var fieldVerticalAlignmentEnum: any = FieldVerticalAlignment[vAlignVal];
            layout.setFieldVerticalAlignment(fieldVerticalAlignmentEnum);
          }
          this._addPropsToObject(layoutJson[prop], layout, "field", ["align", "valign"]);
        } else if (prop === "label") {
          if (alignVal) {
            var labelHorizontalAlignmentEnum: any = LabelHorizontalAlignment[alignVal];
            layout.setLabelHorizontalAlignment(labelHorizontalAlignmentEnum);
          }
          if (vAlignVal) {
            var labelVerticalAlignmentEnum: any = LabelVerticalAlignment[vAlignVal];
            layout.setLabelVerticalAlignment(labelVerticalAlignmentEnum);
          }
          this._addPropsToObject(layoutJson[prop], layout, "label", ["align", "valign"]);
        } else {
          layout[prop] = layoutJson[prop];
        }
      }
    }
  }

  _parseLabelViewConfig(viewConfig, labelJson) {
    var label = new Label({viewConfig: viewConfig}, this);
    this.setLabelPropsFromObject(labelJson, label);

    return label;
  }

  protected setLabelPropsFromObject(labelJson, label: Label) {
    ThinkEhrUtil._extend(labelJson, label);
  }

  _parseFieldViewConfig(viewConfig: ViewConfig, fieldJson: Object) {
    var fieldObject = {};
    for (var fieldInputKey in fieldJson) {
      if (fieldJson.hasOwnProperty(fieldInputKey)) {
        var jsonPropValue = fieldJson[fieldInputKey];
        if (ThinkEhrUtil.isObject(jsonPropValue)) {
          var field = new Field({viewConfig: viewConfig}, this);
          this.setFieldPropsFromObject(jsonPropValue, field);
          fieldObject[fieldInputKey] = field;
        } else {
            fieldObject[fieldInputKey] = jsonPropValue;
        }
      }
    }

    return fieldObject;
  }

  protected setFieldPropsFromObject(jsonPropValue: any, field: Field) {
    ThinkEhrUtil._extend(jsonPropValue, field);

    if (jsonPropValue.presentation) {
      let fieldPresentationEnum: any = FieldPresentation[jsonPropValue.presentation.toUpperCase()];
      if(fieldPresentationEnum!=null) {
        field.setPresentation(fieldPresentationEnum);
      }
    }

    if (jsonPropValue.columns) {
      let columns = parseInt(jsonPropValue.columns);
      if (!isNaN(columns)) {
        field.setColumns(columns);
      }
    }

    if (jsonPropValue.lines) {
      let lines = parseInt(jsonPropValue.lines);
      if (!isNaN(lines)) {
        field.setLines(lines);
      }
    }
  }

  _parseAdvancedViewConfig(viewConfig: ViewConfig, advancedJson: Object) {
    this._addPropsToObject(advancedJson, viewConfig, "advanced", ["hidden", "readonly"]);

    if (advancedJson['hidden']) {
      viewConfig.setHidden(advancedJson['hidden']);
    }

    if (advancedJson['readonly']) {
      viewConfig.setReadOnly(advancedJson['readonly']);
    }

    return null;
  }

  _parseMultiplicityViewConfig(viewConfig: ViewConfig, multiplicityJson: Object) {
    this._addPropsToObject(multiplicityJson, viewConfig, "multiplicity", ["min", "max"]);

    if (multiplicityJson['min']) {
      var min = parseInt(multiplicityJson['min']);
      viewConfig.setMin(isNaN(min) ? multiplicityJson['min'] : min);
    }

    if (multiplicityJson['max']) {
      var max = parseInt(multiplicityJson['max']);
      viewConfig.setMax(isNaN(max) ? multiplicityJson['max'] : max);
    }

    return null;
  }

  _addPropsToObject(from: Object, to: Object, toPropertyName: string, skip: Array<any>) {
    var added = 0;
    var tmpAdd = {};
    for (var prop in from) {
      if (from.hasOwnProperty(prop) && skip.indexOf(prop) < 0) {
        tmpAdd[prop] = from[prop];
        added++;
      }
    }

    if (added > 0) {
      to[toPropertyName] = tmpAdd;
    }
  }

  parseViewConfig(viewConfigPlain: Object, vc: ViewConfig = new ViewConfig()):ViewConfig {

    for (var prop in viewConfigPlain) {
      if (viewConfigPlain.hasOwnProperty(prop)) {
        var makerFunction = this._knownViewConfigProps[prop];
        if (makerFunction) {
          var propToAdd = makerFunction.call(this, vc, viewConfigPlain[prop]);
          if (propToAdd) {
            vc[prop] = propToAdd;
          }
        }else {
          vc[prop] = viewConfigPlain[prop];
        }
      }
    }
    return vc;
  }
}

export interface ModelViewConfigParser {
  parseViewConfig(viewConfigPlain: Object, vc?: ViewConfig): ViewConfig;
  setPropsFromObject(fromJsonObj: Object, viewConfigPropInstance: ViewConfigProperty): void;
}

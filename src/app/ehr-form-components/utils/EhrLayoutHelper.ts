import {FieldSize} from "../../ehr-form-model/thinkehr-f4-model-ts/view/FieldSize";
import {LabelHorizontalAlignment} from "../../ehr-form-model/thinkehr-f4-model-ts/view/LabelHorizontalAlignment";
import {FieldVerticalAlignment} from "../../ehr-form-model/thinkehr-f4-model-ts/view/FieldVerticalAlignment";
import {FieldHorizontalAlignment} from "../../ehr-form-model/thinkehr-f4-model-ts/view/FieldHorizontalAlignment";
import {LabelVerticalAlignment} from "../../ehr-form-model/thinkehr-f4-model-ts/view/LabelVerticalAlignment";
import {FormRepeatableElementModel} from "../../ehr-form-model/thinkehr-f4-model-ts/model/FormRepeatableElementModel";
import {LabelSize} from "../../ehr-form-model/thinkehr-f4-model-ts/view/LabelSize";
import {ThinkEhrModelParser} from "../../ehr-form-model";
import {Injectable} from "@angular/core";
import {FormObjectModel} from "../../ehr-form-model/thinkehr-f4-model-ts/model/FormObjectModel";
import {Model} from "../../ehr-form-model/thinkehr-f4-model-ts/model/Model";

/**
 * Created by matjazhi on 7.6.2016.
 */

export class EhrLayoutHelper {

  static TOTAL_GRID_COLUMNS: number = 12;
  static LABEL_DEFAULT_GRID_COLUMNS: number = 4;
  static FIELD_DEFAULT_GRID_COLUMNS: number = 8;

  static LABEL_HORIZONTAL_CLASS_MAP: Map<LabelHorizontalAlignment, string> = new Map([
    [LabelHorizontalAlignment.LEFT, 'text-sm-left'],
    [LabelHorizontalAlignment.RIGHT, 'text-sm-right'],
    [LabelHorizontalAlignment.TOP, 'text-sm-top'],
    [LabelHorizontalAlignment.CENTER, 'text-sm-center']
  ]);

  static LABEL_VERTICAL_CLASS_MAP: Map<LabelVerticalAlignment, string> = new Map([
    [LabelVerticalAlignment.TOP, 'align-self-start'],
    [LabelVerticalAlignment.MIDDLE, 'align-self-center'],
    [LabelVerticalAlignment.BOTTOM, 'align-self-end']
  ]);

  static FIELD_HORIZONTAL_CLASS_MAP: Map<FieldHorizontalAlignment, string> = new Map([
    [FieldHorizontalAlignment.LEFT, 'justify-content-start'],
    [FieldHorizontalAlignment.RIGHT, 'justify-content-end'],
    [FieldHorizontalAlignment.CENTER, 'justify-content-center']
  ]);

  static FIELD_VERTICAL_CLASS_MAP: Map<FieldVerticalAlignment, string> = new Map([
    [FieldVerticalAlignment.TOP, 'align-self-start'],
    [FieldVerticalAlignment.MIDDLE, 'align-self-center'],
    [FieldVerticalAlignment.BOTTOM, 'align-self-end']
  ]);

  static getGridColumnsClass(gridNr: number) {
    return 'col-sm-' + gridNr;
  }

  static trackByFieldModel(index: number, model: FormRepeatableElementModel) {
    var parent: FormRepeatableElementModel = <FormRepeatableElementModel> model.getParentModel();
    let multiInd: number = parent && parent.isMulti && parent.isMulti() ? model.getMultiIndex(false) : 0;
    return model.getRootModel().getUniqueId() + model.getSanitizedUniqueId(multiInd);
  }

  static trackByIndex(index: number, model: FormRepeatableElementModel) {
    return index;
  }

  static getColSizeNr(relSize: string): number {
    let relVal: number = parseInt(relSize, 10);

    if (!isNaN(relVal)) {
      relVal = relVal / 100;
      let gridColumnSize = Math.floor(EhrLayoutHelper.TOTAL_GRID_COLUMNS * relVal);
      return gridColumnSize >= 1 ? gridColumnSize : EhrLayoutHelper.TOTAL_GRID_COLUMNS;
    }
    return EhrLayoutHelper.TOTAL_GRID_COLUMNS;
  }

  static getColsNrFromLabelSize(ls: LabelSize): number {
    let lsStr = ls.toString();
    return parseInt(lsStr.substring(lsStr.lastIndexOf('_') + 1));
  }

  static getColsNrFromFieldSize(fieldSize: FieldSize): number {
    let fsStr = fieldSize.toString();
    switch (fieldSize) {
      case FieldSize.SMALL:
        return EhrLayoutHelper.getColSizeNr('20');
      case FieldSize.MEDIUM:
        return EhrLayoutHelper.getColSizeNr('40');
      case FieldSize.LARGE:
        return EhrLayoutHelper.getColSizeNr('70');
      /*case FieldSize.XLARGE:
       return EhrLayoutHelper.TOTAL_GRID_COLUMNS;*/
    }
    return EhrLayoutHelper.TOTAL_GRID_COLUMNS;
  }

  static getLabelSizeRel(model: FormRepeatableElementModel): number {
    let lsCols: number = EhrLayoutHelper.getLabelColumns(model);
    if (lsCols && lsCols > 0) {
      return (lsCols / EhrLayoutHelper.TOTAL_GRID_COLUMNS) * 100;
    }
    return null;
  }

  static getLabelColumns(model: FormRepeatableElementModel): number {

    let ls: LabelSize = model?model.getViewConfig().getSize(true).getLabel(true):null;
    if (ls !== LabelSize.INHERIT && ls !== LabelSize.COLUMN_HIDDEN) {
      return EhrLayoutHelper.getColsNrFromLabelSize(ls);
    } else if (ls === LabelSize.COLUMN_HIDDEN) {
      return 0;
    }
    return EhrLayoutHelper.LABEL_DEFAULT_GRID_COLUMNS;
  }

  static getFieldInputColumns(model: FormRepeatableElementModel): number {
    let ls: FieldSize = model?model.getViewConfig().getSize(true).getField(true):null;
    if (ls !== FieldSize.INHERIT) {
      return EhrLayoutHelper.getColsNrFromFieldSize(ls);
    }
    return EhrLayoutHelper.FIELD_DEFAULT_GRID_COLUMNS;
  }

  static distributeColumns(columns, elements) {
    var totalCols = elements < columns ? elements : columns;
    var cols = [];

    for (var i = 0; i < totalCols; i++) {
      cols.push([]);
    }

    for (i = 0; i < elements; i++) {
      var colIndex = i % totalCols;
      cols[colIndex].push(i);
    }

    return cols;

  }

  static distributeElementsToColumns(columnsNr: number, elements: any[]) {
    let totalCols = elements.length < columnsNr ? elements.length : columnsNr;
    let cols: any[] = [];

    for (let i = 0; i < totalCols; i++) {
      cols.push([]);
    }

    for (let i = 0; i < elements.length; i++) {
      let colIndex = i % totalCols;
      cols[colIndex].push(elements[i]);
    }

    return cols;

  }

  /*this is a workaround instead of doing it in a parent container which would be obvious way of going through children in ngOnChanges and duplicating
  currently it is not possible to inject ThinkEhrModelParser in <ehr-form> component maybe due to singelton pattern and class hierarchy - needs refactoring*/
  private static minContainersRendered: { [containerPathId: string]: boolean } = {};

  static renderContainersMin(currentModel: FormRepeatableElementModel, thinkEhrModelParser: ThinkEhrModelParser) {
    if(!EhrLayoutHelper.minContainersRendered[currentModel.getPath()]){
      EhrLayoutHelper.minContainersRendered[currentModel.getPath()] = true;
      let renderMin = currentModel.getViewConfig().getMin();
      let annMin = parseInt(currentModel.getAnnotationValue('renderMin'), 10);
      if (!isNaN(annMin) && annMin && annMin > renderMin) {
        //10 is the max amount of annotation min containers
        renderMin = Math.min(annMin, 10);

        renderMin = Math.min(renderMin, currentModel.getMax());
      }
      let deltaToMinRequired = EhrLayoutHelper.supportsMulti(currentModel) ? renderMin - EhrLayoutHelper.getMultiSiblingsCount(currentModel) : 0;
      if (deltaToMinRequired > 0) {
        EhrLayoutHelper.duplicateContainer(deltaToMinRequired, currentModel, thinkEhrModelParser);
      }
    }

  }

  static duplicateContainer(nrOfCopies: number, model: FormRepeatableElementModel, thinkEhrModelParser: ThinkEhrModelParser) {
    if (nrOfCopies == null) {
      nrOfCopies = 1;
    }

    for (let i = 0; i < nrOfCopies; i++) {
      thinkEhrModelParser.duplicateModel(model, model);
    }
  };

  static getMultiSiblingsCount(model: FormRepeatableElementModel) {
    /*let parent: FormObjectModel = model.getParentModel() as FormObjectModel;
    let count = parent ? parent.findChildrenWithPath(model.getPath()).length : 1;
    return count;*/
    return EhrLayoutHelper.getMultiSiblings(model).length;
  };

  static getMultiSiblings(model: FormRepeatableElementModel) {
    let parent: FormObjectModel = model.getParentModel() as FormObjectModel;
    return parent ? parent.findChildrenWithPath(model.getPath()) : [model];
  };

  static supportsMulti(model: FormRepeatableElementModel): boolean {
    return model.isMulti() && model.isAttachableToValueNode();
  }

  //keeps containers with its ancestor path and children visible
  static hideOtherThan (rootModel:Model, keepVisible: FormRepeatableElementModel[], keepMultiIndexes: number[]):void {
    if (keepVisible.length) {
      let keepAncestorPath: Model[] = [];
      keepVisible.forEach((keepModel: FormRepeatableElementModel) => {
        keepAncestorPath.unshift(keepModel);
        let currModelParent: Model = keepModel.getParentModel();
        while (!!currModelParent) {
          keepAncestorPath.unshift(currModelParent);
          currModelParent = currModelParent.getParentModel();
        }
      });
      if (keepAncestorPath.length) {
        EhrLayoutHelper.hideChildrenExcept(rootModel, keepAncestorPath, keepVisible);
        keepVisible.forEach((keepModel: FormRepeatableElementModel) => {
          if (keepMultiIndexes && keepMultiIndexes.length) {
            keepModel.getViewConfig().setKeepVisibleIndexList(keepMultiIndexes);
            keepModel.getViewConfig().setHidden(true);
          } else {
            keepModel.getViewConfig().setKeepVisibleIndexList(null);
            keepModel.getViewConfig().setHidden(false);
          }
        });
      }
    }
  };

  private static hideChildrenExcept(formElement: Model, except: Model[], stopRecursionAt: Model[]) {
    formElement.getChildModels().forEach((chModel: FormRepeatableElementModel) => {
      if (except.indexOf(chModel) < 0) {
        chModel.getViewConfig().setHidden(true);
      } else if (stopRecursionAt.indexOf(chModel) < 0) {
        EhrLayoutHelper.hideChildrenExcept(chModel, except, stopRecursionAt);
      }
    });
  }


  constructor() {}

  fieldSizeClass(model) {
    if (model && model.getViewConfig().getSize() && model.getViewConfig().getSize().getField()) {
      var fs = model.getViewConfig().getSize().getField();
      if (fs != FieldSize.INHERIT) {
        return "field-size-" + fs.toString().toLowerCase();
      }
    }
    return null;
  }

  fieldHorizontalAlignClass(model) {
    if (model && model.getViewConfig().getLayout() && model.getViewConfig().getLayout().getFieldHorizontalAlignment()) {
      var fha = model.getViewConfig().getLayout().getFieldHorizontalAlignment();
      if (fha != FieldHorizontalAlignment.INHERIT) {
        return "field-horizontal-align-" + fha.toString().toLowerCase();
      }
    }
  }

  fieldVerticalAlignClass(model) {
    if (model && model && model.getViewConfig().getLayout() && model.getViewConfig().getLayout().getFieldVerticalAlignment()) {
      var fva = model.getViewConfig().getLayout().getFieldVerticalAlignment();
      if (fva != FieldVerticalAlignment.INHERIT) {
        return "field-vertical-align-" + fva.toString().toLowerCase();
      }
    }
  }

  labelHorizontalAlignClass(model) {
    if (model && model.getViewConfig().getLayout() && model.getViewConfig().getLayout().getLabelHorizontalAlignment()) {
      var lha = model.getViewConfig().getLayout().getLabelHorizontalAlignment();
      if (lha != LabelHorizontalAlignment.INHERIT) {
        return "label-horizontal-align-" + lha.toString().toLowerCase();
      }
    }
  }

  labelVerticalAlignClass(model) {
    if (model && model.getViewConfig().getLayout() && model.getViewConfig().getLayout().getLabelVerticalAlignment()) {
      var lva = model.getViewConfig().getLayout().getLabelVerticalAlignment();
      if (lva != LabelVerticalAlignment.INHERIT) {
        return "label-vertical-align-" + lva.toString().toLowerCase();
      }
    }
  }

  computeFieldClass(model) {
    var c = [];
    // Will add others
    var fsc = this.fieldSizeClass(model);
    if (fsc) {
      c.push(fsc);
    }

    return c;
  }

  computeEhrLineClass(model) {
    var c = [];

    var fha = this.fieldHorizontalAlignClass(model);
    if (fha) {
      c.push(fha);
    }

    var fva = this.fieldVerticalAlignClass(model);
    if (fva) {
      c.push(fva);
    }

    var lha = this.labelHorizontalAlignClass(model);
    if (lha === "label-horizontal-align-top") {
      c.push("line-top-to-bottom");
    }

    return c;
  }

  computeEhrLabelContentClass(model) {
    var c = [];
    // Will add others
    var lha = this.labelHorizontalAlignClass(model);
    if (lha) {
      c.push(lha);
    }

    var lva = this.labelVerticalAlignClass(model);
    if (lva) {
      c.push(lva);
    }

    return c;
  }

  columnWidthPercentage(viewConfig, columns) {
    var vc = viewConfig;
    if (vc.getSize() && vc.getSize().getField() === FieldSize.LARGE) {
      return Math.floor((100 / columns) - 1).toString() + "%";
    }

    return "auto";
  }

  computeLastColumnClass(last, listOpen) {
    var c = [];
    if (last && !listOpen) {
      c.push("last-in-column");
    }

    return c;
  }

  getTextareaRows($scope) {
    if ($scope.model.getViewConfig().getFields()) {
      var field = $scope.model.getViewConfig().getFields();

      return field.getLines() ? field.getLines() : $scope.rowsDefault;
    }

    return $scope.rowsDefault;
  }
}

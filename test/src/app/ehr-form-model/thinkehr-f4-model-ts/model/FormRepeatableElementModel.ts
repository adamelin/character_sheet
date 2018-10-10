import {FormObjectModel} from "./FormObjectModel";
import {Label} from "./../view/Label";
import {EhrModelEventType} from "../../ehr-model-event";
import {ModelViewConfigParser} from "../parsing/ViewConfigParser";
import {AbstractContainerModel} from './AbstractContainerModel';

/**
 * Created by matjazhi on 14.4.2016.
 */

export class FormRepeatableElementModel extends FormObjectModel {

  localizedName: string;
  localizedNames: Object;
  init_min: number = undefined;
  min: number = 0;
  max: number;
  parent: FormObjectModel;

  constructor(formDescriptionSnippet?: Object, viewConfigParser?: ModelViewConfigParser) {
    super(formDescriptionSnippet, viewConfigParser);
  }


  setValuesFromObject(formDesc: Object, viewConfParser?: ModelViewConfigParser) {
    super.setValuesFromObject(formDesc, viewConfParser);
    if (formDesc['localizedNames']) {
      this.setLocalizedNames(formDesc['localizedNames']);
    }
  }

  getLocalizedName(locale?: string): string {
    if (locale) {
      return this.localizedNames && this.localizedNames[locale] ? this.localizedNames[locale] : null;
    }

    return this.localizedName;
  }

  setLocalizedName(localizedName: string) {
    this.localizedName = localizedName;
  }

  setLocalizedNames(localizedNames: Object) {
    this.localizedNames = localizedNames;
  }

  getMin(): number {
    return this.min;
  }

  setMin(min: number) {
    if (this.init_min === undefined) {
      this.init_min = min;
    }
    this.min = min;
    this.eventDispatcher.dispatchEvent(EhrModelEventType.EVENT_MIN_UPDATED, this.min);
  }

  resetToInitMin() {
    if (this.init_min !== undefined && this.init_min !== this.min) {
      this.setMin(this.init_min);
    }
  }

  getMax(): number {
    return this.max;
  }

  setMax(max: number) {
    this.max = max;
    this.eventDispatcher.dispatchEvent(EhrModelEventType.EVENT_MAX_UPDATED, this.max);
  }

  isMulti(): boolean {
    //return this.hasTag('multi') && this.max && (this.max > 1 || this.max < 0);
    return this.max && (this.max > 1 || this.max < 0);
  }

  getMultiIndex(searchFirstMultiAncestor: boolean): number {
    var parentModel: FormObjectModel = (<FormObjectModel> this.getParentModel());
    if (parentModel) {
      let containersInParent: Array<FormObjectModel> = parentModel.getContainerChildModels(this.getPath()) as Array<FormObjectModel>;
      if (containersInParent && containersInParent.length) {
        return containersInParent.indexOf(this)// + 1;
      }
    }
    if (searchFirstMultiAncestor) {
      let firstMultiAncestor: FormRepeatableElementModel = this.findMultiAncestor();
      if (firstMultiAncestor) {
        return firstMultiAncestor.getMultiIndex(false);
      }
    }
    return parentModel ? 0 : null;
  }

  isRequired(): boolean {
    return this.min !== undefined && this.min > 0;
  }

  isStructuredRequired(cacheCycleId?:number): boolean {
    const parentCont: AbstractContainerModel = this.getParentModel() as AbstractContainerModel;
    if (!this.isContainer()) {
      return parentCont ? !!parentCont.isChildStructuredRequired(this, cacheCycleId) : false;
    } else {
      return this.isValueSet(cacheCycleId) || (parentCont ? parentCont.isChildStructuredRequired(this, cacheCycleId) : false);
    }
  }

  resetStructuredValidation(cacheCycleId:number) {
    const minVal = this.min;
    if (this.isStructuredRequired(cacheCycleId)) {
      /*if (this.isContainer()) {
      }*/
      this.resetToInitMin();
    } else {
      this.setMin(0);
    }
    const changed = this.min !== minVal;
    if(changed) {
      this.getRootModel().dispatchStructuredValidationChange(this);
    }
    return changed;
  }

  isInitRequired(): boolean {
    return this.init_min !== undefined && this.init_min > 0;
  }

  clearValue(): void {
    if (this.isContainer()) {
      this.getChildModels().forEach(function (chModel: FormRepeatableElementModel) {
        chModel.clearValue();
      });
    }
  }

  resetValue(multiIndex: number): void {
    if (this.isContainer()) {
      /// const parser: ThinkEhrModelParser = new ThinkEhrModelParser(rmTypeModelDictionary);
      (<FormObjectModel>this.getParentModel()).getContainerChildModels(this.getPath()).forEach(function (multiItem: FormRepeatableElementModel) {
        if (multiItem !== this) {
          /// parser.destroyModel(multiItem);
          multiItem.destroy();
        }
      }.bind(this));
      this.getChildModels().forEach(function (chModel: FormRepeatableElementModel) {
        chModel.resetValue(multiIndex);
      });
    }
  }

  isContainer(): boolean {
    return false;
  }


  labelFor(language?: string): string {
    let lbl: string = super.labelFor(language);
    if (!lbl) {
      let labelConfig: Label = this.getViewConfig().getLabel();
      if (!lbl && (!labelConfig || !labelConfig.isCustom())) {
        lbl = this.getLocalizedName(language);
      }
      if (!lbl) {
        lbl = this.getLocalizedName();
        if (!lbl) {
          lbl = this.getName();
        }
      }
    }

    return lbl;
  }


  /*
   * @Override
   */
  toString(): string {
    return 'FormRepeatableElementModel';
  }
}

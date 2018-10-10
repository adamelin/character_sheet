import {NodeModel} from "./NodeModel";
import {RmType} from "../RmType";
import {CodedTextFieldModel} from "./fieldModel/CodedTextFieldModel";
import {TextFieldModel} from "./fieldModel/TextFieldModel";
import {BooleanFieldModel} from "./BooleanFieldModel";
import {CountFieldModel} from "./fieldModel/CountFieldModel";
import {DateFieldModel} from "./fieldModel/DateFieldModel";
import {DateTimeFieldModel} from "./fieldModel/DateTimeFieldModel";
import {DurationFieldModel} from "./fieldModel/DurationFieldModel";
import {EhrUriFieldModel} from "./fieldModel/EhrUriFieldModel";
import {MultimediaFieldModel} from "./fieldModel/MultimediaFieldModel";
import {OrdinalFieldModel} from "./fieldModel/OrdinalFieldModel";
import {ProportionFieldModel} from "./fieldModel/ProportionFieldModel";
import {QuantityFieldModel} from "./fieldModel/QuantityFieldModel";
import {TimeFieldModel} from "./fieldModel/TimeFieldModel";
import {UriFieldModel} from "./fieldModel/UriFieldModel";
import {EhrTestingUtils} from "../../../ehr-form-components/utils/EhrTestingUtils";
import {ThinkEhrUtil} from "../ThinkEhrUtil";
import {EhrModelEventType} from "../../ehr-model-event";
import {CustomModel} from './fieldModel/CustomModel';
import {FormObjectModel} from './FormObjectModel';

/**
 * Created by matjazhi on 23.2.2017.
 */

export class RmTypeModelValueGetter {

  static MODEL_PROP_VALUE: string = 'value';
  static MODEL_PROP_CODE: string = 'code';
  static MODEL_PROP_QUANT_MAGNITUDE: string = 'magnitude';
  static MODEL_PROP_QUANT_UNIT: string = 'unit';
  static MODEL_PROP_PROPOR_DENOMI: string = 'denominator';
  static MODEL_PROP_PROPOR_NUMERA: string = 'numerator';
  static MODEL_PROP_CODED_LABEL: string = 'label';

  static getGetterForEhrEventType(model:NodeModel, eventType:EhrModelEventType):Function{
    switch (eventType) {
      case EhrModelEventType.EVENT_IS_HIDDEN:
        return model.getViewConfig().isHidden;
      case EhrModelEventType.EVENT_IS_READ_ONLY:
        return model.getViewConfig().isReadOnly;
      case EhrModelEventType.EVENT_TOOLTIP_VALUE:
        return model.getViewConfig().getTooltip;
      case EhrModelEventType.EVENT_MAX_UPDATED:
        return model.getMax;
      case EhrModelEventType.EVENT_MIN_UPDATED:
        return model.getMin;
      case EhrModelEventType.EVENT_CHILDREN_UPDATED:
        return model.getChildModels;
    }
  }


  static getValueGetters(model: FormObjectModel): Map<string, Function> {
    return RmTypeModelValueGetter.getterNamesToFunctions(RmTypeModelValueGetter.getModelGetterNames(model), model);
  }

  private static getterNamesToFunctions(getterFnNames: Map<string, string>, model: FormObjectModel): Map<string, Function> {
    let retKeyFn: Map<string, Function> = new Map();
    if(model instanceof CustomModel) {
      model = model.getDelegateModel();
    }
    getterFnNames.forEach((fnName: string, key: string) => {
      retKeyFn.set(key, model[fnName].bind(model));
    });
    return retKeyFn;
  }

  public static getValue(model: FormObjectModel, multiIndex?: number): Map<string, any> | any[] {
    if(model instanceof CustomModel) {
      model = model.getDelegateModel();
    }
    let valueGetter: Map<string, Function> = RmTypeModelValueGetter.getValueGetters(model);
    let values: Map<string, any> = new Map();
    valueGetter.forEach((getterFunction: Function, key: string) => {
      let modelValue:any = getterFunction(undefined, undefined);
      if (!ThinkEhrUtil.isArray(modelValue)) {
        modelValue = [modelValue];
      }
      values.set(key, modelValue);
    });

    if (values.size>1) {
      //merges separate property arrays to value object array -- {magnitude:[3,4], unit:['df', 'kg']}  to [{magnitude:3, unit:'df'},{magnitude:4, unit:'kg'} ]
      let value: any[] = this.collectToVOArray(values);
      values.set(RmTypeModelValueGetter.MODEL_PROP_VALUE, value);
    }
    let vals: any[] = values.get(RmTypeModelValueGetter.MODEL_PROP_VALUE);
    if (model.getRmType() == RmType.DV_BOOLEAN && !ThinkEhrUtil.isArray(vals)) {
      vals = [vals];
    }
    return multiIndex != null ? vals[multiIndex] : vals;
  }

  public static setValue(model:NodeModel, value:any, prop:string=RmTypeModelValueGetter.MODEL_PROP_VALUE, multiIndex?:number){
    if(model instanceof CustomModel) {
      model = model.getDelegateModel();
    }
    let valueGetters:Map<string, Function> = RmTypeModelValueGetter.getValueGetters(model);
    if(valueGetters.has(prop)){
      return valueGetters.get(prop)(value, multiIndex)
    }
      throw new Error(`SCRIPT API ERROR - no setter for property: ${prop}. Use ${Array.from(valueGetters.keys())} property names in parameters for ${RmType[model.getRmType()]} `,);
  }

  private static collectToVOArray(values: Map<string, any>): any[] {
    let value: any[] = [];
    values.forEach((valArr: any[], key: string) => {
      if(valArr) {
        valArr.forEach((currVal: any, ind: number) => {
          let currIndVal = value[ind];
          if (!currIndVal) {
            currIndVal = {};
          }
          currIndVal[key] = currVal;
          value[ind] = currIndVal;
        });
      }
    });
    return value;
  }

  static getModelGetterNames(model: FormObjectModel): Map<string, string> {
    if(model instanceof CustomModel) {
      model = model.getDelegateModel();
    }
    let keyVals: string[][];
    switch (model.getRmType()) {

      case RmType.DV_CODED_TEXT:
        keyVals = [[RmTypeModelValueGetter.MODEL_PROP_VALUE, 'codeValue'], [RmTypeModelValueGetter.MODEL_PROP_CODE, 'codeValue'], [RmTypeModelValueGetter.MODEL_PROP_CODED_LABEL, 'labelValue']];
        break;

      case RmType.DV_ORDINAL:
        keyVals = [[RmTypeModelValueGetter.MODEL_PROP_VALUE, 'codeValue'], [RmTypeModelValueGetter.MODEL_PROP_CODE, 'codeValue'], [RmTypeModelValueGetter.MODEL_PROP_CODED_LABEL, 'labelValue']];
        break;

      case RmType.DV_TEXT:
        keyVals = [[RmTypeModelValueGetter.MODEL_PROP_VALUE, 'textValue']];
        break;

      case RmType.DV_BOOLEAN:
        keyVals = [[RmTypeModelValueGetter.MODEL_PROP_VALUE, 'booleanValue']];
        break;

      case RmType.DV_COUNT:
        keyVals = [[RmTypeModelValueGetter.MODEL_PROP_VALUE, 'countValue']];
        break;

      case RmType.DV_DATE:
        keyVals = [[RmTypeModelValueGetter.MODEL_PROP_VALUE, 'dateValue']];
        break;

      case RmType.DV_DATE_TIME:
        keyVals = [[RmTypeModelValueGetter.MODEL_PROP_VALUE, 'dateTimeValue']];
        break;

      case RmType.DV_DURATION:
        keyVals = [[RmTypeModelValueGetter.MODEL_PROP_VALUE, 'durationValue']];
        break;

      case RmType.DV_EHR_URI:
        keyVals = [[RmTypeModelValueGetter.MODEL_PROP_VALUE, 'ehrUriValue']];
        break;

      case RmType.DV_MULTIMEDIA:
        keyVals = [[RmTypeModelValueGetter.MODEL_PROP_VALUE, 'uriValue']];
        break;

      case RmType.DV_ORDINAL:
        keyVals = [[RmTypeModelValueGetter.MODEL_PROP_VALUE, 'codeValue']];
        break;

      case RmType.DV_PROPORTION:
        keyVals = [[RmTypeModelValueGetter.MODEL_PROP_PROPOR_DENOMI, 'denominatorValue'], [RmTypeModelValueGetter.MODEL_PROP_PROPOR_NUMERA, 'numeratorValue']];
        break;

      case RmType.DV_QUANTITY:
        keyVals = [[RmTypeModelValueGetter.MODEL_PROP_QUANT_MAGNITUDE, 'magnitudeValue'], [RmTypeModelValueGetter.MODEL_PROP_QUANT_UNIT, 'unitValue']];
        break;

      case RmType.DV_TIME:
        keyVals = [[RmTypeModelValueGetter.MODEL_PROP_VALUE, 'timeValue']];
        break;

      case RmType.DV_URI:
        keyVals = [[RmTypeModelValueGetter.MODEL_PROP_VALUE, 'uriValue']];
        break;
      case RmType.DV_IDENTIFIER:
        keyVals = [[RmTypeModelValueGetter.MODEL_PROP_VALUE, 'idValue']];
        break;
    }

    return new Map(keyVals as any) as Map<string, string>;
  }

  constructor() { }

}

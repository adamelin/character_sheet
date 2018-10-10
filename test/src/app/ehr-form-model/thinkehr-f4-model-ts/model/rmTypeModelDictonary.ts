import {IdentifierFieldModel} from "./fieldModel/IdentifierFieldModel";
import {RmType} from "../RmType";
import {EhrUriFieldModel} from "./fieldModel/EhrUriFieldModel";
import {UriFieldModel} from "./fieldModel/UriFieldModel";
import {DurationFieldModel} from "./fieldModel/DurationFieldModel";
import {CountFieldModel} from "./fieldModel/CountFieldModel";
import {OrdinalFieldModel} from "./fieldModel/OrdinalFieldModel";
import {DateTimeFieldModel} from "./fieldModel/DateTimeFieldModel";
import {TimeFieldModel} from "./fieldModel/TimeFieldModel";
import {DateFieldModel} from "./fieldModel/DateFieldModel";
import {BooleanFieldModel} from "./BooleanFieldModel";
import {MultimediaFieldModel} from "./fieldModel/MultimediaFieldModel";
import {ProportionFieldModel} from "./fieldModel/ProportionFieldModel";
import {TextFieldModel} from "./fieldModel/TextFieldModel";
import {CodedTextFieldModel} from "./fieldModel/CodedTextFieldModel";
import {QuantityFieldModel} from "./fieldModel/QuantityFieldModel";
import {GenericFieldsetModel} from "./GenericFieldsetModel";
import {FormRootModel} from "./FormRootModel";
import {GenericButtonModel} from "./GenericButtonModel";

export const rmTypeModelDictionary:any = {
  [RmType.FORM_DEFINITION]: FormRootModel,
  [RmType.GENERIC_FIELDSET]: GenericFieldsetModel,
  [RmType.DV_QUANTITY]: QuantityFieldModel,
  [RmType.DV_CODED_TEXT]: CodedTextFieldModel,
  [RmType.DV_TEXT]: TextFieldModel,
  [RmType.DV_PROPORTION]: ProportionFieldModel,
  [RmType.DV_MULTIMEDIA]: MultimediaFieldModel,
  [RmType.DV_BOOLEAN]: BooleanFieldModel,
  [RmType.DV_DATE]: DateFieldModel,
  [RmType.DV_TIME]: TimeFieldModel,
  [RmType.DV_DATE_TIME]: DateTimeFieldModel,
  [RmType.DV_ORDINAL]: OrdinalFieldModel,
  [RmType.DV_COUNT]: CountFieldModel,
  [RmType.DV_DURATION]: DurationFieldModel,
  [RmType.DV_URI]: UriFieldModel,
  [RmType.DV_EHR_URI]: EhrUriFieldModel,
  [RmType.DV_IDENTIFIER]: IdentifierFieldModel
};

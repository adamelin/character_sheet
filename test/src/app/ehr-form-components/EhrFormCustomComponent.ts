import {FormRepeatableElementModel} from "../ehr-form-model/thinkehr-f4-model-ts/model/FormRepeatableElementModel";
import {CustomModel} from "../ehr-form-model/thinkehr-f4-model-ts/model/fieldModel/CustomModel";
import {FormGroup} from "@angular/forms";
import {EventEmitter, SimpleChanges} from "@angular/core";
import {ValidateOptions} from "mrd-ui-components";
import {NodeModel} from '../ehr-form-model/thinkehr-f4-model-ts/model/NodeModel';

export interface EhrFormCustomComponent {
  model: FormRepeatableElementModel;
  ehrFormGroup: FormGroup;
  validateFormEvent: EventEmitter<ValidateOptions>;
  customModel?:CustomModel;
  ngOnChanges?:NgChangesFn;
  // needed only if parent displays children one by one
  onEhrComponentRendered?: EventEmitter<NodeModel>
}
export interface NgChangesFn{
  (sc:SimpleChanges):void;
}

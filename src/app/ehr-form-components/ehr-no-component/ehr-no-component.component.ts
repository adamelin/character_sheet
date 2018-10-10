import {
  Component,
  Input,
  ChangeDetectionStrategy,
  EventEmitter
} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {ValidateOptions} from "mrd-ui-components";
import {EhrFormCustomComponent} from "../EhrFormCustomComponent";
import {CustomModel} from "../../ehr-form-model/thinkehr-f4-model-ts/model/fieldModel/CustomModel";
import {NodeModel} from "../../ehr-form-model/thinkehr-f4-model-ts/model/NodeModel";
import {RmType} from "../../ehr-form-model/thinkehr-f4-model-ts/RmType";

@Component({
  selector: 'ehr-no-component',
  template: 'Custom component type for <span *ngIf="customModel">componentId="{{customModel?.getDelegateModel().getCustomComponentId()}}"</span>  <span *ngIf="model">rmType="{{RmType[model.getRmType()]}}"</span>  not defined.',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EhrNoComponentComponent implements EhrFormCustomComponent{

  @Input()
  model: NodeModel;

  @Input()
  customModel: CustomModel;

  @Input()
  ehrFormGroup: FormGroup;

  @Input()
  validateFormEvent: EventEmitter<ValidateOptions>;

  RmType:any=RmType;
}

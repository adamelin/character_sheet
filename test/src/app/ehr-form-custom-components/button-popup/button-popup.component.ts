import {
  Component, OnInit, Input, EventEmitter, OnChanges, SimpleChanges, OnDestroy,
  ChangeDetectorRef, ChangeDetectionStrategy
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ValidateOptions } from 'mrd-ui-components';
import { Subscription , Observable} from 'rxjs';
import { EhrModelObservable } from '../../ehr-form-model/ehr-model-observable';
import { CustomModel } from '../../ehr-form-model/thinkehr-f4-model-ts/model/fieldModel/CustomModel';
import { EhrFormCustomComponent } from '../../ehr-form-components/EhrFormCustomComponent';
import { QuantityFieldModel } from '../../ehr-form-model/thinkehr-f4-model-ts/model/fieldModel/QuantityFieldModel';
import {RmTypeModelValueGetter} from "../../ehr-form-model/thinkehr-f4-model-ts/model/RmTypeModelValueGetter";
import {NodeModel} from "../../ehr-form-model/thinkehr-f4-model-ts/model/NodeModel";
import {FormRepeatableElementModel} from "../../ehr-form-model/thinkehr-f4-model-ts/model/FormRepeatableElementModel";

@Component({
  selector: 'button-popup',
  templateUrl: './button-popup.component.html',
  styleUrls: ['./button-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonPopupComponent implements EhrFormCustomComponent {

  model: FormRepeatableElementModel;

  customModel: CustomModel;

  @Input()
  ehrFormGroup: FormGroup;

  @Input()
  validateFormEvent: EventEmitter<ValidateOptions>;

  constructor(protected ehrModelObservable:EhrModelObservable) {
  }

  onClick(){
    alert("Custom button popup path="+(<NodeModel>this.customModel.getParentModel()).getPath())
  }

}


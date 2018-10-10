import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ValidateOptions} from 'mrd-ui-components';
import {EhrLayoutHelper} from '../../utils/EhrLayoutHelper';
import {FormObjectModel} from '../../../ehr-form-model/thinkehr-f4-model-ts/model/FormObjectModel';
import {NodeModel} from '../../../ehr-form-model/thinkehr-f4-model-ts/model/NodeModel';

@Component({
  selector: 'column-renderer',
  templateUrl: './column-renderer.component.html',
  styleUrls: ['./column-renderer.component.scss']
})
export class ColumnRendererComponent {

  @Input()
  columns: any[];

  @Input()
  ehrFormGroup: FormGroup;

  @Input()
  validateFormEvent: EventEmitter<ValidateOptions>;

  @Input()
  parentModel: FormObjectModel;

  @Output()
  onEhrComponentRendered: EventEmitter<NodeModel> = new EventEmitter();

  constructor() {
  }

  childComponentRendered(model: NodeModel) {
    this.onEhrComponentRendered.next(model);
  }

}

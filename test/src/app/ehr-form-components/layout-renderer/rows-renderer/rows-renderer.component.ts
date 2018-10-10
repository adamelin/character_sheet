import {Component, OnInit, Input, EventEmitter, OnChanges, SimpleChanges, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {ValidateOptions} from "mrd-ui-components";
import {FormRootModel} from "../../../ehr-form-model/thinkehr-f4-model-ts/model/FormRootModel";
import {FormObjectModel} from "../../../ehr-form-model/thinkehr-f4-model-ts/model/FormObjectModel";
import {EhrLayoutHelper} from "../../utils/EhrLayoutHelper";
import {FormRepeatableElementModel} from "../../../ehr-form-model/thinkehr-f4-model-ts/model/FormRepeatableElementModel";
import {NodeModel} from '../../../ehr-form-model/thinkehr-f4-model-ts/model/NodeModel';

@Component({
  selector: 'rows-renderer',
  templateUrl: './rows-renderer.component.html',
  styleUrls: ['./rows-renderer.component.scss']
})
export class RowsRendererComponent implements OnChanges {

  @Input()
  rows: any[];

  @Input()
  ehrFormGroup: FormGroup;

  @Input()
  validateFormEvent: EventEmitter<ValidateOptions>;

  @Input()
  parentModel: FormObjectModel;

  @Output()
  onEhrComponentRendered: EventEmitter<NodeModel> = new EventEmitter();

  EhrLayoutHelper: any = EhrLayoutHelper;

  constructor() { }

  ngOnChanges(simpleChanges:SimpleChanges){
    /*if(simpleChanges.hasOwnProperty('model') && simpleChanges.model.currentValue) {
      let currentModel = simpleChanges.model.currentValue;

      if(currentModel.isContainer()) {

      }
      let renderMin = currentModel.getViewConfig().getMin();
      let annMin = parseInt(currentModel.getAnnotationValue('renderMin'), 10);
      if(!isNaN(annMin) && annMin && annMin>renderMin) {
        renderMin = annMin;

        let maxVal = currentModel.getMax();
        if(renderMin>maxVal) {
          renderMin = maxVal;
        }
      }
      //TODO check if container group was manually edited/removed/added
      let deltaToMinRequired = this.ehrLayoutHelper.supportsMulti(currentModel) ? renderMin - this.ehrLayoutHelper.getMultiSiblingsCount(currentModel) : 0;
      if (deltaToMinRequired > 0) {
        this.ehrLayoutHelper.duplicateContainer(deltaToMinRequired, this.model as FormRepeatableElementModel);
      }
    }*/
  }

  childComponentRendered(model:NodeModel){
    this.onEhrComponentRendered.next(model);
  }


}

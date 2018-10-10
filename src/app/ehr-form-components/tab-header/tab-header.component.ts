import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {FormRepeatableElementModel} from "../../ehr-form-model/thinkehr-f4-model-ts/model/FormRepeatableElementModel";
import {TabGroup, TabService} from "../utils/TabService";
import {EhrLayoutHelper} from "../utils/EhrLayoutHelper";

@Component({
  selector: 'tab-header',
  templateUrl: './tab-header.component.html',
  styleUrls: ['./tab-header.component.scss']
})
export class TabHeaderComponent {

  @Input()
  model: FormRepeatableElementModel;

  @Input()
  language: string;

  @Input()
  showValidationMarks: boolean;

  EhrLayoutHelper = EhrLayoutHelper;
  inTabGroup: TabGroup;

  constructor( public tabService: TabService) {  }
}

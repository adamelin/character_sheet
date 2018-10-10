import {AfterViewInit, Directive, EventEmitter, Output} from '@angular/core';
import {NodeModel} from '../ehr-form-model/thinkehr-f4-model-ts/model/NodeModel';


@Directive({
  selector: '[ehr-on-rendered-emitter]',
})
export class EhrOnRenderedEmitter implements AfterViewInit {

  @Output()
  onEhrComponentRendered: EventEmitter<NodeModel> = new EventEmitter();

  constructor() {
  }

  ngAfterViewInit() {
    this.onEhrComponentRendered.next();
  }

}

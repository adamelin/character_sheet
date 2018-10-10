import {Component, OnInit, Renderer, ElementRef, Input, Output, EventEmitter, Renderer2} from '@angular/core';
import {EhrFieldMultiCtx} from "../utils/ehr-field-multi-ctx";

@Component({
  selector: 'ehr-single-field-multi-controls',
  templateUrl: './ehr-single-field-multi-controls.component.html',
  styleUrls: ['./ehr-single-field-multi-controls.component.scss']
})
export class EhrSingleFieldMultiControlsComponent implements OnInit {

  @Input()
  multiControlsHidden: boolean;

  @Input()
  multiIndex: number;

  @Input()
  isLast: boolean;

  @Input()
  removeMultiDisabled: boolean;

  @Input()
  addMultiDisabled: boolean;

  @Output()
  addMultiInput: EventEmitter<any> = new EventEmitter();

  @Output()
  removeMultiInput: EventEmitter<any> = new EventEmitter();

  constructor(private elementRef:ElementRef, private renderer:Renderer2) {}

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, 'input-group-btn');
    this.renderer.addClass(this.elementRef.nativeElement, 'single-field-multi-buttons');
    this.renderer.addClass(this.elementRef.nativeElement, 'hide-in-ehr-view-mode');
  }

}

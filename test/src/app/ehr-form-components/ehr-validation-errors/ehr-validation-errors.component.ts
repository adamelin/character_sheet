import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ehr-validation-errors',
  templateUrl: './ehr-validation-errors.component.html',
  styleUrls: ['./ehr-validation-errors.component.scss']
})
export class EhrValidationErrorsComponent implements OnInit {

  @Input()
  error: any;

  constructor() { }

  ngOnInit() {
  }

}

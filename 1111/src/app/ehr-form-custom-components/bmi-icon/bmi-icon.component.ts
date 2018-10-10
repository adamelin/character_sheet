import {Component, OnInit, Input, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {BmiSimpleComponent} from "../bmi-simple/bmi-simple.component";
import {CustomModel} from "../../ehr-form-model/thinkehr-f4-model-ts/model/fieldModel/CustomModel";
import {EhrModelObservable} from "../../ehr-form-model/ehr-model-observable";

@Component({
  selector: 'bmi-icon',
  templateUrl: './bmi-icon.component.html',
  styleUrls: ['./bmi-icon.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class BmiIconComponent extends BmiSimpleComponent {

  constructor(protected ehrModelObservable:EhrModelObservable, private changeDetectorRef:ChangeDetectorRef){
    super(ehrModelObservable);
  }

  bmiVO: {value: number, goodBMI: boolean};

  connectValues():void{
    super.connectValues();
    if(this.modelValue$) {
      this.modelSubscriptions.push(this.modelValue$.map(v=>parseFloat(v)).subscribe((val:number) => {
        this.bmiVO = {value: val > 0 ? val : null, goodBMI: this.inGoodBMIRange(val)};
        this.changeDetectorRef.markForCheck();
      }));
    }
  }

  inGoodBMIRange(bmiValue: number): boolean {
    return bmiValue && bmiValue > 18.5 && bmiValue < 25;
  };
}


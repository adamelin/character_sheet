import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ValidateOptions} from 'mrd-ui-components';
import {Observable, Subscription} from 'rxjs';
import {EhrModelObservable} from '../../ehr-form-model/ehr-model-observable';
import {CustomModel} from '../../ehr-form-model/thinkehr-f4-model-ts/model/fieldModel/CustomModel';
import {EhrFormCustomComponent} from '../../ehr-form-components/EhrFormCustomComponent';
import {QuantityFieldModel} from '../../ehr-form-model/thinkehr-f4-model-ts/model/fieldModel/QuantityFieldModel';
import {NodeModel} from "../../ehr-form-model/thinkehr-f4-model-ts/model/NodeModel";
import {FormRepeatableElementModel} from "../../ehr-form-model/thinkehr-f4-model-ts/model/FormRepeatableElementModel";

@Component({
  selector: 'coded-simple',
  templateUrl: './coded-simple.component.html',
  styleUrls: ['./coded-simple.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodedSimpleComponent implements OnDestroy, EhrFormCustomComponent {

  @Input()
  set model(value: FormRepeatableElementModel) {
    this.modelValue$ = null;
    this.unsubscribeAll();
    this._model = value;
    this.connectValues();
  }

  get model(): FormRepeatableElementModel {
    return this._model;
  }

  private _model: FormRepeatableElementModel;

  @Input()
  ehrFormGroup: FormGroup;

  @Input()
  validateFormEvent: EventEmitter<ValidateOptions>;

  @Input()
  set customModel(cm: CustomModel){
    this.modelValue$ = null;
    this.unsubscribeAll();
    this._cm = cm;
    this.connectValues();
  }

  get customModel(): CustomModel{
    return this._cm;
  }

  private _cm: CustomModel;

  protected connectValues(): void {
    let elementModel: FormRepeatableElementModel = this._model;
    let customM: CustomModel = this._cm;
    if (elementModel && customM) {
      customM.getDelegateModel().addUpdatedValueCallback(()=>{
          console.log("UPDATED",)
      })
      elementModel['addUpdatedValueCallback'](()=>{
        console.log("UPDATED1",)
      })
      let targetW: QuantityFieldModel = customM.findModelWithTag('weight', true) as QuantityFieldModel;
      let targetH: QuantityFieldModel = customM.findModelWithTag('height', true) as QuantityFieldModel;

      if (targetW && targetH) {
        this.modelValue$ = this.ehrModelObservable.fromValue(elementModel as NodeModel);

        let weight$: Observable<string> = this.ehrModelObservable.fromValue(targetW, null, 0);
        let height$ = this.ehrModelObservable.fromValue(targetH, null, 0);
        this.modelSubscriptions.push(height$.combineLatest(weight$).subscribe((heightWeightArr:any[]) => {
          let bmiValStr: string = this.calcBMI(heightWeightArr[0].magnitude, heightWeightArr[1].magnitude);
          //this._model['textValue'](bmiValStr);
          //RmTypeModelValueGetter.setValue(elementModel as NodeModel, bmiValStr);
          })
        );
      }
    }
  }

  modelValue$: Observable<string>;

  protected modelSubscriptions: Subscription[] = [];

  constructor(protected ehrModelObservable:EhrModelObservable) {
  }

  ngOnDestroy() {
    this.unsubscribeAll();
  }

  private unsubscribeAll() {
    this.modelSubscriptions.forEach((subs: Subscription) => {
      subs.unsubscribe();
    });
    this.modelSubscriptions = [];
  }

  private calcBMI(heightValue: string, weightValue: string) {
    let hVal: number, wVal: number;
    let bmiVal: string = '';
    if (heightValue) {
      hVal = parseInt(heightValue, 10);
    }
    if (weightValue) {
      wVal = parseInt(weightValue, 10);
    }

    if (hVal && wVal) {
      let bmiRaw = wVal * 10000 / hVal / hVal;
      bmiVal = (Math.round(bmiRaw * 100) / 100).toString();
    }
    return bmiVal;
  }
}


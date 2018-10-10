import {
  Component, EventEmitter, Input, ChangeDetectorRef, Renderer, ElementRef,
  OnChanges, SimpleChanges, transition, Renderer2, Inject
} from '@angular/core';
import {AbstractEhrComponent} from "../abstract-ehr-component.component";
import {FormGroup, ValidatorFn, FormControl, FormArray} from "@angular/forms";
import {EhrValidationMessageResolver} from "../utils/validation/ehr-validation-message-resolver";
import {EhrFormConfig} from "../EhrFormConfig";
import {EhrFormState} from "../utils/EhrFormState";
import {EhrLayoutHelper} from "../utils/EhrLayoutHelper";
import {ValidateOptions, MrdValidators, InputPresentationType, MrdQuantityUnit} from "mrd-ui-components"
import {DurationFieldModel} from "../../ehr-form-model/thinkehr-f4-model-ts/model/fieldModel/DurationFieldModel";
import {InputType} from "../../ehr-form-model/thinkehr-f4-model-ts/view/InputType";
import {ThinkEhrUtil} from "../../ehr-form-model/thinkehr-f4-model-ts/ThinkEhrUtil";
import {NodeModel} from "../../ehr-form-model/thinkehr-f4-model-ts/model/NodeModel";
import {FieldPresentation} from "../../ehr-form-model/thinkehr-f4-model-ts/view/FieldPresentation";
import {InputItem} from "../../ehr-form-model/thinkehr-f4-model-ts/InputItem";
import {isUndefined} from "util";
import {EhrFieldMultiCtx} from "../utils/ehr-field-multi-ctx";
import {PeriodISO8601Parser} from "../../ehr-form-model/thinkehr-f4-model-ts/parsing/PeriodISO8601Parser";
import {Observable} from "rxjs";
import {TranslateService} from "ng2-translate";
import {EhrContext} from "../../ehr-form-model/thinkehr-f4-model-ts/EhrContext";
 import {ScriptApi} from "../ScriptApi";
 import {EhrModelObservable} from "../../ehr-form-model/ehr-model-observable";
import {Field} from "../../ehr-form-model/thinkehr-f4-model-ts/view/Field";
import {FORM_SCRIPT_API} from "../ehr-form/FormScriptApiProvider";
import {FormScriptApi} from "../ehr-form/FormScriptApi";
import {EhrValidationHelper} from "mrd-ui-components";

@Component({
  selector: 'ehr-duration',
  templateUrl: './ehr-duration.component.html',
  styleUrls: ['./ehr-duration.component.scss']
})
export class EhrDurationComponent extends AbstractEhrComponent implements OnChanges {

  @Input()
  model: DurationFieldModel;

  @Input()
  ehrFormGroup: FormGroup;

  @Input()
  validateFormEvent: EventEmitter<ValidateOptions>;

  private fieldValidationFunctions: {[durationFieldId: string]: ValidatorFn[]};

  private durationFormGroupValidationFunctions: ValidatorFn[];

  private translatedKeyValues: Observable<{[key: string]: string}>;
  private hiddenKeys: string[]=[];
  private durationKeys = ['year', 'month', 'week', 'day', 'hour', 'minute', 'second'];

  constructor(elementRef: ElementRef, renderer: Renderer2, changeDetectorRef: ChangeDetectorRef, EhrLayoutHelper: EhrLayoutHelper,
              ehrFormState: EhrFormState, ehrFormConfig: EhrFormConfig, validationResolver: EhrValidationMessageResolver, translateService:TranslateService,  @Inject(FORM_SCRIPT_API) public scriptApi: FormScriptApi, ehrModelObservable:EhrModelObservable, public ehrValidationHelper: EhrValidationHelper) {
    super(elementRef, renderer, changeDetectorRef, EhrLayoutHelper, ehrFormState, ehrFormConfig, validationResolver, scriptApi, ehrModelObservable, ehrValidationHelper) ;

    this.translatedKeyValues = this.ehrFormState.getFormContext().flatMap((fCtx: EhrContext) => {

      return Observable.zip(
        translateService.get('duration.'+this.durationKeys[0]),
        translateService.get('duration.'+this.durationKeys[1]),
        translateService.get('duration.'+this.durationKeys[2]),
        translateService.get('duration.'+this.durationKeys[3]),
        translateService.get('duration.'+this.durationKeys[4]),
        translateService.get('duration.'+this.durationKeys[5]),
        translateService.get('duration.'+this.durationKeys[6])
      );
    }).map((translatedValsArr)=>{
      let ret = {};
      this.durationKeys.forEach((key: string, index: number) => {
        let translation = translatedValsArr[index];
        if (translation && translation!=='duration.'+key) {
          ret[key] = translation;
        }
      });
      return ret;
    });
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    super.ngOnChanges(simpleChanges);
    if(simpleChanges.hasOwnProperty('model')){
      let newModel: DurationFieldModel = simpleChanges['model'].currentValue;
      if(newModel) {
        this.fieldValidationFunctions=newModel.getFieldInputNames().reduce((state: {[durationFieldId: string]: ValidatorFn[]}, fName:string)=>{
          let fValidationFns: ValidatorFn[] = [MrdValidators.isNumeric()];
          let minVal = newModel.minValueFor(fName);
          if(minVal!=null) {
            fValidationFns.push(MrdValidators.minMaxValue(newModel.minOperatorFor(fName) || '>=', minVal));
          }
          let maxVal = newModel.maxValueFor(fName);
          if(maxVal!=null) {
            fValidationFns.push(MrdValidators.minMaxValue(newModel.maxOperatorFor(fName) || '<=', maxVal));
          }
          state[fName] = fValidationFns;
          return state;
        }, {});
        this.durationFormGroupValidationFunctions = newModel.isRequired() ? [MrdValidators.required()] : [];
        this.hiddenKeys = this.durationKeys.filter((key: string) => {
          let field: Field = newModel.getViewConfig().getFields(key);
          return field && field.hidden;
        });
      }
    }
  }

  getModelValuesArrObs(forModel: NodeModel):Observable<any> {
    //set default values
    (forModel as DurationFieldModel).durationValue(undefined, 0);
    return super.getModelValuesArrObs(forModel).map(v => v.map((v1: any) => {
      //transforming period string (ex. 'P1Y') to object with null for defined inputs {year:1, month:null}
      return DurationFieldModel.mapPeriodStringValueToObject(v1, (<DurationFieldModel>forModel).getFieldInputNames());
    }));
  }

  /*updateModelValuesObs(forModel:NodeModel){
    super.updateModelValuesObs((forModel));
    this.translatedKeyValues=this.modelValues$.map((keyValArr:any[])=>{
      console.log("KKKKKKKKK",keyValArr)
        return keyValArr
    })
  }*/

  protected get modelGetterSetterMethodName(): string {
    return 'durationValue';
  };

  protected get modelEmptyValue(): any {
    return DurationFieldModel.mapPeriodStringValueToObject('', (<DurationFieldModel>this.model).getFieldInputNames());
  };

  onDurationValue(val: any, multiIndex: number, durationInputId:string): void {
    if(durationInputId ){
      if(val<0 || isNaN(val)){
        val = 0;
      }
      let currValue = this.model.fieldValue(durationInputId, undefined, multiIndex);
      if (currValue !== val) {
        this.model.fieldValue(durationInputId, val, multiIndex);
      }
    }
  }

  onAddMultiInput() {
    this.modelValues$.take(1).map(arr => arr.length).subscribe((modelValuesLength) => {
      this.model.durationValue('', modelValuesLength);
    });
  }

  onRemoveMultiInput(atIndex: number) {
    super.onRemoveMultiInput(null);
    this.model.durationValue(null, atIndex);
  }

  protected resetMultiButtonsState(valArr) {
    valArr = valArr.map((val) => {
      return Object.keys(val).some((key:string)=>{
          return ThinkEhrUtil.isNumber(val[key]);
      })?true:null;
    });
    this.addDisabledIndexes = EhrFieldMultiCtx.getAddDisabledIndexes(valArr, this.model);
    this.removeDisabledIndexes = EhrFieldMultiCtx.getRemoveDisabledIndexes(valArr, this.model);
  }

}

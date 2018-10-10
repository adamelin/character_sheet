import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import {AbstractEhrComponent} from "../abstract-ehr-component.component";
import {FormGroup} from "@angular/forms";
import {EhrValidationMessageResolver} from "../utils/validation/ehr-validation-message-resolver";
import {EhrFormConfig} from "../EhrFormConfig";
import {EhrFormState} from "../utils/EhrFormState";
import {EhrLayoutHelper} from "../utils/EhrLayoutHelper";
import {ValidateOptions} from "mrd-ui-components"
import {EhrModelObservable} from "../../ehr-form-model/ehr-model-observable";
import {MultimediaFieldModel} from "../../ehr-form-model/thinkehr-f4-model-ts/model/fieldModel/MultimediaFieldModel";
import {NodeModel} from "../../ehr-form-model/thinkehr-f4-model-ts/model/NodeModel";
import {EhrFieldMultiCtx} from "../utils/ehr-field-multi-ctx";
import {EhrContext} from "../../ehr-form-model/thinkehr-f4-model-ts/EhrContext";
import {FileUploadStatus} from "../../EhrUploadService";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
import {FORM_SCRIPT_API} from "../ehr-form/FormScriptApiProvider";
import {FormScriptApi} from "../ehr-form/FormScriptApi";
import {EhrValidationHelper} from "mrd-ui-components";

@Component({
  selector: 'ehr-multimedia',
  templateUrl: './ehr-multimedia.component.html',
  styleUrls: ['./ehr-multimedia.component.scss']
})
export class EhrMultimediaComponent extends AbstractEhrComponent implements OnChanges {

  @Input()
  model: MultimediaFieldModel;

  @Input()
  ehrFormGroup: FormGroup;

  @Input()
  validateFormEvent: EventEmitter<ValidateOptions>;

  protected ctxUploadEnabled: boolean;
  protected uploadDisabled: boolean;
  protected enableKeyboardInput: boolean;
  private formCtxSubscription: Subscription;

  private displayContentUri: boolean;
  private hideContentPreview: boolean;

  constructor(elementRef: ElementRef, renderer: Renderer2, changeDetectorRef: ChangeDetectorRef, EhrLayoutHelper: EhrLayoutHelper,
              ehrFormState: EhrFormState, ehrFormConfig: EhrFormConfig, validationResolver: EhrValidationMessageResolver,  @Inject(FORM_SCRIPT_API) public scriptApi: FormScriptApi, ehrModelObservable: EhrModelObservable, public ehrValidationHelper: EhrValidationHelper) {
    super(elementRef, renderer, changeDetectorRef, EhrLayoutHelper, ehrFormState, ehrFormConfig, validationResolver, scriptApi, ehrModelObservable, ehrValidationHelper);
  }

  ngOnInit() {
    super.ngOnInit();
    this.formCtxSubscription = this.ehrFormState.getFormContext().subscribe((fCtx: EhrContext) => {
      this.ctxUploadEnabled = !!fCtx.uploadFiles;
      this.displayContentUri = fCtx.multimediaContentUriDisplay;
      this.hideContentPreview = fCtx.hideMultimediaContentPreview;
    });
  }

  ngOnChanges(sc: SimpleChanges) {
    super.ngOnChanges(sc);
    if (sc.hasOwnProperty('model')) {
      let currModel: MultimediaFieldModel = sc.model.currentValue;
      this.uploadDisabled = currModel.hasTag('noUpload');
      this.enableKeyboardInput = currModel.hasTag('enableInput');
    }
  }

  getModelValuesArrObs(forModel: NodeModel):Observable<any> {
    //TODO make model immutable - when model is reset values are not immutable - we have distinctUntilChanged problem and fixing it here
    //setting default values
    (forModel as MultimediaFieldModel).uriValue(undefined, 0);
    (forModel as MultimediaFieldModel).mimeTypeValue(undefined, 0);
    return super.getModelValuesArrObs(forModel).map(v => {
      let valArr = v.map(v1 => Object.assign({}, v1));

      let last = valArr[valArr.length - 1];
      if(valArr.length>0 && last && last['|uri'] && this.model.isMulti()) {
        valArr.push({'|uri':''})
      }
      return valArr
    });
  }

  protected get modelGetterSetterMethodName(): string {
    return 'getValue';
  };

  protected get modelEmptyValue(): any {
    return {'|uri': null, '|mimetype': null};
  };

  updateUri(val: any, index: number): void {
    if (this.model[this.modelGetterSetterMethodName](undefined, index) != val) {
      //console.log("MODEL UPDATEEEEE=", val, " index=", index, " current=",this.model[this.modelGetterSetterMethodName](undefined, index), this.model.getValue(undefined, undefined));
      (<MultimediaFieldModel>this.model).uriValue(val, index);
    }
  }

  updateMime(val: any, index: number): void {
    if (this.model[this.modelGetterSetterMethodName](undefined, index) != val) {
      //console.log("MODEL UPDATEEEEE=", val, " index=", index, " current=",this.model[this.modelGetterSetterMethodName](undefined, index), this.model.getValue(undefined, undefined));
      (<MultimediaFieldModel>this.model).mimeTypeValue(val, index);
    }
  }

  onAddMultiInput() {
    this.modelValues$.take(1).map(arr => arr.length).subscribe((modelValuesLength) => {
      this.model.setValue({}, modelValuesLength);
    });
  }

  onRemoveMultiInput(atIndex: number) {
    let fUri: string = this.model.getValue('|uri', atIndex);
    if(!!fUri) {
      this.ehrFormState.getFormContext().take(1).subscribe((fCtx: EhrContext) => {
        fCtx.uploadedFileRemoved(fUri);
      })
    }

    super.onRemoveMultiInput(null);
    this.model.setValue(null, atIndex);
  }

  onFileSelected(ev, index) {
    let curInputEl: HTMLInputElement = ev.target;
    let curFiles: FileList = curInputEl.files;
    if (curFiles.length > 0) {
      this.ehrFormState.getFormContext().take(1).subscribe((fCtx: EhrContext) => {
        fCtx.uploadFiles(curFiles, this.model.annotationValue('uploadUrl')).subscribe((status: FileUploadStatus[]) => {
          status.forEach((res: FileUploadStatus) => {
            if (res.success) {
              let fileUrl: string = res.fileUrl;
              let resMimeType: string = res.fileMimeType;
              /*if there'd be only one button for adding values - but then you could not replace value on particular file input
              let lastIndex = 0;
              if (this.model.isMulti()) {
                lastIndex = this.model.uriValue(undefined, undefined).length;
                if (lastIndex == 1 && !this.model.uriValue(undefined, 0)) {
                  lastIndex = 0;
                }
              }*/
              this.model.uriValue(fileUrl, index);
              this.model.mimeTypeValue(resMimeType, index);
            } else {
              alert(res.message);
            }
          });
          curInputEl.value = "";
        });
      });
    }
  }

  protected resetMultiButtonsState(valArr) {
    valArr = valArr.map((val) => {
      return val && val['|uri'] ? true : null;
    });
    this.addDisabledIndexes = EhrFieldMultiCtx.getAddDisabledIndexes(valArr, this.model);
    this.removeDisabledIndexes = EhrFieldMultiCtx.getRemoveDisabledIndexes(valArr, this.model);
  }

  ngOnDestroy() {
    if (this.formCtxSubscription) {
      this.formCtxSubscription.unsubscribe();
    }
  }

}

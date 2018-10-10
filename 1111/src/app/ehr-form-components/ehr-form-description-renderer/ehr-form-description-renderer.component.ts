import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  ViewChild
} from '@angular/core';
import {EhrContext} from '../../ehr-form-model/thinkehr-f4-model-ts/EhrContext';
import {ThinkEhrModelParser} from '../../ehr-form-model/thinkehr-f4-model-ts/parsing/ThinkEhrModelParser';
import {TerminologyService} from '../../TerminologyService';
import {FormRootModel} from '../../ehr-form-model/thinkehr-f4-model-ts/model/FormRootModel';
import {EhrFormComponent} from '../ehr-form/ehr-form.component';
import {NodeModel} from "../../ehr-form-model/thinkehr-f4-model-ts/model/NodeModel";
import {Observable} from "rxjs/Observable";
import {FileUploadService} from "../../FileUploadService";
import {FileUploadServicePlaceholder} from "../../EhrUploadService";
import {ModelScriptExecutor, ScriptApi} from "../ScriptApi";
import {ViewComponentsRegistryService} from "../registered-components.service";
import {Model} from '../../ehr-form-model';
import {FormObjectModel} from "../../ehr-form-model/thinkehr-f4-model-ts/model/FormObjectModel";

@Component({
  selector: 'ehr-form-description-renderer',
  templateUrl: './ehr-form-description-renderer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EhrFormDescriptionRendererComponent implements OnChanges {

  @Input()
  formConfig: { description: any, layout?: any[], values?: any, context?: EhrContext, displayFormIds?: string[] };

  @Input()
  formContext: EhrContext;

  @Output()
  onValidationChange: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  onFieldValidationChange: EventEmitter<{ model: FormObjectModel, errors: string[] }>
    = new EventEmitter<{ model: FormObjectModel, errors: string[] }>();

  @Output()
  onFormRendered: EventEmitter<FormRootModel> = new EventEmitter<FormRootModel>();

  @Output()
  onFormRenderedOneByOne: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  onValueChange: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('formComp')
  private formComp: EhrFormComponent;

  public formRootModel: FormRootModel;

  get api(): ModelScriptExecutor {
    return this.formComp.api;
  }

  public get componentsRegistry(): ViewComponentsRegistryService {
    return this.formComp.componentsRegistry;
  }

  // local instance of the object, storing al the information about form passed into this component
  form: { description: any, layout?: any[], values?: any, context?: EhrContext, displayFormIds?: string[] };


  constructor(private thinkEhrModelParser: ThinkEhrModelParser, private terminologyService: TerminologyService, private uploadService: FileUploadService) {
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    if (changes.hasOwnProperty('formConfig')) {
      this.form = changes.formConfig.currentValue;
      if (this.form) {
        // check if context is passed
        const providedFormCtx: EhrContext = this.form.context || this.formContext;

        const fCtx = new EhrContext(providedFormCtx);
        if (!fCtx.language) {
          fCtx.language = 'en';
        }
        // check if terminology is passed
        if (!fCtx.getTerminologyItem) {
          fCtx.getTerminologyItem = this.terminologyService.getItem.bind(this.terminologyService);
        }
        if (!fCtx.getTerminologyList) {
          fCtx.getTerminologyList = this.terminologyService.getList.bind(this.terminologyService);
        }
        let isPlaceholderType: boolean = !(this.uploadService instanceof FileUploadServicePlaceholder);
        if (!fCtx.uploadFiles && isPlaceholderType) {
          fCtx.uploadFiles = this.uploadService.uploadFiles.bind(this.uploadService);
        }
        if (!fCtx.uploadedFileRemoved && isPlaceholderType) {
          fCtx.uploadedFileRemoved = this.uploadService.uploadedFileRemoved.bind(this.uploadService);
        }

        this.formContext = fCtx;

        if (!this.form.values) {
          this.form.values = {};
        }
        // parse the description to get the model
        this.formRootModel = this.thinkEhrModelParser.parseFormDescription(fCtx, this.form.description, this.form.values, null) as FormRootModel;
      }
    }
  }

  onValidationUpdated(val) {
    this.onValidationChange.next(val);
  }

  onFormComponentRendered(rootFormModel: FormRootModel) {
    if (rootFormModel && rootFormModel === this.formRootModel) {
      this.onFormRendered.emit(this.formRootModel);
    }
  }

  onFormValueChange(value: { model: Model }) {
    this.onValueChange.emit(value);
  }

  //TODO remove from this component or replace with setLanguage
  changeLanguage() {
    let newCtx = new EhrContext();
    newCtx.language = this.formContext.language === 'sl' ? 'en' : 'sl';
    // TODO: do we really need to change the terminology ?
    newCtx.getTerminologyList = this.terminologyService.getList.bind(this.terminologyService);
    newCtx.getTerminologyItem = this.terminologyService.getItem.bind(this.terminologyService);
    this.formContext = newCtx;
  }

  get isValid(): boolean {
    return this.formComp.isValid;
  }

  validate(): boolean {
    return this.formComp.validate();
  }

  get formValues(): any {
    return this.form.values;
  }

  updateValues(newVals: any, discardCurrentValues?: boolean, onlyUpdateOldProps?: boolean): boolean {
    return this.formComp.updateValues(newVals, discardCurrentValues, onlyUpdateOldProps);
  }

  getFieldValueObservable(fieldModel: NodeModel): Observable<any> {
    return this.formComp.getFieldValueObservable(fieldModel);
  }

  setTranslation(lang: string, keyVals: Object, isDefault: boolean = false) {
    this.formComp.setTranslation(lang, keyVals, isDefault);
  }

}

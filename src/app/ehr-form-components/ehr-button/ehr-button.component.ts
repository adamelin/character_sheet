import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter, Inject,
  Input,
  OnChanges, Output,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import {FormObjectModel} from "../../ehr-form-model/thinkehr-f4-model-ts/model/FormObjectModel";
import {AbstractControl, FormArray, FormGroup} from "@angular/forms";
import {EhrLayoutHelper} from "../utils/EhrLayoutHelper";
import {EhrModelEvent, EhrModelEventType} from "../../ehr-form-model/ehr-model-event";
import {EhrFormState} from "../utils/EhrFormState";
import {FormRepeatableElementModel} from "../../ehr-form-model/thinkehr-f4-model-ts/model/FormRepeatableElementModel";
import {ThinkEhrModelParser} from "../../ehr-form-model/thinkehr-f4-model-ts/parsing/ThinkEhrModelParser";
import {Model} from "../../ehr-form-model/thinkehr-f4-model-ts/model/Model";
import {Observable, Subscription} from "rxjs/Rx";
import {ModelScriptExecutor, ScriptApi} from "../ScriptApi";
import {EhrModelObservable} from "../../ehr-form-model/ehr-model-observable";
import {TabService} from "../utils/TabService";
import {RmType} from "../../ehr-form-model/thinkehr-f4-model-ts/RmType";
import {FORM_SCRIPT_API} from "../ehr-form/FormScriptApiProvider";
import {FormScriptApi} from "../ehr-form/FormScriptApi";
import {ViewConfig} from "../../ehr-form-model/thinkehr-f4-model-ts/view/ViewConfig";
import {NodeModel} from '../../ehr-form-model/thinkehr-f4-model-ts/model/NodeModel';

@Component({
  //moduleId: module.id,
  selector: 'ehr-button',
  templateUrl: 'ehr-button.component.html',
  styleUrls: ['ehr-button.component.css'],
  //directives:[forwardRef(()=> EhrModelChildrenComponent)],
  //pipes:[TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EhrButtonComponent implements OnChanges {

  @Input()
  model: FormRepeatableElementModel;

  @Output()
  onEhrComponentRendered: EventEmitter<NodeModel> = new EventEmitter();

  protected scriptApiExecutor: ModelScriptExecutor;

  private EhrLayoutHelper: any = EhrLayoutHelper;

  isHidden: boolean;
  private isHiddenSubs: Subscription;
  isReadOnly: boolean;
  private isReadOnlySubs: Subscription;
  private cssClassList: string[];
  private btnScript:string;

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private ehrFormState: EhrFormState,
              private thinkEhrModelParser: ThinkEhrModelParser, private changeDetectorRef: ChangeDetectorRef,
              @Inject(FORM_SCRIPT_API) public scriptApi: FormScriptApi, private ehrModelObservable: EhrModelObservable, private tabService: TabService) {
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.hasOwnProperty('model')) {
      let currentModel = simpleChanges.model.currentValue;

      if (simpleChanges.model.previousValue) {
        this.ehrModelObservable.destroyModelPathObservable(simpleChanges.model.previousValue);
      }

      this.isHiddenSubs = this.ehrModelObservable.fromEvent(currentModel.getViewConfig(), EhrModelEventType.EVENT_IS_HIDDEN, currentModel.getViewConfig().isHidden())
        .map((ev: EhrModelEvent) => ev.data as boolean).subscribe((val) => {
          this.isHidden = val;
          this.isHidden ? this.renderer.addClass(this.elementRef.nativeElement, "ehr-hidden") : this.renderer.removeClass(this.elementRef.nativeElement, "ehr-hidden");
          this.changeDetectorRef.markForCheck();
        });
      this.isReadOnlySubs = this.ehrModelObservable.fromEvent(currentModel.getViewConfig(), EhrModelEventType.EVENT_IS_READ_ONLY, currentModel.getViewConfig().isReadOnly())
        .map((ev: EhrModelEvent) => ev.data as boolean).subscribe((val) => {
          this.isReadOnly = val;
          this.changeDetectorRef.markForCheck();
        });

      if (this.scriptApiExecutor) {
        this.scriptApiExecutor.destroy();
      }
      if (currentModel) {
        this.scriptApi.registerComponent(this, currentModel);
        this.scriptApiExecutor=this.scriptApi.exeFormScript(currentModel, currentModel.getViewConfig().getEhrFormScript(), this.ehrModelObservable);
        this.btnScript=(<ViewConfig>currentModel.getViewConfig()).annotationValue('btnScript');
      }

      let cssClassAnnotation = (currentModel as FormRepeatableElementModel).getViewConfig().annotationValue('cssClass');
      if (cssClassAnnotation) {
        this.updateAnnotationsCssClasses(cssClassAnnotation.split(' '));
      }
    }
  }

  updateAnnotationsCssClasses(cssClasses: string[]) {
    if (this.cssClassList && this.cssClassList.length) {
      this.cssClassList.forEach((className: string) => {
        this.renderer.removeClass(this.elementRef.nativeElement, className);
      });
    }
    this.cssClassList = cssClasses;
    if (this.cssClassList && this.cssClassList.length) {
      this.cssClassList.forEach((className: string) => {
        this.renderer.addClass(this.elementRef.nativeElement, className);
      });
    }
  }

  ngOnDestroy() {
    if (this.isHiddenSubs) {
      this.isHiddenSubs.unsubscribe();
    }
    if (this.isReadOnlySubs) {
      this.isReadOnlySubs.unsubscribe();
    }
    if (this.scriptApiExecutor) {
      this.scriptApiExecutor.destroy();
    }
    this.scriptApi.unregisterComponent(this, this.model);
  }

  onBtnClick(){
    if(this.btnScript) {
      let scriptApiExe = this.scriptApi.exeFormScript(this.model, [this.btnScript], this.ehrModelObservable);
      scriptApiExe.destroy();
    }
  }
}

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
import {ValidateOptions} from "mrd-ui-components";
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
import {NodeModel} from '../../ehr-form-model/thinkehr-f4-model-ts/model/NodeModel';

@Component({
  //moduleId: module.id,
  selector: 'ehr-container',
  templateUrl: 'ehr-container.component.html',
  styleUrls: ['ehr-container.component.css'],
  //directives:[forwardRef(()=> EhrModelChildrenComponent)],
  //pipes:[TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EhrContainerComponent implements OnChanges {

  @Input()
  model: FormRepeatableElementModel;

  @Input()
  ehrFormGroup: FormGroup;

  @Input()
  validateFormEvent: EventEmitter<ValidateOptions>;

  @Input()
  layout: any;

  @Output()
  onEhrComponentRendered: EventEmitter<NodeModel> = new EventEmitter();

  containerFormGroup: FormGroup;

  protected scriptApiExecutor: ModelScriptExecutor;

  private readonly CONTAINER_FG_CHILD_INV_DIRTY_PROP_NAME = '__invDrity';
  private EhrLayoutHelper: any = EhrLayoutHelper;

  isHidden: boolean;
  private isHiddenSubs: Subscription;
  isReadOnly: boolean;
  private isReadOnlySubs: Subscription;
  private childrenUpdatedSubs: Subscription;
  private containerValidSubscription: Subscription;
  private showTabValidation: Observable<boolean>;
  hideFrame: boolean;
  private cssClassList: string[];
  private duplicationEnabledVal: boolean;
  private removalEnabledVal: boolean;

  private progresiveDisplayChildModelIsHidden: PrigressiveRenderItem[] = [];

  //private modelGetterSetterMethodName: string = "getValue";

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private ehrFormState: EhrFormState,
              private thinkEhrModelParser: ThinkEhrModelParser, private changeDetectorRef: ChangeDetectorRef,
              @Inject(FORM_SCRIPT_API) public scriptApi: FormScriptApi, private ehrModelObservable: EhrModelObservable, private tabService: TabService) {
    renderer.addClass(elementRef.nativeElement, 'card');
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.hasOwnProperty('model')) {
      let currentModel = simpleChanges.model.currentValue;

      if (simpleChanges.model.previousValue) {
        this.ehrModelObservable.destroyModelPathObservable(simpleChanges.model.previousValue);
      }

      this.hideFrame = currentModel.getRmType() == RmType.GENERIC_COMPOSITE_FIELD || currentModel.getViewConfig().getAdvanced().hideFrame;
      let hideBorder: boolean = currentModel.getViewConfig().getAdvanced().hideFrame;
      hideBorder ? this.renderer.addClass(this.elementRef.nativeElement, 'no-border') : this.renderer.removeClass(this.elementRef.nativeElement, 'no-border');
      let hideHeader = currentModel.hasTag('hideHeader');
      hideHeader ? this.renderer.addClass(this.elementRef.nativeElement, 'no-header') : this.renderer.removeClass(this.elementRef.nativeElement, 'no-header');

      this.containerFormGroup = new FormGroup({});

      if (this.containerValidSubscription) {
        this.containerValidSubscription.unsubscribe();
      }
      this.containerValidSubscription = this.containerFormGroup.statusChanges.filter(v=>{return v==='VALID' || v==='INVALID'}).distinctUntilChanged().subscribe((value) => {

        let tabVO = this.tabService.getTabObjectForModel(this.model);
        if (tabVO) {
          tabVO.isValid = value === 'VALID';
          tabVO.isInvalidDirty = this.anyInvalidDirtyChild(this.containerFormGroup);
          //event is going from bottom up so cache if any child is "dirty+invalid"
          this.containerFormGroup[this.CONTAINER_FG_CHILD_INV_DIRTY_PROP_NAME] = tabVO.isInvalidDirty;
          this.tabService.updateTabVO(tabVO);
        }
      });

      this.ehrFormGroup.addControl(currentModel.getSanitizedUniqueId(currentModel.getMultiIndex(false)), this.containerFormGroup);

      let parentModel: Model = currentModel.getParentModel();

      if(this.childrenUpdatedSubs){
        this.childrenUpdatedSubs.unsubscribe();
      }
      this.childrenUpdatedSubs = this.ehrModelObservable.fromEvent(parentModel, EhrModelEventType.EVENT_CHILDREN_UPDATED).subscribe(() => {
        this.changeDetectorRef.markForCheck();
      });

      if(this.isHiddenSubs){
        this.isHiddenSubs.unsubscribe();
      }
      this.isHiddenSubs = this.ehrModelObservable.fromEvent(currentModel.getViewConfig(), EhrModelEventType.EVENT_IS_HIDDEN, currentModel.getViewConfig().isHidden())
        .map((ev: EhrModelEvent) => ev.data as boolean).subscribe((val) => {
          let keepVisibleIndexList: number[] = currentModel.getViewConfig().getKeepVisibleIndexList();
          if (!val && currentModel.isMulti() && keepVisibleIndexList.length) {
            let siblings: FormRepeatableElementModel[] = this.EhrLayoutHelper.getMultiSiblings(currentModel);
            let currMultiInd: number = siblings.indexOf(currentModel);
            val = keepVisibleIndexList.indexOf(currMultiInd) < 0;
          }
          this.isHidden = val;
          this.isHidden ? this.renderer.addClass(this.elementRef.nativeElement, 'ehr-hidden') : this.renderer.removeClass(this.elementRef.nativeElement, 'ehr-hidden');
          this.changeDetectorRef.markForCheck();
        });
      this.isReadOnlySubs = this.ehrModelObservable.fromEvent(currentModel.getViewConfig(), EhrModelEventType.EVENT_IS_READ_ONLY, currentModel.getViewConfig().isReadOnly())
        .map((ev: EhrModelEvent) => ev.data as boolean).subscribe((val) => {
          this.isReadOnly = val;
          this.changeDetectorRef.markForCheck();
        });

      this.EhrLayoutHelper.renderContainersMin(currentModel, this.thinkEhrModelParser);

      if (this.scriptApiExecutor) {
        this.scriptApiExecutor.destroy();
      }
      if (currentModel) {
        this.scriptApi.registerComponent(this, currentModel);
        this.scriptApiExecutor = this.scriptApi.exeFormScript(currentModel, currentModel.getViewConfig().getEhrFormScript(), this.ehrModelObservable);
        this.tabService.registerTabGroupsForModel(currentModel);
      }


      let cssClassAnnotation = (currentModel as FormRepeatableElementModel).getViewConfig().annotationValue('cssClass');
      if (cssClassAnnotation) {
        this.updateAnnotationsCssClasses(cssClassAnnotation.split(' '));
      }

      let oneByOneRendering = currentModel.hasTag('renderOneByOne')||currentModel.hasTag('one-by-one');
      //oneByOneRendering=false
      this.progresiveDisplayChildModelIsHidden.length = 0;
      if (oneByOneRendering) {

        // save current visibility state, set all to hidden and set visibility back in a loop so they render progresively
        let children: Model[] = this.model.getChildModels();
        children.forEach((ch: Model) => {
          let chModel: FormRepeatableElementModel = (ch as FormRepeatableElementModel);

          let progVisObj: PrigressiveRenderItem = {
            data: chModel.getViewConfig().isHidden(),
            removeListenerFn: null,
            model: chModel
          };
          if (!progVisObj.data) {
            // if visible set to hidden
            chModel.getViewConfig().setHidden(true);
          }
          // adding event listener after setHidden() so event has already been fired
          // listening for any cahnges before oneByOne rendering is complete
          progVisObj.removeListenerFn = chModel.getViewConfig().addEventListener((ev: EhrModelEvent) => {
            progVisObj.data = !!ev.data;
          }, EhrModelEventType.EVENT_IS_HIDDEN);
          this.progresiveDisplayChildModelIsHidden.push(progVisObj);
        });

        this.ehrFormState.addOneByOneContainerRenderingStart(this.model.getPath());
        setTimeout(() => {
          this.displayInOneByOneLoop(this.progresiveDisplayChildModelIsHidden[0]);
        });
      }
    }

    if (simpleChanges.hasOwnProperty('validateFormEvent')) {
      this.showTabValidation = simpleChanges.validateFormEvent.currentValue.map((val: ValidateOptions) => {
        return !!val.alwaysForceIfNotDirty || !!val.nowForceIfNotDirty;
      });
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

  private anyInvalidDirtyChild(formGroup: FormGroup | FormArray) {
    //recursively find first invalid dirty control
    if (formGroup instanceof FormGroup || formGroup instanceof FormArray) {

      if (formGroup !== this.containerFormGroup && formGroup instanceof FormGroup && formGroup[this.CONTAINER_FG_CHILD_INV_DIRTY_PROP_NAME] != null) {
        //since it's always checking from parent downwards value can be taken from cache on children
        return formGroup[this.CONTAINER_FG_CHILD_INV_DIRTY_PROP_NAME];
      }
      let ctrls: { [key: string]: AbstractControl } | AbstractControl[] = formGroup.controls;
      let keys = Object.keys(ctrls);
      let collections: { fGrFArrList: any[], ctrlArrList: any[] } = keys.reduce((res: { fGrFArrList: any[], ctrlArrList: any[] }, currKey: string) => {
        ctrls[currKey] instanceof FormGroup || ctrls[currKey] instanceof FormArray ? res.fGrFArrList.push(ctrls[currKey]) : res.ctrlArrList.push(ctrls[currKey]);
        return res;
      }, {fGrFArrList: [], ctrlArrList: []});

      let anyDirtyInvalidChild = !!collections.ctrlArrList.find((currCtrl: AbstractControl) => {
        return currCtrl.dirty && currCtrl.invalid;
      });

      if (anyDirtyInvalidChild) {
        return true;
      } else {
        return !!collections.fGrFArrList.find((currCtrl: AbstractControl) => {
          return currCtrl instanceof FormGroup || currCtrl instanceof FormArray ? this.anyInvalidDirtyChild(<FormGroup | FormArray>currCtrl) : false;
        });
      }
    }
    return false;
  }

  supportsMulti(): boolean {
    return this.model.isMulti() && this.model.isAttachableToValueNode();
  }

  duplicateContainer(nrOfCopies: number) {
    if (nrOfCopies == null) {
      nrOfCopies = 1;
    }

    for (let i = 0; i < nrOfCopies; i++) {
      const duplicatedModel=this.thinkEhrModelParser.duplicateModel(this.model, this.model, true);
    }
  };

  getMultiNumberText(currMultiPositionNr) {
    let annVal = this.model.annotationValue('multiPositionText');
    if (annVal) {
      if (annVal.indexOf('[NR]') > 0) {
        annVal = annVal.replace('[NR]', currMultiPositionNr);
      } else {
        annVal = annVal + ' ' + currMultiPositionNr;
      }
    } else {
      annVal = '(' + currMultiPositionNr + ')';
    }
    return annVal;
  }

  set removalEnabled(value: boolean) {
    this.removalEnabledVal = value;
  }

  get removalEnabled(): boolean {
    if (this.removalEnabledVal !== undefined && this.removalEnabledVal !== null) {
      return this.removalEnabledVal;
    }
    if (this.supportsMulti()) {
      let model = this.model;
      let min = model.getViewConfig().getMin();
      if (min < 1) {
        min = 1;
      }
      let count = this.EhrLayoutHelper.getMultiSiblingsCount(this.model);
      return count > min;
    }

    return false;
  };

  set duplicationEnabled(value: boolean) {
    this.duplicationEnabledVal = value;
  }

  get duplicationEnabled(): boolean {
    if (this.duplicationEnabledVal !== undefined && this.duplicationEnabledVal !== null) {
      return this.duplicationEnabledVal;
    }

    if (this.supportsMulti()) {
      let model = this.model;
      let max = model.getViewConfig().getMax();
      if (max < 0) {
        return true;
      }
      let count = this.EhrLayoutHelper.getMultiSiblingsCount(this.model);

      return count < max;
    }

    return false;
  };

  getMultiIndex() {
    return this.model.getMultiIndex(false);
  };

  removeContainer() {
    this.model.destroy();
  };

  ngOnDestroy() {
    if (this.childrenUpdatedSubs) {
      this.childrenUpdatedSubs.unsubscribe();
    }
    if (this.isHiddenSubs) {
      this.isHiddenSubs.unsubscribe();
    }
    if (this.isReadOnlySubs) {
      this.isReadOnlySubs.unsubscribe();
    }
    if (this.containerValidSubscription) {
      this.containerValidSubscription.unsubscribe();
    }

    if (this.scriptApiExecutor) {
      this.scriptApiExecutor.destroy();
    }
    this.scriptApi.unregisterComponent(this, this.model);
    this.containerFormGroup[this.CONTAINER_FG_CHILD_INV_DIRTY_PROP_NAME]=null;
  }

  childComponentRendered(model: NodeModel) {
    // remove from progChArr and render next
    const renderedInd: number = this.progresiveDisplayChildModelIsHidden.findIndex((itm: PrigressiveRenderItem) => {
      return itm.model === model;
    });
    if (renderedInd > -1) {
      this.completeItemRender(null, renderedInd);
    }
  }

  private displayInOneByOneLoop(progRnd: PrigressiveRenderItem) {
    if (progRnd && !progRnd.data && progRnd.model.getViewConfig().isHidden()) {
      // the model should not be hidden so show it
      progRnd.model.getViewConfig().setHidden(false);
    } else {
      // this model is set to be hidden initially or already shown - skip to next
      this.completeItemRender(progRnd, null);
    }
  }

  private completeItemRender(progRnd?: PrigressiveRenderItem, atIndex?: number) {
    if (atIndex == null && progRnd == null) {
      throw new Error('can not call completeItemRender() without parameters')
    }
    if (atIndex == null) {
      atIndex = this.progresiveDisplayChildModelIsHidden.indexOf(progRnd);
    }
    if (atIndex < 0 && this.progresiveDisplayChildModelIsHidden.length > 0) {
      throw new Error('oneByOne display could not render all child components')
    }
    //remove and display next
    this.progresiveDisplayChildModelIsHidden.splice(atIndex, 1);
    if (this.progresiveDisplayChildModelIsHidden.length > atIndex) {
      //setTimeout(() => {
      this.displayInOneByOneLoop(this.progresiveDisplayChildModelIsHidden[atIndex]);
      //}, 0);
    }
    if (this.progresiveDisplayChildModelIsHidden.length === 0) {
      this.ehrFormState.removeOneByOneContainerRenderingStart(this.model.getPath());
    }
  }

  /*TODO implement
   appendToPositionHolder  (appendElement, placementConst) {
   switch (placementConst) {
   case thinkehr.f4.ng.componentPlacement.POSITION_LABEL_START:
   $($(".label-start-position-holder", element).get(0)).append(appendElement);
   break;
   case thinkehr.f4.ng.componentPlacement.POSITION_LABEL_END:
   $($(".label-end-position-holder", element).get(0)).append(appendElement);
   break;
   case thinkehr.f4.ng.componentPlacement.POSITION_CONTENT_START:
   $(".content-start-position-holder", element).append(appendElement);
   break;
   case thinkehr.f4.ng.componentPlacement.POSITION_CONTENT_END:
   $(".content-end-position-holder", element).append(appendElement);
   break;
   }
   };

   appendLabelStart(appendElement) {
   return appendToPositionHolder(appendElement, thinkehr.f4.ng.componentPlacement.POSITION_LABEL_START);
   };

   appendLabelEnd(appendElement) {
   return appendToPositionHolder(appendElement, thinkehr.f4.ng.componentPlacement.POSITION_LABEL_END);
   };

   appendContentStart(appendElement) {
   return appendToPositionHolder(appendElement, thinkehr.f4.ng.componentPlacement.POSITION_CONTENT_START);
   };

   appendContentEnd(appendElement) {
   return appendToPositionHolder(appendElement, thinkehr.f4.ng.componentPlacement.POSITION_CONTENT_END);
   };*/

}

interface PrigressiveRenderItem {
  data: boolean;
  removeListenerFn: Function;
  model: FormRepeatableElementModel;
}

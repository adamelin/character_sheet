/**
 * Created by matjazhi on 15.2.2017.
 */
import {
  Directive, ViewContainerRef, AfterContentInit, ComponentFactoryResolver, Type, Input,
  EventEmitter, ComponentRef, ChangeDetectorRef, Injector, SimpleChanges, SimpleChange, Output
} from '@angular/core';
import {CustomComponentsDictionary} from "./CustomComponentsDictionary";
import {FormGroup} from "@angular/forms";
import {ValidateOptions} from "mrd-ui-components";
import {EhrFormCustomComponent} from "./EhrFormCustomComponent";
import {CustomModel} from "../ehr-form-model/thinkehr-f4-model-ts/model/fieldModel/CustomModel";
import {NodeModel} from "../ehr-form-model/thinkehr-f4-model-ts/model/NodeModel";
import {RmType} from "../ehr-form-model/thinkehr-f4-model-ts/RmType";
import {EhrNoComponentComponent} from "./ehr-no-component/ehr-no-component.component";
import {Subscription} from 'rxjs/Subscription';

@Directive({
  selector: '[ehr-custom-component-host]',
})
export class EhrCustomComponentHost implements AfterContentInit {

  @Input()
  set customModel(value: CustomModel) {
    if (value.getRmType() === RmType.CUSTOM) {
      this._customModel = value;
    }
  };

  get customModel(): CustomModel {
    return this._customModel;
  };

  private _customModel: CustomModel;

  @Input()
  model: NodeModel;

  @Input()
  ehrFormGroup: FormGroup;

  @Input()
  validateFormEvent: EventEmitter<ValidateOptions>;

  @Output()
  onEhrComponentRendered: EventEmitter<NodeModel> = new EventEmitter();

  constructor(public viewContainerRef: ViewContainerRef, private _componentFactoryResolver: ComponentFactoryResolver, private customComponentsDictionary: CustomComponentsDictionary, private injector: Injector, private changeDetectorRef: ChangeDetectorRef) {
  }

  ngAfterContentInit() {

    if (!!this._customModel && this._customModel.getCustomComponentId()) {
      let compId: string = this._customModel.getCustomComponentId();
      if (this.customComponentsDictionary.registeredComponents[compId]) {
        this.customComponentsDictionary.componentName$(this._customModel.getCustomComponentId()).subscribe((cType: Type<EhrFormCustomComponent>) => {
          this.loadComponent(cType, this._customModel);
        });
      }
    } else if (!!this.model && !!this.customComponentsDictionary.registeredComponents[this.model.getRmType()]) {
      this.customComponentsDictionary.componentName$(this.model.getRmType()).subscribe((cType: Type<any>) => {
        this.loadComponent(cType, this.model);
      });
    } else if (!!this._customModel || !!this.model) {
      let msg = 'No value exists in provided CustomComponentsDictionary for ';
      msg += this._customModel ? 'componentId=' + this._customModel.getCustomComponentId() : 'dvType=' + this.model.getRmType();
      console.warn(msg);
      this.loadComponent(EhrNoComponentComponent, this._customModel || this.model);
    }
  }

  loadComponent(compType: Type<EhrFormCustomComponent>, model: NodeModel) {
    if (compType) {
      let componentFactory = this._componentFactoryResolver.resolveComponentFactory(compType);
      let viewContainerRef = this.viewContainerRef;
      viewContainerRef.clear();
      let componentRef: ComponentRef<EhrFormCustomComponent> = viewContainerRef.createComponent(componentFactory);

      (<EhrFormCustomComponent>componentRef.instance).ehrFormGroup = this.ehrFormGroup;
      (<EhrFormCustomComponent>componentRef.instance).validateFormEvent = this.validateFormEvent;
      const custM: CustomModel = model.getRmType() == RmType.CUSTOM ? (model as CustomModel) : null;
      const mod: NodeModel = !!custM ? (model as CustomModel).delegateModel : model;

      (<EhrFormCustomComponent>componentRef.instance).model = mod;
      if (custM) {
        (<EhrFormCustomComponent>componentRef.instance).customModel = custM;
      }

      if (!!(<EhrFormCustomComponent>componentRef.instance)['onEhrComponentRendered']) {
        (<EhrFormCustomComponent>componentRef.instance)['onEhrComponentRendered'].take(1).subscribe(() => {
          this.onEhrComponentRendered.next(model);
        });
      } else {
        this.onEhrComponentRendered.next(model);
      }

      if (!!(<EhrFormCustomComponent>componentRef.instance)['ngOnChanges']) {
        let sc: any = {
          model: new SimpleChange(null, mod, true),
          ehrFormGroup: new SimpleChange(null, this.ehrFormGroup, true),
          validateFormEvent: new SimpleChange(null, this.validateFormEvent, true)
        };
        if (custM) {
          sc._customModel = new SimpleChange(null, mod, true);
        }
        (<EhrFormCustomComponent>componentRef.instance).ngOnChanges(sc);
      }
      //rendering of instantiated component - bug??
      setTimeout(() => {
        this.changeDetectorRef.markForCheck();
      }, 0);
    }

  }

}

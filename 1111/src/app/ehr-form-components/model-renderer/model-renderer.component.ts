import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter, Inject,
  Input,
  OnDestroy,
  Output,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormObjectModel} from '../../ehr-form-model/thinkehr-f4-model-ts/model/FormObjectModel';
import {RmType} from '../../ehr-form-model/thinkehr-f4-model-ts/RmType';
import {TabService} from '../utils/TabService';
import {CustomComponentsDictionary} from '../CustomComponentsDictionary';
import {NodeModel} from '../../ehr-form-model/thinkehr-f4-model-ts/model/NodeModel';
import {ValidateOptions} from 'mrd-ui-components'
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'model-renderer',
  templateUrl: './model-renderer.component.html',
  styleUrls: ['./model-renderer.component.css'],
  //providers:[{provide:ModelScopeConfig, useClass:ModelScopeConfig}],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ModelRendererComponent implements OnDestroy{

  @Input()
  model:FormObjectModel;

  @Input()
  layout:any;

  @Input()
  ehrFormGroup:FormGroup;

  @Input()
  validateFormEvent: EventEmitter<ValidateOptions>;

  @Output()
  onEhrComponentRendered: EventEmitter<NodeModel> = new EventEmitter();

  RmType:any = RmType;

  protected valFEvent: EventEmitter<ValidateOptions>;
  private valFEventSubs: Subscription;
  private ruCustomComponents: boolean;

  constructor(private renderer:Renderer2, private elementRef:ElementRef, private tabService:TabService,
              public customComponentsDictionary: CustomComponentsDictionary, @Inject('RU_CUSTOM_COMPONENTS') ruComps) {
    renderer.addClass(elementRef.nativeElement, 'col-sm-12');
    this.ruCustomComponents = ruComps;
  }

  ngOnChanges (simpleChanges:SimpleChanges){
    if(simpleChanges.hasOwnProperty('validateFormEvent')){
      this.valFEvent = new EventEmitter<ValidateOptions>();
      if(this.valFEventSubs){
        this.valFEventSubs.unsubscribe();
      }
      this.valFEventSubs = simpleChanges['validateFormEvent'].currentValue.subscribe((val: ValidateOptions) => {
        this.valFEvent.next(val);
      });
    }
}

  ngOnDestroy(){
    if(this.valFEventSubs){
      this.valFEventSubs.unsubscribe();
    }
  }

  childComponentRendered(model:NodeModel){
    this.onEhrComponentRendered.next(model);
  }

}

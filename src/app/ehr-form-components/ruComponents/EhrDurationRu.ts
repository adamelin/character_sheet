import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, Renderer2} from '@angular/core';
import {EhrValidationMessageResolver} from '../utils/validation/ehr-validation-message-resolver';
import {FORM_SCRIPT_API} from '../ehr-form/FormScriptApiProvider';
import {EhrFormConfig} from '../EhrFormConfig';
import {EhrFormState} from '../utils/EhrFormState';
import {FormScriptApi} from '../ehr-form/FormScriptApi';
import {EhrLayoutHelper} from '../utils/EhrLayoutHelper';
import {EhrModelObservable} from '../../ehr-form-model';
import {TranslateService} from 'ng2-translate';
import {EhrDurationComponent} from '../ehr-duration/ehr-duration.component';
import {EhrValidationHelper} from 'mrd-ui-components';


@Component({
  selector: 'ehr-duration-ru',
  templateUrl: '../ehr-duration/ehr-duration.component.html',
  styleUrls: ['../ehr-duration/ehr-duration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EhrDurationRu extends EhrDurationComponent{

  private removeEvListenrs: Function[]=[];
  private listenerFn = (ev: KeyboardEvent) => {
    const targetVal = ev.target['value'] + ev.key;
    const regex = /\d/g;
    const regExpMatchArray = targetVal.match(regex);
    if (regExpMatchArray&&regExpMatchArray.length > 5) {
      //console.log('KEY EV STOP', targetVal)
      ev.preventDefault();
      ev.stopImmediatePropagation();
    }
  };

  constructor(elementRef: ElementRef, renderer: Renderer2, changeDetectorRef: ChangeDetectorRef, EhrLayoutHelper: EhrLayoutHelper,
              ehrFormState: EhrFormState, ehrFormConfig: EhrFormConfig, validationResolver: EhrValidationMessageResolver, translateService:TranslateService,
              @Inject(FORM_SCRIPT_API) public scriptApi: FormScriptApi, ehrModelObservable: EhrModelObservable, public ehrValidationHelper: EhrValidationHelper){
    super(elementRef, renderer, changeDetectorRef, EhrLayoutHelper, ehrFormState, ehrFormConfig, validationResolver, translateService, scriptApi, ehrModelObservable, ehrValidationHelper);
  }

  ngAfterViewInit(){
    super.ngAfterViewInit();
    const mrdQuantInp: HTMLCollection = this.elementRef.nativeElement.getElementsByTagName('mrd-duration-input');
    const inpEls: NodeList = mrdQuantInp[0].getElementsByTagName('input');
    for(let i=0; i<inpEls.length; i++){
      let inpEl = inpEls[i];
      inpEl.addEventListener('keydown', this.listenerFn);
      this.removeEvListenrs.push(()=>{inpEl.removeEventListener('keydown', this.listenerFn)})
    };
  }

  ngOnDestroy(){
    super.ngOnDestroy();
    this.removeEvListenrs.forEach(fn => fn());
  }

}

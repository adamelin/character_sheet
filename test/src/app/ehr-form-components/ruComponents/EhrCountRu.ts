import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject, OnChanges, OnDestroy,
  Renderer2,
  SimpleChange,
  SimpleChanges
} from '@angular/core';
import {EhrValidationMessageResolver} from '../utils/validation/ehr-validation-message-resolver';
import {FORM_SCRIPT_API} from '../ehr-form/FormScriptApiProvider';
import {EhrFormConfig} from '../EhrFormConfig';
import {EhrFormState} from '../utils/EhrFormState';
import {FormScriptApi} from '../ehr-form/FormScriptApi';
import {EhrLayoutHelper} from '../utils/EhrLayoutHelper';
import {EhrModelObservable} from '../../ehr-form-model';
import {TranslateService} from 'ng2-translate';
import {EhrCountComponent} from '../ehr-count/ehr-count.component';
import {EhrValidationHelper} from 'mrd-ui-components';
import {Observable} from "rxjs/Observable";
import {EhrModelEvent, EhrModelEventType} from "../../ehr-form-model/ehr-model-event";
import {Subscription} from "rxjs/Subscription";


@Component({
  selector: 'ehr-count-ru',
  templateUrl: '../ehr-count/ehr-count.component.html',
  styleUrls: ['../ehr-count/ehr-count.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EhrCountRu extends EhrCountComponent implements OnChanges, AfterViewInit, OnDestroy {

  private removeEvListenrs: Function[] = [];

  private isQuantHiddenSubs: Subscription;
  private listenerSet: boolean;

  private listenerFn = (ev: KeyboardEvent) => {
    const targetVal = ev.target['value'] + ev.key;

    const regex = /\d/g;

    const regExpMatchArray = targetVal.match(regex);
    if (regExpMatchArray && regExpMatchArray.length > 5) {
      // console.log('KEY EV STOP', targetVal)
      ev.preventDefault();
      ev.stopImmediatePropagation();
    }
  }

  constructor(elementRef: ElementRef, renderer: Renderer2, changeDetectorRef: ChangeDetectorRef, EhrLayoutHelper: EhrLayoutHelper,
              ehrFormState: EhrFormState, ehrFormConfig: EhrFormConfig, validationResolver: EhrValidationMessageResolver,
              @Inject(FORM_SCRIPT_API) public scriptApi: FormScriptApi, ehrModelObservable: EhrModelObservable, translateService: TranslateService, public ehrValidationHelper: EhrValidationHelper) {
    super(elementRef, renderer, changeDetectorRef, EhrLayoutHelper, ehrFormState, ehrFormConfig, validationResolver, scriptApi, ehrModelObservable, ehrValidationHelper);
  }

  ngOnChanges(sc: SimpleChanges) {
    super.ngOnChanges(sc);

    const isHiddenObs: Observable<boolean> = this.ehrModelObservable
      .fromEvent(
        sc.model.currentValue.getViewConfig(),
        EhrModelEventType.EVENT_IS_HIDDEN,
        sc.model.currentValue.getViewConfig().isHidden()
      )
      .map(
        (ev: EhrModelEvent) => ev.data as boolean
      );

    if (sc.hasOwnProperty('model')) {
      if (this.isQuantHiddenSubs) {
        this.isQuantHiddenSubs.unsubscribe();
      }

      this.isQuantHiddenSubs = isHiddenObs.subscribe((v) => {
        if (!this.listenerSet) {
          this.listenerSet = this.setListener();
        }
      });

      this.removeEvListenrs.push(() => {
        if (this.isQuantHiddenSubs) {
          this.isQuantHiddenSubs.unsubscribe();
        }
      });
    }
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    if (!this.listenerSet) {
      this.listenerSet = this.setListener();
    }
  }

  private setListener(): boolean {
    const mrdQuantInp: HTMLCollection = this.elementRef.nativeElement.getElementsByTagName('mrd-count-input');
    if (mrdQuantInp && mrdQuantInp[0]) {
      const inpEls: NodeList = mrdQuantInp[0].getElementsByTagName('input');
      for (let i = 0; i < inpEls.length; i++) {
        const inpEl = inpEls[i];
        inpEl.addEventListener('keydown', this.listenerFn);
        this.removeEvListenrs.push(() => {
          inpEl.removeEventListener('keydown', this.listenerFn);
        });
      }
      return true;
    }
    return false;
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.removeEvListenrs.forEach(fn => fn());
  }

}

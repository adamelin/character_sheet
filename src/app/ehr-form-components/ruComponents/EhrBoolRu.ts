import {EhrBooleanComponent} from '../ehr-boolean/ehr-boolean.component';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject, OnChanges, OnDestroy,
  Renderer2, SimpleChanges,
} from '@angular/core';
import {EhrValidationMessageResolver} from '../utils/validation/ehr-validation-message-resolver';
import {FORM_SCRIPT_API} from '../ehr-form/FormScriptApiProvider';
import {EhrFormConfig} from '../EhrFormConfig';
import {EhrFormState} from '../utils/EhrFormState';
import {FormScriptApi} from '../ehr-form/FormScriptApi';
import {EhrLayoutHelper} from '../utils/EhrLayoutHelper';
import {EhrModelObservable} from '../../ehr-form-model';
import {Subscription} from 'rxjs/Subscription';
import {EhrValidationHelper} from 'mrd-ui-components';

@Component({
  selector: 'ehr-boolean-ru',
  templateUrl: '../ehr-boolean/ehr-boolean.component.html',
  styleUrls: ['../ehr-boolean/ehr-boolean.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EhrBooleanRu extends EhrBooleanComponent implements OnChanges, OnDestroy {

  private unsubscribeSub: Subscription;

  constructor(elementRef: ElementRef, renderer: Renderer2, changeDetectorRef: ChangeDetectorRef, EhrLayoutHelper: EhrLayoutHelper,
              ehrFormState: EhrFormState, ehrFormConfig: EhrFormConfig, validationResolver: EhrValidationMessageResolver,
              @Inject(FORM_SCRIPT_API) public scriptApi: FormScriptApi, ehrModelObservable: EhrModelObservable, public ehrValidationHelper: EhrValidationHelper) {
    super(elementRef, renderer, changeDetectorRef, EhrLayoutHelper, ehrFormState, ehrFormConfig, validationResolver, scriptApi, ehrModelObservable, ehrValidationHelper);
  }

  ngOnChanges(change: SimpleChanges): void {
    super.ngOnChanges(change);

    if (change.hasOwnProperty('model')) {
      if (this.model.booleanValue() !== true) {
        this.model.booleanValue(null);
      }

      const newModel = change.model.currentValue;
      this.labelOnRight(newModel);
    }

    this.unsubscribeFromModelValue();
    this.unsubscribeSub = this.modelValues$
      .subscribe(data => {
        if (!data) { // [] == true
          this.renderer.removeClass(this.elementRef.nativeElement, 'ehr-boolean-checked');
        } else { // class is added
          this.renderer.addClass(this.elementRef.nativeElement, 'ehr-boolean-checked');
          if (<any>data !== true) {
            this.updateModel(null);
          }
        }
      });
  }

  private labelOnRight(newModel: any) {
    this.textRight = newModel.labelFor('ru');
    this.isLabelHidden = true;
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.unsubscribeFromModelValue();
  }

  isThreeState() {
    return false;
  }

  updateModel(val) {
    if (!val) {
      this.model.booleanValue(null);
    } else {
      this.model.booleanValue(true);
    }
  }

  private unsubscribeFromModelValue() {
    if (this.unsubscribeSub) {
      this.unsubscribeSub.unsubscribe();
    }
  }
}

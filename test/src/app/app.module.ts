import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {EhrFormComponentsModule} from './ehr-form-components/ehr-form-components.module';
import {PrettyPrintPipe} from './pretty-print.pipe';
import {NgbDatepickerConfig, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {EhrFormCustomComponentsModule} from './ehr-form-custom-components/custom-form-components.module';
import {BmiSimpleComponent} from './ehr-form-custom-components/bmi-simple/bmi-simple.component';
import {EhrFormService} from './EhrFormService';
import {TerminologyService} from './TerminologyService';
import {FileUploadService} from './FileUploadService';
import {EhrMomentDateParserFormatter} from './EhrMomentDateParserFormatter';
import {ExtendedTextComponent} from './ehr-form-custom-components/extended-text/extended-text.component';
import {ButtonPopupComponent} from './ehr-form-custom-components/button-popup/button-popup.component';
import {DictionaryKeys} from './ehr-form-components/dictionary/DictionaryKeys';
import {CodedSimpleComponent} from "./ehr-form-custom-components/coded-simple/coded-simple.component";


let compsMap = {
  'bmiCalc': BmiSimpleComponent,
  'customTextComponent': ExtendedTextComponent,
  'btnPP': ButtonPopupComponent,
  'customCoded':CodedSimpleComponent
};

//compsMap[RmType.DV_TEXT]= ExtendedTextComponent;

export function ngbDateConfig() {
  let ngbDateConfig = new NgbDatepickerConfig();
  ngbDateConfig.minDate = {year: 1900, month: 1, day: 1};
  ngbDateConfig.maxDate = {year: 2099, month: 12, day: 31};
  return ngbDateConfig;
}

export var transKeys: DictionaryKeys[] = [{
  language: 'ru', keys: {
    'validation.required': 'RequiredRuVal',
    'clearValue':'ClearTranslated',
    //'other.selectOptionLabel':'Drugoo'
  }
}];

@NgModule({
  declarations: [
    AppComponent,
    PrettyPrintPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    EhrFormComponentsModule.forRoot({
      customComponentsMap: compsMap,
      terminologyLoaderService: TerminologyService,
      fileUploaderService: FileUploadService,
      ruComponents:true
      //dateParser: EhrMomentDateParserFormatter,
      //translations: transKeys
    }),
    NgbModule.forRoot(),
    EhrFormCustomComponentsModule
  ],
  exports: [],
  providers: [EhrFormService, {provide: NgbDatepickerConfig, useFactory: ngbDateConfig}],
  bootstrap: [AppComponent]
})
export class AppModule {
}

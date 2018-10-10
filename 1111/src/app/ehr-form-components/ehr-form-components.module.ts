import {InjectionToken, ModuleWithProviders, NgModule, Type} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EHR_DICT_KEYS, EhrFormComponent} from './ehr-form/ehr-form.component';
import {EhrContainerComponent} from './ehr-container/ehr-container.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EhrLayoutHelper} from './utils/EhrLayoutHelper';
import {EhrFormModelModule} from '../ehr-form-model/ehr-form-model.module';
import {ModelRendererComponent} from './model-renderer/model-renderer.component';
import {NgbDateParserFormatter, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {EhrTextComponent} from './ehr-text/ehr-text.component';
import {EhrSingleFieldMultiControlsComponent} from './ehr-single-field-multi-controls/ehr-single-field-multi-controls.component';
import {EhrFormConfig} from './EhrFormConfig';
import {EhrValidationErrorsComponent} from './ehr-validation-errors/ehr-validation-errors.component';
import {TranslateModule} from 'ng2-translate';
import {EhrFormState} from './utils/EhrFormState';
import {EhrValidationMessageResolver} from './utils/validation/ehr-validation-message-resolver';
import {MrdUiComponentsModule, NgbMrdMomentDateParserFormatter} from 'mrd-ui-components';
import {EhrUriComponent} from './ehr-text/ehr-uri/ehr-uri.component';
import {EhrEhrUriComponent} from './ehr-text/ehr-ehr-uri/ehr-ehr-uri.component';
import {EhrCountComponent} from './ehr-count/ehr-count.component';
import {EhrProportionComponent} from './ehr-proportion/ehr-proportion.component';
import {EhrDurationComponent} from './ehr-duration/ehr-duration.component';
import {EhrDateTimeComponent} from './ehr-date-time/ehr-date-time.component';
import {EhrDateComponent} from './ehr-date/ehr-date.component';
import {EhrTimeComponent} from './ehr-time/ehr-time.component';
import {EhrCodedTextComponent} from './ehr-coded-text/ehr-coded-text.component';
import {EhrBooleanComponent} from './ehr-boolean/ehr-boolean.component';
import {EhrCustomComponentHost} from './ehr-custom-component-host';
import {CustomComponentsDictionary} from './CustomComponentsDictionary';
import {EhrNoComponentComponent} from './ehr-no-component/ehr-no-component.component';
import {PrettyPrintPipe} from './pretty-print.pipe';
import {RowsRendererComponent} from './layout-renderer/rows-renderer/rows-renderer.component';
import {ColumnRendererComponent} from './layout-renderer/column-renderer/column-renderer.component';
import {EhrFormDescriptionRendererComponent} from './ehr-form-description-renderer/ehr-form-description-renderer.component';
import {TerminologyService} from '../TerminologyService';
import {EhrFormCustomComponent} from './EhrFormCustomComponent';
import {EhrModelObservable} from '../ehr-form-model/ehr-model-observable';
import {TabService} from './utils/TabService';
import {TabHeaderComponent} from './tab-header/tab-header.component';
import {EhrMultimediaComponent} from './ehr-multimedia/ehr-multimedia.component';
import {EhrIdentifierComponent} from './ehr-identifier/ehr-identifier.component';
import {FileUploadService} from '../FileUploadService';
import {EhrUploadService, FileUploadServicePlaceholder} from '../EhrUploadService';
import {EhrTerminologyService} from '../EhrTerminologyService';
import {NgbDateISOParserFormatter} from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-parser-formatter';
import {EhrOnRenderedEmitter} from './ehr-on-rendered-emitter';
import {EhrButtonComponent} from './ehr-button/ehr-button.component';
import {ViewConfigParser} from '../ehr-form-model/thinkehr-f4-model-ts/parsing/ViewConfigParser';
import {DictionaryKeys} from './dictionary/DictionaryKeys';
import {EhrQuantityComponent} from './ehr-quantity/ehr-quantity.component';
import {EhrQuantityRu} from './ruComponents/EhrQuantityRu';
import {EhrDurationRu} from './ruComponents/EhrDurationRu';
import {EhrBooleanRu} from './ruComponents/EhrBoolRu';
import {EhrCountRu} from './ruComponents/EhrCountRu';
import {DaysValidationUtils} from './utils/validation/DaysValidationUtils';
import {ColumnWidthPipe} from './layout-renderer/column-renderer/column-width.pipe';

export const ehrFormTranslations: DictionaryKeys[] = [
  {
    language: 'en', keys: {
      'duration.year': 'years',
      'duration.year.ph': 'yr',
      'duration.month': 'months',
      'duration.month.ph': 'mo',
      'duration.week': 'weeks',
      'duration.week.ph': 'w',
      'duration.day': 'days',
      'duration.day.ph': 'day',
      'duration.hour': 'hours',
      'duration.hour.ph': 'hr',
      'duration.minute': 'minutes',
      'duration.minute.ph': 'min',
      'duration.second': 'seconds',
      'duration.second.ph': 'sec',

      'other': 'Other',
      'other.inputLabel': 'Other value: ',
      'other.selectedLabel': 'Other: ',
      'other.selectOptionLabel': 'Other value',
      'browseFiles': 'browse',
      'dropFiles': 'Drop here or',
      'loading': 'Loading',
      'notFound': 'Not found',
      'clearValue': 'Clear',

      'validation.required': 'Required field',
      'validation.required.unit': 'Unit is required.',
      'validation.required.anyGroupValue': 'Any input required.',

      'validation.lessThanEqual': 'Max. value {{lteValue}}',
      'validation.greaterThanEqual': 'Min. value {{gteValue}}',

      'validation.required.numerator': 'Numer. required',
      'validation.min.numerator': 'Numer. Min. value {{operator}} {{value}}',
      'validation.max.numerator': 'Numer. Max. value {{operator}} {{value}}',

      'validation.required.denominator': 'Den. required',
      'validation.min.denominator': 'Den. Min. value {{operator}} {{value}}',
      'validation.max.denominator': 'Den. Max. value {{operator}} {{value}}',

      'validation.min': 'Min. value {{operator}} {{value}}',
      'validation.min.duration': '{{field}} {{minOp}} {{min}}',
      'validation.max': 'Max. value {{operator}} {{value}}',
      'validation.max.duration': '{{field}} max val. {{maxOp}} {{max}}',
      'validation.min.multi': 'Min. {{min}} add {{delta}} more',
      'validation.max.multi': 'Max. {{max}} remove {{delta}}',
      'validation.min.listOpen': 'Min. values not reached.',
      'validation.max.listOpen': 'Max. values reached.',

      'validation.decimalPlaces.max': 'Max. {{max}} decimal places. Remove {{delta}}.',
      'validation.decimalPlaces.max.numerator': 'Max. decimal places in numerator. Remove {{delta}}.',
      'validation.decimalPlaces.max.denominator': 'Max. decimal places in denominator. Remove {{delta}}.',

      'validation.numberOfSelectionsInvalid': 'Number of options between {{numberOfSelectionsMin}} and {{numberOfSelectionsMax}}',
      'validation.pattern': 'Example: {{patternValidExample}}',
      'validation.terminologyCodeNotFound': 'Terminology code {{codeValue}} is not valid.',
      'validation.dateOptional.closeSelection': 'skip optional selection',
      'validation.dateOptional.requiredSelection': 'required selection',
      'validation.dateInvalidPattern': 'Date pattern not valid: {{datePattern}}',

      'validation.dateNotAfter': 'First valid date {{date}}',
      'validation.dateNotBefore': 'Last valid date {{date}}',

      'model.notFound.byTag': 'Model not found by \'{{queryStr}}\' tag.',
      'model.notFound.byPath': 'Model not found by \'{{queryStr}}\' path.',

      'placeholder.terminology': 'Type and select.',

      'unit.kg':'kwght',
      'unit.[kg/hh]':'kghhhEN'
    }
  },
  {
    language: 'sl', keys: {
      'unit.kg':'kil',
      'unit.[kg/hh]':'kghhhSL',
      'duration.year': 'let',
      'duration.year.ph': 'let',
      'duration.month': 'mesecev',
      'duration.month.ph': 'mes',
      'duration.week': 'tednov',
      'duration.week.ph': 'ted',
      'duration.day': 'dni',
      'duration.day.ph': 'dn',
      'duration.hour': 'ur',
      'duration.hour.ph': 'ure',
      'duration.minute': 'minut',
      'duration.minute.ph': 'min',
      'duration.second': 'sekund',
      'duration.second.ph': 'sek',

      'other.inputLabel': 'Drugo',
      'other.selectedLabel': 'Drugo: ',
      'other.selectOptionLabel': 'Druga vrednost>>',

      'browseFiles': 'prebrskaj',
      'dropFiles': 'Spusti tukaj ali',
      'loading': 'Prenašam',
      'notFound': 'Ne obstaja',
      'clearValue': 'Izbriši',

      'validation.required': 'Obvezno polje',
      'validation.required.unit': 'Mer. enota obvezna.',
      'validation.required.anyGroupValue': 'Eno polje obvezno.',

      'validation.min': 'Najm. vrednost {{operator}} {{value}}',
      'validation.max': 'Najv. vrednost {{operator}} {{value}}',
      'validation.min.duration': '{{field}} {{minOp}} {{min}}',
      'validation.min.multi': 'Min. {{min}} dodaj {{delta}}',
      'validation.max.multi': 'Max. {{max}} odstrani {{delta}}',
      'validation.min.listOpen': 'Min. values not reached.',
      'validation.max.listOpen': 'Max. values reached.',

      'validation.required.numerator': 'Numer. je obvezen',
      'validation.min.numerator': 'Numer. najm. vred. {{operator}} {{value}}',
      'validation.max.numerator': 'Numer. najv. vred. {{operator}} {{value}}',

      'validation.required.denominator': 'Den. je obvezen',
      'validation.min.denominator': 'Den. najm. vred {{operator}} {{value}}',
      'validation.max.denominator': 'Den. najv. vred {{operator}} {{value}}',

      'validation.max.duration': '{{field}} {{maxOp}} {{max}}',

      'validation.decimalPlaces.max': 'Max. {{max}} decimalnih mest.',
      'validation.decimalPlaces.max.numerator': 'Max. decimalnih mest v števcu. Zmanjšaj za {{delta}}.',
      'validation.decimalPlaces.max.denominator': 'Max. decimalnih mest v imenovalcu. Zmanjšaj za {{delta}}.',

      'validation.numberOfSelectionsInvalid': 'Izberite med {{numberOfSelectionsMin}} in {{numberOfSelectionsMax}} možnosti.',
      'validation.pattern': 'Vzorec: {{patternValidExample}}',
      'validation.terminologyCodeNotFound': 'Neveljavna koda terminologije {{codeValue}}.',
      'validation.dateOptional.closeSelection': 'zapri poljubno izbiro',
      'validation.dateOptional.requiredSelection': 'zahtevana izbira',
      'validation.dateInvalidPattern': 'Datum neveljaven: {{datePattern}}',

      'validation.dateNotAfter': 'Prvi veljaven datum {{date}}',
      'validation.dateNotBefore': 'Zadnji veljaven datum {{date}}',

      'model.notFound.byTag': 'Model z oznako \'{{queryStr}}\' ne obstaja.',
      'model.notFound.byPath': 'Model s potjo \'{{queryStr}}\' ne obstaja.',

      'placeholder.terminology': 'Iskanje po terminologiji.'
    }
  }
];

export function mergeDictKeys(overwriteBaseTranslations: DictionaryKeys[], providedTranslations: DictionaryKeys[] = []): DictionaryKeys[] {
  overwriteBaseTranslations.forEach((overwriteLangKeys: DictionaryKeys) => {
    let foundProvidedLangKeys: DictionaryKeys = providedTranslations.find((dk: DictionaryKeys) => dk.language == overwriteLangKeys.language);
    // if provided translations do not include default translations add default else just add any missing default keys to provided translation
    if (!foundProvidedLangKeys) {
      providedTranslations.push(overwriteLangKeys);
    } else {
      Object.keys(overwriteLangKeys.keys).forEach((transKey: string) => {
        if (foundProvidedLangKeys.keys[transKey] === undefined) {
          foundProvidedLangKeys.keys[transKey] = overwriteLangKeys.keys[transKey];
        }
      });
    }
  });
  return providedTranslations;
}

export let EHR_DICT_KEYS_DEFAULT = new InjectionToken<any[]>('DictionaryKeysDefArr');
export let EHR_DICT_KEYS_PARAM = new InjectionToken<any[]>('DictionaryKeysParamArr');
export let EHR_COMPS_MAP = new InjectionToken<any[]>('EHRCustomComponentsMap');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    EhrFormModelModule,
    ReactiveFormsModule,
    TranslateModule.forRoot(),
    MrdUiComponentsModule,
    NgbModule
  ],
  declarations: [
    EhrFormComponent, EhrContainerComponent, EhrTextComponent, ModelRendererComponent,
    EhrSingleFieldMultiControlsComponent, EhrValidationErrorsComponent, EhrUriComponent,
    EhrEhrUriComponent,
    EhrCountComponent,
    EhrCountRu,
    EhrProportionComponent,
    EhrQuantityRu,
    EhrQuantityComponent,
    EhrDurationComponent,
    EhrDurationRu,
    EhrDateTimeComponent,
    EhrDateComponent,
    EhrTimeComponent,
    EhrCodedTextComponent,
    EhrBooleanComponent,
    EhrBooleanRu,
    EhrCustomComponentHost,
    EhrNoComponentComponent,
    PrettyPrintPipe,
    RowsRendererComponent,
    ColumnRendererComponent,
    EhrFormDescriptionRendererComponent,
    TabHeaderComponent,
    EhrMultimediaComponent,
    EhrIdentifierComponent,
    EhrButtonComponent,
    EhrOnRenderedEmitter,
    ColumnWidthPipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    EhrFormModelModule,
    NgbModule,
    ReactiveFormsModule,
    MrdUiComponentsModule,
    EhrFormComponent, EhrContainerComponent, EhrTextComponent, ModelRendererComponent,
    EhrSingleFieldMultiControlsComponent, EhrValidationErrorsComponent, EhrUriComponent,
    EhrEhrUriComponent,
    EhrCountComponent,
    EhrCountRu,
    EhrProportionComponent,
    EhrQuantityRu,
    EhrQuantityComponent,
    EhrDurationComponent,
    EhrDurationRu,
    EhrDateTimeComponent,
    EhrDateComponent,
    EhrTimeComponent,
    EhrCodedTextComponent,
    EhrBooleanComponent,
    EhrBooleanRu,
    EhrCustomComponentHost,
    EhrFormDescriptionRendererComponent,
    EhrMultimediaComponent,
    EhrIdentifierComponent,
    EhrButtonComponent,
    EhrOnRenderedEmitter
  ],
  entryComponents: [EhrNoComponentComponent],
  providers: [EhrLayoutHelper, EhrFormConfig, EhrFormState, EhrValidationMessageResolver, EhrModelObservable, TabService, ViewConfigParser, DaysValidationUtils]
})
export class EhrFormComponentsModule {
  static forRoot(options: { terminologyLoaderService?: Type<EhrTerminologyService>, fileUploaderService?: Type<EhrUploadService>, fileUploadUrl?: string, customComponentsMap?: { [componentAnnotation: string]: Type<EhrFormCustomComponent> }, dateParser?: Type<NgbDateISOParserFormatter>, translations?: DictionaryKeys[], ruComponents?:boolean} = {}): ModuleWithProviders {
    return {
      ngModule: EhrFormComponentsModule, providers: [
        {provide: TerminologyService, useClass: options.terminologyLoaderService || TerminologyService},
        {provide: EHR_COMPS_MAP, useValue: options ? options.customComponentsMap : null},
        {
          provide: CustomComponentsDictionary,
          useClass: CustomComponentsDictionary,
          deps: [EHR_COMPS_MAP]
        },
        {provide: FileUploadService, useClass: (options.fileUploaderService || FileUploadServicePlaceholder)},
        {provide: NgbDateParserFormatter, useClass: (options.dateParser || NgbMrdMomentDateParserFormatter)},
        {provide: EHR_DICT_KEYS_DEFAULT, useValue: ehrFormTranslations},
        {provide: EHR_DICT_KEYS_PARAM, useValue: options.translations},
        {provide: EHR_DICT_KEYS, useFactory: mergeDictKeys, deps: [ EHR_DICT_KEYS_DEFAULT, EHR_DICT_KEYS_PARAM]},
        {provide: 'RU_CUSTOM_COMPONENTS', useValue: options.ruComponents},
      ]
    };
  }
}

export {FORM_SCRIPT_API} from './ehr-form/FormScriptApiProvider';
export {FormScriptApi} from './ehr-form/FormScriptApi';
export {EhrFormComponent} from './ehr-form/ehr-form.component';
export {EhrContainerComponent} from './ehr-container/ehr-container.component';
export {EhrLayoutHelper} from './utils/EhrLayoutHelper';
export {ModelRendererComponent} from './model-renderer/model-renderer.component';
export {EhrTextComponent} from './ehr-text/ehr-text.component';
export {EhrSingleFieldMultiControlsComponent} from './ehr-single-field-multi-controls/ehr-single-field-multi-controls.component';
export {EhrFormConfig} from './EhrFormConfig';
export {EhrValidationErrorsComponent} from './ehr-validation-errors/ehr-validation-errors.component';
export {EhrFormState} from './utils/EhrFormState';
export {EhrValidationMessageResolver} from './utils/validation/ehr-validation-message-resolver';
export {EhrUriComponent} from './ehr-text/ehr-uri/ehr-uri.component';
export {EhrEhrUriComponent} from './ehr-text/ehr-ehr-uri/ehr-ehr-uri.component';
export {EhrCountComponent} from './ehr-count/ehr-count.component';
export {EhrCountRu} from './ruComponents/EhrCountRu';
export {EhrProportionComponent} from './ehr-proportion/ehr-proportion.component';
export {EhrQuantityRu} from './ruComponents/EhrQuantityRu';
export {EhrDurationRu} from './ruComponents/EhrDurationRu';
export {EhrQuantityComponent} from './ehr-quantity/ehr-quantity.component';
export {EhrDurationComponent} from './ehr-duration/ehr-duration.component';
export {EhrDateTimeComponent} from './ehr-date-time/ehr-date-time.component';
export {EhrDateComponent} from './ehr-date/ehr-date.component';
export {EhrTimeComponent} from './ehr-time/ehr-time.component';
export {EhrCodedTextComponent} from './ehr-coded-text/ehr-coded-text.component';
export {EhrBooleanComponent} from './ehr-boolean/ehr-boolean.component';
export {EhrBooleanRu} from './ruComponents/EhrBoolRu';
export {EhrCustomComponentHost} from './ehr-custom-component-host';
export {CustomComponentsDictionary} from './CustomComponentsDictionary';
export {EhrNoComponentComponent} from './ehr-no-component/ehr-no-component.component';
export {RowsRendererComponent} from './layout-renderer/rows-renderer/rows-renderer.component';
export {ColumnRendererComponent} from './layout-renderer/column-renderer/column-renderer.component';
export {EhrFormDescriptionRendererComponent} from './ehr-form-description-renderer/ehr-form-description-renderer.component';
export {TerminologyService} from '../TerminologyService';
export {EhrFormCustomComponent} from './EhrFormCustomComponent';
export {TabService} from './utils/TabService';
export {TabHeaderComponent} from './tab-header/tab-header.component';
export {EhrMultimediaComponent} from './ehr-multimedia/ehr-multimedia.component';
export {EhrIdentifierComponent} from './ehr-identifier/ehr-identifier.component';
export {FileUploadService} from '../FileUploadService';
export {EhrButtonComponent} from './ehr-button/ehr-button.component';
export {EhrContext} from '../ehr-form-model/thinkehr-f4-model-ts/EhrContext';

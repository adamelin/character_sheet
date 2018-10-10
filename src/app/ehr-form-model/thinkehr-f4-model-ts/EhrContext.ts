import {MrdDateDisplayFormat, MrdCodedTextInputValueAction, MrdTimePlaceholderFormat} from 'mrd-ui-components';
import {UploadedFileRemovedFn, UploadFilesFn} from '../../EhrUploadService';
import {GetTerminologyItemFn, GetTerminologyListFn} from '../../EhrTerminologyService';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

export class EhrContext {
  language: string;
  territory: string;
  getTerminologyItem: GetTerminologyItemFn;
  getTerminologyList: GetTerminologyListFn;
  dateFormat: string = MrdDateDisplayFormat.FORMAT_L.toString();

  /* Placeholders */
  datePlaceholder: string = '';
  timePlaceholder: MrdTimePlaceholderFormat;

  dropdownClearButtonShow: boolean;
  dropdownEmptyItemHide: boolean;
  //deprecate hideLongValueTooltips - do with css
  hideLongValueTooltips: boolean;
  uploadFiles: UploadFilesFn;
  uploadedFileRemoved: UploadedFileRemovedFn;
  comboboxActions: MrdCodedTextInputValueAction[];
  tooltipValidation: boolean;
  multimediaContentUriDisplay: boolean;
  hideMultimediaContentPreview: boolean;
  dateClearButtonHide: boolean;
  textInputClearButtonShow: boolean;
  dropdownPresentationMinItems: number;
  dropdownPresentationMinItemsColumns: number;
  displayRadioClearItem: boolean;
  isoZuluTime: boolean;
  displayValidationMessgesOnTouched: boolean;
  blurDateParserFn: (inputValue: string, currDateValue: NgbDateStruct | string) => NgbDateStruct;
  displayDateInputMask: boolean;
  dropdownOpenPreselectFirst: boolean;


  get locale() {
    return !!this.territory ? this.language + '-' + this.territory : this.language;
  }

  set locale(langMinusTerritory: string) {
    let langTerSplit: string[] = langMinusTerritory.split('-');
    this.language = langTerSplit[0];
    this.territory = langTerSplit[1];
  }

  constructor(fromObj?: Object) {
    if (fromObj != null) {
      this.language = fromObj['language'];
      this.territory = fromObj['territory'];
      this.getTerminologyItem = fromObj['getTerminologyItem'];
      this.getTerminologyList = fromObj['getTerminologyList'];
      this.dateFormat = fromObj['dateFormat'];
      this.datePlaceholder = fromObj['datePlaceholder'];
      this.dropdownClearButtonShow = !!fromObj['dropdownClearButtonShow'];
      this.hideLongValueTooltips = !!fromObj['hideLongValueTooltips'];
      this.uploadFiles = fromObj['uploadFiles'];
      this.uploadedFileRemoved = fromObj['uploadedFileRemoved'];
      this.comboboxActions = fromObj['comboboxActions'];
      this.tooltipValidation = !!fromObj['tooltipValidation'];
      this.multimediaContentUriDisplay = !!fromObj['multimediaContentUriDisplay'];
      this.hideMultimediaContentPreview = !!fromObj['hideMultimediaContentPreview'];
      this.dateClearButtonHide = !!fromObj['dateClearButtonHide'];
      this.dropdownEmptyItemHide = !!fromObj['dropdownEmptyItemHide'];
      this.textInputClearButtonShow = !!fromObj['textInputClearButtonShow'];
      this.dropdownPresentationMinItems = fromObj['dropdownPresentationMinItems'];
      this.dropdownPresentationMinItemsColumns = fromObj['dropdownPresentationMinItemsColumns'];
      this.displayRadioClearItem = !!fromObj['displayRadioClearItem'];
      this.isoZuluTime = !!fromObj['isoZuluTime'];
      this.displayValidationMessgesOnTouched = !!fromObj['displayValidationMessgesOnTouched'];
      this.blurDateParserFn = fromObj['blurDateParserFn'];
      this.displayDateInputMask = fromObj['displayDateInputMask'];
      this.timePlaceholder = fromObj['timePlaceholder'];
      this.dropdownOpenPreselectFirst = fromObj['dropdownOpenPreselectFirst'];
    }
  }
}

import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, ViewChild} from '@angular/core';
import {FormRootModel} from './ehr-form-model/thinkehr-f4-model-ts/model/FormRootModel';
import {EhrFormComponent} from './ehr-form-components/ehr-form/ehr-form.component';
import {ThinkEhrModelParser} from './ehr-form-model/thinkehr-f4-model-ts/parsing/ThinkEhrModelParser';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';
import {CustomComponentsDictionary} from './ehr-form-components/CustomComponentsDictionary';
import {BmiIconComponent} from './ehr-form-custom-components/bmi-icon/bmi-icon.component';
import {BmiSimpleComponent} from './ehr-form-custom-components/bmi-simple/bmi-simple.component';
import {EhrFormService} from './EhrFormService';
import {TerminologyService} from './TerminologyService';
import {EhrModelObservable} from './ehr-form-model/ehr-model-observable';
import {EhrFormDescriptionRendererComponent} from './ehr-form-components/ehr-form-description-renderer/ehr-form-description-renderer.component';
import {MrdDateDisplayFormat} from 'mrd-ui-components';
import {FormObjectModel} from './ehr-form-model/thinkehr-f4-model-ts/model/FormObjectModel';
import {EhrContext} from './ehr-form-model/thinkehr-f4-model-ts/EhrContext';
import {CodedTextFieldModel, Model} from './ehr-form-model';
import {
  dvIsTest,
  dvLTEValidation,
  dvMemTest,
  dvOtherDefault, dvRuDeps,
  dvRuTest,
  dvStructuredValidation,
  dvValidation,
  performanceForm
} from './form.description';
import {map} from "rxjs/operators";
import {RmTypeModelValueGetter} from "./ehr-form-model/thinkehr-f4-model-ts/model/RmTypeModelValueGetter";
import {EhrModelEventType} from "./ehr-form-model/ehr-model-event";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent {

  formDesc: any = dvRuDeps;
  formLayout: any;//=layTest1

  ehrFormOptions: EhrFormOptions = {
    displayFormName: window['formName'] || "dates_test",
    username: window['formUsername'] || 'matjazhi',//'samodemo',//
    password: window['formPassword'] || 'matjazhi',//'samo!demo',//'matjazhi',//'demoparent2',
    url: window['formServerURL'] || 'http://thinkehr2.marand.si:8082/rest/v1',//'https://rest.ehrscape.com/rest/v1',//
    displayFormVersion: '*',
    sessionId: null,
    formLayout: this.formLayout,
    formDescription: window['formDescription'] || this.formDesc,
    values: {testPath: ['one']}
  };

  formContext: EhrContext;

  formRootModel: FormRootModel;
  values: any;

  @ViewChild('formComp')
  formComp: EhrFormComponent;

  @ViewChild('formDescRenderer')
  formDescRenderer: EhrFormDescriptionRendererComponent;

  showValueObject: any;
  vvv: any;

  renderFormConfig: { description: any, layout?: any[], values?: any, context?: EhrContext, displayFormIds?: string[] };

  private renderStart: number;

  private updatedValue;
  hideForm: boolean = true;

  constructor(private thinkEhrModelParser: ThinkEhrModelParser, private changeDetectorRef: ChangeDetectorRef, private http: Http,
              private customComponentsDictionary: CustomComponentsDictionary, private ehrFormService: EhrFormService,
              private terminologyService: TerminologyService, private ehrModelObservable: EhrModelObservable) {

    //this.initForm();
  }

  private initForm() {
    const getNextSibling = (model: FormObjectModel): FormObjectModel => {
      let parentModel: FormObjectModel = model.getParentModel() as FormObjectModel;
      if (parentModel) {
        let currInd: number = parentModel.getChildModels().findIndex(m => m === model);
        if (currInd < parentModel.getChildCount() - 1) {
          return parentModel.getChildModel(currInd + 1) as FormObjectModel;
        } else {
          return getNextSibling(parentModel);
        }
      }
      return null;
    };

    const firstEnabled = (currModel: FormObjectModel) => {
      if (currModel == null) {
        return null;
      }
      let nextSibling;
      if (!currModel.isContainer()) {
        if (!currModel.getViewConfig().isReadOnly() && !currModel.getViewConfig().isHidden()) {
          return currModel;
        }
        //is readonly find next sibling
        nextSibling = getNextSibling(currModel);
      } else {
        nextSibling = currModel.getChildModel(0) as FormObjectModel;
      }

      return firstEnabled(nextSibling);
    };

    const focusModelInput = (nextModel: FormObjectModel) => {
      if (nextModel) {
        this.formDescRenderer.componentsRegistry.componentsWithModel$(nextModel).take(1).subscribe((value: { components: any[] }) => {
          if (value.components.length && value.components[0].elementRef) {
            let componentEl: Element = value.components[0].elementRef.nativeElement;
            let input = componentEl.getElementsByTagName('input');
            if (input.length) {
              input[0].focus();
            }
          }
        });
      }
    };

    this.formContext = new EhrContext();
    this.formContext.language = 'en';
    this.formContext.displayDateInputMask = true;
    this.formContext.getTerminologyList = this.terminologyService.getList.bind(this.terminologyService);
    this.formContext.getTerminologyItem = this.terminologyService.getItem.bind(this.terminologyService);
    this.formContext.dropdownPresentationMinItems = 2;
    this.formContext.dropdownPresentationMinItemsColumns = 2;
    this.formContext.dropdownClearButtonShow = true;
    this.formContext.dropdownEmptyItemHide = true;
    this.formContext.displayRadioClearItem = true;
    this.formContext.isoZuluTime = false;
    this.formContext.textInputClearButtonShow = true;
    this.formContext.hideLongValueTooltips = false;
    this.formContext.displayValidationMessgesOnTouched = true;
    this.formContext.displayDateInputMask = true;
    this.formContext.dropdownOpenPreselectFirst = true;
    this.formContext.timePlaceholder = {
      hour: 'Uu',
      minute: 'mM'
    };
    /*this.formContext.blurDateParserFn=(inputVal:string, currDateValue:NgbDateStruct|string)=>{
      console.log("inputVal",inputVal, currDateValue, ThinkEhrUtil.isObject(currDateValue))
      if(!ThinkEhrUtil.isObject(currDateValue) ){
        let splitDate = inputVal.split('/');
        if(splitDate[2]&& splitDate[2].length==2){
          return {day:parseInt(splitDate[1]), month:parseInt(splitDate[0]), year:parseInt('20'+splitDate[2])}
        }
      }
      return null
    };*/

    //this.formContext.multimediaContentUriDisplay=true;
    /*this.formContext.comboboxActions = [
      {
        trigger: MrdCodedTextInputActionTriggerType.CUSTOM_KEY,
        eventKeyValue: 'ArrowDown',
        action: MrdCodedTextInputBehaviorType.LIST_ALL
      },
      {

        trigger: MrdCodedTextInputActionTriggerType.CUSTOM_KEY,
        eventKeyValue: 'Escape',
        action: MrdCodedTextInputBehaviorType.CLEAR_VALUE
      },
      {
        trigger: MrdCodedTextInputActionTriggerType.SELECTED,
        action: MrdCodedTextInputBehaviorType.CALLBACK,
        callbackFn: (model: FormRepeatableElementModel) => {
          if (model) {
            let nextSibling2 = getNextSibling(model);
            setTimeout(() => {
              focusModelInput(firstEnabled(nextSibling2));
            });
          }
        }
      }
    ];*/

    this.values = this.ehrFormOptions.values || {};
    if (this.ehrFormOptions.formDescription) {

      console.log('LOCAL formDescription=', this.ehrFormOptions.formDescription);
      this.renderStart = (new Date()).getTime();
      //this.formRootModel = thinkEhrModelParser.parseFormDescription(this.formContext, this.ehrFormOptions.formDescription, this.values, null) as FormRootModel;
      this.renderFormConfig = {
        description: this.ehrFormOptions.formDescription,
        layout: this.ehrFormOptions.formLayout,
        values: this.values,
        displayFormIds: []// ['test_encounter/testing/testing/intervals/quantity:1', 'test_encounter/testing/testing/intervals/quantity:2']
      };
      /*setTimeout(()=>{
        console.log("CHANGED FORM")
        this.values={}
        this.formRootModel = thinkEhrModelParser.parseFormDescription(this.formContext, this.ehrFormOptions.formDescription, this.values, null);
        this.renderFormConfig = {description: this.ehrFormOptions.formDescription, values: this.values};
        this.changeDetectorRef.markForCheck();
      },5000)*/
    } else {
      this.initFormFromServer(this.ehrFormOptions);
    }
  }

  ngAfterViewInit() {
    /*this.formDescRenderer.componentsRegistry.componentsWithTag$('quantTag').subscribe((containerModels) => {
      console.log('CONTAINERS=', containerModels);
    });

    this.updatedValue = this.formDescRenderer.onValueChange.pipe(
      map((v: { model: FormObjectModel }) => {
        return {model:v.model, val:RmTypeModelValueGetter.getValue(v.model)};
      }),

      /!*distinctUntilChanged((v1:{model:FormObjectModel, val:any}, v2:{model:FormObjectModel, val:any})=>{
        return v1.model===v2.model &&
      })*!/
    );

    this.updatedValue.subscribe((v) => {
      console.log("END VVV", v);
    });*/
  }

  logModel() {
    console.log('model=', JSON.stringify(this.values));
  }

  onValidationUpdated(val) {
    console.log('FORM validation updated', val);
    setTimeout(() => {
      this.changeDetectorRef.markForCheck();
    });
  }

  toggleForm() {
    this.values = {};
    ///this.formRootModel = this.thinkEhrModelParser.parseFormDescription(this.formContext, this.ehrFormOptions.formDescription, this.values, null) as FormRootModel;
    this.renderFormConfig = {
      description: this.ehrFormOptions.formDescription,
      values: this.values,
      displayFormIds: ['']
    };
  }

  changeLanguage() {
    let newCtx = new EhrContext(this.formContext);
    newCtx.language = this.formContext.language == 'sl' ? 'en' : 'sl';
    this.formContext = newCtx;
  }

  changeDateFormat() {
    let newCtx = new EhrContext(this.formContext);
    newCtx.dateFormat = this.formContext.dateFormat == MrdDateDisplayFormat.FORMAT_LL.toString() ? MrdDateDisplayFormat.FORMAT_L.toString() : MrdDateDisplayFormat.FORMAT_LL.toString();
    this.formContext = newCtx;
  }

  initFormFromServer(configObj: EhrFormOptions) {
    let login: Observable<any> = this.ehrFormService.login(configObj.url, configObj.username, configObj.password);
    login.subscribe((sessionId) => {
      //console.log("Login sessionId=", sessionId);

      // Ping the session every 5 minutes
      this.ehrFormService.startPingInterval(configObj.url + '/session', sessionId);

      if (!configObj.formDescription && configObj.displayFormName && configObj.displayFormVersion) {
        this.ehrFormService.loadForm(configObj.displayFormName, configObj.displayFormVersion, sessionId, configObj.url)
          .subscribe((formDesc_Layout: { description: FormRootModel, layout: any[] }) => {
            console.log('Form description ', formDesc_Layout.description);

            if (!formDesc_Layout.description) {
              console.error('Could not find form-description for form ' + configObj.displayFormName + ':' + configObj.displayFormVersion);
            } else {
              //this.values = {};
              ///let parsedFD: FormRootModel = this.thinkEhrModelParser.parseFormDescription(this.formContext, formDesc_Layout.description, this.values, null) as FormRootModel;
              //this.formLayout = formDesc_Layout.layout;
              //alert("LOADED")
              ///this.formRootModel = parsedFD;
              //console.log("valuesJSON=",JSON.stringify(this.values))

              this.renderStart = (new Date()).getTime();
              this.renderFormConfig = {
                description: formDesc_Layout.description,
                values: this.values,
                layout: formDesc_Layout.layout,
                displayFormIds: [] // ['test_encounter/testing/testing/intervals/quantity:0,2']
              };
              //console.log("formDescription=",this.renderFormConfig.description)
              console.log('LOADED formDescription=', this.renderFormConfig.description);
              this.ehrFormOptions.formDescription = this.renderFormConfig.description;
              this.changeDetectorRef.markForCheck();
            }
          });
      }
    });
  }

  switchCustomComponent() {
    if (this.customComponentsDictionary.registeredComponents['bmiCalc'] === BmiSimpleComponent) {
      this.customComponentsDictionary.registerComponent('bmiCalc', BmiIconComponent);
    } else {
      this.customComponentsDictionary.registerComponent('bmiCalc', BmiSimpleComponent);
    }
  }

  onFormRenderedOneByOne(value) {
    // console.log("OneByOne COMPLETE",)
  }

  onFormRendered(formRootModel: FormRootModel) {

    /*this.formRootModel = formRootModel;
    console.log('RENDERED IN=', ((new Date()).getTime()) - this.renderStart, 'ms');

    this.formDescRenderer.api.addListener('Informed_consent_remote_activities','CHANGE', (val)=>{
        console.log("itemCHANGE",val)
    })

    let fieldByTag = formRootModel.findModelWithTag('Informed_consent_remote_activities', true) as CodedTextFieldModel;

    if (fieldByTag) {
      setTimeout(() => {
        fieldByTag.getViewConfig().setTooltip('new tooltip text');
      }, 5000);

      this.formDescRenderer.getFieldValueObservable(fieldByTag).subscribe((value: any) => {
        console.log('FIELD VALUE CHANGE=', value);
      });
    }

    let mdls = this.formDescRenderer.formRootModel.findModelsWithTag('onMe') as NodeModel[];

    mdls.forEach((m) => {
      m.addUpdatedValueCallback((v)=>{
        console.log("CCCCCC",v)
      });
    });*/
    this.formDescRenderer.api.hideFormElement('hsection');

  }

  onFieldValidation(value:{ model: FormObjectModel, errors: string[] }){
    console.log("FIELD VALIDATION=",value)
  }

  onValueChange(val: { model: Model }) {
    const comp = val['components'][0];
    console.log('FORM VALUE CHANGE=', val, val.model['formId'], comp ? comp.elementRef.nativeElement : 'noCOMP', val.model['value']);
  }

  bTest() {
    /*let mdls = this.formDescRenderer.formRootModel.findSuccessorsWithTag('quant');

    console.log("models",mdls)
    if(mdls[0]) {*/
    //(mdls[0] as QuantityFieldModel).magnitudeValue('33',0)
    //this.formDescRenderer.api.setFieldValue('quant', [21.2], 'magnitude');

    /*let ff = this.formDescRenderer.formRootModel.findSuccessorWithTag('customc') ;
    this.formDescRenderer.api.clearFormElement('customc');*/

    const api = this.formDescRenderer.api;
    let ff = this.formDescRenderer.formRootModel.findSuccessorWithTag('toHide') as CodedTextFieldModel;

    ff.getViewConfig().setHidden(true);

    //this.formDescRenderer.api.hideFormElement('customc');
    /* this.formDescRenderer.api.moveFieldToEnd('hsection');
     this.formDescRenderer.api.moveFieldToEnd('ffield');

     this.formDescRenderer.api.clearFormElement('toClear')*/


    //this.formDescRenderer.api.setFieldValue('quant', ['kg', 'kg'], 'unit')
    //this.formDescRenderer.api.setFieldValue('quant', [{'|unit':'kg', '|value':11}])
    //}

    /*mdls[0].setAnnotationValue('cssClass', 'newClasss')

    console.log('ffff1=',this.formDescRenderer.api.getFieldValue('f1', 'p1'));
    console.log('ffff2=',this.formDescRenderer.api.getFieldValue('f1', 'p2'));

    const dv=(new Date()).toISOString()
console.log("DDD",dv,ThinkEhrUtil.toLocalTimezoneOffsetISOString(dv))*/

    /*let radios = this.formRootModel.findModelWithTag('radios', true) as CodedTextFieldModel;
    radios.setMax(2)
    let checkb = this.formRootModel.findModelWithTag('checkb', true) as CodedTextFieldModel;
    checkb.setMax(1)*/


    /*let hiddenCont = this.formRootModel.findModelsWithTag('hiddenContainer') as NodeModel[];
    if(hiddenCont&&hiddenCont.length) {
      hiddenCont.forEach((m)=>{
        m.getViewConfig().setHidden(false);
      })
    }*/

    /*let codedText = this.formRootModel.findModelWithTag('coded', true) as CodedTextFieldModel;
    codedText.codeValue('A02');
    codedText.codeValue('A02.2');*/

    /*setTimeout(()=>{
      (<FormRepeatableElementModel>codedText.getParentModel()).moveChildPosition(codedText, 1);
    })*/

    // this.formDescRenderer.api.moveFieldToEnd('radios');
    //
    // let termText = this.formRootModel.findModelWithTag('termtxt', true) as TextFieldModel;
    // termText.textValue('newVVV')

    /*let newVals: any = {
      "test_encounter": {
        "testing": [
          {
            "testing": [
              {
                "testing_dv_coded_text": [
                  {
                    "|code": "at0029",
                    "|value": "Second"
                  }
                ],
                "testing_dv_text": [
                  "newVVV"
                ],
                "name_1": []
              }
            ]
          }
        ]
      }
    };
    this.formDescRenderer.updateValues(newVals, true);*/

    /*const hasNewProps = this.formDescRenderer.updateValues({
      "testPath": [
        "two"
      ],
      "назначение_инструментального_исследования": {
        "testDeep": [
          "three"
        ],
        "сведения_о_назначении": [
          {
            "назначение": [
              {
                "запрос": [
                  {
                    "основное_исследование": ["new value"],
                    "дополнительные_инструментальные_исследования": [
                      {
                        "дополнительное_исследование": []
                      }
                    ],
                    "цель_исследования": [],
                    "срок_действия_и_длительность": [
                      {
                        "коэффициент_трудоёмкости": [],
                        "длительность_исследований": [],
                        "дата_начала_действия": [],
                        "дата_окончания_действия": [],
                        "срочность": []
                      }
                    ],
                    "комментарии": [
                      {
                        "комментарии": []
                      }
                    ]
                  }
                ]
              }
            ],
            "диагноз": [
              {
                "код_по_мкб": []
              }
            ],
            "направление_для_cito-пациента": [
              {
                "специальный_доступный_ресурс": [
                  {
                    "идентификатор_ресурса": [],
                    "локация-кабинет": [
                      {
                        "идентификатор_кабинета": []
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      "generic-field-22640": {},
      "generic-field-95775": {},
      "generic-field-82929": {}
    }, false, true);

    console.log("HAS N P=", hasNewProps);*/
  }

  bTest1() {
    /*let mdls = this.formDescRenderer.formRootModel.findSuccessorsWithTag('quant');

    console.log("models",mdls)

    if(mdls[0]) {
      //(mdls[0] as QuantityFieldModel).magnitudeValue('33',0)
      this.formDescRenderer.api.setFieldValue('quant', [21.2], 'magnitude')
      //this.formDescRenderer.api.setFieldValue('quant', ['kg', 'kg'], 'unit')
      //this.formDescRenderer.api.setFieldValue('quant', [{'|unit':'kg', '|value':11}])
    }*/
    const api = this.formDescRenderer.api;
    let ff = this.formDescRenderer.formRootModel.findSuccessorWithTag('toHide') as CodedTextFieldModel;

    ff.getViewConfig().setHidden(false);

  }

  destroyForm(){
    this.hideForm = true;
    this.formContext = null;
  }

  createForm(){
    this.initForm()
    this.hideForm = false;
  }

}


export interface EhrFormOptions {
  username: string;
  password: string;
  url: string;
  displayFormName: string;
  displayFormVersion: string;
  sessionId?: string;
  formDescription?: any;
  formLayout?: any[];
  values?: any
}

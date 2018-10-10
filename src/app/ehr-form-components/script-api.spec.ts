import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {} from '@types/jasmine'

import {EhrFormComponent} from './ehr-form/ehr-form.component';
import {BrowserModule} from "@angular/platform-browser";
import {EhrFormModelModule} from "./../ehr-form-model/ehr-form-model.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {EhrFormCustomComponentsModule} from "./../ehr-form-custom-components/custom-form-components.module";
import {TerminologyService} from "./../TerminologyService";
import {EhrFormService} from "./../EhrFormService";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {EhrFormComponentsModule} from "./ehr-form-components.module";
import {ThinkEhrModelParser} from "./../ehr-form-model/thinkehr-f4-model-ts/parsing/ThinkEhrModelParser";
import {EhrContext} from "./../ehr-form-model/thinkehr-f4-model-ts/EhrContext";
import {EhrTestingUtils} from "./utils/EhrTestingUtils"
import {FormRepeatableElementModel} from "../ehr-form-model/thinkehr-f4-model-ts/model/FormRepeatableElementModel";
import {FormObjectModel} from "../ehr-form-model/thinkehr-f4-model-ts/model/FormObjectModel";
import {TextFieldModel} from "../ehr-form-model/thinkehr-f4-model-ts/model/fieldModel/TextFieldModel";
import {ScriptApi, ModelScriptExecutor} from "./ScriptApi";
import {EhrModelObservable} from "../ehr-form-model/ehr-model-observable";


describe('EhrFormComponent', () => {
  let component: EhrFormComponent;
  let fixture: ComponentFixture<EhrFormComponent>;
  let parsedFormRootModel;

  beforeEach(async(() => {
    TestBed.configureTestingModule({

      imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        EhrFormModelModule,
        EhrFormComponentsModule.forRoot({}),
        NgbModule.forRoot(),
        EhrFormCustomComponentsModule
      ]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EhrFormComponent);
    component = fixture.componentInstance;

    let formDescription: any = {
      "formId": "form_root",
      "name": "Form root",
      "rmType": "FORM_DEFINITION",
      "viewConfig": {
        "label": {
          "custom": false,
          "value": "",
          "useLocalizations": false,
          "localizationsList": {}
        },
        "size": {
          "field": "inherit",
          "label": "inherit",
          "fill": "inherit"
        },
        "layout": {
          "valign": "inherit",
          "align": "inherit"
        },
        "tags": []
      },
      "language": "",
      "templateLanguages": [
        "en"
      ],
      "children": [
        {
          "name": "weight",
          "localizedName": "weight",
          "rmType": "DV_TEXT",
          "nodeId": "at0018",
          "min": 0,
          "max": 100,
          "localizedNames": {
            "en": "Name 3"
          },
          "localizedDescriptions": {
            "en": "*"
          },
          "aqlPath": "/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0018,'Name 3']/value",
          "inputs": [
            {
              "type": "TEXT"
            }
          ],
          "formId": "test_encounter/testing/testing/name_3",
          "viewConfig": {
            "size": {
              "field": "inherit",
              "label": "inherit",
              "fill": "inherit"
            },
            "layout": {
              "label": {
                "valign": "inherit",
                "align": "inherit"
              },
              "field": {
                "valign": "inherit",
                "align": "inherit"
              }
            },
            "label": {
              "custom": true
            },
            "advanced": {
              "hidden": false,
              "readonly": false
            },
            "tags": [
              "weight"
            ],
            "datasource": {
              "loadRemote": false,
              "loadRemoteUrl": "",
              "terminology": ""
            },
            "field": {
              "input": {
                "presentation": "textfield",
                "lines": "1"
              }
            }
          }
        },
        {
          "name": "height",
          "localizedName": "height",
          "rmType": "DV_TEXT",
          "nodeId": "at0018",
          "min": 0,
          "max": 100,
          "localizedNames": {
            "en": "Name 2"
          },
          "localizedDescriptions": {
            "en": "*"
          },
          "aqlPath": "/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0018,'Name 2']/value",
          "inputs": [
            {
              "type": "TEXT"
            }
          ],
          "formId": "test_encounter/testing/testing/name_2",
          "viewConfig": {
            "size": {
              "field": "inherit",
              "label": "inherit",
              "fill": "inherit"
            },
            "layout": {
              "label": {
                "valign": "inherit",
                "align": "inherit"
              },
              "field": {
                "valign": "inherit",
                "align": "inherit"
              }
            },
            "label": {
              "custom": true
            },
            "advanced": {
              "hidden": false,
              "readonly": false
            },
            "tags": [
              "height", "t2", "hideThis"
            ],
            "datasource": {
              "loadRemote": false,
              "loadRemoteUrl": "",
              "terminology": ""
            },
            "field": {
              "input": {
                "presentation": "textfield",
                "lines": "1"
              }
            }
          }
        },
        {
          "name": "Name 3",
          "localizedName": "Name 3",
          "rmType": "DV_TEXT",
          "nodeId": "at0018",
          "min": 1,
          "max": 100,
          "localizedNames": {
            "en": "Name 3"
          },
          "localizedDescriptions": {
            "en": "*"
          },
          "aqlPath": "/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0018,'Name 3']/value",
          "inputs": [
            {
              "type": "TEXT"
            }
          ],
          "formId": "test_encounter/testing/testing/name_3:1",
          "viewConfig": {
            "size": {
              "field": "inherit",
              "label": "inherit",
              "fill": "inherit"
            },
            "layout": {
              "label": {
                "valign": "inherit",
                "align": "inherit"
              },
              "field": {
                "valign": "inherit",
                "align": "inherit"
              }
            },
            "advanced": {
              "hidden": false,
              "readonly": false
            },
            "tags": [
              "bmiValue", "t2", "hideThis"
            ],
            "datasource": {
              "loadRemote": false,
              "loadRemoteUrl": "",
              "terminology": ""
            },
            "field": {
              "input": {
                "presentation": "textfield",
                "lines": "1"
              }
            },
            "ehrFormScript": [
              "var bmiFn=function(h,v){return h+v;}; var fstVal=function(vObj){return vObj.value[0]}",
              `api.onChange('weight', function(v){
   v=fstVal(v)
   if(v=='hide'){
   api.hideFormElement('hideThis');
   }else{
   api.showFormElement('hideThis');
   }

   if(v=='dis'){
   api.disableFormElement('bmiValue');
   }else{
   api.enableFormElement('bmiValue');
   }

   if(v=='60'){api.setFieldValue('height', '160');}
   if(v=='get'){api.log('GGETTT=', api.getFieldValue('bmiValue') );}
   });`,
              "api.onEditStart('height', function(v){console.log('edit start TEST=',v)})",

              "api.onEditEnd('height', function(v){console.log('edit end TEST=',v)})",

              "api.onEnabledChange('bmiValue', function(v){console.log('ENABLED CHANGEEEE=',v)})",

              "api.onVisibilityChange('hideThis', function(v){console.log('VISIBILITY CHANGEEEE=',v)})",

              "api.onValidationChange('bmiValue', function(v){console.log('VALIDATION CHANGEEEE=',v)})",

              `api.addListener('weight', 'CHANGE', function(v){
   api.setFieldValue('bmiValue', bmiFn(fstVal(api.getFieldValue('height')), fstVal(v)) );
   })
   api.addListener('height', 'CHANGE', function(v){
   api.setFieldValue('bmiValue', bmiFn(fstVal(v),fstVal(api.getFieldValue('weight')) ));
   console.log("height CHANGE=", fstVal(api.getFieldValue('bmiValue')) )
   })`,

              "api.addListener('bmiValue', 'CHANGE', function(v){console.log('BMI CHANGEEEE=',v)})"
            ]
          }
        }
      ]
    };
    let formContext = new EhrContext();
    formContext.language = 'sl';
    component.ehrContext = formContext;
    parsedFormRootModel = TestBed.get(ThinkEhrModelParser).parseFormDescription(formContext, formDescription, {}, null);
    component.formRootModel = parsedFormRootModel;
    fixture.detectChanges();
  });

  it('should listen on tagged fields and set calculated value to tagged field', (complete) => {
    let scriptApi: ScriptApi = TestBed.get(ScriptApi);
    let wModel: TextFieldModel = parsedFormRootModel.findModelWithTag('weight', true) as TextFieldModel;
    wModel.textValue('70');
    let bmiVal: TextFieldModel = parsedFormRootModel.findModelWithTag('bmiValue', true) as TextFieldModel;
    let scriptApiExecutor: ModelScriptExecutor = new ModelScriptExecutor(bmiVal, scriptApi.componentsRegistry, TestBed.get(EhrModelObservable));
    scriptApiExecutor.addListener('bmiValue', 'CHANGE', (val) => {
      fixture.detectChanges();
      expect(val.elementName).toBe('bmiValue');
      expect(val.elementType).toBe('DV_TEXT');
      expect(val.value[0]).toBe('18070');
      expect(bmiVal.textValue()).toBe('18070');
      complete();
    });
    let hModel: TextFieldModel = parsedFormRootModel.findModelWithTag('height', true) as TextFieldModel;
    hModel.textValue('180');
  });
});

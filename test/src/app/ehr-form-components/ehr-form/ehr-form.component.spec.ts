import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {} from '@types/jasmine'

import {EhrFormComponent} from './ehr-form.component';
import {BrowserModule} from "@angular/platform-browser";
import {EhrFormModelModule} from "../../ehr-form-model/ehr-form-model.module";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {EhrFormCustomComponentsModule} from "../../ehr-form-custom-components/custom-form-components.module";
import {TerminologyService} from "../../TerminologyService";
import {EhrFormService} from "../../EhrFormService";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {EhrFormComponentsModule} from "../ehr-form-components.module";
import {ThinkEhrModelParser} from "../../ehr-form-model/thinkehr-f4-model-ts/parsing/ThinkEhrModelParser";
import {EhrContext} from "../../ehr-form-model/thinkehr-f4-model-ts/EhrContext";
import {EhrTestingUtils} from "../utils/EhrTestingUtils";
import {BrowserDynamicTestingModule} from "@angular/platform-browser-dynamic/testing";

describe('EhrFormComponent', () => {
  let component: EhrFormComponent;
  let fixture: ComponentFixture<EhrFormComponent>;
  let parsedFormRoodModel;

  beforeEach(async(() => {
    TestBed.configureTestingModule({

      imports: [
        BrowserModule,
        BrowserDynamicTestingModule,
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
          "name": "Testing DV_TEXT",
          "localizedName": "Testing DV_TEXT",
          "rmType": "DV_TEXT",
          "nodeId": "at0026",
          "min": 0,
          "max": -1,
          "localizedNames": {
            "en": "Testing DV_TEXT"
          },
          "localizedDescriptions": {
            "en": "*"
          },
          "aqlPath": "/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0026]/value",
          "inputs": [
            {
              "type": "TEXT"
            }
          ],
          "formId": "test_encounter/testing/testing/testing_dv_text",
          "viewConfig": {
            "size": {
              "field": "inherit",
              "label": "inherit",
              "fill": "inherit"
            },
            "layout": {
              "field": {
                "valign": "inherit",
                "align": "inherit"
              }
            },
            "annotations": {
              "function": "bmiCalc"
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

                if(v=='70'){api.setFieldValue('height', '180');}
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
                //if(fstVal(v)=='11')api.removeListener('height', 'CHANGE')
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
    parsedFormRoodModel = TestBed.get(ThinkEhrModelParser).parseFormDescription(formContext, formDescription, {}, null);
    component.formRootModel = parsedFormRoodModel;
    fixture.detectChanges();
  });

  it('should create', () => {
    let formContext = new EhrContext();
    formContext.language = 'en';
    component.ehrContext = formContext;
    fixture.detectChanges();
    expect(component.ehrContext.language).toBe('en');
    expect(component).toBeTruthy();
  });
});

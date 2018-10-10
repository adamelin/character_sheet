import {} from '@angular/core/testing';
import {} from 'jasmine';
import {ThinkEhrModelParser} from "../parsing/ThinkEhrModelParser";
import {DirectValueModel} from "./DirectValueModel";
import {FormRootModel} from "./FormRootModel";
import {TextFieldModel} from "./fieldModel/TextFieldModel";
import {RmType} from "../RmType";
import {ThinkEhrUtil} from "../ThinkEhrUtil";
import {ViewConfigParser} from "../parsing/ViewConfigParser";
import {InputType} from "../view/InputType";
import {Input} from "../Input";


describe('DirectValueModel', () => {

  it("Text Field Model - Multi- testing DirectValueModel.valueGetterSetter", function () {
    var desc = {
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
          "name": "Exclusion Statement",
          "localizedName": "Exclusion Statement",
          "rmType": "DV_TEXT",
          "nodeId": "at0002.1",
          "min": "1",
          "max": "100",
          "localizedNames": {
            "en": "Exclusion Statement"
          },
          "localizedDescriptions": {
            "en": "A statement about exclusion of procedures performed in the health record."
          },
          "annotations": {
            "comment": "For example: \"No known operations or significant procedures\" or \"No previous\" (appendicectomy)."
          },
          "aqlPath": "/content[openEHR-EHR-SECTION.adhoc.v1,'4. Surgical procedures']/items[openEHR-EHR-EVALUATION.exclusion-procedure.v1]/data[at0001]/items[at0002.1]/value",
          "inputs": [
            {
              "type": "TEXT",
              "defaultValue": "No significant past surgical procedures.exc"
            }
          ],
          "formId": "ppop_national_patient_summary/a4._surgical_procedures/exclusion_of_a_procedure/exclusion_statement",
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
            "datasource": {
              "loadRemote": false,
              "loadRemoteUrl": "",
              "terminology": ""
            },
            "advanced": {
              "hidden": false,
              "readonly": false
            },
            "tags": [
              "multi"
            ],
            "field": {
              "input": {
                "presentation": "textfield",
                "lines": "1"
              }
            }
          }
        }
      ]
    };

    var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, {}, []) as FormRootModel;
    var tm = rm.findSuccessorWithPath('ppop_national_patient_summary/a4._surgical_procedures/exclusion_of_a_procedure/exclusion_statement') as TextFieldModel;


    expect(tm.getRmType()).toBe(RmType.DV_TEXT);
    expect(tm instanceof TextFieldModel).toBe(true);
    expect(tm.isMulti()).toBe(true);
    expect(tm.valueGetterSetter()[0]).toBe('No significant past surgical procedures.exc');
    expect(tm.valueGetterSetter(undefined, 0)).toBe('No significant past surgical procedures.exc');
    expect(tm.valueGetterSetter(null).length).toBe(0);
    expect(tm.valueGetterSetter(undefined, undefined).length).toBe(0);
    expect(tm.valueGetterSetter(undefined, 0)).toBe(null);
    expect(tm.valueGetterSetter(undefined, 1)).toBe(null);
    var valueSet = tm.valueGetterSetter('zero', 0);
    expect(valueSet).toBe('zero');
    expect(tm.valueGetterSetter(undefined, undefined).length).toBe(1);
    expect(tm.valueGetterSetter(undefined, undefined)[1]).toBe(undefined);
    expect(tm.valueGetterSetter(undefined, undefined)[0]).toBe('zero');
    expect(tm.valueGetterSetter(undefined)[0]).toBe('zero');
    expect(tm.valueGetterSetter()[0]).toBe('zero');
    expect(tm.valueGetterSetter().length).toBe(1);

    expect(tm.valueGetterSetter(null, undefined).length).toBe(0);
    expect(tm.valueGetterSetter('one', 1)).toBe('one');
    expect(tm.valueGetterSetter(undefined, 1)).toBe('one');
    expect(tm.valueGetterSetter(undefined, undefined).length).toBe(2);
    expect(tm.valueGetterSetter(undefined, undefined)[1]).toBe('one');
    expect(tm.valueGetterSetter(undefined, undefined)[0]).toBe(undefined);
    expect(tm.valueGetterSetter(undefined)[0]).toBe(undefined);
    expect(tm.valueGetterSetter()[0]).toBe(undefined);
    expect(tm.valueGetterSetter()[1]).toBe('one');
    expect(tm.valueGetterSetter(null, 0)).toBe('one');
    expect(tm.valueGetterSetter(undefined, undefined).length).toBe(1);
    expect(tm.valueGetterSetter(undefined)[0]).toBe('one');
    expect(tm.valueGetterSetter(undefined).length).toBe(1);

    tm.setValue("new");
    expect(ThinkEhrUtil.isArray(tm.value)).toBe(true);
    expect(tm.value[0]).toBe('new');

  });

  it("Text Field Model - Single- testing DirectValueModel.valueGetterSetter", function () {
    var tmPlain: any = {
      "name": "Description of thermal stress",
      "localizedName": "Description of thermal stress",
      "rmType": "DV_TEXT",
      "nodeId": "at0041",
      "min": 0,
      "max": 1,
      "dependsOn": [
        "symptoms",
        "temperature"
      ],
      "localizedNames": {
        "sl": "Opis",
        "en": "Description of thermal stress"
      },
      "aqlPath": "/content[openEHR-EHR-SECTION.ispek_dialog.v1,'Vitals']/items[openEHR-EHR-OBSERVATION.body_temperature-zn.v1]/data[at0002]/events[at0003]/state[at0029]/items[at0041]/value",
      "inputs": [
        {
          "type": "TEXT"
        }
      ],
      "formId": "vitals/vitals/body_temperature/any_event/description_of_thermal_stress",
      "viewConfig": {
        "label": {
          "custom": true,
          "value": "Thermal stress",
          "useLocalizations": true,
          "localizationsList": {
            "sl": "Opis",
            "en": "Thermal stress"
          }
        },
        "advanced": {
          "hidden": false,
          "readonly": false
        },
        "multiplicity": {
          "min": "0",
          "max": "1"
        },
        "size": {
          "field": "inherit",
          "label": "inherit"
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
        "tags": [],
        "datasource": {
          "loadRemote": false,
          "loadRemoteUrl": ""
        },
        "field": {
          "input": {
            "presentation": "textarea",
            "lines": "1"
          }
        }
      }
    };

    var tm: TextFieldModel = new TextFieldModel(tmPlain, new ViewConfigParser());
    tm.setViewConfig((new ViewConfigParser() ).parseViewConfig(tmPlain.viewConfig));

    var textInput = new Input({
      type: InputType[tmPlain.inputs[0].type],
      defaultValue: tmPlain.inputs[0].defaultValue
    });

    tm.setInputs([textInput]);
    tm.setValueNodeParentRef([]);

    expect(tm.getRmType()).toBe(RmType.DV_TEXT);
    expect(tm instanceof DirectValueModel).toBe(true);
    expect(tm.isMulti()).toBe(false);
    expect(tm.getName()).toBe("Description of thermal stress");
    expect(tm.getLocalizedName()).toBe("Description of thermal stress");
    expect(tm.valueGetterSetter()).toBe(null);
    expect(tm.valueGetterSetter(undefined, undefined).length).toBe(0);
    expect(tm.valueGetterSetter(undefined, 0)).toBe(null);
    expect(tm.valueGetterSetter(undefined, 1)).toBe(null);
    expect(tm.valueGetterSetter('zero', 0)).toBe('zero');
    expect(tm.valueGetterSetter(undefined, undefined).length).toBe(1);
    expect(tm.valueGetterSetter(undefined, undefined)[1]).toBe(undefined);
    expect(tm.valueGetterSetter(undefined, undefined)[0]).toBe('zero');
    expect(tm.valueGetterSetter(undefined)).toBe('zero');
    expect(tm.valueGetterSetter()).toBe('zero');

    expect(tm.valueGetterSetter(null, undefined).length).toBe(0);
    expect(tm.valueGetterSetter('one', 1)).toBe('one');
    expect(tm.valueGetterSetter('one', 1)).toBe('one');
    expect(tm.valueGetterSetter(undefined, undefined).length).toBe(2);
    expect(tm.valueGetterSetter(undefined, undefined)[1]).toBe('one');
    expect(tm.valueGetterSetter(undefined, undefined)[0]).toBe(undefined);
    expect(tm.valueGetterSetter(undefined)).toBe(null);
    expect(tm.valueGetterSetter()).toBe(null);
    expect(tm.valueGetterSetter(null, 0)).toBe('one');
    expect(tm.valueGetterSetter(undefined, undefined).length).toBe(1);
    expect(tm.valueGetterSetter(undefined)).toBe('one');

    tm.setValue("new");
    expect(ThinkEhrUtil.isArray(tm.value)).toBe(true);
    expect(tm.value[0]).toBe('new');

  });

});

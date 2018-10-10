import {
} from '@angular/core/testing';
import {EhrUriFieldModel} from "./EhrUriFieldModel";
import {ThinkEhrModelParser} from "../../parsing/ThinkEhrModelParser";


describe('EhrUriFieldModel', () => {

    it("Dependency - DV_EHR_URI ", function () {

      console.log("TODO EhrUriFieldModel.spec.ts dependency for DV_EHR_URI");
      /*var desc = {
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
          "en",
          "sl"
        ],
        "children": [
          {
            "name": "Uri",
            "localizedName": "Ehr Uri",
            "rmType": "DV_EHR_URI",
            "nodeId": "at0012",
            "min": "1",
            "max": "1",
            "localizedNames": {
              "en": "Uri",
              "sl": "*Uri(en)"
            },
            "localizedDescriptions": {
              "en": "*",
              "sl": "**(en)"
            },
            "aqlPath": "/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0012]/value",
            "inputs": [
              {
                "type": "TEXT"
              }
            ],
            "formId": "test_encounter/testing/testing/uri",
            "viewConfig": {
              "advanced": {
                "hidden": false,
                "readonly": false
              },
              "size": {
                "field": "small",
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
              "tags": [],
              "datasource": {
                "loadRemote": false,
                "loadRemoteUrl": "",
                "terminology": ""
              },
              "field": {
                "input": {
                  "presentation": "textarea",
                  "lines": "6"
                }
              }
            }
          },
          {
            "name": "Uri",
            "localizedName": "Ehr Uri",
            "rmType": "DV_EHR_URI",
            "nodeId": "at0012",
            "min": "1",
            "max": "1",
            "localizedNames": {
              "en": "Uri",
              "sl": "*Uri(en)"
            },
            "localizedDescriptions": {
              "en": "*",
              "sl": "**(en)"
            },
            "aqlPath": "/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0012]/value",
            "inputs": [
              {
                "type": "TEXT"
              }
            ],
            "formId": "test_encounter/testing/testing/uri2",
            "viewConfig": {
              "advanced": {
                "hidden": false,
                "readonly": false
              },
              "size": {
                "field": "small",
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
              "tags": [],
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
          }
        ]
      };

      var deps = [];

      var values = {};

      var rm = parseFormDescription({}, desc, values, deps);
      var ast = rm.getDependencyNode();
      expect(ast instanceof Ast).toBeTruthy();
      ast.process({});
      var tm = rm.findSuccessorWithPath("test_encounter/testing/testing/uri");
      expect(tm.getDependencyNode()).toBeFalsy();
      expect(tm.getViewConfig().isHidden()).toBeFalsy();
      expect(tm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(tm.defaultValue()).toBeNull();
      expect(tm.getPatternValidExample()).toBe('ehr://uri/value');
      var invalidEhrUriVal='//test/uri';
      expect(invalidEhrUriVal.search(tm.getEhrUriPattern())).toBe(-1);
      invalidEhrUriVal='ehr://te st/uri';
      expect(invalidEhrUriVal.search(tm.getEhrUriPattern())).toBe(-1);
      invalidEhrUriVal='ehr://';
      expect(invalidEhrUriVal.search(tm.getEhrUriPattern())).toBe(-1);
      var validEhrUriVal='ehr://test/uri';
      expect(validEhrUriVal.search(tm.getEhrUriPattern())).toBe(0);
      validEhrUriVal='eHr://test/uri';
      expect(validEhrUriVal.search(tm.getEhrUriPattern())).toBe(0);
      expect(tm.ehrUriValue(validEhrUriVal)).toBe(validEhrUriVal);
      expect(tm.getValue()).toBe(validEhrUriVal);
      tm.clearEhrUriValue();
      expect(tm.ehrUriValue()).toBe(null);
      expect(tm.getRmType()).toBe(RmType.DV_EHR_URI);*/

  });

});

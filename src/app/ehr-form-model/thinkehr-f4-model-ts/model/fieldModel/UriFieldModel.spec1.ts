import {
} from '@angular/core/testing';
import {UriFieldModel} from "./UriFieldModel";
import {ThinkEhrModelParser} from "../../parsing/ThinkEhrModelParser";


describe('UriFieldModel', () => {

  it("Dependency - DV_URI ", function () {
    console.log("TODO UriFieldModel.spec.ts dependency for DV_URI");
    /*

    var desc:any = {
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
          "localizedName": "Uri",
          "rmType": "DV_URI",
          "nodeId": "at0012",
          "min": "0",
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
                "presentation": "textfield",
                "lines": "1"
              }
            }
          }
        },
        {
          "name": "Uri",
          "localizedName": "Uri",
          "rmType": "DV_URI",
          "nodeId": "at0012",
          "min": "0",
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

    var rm = ThinkEhrModelParser.parseFormDescription({}, desc, values, deps);
    var ast = rm.getDependencyNode();
    expect(ast instanceof Ast).toBeTruthy();
    ast.process({});
    var tm = rm.findSuccessorWithPath("test_encounter/testing/testing/uri");
    expect(tm.getDependencyNode()).toBeFalsy();
    expect(tm.getViewConfig().isHidden()).toBeFalsy();
    expect(tm.getViewConfig().isReadOnly()).toBeFalsy();
    expect(tm.defaultValue()).toBeNull();
    var newVal = 'NEW Uri Value';
    expect(tm.uriValue(newVal)).toBe(newVal);
    expect(tm.uriValue()).toBe(newVal);
    expect(tm.getValue()).toBe(newVal);
    ast.process({});
    tm.clearUriValue();
    expect(tm.uriValue()).toBe(null);
    expect(tm.getRmType()).toBe(RmType.DV_URI);
*/

  });

});

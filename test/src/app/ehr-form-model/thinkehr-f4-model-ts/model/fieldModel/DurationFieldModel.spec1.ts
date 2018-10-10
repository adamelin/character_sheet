import {
} from '@angular/core/testing';
import {DurationFieldModel} from "./DurationFieldModel";
import {ThinkEhrModelParser} from "../../parsing/ThinkEhrModelParser";
import {ThinkEhrUtil} from "../../ThinkEhrUtil";
import {InputType} from "../../view/InputType";
import {Input} from "../../Input";
import {Field} from "../../view/Field";
import {ViewConfigParser} from "../../parsing/ViewConfigParser";


describe('DurationFieldModel', () => {


  var simpleDesc = {
    "name": "Duration1",
    "localizedName": "Duration1",
    "rmType": "DV_DURATION",
    "nodeId": "at0040",
    "min": 0,
    "max": 1,
    "localizedNames": {
      "en": "Duration1",
      "sl": "Trajanje"
    },
    "localizedDescriptions": {
      "en": "*",
      "sl": "**(en)"
    },
    "aqlPath": "/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0040]/value",
    "inputs": [
      {
        "suffix": "year",
        "type": "INTEGER",
        "validation": {
          "range": {
            "minOp": ">=",
            "min": 0,
            "maxOp": "<=",
            "max": 2
          }
        }
      },
      {
        "suffix": "month",
        "type": "INTEGER",
        "validation": {
          "range": {
            "minOp": ">=",
            "min": 0
          }
        }
      }
    ],
    "formId": "testing_template/context/testing/duration1"
  };

  it("Duration Model - Value Getters and Setters", function () {
    var dm = new DurationFieldModel({formId: "a/b/c"}, new ViewConfigParser());
    var pr = [];
    dm.setValueNodeParentRef(pr);
    expect(dm.durationValue()).toBeNull();
    expect(dm.yearsValue()).toBeNull();
    expect(dm.monthsValue()).toBeNull();
    expect(dm.weeksValue()).toBeNull();
    expect(dm.daysValue()).toBeNull();
    expect(dm.hoursValue()).toBeNull();
    expect(dm.minutesValue()).toBeNull();
    expect(dm.secondsValue()).toBeNull();

    dm.durationValue("P2DT9H56M");
    expect(dm.durationValue()).toBe("P2DT9H56M");
    expect(pr[0]).toBe("P2DT9H56M");
    expect(dm.yearsValue()).toBeNull();
    expect(dm.monthsValue()).toBeNull();
    expect(dm.weeksValue()).toBeNull();
    expect(dm.daysValue()).toBe(2);
    expect(dm.hoursValue()).toBe(9);
    expect(dm.minutesValue()).toBe(56);
    expect(dm.secondsValue()).toBeNull();

    dm.yearsValue(3);
    expect(dm.durationValue()).toBe("P3Y2DT9H56M");
    expect(pr[0]).toBe("P3Y2DT9H56M");
    expect(dm.yearsValue()).toBe(3);
    expect(dm.monthsValue()).toBeNull();
    expect(dm.weeksValue()).toBeNull();
    expect(dm.daysValue()).toBe(2);
    expect(dm.hoursValue()).toBe(9);
    expect(dm.minutesValue()).toBe(56);
    expect(dm.secondsValue()).toBeNull();

    dm.monthsValue(9);
    dm.secondsValue(13);
    expect(dm.durationValue()).toBe("P3Y9M2DT9H56M13S");
    expect(pr[0]).toBe("P3Y9M2DT9H56M13S");
    expect(dm.yearsValue()).toBe(3);
    expect(dm.monthsValue()).toBe(9);
    expect(dm.weeksValue()).toBeNull();
    expect(dm.daysValue()).toBe(2);
    expect(dm.hoursValue()).toBe(9);
    expect(dm.minutesValue()).toBe(56);
    expect(dm.secondsValue()).toBe(13);

    expect(dm.durationValue(null)).toBeNull();
    expect(dm.durationValue()).toBeNull();
    expect(pr[0]).toBeUndefined();
    expect(dm.yearsValue()).toBeNull();
    expect(dm.monthsValue()).toBeNull();
    expect(dm.weeksValue()).toBeNull();
    expect(dm.daysValue()).toBeNull();
    expect(dm.hoursValue()).toBeNull();
    expect(dm.minutesValue()).toBeNull();
    expect(dm.secondsValue()).toBeNull();

    dm.durationValue("PT9M30S");
    expect(dm.durationValue()).toBe("PT9M30S");
    expect(pr[0]).toBe("PT9M30S");
    expect(dm.yearsValue()).toBeNull();
    expect(dm.monthsValue()).toBeNull();
    expect(dm.weeksValue()).toBeNull();
    expect(dm.daysValue()).toBeNull();
    expect(dm.hoursValue()).toBeNull();
    expect(dm.minutesValue()).toBe(9);
    expect(dm.secondsValue()).toBe(30);
    expect(dm.secondsValue(22)).toBe(22);
    expect(dm.secondsValue()).toBe(22);
    expect(dm.secondsValue(0)).toBe(0);
    expect(dm.secondsValue()).toBe(0);
    expect(dm.secondsValue(null)).toBe(null);
    expect(dm.secondsValue()).toBe(null);

    dm.clearValue();
    expect(dm.durationValue()).toBeNull();
    expect(pr[0]).toBeUndefined();
    expect(dm.yearsValue()).toBeNull();
    expect(dm.monthsValue()).toBeNull();
    expect(dm.monthsValue(2)).toBe(2);
    expect(dm.monthsValue()).toBe(2);
    expect(dm.weeksValue()).toBeNull();
    expect(dm.daysValue()).toBeNull();
    expect(dm.hoursValue()).toBeNull();
    expect(dm.minutesValue()).toBeNull();
    expect(dm.secondsValue()).toBeNull();
  });

  it("Duration Model - Value Getters and Setters Multi", function () {
    var dm = new DurationFieldModel({formId: "c"}, new ViewConfigParser());
    dm.isMulti = function () {
      return true;
    };
    var pr = {c:[]};
    dm.setValueNodeParentRef(pr);
    expect(dm.isMulti()).toBe(true);
    expect(dm.durationValue().length).toBe(0);
    expect(dm.yearsValue()).toBeNull();
    expect(dm.monthsValue()).toBeNull();
    expect(dm.weeksValue()).toBeNull();
    expect(dm.daysValue()).toBeNull();
    expect(dm.hoursValue()).toBeNull();
    expect(dm.minutesValue()).toBeNull();
    expect(dm.secondsValue()).toBeNull();

    dm.durationValue("P2DT9H56M");
    expect(dm.durationValue().length).toBe(1);
    expect(dm.durationValue()[0]).toBe("P2DT9H56M");
    expect(pr.c[0]).toBe("P2DT9H56M");
    expect(dm.yearsValue()).toBeNull();
    expect(dm.monthsValue()).toBeNull();
    expect(dm.weeksValue()).toBeNull();
    expect(dm.daysValue()).toBe(2);
    expect(dm.hoursValue()).toBe(9);
    expect(dm.minutesValue()).toBe(56);
    expect(dm.secondsValue()).toBeNull();

    dm.yearsValue(3);
    expect(dm.durationValue().length).toBe(1);
    expect(dm.durationValue()[0]).toBe("P3Y2DT9H56M");
    expect(pr.c[0]).toBe("P3Y2DT9H56M");
    expect(dm.yearsValue()).toBe(3);
    expect(dm.monthsValue()).toBeNull();
    expect(dm.weeksValue()).toBeNull();
    expect(dm.daysValue()).toBe(2);
    expect(dm.hoursValue()).toBe(9);
    expect(dm.minutesValue()).toBe(56);
    expect(dm.secondsValue()).toBeNull();

    dm.monthsValue(9);
    dm.secondsValue(13);
    expect(dm.durationValue()[0]).toBe("P3Y9M2DT9H56M13S");
    expect(pr.c[0]).toBe("P3Y9M2DT9H56M13S");
    expect(dm.yearsValue()).toBe(3);
    expect(dm.monthsValue()).toBe(9);
    expect(dm.weeksValue()).toBeNull();
    expect(dm.daysValue()).toBe(2);
    expect(dm.hoursValue()).toBe(9);
    expect(dm.minutesValue()).toBe(56);
    expect(dm.secondsValue()).toBe(13);

    expect(dm.durationValue().length).toBe(1);
    expect(dm.durationValue(null).length).toBe(0);
    expect(pr.c[0]).toBeUndefined();
    expect(dm.yearsValue()).toBeNull();
    expect(dm.monthsValue()).toBeNull();
    expect(dm.weeksValue()).toBeNull();
    expect(dm.daysValue()).toBeNull();
    expect(dm.hoursValue()).toBeNull();
    expect(dm.minutesValue()).toBeNull();
    expect(dm.secondsValue()).toBeNull();

    dm.durationValue("PT9M30S");
    expect(dm.durationValue().length).toBe(1);
    expect(dm.durationValue()[0]).toBe("PT9M30S");
    expect(pr.c[0]).toBe("PT9M30S");
    expect(dm.yearsValue()).toBeNull();
    expect(dm.monthsValue()).toBeNull();
    expect(dm.weeksValue()).toBeNull();
    expect(dm.daysValue()).toBeNull();
    expect(dm.hoursValue()).toBeNull();
    expect(dm.minutesValue()).toBe(9);
    expect(dm.secondsValue()).toBe(30);
    expect(dm.secondsValue(22)).toBe(22);
    expect(dm.secondsValue()).toBe(22);
    expect(dm.secondsValue(0)).toBe(0);
    expect(dm.secondsValue()).toBe(0);
    expect(dm.secondsValue(null)).toBe(null);
    expect(dm.secondsValue()).toBe(null);

    dm.clearValue();
    expect(dm.durationValue().length).toBe(0);
    expect(pr.c[0]).toBeUndefined();
    expect(dm.yearsValue()).toBeNull();
    expect(dm.monthsValue()).toBeNull();
    expect(dm.weeksValue()).toBeNull();
    expect(dm.daysValue()).toBeNull();
    expect(dm.hoursValue(3)).toBe(3);
    expect(dm.hoursValue()).toBe(3);
    expect(dm.hoursValue(4,0)).toBe(4);
    expect(dm.hoursValue(undefined,0)).toBe(4);
    expect(dm.hoursValue()).toBe(4);
    expect(dm.minutesValue()).toBeNull();
    expect(dm.secondsValue()).toBeNull();

    dm.durationValue("P3Y9M2DT9H56M13S",1);
    expect(dm.secondsValue(undefined,1)).toBe(13);
    expect(dm.secondsValue(11,1)).toBe(11);
    expect(dm.secondsValue(undefined,1)).toBe(11);
    expect(dm.hoursValue(undefined,1)).toBe(9);
    expect(dm.hoursValue(99,1)).toBe(99);

    expect(dm.hoursValue(undefined,0)).toBe(4);
    expect(dm.hoursValue()).toBe(4);

    expect(dm.durationValue(undefined, undefined).length).toBe(2);
    expect(dm.durationValue().length).toBe(2);
    expect(dm.durationValue()[0]).toBe("PT4H");
    expect(dm.durationValue()[1]).toBe("P3Y9M2DT99H56M11S");

    dm.clearDurationValue();
    expect(dm.durationValue().length).toBe(0);
    dm.setValue('PT9M30S');
    expect(dm.getValue().length).toBe(1);
    expect(dm.durationValue().length).toBe(1);
    expect(dm.secondsValue()).toBe(30);
    dm.setValue(['P3Y9M2DT99H56M11S', 'PT9M30S']);
    expect(dm.getValue().length).toBe(2);
    expect(dm.durationValue().length).toBe(2);
    expect(dm.secondsValue()).toBe(11);
    expect(dm.secondsValue(undefined,1)).toBe(30);
    dm.applyValue(10, 'second');
    expect(dm.secondsValue(undefined,0)).toBe(10);
    dm.applyValue(12, 'second',1);
    expect(dm.secondsValue(undefined,1)).toBe(12);
    expect(dm.secondsValue(undefined,0)).toBe(10);
    dm.applyValue(44, 'hour', 1);
    expect(dm.hoursValue(undefined,1)).toBe(44);

  });

  it("Duration Model Parsing", function () {

    var dm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescriptionSnippet(simpleDesc, {}) as DurationFieldModel;
    expect(dm instanceof DurationFieldModel).toBeTruthy();
    expect(dm.getName()).toBe("Duration1");
    expect(dm.getLocalizedName("sl")).toBe("Trajanje");
    expect(dm.getLocalizedName("ro")).toBeNull();
    expect(dm.labelFor("sl")).toBe("Trajanje");
    expect(dm.labelFor("ro")).toBe("Duration1");
    expect(dm.getPath()).toBe("testing_template/context/testing/duration1");
    expect(dm.columns()).toBe(2);
    expect(dm.isFieldDisabled("minute")).toBeFalsy();
    expect(dm.isFieldDisabled("second")).toBeFalsy();

    expect(ThinkEhrUtil.isArray(dm.getInputs())).toBeTruthy();
    expect(dm.getInputs().length).toBe(2);

    var yi:Input = dm.getInputFor("year");
    expect(yi).toBeTruthy();
    expect(yi.getSuffix()).toBe("year");
    expect(yi.getType()).toBe(InputType.INTEGER);
    expect(yi.getValidation()).toBeTruthy();
    expect(yi.getValidation()['range']).toBeTruthy();
    expect(yi.getValidation()['range'].min).toBe(0);
    expect(yi.getValidation()['range'].max).toBe(2);

    var mi = dm.getInputFor("month");
    expect(mi).toBeTruthy();
    expect(mi.getSuffix()).toBe("month");
    expect(mi.getType()).toBe(InputType.INTEGER);
    expect(mi.getValidation()).toBeTruthy();
    expect(mi.getValidation()['range']).toBeTruthy();
    expect(mi.getValidation()['range'].min).toBe(0);
    expect(mi.getValidation()['range'].minOp).toBe(">=");
    expect(mi.getValidation()['range'].max).toBeUndefined();
  });


  it("Duration Model Parsing - With Values", function () {

    var desc = simpleDesc;

    var values = {
      "testing_template": {

        "context": [
          {
            "testing": [
              {
                "duration1": [
                  "P1DT7H35M"
                ]
              }
            ]
          }
        ]
      }
    };

    var dm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescriptionSnippet(desc, values) as DurationFieldModel;
    expect(dm instanceof DurationFieldModel).toBeTruthy();
    expect(dm.columns()).toBe(2);
    expect(dm.isFieldDisabled("minute")).toBeFalsy();
    expect(dm.isFieldDisabled("second")).toBeFalsy();

    var yi = dm.getInputFor("year");
    expect(yi).toBeTruthy();

    var mi = dm.getInputFor("month");
    expect(mi).toBeTruthy();

    expect(dm.durationValue()).toBe("P1DT7H35M");
    expect(dm.yearsValue()).toBeNull();
    expect(dm.monthsValue()).toBeNull();
    expect(dm.weeksValue()).toBeNull();
    expect(dm.daysValue()).toBe(1);
    expect(dm.hoursValue()).toBe(7);
    expect(dm.minutesValue()).toBe(35);
    expect(dm.secondsValue()).toBeNull();

    expect(dm.durationValue("P1W")).toBe("P1W");
    expect(dm.durationValue()).toBe("P1W");
    expect(dm.yearsValue()).toBeNull();
    expect(dm.monthsValue()).toBeNull();
    expect(dm.weeksValue()).toBe(1);
    expect(dm.daysValue()).toBeNull();
    expect(dm.hoursValue()).toBeNull();
    expect(dm.minutesValue()).toBeNull();
    expect(dm.secondsValue()).toBeNull();
  });

  it("Duration Model Parsing - Complex - Default Values", function () {

    var desc:any = {
      "name": "Duration2",
      "localizedName": "Duration2",
      "rmType": "DV_DURATION",
      "nodeId": "at0041",
      "min": "0",
      "max": "1",
      "localizedNames": {
        "en": "Duration2",
        "sl": "*Duration2(en)"
      },
      "localizedDescriptions": {
        "en": "*",
        "sl": "**(en)"
      },
      "aqlPath": "/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0041]/value",
      "inputs": [
        {
          "suffix": "year",
          "type": "INTEGER",
          "validation": {
            "range": {
              "minOp": ">=",
              "min": 0,
              "maxOp": "<=",
              "max": 1
            }
          },
          "defaultValue": 1
        },
        {
          "suffix": "month",
          "type": "INTEGER",
          "validation": {
            "range": {
              "minOp": ">=",
              "min": 0
            }
          },
          "defaultValue": 0
        },
        {
          "suffix": "day",
          "type": "INTEGER",
          "validation": {
            "range": {
              "minOp": ">=",
              "min": 0
            }
          },
          "defaultValue": 0
        },
        {
          "suffix": "week",
          "type": "INTEGER",
          "validation": {
            "range": {
              "minOp": ">=",
              "min": 0
            }
          },
          "defaultValue": 3
        },
        {
          "suffix": "hour",
          "type": "INTEGER",
          "validation": {
            "range": {
              "minOp": ">",
              "min": 1,
              "max": 10000,
              "maxOp": "<"
            }
          },
          "defaultValue": 17
        },
        {
          "suffix": "minute",
          "type": "INTEGER",
          "validation": {
            "range": {
              "minOp": ">=",
              "min": 0
            }
          },
          "defaultValue": 35
        },
        {
          "suffix": "second",
          "type": "INTEGER",
          "validation": {
            "range": {
              "minOp": ">=",
              "min": 0
            }
          },
          "defaultValue": 0
        }
      ],
      "formId": "testing_template/context/testing/duration2",
      "viewConfig": {
        "advanced": {
          "hidden": true,
          "readonly": false
        },
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
        "tags": [],
        "datasource": {
          "loadRemote": false,
          "loadRemoteUrl": "",
          "terminology": ""
        },
        "field": {
          "second": {
            "disabled": true
          },
          "minute": {
            "hidden": true
          },
          "columns": "4"
        }
      }
    };

    var dm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescriptionSnippet(desc, {}) as DurationFieldModel;
    expect(dm instanceof DurationFieldModel).toBeTruthy();
    expect(dm.getInputs().length).toBe(7);

    expect(dm.getViewConfig().isReadOnly()).toBeFalsy();
    expect(dm.getViewConfig().isHidden()).toBeTruthy();
    var sf:Field = dm.getViewConfig().getFields("second");
    expect(sf).toBeTruthy();
    expect(sf.disabled).toBe(true);
    expect(dm.columns()).toBe(7);
    expect(dm.isFieldDisabled("minute")).toBeFalsy();
    expect(dm.isFieldHidden("minute")).toBeTruthy();
    expect(dm.isFieldDisabled("second")).toBeTruthy();
    expect(dm.isFieldHidden("second")).toBeFalsy();

    expect(dm.durationValue()).toBe("P1Y3WT17H35M");

    expect(dm.yearsValue()).toBe(1);
    expect(dm.monthsValue()).toBeNull();
    expect(dm.weeksValue()).toBe(3);
    expect(dm.daysValue()).toBeNull();
    expect(dm.hoursValue()).toBe(17);
    expect(dm.minutesValue()).toBe(35);
    expect(dm.secondsValue()).toBeNull();

    dm.clearValue();
    expect(dm.durationValue()).toBeNull();
    expect(dm.yearsValue()).toBeNull();
    expect(dm.monthsValue()).toBeNull();
    expect(dm.weeksValue()).toBeNull();
    expect(dm.daysValue()).toBeNull();
    expect(dm.hoursValue()).toBeNull();
    expect(dm.minutesValue()).toBeNull();
    expect(dm.secondsValue()).toBeNull();

  });

});

import {
  inject,
} from '@angular/core/testing';
import {ThinkEhrModelParser} from "../parsing/ThinkEhrModelParser";
import {RmContainerModel} from "./RmContainerModel";
import {FieldSize} from "../view/FieldSize";
import {ViewConfigParser} from "../parsing/ViewConfigParser";
import {ViewConfig} from "../view/ViewConfig";
import {LabelSize} from "../view/LabelSize";
import {FormRootModel} from "./FormRootModel";
import {Layout} from "../view/Layout";
import {NodeModel} from "./NodeModel";
import {FieldHorizontalAlignment} from "../view/FieldHorizontalAlignment";
import {FieldVerticalAlignment} from "../view/FieldVerticalAlignment";
import {LabelHorizontalAlignment} from "../view/LabelHorizontalAlignment";
import {LabelVerticalAlignment} from "../view/LabelVerticalAlignment";
import {Label} from "../view/Label";
import {Field} from "../view/Field";
import {FieldPresentation} from "../view/FieldPresentation";
import {ThinkEhrUtil} from "../ThinkEhrUtil";
import {Model} from "./Model";
import {RmType} from "../RmType";
import {Size} from "../view/Size";
import {GenericFieldsetModel} from "./GenericFieldsetModel";
import {QuantityFieldModel} from "./fieldModel/QuantityFieldModel";
import {InputType} from "../view/InputType";
import {Input} from "../Input";
import {InputItem} from "../InputItem";
import {Validation} from "../Validation";
import {CodedTextFieldModel} from "./fieldModel/CodedTextFieldModel";
import {TextFieldModel} from "./fieldModel/TextFieldModel";
import {ProportionFieldModel} from "./fieldModel/ProportionFieldModel";
import {BooleanFieldModel} from "./BooleanFieldModel";
import {DateFieldModel} from "./fieldModel/DateFieldModel";
import {TimeFieldModel} from "./fieldModel/TimeFieldModel";
import {DateTimeFieldModel} from "./fieldModel/DateTimeFieldModel";
import {OrdinalFieldModel} from "./fieldModel/OrdinalFieldModel";
import {rmTypeModelDictionary} from "./rmTypeModelDictonary";

describe('ThinkEhr Forms 4 Model Testing Suite', () => {
  //let builder: TestComponentBuilder;
  let originalTimeout:number;

  beforeEach(inject([], function () {
    (new ThinkEhrModelParser(rmTypeModelDictionary) );
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  }));

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it("Parent Child Relationship", function () {
    var parent = new Model({type: "parent"});
    expect(parent.getChildModels().length).toBe(0);
    expect(parent.getParentModel()).toBeUndefined();
    expect(parent['type']).toBe("parent");

    var child1 = new Model({type: "child1"});
    parent.addChildModel(child1);
    var child2 = new Model({type: "child2"});
    parent.addChildModel(child2);

    expect(parent.getChildCount()).toBe(2);
    expect(parent.getChildModel(0)).toBe(child1);
    expect(parent.getChildModel(1)).toBe(child2);
    expect(parent.getParentModel()).toBeUndefined();
    expect(parent.getChildModel(0).getParentModel()).toBe(parent);
    expect(parent.getChildModel(0)['type']).toBe("child1");
    expect(parent.getChildModel(1)['type']).toBe("child2");
    expect(parent.getChildModel(1).getParentModel()).toBe(parent);
    expect(parent.getChildModel(0).getChildCount()).toBe(0);
    expect(parent.getChildModel(1).getChildCount()).toBe(0);
  });

  it("Form Root Model Instantiation", function () {
    var frm = new FormRootModel({formId: "a/b/c", name: "Form root"});
    expect(frm.getRmType()).toBe(RmType.FORM_DEFINITION);
    expect(frm.toString()).toBe("FormRootModel/Form root/FORM_DEFINITION");
    expect(frm.getFormId()).toBe("a/b/c");
    expect(frm.getPath()).toBe(frm.getFormId());
    expect(frm.getName()).toBe("Form root");

    var frm2 = new FormRootModel();
    expect(frm2.getFormId()).toBeUndefined();
    expect(frm2.getName()).toBeUndefined();
  });

  it("ViewConfig Plain Properties", function () {
    var vcPlain = (new ViewConfigParser()).parseViewConfig({
      "label": {
        "custom": false,
        "value": "",
        "useLocalizations": false,
        "localizationsList": {}
      },
      "size": {
        "field": "inherit",
        "label": "inherit"
      }
    });

    expect(vcPlain instanceof ViewConfig).toBeTruthy();
    expect(vcPlain.getLabel()).toBe(vcPlain.label);
    expect(vcPlain.getSize().field).toBe(FieldSize.INHERIT);
  });

  it("ViewConfig Size Hierarchy", function () {
    var topSize = new Size({
      field: FieldSize.LARGE,
      label: LabelSize.INHERIT
    }, new ViewConfigParser());
    var topVc = (new ViewConfigParser()).parseViewConfig({size: topSize});
    topSize.setViewConfig(topVc);
    var fm1 = new FormRootModel({viewConfig: topVc, name: "1"});
    topVc.setModel(fm1);

    var middleVc = new ViewConfig();
    var fm2 = new NodeModel({viewConfig: middleVc, name: "2"}, new ViewConfigParser());
    fm1.addChildModel(fm2);
    middleVc.setModel(fm2);

    var bottomSize = new Size({
      field: FieldSize.INHERIT
    }, new ViewConfigParser());
    var bottomVc = (new ViewConfigParser()).parseViewConfig({size: bottomSize});
    bottomSize.setViewConfig(bottomVc);
    var fm3 = new NodeModel({viewConfig: bottomVc, name: "3"}, new ViewConfigParser());
    fm2.addChildModel(fm3);
    bottomVc.setModel(fm3);

    var bsActual = bottomVc.getSize().getField();
    expect(bsActual).toBe(FieldSize.LARGE);
    var lsActual = bottomVc.getSize().getLabel();
    expect(lsActual).toBe(LabelSize.INHERIT);
    var belowBottomSize = new Size({
      field: FieldSize.SMALL,
      label: "3" // not enum value
    }, new ViewConfigParser());
    var belowBottomVc = (new ViewConfigParser()).parseViewConfig({
      size: belowBottomSize,
      parent: bottomVc
    });
    belowBottomSize.setViewConfig(belowBottomVc);
    expect(belowBottomSize.getViewConfig()).toBe(belowBottomVc);
    expect(belowBottomSize.getLabel()).toBe(LabelSize[LabelSize.COLUMN_3]);
    var fm4 = new NodeModel({viewConfig: belowBottomVc, name: "4"}, new ViewConfigParser());
    fm3.addChildModel(fm4);
    belowBottomVc.setModel(fm4);

    var bbsActual = belowBottomVc.getSize().getField();
    expect(bbsActual).toBe(FieldSize.SMALL);
    var blsActual = belowBottomVc.getSize().getLabel();
    //expect(blsActual).toBe("3"); - old test - now enum does not find value so it's going to ancestors
    expect(blsActual).toBe(LabelSize.COLUMN_3);
  });

  it("Generic Fieldset Model", function () {
    var gfsPlain1:any = {
      "localizedName": "Fieldset",
      "localizedNames": {
        "en": "Fieldset",
        "sl": "Polje polj"
      },
      "min": 0,
      "max": -1,
      "name": "Fieldset",
      "rmType": "GENERIC_FIELDSET",
      "formId": "generic-field-74276",
      "viewConfig": {},
      "children": []
    };
    var gfs1 = new GenericFieldsetModel(gfsPlain1);
    expect(gfs1 instanceof GenericFieldsetModel).toBeTruthy();
    expect(gfs1.getRmType()).toBe(RmType.GENERIC_FIELDSET);
    expect(gfs1.getName()).toBe("Fieldset");
    expect(gfs1.getLocalizedName()).toBe("Fieldset");
    expect(gfs1.getLocalizedName("en")).toBe("Fieldset");
    expect(gfs1.getLocalizedName("sl")).toBe("Polje polj");
    expect(gfs1.getLocalizedName("no")).toBeNull();
    expect(gfs1.getFormId()).toBe("generic-field-74276");
    expect(gfs1.getMin()).toBe(0);
    expect(gfs1.getMax()).toBe(-1);
    expect(gfs1.isMulti()).toBeFalsy();
    /*/// old
     expect(gfs1['children']).toBe(gfsPlain1.children); // These were unparsed
     expect(gfs1.viewConfig).toBe(gfsPlain1.viewConfig);*/
    expect(gfs1['children']).toBeUndefined();
    expect(gfs1.viewConfig instanceof ViewConfig).toBe(true);
  });

  it("Quantity Field Model - Single Multi", function () {
    var qmPlain:any = {
      "name": "Temperature",
      "localizedName": "Temperature",
      "rmType": "DV_QUANTITY",
      "nodeId": "at0004",
      "min": 0,
      "max": 1,
      "localizedNames": {
        "sl": "Telesna temperatura",
        "en": "Temperature"
      },
      "aqlPath": "/content[openEHR-EHR-SECTION.ispek_dialog.v1,'Vitals']/items[openEHR-EHR-OBSERVATION.body_temperature-zn.v1]/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value",
      "inputs": [
        {
          "suffix": "magnitude",
          "type": "DECIMAL",
          "defaultValue": "99"
        },
        {
          "suffix": "unit",
          "type": "CODED_TEXT",
          "list": [
            {
              "value": "°C",
              "label": "°C",
              "validation": {
                "precision": {
                  "min": 1,
                  "max": 1
                }
              }
            },
            {
              "value": "°F",
              "label": "°F",
              "validation": {
                "precision": {
                  "min": 1,
                  "max": 2
                }
              }
            }
          ]
        }
      ],
      "formId": "vitals/vitals/body_temperature/any_event/temperature",
      "viewConfig": {
        "field": {
          "unit": {
            "presentation": "combobox"
          }
        },
        "advanced": {
          "hidden": false,
          "readonly": false
        },
        "multiplicity": {
          "min": "0",
          "max": "1"
        }
      }
    };

    var qfm = new QuantityFieldModel(qmPlain);
    qfm.setViewConfig((new ViewConfigParser() ).parseViewConfig(qmPlain.viewConfig));

    var magnitudeInput = new Input({
      suffix: qmPlain.inputs[0].suffix,
      type: InputType[qmPlain.inputs[0].type],
      defaultValue: qmPlain.inputs[0].defaultValue
    });

    var unitInput = new Input({
      suffix: qmPlain.inputs[1].suffix,
      type: InputType[qmPlain.inputs[1].type]
    });
    var list = [];
    for (var i = 0; i < qmPlain.inputs[1].list.length; i++) {
      var iiPlain = qmPlain.inputs[1].list[i];
      var ii:InputItem = new InputItem(iiPlain);
      if (iiPlain.validation) {
        ii.setValidation(new Validation(iiPlain.validation));
      }
      if (iiPlain.defaultValue) {
        ii['setDefaultValue'](iiPlain.defaultValue);
      }
      list.push(ii);
    }
    unitInput.setList(list);

    qfm.getTags().push('multi');
    qfm.setMin(1);
    qfm.setMax(100);
    qfm.setInputs([magnitudeInput, unitInput]);
    qfm.setValueNodeParentRef([]);

    expect(qfm.getRmType()).toBe(RmType.DV_QUANTITY);
    expect(qfm.getName()).toBe("Temperature");
    expect(qfm.getLocalizedName()).toBe("Temperature");
    expect(qfm.getLocalizedName("sl")).toBe("Telesna temperatura");
    expect(qfm.getLocalizedName("en")).toBe("Temperature");
    expect(qfm.getLocalizedName("ru")).toBeNull();
    expect(qfm.getMin()).toBe(1);
    expect(qfm.getMax()).toBe(100);
    expect(qfm.isMulti()).toBeTruthy();
    expect(qfm.getNodeId()).toBe("at0004");
    expect(qfm.getAqlPath()).toBe("/content[openEHR-EHR-SECTION.ispek_dialog.v1,'Vitals']/items[openEHR-EHR-OBSERVATION.body_temperature-zn.v1]/" +
      "data[at0002]/events[at0003]/data[at0001]/items[at0004]/value");
    expect(qfm.getFormId()).toBe("vitals/vitals/body_temperature/any_event/temperature");

    expect(qfm.getViewConfig() instanceof ViewConfig).toBeTruthy();
    expect(qfm.getViewConfig().getFields() instanceof Field).toBeTruthy();
    expect(qfm.getViewConfig().getFields("unit").getPresentation()).toBe(FieldPresentation.COMBOBOX);
    expect(qfm.getViewConfig().isHidden()).toBeFalsy();
    expect(qfm.getViewConfig().isReadOnly()).toBeFalsy();
    expect(qfm.getViewConfig()['advanced']).toEqual({});
    expect(qfm.getViewConfig().getMin()).toBe(0);
    expect(qfm.getViewConfig().getMax()).toBe(1);
    expect(qfm.getViewConfig()['multiplicity']).toBeUndefined();

    expect(qfm.getInputs().length).toBe(2);
    expect(qfm.getInput(0) instanceof Input).toBeTruthy();
    expect(qfm.getInput(0).getSuffix()).toBe("magnitude");
    expect(qfm.getInput(0).getType()).toBe(InputType.DECIMAL);
    expect(qfm.getInput(0).getList().length).toBe(0);
    expect(qfm.getInput(1) instanceof Input).toBeTruthy();
    expect(qfm.getInput(1).getSuffix()).toBe("unit");
    expect(qfm.getInput(1).getType()).toBe(InputType.CODED_TEXT);
    expect(qfm.getInput(1).getList().length).toBe(2);
    expect(qfm.getInput(1).getItem(0) instanceof InputItem).toBeTruthy();
    expect(qfm.getInput(1).getItem(0).getValue()).toBe("°C");
    expect(qfm.getInput(1).getItem(0).getLabel()).toBe("°C");
    expect(qfm.getInput(1).getItem(0).getValidation() instanceof Validation).toBeTruthy();
    expect(qfm.getInput(1).getItem(0).getValidation().getPrecision().min).toBe(1);
    expect(qfm.getInput(1).getItem(0).getValidation().getPrecision().max).toBe(1);
    expect(qfm.getPrecisionForUnit("°C").min).toBe(1);
    expect(qfm.getPrecisionForUnit("°C").max).toBe(1);
    expect(qfm.getInput(1).getItem(1) instanceof InputItem).toBeTruthy();
    expect(qfm.getInput(1).getItem(1).getValue()).toBe("°F");
    expect(qfm.getInput(1).getItem(1).getLabel()).toBe("°F");
    expect(qfm.getInput(1).getItem(1).getValidation() instanceof Validation).toBeTruthy();
    expect(qfm.getInput(1).getItem(1).getValidation().getPrecision().min).toBe(1);
    expect(qfm.getInput(1).getItem(1).getValidation().getPrecision().max).toBe(2);
    expect(qfm.getPrecisionForUnit("°F").min).toBe(1);
    expect(qfm.getPrecisionForUnit("°F").max).toBe(2);
    expect(qfm.getPrecisionForUnit("K")).toBeNull();

    var val = {
      "|magnitude": 30.0,
      "|unit": "°C"
    };
    expect(qfm.magnitudeValue()[0]).toBe(99);
    expect(qfm.magnitudeValue(undefined, undefined)[0]).toBe(99);
    expect(qfm.magnitudeValue(undefined, 0)).toBe(99);
    qfm.setValueProp(val);
    expect(qfm.magnitudeValue()[0]).toBe(30);
    qfm.magnitudeValue(22, 1);
    expect(qfm.magnitudeValue(undefined, 1)).toBe(22);
    qfm.magnitudeValue();
    qfm.magnitudeValue(null, 1);
    expect(qfm.magnitudeValue(undefined, 1)).toBe(null);

    expect(qfm.unitValue()[0]).toBe("°C");
    expect(qfm.unitValue(undefined, undefined)[0]).toBe("°C");
    expect(qfm.unitValue(undefined, 0)).toBe("°C");
    qfm.unitValue("°F", 1);

    expect(qfm.unitValue(undefined, 1)).toBe("°F");

    expect(qfm.getPrecisionForUnit(qfm.unitValue(undefined, 0)).min).toBe(1);
    expect(qfm.getPrecisionForUnit(qfm.unitValue()[0]).min).toBe(1);
    expect(qfm.getPrecisionForUnit(qfm.unitValue(undefined, 0)).max).toBe(1);

    expect(qfm.getPrecisionForUnit(qfm.unitValue(undefined, 1)).min).toBe(1);
    expect(qfm.getPrecisionForUnit(qfm.unitValue(undefined, 1)).max).toBe(2);

    expect(qfm.getPrecisionForUnit(0).min).toBe(1);
    expect(qfm.getPrecisionForUnit(0).max).toBe(1);
    expect(qfm.getPrecisionForUnit(1).min).toBe(1);
    expect(qfm.getPrecisionForUnit(1).max).toBe(2);

    qfm.unitValue("°F", 0);
    expect(qfm.unitValue(undefined, 0)).toBe("°F");
    expect(qfm.unitValue(undefined, undefined)[0]).toBe("°F");
    expect(qfm.unitValue()[0]).toBe("°F");

    qfm.unitValue("°C", 1);
    expect(qfm.unitValue(undefined, 0)).toBe("°F");
    expect(qfm.unitValue(undefined, 1)).toBe("°C");

  });

  it("Quantity Field Model", function () {
    var qmPlain:any = {
      "name": "Temperature",
      "localizedName": "Temperature",
      "rmType": "DV_QUANTITY",
      "nodeId": "at0004",
      "min": 0,
      "max": 1,
      "localizedNames": {
        "sl": "Telesna temperatura",
        "en": "Temperature"
      },
      "aqlPath": "/content[openEHR-EHR-SECTION.ispek_dialog.v1,'Vitals']/items[openEHR-EHR-OBSERVATION.body_temperature-zn.v1]/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value",
      "inputs": [
        {
          "suffix": "magnitude",
          "type": "DECIMAL"
        },
        {
          "suffix": "unit",
          "type": "CODED_TEXT",
          "list": [
            {
              "value": "°C",
              "label": "°C",
              "validation": {
                "precision": {
                  "min": 1,
                  "max": 1
                }
              }
            },
            {
              "value": "°F",
              "label": "°F",
              "validation": {
                "precision": {
                  "min": 1,
                  "max": 2
                }
              }
            }
          ]
        }
      ],
      "formId": "vitals/vitals/body_temperature/any_event/temperature",
      "viewConfig": {
        "field": {
          "unit": {
            "presentation": "combobox"
          }
        },
        "advanced": {
          "hidden": false,
          "readonly": false
        },
        "multiplicity": {
          "min": "0",
          "max": "1"
        }
      }
    };

    var qfm = new QuantityFieldModel(qmPlain);
    qfm.setViewConfig((new ViewConfigParser() ).parseViewConfig(qmPlain.viewConfig));

    var magnitudeInput = new Input({
      suffix: qmPlain.inputs[0].suffix,
      type: InputType[qmPlain.inputs[0].type]
    });

    var unitInput = new Input({
      suffix: qmPlain.inputs[1].suffix,
      type: InputType[qmPlain.inputs[1].type]
    });
    var list = [];
    for (var i = 0; i < qmPlain.inputs[1].list.length; i++) {
      var iiPlain = qmPlain.inputs[1].list[i];
      var ii = new InputItem(iiPlain);
      if (iiPlain.validation) {
        ii.setValidation(new Validation(iiPlain.validation));
      }
      list.push(ii);
    }
    unitInput.setList(list);

    qfm.setInputs([magnitudeInput, unitInput]);

    qfm.setValueNodeParentRef([]);

    expect(qfm.getRmType()).toBe(RmType.DV_QUANTITY);
    expect(qfm.getName()).toBe("Temperature");
    expect(qfm.getLocalizedName()).toBe("Temperature");
    expect(qfm.getLocalizedName("sl")).toBe("Telesna temperatura");
    expect(qfm.getLocalizedName("en")).toBe("Temperature");
    expect(qfm.getLocalizedName("ru")).toBeNull();
    expect(qfm.getMin()).toBe(0);
    expect(qfm.getMax()).toBe(1);
    expect(qfm.isMulti()).toBeFalsy();
    expect(qfm.getNodeId()).toBe("at0004");
    expect(qfm.getAqlPath()).toBe("/content[openEHR-EHR-SECTION.ispek_dialog.v1,'Vitals']/items[openEHR-EHR-OBSERVATION.body_temperature-zn.v1]/" +
      "data[at0002]/events[at0003]/data[at0001]/items[at0004]/value");
    expect(qfm.getFormId()).toBe("vitals/vitals/body_temperature/any_event/temperature");

    expect(qfm.getViewConfig() instanceof ViewConfig).toBeTruthy();
    expect(qfm.getViewConfig().getFields() instanceof Field).toBeTruthy();
    expect(qfm.getViewConfig().getFields("unit").getPresentation()).toBe(FieldPresentation.COMBOBOX);
    expect(qfm.getViewConfig().isHidden()).toBeFalsy();
    expect(qfm.getViewConfig().isReadOnly()).toBeFalsy();
    expect(qfm.getViewConfig()['advanced']).toEqual({});
    expect(qfm.getViewConfig().getMin()).toBe(0);
    expect(qfm.getViewConfig().getMax()).toBe(1);
    expect(qfm.getViewConfig()['multiplicity']).toBeUndefined();

    expect(qfm.getInputs().length).toBe(2);
    expect(qfm.getInput(0) instanceof Input).toBeTruthy();
    expect(qfm.getInput(0).getSuffix()).toBe("magnitude");
    expect(qfm.getInput(0).getType()).toBe(InputType.DECIMAL);
    expect(qfm.getInput(0).getList().length).toBe(0);
    expect(qfm.getInput(1) instanceof Input).toBeTruthy();
    expect(qfm.getInput(1).getSuffix()).toBe("unit");
    expect(qfm.getInput(1).getType()).toBe(InputType.CODED_TEXT);
    expect(qfm.getInput(1).getList().length).toBe(2);
    expect(qfm.getInput(1).getItem(0) instanceof InputItem).toBeTruthy();
    expect(qfm.getInput(1).getItem(0).getValue()).toBe("°C");
    expect(qfm.getInput(1).getItem(0).getLabel()).toBe("°C");
    expect(qfm.getInput(1).getItem(0).getValidation() instanceof Validation).toBeTruthy();
    expect(qfm.getInput(1).getItem(0).getValidation().getPrecision().min).toBe(1);
    expect(qfm.getInput(1).getItem(0).getValidation().getPrecision().max).toBe(1);
    expect(qfm.getPrecisionForUnit("°C").min).toBe(1);
    expect(qfm.getPrecisionForUnit("°C").max).toBe(1);
    expect(qfm.getInput(1).getItem(1) instanceof InputItem).toBeTruthy();
    expect(qfm.getInput(1).getItem(1).getValue()).toBe("°F");
    expect(qfm.getInput(1).getItem(1).getLabel()).toBe("°F");
    expect(qfm.getInput(1).getItem(1).getValidation() instanceof Validation).toBeTruthy();
    expect(qfm.getInput(1).getItem(1).getValidation().getPrecision().min).toBe(1);
    expect(qfm.getInput(1).getItem(1).getValidation().getPrecision().max).toBe(2);
    expect(qfm.getPrecisionForUnit("°F").min).toBe(1);
    expect(qfm.getPrecisionForUnit("°F").max).toBe(2);
    expect(qfm.getPrecisionForUnit("K")).toBeNull();

    var val = {
      "|magnitude": 30.0,
      "|unit": "°C"
    };

    qfm.setValue(val);
    expect(qfm.unitValue()).toBe("°C");
    expect(qfm.magnitudeValue()).toBeCloseTo(30.0);
    expect(qfm.getPrecisionForUnit(0).min).toBe(1);
    expect(qfm.getPrecisionForUnit(0).max).toBe(1);
    expect(qfm.getPrecisionForUnit(1).max).toBe(2);
  });

  it("Coded Text Field Model", function () {
    var tmPlain:any = {
      "name": "Symptoms",
      "localizedName": "Symptoms",
      "rmType": "DV_CODED_TEXT",
      "nodeId": "at0.63",
      "min": 0,
      "max": 2,
      "localizedNames": {
        "sl": "Ugotovitve",
        "en": "Symptoms"
      },
      "aqlPath": "/content[openEHR-EHR-SECTION.ispek_dialog.v1,'Vitals']/items[openEHR-EHR-OBSERVATION.body_temperature-zn.v1]/data[at0002]/events[at0003]/data[at0001]/items[at0.63]/value",
      "inputs": [
        {
          "suffix": "code",
          "type": "CODED_TEXT",
          "list": [
            {
              "value": "at0.64",
              "label": "Chills / rigor / shivering",
              "localizedLabels": {
                "sl": "Mrazenje/mrzlica",
                "en": "Chills / rigor / shivering"
              }
            },
            {
              "value": "at0.65",
              "label": "Goose- bumps",
              "localizedLabels": {
                "sl": "Kurja polt",
                "en": "Goose- bumps"
              }
            }
          ],
          "defaultValue": "at0.64"
        }
      ],
      "formId": "vitals/vitals/body_temperature/any_event/symptoms",
      "viewConfig": {
        "label": {
          "custom": false,
          "value": "",
          "useLocalizations": false,
          "localizationsList": {}
        },
        "advanced": {
          "hidden": false,
          "readonly": false
        },
        "multiplicity": {
          "min": "0",
          "max": "2"
        },
        "size": {
          "field": "small",
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
          "code": {
            "presentation": "radios",
            "columns": "4"
          }
        }

      }
    };

    var cfm = new CodedTextFieldModel(tmPlain);
    cfm.setViewConfig((new ViewConfigParser() ).parseViewConfig(tmPlain.viewConfig));


    var attInput = new Input({
      suffix: tmPlain.inputs[0].suffix,
      type: InputType[tmPlain.inputs[0].type],
      defaultValue: tmPlain.inputs[0].defaultValue
    });
    var list = [];
    for (var i = 0; i < tmPlain.inputs[0].list.length; i++) {
      var iiPlain = tmPlain.inputs[0].list[i];
      var ii = new InputItem(iiPlain);
      if (iiPlain.validation) {
        ii.setValidation(new Validation(iiPlain.validation));
      }
      list.push(ii);
    }
    attInput.setList(list);

    cfm.setInputs([attInput]);


    expect(cfm.getRmType()).toBe(RmType.DV_CODED_TEXT);
    expect(cfm.getName()).toBe("Symptoms");
    expect(cfm.getLocalizedName()).toBe("Symptoms");
    expect(cfm.getLocalizedName("sl")).toBe("Ugotovitve");
    expect(cfm.getLocalizedName("en")).toBe("Symptoms");
    expect(cfm.getLocalizedName("ru")).toBeNull();
    expect(cfm.getMin()).toBe(0);
    expect(cfm.getMax()).toBe(2);
    expect(cfm.isMulti()).toBeTruthy();
    expect(cfm.getNodeId()).toBe("at0.63");
    expect(cfm.getAqlPath()).toBe("/content[openEHR-EHR-SECTION.ispek_dialog.v1,'Vitals']/items[openEHR-EHR-OBSERVATION.body_temperature-zn.v1]/" +
      "data[at0002]/events[at0003]/data[at0001]/items[at0.63]/value");
    expect(cfm.getInputFor("code").getDefaultValue()).toBe("at0.64");
    expect(cfm.getFormId()).toBe("vitals/vitals/body_temperature/any_event/symptoms");

    expect(cfm.getViewConfig() instanceof ViewConfig).toBeTruthy();
    expect(cfm.getViewConfig().getFields() instanceof Field).toBeTruthy();
    expect(cfm.getViewConfig().getFields("code").getPresentation()).toBe(FieldPresentation.RADIOS);
    expect(cfm.getViewConfig().getFields("code").getColumns()).toBe(4);
    expect(cfm.getViewConfig().isHidden()).toBeFalsy();
    expect(cfm.getViewConfig().isReadOnly()).toBeFalsy();
    expect(cfm.getViewConfig()['advanced']).toEqual({});
    expect(cfm.getViewConfig().getMin()).toBe(0);
    expect(cfm.getViewConfig().getMax()).toBe(2);
    expect(cfm.getViewConfig()['multiplicity']).toBeUndefined();
    expect(cfm.getViewConfig().getLabel() instanceof Label).toBeTruthy();
    expect(cfm.getViewConfig().getLabel().isCustom()).toBeFalsy();
    expect(cfm.getViewConfig().getLayout() instanceof Layout).toBeTruthy();
    expect(cfm.getViewConfig().getLayout().getLabelVerticalAlignment()).toBe(LabelVerticalAlignment.INHERIT);
    expect(cfm.getViewConfig().getSize() instanceof Size).toBeTruthy();
    expect(cfm.getViewConfig().getSize().getField()).toBe(FieldSize.SMALL);

    expect(cfm.getInputs().length).toBe(1);
    expect(cfm.getInput(0) instanceof Input).toBeTruthy();
    expect(cfm.getInput(0).getSuffix()).toBe("code");
    expect(cfm.getInput(0).getType()).toBe(InputType.CODED_TEXT);
    expect(cfm.getInput(0).getList().length).toBe(2);
    expect(cfm.getInput(0).getItem(0) instanceof InputItem).toBeTruthy();
    expect(cfm.getInput(0).getItem(0).getValue()).toBe("at0.64");
    expect(cfm.getInput(0).getItem(0).getLabel()).toBe("Chills / rigor / shivering");
    expect(cfm.getInput(0).getItem(0).getLabel("en")).toBe("Chills / rigor / shivering");
    expect(cfm.getInput(0).getItem(0).getLabel("sl")).toBe("Mrazenje/mrzlica");
    expect(cfm.getInput(0).getItem(0).getLabel("ro")).toBe("Chills / rigor / shivering");
    expect(cfm.getInput(0).getItem(0).getValidation()).toBeUndefined();
    expect(cfm.getInput(0).getItem(1) instanceof InputItem).toBeTruthy();
    expect(cfm.getInput(0).getItem(1).getValue()).toBe("at0.65");
    expect(cfm.getInput(0).getItem(1).getLabel()).toBe("Goose- bumps");
    expect(cfm.getInput(0).getItem(1).getLabel("en")).toBe("Goose- bumps");
    expect(cfm.getInput(0).getItem(1).getLabel("sl")).toBe("Kurja polt");
    expect(cfm.getInput(0).getItem(1).getLabel("no")).toBe("Goose- bumps");
    expect(cfm.getInput(0).getItem(1).getValidation()).toBeUndefined();
  });

  it("Text Field Model", function () {
    var tmPlain:any = {
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

    var tm = new TextFieldModel(tmPlain, new ViewConfigParser());
    tm.setViewConfig((new ViewConfigParser() ).parseViewConfig(tmPlain.viewConfig));


    var textInput = new Input({
      type: InputType[tmPlain.inputs[0].type],
      defaultValue: tmPlain.inputs[0].defaultValue
    });

    tm.setInputs([textInput]);

    expect(tm.getRmType()).toBe(RmType.DV_TEXT);
    expect(tm.getName()).toBe("Description of thermal stress");
    expect(tm.getLocalizedName()).toBe("Description of thermal stress");
    expect(tm.getLocalizedName("sl")).toBe("Opis");
    expect(tm.getLocalizedName("en")).toBe("Description of thermal stress");
    expect(tm.getLocalizedName("ru")).toBeNull();
    expect(tm.getMin()).toBe(0);
    expect(tm.getMax()).toBe(1);
    expect(tm.isMulti()).toBeFalsy();
    expect(tm.getNodeId()).toBe("at0041");
    expect(tm.getAqlPath()).toBe("/content[openEHR-EHR-SECTION.ispek_dialog.v1,'Vitals']/items[openEHR-EHR-OBSERVATION.body_temperature-zn.v1]/data[at0002]/events[at0003]/state[at0029]/items[at0041]/value");
    expect(tm.getFormId()).toBe("vitals/vitals/body_temperature/any_event/description_of_thermal_stress");

    expect(tm.getViewConfig() instanceof ViewConfig).toBeTruthy();
    expect(tm.getViewConfig().getFields() instanceof Field).toBeTruthy();
    expect(tm.getViewConfig().getFields().getPresentation()).toBe(FieldPresentation.TEXTAREA);
    expect(tm.getViewConfig().getFields().getLines()).toBe(1);

    expect(tm.getViewConfig().isHidden()).toBeFalsy();
    expect(tm.getViewConfig().isReadOnly()).toBeFalsy();
    expect(tm.getViewConfig()['advanced']).toEqual({});
    expect(tm.getViewConfig().getMin()).toBe(0);
    expect(tm.getViewConfig().getMax()).toBe(1);
    expect(tm.getViewConfig().getLabel() instanceof Label).toBeTruthy();
    expect(tm.getViewConfig().getLabel().isCustom()).toBeTruthy();
    expect(tm.getViewConfig().getLabel().getLocalization("sl")).toBe("Opis");
    expect(tm.getViewConfig().getLabel().getLocalization("en")).toBe("Thermal stress");
    expect(tm.getViewConfig().getLayout() instanceof Layout).toBeTruthy();
    expect(tm.getViewConfig().getLayout().getLabelVerticalAlignment()).toBe(LabelVerticalAlignment.INHERIT);
    expect(tm.getViewConfig().getSize() instanceof Size).toBeTruthy();
    expect(tm.getViewConfig().getSize().getField()).toBe(FieldSize.INHERIT);

    expect(tm.getInputs().length).toBe(1);
    expect(tm.getInput(0) instanceof Input).toBeTruthy();
    expect(tm.getInput(0).getSuffix()).toBeUndefined();
    expect(tm.getInput(0).getType()).toBe(InputType.TEXT);

    expect(tm.labelFor("sl")).toBe("Opis");
    expect(tm.labelFor("ro")).toBe("Thermal stress");
  });

  it("Rm Container Model - Observation with Event", function () {
    var omPlain:any = {
      "name": "Body temperature",
      "localizedName": "Body temperature",
      "rmType": "OBSERVATION",
      "nodeId": "openEHR-EHR-OBSERVATION.body_temperature-zn.v1",
      "min": 0,
      "max": -1,
      "localizedNames": {
        "sl": "Telesna temperatura",
        "en": "Body temperature"
      },
      "aqlPath": "/content[openEHR-EHR-SECTION.ispek_dialog.v1,'Vitals']/items[openEHR-EHR-OBSERVATION.body_temperature-zn.v1]",
      "children": [],
      "formId": "vitals/vitals/body_temperature",
      "viewConfig": {}
    };

    var emPlain:any = {
      "name": "Any event",
      "localizedName": "Any event",
      "rmType": "EVENT",
      "nodeId": "at0003",
      "min": 0,
      "max": -1,
      "localizedNames": {
        "sl": "*Any event(en)",
        "en": "Any event"
      },
      "aqlPath": "/content[openEHR-EHR-SECTION.ispek_dialog.v1,'Vitals']/items[openEHR-EHR-OBSERVATION.body_temperature-zn.v1]/data[at0002]/events[at0003]",
      "children": [],
      "formId": "vitals/vitals/body_temperature/any_event",
      "viewConfig": {}
    };

    var omModel:RmContainerModel = new RmContainerModel(omPlain);
    var rmType2:any = RmType[omPlain.rmType];
    omModel.setRmType(rmType2 as RmType);
    expect(omModel instanceof RmContainerModel).toBeTruthy();
    expect(omModel.getRmType()).toBe(RmType.OBSERVATION);
    expect(omModel.getPath()).toBe(omPlain.formId);
    var emModel = new RmContainerModel(emPlain);
    var rmType:any = RmType[emPlain.rmType];
    emModel.setRmType(rmType as RmType);
    omModel.addChildModel(emModel);
    expect(emModel instanceof RmContainerModel).toBeTruthy();
    expect(emModel.getRmType()).toBe(RmType.EVENT);
    expect(emModel.getPath()).toBe(emPlain.formId);

    expect(emModel.findAncestorWithPath(omPlain.formId)).toBe(omModel);
    expect(emModel.findAncestorWithPath(omPlain.formId + "/fake/value")).toBeNull();
  });

  it("Find Child With Path", function () {
    var cnt = new RmContainerModel({rmType: RmType.EVENT});

    var childOne = new CodedTextFieldModel({formId: "a/b/c/d"});
    var childTwo = new CodedTextFieldModel({formId: "a/b/c/d"});
    var childThree = new CodedTextFieldModel({formId: "f/g/h/a"});
    var childFour = new CodedTextFieldModel({formId: "a/b/c/d"});
    cnt.addChildModel(childOne);
    cnt.addChildModel(childTwo);
    cnt.addChildModel(childThree);
    cnt.addChildModel(childFour);

    var r1 = cnt.findChildWithPath("a/b/c/d");
    expect(r1).toBe(childOne);
    var r2 = cnt.findChildWithPath("d/ds/dsf");
    expect(r2).toBeNull();
    var r3 = cnt.findChildWithPath("a/b/c/d", 0);
    expect(r3).toBe(childOne);
    var r4 = cnt.findChildWithPath("a/b/c/d", 1);
    expect(r4).toBe(childTwo);
    var r5 = cnt.findChildWithPath("a/b/c/d", 2);
    expect(r5).toBe(childFour);
    var r6 = cnt.findChildWithPath("a/b/c/d", 3);
    expect(r6).toBeNull();

  });

  it("labelFor()", function () {
    var vc1Plain:any = {
      "label": {
        "custom": true,
        "value": "Thermal stress",
        "useLocalizations": true,
        "localizationsList": {
          "sl": "Opis",
          "en": "Thermal stress"
        }
      }
    };
    var tm1 = new TextFieldModel(
      {
        "name": "Description of thermal stress",
        "localizedName": "Description of thermal stress local",
        "localizedNames": {
          "sl": "Opis stresa",
          "en": "Description of thermal stress localized"
        }
      }, new ViewConfigParser());
    tm1.setViewConfig((new ViewConfigParser() ).parseViewConfig(vc1Plain));
    expect(tm1.labelFor("sl")).toBe("Opis");
    expect(tm1.labelFor("en")).toBe("Thermal stress");
    expect(tm1.labelFor("no")).toBe("Thermal stress");

    var vc2Plain:any = {
      "label": {
        "custom": true,
        "value": "Thermal stress",
        "useLocalizations": false,
        "localizationsList": {
          "sl": "Opis",
          "en": "Thermal stress"
        }
      }
    };
    var tm2 = new TextFieldModel(
      {
        "name": "Description of thermal stress",
        "localizedName": "Description of thermal stress local",
        "localizedNames": {
          "sl": "Opis stresa",
          "en": "Description of thermal stress localized"
        }
      }, new ViewConfigParser());
    tm2.setViewConfig((new ViewConfigParser() ).parseViewConfig(vc2Plain));
    expect(tm2.labelFor("sl")).toBe("Thermal stress");
    expect(tm2.labelFor("en")).toBe("Thermal stress");
    expect(tm2.labelFor("no")).toBe("Thermal stress");

    var vc3Plain:any = {
      "label": {
        "custom": false,
        "value": "Thermal stress value",
        "useLocalizations": true,
        "localizationsList": {
          "sl": "Opis",
          "en": "Thermal stress"
        }
      }
    };
    var tm3 = new TextFieldModel(
      {
        "name": "Description of thermal stress",
        "localizedName": "Description of thermal stress local",
        "localizedNames": {
          "sl": "Opis stresa",
          "en": "Description of thermal stress localized"
        }
      }, new ViewConfigParser());
    tm3.setViewConfig((new ViewConfigParser() ).parseViewConfig(vc3Plain));
    expect(tm3.labelFor("sl")).toBe("Opis");
    expect(tm3.labelFor("en")).toBe("Thermal stress");
    expect(tm3.labelFor("no")).toBe("Description of thermal stress local");

    var vc4Plain:any = {
      "label": {
        "custom": false,
        "value": "Thermal stress value",
        "useLocalizations": false,
        "localizationsList": {
          "sl": "Opis",
          "en": "Thermal stress"
        }
      }
    };
    var tm4:TextFieldModel = new TextFieldModel(
      {
        "name": "Description of thermal stress",
        "localizedName": "Description of thermal stress local",
        "localizedNames": {
          "sl": "Opis stresa",
          "en": "Description of thermal stress localized"
        }
      }, new ViewConfigParser());
    tm4.setViewConfig((new ViewConfigParser() ).parseViewConfig(vc4Plain));
    expect(tm4.labelFor("sl")).toBe("Opis stresa");
    expect(tm4.labelFor("en")).toBe("Description of thermal stress localized");
    expect(tm4.labelFor("no")).toBe("Description of thermal stress local");
  });

  it("ThinkEhrModelParser recursivelyForChildModels()", function () {
    var root = new FormRootModel();
    root.addChildModel(new RmContainerModel());
    root.addChildModel(new RmContainerModel());
    root.addChildModel(new RmContainerModel());
    root.getChildModel(0).addChildModel(new RmContainerModel());
    root.getChildModel(0).getChildModel(0).addChildModel(new CodedTextFieldModel());
    root.getChildModel(0).getChildModel(0).addChildModel(new TextFieldModel());
    root.getChildModel(0).getChildModel(0).addChildModel(new QuantityFieldModel());

    var initialCount = 0;
    (new ThinkEhrModelParser(rmTypeModelDictionary) ).recursivelyForChildModels(root, function (model) {
      model.__testProperty = "a";
      initialCount++;
    });

    var checkCount = 0;
    (new ThinkEhrModelParser(rmTypeModelDictionary) ).recursivelyForChildModels(root, function (model) {
      expect(model.__testProperty).toBe("a");
      checkCount++;
    });

    expect(checkCount).toBe(initialCount);
    expect(checkCount).toBe(7);
    expect(root['__testProperty']).toBeUndefined();
  });

  it("model.getUniqueId()", function () {
    var root = new FormRootModel({"formId": "a/b/c"});
    root.addChildModel(new RmContainerModel({"formId": "a/b/c/d/e"}));
    root.addChildModel(new RmContainerModel({"formId": "a/b/c/d/e"}));
    root.addChildModel(new RmContainerModel({"formId": "a/b/c/d/e"}));
    root.addChildModel(new RmContainerModel({"formId": "a/b/c/d/e2"}));
    root.getChildModel(1).addChildModel(new RmContainerModel({"formId": "a/b/c/d/e/f"}));
    root.getChildModel(1).getChildModel(0).addChildModel(new CodedTextFieldModel({"formId": "a/b/c/d/e/f/g1"}));
    root.getChildModel(1).getChildModel(0).addChildModel(new TextFieldModel({"formId": "a/b/c/d/e/f/g2"}, new ViewConfigParser()));
    root.getChildModel(1).getChildModel(0).addChildModel(new QuantityFieldModel({"formId": "a/b/c/d/e/f/g3"}));
    root.getChildModel(1).addChildModel(new RmContainerModel({"formId": "a/b/c/d/e/f"}));

    //console.log("Child path id indexes", root['_childPathIdMap']);

    expect(!isNaN(parseInt(root.getUniqueId()))).toBe(true);
    expect(root.getSanitizedUniqueId()).toBe(root.getUniqueId());
    expect((<FormRootModel>root.getChildModel(0)).getUniqueId()).toBe("a/b/c/d/e:0");
    expect((<FormRootModel>root.getChildModel(0)).getSanitizedUniqueId()).toBe("a_b_c_d_e_0");
    expect((<FormRootModel>root.getChildModel(1)).getUniqueId()).toBe("a/b/c/d/e:1");
    expect((<FormRootModel>root.getChildModel(1)).getSanitizedUniqueId()).toBe("a_b_c_d_e_1");
    expect((<FormRootModel>root.getChildModel(2)).getUniqueId()).toBe("a/b/c/d/e:2");
    expect((<FormRootModel>root.getChildModel(2)).getSanitizedUniqueId()).toBe("a_b_c_d_e_2");
    expect((<FormRootModel>root.getChildModel(3)).getUniqueId()).toBe("a/b/c/d/e2:0");
    expect((<FormRootModel>root.getChildModel(3)).getSanitizedUniqueId()).toBe("a_b_c_d_e2_0");

    var m1 = root.getChildModel(1);
    expect((<FormRootModel>m1.getChildModel(0)).getUniqueId()).toBe("a/b/c/d/e:1/f:0");
    expect((<FormRootModel>m1.getChildModel(0)).getSanitizedUniqueId()).toBe("a_b_c_d_e_1_f_0");
    expect((<FormRootModel>m1.getChildModel(0).getChildModel(0)).getUniqueId()).toBe("a/b/c/d/e:1/f:0/g1:0");
    expect((<FormRootModel>m1.getChildModel(0).getChildModel(0)).getSanitizedUniqueId()).toBe("a_b_c_d_e_1_f_0_g1_0");
    expect((<FormRootModel>m1.getChildModel(0).getChildModel(1)).getUniqueId()).toBe("a/b/c/d/e:1/f:0/g2:0");
    expect((<FormRootModel>m1.getChildModel(0).getChildModel(1)).getSanitizedUniqueId()).toBe("a_b_c_d_e_1_f_0_g2_0");
    expect((<FormRootModel>m1.getChildModel(0).getChildModel(2)).getUniqueId()).toBe("a/b/c/d/e:1/f:0/g3:0");
    expect((<FormRootModel>m1.getChildModel(0).getChildModel(2)).getSanitizedUniqueId()).toBe("a_b_c_d_e_1_f_0_g3_0");

    expect((<FormRootModel>m1.getChildModel(1)).getUniqueId()).toBe("a/b/c/d/e:1/f:1");
    expect((<FormRootModel>m1.getChildModel(1)).getSanitizedUniqueId()).toBe("a_b_c_d_e_1_f_1");

    var mRealistic = new QuantityFieldModel({
      formId: "generic-field-5173:0/vital_signs/respirations/any_event/rate"
    });
    expect(mRealistic.getSanitizedUniqueId()).toBe("generic_field_5173_0_vital_signs_respirations_any_event_rate_0");
  });

  it("Proportion Field Model", function () {
    var pmPlain:any = {
      "name": "spO2",
      "localizedName": "spO2",
      "rmType": "DV_PROPORTION",
      "nodeId": "at0006",
      "min": 0,
      "max": 1,
      "localizedNames": {
        "sl": "SpO2",
        "en": "spO2"
      },
      "annotations": {
        "comment": "SpO2 is defined as the ratio of oxyhaemoglobin (HbO2) to the total concentration of haemoglobin (HbO2 + deoxyhaemoglobin)."
      },
      "aqlPath": "/content[openEHR-EHR-OBSERVATION.indirect_oximetry.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0006]/value",
      "inputs": [
        {
          "suffix": "numerator",
          "type": "DECIMAL",
          "defaultValue": "42.7"
        },
        {
          "suffix": "denominator",
          "type": "DECIMAL",
          "defaultValue": "100.0"
        }
      ],
      "formId": "vital_signs/indirect_oximetry/spo2",
      "viewConfig": {
        "label": {
          "custom": false,
          "value": "",
          "useLocalizations": false,
          "localizationsList": {}
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
            "valign": "top",
            "align": "inherit"
          },
          "field": {
            "valign": "inherit",
            "align": "inherit"
          }
        }
      }
    };

    var pm = new ProportionFieldModel(pmPlain);
    pm.setViewConfig((new ViewConfigParser() ).parseViewConfig(pmPlain.viewConfig));


    var numeratorInput = new Input({
      suffix: pmPlain.inputs[0].suffix,
      type: InputType[pmPlain.inputs[0].type],
      defaultValue: pmPlain.inputs[0].defaultValue
    });
    var denominatorInput = new Input({
      suffix: pmPlain.inputs[1].suffix,
      type: InputType[pmPlain.inputs[1].type],
      defaultValue: pmPlain.inputs[1].defaultValue
    });

    pm.setInputs([numeratorInput, denominatorInput]);

    expect(pm.getRmType()).toBe(RmType.DV_PROPORTION);
    expect(pm.getName()).toBe("spO2");
    expect(pm.getLocalizedName()).toBe("spO2");
    expect(pm.getLocalizedName("sl")).toBe("SpO2");
    expect(pm.getLocalizedName("en")).toBe("spO2");
    expect(pm.getLocalizedName("ru")).toBeNull();
    expect(pm.getMin()).toBe(0);
    expect(pm.getMax()).toBe(1);
    expect(pm.isMulti()).toBeFalsy();
    expect(pm.getNodeId()).toBe("at0006");
    expect(pm.getAqlPath()).toBe("/content[openEHR-EHR-OBSERVATION.indirect_oximetry.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0006]/value");
    expect(pm.getFormId()).toBe("vital_signs/indirect_oximetry/spo2");

    expect(pm.getViewConfig() instanceof ViewConfig).toBeTruthy();

    expect(pm.getViewConfig().isHidden()).toBeFalsy();
    expect(pm.getViewConfig().isReadOnly()).toBeFalsy();
    expect(pm.getViewConfig()['advanced']).toEqual({});
    expect(pm.getViewConfig().getMin()).toBe(0);
    expect(pm.getViewConfig().getMax()).toBe(1);
    expect(pm.getViewConfig().getLabel() instanceof Label).toBeTruthy();
    expect(pm.getViewConfig().getLabel().isCustom()).toBeFalsy();
    expect(pm.getViewConfig().getLayout() instanceof Layout).toBeTruthy();
    expect(pm.getViewConfig().getLayout().getLabelVerticalAlignment()).toBe(LabelVerticalAlignment.TOP);
    expect(pm.getViewConfig().getSize() instanceof Size).toBeTruthy();
    expect(pm.getViewConfig().getSize().getField()).toBe(FieldSize.INHERIT);

    expect(pm.getInputs().length).toBe(2);
    expect(pm.getInput(0) instanceof Input).toBeTruthy();
    expect(pm.getInput(0).getSuffix()).toBe("numerator");
    expect(pm.getInput(0).getType()).toBe(InputType.DECIMAL);
    expect(pm.getInput(1) instanceof Input).toBeTruthy();
    expect(pm.getInput(1).getSuffix()).toBe("denominator");
    expect(pm.getInput(1).getType()).toBe(InputType.DECIMAL);

    expect(pm.labelFor("sl")).toBe("SpO2");
    expect(pm.labelFor("ro")).toBe("spO2");

    pm.setValueNodeParentRef([]);
    expect(pm.numeratorValue()).toBeCloseTo(42.7, null, null);
    expect(pm.denominatorValue()).toBeCloseTo(100.0, null, null);
  });

  it("Proportion Field Model - Multi", function () {
    var pmPlain:any = {
      "name": "spO2",
      "localizedName": "spO2",
      "rmType": "DV_PROPORTION",
      "nodeId": "at0006",
      "min": 0,
      "max": 100,
      "localizedNames": {
        "sl": "SpO2",
        "en": "spO2"
      },
      "annotations": {
        "comment": "SpO2 is defined as the ratio of oxyhaemoglobin (HbO2) to the total concentration of haemoglobin (HbO2 + deoxyhaemoglobin)."
      },
      "aqlPath": "/content[openEHR-EHR-OBSERVATION.indirect_oximetry.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0006]/value",
      "inputs": [
        {
          "suffix": "numerator",
          "type": "DECIMAL",
          "defaultValue": "42.7"
        },
        {
          "suffix": "denominator",
          "type": "DECIMAL",
          "defaultValue": "100.0"
        }
      ],
      "formId": "vital_signs/indirect_oximetry/spo2",
      "viewConfig": {
        "label": {
          "custom": false,
          "value": "",
          "useLocalizations": false,
          "localizationsList": {}
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
            "valign": "top",
            "align": "inherit"
          },
          "field": {
            "valign": "inherit",
            "align": "inherit"
          }
        },
        "tags": [
          "multi"
        ]
      }
    };

    var pm = new ProportionFieldModel(pmPlain);
    pm.setViewConfig((new ViewConfigParser() ).parseViewConfig(pmPlain.viewConfig));


    var numeratorInput = new Input({
      suffix: pmPlain.inputs[0].suffix,
      type: InputType[pmPlain.inputs[0].type],
      defaultValue: pmPlain.inputs[0].defaultValue
    });
    var denominatorInput = new Input({
      suffix: pmPlain.inputs[1].suffix,
      type: InputType[pmPlain.inputs[1].type],
      defaultValue: pmPlain.inputs[1].defaultValue
    });

    pm.setInputs([numeratorInput, denominatorInput]);

    expect(pm.getRmType()).toBe(RmType.DV_PROPORTION);
    expect(pm.isMulti()).toBe(true);
    expect(pm.getName()).toBe("spO2");
    expect(pm.getLocalizedName()).toBe("spO2");
    expect(pm.getLocalizedName("sl")).toBe("SpO2");
    expect(pm.getLocalizedName("en")).toBe("spO2");
    expect(pm.getLocalizedName("ru")).toBeNull();
    expect(pm.getMin()).toBe(0);
    expect(pm.getMax()).toBe(100);
    expect(pm.getNodeId()).toBe("at0006");
    expect(pm.getAqlPath()).toBe("/content[openEHR-EHR-OBSERVATION.indirect_oximetry.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0006]/value");
    expect(pm.getFormId()).toBe("vital_signs/indirect_oximetry/spo2");

    expect(pm.getViewConfig() instanceof ViewConfig).toBeTruthy();

    expect(pm.getViewConfig().isHidden()).toBeFalsy();
    expect(pm.getViewConfig().isReadOnly()).toBeFalsy();
    expect(pm.getViewConfig()['advanced']).toEqual({});
    expect(pm.getViewConfig().getMin()).toBe(0);
    expect(pm.getViewConfig().getMax()).toBe(1);
    expect(pm.getViewConfig().getLabel() instanceof Label).toBeTruthy();
    expect(pm.getViewConfig().getLabel().isCustom()).toBeFalsy();
    expect(pm.getViewConfig().getLayout() instanceof Layout).toBeTruthy();
    expect(pm.getViewConfig().getLayout().getLabelVerticalAlignment()).toBe(LabelVerticalAlignment.TOP);
    expect(pm.getViewConfig().getSize() instanceof Size).toBeTruthy();
    expect(pm.getViewConfig().getSize().getField()).toBe(FieldSize.INHERIT);

    expect(pm.getInputs().length).toBe(2);
    expect(pm.getInput(0) instanceof Input).toBeTruthy();
    expect(pm.getInput(0).getSuffix()).toBe("numerator");
    expect(pm.getInput(0).getType()).toBe(InputType.DECIMAL);
    expect(pm.getInput(1) instanceof Input).toBeTruthy();
    expect(pm.getInput(1).getSuffix()).toBe("denominator");
    expect(pm.getInput(1).getType()).toBe(InputType.DECIMAL);

    expect(pm.labelFor("sl")).toBe("SpO2");
    expect(pm.labelFor("ro")).toBe("spO2");

    pm.setValueNodeParentRef([]);
    expect(pm.numeratorValue().length).toBe(1);
    expect(pm.numeratorValue()[0]).toBeCloseTo(42.7);
    expect(pm.denominatorValue()[0]).toBeCloseTo(100);
    expect(pm.denominatorValue(undefined, 0)).toBeCloseTo(100);

    expect(pm.denominatorValue(undefined, 1)).toBe(null);
    pm.denominatorValue(10, 1);
    expect(pm.denominatorValue(undefined, 1)).toBe(10);

    expect(pm.denominatorValue(undefined, undefined).length).toBe(2);
    expect(pm.denominatorValue(undefined, undefined)[0]).toBe(100);
    expect(pm.denominatorValue(undefined, undefined)[1]).toBe(10);

    expect(pm.denominatorValue().length).toBe(2);
    expect(pm.denominatorValue()[0]).toBe(100);
    expect(pm.denominatorValue()[1]).toBe(10);
    expect(pm.numeratorValue().length).toBe(2);
    expect(pm.numeratorValue()[0]).toBeCloseTo(42.7);
    expect(pm.numeratorValue()[1]).toBe(undefined);
    pm.numeratorValue(33, 1);
    expect(pm.numeratorValue(undefined, 1)).toBeCloseTo(33);
    expect(pm.numeratorValue(undefined, undefined)[1]).toBeCloseTo(33);
    expect(pm.numeratorValue()[1]).toBeCloseTo(33);

    pm.denominatorValue(null, 0);
    pm.denominatorValue(null, 1);
    expect(pm.denominatorValue().length).toBe(2);
    expect(pm.denominatorValue()[0]).toBe(null);

    expect(pm.denominatorValue()[1]).toBe(null);
    pm.denominatorValue(44, 1);
    expect(pm.denominatorValue(undefined, 1)).toBe(44);
    pm.denominatorValue(55, 0);
    expect(pm.denominatorValue(undefined, 0)).toBe(55);
    pm.denominatorValue(null, 1);
    expect(pm.denominatorValue(undefined, 1)).toBe(null);
    expect(pm.denominatorValue(undefined, 0)).toBe(55);
    pm.denominatorValue(null, null);
    expect(pm.denominatorValue(undefined, 1)).toBe(null);
    expect(pm.denominatorValue(undefined, 0)).toBe(null);
    expect(pm.denominatorValue().length).toBe(0);
    expect(function () {
      pm.denominatorValue(25, undefined);
    }).toThrow(new Error("multiIndex parameter is required on isMulti()==true models"));
    expect(pm.denominatorValue(undefined, 1)).toBe(null);
    expect(pm.denominatorValue(undefined, 0)).toBe(null);
    pm.denominatorValue(25, 1);
    expect(pm.denominatorValue(undefined, 1)).toBe(25);
    expect(pm.denominatorValue(undefined, 0)).toBe(null);
    /*
     pm.denominatorValue(26);
     expect(pm.denominatorValue(undefined,1)).toBe(26);
     expect(pm.denominatorValue(undefined,0)).toBe(26);*/
    pm.clearDenominatorValue(0);
    expect(pm.denominatorValue(undefined, 1)).toBe(25);
    expect(pm.denominatorValue(undefined, 0)).toBe(null);
    expect(function () {
      pm.clearDenominatorValue();
    }).toThrow(new Error("multiIndex parameter must be null or integer on isMulti() model"));
    expect(pm.denominatorValue(undefined, 1)).toBe(25);
    expect(pm.denominatorValue(undefined, 0)).toBe(null);
    expect(function () {
      pm.denominatorValue(27);
    }).toThrow(new Error("multiIndex parameter is required on isMulti()==true models"));
    expect(pm.denominatorValue(undefined, 1)).toBe(25);
    expect(pm.denominatorValue(undefined, 0)).toBe(null);
    expect(function () {
      pm.clearDenominatorValue(undefined);
    }).toThrow(new Error("multiIndex parameter must be null or integer on isMulti() model"));
    expect(pm.denominatorValue(undefined, 1)).toBe(25);
    expect(pm.denominatorValue(undefined, 0)).toBe(null);
    expect(pm.denominatorValue().length).toBe(2);
    expect(pm.denominatorValue()[0]).toBeFalsy();
    expect(pm.denominatorValue()[1]).toBe(25);

    expect(function () {
      pm.numeratorValue(null);
    }).toThrow(new Error("multiIndex parameter must be null or integer on isMulti() model"));
    pm.numeratorValue(null, null);
    expect(pm.numeratorValue().length).toBe(0);
    expect(pm.numeratorValue()[0]).toBe(undefined);
    expect(pm.numeratorValue()[1]).toBe(undefined);
    pm.numeratorValue(44, 1);
    expect(pm.numeratorValue(undefined, 1)).toBe(44);
    pm.numeratorValue(55, 0);
    expect(pm.numeratorValue(undefined, 0)).toBe(55);
    pm.numeratorValue(null, 1);
    expect(pm.numeratorValue(undefined, 1)).toBe(null);
    expect(pm.numeratorValue(undefined, 0)).toBe(55);
    pm.numeratorValue(null, null);
    expect(pm.numeratorValue(undefined, 1)).toBe(null);
    expect(pm.numeratorValue(undefined, 0)).toBe(null);
    expect(pm.numeratorValue().length).toBe(0);
    expect(function () {
      pm.numeratorValue(25, undefined);
    }).toThrow(new Error("multiIndex parameter is required on isMulti()==true models"));
    expect(pm.numeratorValue(undefined, 1)).toBe(null);
    expect(pm.numeratorValue(undefined, 0)).toBe(null);
    pm.numeratorValue(26, 0);
    pm.numeratorValue(26, 1);
    expect(pm.numeratorValue(undefined, 1)).toBe(26);
    expect(pm.numeratorValue(undefined, 0)).toBe(26);
    pm.clearNumeratorValue(0);
    expect(pm.numeratorValue(undefined, 1)).toBe(26);
    expect(pm.numeratorValue(undefined, 0)).toBe(null);
    expect(function () {
      pm.clearNumeratorValue();
    }).toThrow(new Error("multiIndex parameter must be null or integer on isMulti() model"));
    expect(pm.numeratorValue(undefined, 1)).toBe(26);
    expect(pm.numeratorValue(undefined, 0)).toBe(null);
    expect(function () {
      pm.clearNumeratorValue(undefined);
    }).toThrow(new Error("multiIndex parameter must be null or integer on isMulti() model"));

    expect(pm.numeratorValue(undefined, 1)).toBe(26);
    expect(pm.numeratorValue(undefined, 0)).toBe(null);
    expect(pm.numeratorValue().length).toBe(2);
    expect(pm.value.length).toBe(2);

    pm.numeratorValue(11, 0);
    pm.denominatorValue(11, 0);
    pm.numeratorValue(110, 1);
    pm.denominatorValue(111, 1);

    pm.clearValue(0);
    expect(pm.numeratorValue(undefined, 0)).toBe(null);
    expect(pm.denominatorValue(undefined, 0)).toBe(null);
    expect(pm.numeratorValue(undefined, 1)).toBe(110);
    expect(pm.denominatorValue(undefined, 1)).toBe(111);

    expect(function () {
      pm.clearValue();
    }).toThrow(new Error("multiIndex parameter must be null or integer on isMulti() model"));
    expect(pm.numeratorValue(undefined, 0)).toBe(null);
    expect(pm.denominatorValue(undefined, 0)).toBe(null);
    expect(pm.numeratorValue(undefined, 1)).toBe(110);
    expect(pm.denominatorValue(undefined, 1)).toBe(111);
    expect(pm.value.length).toBe(2);

    pm.numeratorValue(57, 0);
    pm.denominatorValue(58, 0);
    pm.numeratorValue(47, 1);
    pm.denominatorValue(48, 1);
    expect(pm.numeratorValue().length).toBe(2);
    expect(pm.numeratorValue(undefined, 0)).toBe(57);
    expect(pm.denominatorValue(undefined, 0)).toBe(58);
    expect(pm.numeratorValue(undefined, 1)).toBe(47);
    expect(pm.denominatorValue(undefined, 1)).toBe(48);
    expect(pm.value.length).toBe(2);

    pm.removeValue(0);
    expect(pm.numeratorValue().length).toBe(1);
    expect(pm.numeratorValue(undefined, 0)).toBe(47);
    expect(pm.denominatorValue(undefined, 0)).toBe(48);
    expect(pm.numeratorValue(undefined, 1)).toBe(null);
    expect(pm.denominatorValue(undefined, 1)).toBe(null);
    expect(pm.value.length).toBe(1);

    pm.removeValue(1);
    expect(pm.numeratorValue().length).toBe(1);
    expect(pm.numeratorValue(undefined, 0)).toBe(47);
    expect(pm.denominatorValue(undefined, 0)).toBe(48);
    expect(pm.numeratorValue(undefined, 1)).toBe(null);
    expect(pm.denominatorValue(undefined, 1)).toBe(null);
    expect(pm.value.length).toBe(1);

    pm.removeValue(0);
    expect(pm.numeratorValue().length).toBe(0);
    expect(pm.numeratorValue(undefined, 0)).toBe(null);
    expect(pm.denominatorValue(undefined, 0)).toBe(null);
    expect(pm.numeratorValue(undefined, 1)).toBe(null);
    expect(pm.denominatorValue(undefined, 1)).toBe(null);
    expect(pm.value.length).toBe(0);

    pm.numeratorValue(57, 0);
    pm.denominatorValue(58, 0);
    pm.numeratorValue(47, 1);
    pm.denominatorValue(48, 1);
    expect(pm.numeratorValue().length).toBe(2);
    expect(pm.numeratorValue(undefined, 0)).toBe(57);
    expect(pm.denominatorValue(undefined, 0)).toBe(58);
    expect(pm.numeratorValue(undefined, 1)).toBe(47);
    expect(pm.denominatorValue(undefined, 1)).toBe(48);
    expect(pm.value.length).toBe(2);

    expect(function () {
      pm.removeValue();
    }).toThrow(new Error("multiIndex parameter must be null or integer on isMulti() model"));
    pm.removeValue(null);
    expect(pm.numeratorValue().length).toBe(0);
    expect(pm.numeratorValue(undefined, 0)).toBe(null);
    expect(pm.denominatorValue(undefined, 0)).toBe(null);
    expect(pm.numeratorValue(undefined, 1)).toBe(null);
    expect(pm.denominatorValue(undefined, 1)).toBe(null);
    expect(pm.value.length).toBe(0);

    pm.resetValue();
    expect(pm.numeratorValue(undefined, 0)).toBe(42.7);
    expect(pm.denominatorValue(undefined, 0)).toBe(100);
    expect(pm.value.length).toBe(1);

  });

  it("Boolean Field Model - Two State", function () {
    var bmPlain = {
      "name": "Boolean1",
      "localizedName": "Boolean1",
      "rmType": "DV_BOOLEAN",
      "nodeId": "at0045",
      "min": 0,
      "max": 1,
      "localizedNames": {
        "sl": "Da/ne",
        "en": "Boolean1"
      },
      "aqlPath": "/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0045]/value",
      "inputs": [
        {
          "type": "BOOLEAN",
          "defaultValue": true
        }
      ],
      "formId": "testing_template/context/testing/boolean1",
      "viewConfig": {
        "label": {
          "custom": false,
          "value": "",
          "useLocalizations": false,
          "localizationsList": {}
        },
        "advanced": {
          "hidden": false,
          "readonly": true
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
            "align": "LEFT"
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
            "threeState": false
          }
        }
      }
    };

    var bmPlainNoDefault = {
      "name": "Boolean1",
      "localizedName": "Boolean1",
      "rmType": "DV_BOOLEAN",
      "nodeId": "at0045",
      "min": 0,
      "max": 1,
      "localizedNames": {
        "sl": "Da/ne",
        "en": "Boolean1"
      },
      "aqlPath": "/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0045]/value",
      "inputs": [
        {
          "type": "BOOLEAN"
        }
      ],
      "formId": "testing_template/context/testing/boolean1",
      "viewConfig": {
        "label": {
          "custom": false,
          "value": "",
          "useLocalizations": false,
          "localizationsList": {}
        },
        "advanced": {
          "hidden": false,
          "readonly": true
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
            "align": "LEFT"
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
            "threeState": false
          }
        }
      }
    };

    var bmPlainWithItems = {
      "name": "Boolean1",
      "localizedName": "Boolean1",
      "rmType": "DV_BOOLEAN",
      "nodeId": "at0045",
      "min": 0,
      "max": 1,
      "localizedNames": {
        "sl": "Da/ne",
        "en": "Boolean1"
      },
      "aqlPath": "/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0045]/value",
      "inputs": [
        {
          "type": "BOOLEAN",
          "list": [
            {
              "value": "true",
              "label": "true"
            }
          ]
        }
      ],
      "formId": "testing_template/context/testing/boolean1",
      "viewConfig": {
        "label": {
          "custom": false,
          "value": "",
          "useLocalizations": false,
          "localizationsList": {}
        },
        "advanced": {
          "hidden": false,
          "readonly": true
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
            "align": "LEFT"
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
            "threeState": false
          }
        }
      }
    };

    var bm = new BooleanFieldModel(bmPlain);
    bm.setViewConfig((new ViewConfigParser() ).parseViewConfig(bmPlain.viewConfig));


    var booleanInput = new Input({
      type: InputType[bmPlain.inputs[0].type],
      defaultValue: bmPlain.inputs[0].defaultValue
    });

    bm.setInputs([booleanInput]);

    expect(bm.getRmType()).toBe(RmType.DV_BOOLEAN);
    expect(bm.getName()).toBe("Boolean1");
    expect(bm.getLocalizedName()).toBe("Boolean1");
    expect(bm.getLocalizedName("sl")).toBe("Da/ne");
    expect(bm.getLocalizedName("en")).toBe("Boolean1");
    expect(bm.getLocalizedName("ru")).toBeNull();
    expect(bm.getMin()).toBe(0);
    expect(bm.getMax()).toBe(1);
    expect(bm.isMulti()).toBeFalsy();
    expect(bm.getNodeId()).toBe("at0045");
    expect(bm.getAqlPath()).toBe("/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0045]/value");
    expect(bm.getFormId()).toBe("testing_template/context/testing/boolean1");

    expect(bm.getViewConfig() instanceof ViewConfig).toBeTruthy();

    expect(bm.getViewConfig().isHidden()).toBeFalsy();
    expect(bm.getViewConfig().isReadOnly()).toBeTruthy();
    expect(bm.getViewConfig()['advanced']).toEqual({});
    expect(bm.getViewConfig().getMin()).toBe(0);
    expect(bm.getViewConfig().getMax()).toBe(1);
    expect(bm.getViewConfig().getLabel() instanceof Label).toBeTruthy();
    expect(bm.getViewConfig().getLabel().isCustom()).toBeFalsy();
    expect(bm.getViewConfig().getLayout() instanceof Layout).toBeTruthy();
    expect(bm.getViewConfig().getLayout().getLabelVerticalAlignment()).toBe(LabelVerticalAlignment.INHERIT);
    expect(bm.getViewConfig().getLayout().getLabelHorizontalAlignment()).toBe(LabelHorizontalAlignment.LEFT);
    expect(bm.getViewConfig().getSize() instanceof Size).toBeTruthy();
    expect(bm.getViewConfig().getSize().getField()).toBe(FieldSize.INHERIT);
    expect(bm.getViewConfig().getFields()).toBeTruthy();
    expect(bm.getViewConfig().getFields().threeState).toBeDefined();
    expect(bm.isThreeState()).toBe(false);

    expect(bm.getInputs().length).toBe(1);
    expect(bm.getInput(0) instanceof Input).toBeTruthy();
    expect(bm.getInput(0).getSuffix()).toBeUndefined();
    expect(bm.getInput(0).getType()).toBe(InputType.BOOLEAN);

    expect(bm.labelFor("sl")).toBe("Da/ne");
    expect(bm.labelFor("ro")).toBe("Boolean1");

    var parentRef = [];
    bm.setValueNodeParentRef(parentRef);
    expect(bm.booleanValue()).toBe(true);
    expect(ThinkEhrUtil.isArray(parentRef)).toBeTruthy();
    expect(parentRef.length).toBe(1);
    expect(parentRef[0]).toBe(true);
    bm.booleanValue(true);
    expect(bm.booleanValue()).toBe(true);
    expect(parentRef.length).toBe(1);
    expect(parentRef[0]).toBe(true);
    bm.clearBooleanValue();
    expect(bm.booleanValue()).toBe(false);
    expect(bm._skipDefaultValue).toBeTruthy();
    bm.booleanValue(false);
    expect(bm.booleanValue()).toBe(false);
    expect(bm._skipDefaultValue).toBeFalsy();
    expect(bm.allowedValues().length).toBe(2);
    expect(bm.allowedValues().indexOf(true) >= 0).toBeTruthy();
    expect(bm.allowedValues().indexOf(false) >= 0).toBeTruthy();

    parentRef = [];
    bm = new BooleanFieldModel(bmPlainNoDefault);
    bm.setValueNodeParentRef(parentRef);
    bm.setViewConfig((new ViewConfigParser() ).parseViewConfig(bmPlainNoDefault.viewConfig));

    booleanInput = new Input({
      type: InputType[bmPlainNoDefault.inputs[0].type]
    });

    bm.setInputs([booleanInput]);
    expect(bm.booleanValue()).toBe(false);
    bm.booleanValue(true);
    expect(bm.booleanValue()).toBe(true);
    expect(bm.allowedValues().length).toBe(2);
    expect(bm.allowedValues().indexOf(true) >= 0).toBeTruthy();
    expect(bm.allowedValues().indexOf(false) >= 0).toBeTruthy();

    parentRef = [];
    bm = new BooleanFieldModel(bmPlainWithItems);
    bm.setValueNodeParentRef(parentRef);
    bm.setViewConfig((new ViewConfigParser() ).parseViewConfig(bmPlainWithItems.viewConfig));

    booleanInput = new Input({
      type: InputType[bmPlainWithItems.inputs[0].type]
    });
    var item1 = new InputItem(bmPlainWithItems.inputs[0].list[0]);
    booleanInput.addItem(item1);

    bm.setInputs([booleanInput]);
    expect(bm.allowedValues().length).toBe(1);
    expect(bm.allowedValues().indexOf(true) >= 0).toBeTruthy();
    expect(bm.allowedValues().indexOf(false) >= 0).toBeFalsy();

    expect(bm.booleanValue()).toBe(true);
    bm.booleanValue(false);
    expect(bm.booleanValue()).toBe(false);
  });

  it("Boolean Field Model - Three State", function () {
    var bmPlain:any = {
      "name": "Boolean1",
      "localizedName": "Boolean1",
      "rmType": "DV_BOOLEAN",
      "nodeId": "at0045",
      "min": 0,
      "max": 1,
      "localizedNames": {
        "sl": "Da/ne",
        "en": "Boolean1"
      },
      "aqlPath": "/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0045]/value",
      "inputs": [
        {
          "type": "BOOLEAN",
          "defaultValue": true
        }
      ],
      "formId": "testing_template/context/testing/boolean1",
      "viewConfig": {
        "label": {
          "custom": false,
          "value": "",
          "useLocalizations": false,
          "localizationsList": {}
        },
        "advanced": {
          "hidden": false,
          "readonly": true
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
            "align": "LEFT"
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
            "threeState": true
          }
        }
      }
    };

    var bmPlainNoDefault:any = {
      "name": "Boolean1",
      "localizedName": "Boolean1",
      "rmType": "DV_BOOLEAN",
      "nodeId": "at0045",
      "min": 0,
      "max": 1,
      "localizedNames": {
        "sl": "Da/ne",
        "en": "Boolean1"
      },
      "aqlPath": "/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0045]/value",
      "inputs": [
        {
          "type": "BOOLEAN"
        }
      ],
      "formId": "testing_template/context/testing/boolean1",
      "viewConfig": {
        "label": {
          "custom": false,
          "value": "",
          "useLocalizations": false,
          "localizationsList": {}
        },
        "advanced": {
          "hidden": false,
          "readonly": true
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
            "align": "LEFT"
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
            "threeState": true
          }
        }
      }
    };

    var bm = new BooleanFieldModel(bmPlain);
    bm.setViewConfig((new ViewConfigParser() ).parseViewConfig(bmPlain.viewConfig));


    var booleanInput = new Input({
      type: InputType[bmPlain.inputs[0].type],
      defaultValue: bmPlain.inputs[0].defaultValue
    });

    bm.setInputs([booleanInput]);

    expect(bm.getRmType()).toBe(RmType.DV_BOOLEAN);
    expect(bm.getViewConfig().getFields().threeState).toBeDefined();
    expect(bm.isThreeState()).toBeTruthy();

    var parentRef = [];
    bm.setValueNodeParentRef(parentRef);
    expect(bm.booleanValue()).toBe(true);
    expect(ThinkEhrUtil.isArray(parentRef)).toBeTruthy();
    expect(parentRef.length).toBe(1);
    expect(parentRef[0]).toBe(true);
    bm.booleanValue(false);
    expect(bm.booleanValue()).toBe(false);
    expect(parentRef.length).toBe(1);
    expect(parentRef[0]).toBe(false);
    bm.clearBooleanValue();
    expect(bm.booleanValue()).toBeNull();
    expect(bm._skipDefaultValue).toBeTruthy();
    bm.booleanValue(true);
    expect(bm.booleanValue()).toBe(true);
    expect(bm._skipDefaultValue).toBeFalsy();

    parentRef = [];
    bm = new BooleanFieldModel(bmPlainNoDefault);
    bm.setValueNodeParentRef(parentRef);
    bm.setViewConfig((new ViewConfigParser() ).parseViewConfig(bmPlainNoDefault.viewConfig));

    booleanInput = new Input({
      type: InputType[bmPlainNoDefault.inputs[0].type]
    });

    bm.setInputs([booleanInput]);
    expect(bm.booleanValue()).toBeNull();
    bm.booleanValue(true);
    expect(bm.booleanValue()).toBe(true);
  });

  it("Date Field Model", function () {
    var dfmPlain = {
      "name": "Date",
      "localizedName": "Date",
      "rmType": "DV_DATE",
      "nodeId": "at0013",
      "min": 0,
      "max": 1,
      "localizedNames": {
        "sl": "Datum",
        "en": "Date"
      },
      "aqlPath": "/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0013]/value",
      "inputs": [
        {
          "type": "DATE",
          "defaultValue": "2014-10-08"
        }
      ],
      "formId": "testing_template/context/testing/date",
      "viewConfig": {
        "label": {
          "custom": false,
          "value": "",
          "useLocalizations": false,
          "localizationsList": {}
        },
        "advanced": {
          "hidden": false,
          "readonly": true
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
            "align": "left"
          }
        },
        "tags": [],
        "datasource": {
          "loadRemote": false,
          "loadRemoteUrl": ""
        }
      }
    };

    var dm = new DateFieldModel(dfmPlain, new ViewConfigParser());
    dm.setViewConfig((new ViewConfigParser() ).parseViewConfig(dfmPlain.viewConfig));


    var dateInput = new Input({
      type: InputType[dfmPlain.inputs[0].type],
      defaultValue: dfmPlain.inputs[0].defaultValue
    });

    dm.setInputs([dateInput]);

    expect(dm.getRmType()).toBe(RmType.DV_DATE);
    expect(dm.getName()).toBe("Date");
    expect(dm.getLocalizedName()).toBe("Date");
    expect(dm.getLocalizedName("sl")).toBe("Datum");
    expect(dm.getLocalizedName("en")).toBe("Date");
    expect(dm.getLocalizedName("ru")).toBeNull();
    expect(dm.getMin()).toBe(0);
    expect(dm.getMax()).toBe(1);
    expect(dm.isMulti()).toBeFalsy();
    expect(dm.getNodeId()).toBe("at0013");
    expect(dm.getAqlPath()).toBe("/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0013]/value");
    expect(dm.getFormId()).toBe("testing_template/context/testing/date");

    expect(dm.getViewConfig() instanceof ViewConfig).toBeTruthy();

    expect(dm.getViewConfig().isHidden()).toBeFalsy();
    expect(dm.getViewConfig().isReadOnly()).toBeTruthy();
    expect(dm.getViewConfig()['advanced']).toEqual({});
    expect(dm.getViewConfig().getMin()).toBe(0);
    expect(dm.getViewConfig().getMax()).toBe(1);
    expect(dm.getViewConfig().getLabel() instanceof Label).toBeTruthy();
    expect(dm.getViewConfig().getLabel().isCustom()).toBeFalsy();
    expect(dm.getViewConfig().getLayout() instanceof Layout).toBeTruthy();
    expect(dm.getViewConfig().getLayout().getLabelVerticalAlignment()).toBe(LabelVerticalAlignment.INHERIT);
    expect(dm.getViewConfig().getLayout().getLabelHorizontalAlignment()).toBe(LabelHorizontalAlignment.INHERIT);
    expect(dm.getViewConfig().getLayout().getFieldHorizontalAlignment()).toBe(FieldHorizontalAlignment.LEFT);
    expect(dm.getViewConfig().getSize() instanceof Size).toBeTruthy();
    expect(dm.getViewConfig().getSize().getField()).toBe(FieldSize.INHERIT);

    expect(dm.getInputs().length).toBe(1);
    expect(dm.getInput(0) instanceof Input).toBeTruthy();
    expect(dm.getInput(0).getSuffix()).toBeUndefined();
    expect(dm.getInput(0).getType()).toBe(InputType.DATE);

    expect(dm.labelFor("sl")).toBe("Datum");
    expect(dm.labelFor("ro")).toBe("Date");

    var parentRef = [];
    dm.setValueNodeParentRef(parentRef);
    expect(dm._skipDefaultValue).toBe(false);
    expect(dm.dateValue()).toBe("2014-10-08");
    expect(ThinkEhrUtil.isArray(parentRef)).toBeTruthy();
    expect(parentRef.length).toBe(1);
    expect(parentRef[0]).toBe("2014-10-08");
    dm.dateValue("2015-07-17");
    expect(dm.dateValue()).toBe("2015-07-17");
    expect(parentRef.length).toBe(1);
    expect(parentRef[0]).toBe("2015-07-17");
    dm.clearDateValue();
    expect(dm.dateValue()).toBeNull();
    expect(dm._skipDefaultValue).toBeTruthy();
    dm.dateValue("2016-05-05"); // Cinco de Mayo
    expect(dm.dateValue()).toBe("2016-05-05");

  });

  it("Time Field Model", function () {
    var tfmPlain:any = {
      "name": "Time",
      "localizedName": "Time",
      "rmType": "DV_TIME",
      "nodeId": "at0014",
      "min": 0,
      "max": 1,
      "localizedNames": {
        "sl": "Čas",
        "en": "Time"
      },
      "aqlPath": "/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0014]/value",
      "inputs": [
        {
          "type": "TIME",
          "defaultValue": "03:12:17"
        }
      ],
      "formId": "testing_template/context/testing/time",
      "viewConfig": {
        "label": {
          "custom": false,
          "value": "",
          "useLocalizations": false,
          "localizationsList": {}
        },
        "advanced": {
          "hidden": true,
          "readonly": false
        },
        "multiplicity": {
          "min": "0",
          "max": "1"
        },
        "size": {
          "field": "medium",
          "label": "inherit"
        },
        "layout": {
          "label": {
            "valign": "middle",
            "align": "inherit"
          },
          "field": {
            "valign": "top",
            "align": "center"
          }
        },
        "tags": [],
        "datasource": {
          "loadRemote": false,
          "loadRemoteUrl": ""
        }
      }
    };

    var tm = new TimeFieldModel(tfmPlain, new ViewConfigParser());
    tm.setViewConfig((new ViewConfigParser() ).parseViewConfig(tfmPlain.viewConfig));


    var timeInput = new Input({
      type: InputType[tfmPlain.inputs[0].type],
      defaultValue: tfmPlain.inputs[0].defaultValue
    });

    tm.setInputs([timeInput]);

    expect(tm.getRmType()).toBe(RmType.DV_TIME);
    expect(tm.getName()).toBe("Time");
    expect(tm.getLocalizedName()).toBe("Time");
    expect(tm.getLocalizedName("sl")).toBe("Čas");
    expect(tm.getLocalizedName("en")).toBe("Time");
    expect(tm.getLocalizedName("ru")).toBeNull();
    expect(tm.getMin()).toBe(0);
    expect(tm.getMax()).toBe(1);
    expect(tm.isMulti()).toBeFalsy();
    expect(tm.getNodeId()).toBe("at0014");
    expect(tm.getAqlPath()).toBe("/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0014]/value");
    expect(tm.getFormId()).toBe("testing_template/context/testing/time");

    expect(tm.getViewConfig() instanceof ViewConfig).toBeTruthy();

    expect(tm.getViewConfig().isHidden()).toBeTruthy();
    expect(tm.getViewConfig().isReadOnly()).toBeFalsy();
    expect(tm.getViewConfig()['advanced']).toEqual({});
    expect(tm.getViewConfig().getMin()).toBe(0);
    expect(tm.getViewConfig().getMax()).toBe(1);
    expect(tm.getViewConfig().getLabel() instanceof Label).toBeTruthy();
    expect(tm.getViewConfig().getLabel().isCustom()).toBeFalsy();
    expect(tm.getViewConfig().getLayout() instanceof Layout).toBeTruthy();
    expect(tm.getViewConfig().getLayout().getLabelVerticalAlignment()).toBe(LabelVerticalAlignment.MIDDLE);
    expect(tm.getViewConfig().getLayout().getLabelHorizontalAlignment()).toBe(LabelHorizontalAlignment.INHERIT);
    expect(tm.getViewConfig().getLayout().getFieldHorizontalAlignment()).toBe(FieldHorizontalAlignment.CENTER);
    expect(tm.getViewConfig().getSize() instanceof Size).toBeTruthy();
    expect(tm.getViewConfig().getSize().getField()).toBe(FieldSize.MEDIUM);

    expect(tm.getInputs().length).toBe(1);
    expect(tm.getInput(0) instanceof Input).toBeTruthy();
    expect(tm.getInput(0).getSuffix()).toBeUndefined();
    expect(tm.getInput(0).getType()).toBe(InputType.TIME);

    expect(tm.labelFor("sl")).toBe("Čas");
    expect(tm.labelFor("ro")).toBe("Time");

    var parentRef = [];
    tm.setValueNodeParentRef(parentRef);
    expect(tm._skipDefaultValue).toBe(false);
    expect(tm._skipDefaultValue).toBe(false);
    expect(tm.timeValue()).toBe("03:12:17");
    expect(ThinkEhrUtil.isArray(parentRef)).toBeTruthy();
    expect(parentRef.length).toBe(1);
    expect(parentRef[0]).toBe("03:12:17");
    tm.timeValue("22:44:39");
    expect(tm.timeValue()).toBe("22:44:39");
    expect(parentRef.length).toBe(1);
    expect(parentRef[0]).toBe("22:44:39");
    tm.clearTimeValue();
    expect(tm.timeValue()).toBeNull();
    expect(tm._skipDefaultValue).toBeTruthy();
    tm.timeValue("13:07:02");
    expect(tm.timeValue()).toBe("13:07:02");

  });

  it("Date-Time Field Model", function () {
    var dtfmPlain = {
      "name": "Date time",
      "localizedName": "Date time",
      "rmType": "DV_DATE_TIME",
      "nodeId": "at0015",
      "min": 0,
      "max": 1,
      "localizedNames": {
        "sl": "Znamka",
        "en": "Date time"
      },
      "aqlPath": "/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0015]/value",
      "inputs": [
        {
          "type": "DATETIME",
          "defaultValue": "2014-10-15T01:06:07"
        }
      ],
      "formId": "testing_template/context/testing/date_time",
      "viewConfig": {
        "label": {
          "custom": false,
          "value": "",
          "useLocalizations": false,
          "localizationsList": {}
        },
        "advanced": {
          "hidden": false,
          "readonly": true
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
            "valign": "middle",
            "align": "inherit"
          }
        },
        "tags": [],
        "datasource": {
          "loadRemote": false,
          "loadRemoteUrl": ""
        }
      }
    };

    var dtm = new DateTimeFieldModel(dtfmPlain);
    dtm.setViewConfig((new ViewConfigParser() ).parseViewConfig(dtfmPlain.viewConfig));


    var dateTimeInput = new Input({
      type: InputType[dtfmPlain.inputs[0].type],
      defaultValue: dtfmPlain.inputs[0].defaultValue
    });

    dtm.setInputs([dateTimeInput]);

    expect(dtm.getRmType()).toBe(RmType.DV_DATE_TIME);
    expect(dtm.getName()).toBe("Date time");
    expect(dtm.getLocalizedName()).toBe("Date time");
    expect(dtm.getLocalizedName("sl")).toBe("Znamka");
    expect(dtm.getLocalizedName("en")).toBe("Date time");
    expect(dtm.getLocalizedName("ru")).toBeNull();
    expect(dtm.getMin()).toBe(0);
    expect(dtm.getMax()).toBe(1);
    expect(dtm.isMulti()).toBeFalsy();
    expect(dtm.getNodeId()).toBe("at0015");
    expect(dtm.getAqlPath()).toBe("/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0015]/value");
    expect(dtm.getFormId()).toBe("testing_template/context/testing/date_time");

    expect(dtm.getViewConfig() instanceof ViewConfig).toBeTruthy();

    expect(dtm.getViewConfig().isHidden()).toBeFalsy();
    expect(dtm.getViewConfig().isReadOnly()).toBeTruthy();
    expect(dtm.getViewConfig()['advanced']).toEqual({});
    expect(dtm.getViewConfig().getMin()).toBe(0);
    expect(dtm.getViewConfig().getMax()).toBe(1);
    expect(dtm.getViewConfig().getLabel() instanceof Label).toBeTruthy();
    expect(dtm.getViewConfig().getLabel().isCustom()).toBeFalsy();
    expect(dtm.getViewConfig().getLayout() instanceof Layout).toBeTruthy();
    expect(dtm.getViewConfig().getLayout().getLabelVerticalAlignment()).toBe(LabelVerticalAlignment.INHERIT);
    expect(dtm.getViewConfig().getLayout().getLabelHorizontalAlignment()).toBe(LabelHorizontalAlignment.INHERIT);
    expect(dtm.getViewConfig().getLayout().getFieldHorizontalAlignment()).toBe(FieldHorizontalAlignment.INHERIT);
    expect(dtm.getViewConfig().getLayout().getFieldVerticalAlignment()).toBe(FieldVerticalAlignment.MIDDLE);
    expect(dtm.getViewConfig().getSize() instanceof Size).toBeTruthy();
    expect(dtm.getViewConfig().getSize().getField()).toBe(FieldSize.INHERIT);

    expect(dtm.getInputs().length).toBe(1);
    expect(dtm.getInput(0) instanceof Input).toBeTruthy();
    expect(dtm.getInput(0).getSuffix()).toBeUndefined();
    expect(dtm.getInput(0).getType()).toBe(InputType.DATETIME);

    expect(dtm.labelFor("sl")).toBe("Znamka");
    expect(dtm.labelFor("ro")).toBe("Date time");

    var parentRef = [];
    dtm.setValueNodeParentRef(parentRef);
    expect(dtm._skipDefaultValue).toBe(false);
    expect(dtm.dateTimeValue()).toBe("2014-10-15T01:06:07");
    expect(ThinkEhrUtil.isArray(parentRef)).toBeTruthy();
    expect(parentRef.length).toBe(1);
    expect(parentRef[0]).toBe("2014-10-15T01:06:07");
    dtm.dateTimeValue("2014-10-07T15:28:48.115+02:00");
    expect(dtm.dateTimeValue()).toBe("2014-10-07T15:28:48.115+02:00");
    expect(parentRef.length).toBe(1);
    expect(parentRef[0]).toBe("2014-10-07T15:28:48.115+02:00");
    dtm.clearDateTimeValue();
    expect(dtm.dateTimeValue()).toBeNull();
    expect(dtm._skipDefaultValue).toBeTruthy();
    dtm.dateTimeValue("2014-10-07T16:29:48.115+02:00");
    expect(dtm.dateTimeValue()).toBe("2014-10-07T16:29:48.115+02:00");
  });

  it("Ordinal Field Model", function () {
    var omPlain:any = {
      "name": "Ordinal1",
      "localizedName": "Ordinal1",
      "rmType": "DV_ORDINAL",
      "nodeId": "at0042",
      "min": 0,
      "max": 1,
      "localizedNames": {
        "sl": "Zaporedje",
        "en": "Ordinal1"
      },
      "aqlPath": "/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.testing.v1,'Fixed name']/items[at0042]/value",
      "inputs": [
        {
          "type": "CODED_TEXT",
          "list": [
            {
              "value": "at0043",
              "label": "First",
              "localizedLabels": {
                "sl": "Prvi",
                "en": "First"
              },
              "ordinal": 1
            },
            {
              "value": "at0044",
              "label": "Second",
              "localizedLabels": {
                "sl": "Drugi",
                "en": "Second"
              },
              "ordinal": 2
            }
          ],
          "defaultValue": "at0043"
        }
      ],
      "formId": "testing_template/context/fixed_name/ordinal1",
      "viewConfig": {
        "label": {
          "custom": true,
          "value": "Ordinal1 Fixed",
          "useLocalizations": false,
          "localizationsList": {}
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
            "presentation": "radios",
            "columns": "2"
          }
        }

      }
    };

    var cfm = new OrdinalFieldModel(omPlain);
    cfm.setViewConfig((new ViewConfigParser() ).parseViewConfig(omPlain.viewConfig));


    var attInput = new Input({
      suffix: omPlain.inputs[0].suffix,
      type: InputType[omPlain.inputs[0].type],
      defaultValue: omPlain.inputs[0].defaultValue
    });
    var list = [];
    for (var i = 0; i < omPlain.inputs[0].list.length; i++) {
      var iiPlain = omPlain.inputs[0].list[i];
      var ii = new InputItem(iiPlain);
      if (iiPlain.validation) {
        ii.setValidation(new Validation(iiPlain.validation));
      }
      list.push(ii);
    }
    attInput.setList(list);

    cfm.setInputs([attInput]);

    expect(cfm.getRmType()).toBe(RmType.DV_ORDINAL);
    expect(cfm.getName()).toBe("Ordinal1");
    expect(cfm.getLocalizedName()).toBe("Ordinal1");
    expect(cfm.getLocalizedName("sl")).toBe("Zaporedje");
    expect(cfm.getLocalizedName("en")).toBe("Ordinal1");
    expect(cfm.getLocalizedName("ru")).toBeNull();
    expect(cfm.getMin()).toBe(0);
    expect(cfm.getMax()).toBe(1);
    expect(cfm.isMulti()).toBeFalsy();
    expect(cfm.getNodeId()).toBe("at0042");
    expect(cfm.getAqlPath()).toBe("/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.testing.v1,'Fixed name']/items[at0042]/value");
    expect(cfm.getInputFor("code").getDefaultValue()).toBe(omPlain.inputs[0].defaultValue);
    expect(cfm.getFormId()).toBe("testing_template/context/fixed_name/ordinal1");

    expect(cfm.getInputs().length).toBe(1);
    expect(cfm.getInput(0) instanceof Input).toBeTruthy();
    expect(cfm.getInput(0).getSuffix()).toBeUndefined();
    expect(cfm.getInput(0).getType()).toBe(InputType.CODED_TEXT);
    expect(cfm.getInput(0).getList().length).toBe(2);
    expect(cfm.getInput(0).getItem(0) instanceof InputItem).toBeTruthy();
    expect(cfm.getInput(0).getItem(0).getValue()).toBe("at0043");
    expect(cfm.getInput(0).getItem(0).getLabel()).toBe("(1) First");
    expect(cfm.getInput(0).getItem(0).getLabel("en")).toBe("(1) First");
    expect(cfm.getInput(0).getItem(0).getLabel("sl")).toBe("(1) Prvi");
    expect(cfm.getInput(0).getItem(0).getLabel("ro")).toBe("(1) First");
    expect(cfm.getInput(0).getItem(0).getValidation()).toBeUndefined();
    expect(cfm.getInput(0).getItem(1) instanceof InputItem).toBeTruthy();
    expect(cfm.getInput(0).getItem(1).getValue()).toBe("at0044");
    expect(cfm.getInput(0).getItem(1).getLabel()).toBe("(2) Second");
    expect(cfm.getInput(0).getItem(1).getLabel("en")).toBe("(2) Second");
    expect(cfm.getInput(0).getItem(1).getLabel("sl")).toBe("(2) Drugi");
    expect(cfm.getInput(0).getItem(1).getLabel("no")).toBe("(2) Second");
    expect(cfm.getInput(0).getItem(1).getValidation()).toBeUndefined();

    var parentRef = [];
    cfm.setValueNodeParentRef(parentRef);
    expect(cfm.codeValue("at0043")).toBe("at0043");
    expect(ThinkEhrUtil.isArray(parentRef)).toBeTruthy();
    expect(parentRef.length).toBe(1);
    expect(parentRef[0]["|code"]).toBe("at0043");
    expect(parentRef[0]["|value"]).toBe("(1) First");
    expect(parentRef[0]["|ordinal"]).toBe(1);

    cfm.codeValue("at0044", "sl");
    expect(cfm.codeValue()).toBe("at0044");
    expect(parentRef.length).toBe(1);
    expect(parentRef[0]["|code"]).toBe("at0044");
    expect(parentRef[0]["|value"]).toBe("(2) Drugi");
    expect(parentRef[0]["|ordinal"]).toBe(2);

    expect(parentRef.length).toBe(1);
    cfm.clearValue();
    expect(cfm.codeValue()).toBeNull();


    expect(cfm.getViewConfig().getFields().getPresentation()).toBe(FieldPresentation.RADIOS);
  });

  it("insertChildModelAfterLastOfSamePath() Test", function () {
    var rootModel = new FormRootModel();
    var c1 = new NodeModel({formId: "a"}, new ViewConfigParser());
    var c2 = new NodeModel({formId: "a"}, new ViewConfigParser());
    var c3 = new NodeModel({formId: "b"}, new ViewConfigParser());
    var c4 = new NodeModel({formId: "c"}, new ViewConfigParser());
    var c5 = new NodeModel({formId: "d"}, new ViewConfigParser());
    var c6 = new NodeModel({formId: "a"}, new ViewConfigParser());
    var c7 = new NodeModel({formId: "a"}, new ViewConfigParser());

    rootModel.insertChildModelAfterLastOfSamePath(c1, true);
    expect(rootModel.getChildModel(0)).toBe(c1);

    rootModel.insertChildModelAfterLastOfSamePath(c2, false);
    expect(rootModel.getChildModel(0)).toBe(c1);
    expect(rootModel.getChildModel(1)).toBe(c2);

    rootModel.insertChildModelAfterLastOfSamePath(c3, false);
    expect(rootModel.getChildCount()).toBe(2);
    expect(rootModel.getChildModel(0)).toBe(c1);
    expect(rootModel.getChildModel(1)).toBe(c2);

    rootModel.insertChildModelAfterLastOfSamePath(c3, true);
    expect(rootModel.getChildCount()).toBe(3);
    expect(rootModel.getChildModel(0)).toBe(c1);
    expect(rootModel.getChildModel(1)).toBe(c2);
    expect(rootModel.getChildModel(2)).toBe(c3);

    rootModel.insertChildModelAfterLastOfSamePath(c4, true);
    expect(rootModel.getChildCount()).toBe(4);
    expect(rootModel.getChildModel(0)).toBe(c1);
    expect(rootModel.getChildModel(1)).toBe(c2);
    expect(rootModel.getChildModel(2)).toBe(c3);
    expect(rootModel.getChildModel(3)).toBe(c4);

    rootModel.insertChildModelAfterLastOfSamePath(c5, true);
    expect(rootModel.getChildCount()).toBe(5);
    expect(rootModel.getChildModel(0)).toBe(c1);
    expect(rootModel.getChildModel(1)).toBe(c2);
    expect(rootModel.getChildModel(2)).toBe(c3);
    expect(rootModel.getChildModel(3)).toBe(c4);
    expect(rootModel.getChildModel(4)).toBe(c5);

    rootModel.insertChildModelAfterLastOfSamePath(c6, false);
    expect(rootModel.getChildCount()).toBe(6);
    expect(rootModel.getChildModel(0)).toBe(c1);
    expect(rootModel.getChildModel(1)).toBe(c2);
    expect(rootModel.getChildModel(2)).toBe(c6);
    expect(rootModel.getChildModel(3)).toBe(c3);
    expect(rootModel.getChildModel(4)).toBe(c4);
    expect(rootModel.getChildModel(5)).toBe(c5);

    rootModel.insertChildModelAfterLastOfSamePath(c7, true);
    expect(rootModel.getChildCount()).toBe(7);
    expect(rootModel.getChildModel(0)).toBe(c1);
    expect(rootModel.getChildModel(1)).toBe(c2);
    expect(rootModel.getChildModel(2)).toBe(c6);
    expect(rootModel.getChildModel(3)).toBe(c7);
    expect(rootModel.getChildModel(4)).toBe(c3);
    expect(rootModel.getChildModel(5)).toBe(c4);
    expect(rootModel.getChildModel(6)).toBe(c5);

    var c8 = new OrdinalFieldModel({formId: "c"});
    rootModel.insertChildModelAfterLastOfSamePath(c8, true);
    expect(rootModel.getChildCount()).toBe(8);
    expect(rootModel.getChildModel(0)).toBe(c1);
    expect(rootModel.getChildModel(1)).toBe(c2);
    expect(rootModel.getChildModel(2)).toBe(c6);
    expect(rootModel.getChildModel(3)).toBe(c7);
    expect(rootModel.getChildModel(4)).toBe(c3);
    expect(rootModel.getChildModel(5)).toBe(c4);
    expect(rootModel.getChildModel(6)).toBe(c8);
    expect(rootModel.getChildModel(7)).toBe(c5);
  });

  it("InputItem update from terminology", function (done) {
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
        "en"
      ],
      "children": [
        {
          "name": "Testing DV_CODED_TEXT with terminology",
          "localizedName": "Testing DV_CODED_TEXT with terminology",
          "rmType": "DV_CODED_TEXT",
          "nodeId": "at0030",
          "min": 0,
          "max": 1,
          "localizedNames": {
            "en": "Testing DV_CODED_TEXT with terminology"
          },
          "localizedDescriptions": {
            "en": "*"
          },
          "aqlPath": "/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0030]/value",
          "inputs": [
            {
              "suffix": "code",
              "type": "TEXT",
              "terminology": "ICD10",
              "defaultValue": "A370"
            },
            {
              "suffix": "value",
              "type": "TEXT",
              "terminology": "ICD10",
              "defaultValue": "defaultVal"
            }
          ],
          "formId": "test_encounter/testing/testing/testing_dv_coded_text_with_terminology",
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
            "field": {
              "code": {
                "presentation": "textfield"
              },
              "value": {
                "presentation": "textfield"
              }
            }
          }
        },
        {
          "name": "Testing DV_CODED_TEXT",
          "localizedName": "Testing DV_CODED_TEXT",
          "rmType": "DV_CODED_TEXT",
          "nodeId": "at0027",
          "min": 0,
          "max": 1,
          "localizedNames": {
            "en": "Testing DV_CODED_TEXT"
          },
          "localizedDescriptions": {
            "en": "*"
          },
          "aqlPath": "/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0027]/value",
          "inputs": [
            {
              "suffix": "code",
              "type": "CODED_TEXT",
              "list": [
                {
                  "value": "at0028",
                  "label": "First",
                  "localizedLabels": {
                    "en": "First"
                  },
                  "localizedDescriptions": {
                    "en": "First item"
                  }
                },
                {
                  "value": "at0029",
                  "label": "Second",
                  "localizedLabels": {
                    "en": "Second"
                  },
                  "localizedDescriptions": {
                    "en": "Second item"
                  }
                }
              ],
              "defaultValue": "at0029"
            }
          ],
          "formId": "test_encounter/testing/testing/testing_dv_coded_text",
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
            }
          }
        }
      ]
    };

    var ctx = {
      language: 'en',
      getTerminologyList: function (terminologyStr, searchString, language, callbackFn) {
        setTimeout(function () {
          var res:any = [{
            "code": searchString + "A047",
            "description": searchString + "1"
          },
            {
              "code": searchString + "A052",
              "description": searchString + "2"
            },
            {
              "code": searchString + "A081",
              "description": searchString + "3"
            }];

          if (callbackFn) {
            callbackFn(res, language);
          }
        }, 1000);
      },
      getTerminologyItem: function (codeSystem, code, language, callbackFn) {
        setTimeout(function () {
          var res = {
            "code": code,
            "description": code + "_LABEL_" + language
          };
          if (callbackFn) {
            if (code === 'NFD') {
              res = null;
            }
            callbackFn(res, language);
          }
        }, 500);
        return;
      }
    };

    var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription(ctx, desc, {}, []);
    var terminFieldModel:CodedTextFieldModel = rm.findSuccessorWithPath('test_encounter/testing/testing/testing_dv_coded_text_with_terminology') as CodedTextFieldModel;

    expect(terminFieldModel).toBeTruthy();
    expect(terminFieldModel.labelValue('en')).toBe('value (A370)');
    var inputItemByCode = terminFieldModel.findInputItemByCode("A370");
    var inputItemByCodeNotFound = terminFieldModel.findInputItemByCode("NFD");
    expect(inputItemByCodeNotFound).toBeTruthy();
    expect(inputItemByCode).toBeTruthy();
    expect(inputItemByCode.status).toBe(InputItem.STATUS_LOADING);
    expect(inputItemByCodeNotFound.status).toBe(InputItem.STATUS_LOADING);

    setTimeout(function () {
      expect(terminFieldModel.labelValue('en')).toBe('A370_LABEL_en');
      expect(terminFieldModel.labelValue('sl')).toBe('A370_LABEL_en');
      expect(inputItemByCode.status).toBe(InputItem.STATUS_LOADING);
      setTimeout(function () {
        expect(terminFieldModel.labelValue('sl')).toBe('A370_LABEL_sl');
        expect(inputItemByCode.status).toBe(null);
        expect(inputItemByCodeNotFound.status).toBe(InputItem.STATUS_NOT_FOUND);
        done();
      }, 600)
    }, 600)

  });

  it("Input list from terminology", function (done) {
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
        "en"
      ],
      "children": [
        {
          "name": "Testing DV_CODED_TEXT with terminology",
          "localizedName": "Testing DV_CODED_TEXT with terminology",
          "rmType": "DV_CODED_TEXT",
          "nodeId": "at0030",
          "min": 0,
          "max": 1,
          "localizedNames": {
            "en": "Testing DV_CODED_TEXT with terminology"
          },
          "localizedDescriptions": {
            "en": "*"
          },
          "aqlPath": "/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0030]/value",
          "inputs": [
            {
              "suffix": "code",
              "type": "TEXT",
              "terminology": "ICD10",
              "defaultValue": "A370"
            },
            {
              "suffix": "value",
              "type": "TEXT",
              "terminology": "ICD10",
              "defaultValue": "defaultVal"
            }
          ],
          "formId": "test_encounter/testing/testing/testing_dv_coded_text_with_terminology",
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
            "field": {
              "code": {
                "presentation": "textfield"
              },
              "value": {
                "presentation": "textfield"
              }
            }
          }
        },
        {
          "name": "Testing DV_CODED_TEXT",
          "localizedName": "Testing DV_CODED_TEXT",
          "rmType": "DV_CODED_TEXT",
          "nodeId": "at0027",
          "min": 0,
          "max": 1,
          "localizedNames": {
            "en": "Testing DV_CODED_TEXT"
          },
          "localizedDescriptions": {
            "en": "*"
          },
          "aqlPath": "/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0027]/value",
          "inputs": [
            {
              "suffix": "code",
              "type": "CODED_TEXT",
              "list": [
                {
                  "value": "at0028",
                  "label": "First",
                  "localizedLabels": {
                    "en": "First"
                  },
                  "localizedDescriptions": {
                    "en": "First item"
                  }
                },
                {
                  "value": "at0029",
                  "label": "Second",
                  "localizedLabels": {
                    "en": "Second"
                  },
                  "localizedDescriptions": {
                    "en": "Second item"
                  }
                }
              ],
              "defaultValue": "at0029"
            }
          ],
          "formId": "test_encounter/testing/testing/testing_dv_coded_text",
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
            }
          }
        }
      ]
    };

    var ctx:any = {
      language: 'en',
      getTerminologyList: function (codeSystem, searchString, language, callbackFn) {
        setTimeout(function () {
          var res = [{
            "code": searchString + '_' + language + '_' + codeSystem + '_' + "A047",
            "description": searchString + "1"
          },
            {
              "code": searchString + '_' + language + '_' + codeSystem + '_' + "A052",
              "description": searchString + "2"
            },
            {
              "code": searchString + '_' + language + '_' + codeSystem + '_' + "A081",
              "description": searchString + "3"
            }];

          if (callbackFn) {
            callbackFn(res, language);
          }
        }, 50);
      },
      getTerminologyItem: function (codeSystem, code, language, callbackFn) {
        setTimeout(function () {
          var res = {
            "code": code,
            "description": code + "_LABEL_" + language
          };
          if (callbackFn) {
            callbackFn(res, language);
          }
        }, 20);
      }
    };

    var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription(ctx, desc, {}, []);
    var terminField:CodedTextFieldModel = rm.findSuccessorWithPath('test_encounter/testing/testing/testing_dv_coded_text_with_terminology') as CodedTextFieldModel;

    expect(terminField).toBeTruthy();
    expect(terminField.getInputFor('code')).toBeTruthy();
    expect(terminField.getInputFor('code').getTerminology()).toBeTruthy();
    terminField.getInputFor('code').getTerminologyItemsWithLabel('whooping');
    expect(terminField.getInputFor('code').getList().length).toBe(0);

    setTimeout(function () {
      expect(terminField.getInputFor('code').getList().length).toBe(3);
      expect(terminField.getInputFor('code').getList()[0].label).toBe('whooping1');
      expect(terminField.getInputFor('code').getList()[0].value).toBe('whooping_en_ICD10_A047');
      terminField.getInputFor('code').setTerminology('TRM_TEST');

      expect(terminField.getInputFor('code').getList().length).toBe(0);

      terminField.getInputFor('code').getTerminologyItemsWithLabel('whooping');

      setTimeout(function () {
        expect(terminField.getInputFor('code').getList().length).toBe(3);
        expect(terminField.getInputFor('code').getList()[0].label).toBe('whooping1');
        expect(terminField.getInputFor('code').getList()[0].value).toBe('whooping_en_TRM_TEST_A047');


        terminField.getInputFor('code').setTerminology('TRM_TEST_TWO', true);
        expect(terminField.getInputFor('code').getList().length).toBe(0);

        setTimeout(function () {
          expect(terminField.getInputFor('code').getList().length).toBe(3);
          expect(terminField.getInputFor('code').getList()[0].value).toBe('whooping_en_TRM_TEST_TWO_A047');

          ctx.language = 'sl';
          terminField.getInputFor('code').setContext(ctx);
          expect(terminField.getInputFor('code').getList().length).toBe(3);
          expect(terminField.getInputFor('code').getList()[0].value).toBe('whooping_en_TRM_TEST_TWO_A047');
          expect(terminField.getInputFor('code').getList()[0].label).toBe('whooping1');
          setTimeout(function () {
            expect(terminField.getInputFor('code').getList().length).toBe(3);
            expect(terminField.getInputFor('code').getList()[0].label).toBe('whooping_en_TRM_TEST_TWO_A047_LABEL_sl');
            expect(terminField.getInputFor('code').getList()[0].value).toBe('whooping_en_TRM_TEST_TWO_A047');

            setTimeout(function () {
              expect(terminField.getInputFor('code').getList().length).toBe(3);
              expect(terminField.getInputFor('code').getList()[0].label).toBe('whooping_en_TRM_TEST_TWO_A047_LABEL_sl');
              expect(terminField.getInputFor('code').getList()[0].value).toBe('whooping_en_TRM_TEST_TWO_A047');
              done();
            }, 60);

          }, 30);

        }, 60);

      }, 60);

    }, 60)

  });

  it("ThinkEhrUtil.toLocalTimezoneOffsetISOString for testing in +0100 timezone - adjust accordingly", function () {
   expect(ThinkEhrUtil.toLocalTimezoneOffsetISOString("2015-12-12T12:00:00")).toBe("2015-12-12T12:00:00.000+01:00");
   expect(ThinkEhrUtil.toLocalTimezoneOffsetISOString("2015-12-12T12:00")).toBe("2015-12-12T12:00:00.000+01:00");
   expect(ThinkEhrUtil.toLocalTimezoneOffsetISOString("2015-12-12T12:00:00.000")).toBe("2015-12-12T12:00:00.000+01:00");
   expect(ThinkEhrUtil.toLocalTimezoneOffsetISOString("2015-6-12T12:00:00.000")).toBe("2015-06-12T12:00:00.000+02:00");

   //if timezone offset is present then returns same value
   expect(ThinkEhrUtil.toLocalTimezoneOffsetISOString("2015-12-12T12:00:00.000+0100")).toBe("2015-12-12T12:00:00.000+0100");
   expect(ThinkEhrUtil.toLocalTimezoneOffsetISOString("2015-12-12T11:00:00.000Z")).toBe("2015-12-12T11:00:00.000Z");

   expect(new Date(ThinkEhrUtil.toLocalTimezoneOffsetISOString("2015-12-12T12:00:00")).getTime()).toBe(1449918000000);
   expect(new Date(ThinkEhrUtil.toLocalTimezoneOffsetISOString("2015-12-12T12:00")).getTime()).toBe(1449918000000);
   expect(new Date(ThinkEhrUtil.toLocalTimezoneOffsetISOString("2015-12-12T12:00:00.000")).getTime()).toBe(1449918000000);
   expect(new Date(ThinkEhrUtil.toLocalTimezoneOffsetISOString("2015-12-12T12:00:00.000+0100")).getTime()).toBe(1449918000000);
   expect(new Date(ThinkEhrUtil.toLocalTimezoneOffsetISOString("2015-12-12T11:00:00.000Z")).getTime()).toBe(1449918000000);
   expect(new Date("2015-12-12T11:00:00.000Z").getTime()).toBe(1449918000000);
   });

});


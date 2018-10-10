import {
  inject,
} from '@angular/core/testing';
import {ThinkEhrModelParser} from "../parsing/ThinkEhrModelParser";
import {RmContainerModel} from "./RmContainerModel";
import {FieldSize} from "../view/FieldSize";
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
import {BooleanFieldModel} from "./BooleanFieldModel";
import {FormObjectModel} from "./FormObjectModel";
import {DirectValueModel} from "./DirectValueModel";
import {CountFieldModel} from "./fieldModel/CountFieldModel";

describe('Model', () => {
  //let builder: TestComponentBuilder;
  let originalTimeout:number;
  let testingObj:any;

  beforeEach(inject([], function () {
    (new ThinkEhrModelParser(rmTypeModelDictionary) );
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

    if (!testingObj) {
      testingObj = {};
    }
  }));

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;

    testingObj = null;
  });


  var descJson:any = {
    "formId": "form_root",
    "name": "Form root",
    "rmType": "FORM_DEFINITION",
    "viewConfig": {
      "label": {
        "custom": true,
        "value": "Vitals",
        "useLocalizations": true,
        "localizationsList": {
          "sl": "Dogodek",
          "en": "Encounter"
        }
      },
      "size": {
        "field": "small",
        "label": "inherit"
      },
      "layout": {
        "label": {
          "valign": "inherit",
          "align": "left"
        },
        "field": {
          "valign": "inherit",
          "align": "inherit"
        }
      },
      "tags": []
    },
    "children": [
      {
        "localizedName": "Fieldset",
        "localizedNames": {
          "en": "Fieldset",
          "sl": "Fieldset"
        },
        "min": 0,
        "max": -1,
        "name": "Fieldset",
        "rmType": "GENERIC_FIELDSET",
        "formId": "generic_fieldset_5830",
        "viewConfig": {},
        "children": [
          {
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
                        "max": 1
                      }
                    }
                  }
                ],
                defaultValue: "°C"
              }
            ],
            "formId": "vitals/vitals/body_temperature/any_event/temperature",
            "viewConfig": {
              "field": {
                "unit": {
                  "presentation": "combobox"
                }
              },
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
                "label": "4"
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
              }
            }
          },
          {
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
                defaultValue: "at0.64"
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
                "field": "inherit",
                "label": "3"
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
          }
        ]
      }
    ]
  };
  var descJsonTempArray:any = {
    "name": "Form root",
    "rmType": "FORM_DEFINITION",
    "viewConfig": {
      "label": {
        "custom": true,
        "value": "Vitals",
        "useLocalizations": true,
        "localizationsList": {
          "sl": "Dogodek",
          "en": "Encounter"
        }
      },
      "size": {
        "field": "small",
        "label": "inherit"
      },
      "layout": {
        "label": {
          "valign": "inherit",
          "align": "left"
        },
        "field": {
          "valign": "inherit",
          "align": "inherit"
        }
      },
      "tags": []
    },
    "children": [
      {
        "localizedName": "Fieldset",
        "localizedNames": {
          "en": "Fieldset",
          "sl": "Fieldset"
        },
        "min": 0,
        "max": -1,
        "name": "Fieldset",
        "rmType": "GENERIC_FIELDSET",
        "formId": null,
        "viewConfig": {},
        "children": [
          {

            "name": "Temperature",
            "localizedName": "Temperature",
            "rmType": "DV_QUANTITY",
            "nodeId": "at0004",
            "min": 0,
            "max": 4,
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
                        "max": 1
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
                "max": "4"
              },
              "size": {
                "field": "inherit",
                "label": "4"
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
              "tags": ["multi"],
              "datasource": {
                "loadRemote": false,
                "loadRemoteUrl": ""
              }
            }
          },
          {
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
                ]
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
              "tags": ["multi"],
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
          }
        ]
      }
    ]
  };

  var descJsonRmContainers:any = {
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
        "label": "inherit"
      },
      "layout": {
        "valign": "inherit",
        "align": "inherit"
      },
      "tags": []
    },
    "children": [
      {
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
        "children": [
          {
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
            "children": [
              {
                "name": "Temperature",
                "localizedName": "Temperature",
                "rmType": "DV_QUANTITY",
                "nodeId": "at0004",
                "min": 0,
                "max": 4,
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
                            "max": 1
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
                  }

                }
              },
              {
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
                    ]
                  }
                ],
                "formId": "vitals/vitals/body_temperature/any_event/symptoms",
                "viewConfig": {}
              }
            ],
            "formId": "vitals/vitals/body_temperature/any_event",
            "viewConfig": {}
          }
        ],
        "formId": "vitals/vitals/body_temperature",
        "viewConfig": {}
      }
    ]
  };

  var descFromRoot:any = {
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
        "label": "inherit"
      },
      "layout": {
        "valign": "inherit",
        "align": "inherit"
      },
      "tags": []
    },
    "children": [
      {
        "name": "Vitals",
        "localizedName": "Vitals",
        "rmType": "COMPOSITION",
        "nodeId": "openEHR-EHR-COMPOSITION.encounter.v1",
        "min": 1,
        "max": 1,
        "localizedNames": {
          "sl": "Encounter",
          "en": "Encounter"
        },
        "aqlPath": "",
        "children": [
          {
            "name": "Vitals",
            "localizedName": "Vitals",
            "rmType": "SECTION",
            "nodeId": "openEHR-EHR-SECTION.ispek_dialog.v1",
            "min": 0,
            "max": 1,
            "localizedNames": {
              "sl": "Dialog",
              "en": "Dialog"
            },
            "aqlPath": "/content[openEHR-EHR-SECTION.ispek_dialog.v1,'Vitals']",
            "children": [
              {
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
                "children": [
                  {
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
                    "children": [
                      {
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
                                    "max": 1
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
                          }
                        }
                      },
                      {
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
                            ]
                          }
                        ],
                        "formId": "vitals/vitals/body_temperature/any_event/symptoms",
                        "viewConfig": {}
                      },
                      {

                        "name": "Body exposure",
                        "localizedName": "Body exposure",
                        "rmType": "DV_CODED_TEXT",
                        "nodeId": "at0030",
                        "min": 0,
                        "max": 2,
                        "dependsOn": [
                          "symptoms",
                          "temperature"
                        ],
                        "localizedNames": {
                          "sl": "Obleka",
                          "en": "Body exposure"
                        },
                        "aqlPath": "/content[openEHR-EHR-SECTION.ispek_dialog.v1,'Vitals']/items[openEHR-EHR-OBSERVATION.body_temperature-zn.v1]/data[at0002]/events[at0003]/state[at0029]/items[at0030]/value",
                        "inputs": [
                          {
                            "suffix": "code",
                            "type": "CODED_TEXT",
                            "list": [
                              {
                                "value": "at0031",
                                "label": "Naked",
                                "localizedLabels": {
                                  "sl": "Nag",
                                  "en": "Naked"
                                }
                              },
                              {
                                "value": "at0032",
                                "label": "Reduced clothing/bedding",
                                "localizedLabels": {
                                  "sl": "Premalo oblečen (zavit)",
                                  "en": "Reduced clothing/bedding"
                                }
                              },
                              {
                                "value": "at0033",
                                "label": "Appropriate clothing/bedding",
                                "localizedLabels": {
                                  "sl": "Primerno oblečen (zavit)",
                                  "en": "Appropriate clothing/bedding"
                                }
                              },
                              {
                                "value": "at0034",
                                "label": "Increased clothing/bedding",
                                "localizedLabels": {
                                  "sl": "Preveč oblečen (zavit)",
                                  "en": "Increased clothing/bedding"
                                }
                              }
                            ],
                            "defaultValue": "at0033"
                          }
                        ],
                        "formId": "vitals/vitals/body_temperature/any_event/body_exposure",
                        "viewConfig": {}
                      }
                    ],
                    "formId": "vitals/vitals/body_temperature/any_event",
                    "viewConfig": {}
                  }
                ],
                "formId": "vitals/vitals/body_temperature",
                "viewConfig": {}
              }
            ],
            "formId": "vitals/vitals",
            "viewConfig": {}
          }
        ],
        "formId": "vitals",
        "viewConfig": {}
      }
    ]
  };

  var descFromRootMulti:any = {
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
        "label": "inherit"
      },
      "layout": {
        "valign": "inherit",
        "align": "inherit"
      },
      "tags": []
    },
    "children": [
      {
        "name": "Vitals",
        "localizedName": "Vitals",
        "rmType": "COMPOSITION",
        "nodeId": "openEHR-EHR-COMPOSITION.encounter.v1",
        "min": 1,
        "max": 1,
        "localizedNames": {
          "sl": "Encounter",
          "en": "Encounter"
        },
        "aqlPath": "",
        "children": [
          {
            "name": "Vitals",
            "localizedName": "Vitals",
            "rmType": "SECTION",
            "nodeId": "openEHR-EHR-SECTION.ispek_dialog.v1",
            "min": 0,
            "max": 10,
            "localizedNames": {
              "sl": "Dialog",
              "en": "Dialog"
            },
            "aqlPath": "/content[openEHR-EHR-SECTION.ispek_dialog.v1,'Vitals']",
            "children": [
              {
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
                "children": [
                  {
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
                    "children": [
                      {
                        "name": "Temperature",
                        "localizedName": "Temperature",
                        "rmType": "DV_QUANTITY",
                        "nodeId": "at0004",
                        "min": 0,
                        "max": -1,
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
                                    "max": 1
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
                          tags: ["multi"]
                        }
                      },
                      {
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
                            ]
                          }
                        ],
                        "formId": "vitals/vitals/body_temperature/any_event/symptoms",
                        "viewConfig": {}
                      },
                      {

                        "name": "Body exposure",
                        "localizedName": "Body exposure",
                        "rmType": "DV_CODED_TEXT",
                        "nodeId": "at0030",
                        "min": 0,
                        "max": 2,
                        "dependsOn": [
                          "symptoms",
                          "temperature"
                        ],
                        "localizedNames": {
                          "sl": "Obleka",
                          "en": "Body exposure"
                        },
                        "aqlPath": "/content[openEHR-EHR-SECTION.ispek_dialog.v1,'Vitals']/items[openEHR-EHR-OBSERVATION.body_temperature-zn.v1]/data[at0002]/events[at0003]/state[at0029]/items[at0030]/value",
                        "inputs": [
                          {
                            "suffix": "code",
                            "type": "CODED_TEXT",
                            "list": [
                              {
                                "value": "at0031",
                                "label": "Naked",
                                "localizedLabels": {
                                  "sl": "Nag",
                                  "en": "Naked"
                                }
                              },
                              {
                                "value": "at0032",
                                "label": "Reduced clothing/bedding",
                                "localizedLabels": {
                                  "sl": "Premalo oblečen (zavit)",
                                  "en": "Reduced clothing/bedding"
                                }
                              },
                              {
                                "value": "at0033",
                                "label": "Appropriate clothing/bedding",
                                "localizedLabels": {
                                  "sl": "Primerno oblečen (zavit)",
                                  "en": "Appropriate clothing/bedding"
                                }
                              },
                              {
                                "value": "at0034",
                                "label": "Increased clothing/bedding",
                                "localizedLabels": {
                                  "sl": "Preveč oblečen (zavit)",
                                  "en": "Increased clothing/bedding"
                                }
                              }
                            ],
                            "defaultValue": "at0033"
                          }
                        ],
                        "formId": "vitals/vitals/body_temperature/any_event/body_exposure",
                        "viewConfig": {
                          tags: ["multi"]
                        }
                      }
                    ],
                    "formId": "vitals/vitals/body_temperature/any_event",
                    "viewConfig": {
                      tags: ["multi"]
                    }
                  }
                ],
                "formId": "vitals/vitals/body_temperature",
                "viewConfig": {
                  tags: ["multi"]
                }
              }
            ],
            "formId": "vitals/vitals",
            "viewConfig": {
              tags: ["multi"]
            }
          }
        ],
        "formId": "vitals",
        "viewConfig": {
          tags: ["multi"]
        }
      }
    ]
  };

  var descFromRootMulti2:any = {
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
        "label": "inherit"
      },
      "layout": {
        "valign": "inherit",
        "align": "inherit"
      },
      "tags": []
    },
    "children": [
      {
        "name": "Vitals",
        "localizedName": "Vitals",
        "rmType": "COMPOSITION",
        "nodeId": "openEHR-EHR-COMPOSITION.encounter.v1",
        "min": 1,
        "max": 1,
        "localizedNames": {
          "sl": "Encounter",
          "en": "Encounter"
        },
        "aqlPath": "",
        "children": [
          {
            "name": "Vitals",
            "localizedName": "Vitals",
            "rmType": "SECTION",
            "nodeId": "openEHR-EHR-SECTION.ispek_dialog.v1",
            "min": 0,
            "max": 10,
            "localizedNames": {
              "sl": "Dialog",
              "en": "Dialog"
            },
            "aqlPath": "/content[openEHR-EHR-SECTION.ispek_dialog.v1,'Vitals']",
            "children": [
              {
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
                "children": [
                  {
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
                    "children": [
                      {
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
                                    "max": 1
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
                          }
                        }
                      },
                      {
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
                            ]
                          }
                        ],
                        "formId": "vitals/vitals/body_temperature/any_event/symptoms",
                        "viewConfig": {}
                      },
                      {

                        "name": "Body exposure",
                        "localizedName": "Body exposure",
                        "rmType": "DV_CODED_TEXT",
                        "nodeId": "at0030",
                        "min": 0,
                        "max": 2,
                        "dependsOn": [
                          "symptoms",
                          "temperature"
                        ],
                        "localizedNames": {
                          "sl": "Obleka",
                          "en": "Body exposure"
                        },
                        "aqlPath": "/content[openEHR-EHR-SECTION.ispek_dialog.v1,'Vitals']/items[openEHR-EHR-OBSERVATION.body_temperature-zn.v1]/data[at0002]/events[at0003]/state[at0029]/items[at0030]/value",
                        "inputs": [
                          {
                            "suffix": "code",
                            "type": "CODED_TEXT",
                            "list": [
                              {
                                "value": "at0031",
                                "label": "Naked",
                                "localizedLabels": {
                                  "sl": "Nag",
                                  "en": "Naked"
                                }
                              },
                              {
                                "value": "at0032",
                                "label": "Reduced clothing/bedding",
                                "localizedLabels": {
                                  "sl": "Premalo oblečen (zavit)",
                                  "en": "Reduced clothing/bedding"
                                }
                              },
                              {
                                "value": "at0033",
                                "label": "Appropriate clothing/bedding",
                                "localizedLabels": {
                                  "sl": "Primerno oblečen (zavit)",
                                  "en": "Appropriate clothing/bedding"
                                }
                              },
                              {
                                "value": "at0034",
                                "label": "Increased clothing/bedding",
                                "localizedLabels": {
                                  "sl": "Preveč oblečen (zavit)",
                                  "en": "Increased clothing/bedding"
                                }
                              }
                            ],
                            "defaultValue": "at0033"
                          }
                        ],
                        "formId": "vitals/vitals/body_temperature/any_event/body_exposure",
                        "viewConfig": {}
                      }
                    ],
                    "formId": "vitals/vitals/body_temperature/any_event",
                    "viewConfig": {
                      tags: ["multi"]
                    }
                  }
                ],
                "formId": "vitals/vitals/body_temperature",
                "viewConfig": {
                  tags: ["multi"]
                }
              }
            ],
            "formId": "vitals/vitals",
            "viewConfig": {
              tags: ["multi"]
            }
          }
        ],
        "formId": "vitals",
        "viewConfig": {
          tags: ["multi"]
        }
      }
    ]
  };

  var descJsonRmContainersMulti2:any = {
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
        "label": "inherit"
      },
      "layout": {
        "valign": "inherit",
        "align": "inherit"
      },
      "tags": []
    },
    "children": [
      {
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
        "children": [
          {
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
            "children": [
              {
                "name": "Temperature",
                "localizedName": "Temperature",
                "rmType": "DV_QUANTITY",
                "nodeId": "at0004",
                "min": 0,
                "max": 4,
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
                            "max": 1
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
                  tags: ["multi"]
                }
              },
              {
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
                    ]
                  }
                ],
                "formId": "vitals/vitals/body_temperature/any_event/symptoms",
                "viewConfig": {
                  tags: ["multi"]
                }
              }
            ],
            "formId": "vitals/vitals/body_temperature/any_event",
            "viewConfig": {
              tags: ["multi"]
            }
          }
        ],
        "formId": "vitals/vitals/body_temperature",
        "viewConfig": {
          tags: ["multi"]
        }
      }
    ]
  };

  var tagsAnnotationsDesc:any = {
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
        "label": "inherit"
      },
      "layout": {
        "valign": "inherit",
        "align": "inherit"
      },
      "tags": []
    },
    "children": [
      {
        "name": "Body exposure",
        "localizedName": "Body exposure",
        "rmType": "DV_CODED_TEXT",
        "nodeId": "at0030",
        "min": "0",
        "max": "1",
        "dependsOn": [
          "temperature"
        ],
        "localizedNames": {
          "sl": "Obleka",
          "en": "Body exposure"
        },
        "aqlPath": "/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]/state[at0029]/items[at0030]/value",
        "inputs": [
          {
            "suffix": "code",
            "type": "CODED_TEXT",
            "list": [
              {
                "value": "at0031",
                "label": "Naked",
                "localizedLabels": {
                  "sl": "Gol",
                  "en": "Naked"
                }
              },
              {
                "value": "at0032",
                "label": "Reduced clothing/bedding",
                "localizedLabels": {
                  "sl": "Premalo oblečen (zavit)",
                  "en": "Reduced clothing/bedding"
                }
              },
              {
                "value": "at0033",
                "label": "Appropriate clothing/bedding",
                "localizedLabels": {
                  "sl": "Primerno oblečen (zavit)",
                  "en": "Appropriate clothing/bedding"
                }
              },
              {
                "value": "at0034",
                "label": "Increased clothing/bedding",
                "localizedLabels": {
                  "sl": "Preveč oblečen (zavit)",
                  "en": "Increased clothing/bedding"
                }
              }
            ],
            "defaultValue": "at0033"
          }
        ],
        "formId": "vital_signs/body_temperature/any_event/body_exposure",
        "viewConfig": {
          "advanced": {
            "hidden": false,
            "readonly": false
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
          "tags": [
            "2 col",
            "multi",
            "xcustom"
          ],
          "datasource": {
            "loadRemote": false,
            "loadRemoteUrl": ""
          },
          "annotations": {
            "display_ordinal": "true",
            "lines": "1"
          },
          field: {
            "code": {
              "presentation": "combobox",
              "columns": "4"
            }
          }
        }
      },
      {
        "name": "Diastolic endpoint",
        "localizedName": "Diastolic endpoint",
        "rmType": "DV_CODED_TEXT",
        "nodeId": "at1010",
        "min": "0",
        "max": "1",
        "dependsOn": [
          "any_event"
        ],
        "localizedNames": {
          "sl": "*Diastolic endpoint(en)",
          "en": "Diastolic endpoint"
        },
        "aqlPath": "/content[openEHR-EHR-OBSERVATION.blood_pressure.v1]/protocol[at0011]/items[at1010]/value",
        "inputs": [
          {
            "suffix": "code",
            "type": "CODED_TEXT",
            "list": [
              {
                "value": "at1011",
                "label": "Phase IV",
                "localizedLabels": {
                  "sl": "*Phase IV(en)",
                  "en": "Phase IV"
                }
              },
              {
                "value": "at1012",
                "label": "Phase V",
                "localizedLabels": {
                  "sl": "*Phase V(en)",
                  "en": "Phase V"
                }
              }
            ],
            "defaultValue": "at1011"
          }
        ],
        "formId": "vital_signs/blood_pressure/diastolic_endpoint",
        "viewConfig": {
          "advanced": {
            "hidden": false,
            "readonly": false
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
          "annotations": {
            "columns": "2"
          },
          field: {
            "code": {
              "presentation": "radios",
              "columns": "4"
            }
          }
        }
      }
    ]
  };

  var descJsonRmContainersMulti:any = {
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
        "label": "inherit"
      },
      "layout": {
        "valign": "inherit",
        "align": "inherit"
      },
      "tags": []
    },
    "children": [
      {
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
        "children": [
          {
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
            "children": [
              {
                "name": "Temperature",
                "localizedName": "Temperature",
                "rmType": "DV_QUANTITY",
                "nodeId": "at0004",
                "min": 0,
                "max": 4,
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
                            "max": 1
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
                  }
                }
              },
              {
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
                    ]
                  }
                ],
                "formId": "vitals/vitals/body_temperature/any_event/symptoms",
                "viewConfig": {
                  tags: ["multi"]
                }
              }
            ],
            "formId": "vitals/vitals/body_temperature/any_event",
            "viewConfig": {
              tags: ["multi"]
            }
          }
        ],
        "formId": "vitals/vitals/body_temperature",
        "viewConfig": {
          tags: ["multi"]
        }
      }
    ]
  };

  it("Parse 2 Field JSON with Inputs - No Values", function () {

    var context:any = {};
    var values:any = {};
    var rootModel:FormRootModel = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription(context, descJson, values, null) as FormRootModel;

    expect(rootModel instanceof FormRootModel).toBeTruthy();
    expect(rootModel.getRmType()).toBe(RmType.FORM_DEFINITION);
    expect(rootModel.getName()).toBe("Form root");
    expect(rootModel.getFormId()).toBe("form_root");
    expect(rootModel.getViewConfig() instanceof ViewConfig).toBeTruthy();
    expect(rootModel.getViewConfig().getLabel() instanceof Label).toBeTruthy();
    expect(rootModel.getViewConfig().getLabel().isCustom()).toBeTruthy();
    expect(rootModel.getViewConfig().getLabel().getValue()).toBe("Vitals");
    expect(rootModel.getViewConfig().getLabel().isUseLocalizations()).toBeTruthy();
    expect(rootModel.getViewConfig().getLabel().getLocalization("sl")).toBe("Dogodek");
    expect(rootModel.getViewConfig().getSize() instanceof Size).toBeTruthy();
    expect(rootModel.getViewConfig().getSize().getField()).toBe(FieldSize.SMALL);
    expect(rootModel.getViewConfig().getSize().getLabel()).toBe(LabelSize.INHERIT);
    expect(rootModel.getViewConfig().getLayout() instanceof Layout).toBeTruthy();
    expect(rootModel.getViewConfig().getLayout().getLabelHorizontalAlignment()).toBe(LabelHorizontalAlignment.LEFT);
    expect(rootModel.getViewConfig().getLayout().getFieldVerticalAlignment()).toBe(FieldVerticalAlignment.INHERIT);
    expect(rootModel.getChildCount()).toBe(1);
    expect(rootModel.getValueNodeRef()).toBe(values);

    var gfsModel:GenericFieldsetModel = rootModel.getChildModel(0) as GenericFieldsetModel;
    expect(gfsModel instanceof GenericFieldsetModel).toBeTruthy();
    expect(gfsModel.getRmType()).toBe(RmType.GENERIC_FIELDSET);
    expect(gfsModel.getName()).toBe("Fieldset");
    expect(gfsModel.getFormId()).toBe("generic_fieldset_5830");
    expect(gfsModel.getPath()).toBe(gfsModel.getFormId());
    expect(gfsModel.getMin()).toBe(0);
    expect(gfsModel.getMax()).toBe(-1);
    expect(gfsModel.getViewConfig() instanceof ViewConfig).toBeTruthy();
    expect(gfsModel.getViewConfig().getLabel()).toBeUndefined();
    expect(gfsModel.getViewConfig().getSize(false)).toBeUndefined();
    expect(gfsModel.getViewConfig().getSize() instanceof Size).toBeTruthy();
    expect(gfsModel.getViewConfig().getSize().getField()).toBe(FieldSize.SMALL);
    expect(gfsModel.getViewConfig().getLayout(false)).toBeUndefined();
    expect(gfsModel.getViewConfig().getLayout() instanceof Layout).toBeTruthy();
    expect(gfsModel.getViewConfig().getLayout().getLabelHorizontalAlignment()).toBe(LabelHorizontalAlignment.LEFT);
    expect(gfsModel.getChildCount()).toBe(2);
    expect(gfsModel.getParentModel()).toBe(rootModel);
    expect(gfsModel.getValueNodeRef()).toBeUndefined();
    expect(gfsModel.getValueNodeParentRef()).toBeUndefined();

    var qfModel:QuantityFieldModel = gfsModel.getChildModel(0) as QuantityFieldModel;
    expect(qfModel instanceof QuantityFieldModel).toBeTruthy();
    expect(qfModel.getRmType()).toBe(RmType.DV_QUANTITY);
    expect(qfModel.getName()).toBe("Temperature");
    expect(qfModel.getLocalizedName("sl")).toBe("Telesna temperatura");
    expect(qfModel.getFormId()).toBe(qfModel.getPath());
    expect(qfModel.getPath()).toBe("vitals/vitals/body_temperature/any_event/temperature");
    expect(qfModel.getMin()).toBe(0);
    expect(qfModel.getMax()).toBe(1);
    expect(qfModel.getNodeId()).toBe("at0004");
    expect(qfModel.getAqlPath()).toBe("/content[openEHR-EHR-SECTION.ispek_dialog.v1,'Vitals']/items[openEHR-EHR-OBSERVATION.body_temperature-zn.v1]/" +
      "data[at0002]/events[at0003]/data[at0001]/items[at0004]/value");
    expect(qfModel.getViewConfig() instanceof ViewConfig).toBeTruthy();
    expect(qfModel.getViewConfig().getLabel() instanceof Label).toBeTruthy();
    expect(qfModel.getViewConfig().getLabel().isCustom()).toBeFalsy();
    expect(qfModel.getViewConfig().getLabel().getValue()).toBe("");
    expect(qfModel.getViewConfig().getSize() instanceof Size).toBeTruthy();
    expect(qfModel.getViewConfig().getSize().getField()).toBe(FieldSize.SMALL);
    expect(qfModel.getViewConfig().getSize(false).getField(false)).toBe(FieldSize.INHERIT);
    expect(qfModel.getViewConfig().getSize().getLabel()).toBe(LabelSize[LabelSize.COLUMN_4]);
    expect(qfModel.getViewConfig().getLayout() instanceof Layout).toBeTruthy();
    expect(qfModel.getViewConfig().getLayout().getLabelHorizontalAlignment()).toBe(LabelHorizontalAlignment.LEFT);
    expect(qfModel.getViewConfig().getLayout().getFieldVerticalAlignment()).toBe(FieldVerticalAlignment.INHERIT);
    expect(qfModel.getViewConfig().getMin()).toBe(0);
    expect(qfModel.getViewConfig().getMax()).toBe(1);
    expect(qfModel.getViewConfig().isHidden()).toBeFalsy();
    expect(qfModel.getViewConfig().isReadOnly()).toBeTruthy();
    expect(qfModel.getViewConfig().getFields() instanceof Field).toBeTruthy();
    expect(qfModel.getViewConfig().getFields().getPresentation()).toBe(FieldPresentation.COMBOBOX);
    expect(qfModel.getChildCount()).toBe(0);
    expect(qfModel.getInputs().length).toBe(2);
    expect(qfModel.getInput(0) instanceof Input).toBeTruthy();
    expect(qfModel.getInput(0).getSuffix()).toBe("magnitude");
    expect(qfModel.getInput(0).getType()).toBe(InputType.DECIMAL);
    expect(qfModel.getInput(0).getList().length).toBe(0);
    expect(qfModel.getInput(1) instanceof Input).toBeTruthy();
    expect(qfModel.getInput(1).getSuffix()).toBe("unit");
    expect(qfModel.getInput(1).getType()).toBe(InputType.CODED_TEXT);
    expect(qfModel.getInput(1).getList().length).toBe(2);
    expect(qfModel.getInput(1).getItem(0) instanceof InputItem).toBeTruthy();
    expect(qfModel.getInput(1).getItem(0).getValue()).toBe("°C");
    expect(qfModel.getInput(1).getItem(0).getLabel()).toBe("°C");
    expect(qfModel.getInput(1).getItem(0).getValidation() instanceof Validation).toBeTruthy();
    expect(qfModel.getInput(1).getItem(0).getValidation().getPrecision().min).toBe(1);
    expect(qfModel.getInput(1).getItem(0).getValidation().getPrecision().max).toBe(1);
    expect(qfModel.getInput(1).getItem(1) instanceof InputItem).toBeTruthy();
    expect(qfModel.getInput(1).getItem(1).getValue()).toBe("°F");
    expect(qfModel.getInput(1).getItem(1).getLabel()).toBe("°F");
    expect(qfModel.getInput(1).getItem(1).getValidation() instanceof Validation).toBeTruthy();
    expect(qfModel.getInput(1).getItem(1).getValidation().getPrecision().min).toBe(1);
    expect(qfModel.getInput(1).getItem(1).getValidation().getPrecision().max).toBe(1);
    expect(qfModel.getInputFor("unit").getDefaultValue()).toBe("°C");
    expect(qfModel.getValueNodeRef()).toBeNull();
    expect(qfModel.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event[0].temperature);
    expect(ThinkEhrUtil.isArray(qfModel.getValueNodeParentRef())).toBeTruthy();
    expect(qfModel.getValueNodeParentRef().length).toBe(0);

    var ctModel:CodedTextFieldModel = gfsModel.getChildModel(1) as CodedTextFieldModel;
    expect(ctModel instanceof CodedTextFieldModel).toBeTruthy();
    expect(ctModel.getRmType()).toBe(RmType.DV_CODED_TEXT);
    expect(ctModel.getName()).toBe("Symptoms");
    expect(ctModel.getLocalizedName("sl")).toBe("Ugotovitve");
    expect(ctModel.getFormId()).toBe("vitals/vitals/body_temperature/any_event/symptoms");
    expect(ctModel.getPath()).toBe("vitals/vitals/body_temperature/any_event/symptoms");
    expect(ctModel.getMin()).toBe(0);
    expect(ctModel.getMax()).toBe(2);
    expect(ctModel.isMulti()).toBeTruthy();
    expect(ctModel.getNodeId()).toBe("at0.63");
    expect(ctModel.getAqlPath()).toBe("/content[openEHR-EHR-SECTION.ispek_dialog.v1,'Vitals']/items[openEHR-EHR-OBSERVATION.body_temperature-zn.v1]/data[at0002]/events[at0003]/data[at0001]/items[at0.63]/value");
    expect(ctModel.getViewConfig() instanceof ViewConfig).toBeTruthy();
    expect(ctModel.getViewConfig().getLabel() instanceof Label).toBeTruthy();
    expect(ctModel.getViewConfig().getLabel().isCustom()).toBeFalsy();
    expect(ctModel.getViewConfig().getLabel().getValue()).toBe("");
    expect(ctModel.getViewConfig().getSize() instanceof Size).toBeTruthy();
    expect(ctModel.getViewConfig().getSize().getField()).toBe(FieldSize.SMALL);
    expect(ctModel.getViewConfig().getSize(false).getField(false)).toBe(FieldSize.INHERIT);
    expect(ctModel.getViewConfig().getSize().getLabel()).toBe(LabelSize[LabelSize.COLUMN_3]);
    expect(ctModel.getViewConfig().getLayout() instanceof Layout).toBeTruthy();
    expect(ctModel.getViewConfig().getLayout().getLabelHorizontalAlignment()).toBe(LabelHorizontalAlignment.LEFT);
    expect(ctModel.getViewConfig().getLayout(false).getLabelHorizontalAlignment(false)).toBe(LabelHorizontalAlignment.INHERIT);
    expect(ctModel.getViewConfig().getLayout().getFieldVerticalAlignment()).toBe(FieldVerticalAlignment.INHERIT);
    expect(ctModel.getViewConfig().getMin()).toBe(0);
    expect(ctModel.getViewConfig().getMax()).toBe(2);
    expect(ctModel.getViewConfig().isHidden()).toBeFalsy();
    expect(ctModel.getViewConfig().isReadOnly()).toBeFalsy();
    expect(ctModel.getViewConfig().getFields() instanceof Field).toBeTruthy();
    expect(ctModel.getViewConfig().getFields().getPresentation()).toBe(FieldPresentation.RADIOS);
    expect(ctModel.getViewConfig().getFields().getColumns()).toBe(4);
    expect(ctModel.getChildCount()).toBe(0);
    expect(ctModel.getInputs().length).toBe(1);
    expect(ctModel.getInput(0) instanceof Input).toBeTruthy();
    expect(ctModel.getInput(0).getSuffix()).toBe("code");
    expect(ctModel.getInput(0).getType()).toBe(InputType.CODED_TEXT);
    expect(ctModel.getInput(0).getList().length).toBe(2);
    expect(ctModel.getInput(0).getItem(0) instanceof InputItem).toBeTruthy();
    expect(ctModel.getInput(0).getItem(0).getValue()).toBe("at0.64");
    expect(ctModel.getInput(0).getItem(0).getLabel()).toBe("Chills / rigor / shivering");
    expect(ctModel.getInput(0).getItem(0).getLabel("sl")).toBe("Mrazenje/mrzlica");
    expect(ctModel.getInput(0).getItem(0).getValidation()).toBeUndefined();
    expect(ctModel.getInput(0).getItem(1) instanceof InputItem).toBeTruthy();
    expect(ctModel.getInput(0).getItem(1).getValue()).toBe("at0.65");
    expect(ctModel.getInput(0).getItem(1).getLabel()).toBe("Goose- bumps");
    expect(ctModel.getInput(0).getItem(1).getLabel("sl")).toBe("Kurja polt");
    expect(ctModel.getInput(0).getItem(1).getValidation()).toBeUndefined();
    expect(ctModel.getInputFor("code").getDefaultValue()).toBe("at0.64");
    expect(ctModel.getValueNodeRef().length).toBe(0);
    expect(ctModel.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event[0]);///.symptoms);
    expect(ThinkEhrUtil.isObject(ctModel.getValueNodeParentRef())).toBeTruthy();
    expect(ctModel.getValueNodeParentRef()["symptoms"].length).toBe(0);
  });

  it("Parse Root Object Not FORM_DEFINITION", function () {
    var descJson = {
      rmType: "WHATEVER"
    };

    expect(function () {
      var context = {};
      (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription(context, descJson, {}, null);
    }).toThrowError("Root element is not form definition");
  });

  it("Parse Values 2 Fields Single Values Only", function () {
    var values:any = {
      "vitals": {
        "_link": [
          {
            "|meaning": "Follow up to",
            "|type": "Problem",
            "|target": "ehr://01dc58f3-3659-4ddc-b192-79d21ce31d01"
          }
        ],
        "_uid": [
          "8e35d270-c34f-48a7-ae82-be73b09d448b::example::1"
        ],
        "context": [
          {
            "start_time": [
              "2014-08-12T15:14:35.851+02:00"
            ],
            "setting": [
              {
                "|code": "238",
                "|value": "other care",
                "|terminology": "openehr"
              }
            ]
          }
        ],
        "vitals": [
          {
            "_uid": [
              "18515ffb-3c48-40b0-9087-e2a7aec7c402"
            ],
            "haemoglobin_a1c": [
              {
                "_uid": [
                  "2cabd781-24db-486c-986b-19002e43b2ae"
                ],
                "_other_participation": [
                  {
                    "|function": "performer",
                    "|mode": "not specified",
                    "|name": "Nurse Bailey"
                  }
                ],
                "any_event": [
                  {
                    "test_name": [
                      "Test name 21"
                    ],
                    "diagnostic_service": [
                      "Diagnostic service 91"
                    ],
                    "test_status": [
                      {
                        "|code": "at0038",
                        "|value": "Final",
                        "|terminology": "local"
                      }
                    ],
                    "hba1c": [
                      {
                        "|numerator": "63.65",
                        "|denominator": "100.0",
                        "|null": "0.6365"
                      }
                    ],
                    "overall_interpretation": [
                      "Overall interpretation 77"
                    ],
                    "time": [
                      "2014-08-12T15:14:35.852+02:00"
                    ]
                  }
                ],
                "requestor_order_identifier": [
                  "Ident. 85"
                ],
                "receiver_order_identifier": [
                  "Ident. 22"
                ],
                "laboratory_test_result_identifier": [
                  "Ident. 66"
                ],
                "datetime_result_issued": [
                  "2014-08-12T15:14:35.852+02:00"
                ]
              }
            ],
            "body_temperature": [
              {
                "_uid": [
                  "476077c5-c0d1-419b-ba94-f832817c45f0"
                ],
                "_other_participation": [
                  {
                    "|function": "performer",
                    "|mode": "not specified",
                    "|name": "Nurse Bailey"
                  }
                ],
                "any_event": [
                  {
                    "temperature": [
                      {
                        "|magnitude": 33.3,
                        "|unit": "°C"
                      }
                    ],
                    "symptoms": [
                      {
                        "|code": "at0.64",
                        "|value": "Chills / rigor / shivering",
                        "|terminology": "local"
                      }
                    ],
                    "body_exposure": [
                      {
                        "|code": "at0033",
                        "|value": "Appropriate clothing/bedding",
                        "|terminology": "local"
                      }
                    ],
                    "description_of_thermal_stress": [
                      "Description of thermal stress 14"
                    ],
                    "time": [
                      "2014-08-12T15:14:35.853+02:00"
                    ]
                  }
                ],
                "site_of_measurement": [
                  {
                    "|code": "at0054",
                    "|value": "Oesophagus",
                    "|terminology": "local"
                  }
                ],
                "other_site_of_measurement": [
                  "Other site of measurement 3"
                ]
              }
            ]
          }
        ]
      }
    };

    var context = {};
    var rootModel:FormRootModel = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription(context, descJson, values, null) as FormRootModel;
    expect(rootModel instanceof FormRootModel).toBeTruthy();
    expect(rootModel.getValueNodeRef()).toBe(values);
    expect(rootModel.getValueNodeParentRef()).toBeUndefined();

    var gfsModel:GenericFieldsetModel = rootModel.getChildModel(0) as GenericFieldsetModel;
    expect(gfsModel instanceof GenericFieldsetModel).toBeTruthy();
    expect(gfsModel.getValueNodeRef()).toBeUndefined();
    expect(gfsModel.getValueNodeParentRef()).toBeUndefined();

    var qfModel:QuantityFieldModel = gfsModel.getChildModel(0) as QuantityFieldModel;
    expect(qfModel instanceof QuantityFieldModel).toBeTruthy();
    expect(qfModel.getValue()).toBeTruthy();
    expect(ThinkEhrUtil.isObject(qfModel.getValue())).toBeTruthy();
    expect(qfModel.getValue("magnitude")).toBeCloseTo(33.3);
    expect(qfModel.getValue("unit")).toBe("°C");
    expect(qfModel.getValueNodeRef()[0]).toBe(values.vitals.vitals[0].body_temperature[0].any_event[0].temperature[0]);
    expect(qfModel.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event[0].temperature);

    var ctModel:CodedTextFieldModel = gfsModel.getChildModel(1) as CodedTextFieldModel;
    expect(ctModel instanceof CodedTextFieldModel).toBeTruthy();
    expect(ctModel.getValue(undefined, 0)).toBeTruthy();
    expect(ctModel.isMulti()).toBeTruthy();
    expect(ThinkEhrUtil.isObject(ctModel.getValue(undefined, 0))).toBeTruthy();
    expect(ctModel.getValue("code",0)).toBe("at0.64");
    expect(ctModel.getValue("value",0)).toBe("Chills / rigor / shivering");
    expect(ctModel.getValue("terminology",0)).toBe("local");
    expect(ctModel.getInputFor("value")).toBeNull();
    expect(ctModel.getInputFor("terminology")).toBeNull();
    expect(ctModel.getValueNodeRef()[0]).toBe(values.vitals.vitals[0].body_temperature[0].any_event[0].symptoms[0]);
    expect(ctModel.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event[0]);///.symptoms);
  });

  it("Parse Values 2 Fields Where Leaf Values Are Arrays", function () {
    var values = {
      "vitals": {
        "_link": [
          {
            "|meaning": "Follow up to",
            "|type": "Problem",
            "|target": "ehr://01dc58f3-3659-4ddc-b192-79d21ce31d01"
          }
        ],
        "_uid": [
          "8e35d270-c34f-48a7-ae82-be73b09d448b::example::1"
        ],
        "context": [
          {
            "start_time": [
              "2014-08-12T15:14:35.851+02:00"
            ],
            "setting": [
              {
                "|code": "238",
                "|value": "other care",
                "|terminology": "openehr"
              }
            ]
          }
        ],
        "vitals": [
          {
            "_uid": [
              "18515ffb-3c48-40b0-9087-e2a7aec7c402"
            ],
            "haemoglobin_a1c": [
              {
                "_uid": [
                  "2cabd781-24db-486c-986b-19002e43b2ae"
                ],
                "_other_participation": [
                  {
                    "|function": "performer",
                    "|mode": "not specified",
                    "|name": "Nurse Bailey"
                  }
                ],
                "any_event": [
                  {
                    "test_name": [
                      "Test name 21"
                    ],
                    "diagnostic_service": [
                      "Diagnostic service 91"
                    ],
                    "test_status": [
                      {
                        "|code": "at0038",
                        "|value": "Final",
                        "|terminology": "local"
                      }
                    ],
                    "hba1c": [
                      {
                        "|numerator": "63.65",
                        "|denominator": "100.0",
                        "|null": "0.6365"
                      }
                    ],
                    "overall_interpretation": [
                      "Overall interpretation 77"
                    ],
                    "time": [
                      "2014-08-12T15:14:35.852+02:00"
                    ]
                  }
                ],
                "requestor_order_identifier": [
                  "Ident. 85"
                ],
                "receiver_order_identifier": [
                  "Ident. 22"
                ],
                "laboratory_test_result_identifier": [
                  "Ident. 66"
                ],
                "datetime_result_issued": [
                  "2014-08-12T15:14:35.852+02:00"
                ]
              }
            ],
            "body_temperature": [
              {
                "_uid": [
                  "476077c5-c0d1-419b-ba94-f832817c45f0"
                ],
                "_other_participation": [
                  {
                    "|function": "performer",
                    "|mode": "not specified",
                    "|name": "Nurse Bailey"
                  }
                ],
                "any_event": [
                  {
                    "temperature": [
                      {
                        "|magnitude": 33.3,
                        "|unit": "°C"
                      },
                      {
                        "|magnitude": 40.2,
                        "|unit": "°C"
                      },
                      {
                        "|magnitude": 41.7,
                        "|unit": "°F"
                      }
                    ],
                    "symptoms": [
                      {
                        "|code": "at0.64",
                        "|value": "Chills / rigor / shivering",
                        "|terminology": "local"
                      },
                      {
                        "|code": "at0.65",
                        "|value": "Goose-bumps",
                        "|terminology": "local"
                      }
                    ],
                    "body_exposure": [
                      {
                        "|code": "at0033",
                        "|value": "Appropriate clothing/bedding",
                        "|terminology": "local"
                      }
                    ],
                    "description_of_thermal_stress": [
                      "Description of thermal stress 14"
                    ],
                    "time": [
                      "2014-08-12T15:14:35.853+02:00"
                    ]
                  }
                ],
                "site_of_measurement": [
                  {
                    "|code": "at0054",
                    "|value": "Oesophagus",
                    "|terminology": "local"
                  }
                ],
                "other_site_of_measurement": [
                  "Other site of measurement 3"
                ]
              }
            ]
          }
        ]
      }
    };

    var context = {};
    var rootModel = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription(context, descJsonTempArray, values, null);
    expect(rootModel instanceof FormRootModel).toBeTruthy();
    expect(rootModel.getValueNodeRef()).toBe(values);
    expect(rootModel.getValueNodeParentRef()).toBeUndefined();

    var gfsModel:GenericFieldsetModel = rootModel.getChildModel(0) as GenericFieldsetModel;
    expect(gfsModel instanceof GenericFieldsetModel).toBeTruthy();
    expect(gfsModel.getValueNodeRef()).toBeUndefined();
    expect(gfsModel.getValueNodeParentRef()).toBeUndefined();


    var qfModel:QuantityFieldModel = gfsModel.getChildModel(0) as QuantityFieldModel;
    expect(qfModel instanceof QuantityFieldModel).toBeTruthy();
    expect(qfModel.getValue()).toBeTruthy();
    expect(ThinkEhrUtil.isArray(qfModel.getValue())).toBeTruthy();
    expect(qfModel.getValue().length).toBe(3);
    var v1 = qfModel.getValue()[0];
    expect(v1["|magnitude"]).toBeCloseTo(33.3);
    expect(v1["|unit"]).toBe("°C");
    var v2 = qfModel.getValue()[1];
    expect(v2["|magnitude"]).toBeCloseTo(40.2);
    expect(v2["|unit"]).toBe("°C");
    var v3 = qfModel.getValue()[2];
    expect(v3["|magnitude"]).toBeCloseTo(41.7);
    expect(v3["|unit"]).toBe("°F");
    expect(qfModel.getValueNodeRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event[0].temperature);
    expect(qfModel.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event[0]);

    var ctModel:CodedTextFieldModel = gfsModel.getChildModel(1) as CodedTextFieldModel;
    expect(ctModel instanceof CodedTextFieldModel).toBeTruthy();
    expect(ctModel.getValue()).toBeTruthy();
    expect(ThinkEhrUtil.isArray(ctModel.getValue())).toBeTruthy();
    expect(ctModel.getValue().length).toBe(2);
    var vv1 = ctModel.getValue()[0];
    expect(vv1["|code"]).toBe("at0.64");
    expect(vv1["|value"]).toBe("Chills / rigor / shivering");
    expect(vv1["|terminology"]).toBe("local");
    var vv2 = ctModel.getValue()[1];
    expect(vv2["|code"]).toBe("at0.65");
    expect(vv2["|value"]).toBe("Goose-bumps");
    expect(vv2["|terminology"]).toBe("local");
    expect(ctModel.getValueNodeRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event[0].symptoms);
    expect(ctModel.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event[0]);
    expect(ctModel.getInputFor("value")).toBeNull();
    expect(ctModel.getInputFor("terminology")).toBeNull();
  });

  it("Parse Values 2 Fields Inside Rm Containers - No Values", function () {
    var context = {};
    var values:any = {};
    var rootModel:FormRootModel = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription(context, descJsonRmContainers, values, null) as FormRootModel;
    expect(rootModel.getValueNodeRef()).toBe(values);
    expect(rootModel.getValueNodeParentRef()).toBeUndefined();

    expect(rootModel instanceof FormRootModel).toBeTruthy();
    expect(rootModel.getRmType()).toBe(RmType.FORM_DEFINITION);
    expect(rootModel.getChildCount()).toBe(1);

    var obsModel:RmContainerModel = rootModel.getChildModel(0) as RmContainerModel;
    expect(obsModel instanceof RmContainerModel).toBeTruthy();
    expect(obsModel.getRmType()).toBe(RmType.OBSERVATION);
    expect(obsModel.getPath()).toBe("vitals/vitals/body_temperature");
    expect(obsModel.getPath()).toBe("vitals/vitals/body_temperature");
    expect(obsModel.getChildCount()).toBe(1);
    expect(obsModel.getValueNodeRef()).toBe(values.vitals.vitals[0].body_temperature[0]);
    expect(obsModel.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature);
    expect(ThinkEhrUtil.isArray(obsModel.getValueNodeParentRef())).toBeTruthy();
    expect(obsModel.getValueNodeParentRef().length).toBe(1);

    var evModel:RmContainerModel = obsModel.getChildModel(0) as RmContainerModel;
    expect(evModel instanceof RmContainerModel).toBeTruthy();
    expect(evModel.getRmType()).toBe(RmType.EVENT);
    expect(evModel.getPath()).toBe("vitals/vitals/body_temperature/any_event");
    expect(evModel.getPath()).toBe("vitals/vitals/body_temperature/any_event");
    expect(evModel.getChildCount()).toBe(2);
    expect(evModel.getValueNodeRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event[0]);
    expect(evModel.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event);
    expect(ThinkEhrUtil.isArray(evModel.getValueNodeParentRef())).toBeTruthy();
    expect(evModel.getValueNodeParentRef().length).toBe(1);

    var qfModel:QuantityFieldModel = evModel.getChildModel(0) as QuantityFieldModel;
    expect(qfModel instanceof QuantityFieldModel).toBeTruthy();
    expect(qfModel.getRmType()).toBe(RmType.DV_QUANTITY);
    expect(qfModel.getName()).toBe("Temperature");
    expect(qfModel.getLocalizedName("sl")).toBe("Telesna temperatura");
    expect(qfModel.findAncestorWithPath("vitals/vitals/body_temperature/any_event")).toBe(evModel);
    expect(qfModel.findAncestorWithPath("vitals/vitals/body_temperature")).toBe(obsModel);
    expect(qfModel.getValueNodeRef().length).toBe(0);
    expect(qfModel.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event[0].temperature);
    expect(ThinkEhrUtil.isArray(evModel.getValueNodeParentRef())).toBeTruthy();
    expect(qfModel.getValueNodeParentRef().length).toBe(0);

    var ctModel:CodedTextFieldModel = evModel.getChildModel(1) as CodedTextFieldModel;
    expect(ctModel instanceof CodedTextFieldModel).toBeTruthy();
    expect(ctModel.getRmType()).toBe(RmType.DV_CODED_TEXT);
    expect(ctModel.getName()).toBe("Symptoms");
    expect(ctModel.getLocalizedName("sl")).toBe("Ugotovitve");
    expect(ctModel.getFormId()).toBe("vitals/vitals/body_temperature/any_event/symptoms");
    expect(ctModel.getPath()).toBe("vitals/vitals/body_temperature/any_event/symptoms");
    expect(ctModel.getMin()).toBe(0);
    expect(ctModel.getMax()).toBe(2);
    expect(ctModel.getNodeId()).toBe("at0.63");
    expect(ctModel.findAncestorWithPath("vitals/vitals/body_temperature/any_event")).toBe(evModel);
    expect(ctModel.findAncestorWithPath("vitals/vitals/body_temperature")).toBe(obsModel);
    expect(ctModel.getValueNodeRef().length).toBe(0);
    expect(ctModel.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event[0].symptoms);
    expect(ThinkEhrUtil.isArray(evModel.getValueNodeParentRef())).toBeTruthy();
    expect(ctModel.getValueNodeParentRef().length).toBe(0);
  });

  it("Parse Values 2 Fields Inside Rm Containers - Repeating Event Values", function () {

    var context = {};
    var values = {
      "vitals": {
        "_link": [
          {
            "|meaning": "Follow up to",
            "|type": "Problem",
            "|target": "ehr://01dc58f3-3659-4ddc-b192-79d21ce31d01"
          }
        ],
        "_uid": [
          "8e35d270-c34f-48a7-ae82-be73b09d448b::example::1"
        ],
        "context": [
          {
            "start_time": [
              "2014-08-12T15:14:35.851+02:00"
            ],
            "setting": [
              {
                "|code": "238",
                "|value": "other care",
                "|terminology": "openehr"
              }
            ]
          }
        ],
        "vitals": [
          {
            "_uid": [
              "18515ffb-3c48-40b0-9087-e2a7aec7c402"
            ],
            "haemoglobin_a1c": [
              {
                "_uid": [
                  "2cabd781-24db-486c-986b-19002e43b2ae"
                ],
                "_other_participation": [
                  {
                    "|function": "performer",
                    "|mode": "not specified",
                    "|name": "Nurse Bailey"
                  }
                ],
                "any_event": [
                  {
                    "test_name": [
                      "Test name 21"
                    ],
                    "diagnostic_service": [
                      "Diagnostic service 91"
                    ],
                    "test_status": [
                      {
                        "|code": "at0038",
                        "|value": "Final",
                        "|terminology": "local"
                      }
                    ],
                    "hba1c": [
                      {
                        "|numerator": "63.65",
                        "|denominator": "100.0",
                        "|null": "0.6365"
                      }
                    ],
                    "overall_interpretation": [
                      "Overall interpretation 77"
                    ],
                    "time": [
                      "2014-08-12T15:14:35.852+02:00"
                    ]
                  }
                ],
                "requestor_order_identifier": [
                  "Ident. 85"
                ],
                "receiver_order_identifier": [
                  "Ident. 22"
                ],
                "laboratory_test_result_identifier": [
                  "Ident. 66"
                ],
                "datetime_result_issued": [
                  "2014-08-12T15:14:35.852+02:00"
                ]
              }
            ],
            "body_temperature": [
              {
                "_uid": [
                  "476077c5-c0d1-419b-ba94-f832817c45f0"
                ],
                "_other_participation": [
                  {
                    "|function": "performer",
                    "|mode": "not specified",
                    "|name": "Nurse Bailey"
                  }
                ],
                "any_event": [
                  {
                    "temperature": [
                      {
                        "|magnitude": 33.3,
                        "|unit": "°C"
                      }
                    ],
                    "symptoms": [
                      {
                        "|code": "at0.64",
                        "|value": "Chills / rigor / shivering",
                        "|terminology": "local"
                      }
                    ],
                    "body_exposure": [
                      {
                        "|code": "at0033",
                        "|value": "Appropriate clothing/bedding",
                        "|terminology": "local"
                      }
                    ],
                    "description_of_thermal_stress": [
                      "Description of thermal stress 14"
                    ],
                    "time": [
                      "2014-08-12T15:14:35.853+02:00"
                    ]
                  },
                  {
                    "temperature": [
                      {
                        "|magnitude": 40.1,
                        "|unit": "°C"
                      }
                    ],
                    "symptoms": [
                      {
                        "|code": "at0.65",
                        "|value": "Goose-bumps",
                        "|terminology": "local"
                      }
                    ],
                    "body_exposure": [
                      {
                        "|code": "at0033",
                        "|value": "Appropriate clothing/bedding",
                        "|terminology": "local"
                      }
                    ],
                    "description_of_thermal_stress": [
                      "Description of thermal stress 15"
                    ],
                    "time": [
                      "2014-08-12T15:14:36.853+02:00"
                    ]
                  }
                ],
                "site_of_measurement": [
                  {
                    "|code": "at0054",
                    "|value": "Oesophagus",
                    "|terminology": "local"
                  }
                ],
                "other_site_of_measurement": [
                  "Other site of measurement 3"
                ]
              }
            ]
          }
        ]
      }
    };
    var rootModel = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription(context, descJsonRmContainersMulti2, values, null);
    expect(rootModel instanceof FormRootModel).toBeTruthy();
    expect(rootModel.getRmType()).toBe(RmType.FORM_DEFINITION);
    expect(rootModel.getChildCount()).toBe(1);
    expect(rootModel.getValueNodeRef()).toBe(values);
    expect(rootModel.getValueNodeParentRef()).toBeUndefined();

    var obsModel:RmContainerModel = rootModel.getChildModel(0) as RmContainerModel;
    expect(obsModel instanceof RmContainerModel).toBeTruthy();
    expect(obsModel.getRmType()).toBe(RmType.OBSERVATION);
    expect(obsModel.getPath()).toBe("vitals/vitals/body_temperature");
    expect(obsModel.getPath()).toBe("vitals/vitals/body_temperature");
    expect(obsModel.getChildCount()).toBe(2);
    expect(obsModel.getValueNodeRef()).toBe(values.vitals.vitals[0].body_temperature[0]);
    expect(obsModel.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature);

    var evModel1:RmContainerModel = obsModel.getChildModel(0) as RmContainerModel;
    expect(evModel1 instanceof RmContainerModel).toBeTruthy();
    expect(evModel1.getRmType()).toBe(RmType.EVENT);
    expect(evModel1.getPath()).toBe("vitals/vitals/body_temperature/any_event");
    expect(evModel1.getPath()).toBe("vitals/vitals/body_temperature/any_event");
    expect(evModel1.getChildCount()).toBe(2);
    expect(evModel1.getValueNodeRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event[0]);
    expect(evModel1.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event);

    var qfModel1:QuantityFieldModel = evModel1.getChildModel(0) as QuantityFieldModel;
    expect(qfModel1 instanceof QuantityFieldModel).toBeTruthy();
    expect(qfModel1.getRmType()).toBe(RmType.DV_QUANTITY);
    expect(qfModel1.getName()).toBe("Temperature");
    expect(qfModel1.getLocalizedName("sl")).toBe("Telesna temperatura");
    expect(qfModel1.findAncestorWithPath("vitals/vitals/body_temperature/any_event")).toBe(evModel1);
    expect(qfModel1.findAncestorWithPath("vitals/vitals/body_temperature")).toBe(obsModel);

    expect(qfModel1.getValue("magnitude", 0)).toBeCloseTo(33.3);
    expect(qfModel1.getValue("unit", 0)).toBe("°C");
    expect(qfModel1.isMulti()).toBe(true);
    expect(qfModel1.getValueNodeRef()[0]).toBe(values.vitals.vitals[0].body_temperature[0].any_event[0].temperature[0]);
    expect(qfModel1.getValueNodeParentRef()['temperature']).toBe(values.vitals.vitals[0].body_temperature[0].any_event[0].temperature);
    expect(qfModel1.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event[0]);

    var ctModel1:CodedTextFieldModel = evModel1.getChildModel(1) as CodedTextFieldModel;
    expect(ctModel1 instanceof CodedTextFieldModel).toBeTruthy();
    expect(ctModel1.getRmType()).toBe(RmType.DV_CODED_TEXT);
    expect(ctModel1.getName()).toBe("Symptoms");
    expect(ctModel1.getLocalizedName("sl")).toBe("Ugotovitve");
    expect(ctModel1.getFormId()).toBe(ctModel1.getPath());
    expect(ctModel1.getPath()).toBe("vitals/vitals/body_temperature/any_event/symptoms");
    expect(ctModel1.getMin()).toBe(0);
    expect(ctModel1.getMax()).toBe(2);
    expect(ctModel1.getNodeId()).toBe("at0.63");
    expect(ctModel1.findAncestorWithPath("vitals/vitals/body_temperature/any_event")).toBe(evModel1);
    expect(ctModel1.findAncestorWithPath("vitals/vitals/body_temperature")).toBe(obsModel);
    expect(ctModel1.getValue("code", 0)).toBe("at0.64");
    expect(ctModel1.getValue("value", 0)).toBe("Chills / rigor / shivering");
    expect(ctModel1.getValue("terminology", 0)).toBe("local");
    expect(ctModel1.getValueNodeRef()[0]).toBe(values.vitals.vitals[0].body_temperature[0].any_event[0].symptoms[0]);
    expect(ctModel1.isMulti()).toBe(true);
    expect(ctModel1.getValueNodeParentRef()['symptoms']).toBe(values.vitals.vitals[0].body_temperature[0].any_event[0].symptoms);
    expect(ctModel1.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event[0]);

    var evModel2:RmContainerModel = obsModel.getChildModel(1) as RmContainerModel;
    expect(evModel2 instanceof RmContainerModel).toBeTruthy();
    expect(evModel2.getRmType()).toBe(RmType.EVENT);
    expect(evModel2.getPath()).toBe("vitals/vitals/body_temperature/any_event");
    expect(evModel2.getPath()).toBe("vitals/vitals/body_temperature/any_event");
    expect(evModel2.getChildCount()).toBe(2);
    expect(evModel2.getValueNodeRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event[1]);
    expect(evModel2.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event);

    var qfModel2:QuantityFieldModel = evModel2.getChildModel(0) as QuantityFieldModel;
    expect(qfModel2 instanceof QuantityFieldModel).toBeTruthy();
    expect(qfModel2.getRmType()).toBe(RmType.DV_QUANTITY);
    expect(qfModel2.getName()).toBe("Temperature");
    expect(qfModel2.getLocalizedName("sl")).toBe("Telesna temperatura");
    expect(qfModel2.findAncestorWithPath("vitals/vitals/body_temperature/any_event")).toBe(evModel2);
    expect(qfModel2.findAncestorWithPath("vitals/vitals/body_temperature")).toBe(obsModel);
    expect(qfModel2.getValue("magnitude", 0)).toBeCloseTo(40.1);
    expect(qfModel2.getValue(undefined, undefined).length).toBe(1);
    expect(qfModel2.getValue("unit", 0)).toBe("°C");
    expect(qfModel2.getValueNodeRef()[0]).toBe(values.vitals.vitals[0].body_temperature[0].any_event[1].temperature[0]);
    expect(qfModel2.isMulti()).toBe(true);
    expect(qfModel2.getValueNodeParentRef()['temperature']).toBe(values.vitals.vitals[0].body_temperature[0].any_event[1].temperature);
    expect(qfModel2.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event[1]);

    var ctModel2:CodedTextFieldModel = evModel2.getChildModel(1) as  CodedTextFieldModel;
    expect(ctModel2 instanceof CodedTextFieldModel).toBeTruthy();
    expect(ctModel2.getRmType()).toBe(RmType.DV_CODED_TEXT);
    expect(ctModel2.getName()).toBe("Symptoms");
    expect(ctModel2.getLocalizedName("sl")).toBe("Ugotovitve");
    expect(ctModel2.getFormId()).toBe(ctModel2.getPath());
    expect(ctModel2.getPath()).toBe("vitals/vitals/body_temperature/any_event/symptoms");
    expect(ctModel2.getMin()).toBe(0);
    expect(ctModel2.getMax()).toBe(2);
    expect(ctModel2.getNodeId()).toBe("at0.63");
    expect(ctModel2.findAncestorWithPath("vitals/vitals/body_temperature/any_event")).toBe(evModel2);
    expect(ctModel2.findAncestorWithPath("vitals/vitals/body_temperature")).toBe(obsModel);
    expect(ctModel2.getValue("code", 0)).toBe("at0.65");
    expect(ctModel2.getValue("value", 0)).toBe("Goose-bumps");
    expect(ctModel2.getValue("terminology", 0)).toBe("local");
    expect(ctModel2.getValueNodeRef()[0]).toBe(values.vitals.vitals[0].body_temperature[0].any_event[1].symptoms[0]);
    expect(ctModel2.isMulti()).toBe(true);
    expect(ctModel2.getValueNodeParentRef()['symptoms']).toBe(values.vitals.vitals[0].body_temperature[0].any_event[1].symptoms);
    expect(ctModel2.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event[1]);
  });

  it("Parse Values 2 Fields Inside Rm Containers - Repeating Observations and Containing Event Values", function () {
    var context:any = {};
    var values:any = {
      "vitals": {
        "_link": [
          {
            "|meaning": "Follow up to",
            "|type": "Problem",
            "|target": "ehr://01dc58f3-3659-4ddc-b192-79d21ce31d01"
          }
        ],
        "_uid": [
          "8e35d270-c34f-48a7-ae82-be73b09d448b::example::1"
        ],
        "context": [
          {
            "start_time": [
              "2014-08-12T15:14:35.851+02:00"
            ],
            "setting": [
              {
                "|code": "238",
                "|value": "other care",
                "|terminology": "openehr"
              }
            ]
          }
        ],
        "vitals": [
          {
            "_uid": [
              "18515ffb-3c48-40b0-9087-e2a7aec7c402"
            ],
            "haemoglobin_a1c": [
              {
                "_uid": [
                  "2cabd781-24db-486c-986b-19002e43b2ae"
                ],
                "_other_participation": [
                  {
                    "|function": "performer",
                    "|mode": "not specified",
                    "|name": "Nurse Bailey"
                  }
                ],
                "any_event": [
                  {
                    "test_name": [
                      "Test name 21"
                    ],
                    "diagnostic_service": [
                      "Diagnostic service 91"
                    ],
                    "test_status": [
                      {
                        "|code": "at0038",
                        "|value": "Final",
                        "|terminology": "local"
                      }
                    ],
                    "hba1c": [
                      {
                        "|numerator": "63.65",
                        "|denominator": "100.0",
                        "|null": "0.6365"
                      }
                    ],
                    "overall_interpretation": [
                      "Overall interpretation 77"
                    ],
                    "time": [
                      "2014-08-12T15:14:35.852+02:00"
                    ]
                  }
                ],
                "requestor_order_identifier": [
                  "Ident. 85"
                ],
                "receiver_order_identifier": [
                  "Ident. 22"
                ],
                "laboratory_test_result_identifier": [
                  "Ident. 66"
                ],
                "datetime_result_issued": [
                  "2014-08-12T15:14:35.852+02:00"
                ]
              }
            ],
            "body_temperature": [
              {
                "_uid": [
                  "476077c5-c0d1-419b-ba94-f832817c45f0"
                ],
                "_other_participation": [
                  {
                    "|function": "performer",
                    "|mode": "not specified",
                    "|name": "Nurse Bailey"
                  }
                ],
                "any_event": [
                  {
                    "temperature": [
                      {
                        "|magnitude": 33.3,
                        "|unit": "°C"
                      }
                    ],
                    "symptoms": [
                      {
                        "|code": "at0.64",
                        "|value": "Chills / rigor / shivering",
                        "|terminology": "local"
                      }
                    ],
                    "body_exposure": [
                      {
                        "|code": "at0033",
                        "|value": "Appropriate clothing/bedding",
                        "|terminology": "local"
                      }
                    ],
                    "description_of_thermal_stress": [
                      "Description of thermal stress 14"
                    ],
                    "time": [
                      "2014-08-12T15:14:35.853+02:00"
                    ]
                  },
                  {
                    "temperature": [
                      {
                        "|magnitude": 40.1,
                        "|unit": "°C"
                      }
                    ],
                    "symptoms": [
                      {
                        "|code": "at0.65",
                        "|value": "Goose-bumps",
                        "|terminology": "local"
                      }
                    ],
                    "body_exposure": [
                      {
                        "|code": "at0033",
                        "|value": "Appropriate clothing/bedding",
                        "|terminology": "local"
                      }
                    ],
                    "description_of_thermal_stress": [
                      "Description of thermal stress 15"
                    ],
                    "time": [
                      "2014-08-12T15:14:36.853+02:00"
                    ]
                  }
                ],
                "site_of_measurement": [
                  {
                    "|code": "at0054",
                    "|value": "Oesophagus",
                    "|terminology": "local"
                  }
                ],
                "other_site_of_measurement": [
                  "Other site of measurement 3"
                ]
              },
              // body temperature observation 2
              {
                "_uid": [
                  "476077c5-c0d1-419b-ba94-f832817c45f1"
                ],
                "_other_participation": [
                  {
                    "|function": "performer",
                    "|mode": "not specified",
                    "|name": "Nurse Bailey"
                  }
                ],
                "any_event": [
                  {
                    "temperature": [
                      {
                        "|magnitude": 30.0,
                        "|unit": "°C"
                      }
                    ]
                  },
                  {
                    "temperature": [
                      {
                        "|magnitude": 35.0,
                        "|unit": "°C"
                      }
                    ],
                    "symptoms": [
                      {
                        "|code": "at1.66",
                        "|value": "Test-fake-value",
                        "|terminology": "local"
                      },
                      {
                        "|code": "at1.67",
                        "|value": "Test-fake-value-2",
                        "|terminology": "local"
                      }
                    ]
                  }
                ],
                "site_of_measurement": [
                  {
                    "|code": "at0054",
                    "|value": "Oesophagus",
                    "|terminology": "local"
                  }
                ],
                "other_site_of_measurement": [
                  "Other site of measurement 3"
                ]
              }
            ]
          }
        ]
      }
    };
    var rootModel = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription(context, descJsonRmContainersMulti, values, null);
    expect(rootModel instanceof FormRootModel).toBeTruthy();
    expect(rootModel.getRmType()).toBe(RmType.FORM_DEFINITION);
    expect(rootModel.getChildCount()).toBe(2);
    expect(rootModel.getValueNodeRef()).toBe(values);
    expect(rootModel.getValueNodeParentRef()).toBeUndefined();

    var obsModel:RmContainerModel = rootModel.getChildModel(0) as RmContainerModel;
    expect(obsModel instanceof RmContainerModel).toBeTruthy();
    expect(obsModel.getRmType()).toBe(RmType.OBSERVATION);
    expect(obsModel.getPath()).toBe("vitals/vitals/body_temperature");
    expect(obsModel.getPath()).toBe("vitals/vitals/body_temperature");
    expect(obsModel.getChildCount()).toBe(2);
    expect(obsModel.getValueNodeRef()).toBe(values.vitals.vitals[0].body_temperature[0]);
    expect(obsModel.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature);

    var evModel1:RmContainerModel = obsModel.getChildModel(0) as RmContainerModel;
    expect(evModel1 instanceof RmContainerModel).toBeTruthy();
    expect(evModel1.getRmType()).toBe(RmType.EVENT);
    expect(evModel1.getPath()).toBe("vitals/vitals/body_temperature/any_event");
    expect(evModel1.getPath()).toBe("vitals/vitals/body_temperature/any_event");
    expect(evModel1.getChildCount()).toBe(2);
    expect(evModel1.getValueNodeRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event[0]);
    expect(evModel1.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event);

    var qfModel1:QuantityFieldModel = evModel1.getChildModel(0) as QuantityFieldModel;
    expect(qfModel1 instanceof QuantityFieldModel).toBeTruthy();
    expect(qfModel1.getRmType()).toBe(RmType.DV_QUANTITY);
    expect(qfModel1.getName()).toBe("Temperature");
    expect(qfModel1.getLocalizedName("sl")).toBe("Telesna temperatura");
    expect(qfModel1.findAncestorWithPath("vitals/vitals/body_temperature/any_event")).toBe(evModel1);
    expect(qfModel1.findAncestorWithPath("vitals/vitals/body_temperature")).toBe(obsModel);
    expect(qfModel1.isMulti()).toBeTruthy();
    expect(qfModel1.getValue("magnitude",0)).toBeCloseTo(33.3);
    expect(qfModel1.getValue("unit",0)).toBe("°C");
    expect(qfModel1.getValueNodeRef()[0]).toBe(values.vitals.vitals[0].body_temperature[0].any_event[0].temperature[0]);
    expect(qfModel1.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event[0].temperature);

    var ctModel1:CodedTextFieldModel = evModel1.getChildModel(1) as CodedTextFieldModel;
    expect(ctModel1 instanceof CodedTextFieldModel).toBeTruthy();
    expect(ctModel1.getRmType()).toBe(RmType.DV_CODED_TEXT);
    expect(ctModel1.getName()).toBe("Symptoms");
    expect(ctModel1.getLocalizedName("sl")).toBe("Ugotovitve");
    expect(ctModel1.getFormId()).toBe(ctModel1.getPath());
    expect(ctModel1.getPath()).toBe("vitals/vitals/body_temperature/any_event/symptoms");
    expect(ctModel1.getMin()).toBe(0);
    expect(ctModel1.getMax()).toBe(2);
    expect(ctModel1.getNodeId()).toBe("at0.63");
    expect(ctModel1.findAncestorWithPath("vitals/vitals/body_temperature/any_event")).toBe(evModel1);
    expect(ctModel1.findAncestorWithPath("vitals/vitals/body_temperature")).toBe(obsModel);
    //console.log("ctModel1", ctModel1.getValueNodeParentRef(), ctModel1.getValueNodeRef(), ctModel1.getValue());
    var ct1Val = ctModel1.getValue();
    expect(ct1Val.length).toBe(1);
    expect(ct1Val[0]["|code"]).toBe("at0.64");
    expect(ct1Val[0]["|value"]).toBe("Chills / rigor / shivering");
    expect(ct1Val[0]["|terminology"]).toBe("local");
    expect(ctModel1.getValueNodeRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event[0].symptoms);
    expect(ctModel1.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event[0]);

    var evModel2:RmContainerModel = obsModel.getChildModel(1) as RmContainerModel;
    expect(evModel2 instanceof RmContainerModel).toBeTruthy();
    expect(evModel2.getRmType()).toBe(RmType.EVENT);
    expect(evModel2.getPath()).toBe("vitals/vitals/body_temperature/any_event");
    expect(evModel2.getChildCount()).toBe(2);
    expect(evModel2.getValueNodeRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event[1]);
    expect(evModel2.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event);

    var qfModel2:QuantityFieldModel = evModel2.getChildModel(0) as QuantityFieldModel;
    expect(qfModel2 instanceof QuantityFieldModel).toBeTruthy();
    expect(qfModel2.getRmType()).toBe(RmType.DV_QUANTITY);
    expect(qfModel2.getName()).toBe("Temperature");
    expect(qfModel2.getLocalizedName("sl")).toBe("Telesna temperatura");
    expect(qfModel2.findAncestorWithPath("vitals/vitals/body_temperature/any_event")).toBe(evModel2);
    expect(qfModel2.findAncestorWithPath("vitals/vitals/body_temperature")).toBe(obsModel);
    expect(qfModel2.getValue("magnitude",0)).toBeCloseTo(40.1);
    expect(qfModel2.getValue("unit",0)).toBe("°C");
    expect(qfModel2.getValueNodeRef()[0]).toBe(values.vitals.vitals[0].body_temperature[0].any_event[1].temperature[0]);
    expect(qfModel2.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event[1].temperature);

    var ctModel2:CodedTextFieldModel = evModel2.getChildModel(1) as CodedTextFieldModel;
    expect(ctModel2 instanceof CodedTextFieldModel).toBeTruthy();
    expect(ctModel2.getRmType()).toBe(RmType.DV_CODED_TEXT);
    expect(ctModel2.getName()).toBe("Symptoms");
    expect(ctModel2.getLocalizedName("sl")).toBe("Ugotovitve");
    expect(ctModel2.getPath()).toBe("vitals/vitals/body_temperature/any_event/symptoms");
    expect(ctModel2.getMin()).toBe(0);
    expect(ctModel2.getMax()).toBe(2);
    expect(ctModel2.getNodeId()).toBe("at0.63");
    expect(ctModel2.findAncestorWithPath("vitals/vitals/body_temperature/any_event")).toBe(evModel2);
    expect(ctModel2.findAncestorWithPath("vitals/vitals/body_temperature")).toBe(obsModel);
    var ct2Val = ctModel2.getValue();
    expect(ct2Val.length).toBe(1);
    expect(ct2Val[0]["|code"]).toBe("at0.65");
    expect(ct2Val[0]["|value"]).toBe("Goose-bumps");
    expect(ct2Val[0]["|terminology"]).toBe("local");
    expect(ctModel2.getValueNodeRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event[1].symptoms);
    expect(ctModel2.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event[1]);

    // Second body temperature observation

    var obsModel2:RmContainerModel = rootModel.getChildModel(1) as RmContainerModel;
    expect(obsModel2 instanceof RmContainerModel).toBeTruthy();
    expect(obsModel2.getRmType()).toBe(RmType.OBSERVATION);
    expect(obsModel2.getPath()).toBe("vitals/vitals/body_temperature");
    expect(obsModel2.getPath()).toBe("vitals/vitals/body_temperature");
    expect(obsModel2.getChildCount()).toBe(2);
    expect(obsModel2.getValueNodeRef()).toBe(values.vitals.vitals[0].body_temperature[1]);
    expect(obsModel2.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature);

    var evModel21:RmContainerModel = obsModel2.getChildModel(0) as RmContainerModel;
    expect(evModel21 instanceof RmContainerModel).toBeTruthy();
    expect(evModel21.getRmType()).toBe(RmType.EVENT);
    expect(evModel21.getPath()).toBe("vitals/vitals/body_temperature/any_event");
    expect(evModel21.getPath()).toBe("vitals/vitals/body_temperature/any_event");
    expect(evModel21.getChildCount()).toBe(2);
    expect(evModel21.getValueNodeRef()).toBe(values.vitals.vitals[0].body_temperature[1].any_event[0]);
    expect(evModel21.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[1].any_event);

    var qfModel21:QuantityFieldModel = evModel21.getChildModel(0) as QuantityFieldModel;
    expect(qfModel21 instanceof QuantityFieldModel).toBeTruthy();
    expect(qfModel21.getRmType()).toBe(RmType.DV_QUANTITY);
    expect(qfModel21.getName()).toBe("Temperature");
    expect(qfModel21.getLocalizedName("sl")).toBe("Telesna temperatura");
    expect(qfModel21.findAncestorWithPath("vitals/vitals/body_temperature/any_event")).toBe(evModel21);
    expect(qfModel21.findAncestorWithPath("vitals/vitals/body_temperature")).toBe(obsModel2);
    expect(qfModel21.getValue("magnitude",0)).toBeCloseTo(30.0);
    expect(qfModel21.getValue("unit",0)).toBe("°C");
    expect(qfModel21.getValueNodeRef()[0]).toBe(values.vitals.vitals[0].body_temperature[1].any_event[0].temperature[0]);
    expect(qfModel21.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[1].any_event[0].temperature);

    var ctModel21:CodedTextFieldModel = evModel21.getChildModel(1) as CodedTextFieldModel;
    expect(ctModel21 instanceof CodedTextFieldModel).toBeTruthy();
    expect(ctModel21.getRmType()).toBe(RmType.DV_CODED_TEXT);
    expect(ctModel21.getName()).toBe("Symptoms");
    expect(ctModel21.getLocalizedName("sl")).toBe("Ugotovitve");
    expect(ctModel21.getPath()).toBe("vitals/vitals/body_temperature/any_event/symptoms");
    expect(ctModel21.getMin()).toBe(0);
    expect(ctModel21.getMax()).toBe(2);
    expect(ctModel21.getNodeId()).toBe("at0.63");
    expect(ctModel21.findAncestorWithPath("vitals/vitals/body_temperature/any_event")).toBe(evModel21);
    expect(ctModel21.findAncestorWithPath("vitals/vitals/body_temperature")).toBe(obsModel2);
    expect(ctModel21.getValue().length).toBe(0);
    expect(ctModel21.getValueNodeRef()).toBe(ctModel21.getValueNodeRef());
    expect(ctModel21.getValueNodeParentRef()).toBeTruthy();
    expect(ThinkEhrUtil.isArray(ctModel21.getValueNodeParentRef())).toBeFalsy();
    expect(values.vitals.vitals[0].body_temperature[1].any_event[0]).toBe(ctModel21.getValueNodeParentRef());
    expect(values.vitals.vitals[0].body_temperature[1].any_event[0].symptoms).toBe(ctModel21.getValueNodeRef());
    expect(values.vitals.vitals[0].body_temperature[1].any_event[0].symptoms).toEqual(ctModel21.getValue());

    var evModel22:RmContainerModel = obsModel2.getChildModel(1) as RmContainerModel;
    expect(evModel22 instanceof RmContainerModel).toBeTruthy();
    expect(evModel22.getRmType()).toBe(RmType.EVENT);
    expect(evModel22.getPath()).toBe("vitals/vitals/body_temperature/any_event");
    expect(evModel22.getChildCount()).toBe(2);
    expect(evModel22.getValueNodeRef()).toBe(values.vitals.vitals[0].body_temperature[1].any_event[1]);
    expect(evModel22.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[1].any_event);

    var qfModel22:QuantityFieldModel = evModel22.getChildModel(0) as QuantityFieldModel;
    expect(qfModel22 instanceof QuantityFieldModel).toBeTruthy();
    expect(qfModel22.getRmType()).toBe(RmType.DV_QUANTITY);
    expect(qfModel22.getName()).toBe("Temperature");
    expect(qfModel22.getLocalizedName("sl")).toBe("Telesna temperatura");
    expect(qfModel22.findAncestorWithPath("vitals/vitals/body_temperature/any_event")).toBe(evModel22);
    expect(qfModel22.findAncestorWithPath("vitals/vitals/body_temperature")).toBe(obsModel2);
    expect(qfModel22.getValue("magnitude",0)).toBeCloseTo(35.0);
    expect(qfModel22.getValue("unit",0)).toBe("°C");
    expect(qfModel22.getValueNodeRef()[0]).toBe(values.vitals.vitals[0].body_temperature[1].any_event[1].temperature[0]);
    expect(qfModel22.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[1].any_event[1].temperature);

    var ctModel22:CodedTextFieldModel = evModel22.getChildModel(1) as CodedTextFieldModel;
    expect(ctModel22 instanceof CodedTextFieldModel).toBeTruthy();
    expect(ctModel22.getRmType()).toBe(RmType.DV_CODED_TEXT);
    expect(ctModel22.getName()).toBe("Symptoms");
    expect(ctModel22.getLocalizedName("sl")).toBe("Ugotovitve");
    expect(ctModel22.getFormId()).toBe("vitals/vitals/body_temperature/any_event/symptoms");
    expect(ctModel22.getPath()).toBe("vitals/vitals/body_temperature/any_event/symptoms");
    expect(ctModel22.getMin()).toBe(0);
    expect(ctModel22.getMax()).toBe(2);
    expect(ctModel22.getNodeId()).toBe("at0.63");
    expect(ctModel22.findAncestorWithPath("vitals/vitals/body_temperature/any_event")).toBe(evModel22);
    expect(ctModel22.findAncestorWithPath("vitals/vitals/body_temperature")).toBe(obsModel2);
    var ctModel22Val = ctModel22.getValue();
    expect(ctModel22Val).toBeTruthy();
    expect(ThinkEhrUtil.isArray(ctModel22Val)).toBeTruthy();
    expect(ctModel22Val.length).toBe(2);
    expect(ctModel22.getValueNodeRef()).toBe(values.vitals.vitals[0].body_temperature[1].any_event[1].symptoms);
    expect(ctModel22.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[1].any_event[1]);
  });

  it("Parse Values 2 Fields Inside Rm Containers - Partial Values", function () {
    var context = {};
    var emptyObs2:any = {
      "_uid": [
        "476077c5-c0d1-419b-ba94-f832817c45f1"
      ]
    };
    var values:any = {
      "vitals": {
        "_link": [
          {
            "|meaning": "Follow up to",
            "|type": "Problem",
            "|target": "ehr://01dc58f3-3659-4ddc-b192-79d21ce31d01"
          }
        ],
        "_uid": [
          "8e35d270-c34f-48a7-ae82-be73b09d448b::example::1"
        ],
        "context": [
          {
            "start_time": [
              "2014-08-12T15:14:35.851+02:00"
            ],
            "setting": [
              {
                "|code": "238",
                "|value": "other care",
                "|terminology": "openehr"
              }
            ]
          }
        ],
        "vitals": [
          {
            "_uid": [
              "18515ffb-3c48-40b0-9087-e2a7aec7c402"
            ],
            "body_temperature": [
              {
                "_uid": [
                  "476077c5-c0d1-419b-ba94-f832817c45f0"
                ],
                "_other_participation": [
                  {
                    "|function": "performer",
                    "|mode": "not specified",
                    "|name": "Nurse Bailey"
                  }
                ],
                "any_event": [
                  {
                    "temperature": [
                      {
                        "|magnitude": 33.3,
                        "|unit": "°C"
                      }
                    ],
                    "symptoms": [
                      {
                        "|code": "at0.64",
                        "|value": "Chills / rigor / shivering",
                        "|terminology": "local"
                      }
                    ],
                    "body_exposure": [
                      {
                        "|code": "at0033",
                        "|value": "Appropriate clothing/bedding",
                        "|terminology": "local"
                      }
                    ],
                    "description_of_thermal_stress": [
                      "Description of thermal stress 14"
                    ],
                    "time": [
                      "2014-08-12T15:14:35.853+02:00"
                    ]
                  },
                  {
                    "body_exposure": [
                      {
                        "|code": "at0033",
                        "|value": "Appropriate clothing/bedding",
                        "|terminology": "local"
                      }
                    ],
                    "description_of_thermal_stress": [
                      "Description of thermal stress 15"
                    ],
                    "time": [
                      "2014-08-12T15:14:36.853+02:00"
                    ]
                  },
                  {}
                ],
                "site_of_measurement": [
                  {
                    "|code": "at0054",
                    "|value": "Oesophagus",
                    "|terminology": "local"
                  }
                ],
                "other_site_of_measurement": [
                  "Other site of measurement 3"
                ]
              },
              // body temperature observation 2
              emptyObs2
            ]
          }
        ]
      }
    };
    var rootModel = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription(context, descJsonRmContainersMulti2, values, null);
    expect(rootModel.getValueNodeRef()).toBe(values);
    expect(rootModel.getValueNodeParentRef()).toBeUndefined();

    var obsModel:RmContainerModel = rootModel.getChildModel(0) as RmContainerModel;
    expect(obsModel instanceof RmContainerModel).toBeTruthy();
    expect(obsModel.getValueNodeRef()).toBe(values.vitals.vitals[0].body_temperature[0]);
    expect(obsModel.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature);

    var evModel1:RmContainerModel = obsModel.getChildModel(0) as RmContainerModel;
    expect(evModel1 instanceof RmContainerModel).toBeTruthy();
    expect(evModel1.getValueNodeRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event[0]);
    expect(evModel1.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event);

    var qfModel1:QuantityFieldModel = evModel1.getChildModel(0) as QuantityFieldModel;
    expect(qfModel1 instanceof QuantityFieldModel).toBeTruthy();
    expect(qfModel1.getValue("magnitude", 0)).toBeCloseTo(33.3);
    expect(qfModel1.getValue("unit", 0)).toBe("°C");
    expect(qfModel1.getValueNodeRef()[0]).toBe(values.vitals.vitals[0].body_temperature[0].any_event[0].temperature[0]);
    expect(qfModel1.getValueNodeParentRef()['temperature']).toBe(values.vitals.vitals[0].body_temperature[0].any_event[0].temperature);
    expect(qfModel1.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event[0]);
    expect(qfModel1.isMulti()).toBe(true);

    var ctModel1:CodedTextFieldModel = evModel1.getChildModel(1) as CodedTextFieldModel;
    expect(ctModel1 instanceof CodedTextFieldModel).toBeTruthy();
    expect(ctModel1.getRmType()).toBe(RmType.DV_CODED_TEXT);
    expect(ctModel1.getValue("code", 0)).toBe("at0.64");
    expect(ctModel1.getValue("value", 0)).toBe("Chills / rigor / shivering");
    expect(ctModel1.getValue("terminology", 0)).toBe("local");
    expect(ctModel1.getValueNodeRef()[0]).toBe(values.vitals.vitals[0].body_temperature[0].any_event[0].symptoms[0]);
    expect(ctModel1.isMulti()).toBe(true);
    expect(ctModel1.getValueNodeParentRef()['symptoms']).toBe(values.vitals.vitals[0].body_temperature[0].any_event[0].symptoms);
    expect(ctModel1.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event[0]);

    var evModel2:RmContainerModel = obsModel.getChildModel(1) as RmContainerModel;
    expect(evModel2 instanceof RmContainerModel).toBeTruthy();
    expect(evModel2.getValueNodeRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event[1]);
    expect(evModel2.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event);

    var qfModel2:QuantityFieldModel = evModel2.getChildModel(0) as QuantityFieldModel;
    expect(qfModel2 instanceof QuantityFieldModel).toBeTruthy();
    expect(qfModel2.getValue("magnitude", 0)).toBeNull();
    expect(qfModel2.getValue("unit", 0)).toBeNull();
    expect(qfModel2.getValueNodeRef().length).toBe(0);
    expect(qfModel2.isMulti()).toBe(true);
    expect(qfModel2.getValueNodeParentRef()['temperature']).toBe(values.vitals.vitals[0].body_temperature[0].any_event[1].temperature);
    expect(qfModel2.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event[1]);
    expect(values.vitals.vitals[0].body_temperature[0].any_event[1].body_exposure[0]["|code"]).toBe("at0033");

    var ctModel2:CodedTextFieldModel = evModel2.getChildModel(1) as CodedTextFieldModel;
    expect(qfModel2 instanceof QuantityFieldModel).toBeTruthy();
    expect(ctModel2.getValue("code", 0)).toBeNull();
    expect(ctModel2.getValue("value", 0)).toBeNull();
    expect(ctModel2.getValue("terminology", 0)).toBeNull();
    expect(ctModel2.getValueNodeRef().length).toBe(0);
    expect(ctModel2.isMulti()).toBe(true);
    expect(ctModel2.getValueNodeParentRef()['symptoms']).toBe(values.vitals.vitals[0].body_temperature[0].any_event[1].symptoms);
    expect(ctModel2.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event[1]);

    // Second body temperature observation - constructed from empty

    var obsModel2:RmContainerModel = rootModel.getChildModel(1) as RmContainerModel;
    expect(obsModel2 instanceof RmContainerModel).toBeTruthy();
    expect(obsModel2.getChildCount()).toBe(1);
    expect(obsModel2.getValueNodeRef()).toBe(values.vitals.vitals[0].body_temperature[1]);
    expect(obsModel2.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature);
    expect(obsModel2.getValueNodeRef()).toBe(emptyObs2);
    expect(obsModel2.getValueNodeRef()['_uid'][0]).toBe("476077c5-c0d1-419b-ba94-f832817c45f1");

    var evModel21:RmContainerModel = obsModel2.getChildModel(0) as RmContainerModel;
    expect(evModel21.getChildCount()).toBe(2);
    expect(evModel21.getValueNodeRef()).toBe(values.vitals.vitals[0].body_temperature[1].any_event[0]);
    expect(evModel21.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[1].any_event);
    expect(evModel21.getValueNodeRef()).toBe(emptyObs2.any_event[0]);
    expect(evModel21.getValueNodeParentRef()).toBe(emptyObs2.any_event);

    var qfModel21:QuantityFieldModel = evModel21.getChildModel(0) as QuantityFieldModel;
    expect(qfModel21 instanceof QuantityFieldModel).toBeTruthy();

    expect(qfModel21.getValue("magnitude", 0)).toBeNull();
    expect(qfModel21.getValue("unit", 0)).toBeNull();
    expect(qfModel21.getValue(undefined, 0)).toBeNull();
    expect(qfModel21.getValue(undefined, undefined).length).toBe(0);
    expect(qfModel21.getValueNodeRef().length).toBe(0);
    expect(qfModel21.isMulti()).toBe(true);
    expect(qfModel21.getValueNodeParentRef()['temperature']).toBe(values.vitals.vitals[0].body_temperature[1].any_event[0].temperature);
    expect(qfModel21.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[1].any_event[0]);
    expect(qfModel21.getValueNodeParentRef()['temperature']).toBe(emptyObs2.any_event[0].temperature);

    var ctModel21:CodedTextFieldModel = evModel21.getChildModel(1) as CodedTextFieldModel;
    expect(ctModel21 instanceof CodedTextFieldModel).toBeTruthy();
    expect(ctModel21.getValue(undefined, 0)).toBeNull();
    expect(ctModel21.getValueNodeRef().length).toBe(0);
    expect(ctModel21.getValueNodeParentRef()).toBeTruthy();
    expect(ThinkEhrUtil.isObject(ctModel21.getValueNodeParentRef())).toBeTruthy();
    expect(ctModel21.getValueNodeParentRef()['symptoms'].length).toBe(0);
    expect(ctModel21.isMulti()).toBe(true);
    expect(values.vitals.vitals[0].body_temperature[1].any_event[0]).toBe(ctModel21.getValueNodeParentRef());
    expect(values.vitals.vitals[0].body_temperature[1].any_event[0].symptoms).toBe(ctModel21.getValueNodeParentRef()['symptoms']);
    expect(ctModel21.getValueNodeParentRef()['symptoms']).toBe(emptyObs2.any_event[0].symptoms);
    expect(ctModel21.getValueNodeParentRef()).toBe(emptyObs2.any_event[0]);
  });

  /* !!! ALREADY COMMENTED OUT

   it("Parse Values 2 Fields Inside Rm Containers - Repeating Observations and Containing Event Values - Values Refresh", function () {
   var context = {};
   var values = {
   "vitals": {
   "_link": [
   {
   "|meaning": "Follow up to",
   "|type": "Problem",
   "|target": "ehr://01dc58f3-3659-4ddc-b192-79d21ce31d01"
   }
   ],
   "_uid": [
   "8e35d270-c34f-48a7-ae82-be73b09d448b::example::1"
   ],
   "context": [
   {
   "start_time": [
   "2014-08-12T15:14:35.851+02:00"
   ],
   "setting": [
   {
   "|code": "238",
   "|value": "other care",
   "|terminology": "openehr"
   }
   ]
   }
   ],
   "vitals": [
   {
   "_uid": [
   "18515ffb-3c48-40b0-9087-e2a7aec7c402"
   ],
   "haemoglobin_a1c": [
   {
   "_uid": [
   "2cabd781-24db-486c-986b-19002e43b2ae"
   ],
   "_other_participation": [
   {
   "|function": "performer",
   "|mode": "not specified",
   "|name": "Nurse Bailey"
   }
   ],
   "any_event": [
   {
   "test_name": [
   "Test name 21"
   ],
   "diagnostic_service": [
   "Diagnostic service 91"
   ],
   "test_status": [
   {
   "|code": "at0038",
   "|value": "Final",
   "|terminology": "local"
   }
   ],
   "hba1c": [
   {
   "|numerator": "63.65",
   "|denominator": "100.0",
   "|null": "0.6365"
   }
   ],
   "overall_interpretation": [
   "Overall interpretation 77"
   ],
   "time": [
   "2014-08-12T15:14:35.852+02:00"
   ]
   }
   ],
   "requestor_order_identifier": [
   "Ident. 85"
   ],
   "receiver_order_identifier": [
   "Ident. 22"
   ],
   "laboratory_test_result_identifier": [
   "Ident. 66"
   ],
   "datetime_result_issued": [
   "2014-08-12T15:14:35.852+02:00"
   ]
   }
   ],
   "body_temperature": [
   {
   "_uid": [
   "476077c5-c0d1-419b-ba94-f832817c45f0"
   ],
   "_other_participation": [
   {
   "|function": "performer",
   "|mode": "not specified",
   "|name": "Nurse Bailey"
   }
   ],
   "any_event": [
   {
   "temperature": [
   {
   "|magnitude": 33.3,
   "|unit": "°C"
   }
   ],
   "symptoms": [
   {
   "|code": "at0.64",
   "|value": "Chills / rigor / shivering",
   "|terminology": "local"
   }
   ],
   "body_exposure": [
   {
   "|code": "at0033",
   "|value": "Appropriate clothing/bedding",
   "|terminology": "local"
   }
   ],
   "description_of_thermal_stress": [
   "Description of thermal stress 14"
   ],
   "time": [
   "2014-08-12T15:14:35.853+02:00"
   ]
   },
   {
   "temperature": [
   {
   "|magnitude": 40.1,
   "|unit": "°C"
   }
   ],
   "symptoms": [
   {
   "|code": "at0.65",
   "|value": "Goose-bumps",
   "|terminology": "local"
   }
   ],
   "body_exposure": [
   {
   "|code": "at0033",
   "|value": "Appropriate clothing/bedding",
   "|terminology": "local"
   }
   ],
   "description_of_thermal_stress": [
   "Description of thermal stress 15"
   ],
   "time": [
   "2014-08-12T15:14:36.853+02:00"
   ]
   }
   ],
   "site_of_measurement": [
   {
   "|code": "at0054",
   "|value": "Oesophagus",
   "|terminology": "local"
   }
   ],
   "other_site_of_measurement": [
   "Other site of measurement 3"
   ]
   },
   // body temperature observation 2
   {
   "_uid": [
   "476077c5-c0d1-419b-ba94-f832817c45f1"
   ],
   "_other_participation": [
   {
   "|function": "performer",
   "|mode": "not specified",
   "|name": "Nurse Bailey"
   }
   ],
   "any_event": [
   {
   "temperature": [
   {
   "|magnitude": 30.0,
   "|unit": "°C"
   }
   ]
   },
   {
   "temperature": [
   {
   "|magnitude": 35.0,
   "|unit": "°C"
   }
   ],
   "symptoms": [
   {
   "|code": "at1.66",
   "|value": "Test-fake-value",
   "|terminology": "local"
   }
   ]
   }
   ],
   "site_of_measurement": [
   {
   "|code": "at0054",
   "|value": "Oesophagus",
   "|terminology": "local"
   }
   ],
   "other_site_of_measurement": [
   "Other site of measurement 3"
   ]
   }
   ]
   }
   ]
   }
   };

   var values2 = {
   "vitals": {
   "_link": [
   {
   "|meaning": "Follow up to",
   "|type": "Problem",
   "|target": "ehr://01dc58f3-3659-4ddc-b192-79d21ce31d01"
   }
   ],
   "_uid": [
   "8e35d270-c34f-48a7-ae82-be73b09d448b::example::1"
   ],
   "context": [
   {
   "start_time": [
   "2014-08-12T15:14:35.851+02:00"
   ],
   "setting": [
   {
   "|code": "238",
   "|value": "other care",
   "|terminology": "openehr"
   }
   ]
   }
   ],
   "vitals": [
   {
   "_uid": [
   "18515ffb-3c48-40b0-9087-e2a7aec7c402"
   ],
   "body_temperature": [
   {
   "_uid": [
   "476077c5-c0d1-419b-ba94-f832817c45f0"
   ],
   "_other_participation": [
   {
   "|function": "performer",
   "|mode": "not specified",
   "|name": "Nurse Bailey"
   }
   ],
   "any_event": [
   {
   "temperature": [
   {
   "|magnitude": 33.3,
   "|unit": "°C"
   }
   ],
   "symptoms": [
   {
   "|code": "at0.64",
   "|value": "Chills / rigor / shivering",
   "|terminology": "local"
   }
   ],
   "body_exposure": [
   {
   "|code": "at0033",
   "|value": "Appropriate clothing/bedding",
   "|terminology": "local"
   }
   ],
   "description_of_thermal_stress": [
   "Description of thermal stress 14"
   ],
   "time": [
   "2014-08-12T15:14:35.853+02:00"
   ]
   },
   {
   "temperature": [
   {
   "|magnitude": 40.1,
   "|unit": "°C"
   }
   ],
   "symptoms": [
   {
   "|code": "at0.65",
   "|value": "Goose-bumps",
   "|terminology": "local"
   }
   ],
   "body_exposure": [
   {
   "|code": "at0033",
   "|value": "Appropriate clothing/bedding",
   "|terminology": "local"
   }
   ],
   "description_of_thermal_stress": [
   "Description of thermal stress 15"
   ],
   "time": [
   "2014-08-12T15:14:36.853+02:00"
   ]
   }
   ],
   "site_of_measurement": [
   {
   "|code": "at0054",
   "|value": "Oesophagus",
   "|terminology": "local"
   }
   ],
   "other_site_of_measurement": [
   "Other site of measurement 3"
   ]
   },
   // body temperature observation 2
   {
   "_uid": [
   "476077c5-c0d1-419b-ba94-f832817c45f1"
   ],
   "_other_participation": [
   {
   "|function": "performer",
   "|mode": "not specified",
   "|name": "Nurse Bailey"
   }
   ],
   "any_event": [
   {
   "temperature": [
   {
   "|magnitude": 30.9,
   "|unit": "°C"
   }
   ]
   },
   {
   "temperature": [
   {
   "|magnitude": 35.9,
   "|unit": "°C"
   }
   ],
   "symptoms": [
   {
   "|code": "at1.66",
   "|value": "Test-fake-value",
   "|terminology": "local"
   },
   {
   "|code": "at1.66.2",
   "|value": "Test-fake-value2",
   "|terminology": "local"
   }
   ]
   }
   ],
   "site_of_measurement": [
   {
   "|code": "at0054",
   "|value": "Oesophagus",
   "|terminology": "local"
   }
   ],
   "other_site_of_measurement": [
   "Other site of measurement 3"
   ]
   },
   // body temperature observation 3
   {
   "_uid": [
   "476077c5-c0d1-419b-ba94-f832817c45f1"
   ],
   "_other_participation": [
   {
   "|function": "performer",
   "|mode": "not specified",
   "|name": "Nurse Bailey"
   }
   ],
   "any_event": [
   {
   "temperature": [
   {
   "|magnitude": 27.0,
   "|unit": "°C"
   }
   ],
   "symptoms": [
   {
   "|code": "at1.67",
   "|value": "Test-warm-value",
   "|terminology": "local"
   }
   ]
   }
   ],
   "site_of_measurement": [
   {
   "|code": "at0054",
   "|value": "Oesophagus",
   "|terminology": "local"
   }
   ],
   "other_site_of_measurement": [
   "Other site of measurement 3"
   ]
   }
   ]
   }
   ]
   }
   };
   var rootModel = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription(context, descJsonRmContainers, values);

   expect(rootModel instanceof  FormRootModel).toBeTruthy();
   expect(rootModel.getRmType()).toBe(RmType.FORM_DEFINITION);
   expect(rootModel.getChildCount()).toBe(2);

   var obsModel = rootModel.getChildModel(0);
   expect(obsModel instanceof RmContainerModel).toBeTruthy();
   expect(obsModel.getRmType()).toBe(RmType.OBSERVATION);
   expect(obsModel.getChildCount()).toBe(2);

   var evModel1 = obsModel.getChildModel(0);
   expect(evModel1 instanceof RmContainerModel).toBeTruthy();
   expect(evModel1.getRmType()).toBe(RmType.EVENT);
   expect(evModel1.getChildCount()).toBe(2);

   var qfModel1 = evModel1.getChildModel(0);
   expect(qfModel1 instanceof QuantityFieldModel).toBeTruthy();
   expect(qfModel1.getRmType()).toBe(RmType.DV_QUANTITY);
   expect(qfModel1.getValue("magnitude")).toBeCloseTo(33.3);
   expect(qfModel1.getValue("unit")).toBe("°C");

   var ctModel1 = evModel1.getChildModel(1);
   expect(ctModel1 instanceof CodedTextFieldModel).toBeTruthy();
   expect(ctModel1.getRmType()).toBe(RmType.DV_CODED_TEXT);
   expect(ctModel1.findAncestorWithPath("vitals/vitals/body_temperature/any_event")).toBe(evModel1);
   expect(ctModel1.findAncestorWithPath("vitals/vitals/body_temperature")).toBe(obsModel);
   expect(ctModel1.getValue("code")).toBe("at0.64");
   expect(ctModel1.getValue("value")).toBe("Chills / rigor / shivering");
   expect(ctModel1.getValue("terminology")).toBe("local");

   var evModel2 = obsModel.getChildModel(1);
   expect(evModel2 instanceof RmContainerModel).toBeTruthy();
   expect(evModel2.getRmType()).toBe(RmType.EVENT);
   expect(evModel2.getChildCount()).toBe(2);

   var qfModel2 = evModel2.getChildModel(0);
   expect(qfModel2 instanceof QuantityFieldModel).toBeTruthy();
   expect(qfModel2.getRmType()).toBe(RmType.DV_QUANTITY);
   expect(qfModel2.findAncestorWithPath("vitals/vitals/body_temperature/any_event")).toBe(evModel2);
   expect(qfModel2.findAncestorWithPath("vitals/vitals/body_temperature")).toBe(obsModel);
   expect(qfModel2.getValue("magnitude")).toBeCloseTo(40.1);
   expect(qfModel2.getValue("unit")).toBe("°C");

   var ctModel2 = evModel2.getChildModel(1);
   expect(ctModel2 instanceof CodedTextFieldModel).toBeTruthy();
   expect(ctModel2.getRmType()).toBe(RmType.DV_CODED_TEXT);
   expect(ctModel2.findAncestorWithPath("vitals/vitals/body_temperature/any_event")).toBe(evModel2);
   expect(ctModel2.findAncestorWithPath("vitals/vitals/body_temperature")).toBe(obsModel);
   expect(ctModel2.getValue("code")).toBe("at0.65");
   expect(ctModel2.getValue("value")).toBe("Goose-bumps");
   expect(ctModel2.getValue("terminology")).toBe("local");

   // Second body temperature observation

   var obsModel2 = rootModel.getChildModel(1);
   expect(obsModel2 instanceof RmContainerModel).toBeTruthy();
   expect(obsModel2.getRmType()).toBe(RmType.OBSERVATION);
   expect(obsModel2.getChildCount()).toBe(2);

   var evModel21 = obsModel2.getChildModel(0);
   expect(evModel21 instanceof RmContainerModel).toBeTruthy();
   expect(evModel21.getRmType()).toBe(RmType.EVENT);
   expect(evModel21.getChildCount()).toBe(2);

   var qfModel21 = evModel21.getChildModel(0);
   expect(qfModel21 instanceof QuantityFieldModel).toBeTruthy();
   expect(qfModel21.getRmType()).toBe(RmType.DV_QUANTITY);
   expect(qfModel21.findAncestorWithPath("vitals/vitals/body_temperature/any_event")).toBe(evModel21);
   expect(qfModel21.findAncestorWithPath("vitals/vitals/body_temperature")).toBe(obsModel2);
   expect(qfModel21.getValue("magnitude")).toBeCloseTo(30.0);
   expect(qfModel21.getValue("unit")).toBe("°C");

   var ctModel21 = evModel21.getChildModel(1);
   expect(ctModel21 instanceof CodedTextFieldModel).toBeTruthy();
   expect(ctModel21.getRmType()).toBe(RmType.DV_CODED_TEXT);
   expect(ctModel21.findAncestorWithPath("vitals/vitals/body_temperature/any_event")).toBe(evModel21);
   expect(ctModel21.findAncestorWithPath("vitals/vitals/body_temperature")).toBe(obsModel2);
   expect(ctModel21.getValue()).toBeNull();

   var evModel22 = obsModel2.getChildModel(1);
   expect(evModel22 instanceof RmContainerModel).toBeTruthy();
   expect(evModel22.getRmType()).toBe(RmType.EVENT);
   expect(evModel22.getChildCount()).toBe(2);

   var qfModel22 = evModel22.getChildModel(0);
   expect(qfModel22 instanceof QuantityFieldModel).toBeTruthy();
   expect(qfModel22.getRmType()).toBe(RmType.DV_QUANTITY);
   expect(qfModel22.findAncestorWithPath("vitals/vitals/body_temperature/any_event")).toBe(evModel22);
   expect(qfModel22.findAncestorWithPath("vitals/vitals/body_temperature")).toBe(obsModel2);
   expect(qfModel22.getValue("magnitude")).toBeCloseTo(35.0);
   expect(qfModel22.getValue("unit")).toBe("°C");

   var ctModel22 = evModel22.getChildModel(1);
   expect(ctModel22 instanceof CodedTextFieldModel).toBeTruthy();
   expect(ctModel22.getRmType()).toBe(RmType.DV_CODED_TEXT);
   expect(ctModel22.findAncestorWithPath("vitals/vitals/body_temperature/any_event")).toBe(evModel22);
   expect(ctModel22.findAncestorWithPath("vitals/vitals/body_temperature")).toBe(obsModel2);
   expect(ctModel22.getValue("code")).toBe("at1.66");
   expect(ctModel22.getValue("value")).toBe("Test-fake-value");
   expect(ctModel22.getValue("terminology")).toBe("local");
   console.log("1st val: ", ctModel22.getInputFor("code").getValue());

   // Refresh

   (new ThinkEhrModelParser(rmTypeModelDictionary) ).refreshValues(rootModel, values2);
   expect(rootModel.getChildCount()).toBe(3);

   // First observation
   expect(obsModel.getChildCount()).toBe(2);

   expect(evModel1.getChildCount()).toBe(2);

   expect(qfModel1.getValue("magnitude")).toBeCloseTo(33.3);
   expect(qfModel1.getValue("unit")).toBe("°C");
   expect(qfModel1.getInputFor("magnitude").getValue()).toBe(33.3);
   expect(qfModel1.getInputFor("unit").getValue()).toBe("°C");

   expect(ctModel1.findAncestorWithPath("vitals/vitals/body_temperature/any_event")).toBe(evModel1);
   expect(ctModel1.findAncestorWithPath("vitals/vitals/body_temperature")).toBe(obsModel);
   expect(ctModel1.getValue("code")).toBe("at0.64");
   expect(ctModel1.getValue("value")).toBe("Chills / rigor / shivering");
   expect(ctModel1.getValue("terminology")).toBe("local");
   expect(ctModel1.getInputFor("code").getValue()).toBe("at0.64");

   expect(evModel2.getChildCount()).toBe(2);

   expect(qfModel2.findAncestorWithPath("vitals/vitals/body_temperature/any_event")).toBe(evModel2);
   expect(qfModel2.findAncestorWithPath("vitals/vitals/body_temperature")).toBe(obsModel);
   expect(qfModel2.getValue("magnitude")).toBeCloseTo(40.1);
   expect(qfModel2.getValue("unit")).toBe("°C");
   expect(qfModel2.getInputFor("magnitude").getValue()).toBe(40.1);
   expect(qfModel2.getInputFor("unit").getValue()).toBe("°C");

   expect(ctModel2.findAncestorWithPath("vitals/vitals/body_temperature/any_event")).toBe(evModel2);
   expect(ctModel2.findAncestorWithPath("vitals/vitals/body_temperature")).toBe(obsModel);
   expect(ctModel2.getValue("code")).toBe("at0.65");
   expect(ctModel2.getValue("value")).toBe("Goose-bumps");
   expect(ctModel2.getValue("terminology")).toBe("local");
   expect(ctModel2.getInputFor("code").getValue()).toBe("at0.65");

   // Second observation
   expect(obsModel2.getChildCount()).toBe(2);

   expect(evModel21.getChildCount()).toBe(2);

   expect(qfModel21.findAncestorWithPath("vitals/vitals/body_temperature/any_event")).toBe(evModel21);
   expect(qfModel21.findAncestorWithPath("vitals/vitals/body_temperature")).toBe(obsModel2);
   expect(qfModel21.getValue("magnitude")).toBeCloseTo(30.9);
   expect(qfModel21.getValue("unit")).toBe("°C");
   expect(qfModel21.getInputFor("magnitude").getValue()).toBe(30.9);
   expect(qfModel21.getInputFor("unit").getValue()).toBe("°C");

   expect(ctModel21.findAncestorWithPath("vitals/vitals/body_temperature/any_event")).toBe(evModel21);
   expect(ctModel21.findAncestorWithPath("vitals/vitals/body_temperature")).toBe(obsModel2);
   expect(ctModel21.getValue()).toBeNull();
   expect(qfModel22.getInputFor("code")).toBeNull();

   expect(evModel22.getChildCount()).toBe(2);

   expect(qfModel22.findAncestorWithPath("vitals/vitals/body_temperature/any_event")).toBe(evModel22);
   expect(qfModel22.findAncestorWithPath("vitals/vitals/body_temperature")).toBe(obsModel2);
   expect(qfModel22.getValue("magnitude")).toBeCloseTo(35.9);
   expect(qfModel22.getValue("unit")).toBe("°C");
   expect(qfModel22.getInputFor("magnitude").getValue()).toBe(35.9);
   expect(qfModel22.getInputFor("unit").getValue()).toBe("°C");

   expect(ctModel22.findAncestorWithPath("vitals/vitals/body_temperature/any_event")).toBe(evModel22);
   expect(ctModel22.findAncestorWithPath("vitals/vitals/body_temperature")).toBe(obsModel2);
   var codes = ctModel22.getInputFor("code").getValue();
   expect(ThinkEhrUtil.isArray(codes)).toBeTruthy();
   expect(codes.length).toBe(2);
   expect(codes[0]).toBe("at1.66");
   expect(codes[1]).toBe("at1.66.2");

   });*/

  it("Parse Values 3 Fields, Deeper Hierarchy - Partial Values", function () {

    var context:any = {};
    var values:any = {
      "vitals": {
        "_link": [
          {
            "|meaning": "Follow up to",
            "|type": "Problem",
            "|target": "ehr://23b347b3-767c-4997-b241-cb85b5a4aaff"
          }
        ],
        "_uid": [
          "770bfdd4-cfad-4a8d-a584-f8c0a59673b7::example::1"
        ],
        "context": [
          {
            "start_time": [
              "2014-08-27T09:11:17.524+02:00"
            ],
            "setting": [
              {
                "|code": "238",
                "|value": "other care",
                "|terminology": "openehr"
              }
            ]
          }
        ],
        "vitals": [
          {
            "_uid": [
              "2f2beac2-5fba-40c4-a6d4-fc07538e8009"
            ],
            "body_temperature": [
              {
                "_uid": [
                  "bfbcd251-7fe3-4a5b-9f8f-5a4a589a7bfa"
                ],
                "_other_participation": [
                  {
                    "|function": "performer",
                    "|mode": "not specified",
                    "|name": "Nurse Bailey"
                  }
                ],
                "any_event": [
                  {
                    "body_exposure": [
                      {
                        "|code": "at0034",
                        "|value": "Increased clothing/bedding",
                        "|terminology": "local"
                      },
                      {
                        "|code": "at0035",
                        "|value": "Fake Test values",
                        "|terminology": "local"
                      }
                    ],
                    "description_of_thermal_stress": [
                      "Description of thermal stress 9"
                    ],
                    "time": [
                      "2014-08-27T09:11:17.528+02:00"
                    ]
                  },
                  {
                    "temperature": [
                      {
                        "|magnitude": 26.2,
                        "|unit": "°C"
                      },
                      {
                        "|magnitude": 30.1,
                        "|unit": "°C"
                      }
                    ],
                    "symptoms": [
                      {
                        "|code": "at0.65",
                        "|value": "Goose- bumps",
                        "|terminology": "local"
                      }
                    ],

                    "description_of_thermal_stress": [
                      "Description of thermal stress 9"
                    ],
                    "time": [
                      "2014-08-27T09:11:17.528+02:00"
                    ]
                  }
                ],
                "site_of_measurement": [
                  {
                    "|code": "at0054",
                    "|value": "Oesophagus",
                    "|terminology": "local"
                  }
                ],
                "other_site_of_measurement": [
                  "Other site of measurement 12"
                ]
              },
              // Empty body temperature observation
              {}
            ]
          },
          // Empty vitals section
          {}
        ]
      }
    };

    var rootModel = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription(context, descFromRootMulti, values, null);
    expect(rootModel.getRmType()).toBe(RmType.FORM_DEFINITION);
    expect(rootModel.getValueNodeRef()).toBe(values);
    expect(rootModel.getValueNodeParentRef()).toBeUndefined();
    expect(rootModel.getChildCount()).toBe(1);

    var compModel:RmContainerModel = rootModel.getChildModel(0) as RmContainerModel;
    expect(compModel instanceof RmContainerModel).toBe(true);

    expect(compModel.getRmType()).toBe(RmType.COMPOSITION);
    expect(compModel.getValueNodeRef()).toBe(values.vitals);
    expect(compModel.getValueNodeParentRef()).toBe(values);
    expect(compModel.getChildCount()).toBe(2);

    var vitalsSectionModel1 = compModel.getChildModel(0) as RmContainerModel;
    expect(vitalsSectionModel1 instanceof RmContainerModel).toBe(true);
    expect(vitalsSectionModel1.getRmType()).toBe(RmType.SECTION);
    expect(vitalsSectionModel1.getValueNodeRef()).toBe(values.vitals.vitals[0]);
    expect(vitalsSectionModel1.getValueNodeParentRef()).toBe(values.vitals.vitals);
    expect(vitalsSectionModel1.getChildCount()).toBe(2);

    var obsModel11 = vitalsSectionModel1.getChildModel(0) as RmContainerModel;
    expect(obsModel11 instanceof RmContainerModel).toBe(true);
    expect(obsModel11.getRmType()).toBe(RmType.OBSERVATION);
    expect(obsModel11.getValueNodeRef()).toBe(values.vitals.vitals[0].body_temperature[0]);
    expect(obsModel11.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature);
    expect(obsModel11.getChildCount()).toBe(2);

    var evModel11 = obsModel11.getChildModel(0) as RmContainerModel;
    expect(evModel11 instanceof RmContainerModel).toBe(true);
    expect(evModel11.getRmType()).toBe(RmType.EVENT);
    expect(evModel11.getValueNodeRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event[0]);
    expect(evModel11.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event);
    expect(evModel11.getChildCount()).toBe(3);

    var qfModel11:QuantityFieldModel = evModel11.getChildModel(0) as QuantityFieldModel;
    expect(qfModel11 instanceof QuantityFieldModel).toBe(true);
    expect(qfModel11.getRmType()).toBe(RmType.DV_QUANTITY);
    expect(qfModel11.getValueNodeRef()[0]).toBeUndefined();
    expect(qfModel11.getFormId()).toBe('vitals/vitals/body_temperature/any_event/temperature');
    expect(qfModel11.getValueNodeParentRef()['temperature']).toBe(values.vitals.vitals[0].body_temperature[0].any_event[0].temperature);
    expect(qfModel11.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event[0]);
    expect(qfModel11.getValue()[0]).toBeUndefined();

    var ctModel11 = evModel11.getChildModel(1) as CodedTextFieldModel;
    expect(ctModel11 instanceof CodedTextFieldModel).toBe(true);
    expect(ctModel11.getRmType()).toBe(RmType.DV_CODED_TEXT);
    expect(ctModel11.getValueNodeRef().length).toBe(0);
    expect(ctModel11.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event[0]);///.symptoms);
    expect(ctModel11.getValue().length).toBe(0);

    var beModel11 = evModel11.getChildModel(2) as CodedTextFieldModel;
    expect(beModel11 instanceof CodedTextFieldModel).toBe(true);
    expect(beModel11.getRmType()).toBe(RmType.DV_CODED_TEXT);
    expect(beModel11.getValueNodeRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event[0].body_exposure);
    expect(beModel11.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event[0]);
    expect(beModel11.getValue()).toEqual(values.vitals.vitals[0].body_temperature[0].any_event[0].body_exposure);
    expect(beModel11.getValue()[0]).toBe(values.vitals.vitals[0].body_temperature[0].any_event[0].body_exposure[0]);

    var evModel12:RmContainerModel = obsModel11.getChildModel(1) as RmContainerModel;
    expect(evModel12 instanceof RmContainerModel).toBe(true);
    expect(evModel12.getRmType()).toBe(RmType.EVENT);
    expect(evModel12.getValueNodeRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event[1]);
    expect(evModel12.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event);
    expect(evModel12.getChildCount()).toBe(3);

    var qfModel12 = evModel12.getChildModel(0) as QuantityFieldModel;
    expect(qfModel12 instanceof QuantityFieldModel).toBe(true);
    expect(qfModel12.getRmType()).toBe(RmType.DV_QUANTITY);
    expect(qfModel12.getValueNodeRef()[1]).toBe(values.vitals.vitals[0].body_temperature[0].any_event[1].temperature[1]);
    expect(qfModel12.isMulti()).toBe(true);
    expect(qfModel12.getValueNodeParentRef()['temperature']).toBe(values.vitals.vitals[0].body_temperature[0].any_event[1].temperature);
    expect(qfModel12.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event[1]);

    expect(qfModel12.getValue()[0]).toBe(values.vitals.vitals[0].body_temperature[0].any_event[1].temperature[0]);
    expect(qfModel12.getValue()[1]).toBe(values.vitals.vitals[0].body_temperature[0].any_event[1].temperature[1]);
    expect(qfModel12.getValue("magnitude", 0)).toBeCloseTo(26.2);
    expect(qfModel12.getValue("magnitude", 1)).toBeCloseTo(30.1);
    expect(qfModel12.getValue(undefined, 0)).toBe(values.vitals.vitals[0].body_temperature[0].any_event[1].temperature[0]);
    expect(qfModel12.getValue(undefined, 1)).toBe(values.vitals.vitals[0].body_temperature[0].any_event[1].temperature[1]);

    var ctModel12 = evModel12.getChildModel(1) as CodedTextFieldModel;
    expect(ctModel12 instanceof CodedTextFieldModel).toBe(true);
    expect(ctModel12.getRmType()).toBe(RmType.DV_CODED_TEXT);
    expect(ctModel12.getValueNodeRef()[0]).toBe(values.vitals.vitals[0].body_temperature[0].any_event[1].symptoms[0]);
    expect(ctModel12.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event[1]);///.symptoms);
    expect(ctModel12.isMulti()).toBe(true);
    expect(ctModel12.getValue()[0]).toBe(values.vitals.vitals[0].body_temperature[0].any_event[1].symptoms[0]);
    expect(ctModel12.getValue("code",0)).toBe("at0.65");

    var beModel12 = evModel12.getChildModel(2) as CodedTextFieldModel;
    expect(beModel12 instanceof CodedTextFieldModel).toBe(true);
    expect(beModel12.getRmType()).toBe(RmType.DV_CODED_TEXT);
    expect(beModel12.getValueNodeRef().length).toBe(0);
    expect(beModel12.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event[1]);
    expect(beModel12.getValueNodeRef()).toBe(values.vitals.vitals[0].body_temperature[0].any_event[1].body_exposure);
    expect(beModel12.getValue()).toEqual(beModel12.getValueNodeRef());

    //

    var obsModel12 = vitalsSectionModel1.getChildModel(1) as RmContainerModel;
    expect(obsModel12 instanceof RmContainerModel).toBe(true);
    expect(obsModel12.getRmType()).toBe(RmType.OBSERVATION);
    expect(obsModel12.getValueNodeRef()).toBe(values.vitals.vitals[0].body_temperature[1]);
    expect(obsModel12.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature);
    expect(obsModel12.getChildCount()).toBe(1);

    var evModel121 = obsModel12.getChildModel(0) as RmContainerModel;
    expect(evModel121 instanceof RmContainerModel).toBe(true);
    expect(evModel121.getRmType()).toBe(RmType.EVENT);
    expect(evModel121.getValueNodeRef()).toBe(values.vitals.vitals[0].body_temperature[1].any_event[0]);
    expect(evModel121.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[1].any_event);
    expect(evModel121.getChildCount()).toBe(3);

    var qfModel121 = evModel121.getChildModel(0) as QuantityFieldModel;
    expect(qfModel121 instanceof QuantityFieldModel).toBe(true);
    expect(qfModel121.getRmType()).toBe(RmType.DV_QUANTITY);
    expect(qfModel121.getValueNodeRef().length).toBe(0);
    expect(qfModel121.getValue(undefined, 0)).toBeNull();
    expect(qfModel121.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[1].any_event[0]);
    expect(qfModel121.getValueNodeParentRef()['temperature']).toBe(values.vitals.vitals[0].body_temperature[1].any_event[0].temperature);
    expect(qfModel121.getValue(undefined, 0)).toBeNull();

    var ctModel121 = evModel121.getChildModel(1) as CodedTextFieldModel;
    expect(ctModel121 instanceof CodedTextFieldModel).toBe(true);
    expect(ctModel121.getRmType()).toBe(RmType.DV_CODED_TEXT);
    expect(ctModel121.getValueNodeRef()).toBeNull();
    expect(ctModel121.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[1].any_event[0]);///.symptoms);
    expect(ctModel121.getValue().length).toBe(0);

    var beModel121 = evModel121.getChildModel(2) as CodedTextFieldModel;
    expect(beModel121 instanceof CodedTextFieldModel).toBe(true);
    expect(beModel121.getValueNodeRef().length).toBe(0);
    expect(beModel121.getValueNodeParentRef()).toBe(values.vitals.vitals[0].body_temperature[1].any_event[0]);
    expect(beModel121.getValueNodeRef()).toBe(values.vitals.vitals[0].body_temperature[1].any_event[0].body_exposure);
    expect(beModel121.getValue()).toEqual(beModel121.getValueNodeRef());

    //

    var vitalsSectionModel2 = compModel.getChildModel(1) as RmContainerModel;
    expect(vitalsSectionModel2 instanceof RmContainerModel).toBe(true);
    expect(vitalsSectionModel2.getRmType()).toBe(RmType.SECTION);
    expect(vitalsSectionModel2.getValueNodeRef()).toBe(values.vitals.vitals[1]);
    expect(vitalsSectionModel2.getValueNodeParentRef()).toBe(values.vitals.vitals);
    expect(vitalsSectionModel2.getChildCount()).toBe(1);

    var obsModel21 = vitalsSectionModel2.getChildModel(0) as RmContainerModel;
    expect(obsModel21 instanceof RmContainerModel).toBe(true);
    expect(obsModel21.getRmType()).toBe(RmType.OBSERVATION);
    expect(obsModel21.getValueNodeRef()).toBe(values.vitals.vitals[1].body_temperature[0]);
    expect(obsModel21.getValueNodeParentRef()).toBe(values.vitals.vitals[1].body_temperature);
    expect(obsModel21.getChildCount()).toBe(1);

    var evModel21 = obsModel21.getChildModel(0) as RmContainerModel;
    expect(evModel21 instanceof RmContainerModel).toBe(true);
    expect(evModel21.getRmType()).toBe(RmType.EVENT);
    expect(evModel21.getValueNodeRef()).toBe(values.vitals.vitals[1].body_temperature[0].any_event[0]);
    expect(evModel21.getValueNodeParentRef()).toBe(values.vitals.vitals[1].body_temperature[0].any_event);
    expect(evModel21.getChildCount()).toBe(3);

    var qfModel21 = evModel21.getChildModel(0) as QuantityFieldModel;
    expect(qfModel21 instanceof QuantityFieldModel).toBe(true);
    expect(qfModel21.getRmType()).toBe(RmType.DV_QUANTITY);
    expect(qfModel21.getValueNodeRef().length).toBe(0);
    expect(qfModel21.getValue(undefined, 0)).toBeNull();
    expect(qfModel21.getValueNodeParentRef()['temperature']).toBe(values.vitals.vitals[1].body_temperature[0].any_event[0].temperature);
    expect(qfModel21.getValue()).toEqual(values.vitals.vitals[1].body_temperature[0].any_event[0].temperature);
    expect(qfModel21.getValue(undefined, 0)).toBeNull();

    var ctModel21 = evModel21.getChildModel(1) as CodedTextFieldModel;
    expect(ctModel21 instanceof CodedTextFieldModel).toBe(true);
    expect(ctModel21.getRmType()).toBe(RmType.DV_CODED_TEXT);
    expect(ctModel21.getValueNodeRef().length).toBe(0);
    expect(ctModel21.getValueNodeParentRef()).toBe(values.vitals.vitals[1].body_temperature[0].any_event[0]);///.symptoms);
    expect(ctModel21.getValue()).toBeNull();

    var beModel21 = evModel21.getChildModel(2) as CodedTextFieldModel;
    expect(beModel21 instanceof CodedTextFieldModel).toBe(true);
    expect(beModel21.getRmType()).toBe(RmType.DV_CODED_TEXT);
    expect(beModel21.getValueNodeRef().length).toBe(0);
    expect(beModel21.getValueNodeParentRef()).toBe(values.vitals.vitals[1].body_temperature[0].any_event[0]);
    expect(beModel21.getValueNodeRef()).toBe(values.vitals.vitals[1].body_temperature[0].any_event[0].body_exposure);
    expect(beModel21.getValue()).toEqual(beModel21.getValueNodeRef());
  });

  it("Container Model Duplication (duplicateModel())", function () {
    var values = {};
    var rootModel = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, descFromRoot, values, null);
    var eventModel:RmContainerModel = rootModel.getChildModel(0).getChildModel(0).getChildModel(0).getChildModel(0) as RmContainerModel;
    expect(eventModel).toBeTruthy();
    expect(eventModel.getRmType()).toBe(RmType.EVENT);

    var duplicatedModel = (new ThinkEhrModelParser(rmTypeModelDictionary) ).duplicateModel(eventModel, eventModel);
    expect(duplicatedModel).toBeTruthy();
    expect(duplicatedModel.getRmType()).toBe(RmType.EVENT);
    expect(duplicatedModel == eventModel).toBeFalsy();
    expect(duplicatedModel.getParentModel()).toBe(eventModel.getParentModel());
    expect(duplicatedModel.getValueNodeRef() == eventModel.getValueNodeRef()).toBeFalsy();
    expect(duplicatedModel.getValueNodeParentRef()).toBe(eventModel.getValueNodeParentRef());
    expect(eventModel.getParentModel().getChildModel(0)).toBe(eventModel);
    expect(eventModel.getParentModel().getChildModel(1)).toBe(duplicatedModel);
    var quantChildModel:QuantityFieldModel = duplicatedModel.getChildModel(0) as QuantityFieldModel;
    expect(quantChildModel.getRmType()).toBe(RmType.DV_QUANTITY);
    expect(quantChildModel.getValueNodeRef() == eventModel.getChildModel(0)['getValueNodeRef']).toBeFalsy();
    expect(quantChildModel.getValueNodeParentRef() == eventModel.getChildModel(0)['getValueNodeParentRef']()).toBeFalsy();

    // Insert in the middle
    var middleModel = (new ThinkEhrModelParser(rmTypeModelDictionary) ).duplicateModel(eventModel, eventModel);
    expect(middleModel).toBeTruthy();
    expect(middleModel.getRmType()).toBe(RmType.EVENT);
    expect(middleModel == eventModel).toBeFalsy();
    expect(middleModel.getParentModel()).toBe(eventModel.getParentModel());
    expect(middleModel.getValueNodeRef() == eventModel.getValueNodeRef()).toBeFalsy();
    expect(middleModel.getValueNodeParentRef()).toBe(eventModel.getValueNodeParentRef());
    expect(eventModel.getParentModel().getChildModel(0)).toBe(eventModel);
    expect(eventModel.getParentModel().getChildModel(1)).toBe(middleModel);
    expect(eventModel.getParentModel().getChildModel(2)).toBe(duplicatedModel);
    var q1ChildModel:QuantityFieldModel = middleModel.getChildModel(0) as QuantityFieldModel;
    expect(q1ChildModel.getRmType()).toBe(RmType.DV_QUANTITY);
    expect(q1ChildModel.getValueNodeRef() == eventModel.getChildModel(0)['getValueNodeRef']).toBeFalsy();
    expect(q1ChildModel.getValueNodeParentRef() == eventModel.getChildModel(0)['getValueNodeParentRef']()).toBeFalsy();

    var obsModel:RmContainerModel = middleModel.getParentModel() as RmContainerModel;
    expect(obsModel.getRmType()).toBe(RmType.OBSERVATION);
    var obsModel2 = (new ThinkEhrModelParser(rmTypeModelDictionary) ).duplicateModel(obsModel, obsModel);
    expect(obsModel2).toBeTruthy();
    expect(obsModel2.getRmType()).toBe(RmType.OBSERVATION);
    expect(obsModel == obsModel2).toBeFalsy();
    expect(obsModel2.getParentModel()).toBe(obsModel.getParentModel());
    expect(obsModel2.getValueNodeRef() == obsModel['getValueNodeRef']()).toBeFalsy();
    expect(obsModel2.getValueNodeParentRef()).toBe(obsModel.getValueNodeParentRef());
    expect(obsModel.getChildCount()).toBe(3);
    expect(obsModel2.getChildCount()).toBe(1);
    var rm1ChildModel:RmContainerModel = obsModel2.getChildModel(0) as RmContainerModel;
    expect(rm1ChildModel.getRmType()).toBe(RmType.EVENT);
    expect(rm1ChildModel == obsModel.getChildModel(0)).toBeFalsy();
  });

  it("Container Model Removal (destroyModel())", function () {
    var values = {
      "vitals": {
        "_link": [
          {
            "|meaning": "Follow up to",
            "|type": "Problem",
            "|target": "ehr://23b347b3-767c-4997-b241-cb85b5a4aaff"
          }
        ],
        "_uid": [
          "770bfdd4-cfad-4a8d-a584-f8c0a59673b7::example::1"
        ],
        "context": [
          {
            "start_time": [
              "2014-08-27T09:11:17.524+02:00"
            ],
            "setting": [
              {
                "|code": "238",
                "|value": "other care",
                "|terminology": "openehr"
              }
            ]
          }
        ],
        "vitals": [
          {
            "_uid": [
              "2f2beac2-5fba-40c4-a6d4-fc07538e8009"
            ],
            "body_temperature": [
              {
                "_uid": [
                  "bfbcd251-7fe3-4a5b-9f8f-5a4a589a7bfa"
                ],
                "_other_participation": [
                  {
                    "|function": "performer",
                    "|mode": "not specified",
                    "|name": "Nurse Bailey"
                  }
                ],
                "any_event": [
                  {
                    "body_exposure": [
                      {
                        "|code": "at0034",
                        "|value": "Increased clothing/bedding",
                        "|terminology": "local"
                      }
                    ],
                    "description_of_thermal_stress": [
                      "Description of thermal stress 9"
                    ],
                    "time": [
                      "2014-08-27T09:11:17.528+02:00"
                    ]
                  },
                  {
                    "temperature": [
                      {
                        "|magnitude": 26.2,
                        "|unit": "°C"
                      }
                    ],
                    "symptoms": [
                      {
                        "|code": "at0.65",
                        "|value": "Goose- bumps",
                        "|terminology": "local"
                      }
                    ],

                    "description_of_thermal_stress": [
                      "Description of thermal stress 9"
                    ],
                    "time": [
                      "2014-08-27T09:11:17.528+02:00"
                    ]
                  }
                ],
                "site_of_measurement": [
                  {
                    "|code": "at0054",
                    "|value": "Oesophagus",
                    "|terminology": "local"
                  }
                ],
                "other_site_of_measurement": [
                  "Other site of measurement 12"
                ]
              },
              // Empty body temperature
              {}
            ]
          }
        ]
      }
    };
    var rootModel = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, descFromRootMulti2, values, null);
    var vitalsModel = rootModel.getChildModel(0).getChildModel(0) as FormObjectModel;
    expect(vitalsModel).toBeTruthy();
    expect(vitalsModel.getRmType()).toBe(RmType.SECTION);
    expect(vitalsModel.getChildCount()).toBe(2);

    var obs1 = vitalsModel.getChildModel(0) as FormObjectModel;
    expect(obs1.getRmType()).toBe(RmType.OBSERVATION);
    expect(obs1.getChildCount()).toBe(2);
    var ev1 = obs1.getChildModel(0) as FormObjectModel;
    expect(ev1.getRmType()).toBe(RmType.EVENT);
    expect(ev1.getChildCount()).toBe(3);
    var ev1Child2 = ev1.getChildModel(2) as CodedTextFieldModel;
    expect(ev1Child2.getValue("code")).toBe("at0034");

    var ev2 = obs1.getChildModel(1) as FormObjectModel;
    expect(ev2.getRmType()).toBe(RmType.EVENT);
    expect(ev2.getChildCount()).toBe(3);

    ev1.destroy();
    expect(obs1.getChildCount()).toBe(1);
    expect(obs1.getChildModel(0)).toBe(ev2);
    var obs1Child = obs1.getChildModel(0).getChildModel(0) as DirectValueModel;
    expect(obs1Child.getValue("magnitude")).toBeCloseTo(26.2, null);

    var obs2 = vitalsModel.getChildModel(1) as FormObjectModel;
    expect(obs2.getRmType()).toBe(RmType.OBSERVATION);
    expect(obs2.getChildCount()).toBe(1);

    obs2.destroy();
    expect(vitalsModel.getChildCount()).toBe(1);
    expect(vitalsModel.getChildModel(0)).toBe(obs1);
  });

  it("Model Refresh - Add, Modify, Remove", function () {
    var values:any = {
      "vitals": {
        "vitals": [
          {
            "body_temperature": [
              {
                "any_event": [
                  {
                    "temperature": [
                      {
                        "|magnitude": 33.3,
                        "|unit": "°C"
                      }
                    ],
                    "symptoms": [
                      {
                        "|code": "at0.64",
                        "|value": "Chills / rigor / shivering",
                        "|terminology": "local"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    };

    var values2:any = {
      "vitals": {
        "vitals": [
          {
            "body_temperature": [
              {
                "any_event": [
                  {
                    "temperature": [
                      {
                        "|magnitude": 40.1,
                        "|unit": "°C"
                      }
                    ],
                    "symptoms": [
                      {
                        "|code": "at0.65",
                        "|value": "Goose-bumps",
                        "|terminology": "local"
                      }
                    ]
                  },
                  {
                    "temperature": [
                      {
                        "|magnitude": 50.1,
                        "|unit": "°C"
                      }
                    ],
                    "symptoms": [
                      {
                        "|code": "at3.66",
                        "|value": "Test A",
                        "|terminology": "local"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    };

    var values2a:any = {
      "vitals": {
        "vitals": [
          {
            "body_temperature": [
              {
                "any_event": [
                  {
                    "temperature": [
                      {
                        "|magnitude": 40.1,
                        "|unit": "°C"
                      }
                    ],
                    "symptoms": [
                      {
                        "|code": "at0.65",
                        "|value": "Goose-bumps",
                        "|terminology": "local"
                      }
                    ]
                  },
                  {
                    "temperature": [
                      {
                        "|magnitude": 48.8,
                        "|unit": "°C"
                      }
                    ],
                    "symptoms": [
                      {
                        "|code": "at8.66",
                        "|value": "Test A",
                        "|terminology": "local"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    };

    var values3:any = {
      "vitals": {
        "vitals": [
          {
            "body_temperature": [
              {
                "any_event": [
                  {
                    "temperature": [
                      {
                        "|magnitude": 55.1,
                        "|unit": "°C"
                      }
                    ],
                    "symptoms": [
                      {
                        "|code": "at4.66",
                        "|value": "Test A",
                        "|terminology": "local"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    };

    var values4:any = {
      "vitals": {
        "vitals": [
          {
            "body_temperature": [
              {
                "any_event": [
                  {
                    "temperature": [
                      {
                        "|magnitude": 55.1,
                        "|unit": "°C"
                      }
                    ],
                    "symptoms": [
                      {
                        "|code": "at10.66",
                        "|value": "Test A",
                        "|terminology": "local"
                      }
                    ]
                  },
                  {
                    "temperature": [
                      {
                        "|magnitude": 39.9,
                        "|unit": "°C"
                      }
                    ]
                  }
                ]
              },
              // 2nd observation
              {
                "any_event": [
                  {
                    "temperature": [
                      {
                        "|magnitude": 20.0,
                        "|unit": "°C"
                      }
                    ]
                  },
                  {
                    "temperature": [
                      {
                        "|magnitude": 30.0,
                        "|unit": "°C"
                      }
                    ],
                    "symptoms": [
                      {
                        "|code": "at11.66",
                        "|value": "Test A",
                        "|terminology": "local"
                      },
                      {
                        "|code": "at12.66",
                        "|value": "Test A",
                        "|terminology": "local"
                      }
                    ]
                  },
                  {
                    "temperature": [
                      {
                        "|magnitude": 40.0,
                        "|unit": "°C"
                      }
                    ]
                  }
                ]
              },
              // 3rd observation
              {
                // empty
              }
            ]
          }
        ]
      }
    };

    var values5:any = {
      "vitals": {
        "vitals": [
          {
            "body_temperature": [
              {
                "any_event": [
                  {
                    "temperature": [
                      {
                        "|magnitude": 56.19,
                        "|unit": "°C"
                      }
                    ],
                    "symptoms": [
                      {
                        "|code": "at15.66",
                        "|value": "Test A",
                        "|terminology": "local"
                      }
                    ]
                  },
                  {
                    "temperature": [
                      {
                        "|magnitude": 38.97,
                        "|unit": "°C"
                      }
                    ]
                  },
                  {
                    "symptoms": [
                      {
                        "|code": "at14.66",
                        "|value": "Test A",
                        "|terminology": "local"
                      }
                    ]
                  }
                ]
              },
              // 2nd observation
              {
                "any_event": [
                  {
                    "temperature": [
                      {
                        "|magnitude": 21.0,
                        "|unit": "°C"
                      }
                    ]
                  },
                  {
                    "temperature": [
                      {
                        "|magnitude": 30.0,
                        "|unit": "°C"
                      }
                    ],
                    "symptoms": [
                      {
                        "|code": "at13.66",
                        "|value": "Test A",
                        "|terminology": "local"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    };

    var context = {};
    var rootModel = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription(context, descJsonRmContainersMulti2, values, null);

    var obsModel = rootModel.getChildModel(0) as RmContainerModel;
    expect(obsModel.getRmType()).toBe(RmType.OBSERVATION);
    expect(obsModel.getChildCount()).toBe(1);
    var eventModel = obsModel.getChildModel(0) as RmContainerModel;
    expect(eventModel.getRmType()).toBe(RmType.EVENT);
    expect(eventModel.getChildCount()).toBe(2);
    var quantityModel = eventModel.getChildModel(0) as QuantityFieldModel;
    expect(quantityModel instanceof QuantityFieldModel).toBeTruthy();
    expect(quantityModel.getValue("magnitude", 0)).toBe(33.3);
    var symptomModel = eventModel.getChildModel(1) as CodedTextFieldModel;
    expect(symptomModel instanceof CodedTextFieldModel).toBeTruthy();
    expect(symptomModel.getValue("code", 0)).toBe("at0.64");

    // Refresh to add
    (new ThinkEhrModelParser(rmTypeModelDictionary) ).refreshValues(rootModel, values2);
    expect(obsModel.getChildCount()).toBe(2);
    expect(eventModel.getRmType()).toBe(RmType.EVENT);
    expect(eventModel.getChildCount()).toBe(2);
    expect(quantityModel instanceof QuantityFieldModel).toBeTruthy();
    expect(quantityModel.getValue("magnitude", 0)).toBe(40.1);
    expect(symptomModel instanceof CodedTextFieldModel).toBeTruthy();
    expect(symptomModel.getValue("code", 0)).toBe("at0.65");

    var eventModel2 = obsModel.getChildModel(1) as RmContainerModel;
    expect(eventModel2.getRmType()).toBe(RmType.EVENT);
    expect(eventModel2.getChildCount()).toBe(2);
    var quantityModel2 = eventModel2.getChildModel(0) as QuantityFieldModel;
    expect(quantityModel2 instanceof QuantityFieldModel).toBeTruthy();
    expect(quantityModel2.getValue("magnitude", 0)).toBe(50.1);
    var symptomModel2 = eventModel2.getChildModel(1) as CodedTextFieldModel;
    expect(symptomModel2 instanceof CodedTextFieldModel).toBeTruthy();
    expect(symptomModel2.getValue("code", 0)).toBe("at3.66");

    // Refresh just to modify second event
    (new ThinkEhrModelParser(rmTypeModelDictionary) ).refreshValues(rootModel, values2a);
    expect(obsModel.getChildCount()).toBe(2);
    expect(eventModel.getRmType()).toBe(RmType.EVENT);
    expect(eventModel.getChildCount()).toBe(2);
    expect(quantityModel instanceof QuantityFieldModel).toBeTruthy();
    expect(quantityModel.getValue("magnitude", 0)).toBe(40.1);
    expect(symptomModel instanceof CodedTextFieldModel).toBeTruthy();
    expect(symptomModel.getValue("code", 0)).toBe("at0.65");
    expect(eventModel2.getRmType()).toBe(RmType.EVENT);
    expect(eventModel2.getChildCount()).toBe(2);
    expect(quantityModel2 instanceof QuantityFieldModel).toBeTruthy();
    expect(quantityModel2.getValue("magnitude", 0)).toBe(48.8);
    expect(symptomModel2 instanceof CodedTextFieldModel).toBeTruthy();
    expect(symptomModel2.getValue("code", 0)).toBe("at8.66");


    // Refresh to remove the first event (really it updates the first event and removes the second)
    (new ThinkEhrModelParser(rmTypeModelDictionary) ).refreshValues(rootModel, values3);
    expect(obsModel.getChildCount()).toBe(1);
    var eventModel3 = obsModel.getChildModel(0) as RmContainerModel;
    expect(eventModel3.getRmType()).toBe(RmType.EVENT);
    expect(eventModel3.getChildCount()).toBe(2);
    var em3Child = eventModel3.getChildModel(0) as QuantityFieldModel;
    expect(em3Child.getValue("magnitude", 0)).toBe(55.1);
    var ev3childModel1 = eventModel3.getChildModel(1) as CodedTextFieldModel;
    expect(ev3childModel1.getValue("code", 0)).toBe("at4.66");

    // Complex refresh
    (new ThinkEhrModelParser(rmTypeModelDictionary) ).refreshValues(rootModel, values4);
    expect(rootModel.getChildCount()).toBe(3);
    expect(obsModel.getChildCount()).toBe(2);
    // First observation, first event
    expect((<QuantityFieldModel>obsModel.getChildModel(0).getChildModel(0)).getValue("magnitude", 0)).toBe(55.1);
    expect((<CodedTextFieldModel>obsModel.getChildModel(0).getChildModel(1)).getValue("code", 0)).toBe("at10.66");
    // First observation, second event
    expect((<QuantityFieldModel>obsModel.getChildModel(1).getChildModel(0)).getValue("magnitude", 0)).toBe(39.9);
    expect((<NodeModel>obsModel.getChildModel(1).getChildModel(1)).getValue(undefined, 0)).toBeNull();
    // Second observation
    var obsModel2 = rootModel.getChildModel(1) as RmContainerModel;
    expect(obsModel2.getRmType()).toBe(RmType.OBSERVATION);
    expect(obsModel2.getChildCount()).toBe(3);
    // Second observation, first event
    expect((<QuantityFieldModel>obsModel2.getChildModel(0).getChildModel(0)).getValue("magnitude", 0)).toBe(20.0);
    expect((<CodedTextFieldModel>obsModel2.getChildModel(0).getChildModel(1)).getValue("code", 0)).toBeNull();
    // Second observation, second event
    expect((<QuantityFieldModel>obsModel2.getChildModel(1).getChildModel(0)).getValue("magnitude", 0)).toBe(30.0);
    expect((<RmContainerModel>obsModel2.getChildModel(1).getChildModel(1)).isMulti()).toBe(true);
    expect((<RmContainerModel>obsModel2.getChildModel(1).getChildModel(1)).getValueNodeParentRef()['symptoms']).toBe(values4.vitals.vitals[0].body_temperature[1].any_event[1].symptoms);
    expect((<RmContainerModel>obsModel2.getChildModel(1).getChildModel(1)).getValueNodeParentRef()).toBe(values4.vitals.vitals[0].body_temperature[1].any_event[1]);
    expect((<RmContainerModel>obsModel2.getChildModel(1).getChildModel(1)).getValueNodeRef()[0]).toBe(values4.vitals.vitals[0].body_temperature[1].any_event[1].symptoms[0]);

    expect((<CodedTextFieldModel>obsModel2.getChildModel(1).getChildModel(1)).getValue("code", 0)).toBe("at11.66");
    expect((<CodedTextFieldModel>obsModel2.getChildModel(1).getChildModel(1)).getValue("code", 1)).toBe("at12.66");
    // Second observation, third event
    expect((<CodedTextFieldModel>obsModel2.getChildModel(2).getChildModel(0)).getValue("magnitude", 0)).toBe(40.0);
    expect((<CodedTextFieldModel>obsModel2.getChildModel(2).getChildModel(1)).getValue("code", 0)).toBeNull();
    // Third observation - empty
    var obsModel3 = rootModel.getChildModel(2) as RmContainerModel;
    expect(obsModel3.getRmType()).toBe(RmType.OBSERVATION);
    expect(obsModel3.getChildCount()).toBe(1);
    var obsM3Child0 = obsModel3.getChildModel(0) as RmContainerModel;
    expect(obsM3Child0.getRmType()).toBe(RmType.EVENT);/// as RmContainerModel;
    expect(obsM3Child0.getChildCount()).toBe(2);
    expect((<QuantityFieldModel>obsM3Child0.getChildModel(0)).getRmType()).toBe(RmType.DV_QUANTITY);
    expect((<QuantityFieldModel>obsM3Child0.getChildModel(0)).getValue().length).toBe(0);
    expect((<CodedTextFieldModel>obsM3Child0.getChildModel(1)).getRmType()).toBe(RmType.DV_CODED_TEXT);
    expect((<CodedTextFieldModel>obsM3Child0.getChildModel(1)).getValue(undefined, 0)).toBeNull();

    // Really complex refresh with deletes and so on
    (new ThinkEhrModelParser(rmTypeModelDictionary) ).refreshValues(rootModel, values5);
    expect(rootModel.getChildCount()).toBe(2);
    expect(obsModel.getChildCount()).toBe(3);
    // First observation, first event
    expect((<QuantityFieldModel>obsModel.getChildModel(0).getChildModel(0)).getValue("magnitude", 0)).toBeCloseTo(56.19);
    expect((<CodedTextFieldModel>obsModel.getChildModel(0).getChildModel(1)).getValue("code", 0)).toBe("at15.66");
    // First observation, second event
    expect((<QuantityFieldModel>obsModel.getChildModel(1).getChildModel(0)).getValue("magnitude", 0)).toBe(38.97);
    expect((<NodeModel>obsModel.getChildModel(1).getChildModel(1)).getValue(undefined, 0)).toBeNull();
    // First observation, third event
    expect((<NodeModel>obsModel.getChildModel(2).getChildModel(0)).getValue().length).toBe(0);
    expect((<CodedTextFieldModel>obsModel.getChildModel(2).getChildModel(1)).getValue("code", 0)).toBe("at14.66");
    // Second observation
    expect(obsModel2.getRmType()).toBe(RmType.OBSERVATION);
    expect(obsModel2.getChildCount()).toBe(2);
    // Second observation, first event
    expect((<QuantityFieldModel>obsModel2.getChildModel(0).getChildModel(0)).getValue("magnitude", 0)).toBe(21.0);
    expect((<CodedTextFieldModel>obsModel2.getChildModel(0).getChildModel(1)).getValue("code", 0)).toBeNull();
    // Second observation, second event
    expect((<QuantityFieldModel>obsModel2.getChildModel(1).getChildModel(0)).getValue("magnitude", 0)).toBe(30.0);
    expect((<CodedTextFieldModel>obsModel2.getChildModel(1).getChildModel(1)).getValue("code", 0)).toBe("at13.66");
  });
  it("Model - Tags Parsing", function () {

    var context = {};
    var rootModel = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription(context, tagsAnnotationsDesc, {}, null);
    expect(ThinkEhrUtil.isArray(rootModel.getTags())).toBeTruthy();
    expect(rootModel.getTags().length).toBe(0);

    var fm1 = rootModel.getChildModel(0) as RmContainerModel;
    expect(fm1.getTags().length).toBe(3);
    expect(fm1.hasTag("2 col")).toBeTruthy();
    expect(fm1.hasTag("multi")).toBeTruthy();
    expect(fm1.hasTag("MULTI")).toBeFalsy();
    expect(fm1.hasTag("xcustom")).toBeTruthy();
    expect(fm1.hasTag("lodl")).toBeFalsy();
  });
  it("Model - Annotations Parsing", function () {

    var context = {};
    var rootModel = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription(context, tagsAnnotationsDesc, {});

    var fm1 = rootModel.getChildModel(0) as RmContainerModel;
    expect(fm1.hasAnnotation("display_ordinal")).toBeTruthy();
    expect(fm1.hasAnnotation("Display_ordinal")).toBeFalsy();
    expect(fm1.hasAnnotation("lines")).toBeTruthy();
    expect(fm1.annotationValue("display_ordinal")).toBe("true");
    expect(fm1.annotationValue("lines")).toBe("1");
    expect(fm1.annotationValue("ABC")).toBeUndefined();
    expect(fm1.annotationValue("Display_ordinal")).toBeUndefined();
  });

  it("Generic field - DV_TEXT", function () {

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
          "localizedName": "",
          "localizedNames": {
            "en": "Fieldset"
          },
          "min": 0,
          "max": -1,
          "name": "",
          "rmType": "GENERIC_FIELDSET",
          "formId": "generic-field-55040",
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
            "label": {
              "custom": true
            }
          },
          "children": [
            {
              "annotations": {
                "comment": "Generic input field used to add custom fields."
              },
              "inputs": [
                {
                  "type": "TEXT"
                }
              ],
              "localizedName": "Allergies",
              "localizedNames": {
                "en": "Input"
              },
              "max": "1",
              "min": "0",
              "name": "Allergies",
              "rmType": "GENERIC_FIELD",
              "formId": "generic-field-27914",
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
                "label": {
                  "custom": true
                },
                "advanced": {
                  "hidden": false,
                  "readonly": false
                },
                "tags": [],
                "annotations": {
                  "_no_function": "thinkehr.f4.setupExclusions",
                  "hide-exclusion": "true"
                },
                "field": {
                  "input": {
                    "presentation": "textfield",
                    "lines": "3"
                  },
                  "type": "DV_TEXT"
                }
              }
            },
            {
              "name": "Adverse Reaction",
              "localizedName": "Adverse Reaction",
              "rmType": "EVALUATION",
              "nodeId": "openEHR-EHR-EVALUATION.adverse_reaction.v1",
              "min": "0",
              "max": "100",
              "localizedNames": {
                "en": "Adverse Reaction"
              },
              "localizedDescriptions": {
                "en": "A harmful or undesirable, unexpected effect associated with exposure to any substance or agent, including food, plants, animals, venom from animal stings, or a medication at therapeutic or sub-therapeutic doses."
              },
              "aqlPath": "/content[openEHR-EHR-SECTION.adhoc.v1,'1. Allergies and Other Adverse Reactions Section ']/items[openEHR-EHR-EVALUATION.adverse_reaction.v1]",
              "formId": "ppop_national_patient_summary/a1._allergies_and_other_adverse_reactions_section/adverse_reaction",
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
                  "readonly": false,
                  "hideHeader": false
                },
                "tags": [
                  "noExclusion"
                ]
              },
              "children": [
                {
                  "name": "1.7/8 Allergen",
                  "localizedName": "1.7/8 Allergen",
                  "rmType": "DV_CODED_TEXT",
                  "nodeId": "at0002",
                  "min": 1,
                  "max": 1,
                  "localizedNames": {
                    "": "1.7/8 Allergen"
                  },
                  "localizedDescriptions": {
                    "en": "Identification of a substance, agent, or a class of substance, that is considered to be responsible for the Adverse Reaction."
                  },
                  "annotations": {
                    "comment": "Substance/Agent should be coded with a terminology, where possible."
                  },
                  "aqlPath": "/content[openEHR-EHR-SECTION.adhoc.v1,'1. Allergies and Other Adverse Reactions Section ']/items[openEHR-EHR-EVALUATION.adverse_reaction.v1]/data[at0001]/items[at0002,'1.7/8 Allergen']/value",
                  "inputs": [
                    {
                      "suffix": "code",
                      "type": "TEXT",
                      "terminology": "epSOS?subset=epSOSAllergenNoDrugs&language=en-GB"
                    },
                    {
                      "suffix": "value",
                      "type": "TEXT",
                      "terminology": "epSOS?subset=epSOSAllergenNoDrugs&language=en-GB"
                    }
                  ],
                  "formId": "ppop_national_patient_summary/a1._allergies_and_other_adverse_reactions_section/adverse_reaction/a1.7_8_allergen",
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
                    "datasource": {
                      "loadRemote": false,
                      "loadRemoteUrl": "",
                      "terminology": ""
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
                  "name": "1.1/2 Allergen Category",
                  "localizedName": "1.1/2 Allergen Category",
                  "rmType": "DV_TEXT",
                  "nodeId": "at0050",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {
                    "": "1.1/2 Allergen Category"
                  },
                  "localizedDescriptions": {
                    "en": "The category of substance responsible for the adverse reaction. Generally only required where the terminology used to record Substance/Agent cannot determine the Substance Category via inferencing."
                  },
                  "annotations": {
                    "comment": "e.g. Medication, Foodstuff, Environmental agent"
                  },
                  "aqlPath": "/content[openEHR-EHR-SECTION.adhoc.v1,'1. Allergies and Other Adverse Reactions Section ']/items[openEHR-EHR-EVALUATION.adverse_reaction.v1]/data[at0001]/items[at0050,'1.1/2 Allergen Category']/value",
                  "inputs": [
                    {
                      "type": "TEXT",
                      "list": [
                        {
                          "value": "1: Drug",
                          "label": "1: Drug"
                        },
                        {
                          "value": "2: Foodstuff",
                          "label": "2: Foodstuff"
                        },
                        {
                          "value": "9: Other",
                          "label": "9: Other"
                        }
                      ],
                      "listOpen": false
                    }
                  ],
                  "formId": "ppop_national_patient_summary/a1._allergies_and_other_adverse_reactions_section/adverse_reaction/a1.1_2_allergen_category",
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
                    "datasource": {
                      "loadRemote": false,
                      "loadRemoteUrl": "",
                      "terminology": ""
                    }
                  }
                },
                {
                  "name": "1.5 Severity of hypersensitivity",
                  "localizedName": "1.5 Severity of hypersensitivity",
                  "rmType": "DV_CODED_TEXT",
                  "nodeId": "at0051",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {
                    "": "1.5 Severity of hypersensitivity"
                  },
                  "localizedDescriptions": {
                    "en": "The potential seriousness of a future reaction. This represents a clinical judgment about the worst case scenario for a future reaction."
                  },
                  "annotations": {
                    "comment": "From FHIR AllergyIntolerance Resource"
                  },
                  "aqlPath": "/content[openEHR-EHR-SECTION.adhoc.v1,'1. Allergies and Other Adverse Reactions Section ']/items[openEHR-EHR-EVALUATION.adverse_reaction.v1]/data[at0001]/items[at0051,'1.5 Severity of hypersensitivity']/value",
                  "inputs": [
                    {
                      "suffix": "code",
                      "type": "CODED_TEXT",
                      "list": [
                        {
                          "value": "442452003",
                          "label": "Life-threatening",
                          "localizedLabels": {
                            "en": "Life-threatening"
                          }
                        },
                        {
                          "value": "349915008",
                          "label": "severe",
                          "localizedLabels": {
                            "en": "severe"
                          }
                        },
                        {
                          "value": "24484000",
                          "label": "heavy",
                          "localizedLabels": {
                            "en": "heavy"
                          }
                        }
                      ],
                      "terminology": "SNOMED-CT"
                    }
                  ],
                  "formId": "ppop_national_patient_summary/a1._allergies_and_other_adverse_reactions_section/adverse_reaction/a1.5_severity_of_hypersensitivity",
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
                    "datasource": {
                      "loadRemote": false,
                      "loadRemoteUrl": "",
                      "terminology": ""
                    }
                  }
                },
                {
                  "name": "Reaction Event",
                  "localizedName": "Reaction Event",
                  "rmType": "CLUSTER",
                  "nodeId": "at0009",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {
                    "en": "Reaction Event"
                  },
                  "localizedDescriptions": {
                    "en": "Details about each Adverse Reaction Event."
                  },
                  "annotations": {
                    "view:pass_through": "true"
                  },
                  "aqlPath": "/content[openEHR-EHR-SECTION.adhoc.v1,'1. Allergies and Other Adverse Reactions Section ']/items[openEHR-EHR-EVALUATION.adverse_reaction.v1]/data[at0001]/items[at0009]",
                  "formId": "ppop_national_patient_summary/a1._allergies_and_other_adverse_reactions_section/adverse_reaction/reaction_event",
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
                  },
                  "children": [
                    {
                      "name": "1.3/4 Clinical manifestation",
                      "localizedName": "1.3/4 Clinical manifestation",
                      "rmType": "DV_CODED_TEXT",
                      "nodeId": "at0011",
                      "min": 1,
                      "max": 1,
                      "localizedNames": {
                        "": "1.3/4 Clinical manifestation"
                      },
                      "localizedDescriptions": {
                        "en": "Clinical manifestation of the Adverse Reaction expressed as a single word, phrase or brief description, e.g. nausea or rash."
                      },
                      "annotations": {
                        "comment": "Manifestation should be coded with a terminology, where possible. The values entered here may be used to display on an application screen as part a list of adverse reactions, as recommended in the NHS CUI guidelines."
                      },
                      "aqlPath": "/content[openEHR-EHR-SECTION.adhoc.v1,'1. Allergies and Other Adverse Reactions Section ']/items[openEHR-EHR-EVALUATION.adverse_reaction.v1]/data[at0001]/items[at0009]/items[at0011,'1.3/4 Clinical manifestation']/value",
                      "inputs": [
                        {
                          "suffix": "code",
                          "type": "TEXT",
                          "terminology": "epSOS?subset=epSOSReactionAllergy&language=en-GB"
                        },
                        {
                          "suffix": "value",
                          "type": "TEXT",
                          "terminology": "epSOS?subset=epSOSReactionAllergy&language=en-GB"
                        }
                      ],
                      "formId": "ppop_national_patient_summary/a1._allergies_and_other_adverse_reactions_section/adverse_reaction/reaction_event/a1.3_4_clinical_manifestation",
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
                        "datasource": {
                          "loadRemote": false,
                          "loadRemoteUrl": "",
                          "terminology": ""
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
                      "name": "1.6 Date of occurence",
                      "localizedName": "1.6 Date of occurence",
                      "rmType": "DV_DATE_TIME",
                      "nodeId": "at0027",
                      "min": 0,
                      "max": 1,
                      "localizedNames": {
                        "": "1.6 Date of occurence"
                      },
                      "localizedDescriptions": {
                        "en": "Record of the date and/or time of the onset of the Adverse Reaction."
                      },
                      "aqlPath": "/content[openEHR-EHR-SECTION.adhoc.v1,'1. Allergies and Other Adverse Reactions Section ']/items[openEHR-EHR-EVALUATION.adverse_reaction.v1]/data[at0001]/items[at0009]/items[at0027,'1.6 Date of occurence']/value",
                      "inputs": [
                        {
                          "type": "DATETIME"
                        }
                      ],
                      "formId": "ppop_national_patient_summary/a1._allergies_and_other_adverse_reactions_section/adverse_reaction/reaction_event/a1.6_date_of_occurence",
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
                        "datasource": {
                          "loadRemote": false,
                          "loadRemoteUrl": "",
                          "terminology": ""
                        },
                        "field": {
                          "input": {
                            "dateFormat": "",
                            "hideDate": false,
                            "hideTime": false
                          }
                        }
                      }
                    }
                  ]
                },
                {
                  "name": "Date Last Updated",
                  "localizedName": "Date Last Updated",
                  "rmType": "DV_DATE_TIME",
                  "nodeId": "at0052",
                  "min": 0,
                  "max": 1,
                  "dependsOn": [
                    "reaction_event",
                    "a1.5_severity_of_hypersensitivity",
                    "a1.1_2_allergen_category",
                    "a1.7_8_allergen"
                  ],
                  "localizedNames": {
                    "en": "Date Last Updated"
                  },
                  "localizedDescriptions": {
                    "en": "The date at which the Adverse Reaction information was most recently updated or verified."
                  },
                  "aqlPath": "/content[openEHR-EHR-SECTION.adhoc.v1,'1. Allergies and Other Adverse Reactions Section ']/items[openEHR-EHR-EVALUATION.adverse_reaction.v1]/protocol[at0042]/items[at0052]/value",
                  "inputs": [
                    {
                      "type": "DATETIME"
                    }
                  ],
                  "formId": "ppop_national_patient_summary/a1._allergies_and_other_adverse_reactions_section/adverse_reaction/date_last_updated",
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
                    "datasource": {
                      "loadRemote": false,
                      "loadRemoteUrl": "",
                      "terminology": ""
                    },
                    "field": {
                      "input": {
                        "dateFormat": "",
                        "hideDate": false,
                        "hideTime": false
                      }
                    }
                  }
                }
              ]
            },
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
                "en": "A statement about exclusion of known adverse reactions in the health record."
              },
              "annotations": {
                "comment": "For example: \"No known adverse reactions\"; \"No known adverse reaction to\" (penicillin)."
              },
              "aqlPath": "/content[openEHR-EHR-SECTION.adhoc.v1,'1. Allergies and Other Adverse Reactions Section ']/items[openEHR-EHR-EVALUATION.exclusion-adverse_reaction.v1]/data[at0001]/items[at0002.1]/value",
              "inputs": [
                {
                  "type": "TEXT",
                  "defaultValue": "No known adverse reactions"
                }
              ],
              "formId": "ppop_national_patient_summary/a1._allergies_and_other_adverse_reactions_section/exclusion_of_an_adverse_reaction/exclusion_statement",
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
                  "exclusion"
                ],
                "field": {
                  "input": {
                    "presentation": "textfield"
                  }
                }
              }
            },
            {
              "name": "Absence Statement",
              "localizedName": "Absence Statement",
              "rmType": "DV_TEXT",
              "nodeId": "at0002",
              "min": "0",
              "max": "1",
              "localizedNames": {
                "en": "Absence Statement"
              },
              "localizedDescriptions": {
                "en": "Positive statement that no information is available."
              },
              "annotations": {
                "comment": "For example: \"No information available about adverse reactions\"; No information available about problems or diagnoses\"; \"No information available about previous procedures performed\"; or \"No information available about medications used\"."
              },
              "aqlPath": "/content[openEHR-EHR-SECTION.adhoc.v1,'1. Allergies and Other Adverse Reactions Section ']/items[openEHR-EHR-EVALUATION.absence.v1]/data[at0001]/items[at0002]/value",
              "inputs": [
                {
                  "type": "TEXT",
                  "defaultValue": "No information available about adverse reactions."
                }
              ],
              "formId": "ppop_national_patient_summary/a1._allergies_and_other_adverse_reactions_section/absence_of_information/absence_statement",
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
                  "absence"
                ],
                "field": {
                  "input": {
                    "presentation": "textfield"
                  }
                }
              }
            }
          ]
        }
      ]
    };
    var values = {};

    var valueModel:any = {};
    var model = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription(null, desc, valueModel);
    expect(model.getRmType()).toBe(RmType.FORM_DEFINITION);
    var genericFieldModel = model.findSuccessorWithPath('generic-field-27914') as TextFieldModel;
    expect(genericFieldModel).toBeTruthy();
    var regularFieldModel = model.findSuccessorWithPath('ppop_national_patient_summary/a1._allergies_and_other_adverse_reactions_section/absence_of_information/absence_statement') as TextFieldModel;
    expect(regularFieldModel).toBeTruthy();
    expect(genericFieldModel.getIsGenericField()).toBe(true);
    expect(regularFieldModel.getIsGenericField()).toBe(false);
    expect(genericFieldModel.getRmType()).toBe(RmType.DV_TEXT);
    expect(regularFieldModel.getRmType()).toBe(RmType.DV_TEXT);
    expect(genericFieldModel.textValue()).toBe(null);
    expect(regularFieldModel.textValue()).toBe("No information available about adverse reactions.");

    genericFieldModel.textValue("testing");
    regularFieldModel.textValue("absenceValue");
    expect(genericFieldModel.textValue()).toBe("testing");
    expect(regularFieldModel.textValue()).toBe("absenceValue");
    expect(valueModel.ppop_national_patient_summary["a1._allergies_and_other_adverse_reactions_section"][0].absence_of_information[0].absence_statement[0]).toBe('absenceValue');

    var recursivelyCheckPropName = function (propName, inObject) {
      for (var prop in inObject) {
        if (inObject.hasOwnProperty(prop)) {
          if (prop == propName) {
            return true;
          }
          if (ThinkEhrUtil.isObject(inObject[prop])) {
            recursivelyCheckPropName(propName, inObject[prop]);
          } else if (ThinkEhrUtil.isArray(inObject[prop])) {
            for (var i = 0; i < inObject[prop].length; i++) {
              recursivelyCheckPropName(propName, inObject[prop][i]);
            }
          }
        }
      }
      return false;
    };
    expect(recursivelyCheckPropName('generic-field-27914', valueModel)).toBe(false);
    expect(recursivelyCheckPropName('absence_statement', valueModel)).toBe(false);


  });

  it("Generic field - DV_CODED_TEXT", function () {

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
          "localizedName": "",
          "localizedNames": {
            "en": "Fieldset"
          },
          "min": 0,
          "max": -1,
          "name": "",
          "rmType": "GENERIC_FIELDSET",
          "formId": "generic-field-55040",
          "children": [
            {
              "annotations": {
                "comment": "Generic input field used to add custom fields."
              },
              "inputs": [
                {
                  "list": [
                    {
                      "value": "val1",
                      "label": "value1",
                      "localizedLabels": {
                        "en": ""
                      }
                    },
                    {
                      "value": "val2",
                      "label": "value2",
                      "localizedLabels": {
                        "en": ""
                      }
                    }
                  ],
                  "suffix": "code",
                  "type": "CODED_TEXT"
                }
              ],
              "localizedName": "Allergies",
              "localizedNames": {
                "en": "Coded text"
              },
              "max": "1",
              "min": "0",
              "name": "Allergies",
              "rmType": "GENERIC_FIELD",
              "formId": "generic-field-27914",
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
                "label": {
                  "custom": true
                },
                "advanced": {
                  "hidden": false,
                  "readonly": false
                },
                "tags": [],
                "annotations": {
                  "_no_function": "thinkehr.f4.setupExclusions",
                  "hide-exclusion": "true"
                },
                "field": {
                  "type": "DV_CODED_TEXT"
                }
              }
            },
            {
              "name": "Adverse Reaction",
              "localizedName": "Adverse Reaction",
              "rmType": "EVALUATION",
              "nodeId": "openEHR-EHR-EVALUATION.adverse_reaction.v1",
              "min": "0",
              "max": "100",
              "localizedNames": {
                "en": "Adverse Reaction"
              },
              "localizedDescriptions": {
                "en": "A harmful or undesirable, unexpected effect associated with exposure to any substance or agent, including food, plants, animals, venom from animal stings, or a medication at therapeutic or sub-therapeutic doses."
              },
              "aqlPath": "/content[openEHR-EHR-SECTION.adhoc.v1,'1. Allergies and Other Adverse Reactions Section ']/items[openEHR-EHR-EVALUATION.adverse_reaction.v1]",
              "children": [
                {
                  "name": "1.7/8 Allergen",
                  "localizedName": "1.7/8 Allergen",
                  "rmType": "DV_CODED_TEXT",
                  "nodeId": "at0002",
                  "min": 1,
                  "max": 1,
                  "localizedNames": {
                    "": "1.7/8 Allergen"
                  },
                  "localizedDescriptions": {
                    "en": "Identification of a substance, agent, or a class of substance, that is considered to be responsible for the Adverse Reaction."
                  },
                  "annotations": {
                    "comment": "Substance/Agent should be coded with a terminology, where possible."
                  },
                  "aqlPath": "/content[openEHR-EHR-SECTION.adhoc.v1,'1. Allergies and Other Adverse Reactions Section ']/items[openEHR-EHR-EVALUATION.adverse_reaction.v1]/data[at0001]/items[at0002,'1.7/8 Allergen']/value",
                  "inputs": [
                    {
                      "suffix": "code",
                      "type": "TEXT",
                      "terminology": "epSOS?subset=epSOSAllergenNoDrugs&language=en-GB"
                    },
                    {
                      "suffix": "value",
                      "type": "TEXT",
                      "terminology": "epSOS?subset=epSOSAllergenNoDrugs&language=en-GB"
                    }
                  ],
                  "formId": "ppop_national_patient_summary/a1._allergies_and_other_adverse_reactions_section/adverse_reaction/a1.7_8_allergen",
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
                    "datasource": {
                      "loadRemote": false,
                      "loadRemoteUrl": "",
                      "terminology": ""
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
                  "name": "1.1/2 Allergen Category",
                  "localizedName": "1.1/2 Allergen Category",
                  "rmType": "DV_TEXT",
                  "nodeId": "at0050",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {
                    "": "1.1/2 Allergen Category"
                  },
                  "localizedDescriptions": {
                    "en": "The category of substance responsible for the adverse reaction. Generally only required where the terminology used to record Substance/Agent cannot determine the Substance Category via inferencing."
                  },
                  "annotations": {
                    "comment": "e.g. Medication, Foodstuff, Environmental agent"
                  },
                  "aqlPath": "/content[openEHR-EHR-SECTION.adhoc.v1,'1. Allergies and Other Adverse Reactions Section ']/items[openEHR-EHR-EVALUATION.adverse_reaction.v1]/data[at0001]/items[at0050,'1.1/2 Allergen Category']/value",
                  "inputs": [
                    {
                      "type": "TEXT",
                      "list": [
                        {
                          "value": "1: Drug",
                          "label": "1: Drug"
                        },
                        {
                          "value": "2: Foodstuff",
                          "label": "2: Foodstuff"
                        },
                        {
                          "value": "9: Other",
                          "label": "9: Other"
                        }
                      ],
                      "listOpen": false
                    }
                  ],
                  "formId": "ppop_national_patient_summary/a1._allergies_and_other_adverse_reactions_section/adverse_reaction/a1.1_2_allergen_category",
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
                    "datasource": {
                      "loadRemote": false,
                      "loadRemoteUrl": "",
                      "terminology": ""
                    }
                  }
                },
                {
                  "name": "1.5 Severity of hypersensitivity",
                  "localizedName": "1.5 Severity of hypersensitivity",
                  "rmType": "DV_CODED_TEXT",
                  "nodeId": "at0051",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {
                    "": "1.5 Severity of hypersensitivity"
                  },
                  "localizedDescriptions": {
                    "en": "The potential seriousness of a future reaction. This represents a clinical judgment about the worst case scenario for a future reaction."
                  },
                  "annotations": {
                    "comment": "From FHIR AllergyIntolerance Resource"
                  },
                  "aqlPath": "/content[openEHR-EHR-SECTION.adhoc.v1,'1. Allergies and Other Adverse Reactions Section ']/items[openEHR-EHR-EVALUATION.adverse_reaction.v1]/data[at0001]/items[at0051,'1.5 Severity of hypersensitivity']/value",
                  "inputs": [
                    {
                      "suffix": "code",
                      "type": "CODED_TEXT",
                      "list": [
                        {
                          "value": "442452003",
                          "label": "Life-threatening",
                          "localizedLabels": {
                            "en": "Life-threatening"
                          }
                        },
                        {
                          "value": "349915008",
                          "label": "severe",
                          "localizedLabels": {
                            "en": "severe"
                          }
                        },
                        {
                          "value": "24484000",
                          "label": "heavy",
                          "localizedLabels": {
                            "en": "heavy"
                          }
                        }
                      ],
                      "terminology": "SNOMED-CT"
                    }
                  ],
                  "formId": "ppop_national_patient_summary/a1._allergies_and_other_adverse_reactions_section/adverse_reaction/a1.5_severity_of_hypersensitivity",
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
                    "datasource": {
                      "loadRemote": false,
                      "loadRemoteUrl": "",
                      "terminology": ""
                    }
                  }
                },
                {
                  "name": "Reaction Event",
                  "localizedName": "Reaction Event",
                  "rmType": "CLUSTER",
                  "nodeId": "at0009",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {
                    "en": "Reaction Event"
                  },
                  "localizedDescriptions": {
                    "en": "Details about each Adverse Reaction Event."
                  },
                  "annotations": {
                    "view:pass_through": "true"
                  },
                  "aqlPath": "/content[openEHR-EHR-SECTION.adhoc.v1,'1. Allergies and Other Adverse Reactions Section ']/items[openEHR-EHR-EVALUATION.adverse_reaction.v1]/data[at0001]/items[at0009]",
                  "children": [
                    {
                      "name": "1.3/4 Clinical manifestation",
                      "localizedName": "1.3/4 Clinical manifestation",
                      "rmType": "DV_CODED_TEXT",
                      "nodeId": "at0011",
                      "min": 1,
                      "max": 1,
                      "localizedNames": {
                        "": "1.3/4 Clinical manifestation"
                      },
                      "localizedDescriptions": {
                        "en": "Clinical manifestation of the Adverse Reaction expressed as a single word, phrase or brief description, e.g. nausea or rash."
                      },
                      "annotations": {
                        "comment": "Manifestation should be coded with a terminology, where possible. The values entered here may be used to display on an application screen as part a list of adverse reactions, as recommended in the NHS CUI guidelines."
                      },
                      "aqlPath": "/content[openEHR-EHR-SECTION.adhoc.v1,'1. Allergies and Other Adverse Reactions Section ']/items[openEHR-EHR-EVALUATION.adverse_reaction.v1]/data[at0001]/items[at0009]/items[at0011,'1.3/4 Clinical manifestation']/value",
                      "inputs": [
                        {
                          "suffix": "code",
                          "type": "TEXT",
                          "terminology": "epSOS?subset=epSOSReactionAllergy&language=en-GB"
                        },
                        {
                          "suffix": "value",
                          "type": "TEXT",
                          "terminology": "epSOS?subset=epSOSReactionAllergy&language=en-GB"
                        }
                      ],
                      "formId": "ppop_national_patient_summary/a1._allergies_and_other_adverse_reactions_section/adverse_reaction/reaction_event/a1.3_4_clinical_manifestation",
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
                        "datasource": {
                          "loadRemote": false,
                          "loadRemoteUrl": "",
                          "terminology": ""
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
                      "name": "1.6 Date of occurence",
                      "localizedName": "1.6 Date of occurence",
                      "rmType": "DV_DATE_TIME",
                      "nodeId": "at0027",
                      "min": 0,
                      "max": 1,
                      "localizedNames": {
                        "": "1.6 Date of occurence"
                      },
                      "localizedDescriptions": {
                        "en": "Record of the date and/or time of the onset of the Adverse Reaction."
                      },
                      "aqlPath": "/content[openEHR-EHR-SECTION.adhoc.v1,'1. Allergies and Other Adverse Reactions Section ']/items[openEHR-EHR-EVALUATION.adverse_reaction.v1]/data[at0001]/items[at0009]/items[at0027,'1.6 Date of occurence']/value",
                      "inputs": [
                        {
                          "type": "DATETIME"
                        }
                      ],
                      "formId": "ppop_national_patient_summary/a1._allergies_and_other_adverse_reactions_section/adverse_reaction/reaction_event/a1.6_date_of_occurence",
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
                        "datasource": {
                          "loadRemote": false,
                          "loadRemoteUrl": "",
                          "terminology": ""
                        },
                        "field": {
                          "input": {
                            "dateFormat": "",
                            "hideDate": false,
                            "hideTime": false
                          }
                        }
                      }
                    }
                  ],
                  "formId": "ppop_national_patient_summary/a1._allergies_and_other_adverse_reactions_section/adverse_reaction/reaction_event",
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
                },
                {
                  "name": "Date Last Updated",
                  "localizedName": "Date Last Updated",
                  "rmType": "DV_DATE_TIME",
                  "nodeId": "at0052",
                  "min": 0,
                  "max": 1,
                  "dependsOn": [
                    "reaction_event",
                    "a1.5_severity_of_hypersensitivity",
                    "a1.1_2_allergen_category",
                    "a1.7_8_allergen"
                  ],
                  "localizedNames": {
                    "en": "Date Last Updated"
                  },
                  "localizedDescriptions": {
                    "en": "The date at which the Adverse Reaction information was most recently updated or verified."
                  },
                  "aqlPath": "/content[openEHR-EHR-SECTION.adhoc.v1,'1. Allergies and Other Adverse Reactions Section ']/items[openEHR-EHR-EVALUATION.adverse_reaction.v1]/protocol[at0042]/items[at0052]/value",
                  "inputs": [
                    {
                      "type": "DATETIME"
                    }
                  ],
                  "formId": "ppop_national_patient_summary/a1._allergies_and_other_adverse_reactions_section/adverse_reaction/date_last_updated",
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
                    "datasource": {
                      "loadRemote": false,
                      "loadRemoteUrl": "",
                      "terminology": ""
                    },
                    "field": {
                      "input": {
                        "dateFormat": "",
                        "hideDate": false,
                        "hideTime": false
                      }
                    }
                  }
                }
              ],
              "formId": "ppop_national_patient_summary/a1._allergies_and_other_adverse_reactions_section/adverse_reaction",
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
                  "readonly": false,
                  "hideHeader": false
                },
                "tags": [
                  "noExclusion"
                ]
              }
            },
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
                "en": "A statement about exclusion of known adverse reactions in the health record."
              },
              "annotations": {
                "comment": "For example: \"No known adverse reactions\"; \"No known adverse reaction to\" (penicillin)."
              },
              "aqlPath": "/content[openEHR-EHR-SECTION.adhoc.v1,'1. Allergies and Other Adverse Reactions Section ']/items[openEHR-EHR-EVALUATION.exclusion-adverse_reaction.v1]/data[at0001]/items[at0002.1]/value",
              "inputs": [
                {
                  "type": "TEXT",
                  "defaultValue": "No known adverse reactions"
                }
              ],
              "formId": "ppop_national_patient_summary/a1._allergies_and_other_adverse_reactions_section/exclusion_of_an_adverse_reaction/exclusion_statement",
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
                  "exclusion"
                ],
                "field": {
                  "input": {
                    "presentation": "textfield"
                  }
                }
              }
            },
            {
              "name": "Absence Statement",
              "localizedName": "Absence Statement",
              "rmType": "DV_TEXT",
              "nodeId": "at0002",
              "min": "0",
              "max": "1",
              "localizedNames": {
                "en": "Absence Statement"
              },
              "localizedDescriptions": {
                "en": "Positive statement that no information is available."
              },
              "annotations": {
                "comment": "For example: \"No information available about adverse reactions\"; No information available about problems or diagnoses\"; \"No information available about previous procedures performed\"; or \"No information available about medications used\"."
              },
              "aqlPath": "/content[openEHR-EHR-SECTION.adhoc.v1,'1. Allergies and Other Adverse Reactions Section ']/items[openEHR-EHR-EVALUATION.absence.v1]/data[at0001]/items[at0002]/value",
              "inputs": [
                {
                  "type": "TEXT",
                  "defaultValue": "No information available about adverse reactions."
                }
              ],
              "formId": "ppop_national_patient_summary/a1._allergies_and_other_adverse_reactions_section/absence_of_information/absence_statement",
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
                  "absence"
                ],
                "field": {
                  "input": {
                    "presentation": "textfield"
                  }
                }
              }
            }
          ],
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
            "label": {
              "custom": true
            }
          }
        }
      ]
    };
    var values:any = {};

    var valueModel = {};
    var model = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription(null, desc, valueModel);
    expect(model.getRmType()).toBe(RmType.FORM_DEFINITION);
    var genericField:CodedTextFieldModel = model.findSuccessorWithPath('generic-field-27914') as CodedTextFieldModel;
    expect(genericField).toBeTruthy();
    var regularField:TextFieldModel = model.findSuccessorWithPath('ppop_national_patient_summary/a1._allergies_and_other_adverse_reactions_section/absence_of_information/absence_statement') as TextFieldModel;
    expect(regularField).toBeTruthy();
    expect(genericField.getIsGenericField()).toBe(true);
    expect(regularField.getIsGenericField()).toBe(false);
    expect(genericField.getRmType()).toBe(RmType.DV_CODED_TEXT);
    expect(regularField.getRmType()).toBe(RmType.DV_TEXT);
    expect(genericField.codeValue()).toBe(null);
    expect(regularField.textValue()).toBe("No information available about adverse reactions.");
    genericField.codeValue("testing");
    regularField.textValue("absenceValue");
    expect(genericField.codeValue()).toBe("testing");
    expect(regularField.textValue()).toBe("absenceValue");
    expect(valueModel['ppop_national_patient_summary']["a1._allergies_and_other_adverse_reactions_section"][0].absence_of_information[0].absence_statement[0]).toBe('absenceValue');

    var recursivelyCheckPropName = function (propName, inObject) {
      for (var prop in inObject) {
        if (inObject.hasOwnProperty(prop)) {
          if (prop == propName) {
            return true;
          }
          if (ThinkEhrUtil.isObject(inObject[prop])) {
            recursivelyCheckPropName(propName, inObject[prop]);
          } else if (ThinkEhrUtil.isArray(inObject[prop])) {
            for (var i = 0; i < inObject[prop].length; i++) {
              recursivelyCheckPropName(propName, inObject[prop][i]);
            }
          }
        }
      }
      return false;
    };
    expect(recursivelyCheckPropName('generic-field-27914', valueModel)).toBe(false);
    expect(recursivelyCheckPropName('absence_statement', valueModel)).toBe(false);


  });
  it("Generic field - DV_BOOLEAN", function () {

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
          "localizedName": "",
          "localizedNames": {
            "en": "Fieldset"
          },
          "min": 0,
          "max": -1,
          "name": "",
          "rmType": "GENERIC_FIELDSET",
          "formId": "generic-field-55040",
          "children": [
            {
              "annotations": {
                "comment": "Generic input field used to add custom fields."
              },
              "inputs": [
                {
                  "type": "BOOLEAN"
                }
              ],
              "localizedName": "Allergies",
              "localizedNames": {
                "en": "Boolean"
              },
              "max": "1",
              "min": "0",
              "name": "Allergies",
              "rmType": "GENERIC_FIELD",
              "formId": "generic-field-27914",
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
                "label": {
                  "custom": true
                },
                "advanced": {
                  "hidden": false,
                  "readonly": false
                },
                "tags": [],
                "annotations": {
                  "_no_function": "thinkehr.f4.setupExclusions",
                  "hide-exclusion": "true"
                },
                "field": {
                  "type": "DV_BOOLEAN"
                }
              }
            },
            {
              "name": "Adverse Reaction",
              "localizedName": "Adverse Reaction",
              "rmType": "EVALUATION",
              "nodeId": "openEHR-EHR-EVALUATION.adverse_reaction.v1",
              "min": "0",
              "max": "100",
              "localizedNames": {
                "en": "Adverse Reaction"
              },
              "localizedDescriptions": {
                "en": "A harmful or undesirable, unexpected effect associated with exposure to any substance or agent, including food, plants, animals, venom from animal stings, or a medication at therapeutic or sub-therapeutic doses."
              },
              "aqlPath": "/content[openEHR-EHR-SECTION.adhoc.v1,'1. Allergies and Other Adverse Reactions Section ']/items[openEHR-EHR-EVALUATION.adverse_reaction.v1]",
              "children": [
                {
                  "name": "1.7/8 Allergen",
                  "localizedName": "1.7/8 Allergen",
                  "rmType": "DV_CODED_TEXT",
                  "nodeId": "at0002",
                  "min": 1,
                  "max": 1,
                  "localizedNames": {
                    "": "1.7/8 Allergen"
                  },
                  "localizedDescriptions": {
                    "en": "Identification of a substance, agent, or a class of substance, that is considered to be responsible for the Adverse Reaction."
                  },
                  "annotations": {
                    "comment": "Substance/Agent should be coded with a terminology, where possible."
                  },
                  "aqlPath": "/content[openEHR-EHR-SECTION.adhoc.v1,'1. Allergies and Other Adverse Reactions Section ']/items[openEHR-EHR-EVALUATION.adverse_reaction.v1]/data[at0001]/items[at0002,'1.7/8 Allergen']/value",
                  "inputs": [
                    {
                      "suffix": "code",
                      "type": "TEXT",
                      "terminology": "epSOS?subset=epSOSAllergenNoDrugs&language=en-GB"
                    },
                    {
                      "suffix": "value",
                      "type": "TEXT",
                      "terminology": "epSOS?subset=epSOSAllergenNoDrugs&language=en-GB"
                    }
                  ],
                  "formId": "ppop_national_patient_summary/a1._allergies_and_other_adverse_reactions_section/adverse_reaction/a1.7_8_allergen",
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
                    "datasource": {
                      "loadRemote": false,
                      "loadRemoteUrl": "",
                      "terminology": ""
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
                  "name": "1.1/2 Allergen Category",
                  "localizedName": "1.1/2 Allergen Category",
                  "rmType": "DV_TEXT",
                  "nodeId": "at0050",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {
                    "": "1.1/2 Allergen Category"
                  },
                  "localizedDescriptions": {
                    "en": "The category of substance responsible for the adverse reaction. Generally only required where the terminology used to record Substance/Agent cannot determine the Substance Category via inferencing."
                  },
                  "annotations": {
                    "comment": "e.g. Medication, Foodstuff, Environmental agent"
                  },
                  "aqlPath": "/content[openEHR-EHR-SECTION.adhoc.v1,'1. Allergies and Other Adverse Reactions Section ']/items[openEHR-EHR-EVALUATION.adverse_reaction.v1]/data[at0001]/items[at0050,'1.1/2 Allergen Category']/value",
                  "inputs": [
                    {
                      "type": "TEXT",
                      "list": [
                        {
                          "value": "1: Drug",
                          "label": "1: Drug"
                        },
                        {
                          "value": "2: Foodstuff",
                          "label": "2: Foodstuff"
                        },
                        {
                          "value": "9: Other",
                          "label": "9: Other"
                        }
                      ],
                      "listOpen": false
                    }
                  ],
                  "formId": "ppop_national_patient_summary/a1._allergies_and_other_adverse_reactions_section/adverse_reaction/a1.1_2_allergen_category",
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
                    "datasource": {
                      "loadRemote": false,
                      "loadRemoteUrl": "",
                      "terminology": ""
                    }
                  }
                },
                {
                  "name": "1.5 Severity of hypersensitivity",
                  "localizedName": "1.5 Severity of hypersensitivity",
                  "rmType": "DV_CODED_TEXT",
                  "nodeId": "at0051",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {
                    "": "1.5 Severity of hypersensitivity"
                  },
                  "localizedDescriptions": {
                    "en": "The potential seriousness of a future reaction. This represents a clinical judgment about the worst case scenario for a future reaction."
                  },
                  "annotations": {
                    "comment": "From FHIR AllergyIntolerance Resource"
                  },
                  "aqlPath": "/content[openEHR-EHR-SECTION.adhoc.v1,'1. Allergies and Other Adverse Reactions Section ']/items[openEHR-EHR-EVALUATION.adverse_reaction.v1]/data[at0001]/items[at0051,'1.5 Severity of hypersensitivity']/value",
                  "inputs": [
                    {
                      "suffix": "code",
                      "type": "CODED_TEXT",
                      "list": [
                        {
                          "value": "442452003",
                          "label": "Life-threatening",
                          "localizedLabels": {
                            "en": "Life-threatening"
                          }
                        },
                        {
                          "value": "349915008",
                          "label": "severe",
                          "localizedLabels": {
                            "en": "severe"
                          }
                        },
                        {
                          "value": "24484000",
                          "label": "heavy",
                          "localizedLabels": {
                            "en": "heavy"
                          }
                        }
                      ],
                      "terminology": "SNOMED-CT"
                    }
                  ],
                  "formId": "ppop_national_patient_summary/a1._allergies_and_other_adverse_reactions_section/adverse_reaction/a1.5_severity_of_hypersensitivity",
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
                    "datasource": {
                      "loadRemote": false,
                      "loadRemoteUrl": "",
                      "terminology": ""
                    }
                  }
                },
                {
                  "name": "Reaction Event",
                  "localizedName": "Reaction Event",
                  "rmType": "CLUSTER",
                  "nodeId": "at0009",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {
                    "en": "Reaction Event"
                  },
                  "localizedDescriptions": {
                    "en": "Details about each Adverse Reaction Event."
                  },
                  "annotations": {
                    "view:pass_through": "true"
                  },
                  "aqlPath": "/content[openEHR-EHR-SECTION.adhoc.v1,'1. Allergies and Other Adverse Reactions Section ']/items[openEHR-EHR-EVALUATION.adverse_reaction.v1]/data[at0001]/items[at0009]",
                  "children": [
                    {
                      "name": "1.3/4 Clinical manifestation",
                      "localizedName": "1.3/4 Clinical manifestation",
                      "rmType": "DV_CODED_TEXT",
                      "nodeId": "at0011",
                      "min": 1,
                      "max": 1,
                      "localizedNames": {
                        "": "1.3/4 Clinical manifestation"
                      },
                      "localizedDescriptions": {
                        "en": "Clinical manifestation of the Adverse Reaction expressed as a single word, phrase or brief description, e.g. nausea or rash."
                      },
                      "annotations": {
                        "comment": "Manifestation should be coded with a terminology, where possible. The values entered here may be used to display on an application screen as part a list of adverse reactions, as recommended in the NHS CUI guidelines."
                      },
                      "aqlPath": "/content[openEHR-EHR-SECTION.adhoc.v1,'1. Allergies and Other Adverse Reactions Section ']/items[openEHR-EHR-EVALUATION.adverse_reaction.v1]/data[at0001]/items[at0009]/items[at0011,'1.3/4 Clinical manifestation']/value",
                      "inputs": [
                        {
                          "suffix": "code",
                          "type": "TEXT",
                          "terminology": "epSOS?subset=epSOSReactionAllergy&language=en-GB"
                        },
                        {
                          "suffix": "value",
                          "type": "TEXT",
                          "terminology": "epSOS?subset=epSOSReactionAllergy&language=en-GB"
                        }
                      ],
                      "formId": "ppop_national_patient_summary/a1._allergies_and_other_adverse_reactions_section/adverse_reaction/reaction_event/a1.3_4_clinical_manifestation",
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
                        "datasource": {
                          "loadRemote": false,
                          "loadRemoteUrl": "",
                          "terminology": ""
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
                      "name": "1.6 Date of occurence",
                      "localizedName": "1.6 Date of occurence",
                      "rmType": "DV_DATE_TIME",
                      "nodeId": "at0027",
                      "min": 0,
                      "max": 1,
                      "localizedNames": {
                        "": "1.6 Date of occurence"
                      },
                      "localizedDescriptions": {
                        "en": "Record of the date and/or time of the onset of the Adverse Reaction."
                      },
                      "aqlPath": "/content[openEHR-EHR-SECTION.adhoc.v1,'1. Allergies and Other Adverse Reactions Section ']/items[openEHR-EHR-EVALUATION.adverse_reaction.v1]/data[at0001]/items[at0009]/items[at0027,'1.6 Date of occurence']/value",
                      "inputs": [
                        {
                          "type": "DATETIME"
                        }
                      ],
                      "formId": "ppop_national_patient_summary/a1._allergies_and_other_adverse_reactions_section/adverse_reaction/reaction_event/a1.6_date_of_occurence",
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
                        "datasource": {
                          "loadRemote": false,
                          "loadRemoteUrl": "",
                          "terminology": ""
                        },
                        "field": {
                          "input": {
                            "dateFormat": "",
                            "hideDate": false,
                            "hideTime": false
                          }
                        }
                      }
                    }
                  ],
                  "formId": "ppop_national_patient_summary/a1._allergies_and_other_adverse_reactions_section/adverse_reaction/reaction_event",
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
                },
                {
                  "name": "Date Last Updated",
                  "localizedName": "Date Last Updated",
                  "rmType": "DV_DATE_TIME",
                  "nodeId": "at0052",
                  "min": 0,
                  "max": 1,
                  "dependsOn": [
                    "reaction_event",
                    "a1.5_severity_of_hypersensitivity",
                    "a1.1_2_allergen_category",
                    "a1.7_8_allergen"
                  ],
                  "localizedNames": {
                    "en": "Date Last Updated"
                  },
                  "localizedDescriptions": {
                    "en": "The date at which the Adverse Reaction information was most recently updated or verified."
                  },
                  "aqlPath": "/content[openEHR-EHR-SECTION.adhoc.v1,'1. Allergies and Other Adverse Reactions Section ']/items[openEHR-EHR-EVALUATION.adverse_reaction.v1]/protocol[at0042]/items[at0052]/value",
                  "inputs": [
                    {
                      "type": "DATETIME"
                    }
                  ],
                  "formId": "ppop_national_patient_summary/a1._allergies_and_other_adverse_reactions_section/adverse_reaction/date_last_updated",
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
                    "datasource": {
                      "loadRemote": false,
                      "loadRemoteUrl": "",
                      "terminology": ""
                    },
                    "field": {
                      "input": {
                        "dateFormat": "",
                        "hideDate": false,
                        "hideTime": false
                      }
                    }
                  }
                }
              ],
              "formId": "ppop_national_patient_summary/a1._allergies_and_other_adverse_reactions_section/adverse_reaction",
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
                  "readonly": false,
                  "hideHeader": false
                },
                "tags": [
                  "noExclusion"
                ]
              }
            },
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
                "en": "A statement about exclusion of known adverse reactions in the health record."
              },
              "annotations": {
                "comment": "For example: \"No known adverse reactions\"; \"No known adverse reaction to\" (penicillin)."
              },
              "aqlPath": "/content[openEHR-EHR-SECTION.adhoc.v1,'1. Allergies and Other Adverse Reactions Section ']/items[openEHR-EHR-EVALUATION.exclusion-adverse_reaction.v1]/data[at0001]/items[at0002.1]/value",
              "inputs": [
                {
                  "type": "TEXT",
                  "defaultValue": "No known adverse reactions"
                }
              ],
              "formId": "ppop_national_patient_summary/a1._allergies_and_other_adverse_reactions_section/exclusion_of_an_adverse_reaction/exclusion_statement",
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
                  "exclusion"
                ],
                "field": {
                  "input": {
                    "presentation": "textfield"
                  }
                }
              }
            },
            {
              "name": "Absence Statement",
              "localizedName": "Absence Statement",
              "rmType": "DV_TEXT",
              "nodeId": "at0002",
              "min": "0",
              "max": "1",
              "localizedNames": {
                "en": "Absence Statement"
              },
              "localizedDescriptions": {
                "en": "Positive statement that no information is available."
              },
              "annotations": {
                "comment": "For example: \"No information available about adverse reactions\"; No information available about problems or diagnoses\"; \"No information available about previous procedures performed\"; or \"No information available about medications used\"."
              },
              "aqlPath": "/content[openEHR-EHR-SECTION.adhoc.v1,'1. Allergies and Other Adverse Reactions Section ']/items[openEHR-EHR-EVALUATION.absence.v1]/data[at0001]/items[at0002]/value",
              "inputs": [
                {
                  "type": "TEXT",
                  "defaultValue": "No information available about adverse reactions."
                }
              ],
              "formId": "ppop_national_patient_summary/a1._allergies_and_other_adverse_reactions_section/absence_of_information/absence_statement",
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
                  "absence"
                ],
                "field": {
                  "input": {
                    "presentation": "textfield"
                  }
                }
              }
            }
          ],
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
            "label": {
              "custom": true
            }
          }
        }
      ]
    };
    var values:any = {};

    var valueModel:any = {};
    var model = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription(null, desc, valueModel);
    expect(model.getRmType()).toBe(RmType.FORM_DEFINITION);
    var genericField:BooleanFieldModel = model.findSuccessorWithPath('generic-field-27914') as BooleanFieldModel;
    expect(genericField).toBeTruthy();
    var regularField:TextFieldModel = model.findSuccessorWithPath('ppop_national_patient_summary/a1._allergies_and_other_adverse_reactions_section/absence_of_information/absence_statement') as TextFieldModel;
    expect(regularField).toBeTruthy();
    expect(genericField.getIsGenericField()).toBe(true);
    expect(regularField.getIsGenericField()).toBe(false);
    expect(genericField.getRmType()).toBe(RmType.DV_BOOLEAN);
    expect(regularField.getRmType()).toBe(RmType.DV_TEXT);
    expect(genericField.booleanValue()).toBe(false);
    expect(regularField.textValue()).toBe("No information available about adverse reactions.");
    genericField.booleanValue("testing");
    regularField.textValue("absenceValue");
    expect(genericField.booleanValue()).toBe("testing");
    expect(regularField.textValue()).toBe("absenceValue");
    expect(valueModel.ppop_national_patient_summary["a1._allergies_and_other_adverse_reactions_section"][0].absence_of_information[0].absence_statement[0]).toBe('absenceValue');

    var recursivelyCheckPropName = function (propName, inObject) {
      for (var prop in inObject) {
        if (inObject.hasOwnProperty(prop)) {
          if (prop == propName) {
            return true;
          }
          if (ThinkEhrUtil.isObject(inObject[prop])) {
            recursivelyCheckPropName(propName, inObject[prop]);
          } else if (ThinkEhrUtil.isArray(inObject[prop])) {
            for (var i = 0; i < inObject[prop].length; i++) {
              recursivelyCheckPropName(propName, inObject[prop][i]);
            }
          }
        }
      }
      return false;
    };
    expect(recursivelyCheckPropName('generic-field-27914', valueModel)).toBe(false);
    expect(recursivelyCheckPropName('absence_statement', valueModel)).toBe(false);
  });

   it("Coded Text Field Model - Multi", function () {
   var desc = {
   "name": "Character",
   "localizedName": "Character",
   "rmType": "DV_CODED_TEXT",
   "nodeId": "at0032.1.1",
   "min": "0",
   "max": "100",
   "localizedNames": {
   "sl": "Značilnost bolečine",
   "en": "Character"
   },
   "aqlPath": "/content[openEHR-EHR-SECTION.ispek_dialog.v1,'Pain assessment']/items[openEHR-EHR-OBSERVATION.story.v1,'Story']/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.symptom-pain-zn.v1]/items[at0032.1.1]/value",
   "inputs": [
   {
   "suffix": "code",
   "type": "CODED_TEXT",
   "list": [
   {
   "value": "at0.176",
   "label": "Crushing",
   "localizedLabels": {
   "sl": "Silovita / močna",
   "en": "Crushing"
   }
   },
   {
   "value": "at0.177",
   "label": "Burning",
   "localizedLabels": {
   "sl": "Peče",
   "en": "Burning"
   }
   },
   {
   "value": "at0.178",
   "label": "Cramping",
   "localizedLabels": {
   "sl": "Krči",
   "en": "Cramping"
   }
   },
   {
   "value": "at0.179",
   "label": "Colicky",
   "localizedLabels": {
   "sl": "Krči v trbuhu",
   "en": "Colicky"
   }
   },
   {
   "value": "at0.180",
   "label": "Deep",
   "localizedLabels": {
   "sl": "Notranja",
   "en": "Deep"
   }
   },
   {
   "value": "at0.181",
   "label": "Diffuse",
   "localizedLabels": {
   "sl": "Razpršena",
   "en": "Diffuse"
   }
   },
   {
   "value": "at0.182",
   "label": "Dull ache",
   "localizedLabels": {
   "sl": "Topa",
   "en": "Dull ache"
   }
   },
   {
   "value": "at0.183",
   "label": "Shooting",
   "localizedLabels": {
   "sl": "Odrvenelost",
   "en": "Shooting"
   }
   },
   {
   "value": "at0.184",
   "label": "Superficial",
   "localizedLabels": {
   "sl": "Površinska",
   "en": "Superficial"
   }
   },
   {
   "value": "at0.185",
   "label": "Throbbing",
   "localizedLabels": {
   "sl": "Utripajoča",
   "en": "Throbbing"
   }
   },
   {
   "value": "at0.186",
   "label": "Sharp",
   "localizedLabels": {
   "sl": "Ostra",
   "en": "Sharp"
   }
   },
   {
   "value": "at0.187",
   "label": "Heavy",
   "localizedLabels": {
   "sl": "Močna",
   "en": "Heavy"
   }
   },
   {
   "value": "at0.188",
   "label": "Tearing",
   "localizedLabels": {
   "sl": "Trga",
   "en": "Tearing"
   }
   },
   {
   "value": "at0.189",
   "label": "Squeezing",
   "localizedLabels": {
   "sl": "Stiskajoča",
   "en": "Squeezing"
   }
   },
   {
   "value": "at0.190",
   "label": "Stabbing",
   "localizedLabels": {
   "sl": "Zbadajoča",
   "en": "Stabbing"
   }
   },
   {
   "value": "at0.191",
   "label": "Griping",
   "localizedLabels": {
   "sl": "Mravljičenje",
   "en": "Griping"
   }
   },
   {
   "value": "at0.0.207",
   "label": "Paraesthetic sensation",
   "localizedLabels": {
   "sl": "Parestetično zaznavanje",
   "en": "Paraesthetic sensation"
   }
   }
   ]
   }
   ],
   "formId": "assessment_scales/pain_assessment/story/pain/character",
   "viewConfig": {
   "advanced": {
   "hidden": false,
   "readonly": false
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
   ],
   "datasource": {
   "loadRemote": false,
   "loadRemoteUrl": ""
   },
   "field": {
   "code": {
   "presentation": "combobox"
   }
   },
   "annotations": {
   "columns": "3"
   }
   }
   };

   var cfm:CodedTextFieldModel = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescriptionSnippet(desc, {},null) as CodedTextFieldModel;


   expect(cfm.getRmType()).toBe(RmType.DV_CODED_TEXT);
   expect(cfm.getName()).toBe("Character");
   expect(cfm.getLocalizedName()).toBe("Character");
   expect(cfm.getLocalizedName("sl")).toBe("Značilnost bolečine");
   expect(cfm.getLocalizedName("en")).toBe("Character");
   expect(cfm.getLocalizedName("ru")).toBeNull();
   expect(cfm.getMin()).toBe(0);
   expect(cfm.getMax()).toBe(100);
   expect(cfm.isMulti()).toBeTruthy();
   expect(cfm.getNodeId()).toBe("at0032.1.1");
   expect(cfm.getAqlPath()).toBe("/content[openEHR-EHR-SECTION.ispek_dialog.v1,'Pain assessment']/items[openEHR-EHR-OBSERVATION.story.v1,'Story']/data[" +
   "at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.symptom-pain-zn.v1]/items[at0032.1.1]/value");
   expect(cfm.getInputFor("code").getDefaultValue()).toBeUndefined();
   expect(cfm.getFormId()).toBe("assessment_scales/pain_assessment/story/pain/character");

   expect(cfm.getViewConfig() instanceof ViewConfig).toBeTruthy();
   expect(cfm.getViewConfig().getFields() instanceof Field).toBeTruthy();
   expect(cfm.getViewConfig().getFields().getPresentation()).toBe(FieldPresentation.COMBOBOX);
   expect(cfm.getViewConfig().isHidden()).toBeFalsy();
   expect(cfm.getViewConfig().isReadOnly()).toBeFalsy();
   expect(cfm.getViewConfig()['advanced']).toEqual({});
   expect(cfm.getViewConfig().getMin()).toBe(0);
   expect(cfm.getViewConfig().getMax()).toBe(100);
   expect(cfm.getViewConfig()['multiplicity']).toBeUndefined();
   expect(cfm.getViewConfig().getLabel() instanceof Label).toBeFalsy();
   expect(cfm.getViewConfig().getLayout() instanceof Layout).toBeTruthy();
   expect(cfm.getViewConfig().getLayout().getLabelVerticalAlignment()).toBe(LabelVerticalAlignment.TOP);
   expect(cfm.getViewConfig().getSize() instanceof Size).toBeTruthy();
   expect(cfm.getViewConfig().getSize().getField()).toBe(FieldSize.INHERIT);

   expect(cfm.getInputs().length).toBe(1);
   expect(cfm.getInput(0) instanceof Input).toBeTruthy();
   expect(cfm.getInput(0).getSuffix()).toBe("code");
   expect(cfm.getInput(0).getType()).toBe(InputType.CODED_TEXT);
   expect(cfm.getInput(0).getList().length).toBe(17);
   expect(cfm.getInput(0).getItem(0) instanceof InputItem).toBeTruthy();
   expect(cfm.getInput(0).getItem(0).getValue()).toBe("at0.176");
   expect(cfm.getInput(0).getItem(0).getLabel()).toBe("Crushing");
   expect(cfm.getInput(0).getItem(0).getLabel("en")).toBe("Crushing");
   expect(cfm.getInput(0).getItem(0).getLabel("sl")).toBe("Silovita / močna");
   expect(cfm.getInput(0).getItem(0).getLabel("ro")).toBe("Crushing");
   expect(cfm.getInput(0).getItem(0).getValidation()).toBeUndefined();
   expect(cfm.getInput(0).getItem(1) instanceof InputItem).toBeTruthy();
   expect(cfm.getInput(0).getItem(1).getValue()).toBe("at0.177");
   expect(cfm.getInput(0).getItem(1).getLabel()).toBe("Burning");
   expect(cfm.getInput(0).getItem(1).getLabel("en")).toBe("Burning");
   expect(cfm.getInput(0).getItem(1).getLabel("sl")).toBe("Peče");
   expect(cfm.getInput(0).getItem(1).getLabel("no")).toBe("Burning");
   expect(cfm.getInput(0).getItem(1).getValidation()).toBeUndefined();

   var valArray = cfm.getValue();
   expect(ThinkEhrUtil.isArray(valArray)).toBeTruthy();
   expect(valArray.length).toBe(0);

   cfm.addValue("at0.181");
   valArray = cfm.getValue();
   expect(valArray.length).toBe(1);
   expect(valArray[0]["|code"]).toBe("at0.181");
   expect(valArray[0]["|value"]).toBe("Diffuse");
   expect(cfm.findValueObjectByCode("at0.181")).toBe(valArray[0]);

   cfm.addValue("at0.191");

   valArray = cfm.getValue();
   expect(valArray.length).toBe(2);
   expect(valArray[0]["|code"]).toBe("at0.181");
   expect(valArray[0]["|value"]).toBe("Diffuse");
   expect(valArray[1]["|code"]).toBe("at0.191");
   expect(valArray[1]["|value"]).toBe("Griping");
   expect(cfm.findValueObjectByCode("at0.181")).toBe(valArray[0]);
   expect(cfm.findValueObjectByCode("at0.191")).toBe(valArray[1]);

   cfm.removeValue("at0.181");

   valArray = cfm.getValue();
   expect(valArray.length).toBe(1);
   expect(valArray[0]["|code"]).toBe("at0.191");
   expect(valArray[0]["|value"]).toBe("Griping");
   expect(cfm.findValueObjectByCode("at0.181")).toBeNull();
   expect(cfm.findValueObjectByCode("at0.191")).toBe(valArray[0]);
   });

   it("Coded Text Field Model - Single - List Open", function () {
   var desc:any = {
   "name": "Pain effect",
   "localizedName": "Pain effect",
   "rmType": "DV_CODED_TEXT",
   "nodeId": "at0167.0.1",
   "min": "0",
   "max": "100",
   "localizedNames": {
   "sl": "Simptom vpliva na",
   "en": "Pain effect"
   },
   "aqlPath": "/content[openEHR-EHR-SECTION.ispek_dialog.v1,'Pain assessment']/items[openEHR-EHR-OBSERVATION.story.v1,'Story']/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.symptom-pain-zn.v1]/items[at0020,'Pain effects']/items[at0167.0.1]/value",
   "inputs": [
   {
   "suffix": "code",
   "type": "CODED_TEXT",
   "list": [
   {
   "value": "at0.0.208",
   "label": "Nausea",
   "localizedLabels": {
   "sl": "Slabost v želodcu",
   "en": "Nausea"
   }
   },
   {
   "value": "at0.0.209",
   "label": "Sleep disturbance",
   "localizedLabels": {
   "sl": "Spanje",
   "en": "Sleep disturbance"
   }
   },
   {
   "value": "at0.0.210",
   "label": "Appetite",
   "localizedLabels": {
   "sl": "Apetit",
   "en": "Appetite"
   }
   },
   {
   "value": "at0.0.211",
   "label": "Diminished physical activity",
   "localizedLabels": {
   "sl": "Fizične aktivnosti",
   "en": "Diminished physical activity"
   }
   },
   {
   "value": "at0.0.212",
   "label": "Emotional upset",
   "localizedLabels": {
   "sl": "Čustvovanje",
   "en": "Emotional upset"
   }
   },
   {
   "value": "at0.0.213",
   "label": "Impaired concentration",
   "localizedLabels": {
   "sl": "Koncentracija",
   "en": "Impaired concentration"
   }
   }
   ],
   "listOpen": true
   },
   {
   "suffix": "other",
   "type": "TEXT"
   }
   ],
   "formId": "assessment_scales/pain_assessment/story/pain/pain_effects/pain_effect",
   "viewConfig": {
   "advanced": {
   "hidden": false,
   "readonly": false
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
   "tags": [],
   "datasource": {
   "loadRemote": false,
   "loadRemoteUrl": ""
   },
   "annotations": {
   "columns": "3"
   },
   "field": {
   "code": {
   "presentation": "radios",
   "columns": "3"
   }
   }
   }
   };

   var values:any = {
   "assessment_scales": {
   "pain_assessment": [
   {
   "story": [
   {
   "pain": [
   {
   "pain_effects": [
   {
   "pain_effect": [
   {
   "|other": "Some free text"
   }
   ]
   }
   ]
   }
   ]
   }
   ]
   }
   ]
   }
   };

   var cfm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescriptionSnippet(desc, values, null) as CodedTextFieldModel;

   expect(cfm.isListOpen()).toBeTruthy();

   expect(cfm.getRmType()).toBe(RmType.DV_CODED_TEXT);
   expect(cfm.getName()).toBe("Pain effect");
   expect(cfm.getLocalizedName()).toBe("Pain effect");
   expect(cfm.getLocalizedName("sl")).toBe("Simptom vpliva na");
   expect(cfm.getLocalizedName("en")).toBe("Pain effect");
   expect(cfm.getLocalizedName("ru")).toBeNull();
   expect(cfm.getMin()).toBe(0);
   expect(cfm.getMax()).toBe(100);
   expect(cfm.isMulti()).toBeTruthy();
   expect(cfm.getNodeId()).toBe("at0167.0.1");
   expect(cfm.getAqlPath()).toBe("/content[openEHR-EHR-SECTION.ispek_dialog.v1,'Pain assessment']/items[openEHR-EHR-OBSERVATION.story.v1,'Story']/" +
   "data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.symptom-pain-zn.v1]/items[at0020,'Pain effects']/items[at0167.0.1]/value");
   expect(cfm.getInputFor("code").getDefaultValue()).toBeUndefined();
   expect(cfm.getFormId()).toBe("assessment_scales/pain_assessment/story/pain/pain_effects/pain_effect");

   expect(cfm.getViewConfig() instanceof ViewConfig).toBeTruthy();
   expect(cfm.getViewConfig().getFields() instanceof Field).toBeTruthy();
   expect(cfm.getViewConfig().getFields().getPresentation()).toBe(FieldPresentation.RADIOS);
   expect(cfm.getViewConfig().isHidden()).toBeFalsy();
   expect(cfm.getViewConfig().isReadOnly()).toBeFalsy();
   expect(cfm.getViewConfig()['advanced']).toEqual({});
   expect(cfm.getViewConfig().getMin()).toBe(0);
   expect(cfm.getViewConfig().getMax()).toBe(100);
   expect(cfm.isMulti()).toBeTruthy();
   expect(cfm.getViewConfig()['multiplicity']).toBeUndefined();
   expect(cfm.getViewConfig().getLabel() instanceof Label).toBeFalsy();
   expect(cfm.getViewConfig().getLayout() instanceof Layout).toBeTruthy();
   expect(cfm.getViewConfig().getLayout().getLabelVerticalAlignment()).toBe(LabelVerticalAlignment.TOP);
   expect(cfm.getViewConfig().getSize() instanceof Size).toBeTruthy();
   expect(cfm.getViewConfig().getSize().getField()).toBe(FieldSize.INHERIT);

   expect(cfm.getInputs().length).toBe(2);
   expect(cfm.getInput(0) instanceof Input).toBeTruthy();
   expect(cfm.getInput(0).getSuffix()).toBe("code");
   expect(cfm.getInput(1).getSuffix()).toBe("other");
   expect(cfm.getInput(0).getType()).toBe(InputType.CODED_TEXT);
   expect(cfm.getInput(1).getType()).toBe(InputType.TEXT);
   expect(cfm.getInput(0).getList().length).toBe(6);
   expect(cfm.getInput(0).getItem(0) instanceof InputItem).toBeTruthy();
   expect(cfm.getInput(0).getItem(0).getValue()).toBe("at0.0.208");
   expect(cfm.getInput(0).getItem(0).getLabel()).toBe("Nausea");
   expect(cfm.getInput(0).getItem(0).getLabel("en")).toBe("Nausea");
   expect(cfm.getInput(0).getItem(0).getLabel("sl")).toBe("Slabost v želodcu");
   expect(cfm.getInput(0).getItem(0).getLabel("ro")).toBe("Nausea");
   expect(cfm.getInput(0).getItem(0).getValidation()).toBeUndefined();
   expect(cfm.getInput(0).getItem(5) instanceof InputItem).toBeTruthy();
   expect(cfm.getInput(0).getItem(5).getValue()).toBe("at0.0.213");
   expect(cfm.getInput(0).getItem(5).getLabel()).toBe("Impaired concentration");
   expect(cfm.getInput(0).getItem(5).getLabel("en")).toBe("Impaired concentration");
   expect(cfm.getInput(0).getItem(5).getLabel("sl")).toBe("Koncentracija");
   expect(cfm.getInput(0).getItem(5).getLabel("no")).toBe("Impaired concentration");
   var valObject = cfm.getValue()[0];
   expect(ThinkEhrUtil.isObject(valObject)).toBeTruthy();
   expect(valObject["|other"]).toBe("Some free text");
   expect(valObject["|code"]).toBeUndefined();
   expect(valObject["|value"]).toBeUndefined();

   cfm.codeValue("at0.0.210", "sl");
   valObject = cfm.getValue()[0];
   expect(valObject["|other"]).toBeUndefined();
   expect(valObject["|code"]).toBe("at0.0.210");
   expect(valObject["|value"]).toBe("Apetit");

   cfm.otherValue("Acute pain");
   valObject = cfm.getValue()[0];
   expect(valObject["|other"]).toBe("Acute pain");
   expect(valObject["|code"]).toBeUndefined();
   expect(valObject["|value"]).toBeUndefined();
   });

   it("Coded Text Field Model - Multi - List Open", function () {
   var desc:any = {
   "name": "Pain effect",
   "localizedName": "Pain effect",
   "rmType": "DV_CODED_TEXT",
   "nodeId": "at0167.0.1",
   "min": "0",
   "max": "100",
   "localizedNames": {
   "sl": "Simptom vpliva na",
   "en": "Pain effect"
   },
   "aqlPath": "/content[openEHR-EHR-SECTION.ispek_dialog.v1,'Pain assessment']/items[openEHR-EHR-OBSERVATION.story.v1,'Story']/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.symptom-pain-zn.v1]/items[at0020,'Pain effects']/items[at0167.0.1]/value",
   "inputs": [
   {
   "suffix": "code",
   "type": "CODED_TEXT",
   "list": [
   {
   "value": "at0.0.208",
   "label": "Nausea",
   "localizedLabels": {
   "sl": "Slabost v želodcu",
   "en": "Nausea"
   }
   },
   {
   "value": "at0.0.209",
   "label": "Sleep disturbance",
   "localizedLabels": {
   "sl": "Spanje",
   "en": "Sleep disturbance"
   }
   },
   {
   "value": "at0.0.210",
   "label": "Appetite",
   "localizedLabels": {
   "sl": "Apetit",
   "en": "Appetite"
   }
   },
   {
   "value": "at0.0.211",
   "label": "Diminished physical activity",
   "localizedLabels": {
   "sl": "Fizične aktivnosti",
   "en": "Diminished physical activity"
   }
   },
   {
   "value": "at0.0.212",
   "label": "Emotional upset",
   "localizedLabels": {
   "sl": "Čustvovanje",
   "en": "Emotional upset"
   }
   },
   {
   "value": "at0.0.213",
   "label": "Impaired concentration",
   "localizedLabels": {
   "sl": "Koncentracija",
   "en": "Impaired concentration"
   }
   }
   ],
   "listOpen": true,
   "defaultValue": "at0.0.212"
   },
   {
   "suffix": "other",
   "type": "TEXT"
   }
   ],
   "formId": "assessment_scales/pain_assessment/story/pain/pain_effects/pain_effect",
   "viewConfig": {
   "advanced": {
   "hidden": false,
   "readonly": false
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
   "valign": "top",
   "align": "inherit"
   }
   },
   "tags": [
   "multi"
   ],
   "datasource": {
   "loadRemote": false,
   "loadRemoteUrl": ""
   },
   "annotations": {
   "columns": "3"
   },
   "field": {
   "other": {
   "presentation": "textfield",
   "lines": "1"
   }
   }
   }
   };

   var values:any = {
   "assessment_scales": {
   "pain_assessment": [
   {
   "story": [
   {
   "pain": [
   {
   "pain_effects": [
   {
   "pain_effect": [
   {
   "|other": "something"
   },
   {
   "|code": "at0.0.208",
   "|value": "Slabost v želodcu",
   "|terminology": "local"
   },
   {
   "|code": "at0.0.211",
   "|value": "Fizične aktivnosti",
   "|terminology": "local"
   }
   ],
   "other_pain_effect_description": [
   "abc"
   ]
   }
   ]
   }
   ]
   }
   ]
   }
   ]
   }
   };

   var cfm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescriptionSnippet(desc, values, null) as CodedTextFieldModel;

   expect(cfm.isListOpen()).toBeTruthy();

   expect(cfm.getRmType()).toBe(RmType.DV_CODED_TEXT);
   expect(cfm.getName()).toBe("Pain effect");
   expect(cfm.getLocalizedName()).toBe("Pain effect");
   expect(cfm.getLocalizedName("sl")).toBe("Simptom vpliva na");
   expect(cfm.getLocalizedName("en")).toBe("Pain effect");
   expect(cfm.getLocalizedName("ru")).toBeNull();
   expect(cfm.getMin()).toBe(0);
   expect(cfm.getMax()).toBe(100);
   expect(cfm.isMulti()).toBeTruthy();
   expect(cfm.getNodeId()).toBe("at0167.0.1");
   expect(cfm.getAqlPath()).toBe("/content[openEHR-EHR-SECTION.ispek_dialog.v1,'Pain assessment']/items[openEHR-EHR-OBSERVATION.story.v1,'Story']/" +
   "data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.symptom-pain-zn.v1]/items[at0020,'Pain effects']/items[at0167.0.1]/value");
   expect(cfm.getInputFor("code").getDefaultValue()).toBe("at0.0.212");
   expect(cfm.getFormId()).toBe("assessment_scales/pain_assessment/story/pain/pain_effects/pain_effect");

   expect(cfm.getViewConfig() instanceof ViewConfig).toBeTruthy();
   expect(cfm.getViewConfig().getFields("other") instanceof Field).toBeTruthy();
   expect(cfm.getViewConfig().getFields("other").getPresentation()).toBe(FieldPresentation.TEXTFIELD);
   expect(cfm.getViewConfig().isHidden()).toBeFalsy();
   expect(cfm.getViewConfig().isReadOnly()).toBeFalsy();
   expect(cfm.getViewConfig()['advanced']).toEqual({});
   expect(cfm.getViewConfig().getMin()).toBe(0);
   expect(cfm.getViewConfig().getMax()).toBe(100);
   expect(cfm.getViewConfig()['multiplicity']).toBeUndefined();
   expect(cfm.getViewConfig().getLabel() instanceof Label).toBeFalsy();
   expect(cfm.getViewConfig().getLayout() instanceof Layout).toBeTruthy();
   expect(cfm.getViewConfig().getLayout().getLabelVerticalAlignment()).toBe(LabelVerticalAlignment.INHERIT);
   expect(cfm.getViewConfig().getSize() instanceof Size).toBeTruthy();
   expect(cfm.getViewConfig().getSize().getField()).toBe(FieldSize.INHERIT);

   expect(cfm.getInputs().length).toBe(2);
   expect(cfm.getInput(0) instanceof Input).toBeTruthy();
   expect(cfm.getInput(0).getSuffix()).toBe("code");
   expect(cfm.getInput(1).getSuffix()).toBe("other");
   expect(cfm.getInput(0).getType()).toBe(InputType.CODED_TEXT);
   expect(cfm.getInput(0).getList().length).toBe(6);
   expect(cfm.getInput(0).getItem(0) instanceof InputItem).toBeTruthy();
   expect(cfm.getInput(0).getItem(0).getValue()).toBe("at0.0.208");
   expect(cfm.getInput(0).getItem(0).getLabel()).toBe("Nausea");
   expect(cfm.getInput(0).getItem(0).getLabel("en")).toBe("Nausea");
   expect(cfm.getInput(0).getItem(0).getLabel("sl")).toBe("Slabost v želodcu");
   expect(cfm.getInput(0).getItem(0).getLabel("ro")).toBe("Nausea");
   expect(cfm.getInput(0).getItem(0).getValidation()).toBeUndefined();
   expect(cfm.getInput(0).getItem(5) instanceof InputItem).toBeTruthy();
   expect(cfm.getInput(0).getItem(5).getValue()).toBe("at0.0.213");
   expect(cfm.getInput(0).getItem(5).getLabel()).toBe("Impaired concentration");
   expect(cfm.getInput(0).getItem(5).getLabel("en")).toBe("Impaired concentration");
   expect(cfm.getInput(0).getItem(5).getLabel("sl")).toBe("Koncentracija");
   expect(cfm.getInput(0).getItem(5).getLabel("no")).toBe("Impaired concentration");

   var valArray = cfm.getValue();
   expect(ThinkEhrUtil.isArray(valArray)).toBeTruthy();
   expect(valArray.length).toBe(3);

   expect(cfm.findOtherValueObject()).toBe(valArray[0]);
   expect(cfm.findValueObjectByCode("at0.0.208")).toBe(valArray[1]);
   expect(cfm.findValueObjectByCode("at0.0.211")).toBe(valArray[2]);

   cfm.removeOtherValue();
   expect(cfm.findOtherValueObject()).toBeNull();
   valArray = cfm.getValue();
   expect(cfm.findValueObjectByCode("at0.0.208")).toBe(valArray[0]);
   expect(cfm.findValueObjectByCode("at0.0.211")).toBe(valArray[1]);

   cfm.addValue("at0.0.210");
   valArray = cfm.getValue();
   expect(valArray.length).toBe(3);
   expect(cfm.findOtherValueObject()).toBeNull();
   expect(cfm.findValueObjectByCode("at0.0.208")).toBe(valArray[0]);
   expect(cfm.findValueObjectByCode("at0.0.211")).toBe(valArray[1]);
   expect(cfm.findValueObjectByCode("at0.0.210")).toBe(valArray[2]);
   expect(valArray[2]["|code"]).toBe("at0.0.210");
   expect(valArray[2]["|value"]).toBe("Appetite");

   cfm.removeValue("at0.0.211");
   valArray = cfm.getValue();
   expect(valArray.length).toBe(2);
   expect(cfm.findOtherValueObject()).toBeNull();
   expect(cfm.findValueObjectByCode("at0.0.208")).toBe(valArray[0]);
   expect(cfm.findValueObjectByCode("at0.0.210")).toBe(valArray[1]);

   cfm.otherValue("This is some free text.");
   valArray = cfm.getValue();
   expect(valArray.length).toBe(3);
   expect(cfm.findValueObjectByCode("at0.0.208")).toBe(valArray[0]);
   expect(cfm.findValueObjectByCode("at0.0.210")).toBe(valArray[1]);
   expect(cfm.findOtherValueObject()).toBe(valArray[2]);
   expect(valArray[2]["|other"]).toBe("This is some free text.");
   expect(valArray[2]["|code"]).toBeUndefined();

   cfm.otherValue("Redacted free text");
   valArray = cfm.getValue();
   expect(valArray.length).toBe(3);
   expect(cfm.findValueObjectByCode("at0.0.208")).toBe(valArray[0]);
   expect(cfm.findValueObjectByCode("at0.0.210")).toBe(valArray[1]);
   expect(cfm.findOtherValueObject()).toBe(valArray[2]);
   expect(valArray[2]["|other"]).toBe("Redacted free text");

   cfm.otherValue("");
   valArray = cfm.getValue();
   expect(valArray.length).toBe(2);
   expect(cfm.findValueObjectByCode("at0.0.208")).toBe(valArray[0]);
   expect(cfm.findValueObjectByCode("at0.0.210")).toBe(valArray[1]);
   expect(cfm.findOtherValueObject()).toBeNull();
   });

   it("Count Field Model", function () {
   var cfmPlain:any = {
   "name": "Count1",
   "localizedName": "Count1",
   "rmType": "DV_COUNT",
   "nodeId": "at0033",
   "min": "0",
   "max": "1",
   "localizedNames": {
   "sl": "Števec1",
   "en": "Count1"
   },
   "aqlPath": "/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0033]/value",
   "inputs": [
   {
   "type": "INTEGER",
   "validation": {
   "range": {
   "min": 1,
   "max": 20
   }
   },
   "defaultValue": 13
   }
   ],
   "formId": "test_encounter/testing/testing/count1",
   "viewConfig": {
   "advanced": {
   "hidden": true,
   "readonly": false
   },
   "size": {
   "field": "small",
   "label": "inherit"
   },
   "layout": {
   "label": {
   "valign": "inherit",
   "align": "left"
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
   }
   }
   };

   var cfm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescriptionSnippet(cfmPlain, {}) as CountFieldModel;

   expect(cfm.getRmType()).toBe(RmType.DV_COUNT);
   expect(cfm.getName()).toBe("Count1");
   expect(cfm.getLocalizedName()).toBe("Count1");
   expect(cfm.getLocalizedName("sl")).toBe("Števec1");
   expect(cfm.getLocalizedName("en")).toBe("Count1");
   expect(cfm.getLocalizedName("ru")).toBeNull();
   expect(cfm.getMin()).toBe(0);
   expect(cfm.getMax()).toBe(1);
   expect(cfm.isMulti()).toBeFalsy();
   expect(cfm.getNodeId()).toBe("at0033");
   expect(cfm.getAqlPath()).toBe("/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0033]/value");
   expect(cfm.getFormId()).toBe("test_encounter/testing/testing/count1");

   expect(cfm.getViewConfig() instanceof ViewConfig).toBeTruthy();

   expect(cfm.getViewConfig().isHidden()).toBeTruthy();
   expect(cfm.getViewConfig().isReadOnly()).toBeFalsy();
   expect(cfm.getViewConfig().getMin()).toBe(0);
   expect(cfm.getViewConfig().getMax()).toBe(1);
   expect(cfm.getViewConfig().getLabel() instanceof Label).toBeFalsy();
   expect(cfm.getViewConfig().getLayout() instanceof Layout).toBeTruthy();
   expect(cfm.getViewConfig().getLayout().getLabelVerticalAlignment()).toBe(LabelVerticalAlignment.INHERIT);
   expect(cfm.getViewConfig().getLayout().getLabelHorizontalAlignment()).toBe(LabelHorizontalAlignment.LEFT);
   expect(cfm.getViewConfig().getLayout().getFieldHorizontalAlignment()).toBe(FieldHorizontalAlignment.INHERIT);
   expect(cfm.getViewConfig().getLayout().getFieldVerticalAlignment()).toBe(FieldVerticalAlignment.INHERIT);
   expect(cfm.getViewConfig().getSize() instanceof Size).toBeTruthy();
   expect(cfm.getViewConfig().getSize().getField()).toBe(FieldSize.SMALL);

   expect(cfm.getInputs().length).toBe(1);
   expect(cfm.getInput(0) instanceof Input).toBeTruthy();
   expect(cfm.getInput(0).getSuffix()).toBeUndefined();
   expect(cfm.getInput(0).getType()).toBe(InputType.INTEGER);

   expect(cfm.labelFor("sl")).toBe("Števec1");
   expect(cfm.labelFor("ro")).toBe("Count1");

   var parentRef = [];
   cfm.setValueNodeParentRef(parentRef);
   expect(cfm._skipDefaultValue).toBe(false);
   expect(cfm.countValue()).toBe(13);
   expect(ThinkEhrUtil.isArray(parentRef)).toBeTruthy();
   expect(parentRef.length).toBe(1);
   expect(parentRef[0]).toBe(13);
   cfm.countValue(19);
   expect(cfm.countValue()).toBe(19);
   expect(parentRef.length).toBe(1);
   expect(parentRef[0]).toBe(19);
   cfm.clearCountValue();
   expect(cfm.countValue()).toBeNull();
   expect(cfm._skipDefaultValue).toBeTruthy();
   cfm.countValue(17);
   expect(cfm.countValue()).toBe(17);
   });

   it("labelFor() parse with no localization", function () {

   var descSnippet:any = {
   "name": "Name 1",
   "rmType": "DV_TEXT",
   "nodeId": "at0018",
   "min": 0,
   "max": 1,
   "aqlPath": "/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0018,'Name 1']/value",
   "inputs": [
   {
   "type": "TEXT"
   }
   ],
   "formId": "test_encounter/testing/testing/name_1"
   };

   var model = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescriptionSnippet(descSnippet, {}) as TextFieldModel;
   expect(model.getRmType()).toBe(RmType.DV_TEXT);
   expect(model.labelFor("ro")).toBe("Name 1");
   expect(model.labelFor()).toBe("Name 1");
   expect(model.labelFor(null)).toBe("Name 1");
   });

   it("Model Context Test", function () {
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
   "label": "inherit"
   },
   "layout": {
   "valign": "inherit",
   "align": "inherit"
   },
   "tags": []
   },
   "language": "",
   "children": [
   {
   "name": "Central venus pressure",
   "localizedName": "Central venus pressure",
   "rmType": "OBSERVATION",
   "nodeId": "openEHR-EHR-OBSERVATION.intravascular_pressure-mnd-cvp.v1",
   "min": "0",
   "max": "100",
   "localizedNames": {
   "sl": "CVP",
   "en": "Central venus pressure"
   },
   "aqlPath": "/content[openEHR-EHR-SECTION.ispek_dialog.v1,'Intravascular pressure measurements']/items[openEHR-EHR-OBSERVATION.intravascular_pressure-mnd-cvp.v1]",
   "children": [
   {
   "name": "Pressure",
   "localizedName": "Pressure",
   "rmType": "DV_QUANTITY",
   "nodeId": "at0005",
   "min": 0,
   "max": 1,
   "localizedNames": {
   "sl": "Tlak",
   "en": "Pressure"
   },
   "aqlPath": "/content[openEHR-EHR-SECTION.ispek_dialog.v1,'Intravascular pressure measurements']/items[openEHR-EHR-OBSERVATION.intravascular_pressure-mnd-cvp.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0005]/value",
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
   "value": "mm[Hg]",
   "label": "mm[Hg]",
   "validation": {
   "range": {
   "minOp": ">=",
   "min": 0
   },
   "precision": {
   "min": 2,
   "max": 2
   }
   }
   },
   {
   "value": "cm[H20]",
   "label": "cm[H20]",
   "validation": {
   "range": {
   "minOp": ">=",
   "min": 0
   },
   "precision": {
   "min": 2,
   "max": 2
   }
   }
   }
   ],
   "defaultValue": "mm[Hg]"
   }
   ],
   "formId": "vital_functions/intravascular_pressure_measurements/central_venus_pressure/any_event/pressure",
   "viewConfig": {
   "field": {
   "presentation": "combobox"
   }
   }
   },
   {
   "name": "Comment",
   "localizedName": "Comment",
   "rmType": "DV_TEXT",
   "nodeId": "at0035",
   "min": 0,
   "max": 1,
   "localizedNames": {
   "sl": "Komentar",
   "en": "Comment"
   },
   "aqlPath": "/content[openEHR-EHR-SECTION.ispek_dialog.v1,'Intravascular pressure measurements']/items[openEHR-EHR-OBSERVATION.intravascular_pressure-mnd-cvp.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0035]/value",
   "inputs": [
   {
   "type": "TEXT"
   }
   ],
   "formId": "vital_functions/intravascular_pressure_measurements/central_venus_pressure/any_event/comment"
   }
   ],
   "formId": "vital_functions/intravascular_pressure_measurements/central_venus_pressure",
   "viewConfig": {
   "advanced": {
   "hidden": false,
   "readonly": false
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
   "tags": ["multi"]
   }
   }
   ]
   };

   var context = {
     language:'en'
   };
   var model = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription(context, desc, {}) as FormRootModel;
   expect(model.getRmType()).toBe(RmType.FORM_DEFINITION);
   expect(model.getContext()).toBe(context);

   var containerModel = model.getChildModel(0) as RmContainerModel;
   expect(containerModel.isContainer()).toBeTruthy();
   expect(containerModel.getContext()).toBe(context);

   var commentModel = containerModel.getChildModel(1) as TextFieldModel;
   expect(commentModel.getRmType()).toBe(RmType.DV_TEXT);
   expect(commentModel.getContext()).toBe(context);
   expect(commentModel.getContext().language).toBe(context.language);

   var context2:any = {
   title: "Another context"
   };

   containerModel.setContext(context2);
   expect(containerModel.getContext()).toBe(context2);
   expect(commentModel.getContext()).toBe(context2);
   expect(model.getContext()).toBe(context);
   });


   it("getElementChain() Test", function () {
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
   "label": "inherit"
   },
   "layout": {
   "valign": "inherit",
   "align": "inherit"
   },
   "tags": []
   },
   "language": "",
   "children": [
   {
   "name": "Central venus pressure",
   "localizedName": "Central venus pressure",
   "rmType": "OBSERVATION",
   "nodeId": "openEHR-EHR-OBSERVATION.intravascular_pressure-mnd-cvp.v1",
   "min": "0",
   "max": "100",
   "localizedNames": {
   "sl": "CVP",
   "en": "Central venus pressure"
   },
   "aqlPath": "/content[openEHR-EHR-SECTION.ispek_dialog.v1,'Intravascular pressure measurements']/items[openEHR-EHR-OBSERVATION.intravascular_pressure-mnd-cvp.v1]",
   "children": [
   {
   "name": "Pressure",
   "localizedName": "Pressure",
   "rmType": "DV_QUANTITY",
   "nodeId": "at0005",
   "min": 0,
   "max": 1,
   "localizedNames": {
   "sl": "Tlak",
   "en": "Pressure"
   },
   "aqlPath": "/content[openEHR-EHR-SECTION.ispek_dialog.v1,'Intravascular pressure measurements']/items[openEHR-EHR-OBSERVATION.intravascular_pressure-mnd-cvp.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0005]/value",
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
   "value": "mm[Hg]",
   "label": "mm[Hg]",
   "validation": {
   "range": {
   "minOp": ">=",
   "min": 0
   },
   "precision": {
   "min": 2,
   "max": 2
   }
   }
   },
   {
   "value": "cm[H20]",
   "label": "cm[H20]",
   "validation": {
   "range": {
   "minOp": ">=",
   "min": 0
   },
   "precision": {
   "min": 2,
   "max": 2
   }
   }
   }
   ],
   "defaultValue": "mm[Hg]"
   }
   ],
   "formId": "vital_functions/intravascular_pressure_measurements/central_venus_pressure/any_event/pressure",
   "viewConfig": {
   "field": {
   "presentation": "combobox"
   }
   }
   },
   {
   "name": "Comment",
   "localizedName": "Comment",
   "rmType": "DV_TEXT",
   "nodeId": "at0035",
   "min": 0,
   "max": 1,
   "localizedNames": {
   "sl": "Komentar",
   "en": "Comment"
   },
   "aqlPath": "/content[openEHR-EHR-SECTION.ispek_dialog.v1,'Intravascular pressure measurements']/items[openEHR-EHR-OBSERVATION.intravascular_pressure-mnd-cvp.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0035]/value",
   "inputs": [
   {
   "type": "TEXT"
   }
   ],
   "formId": "vital_functions/intravascular_pressure_measurements/central_venus_pressure/any_event/comment"
   }
   ],
   "formId": "vital_functions/intravascular_pressure_measurements/central_venus_pressure",
   "viewConfig": {
   "advanced": {
   "hidden": false,
   "readonly": false
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
   "tags": ["multi"]
   }
   }
   ]
   };

   var model = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, {}) as FormRootModel;
   expect(model.getRmType()).toBe(RmType.FORM_DEFINITION);

   var containerModel = model.getChildModel(0) as RmContainerModel;
   expect(containerModel.isContainer()).toBeTruthy();

   var commentModel = containerModel.getChildModel(1) as TextFieldModel;
   expect(commentModel.getRmType()).toBe(RmType.DV_TEXT);

   var nameChain = commentModel.getElementNameChain();
   expect(nameChain.length).toBe(2);
   expect(nameChain[0]).toBe(containerModel.getElementName());
   expect(nameChain[1]).toBe("vital_functions_intravascular_pressure_measurements_central_venus_pressure_0_any_event_comment_0");
   });
   it("Coded Text Multi addValue() Test", function() {
   var desc:any = {
   "name": "Symptoms",
   "localizedName": "Symptoms",
   "rmType": "DV_CODED_TEXT",
   "nodeId": "at0.63",
   "min": "0",
   "max": "2",
   "localizedNames": {
   "en": "Symptoms",
   "sl": "Ugotovitve"
   },
   "localizedDescriptions": {
   "en": "Signs of abnormal body temperature.",
   "sl": "Znaki neobičajne telesne temperature"
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
   "en": "Chills / rigor / shivering",
   "sl": "Mrazenje/mrzlica"
   },
   "localizedDescriptions": {
   "en": "Evidence of chills / rigor or shivering.",
   "sl": "Prisotnost mrzlice ali mrazenja"
   }
   },
   {
   "value": "at0.65",
   "label": "Goose- bumps",
   "localizedLabels": {
   "en": "Goose- bumps",
   "sl": "Kurja polt"
   },
   "localizedDescriptions": {
   "en": "Evidence of goose-bumps.",
   "sl": "Prisotnost kurje polti"
   }
   }
   ]
   }
   ],
   "formId": "vitals/vitals/body_temperature/any_event/symptoms",
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
   "code": {
   "presentation": "combobox",
   "columns": "4"
   }
   },
   "annotations": {}
   }
   };

   var cmMulti = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescriptionSnippet(desc, {}) as CodedTextFieldModel;
   expect(cmMulti.getRmType()).toBe(RmType.DV_CODED_TEXT);
   expect(cmMulti.isMulti()).toBeTruthy();

   cmMulti.addValue("at0.65");
   expect(cmMulti.codeValue().length).toBe(1);
   expect(cmMulti.codeValue()[0]).toBe("at0.65");
   expect(cmMulti.getValue().length).toBe(1);

   cmMulti.addValue("at0.65");
   expect(cmMulti.codeValue().length).toBe(1);
   expect(cmMulti.codeValue()[0]).toBe("at0.65");
   expect(cmMulti.getValue().length).toBe(1);

   cmMulti.addValue("at0.65");
   expect(cmMulti.codeValue().length).toBe(1);
   expect(cmMulti.codeValue()[0]).toBe("at0.65");
   expect(cmMulti.getValue().length).toBe(1);

   cmMulti.addValue("at0.64");
   expect(cmMulti.codeValue().length).toBe(2);
   expect(cmMulti.codeValue()[0]).toBe("at0.65");
   expect(cmMulti.codeValue()[1]).toBe("at0.64");
   expect(cmMulti.getValue().length).toBe(2);

   cmMulti.removeValue("at0.65");
   expect(cmMulti.codeValue().length).toBe(1);
   expect(cmMulti.getValue().length).toBe(1);

   cmMulti.removeValue("at0.64");
   expect(cmMulti.codeValue().length).toBe(0);
   expect(cmMulti.getValue().length).toBe(0);

   cmMulti.removeValue("at0.64");
   expect(cmMulti.codeValue().length).toBe(0);
   expect(cmMulti.getValue().length).toBe(0);
   });

});


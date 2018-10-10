import {Ast} from "../ast/Ast";
import {AstField} from "../ast/AstField";
import {AstCondition} from "../ast/AstCondition";
import {AstNumericLiteral} from "../ast/literal/AstNumericLiteral";
import {AstStringLiteral} from "../ast/literal/AstStringLiteral";
import {AstQuantityLiteral} from "../ast/literal/AstQuantityLiteral";
import {AstFunctionExpression} from "../ast/expression/AstFunctionExpression";
import {AstBinaryQuantityExpression} from "../ast/expression/AstBinaryQuantityExpression";
import {AstActionsStatement} from "../ast/statement/AstActionsStatement";
import {AstActionStatement} from "../ast/statement/AstActionStatement";
import {AstHideAction} from "../ast/action/AstHideAction";
import {QuantityFieldModel} from "../model/fieldModel/QuantityFieldModel";
import {AstShowAction} from "../ast/action/AstShowAction";
import {AstUnaryQuantityExpression} from "../ast/expression/AstUnaryQuantityExpression";
import {RmContainerModel} from "../model/RmContainerModel";
import {ThinkEhrUtil} from "../ThinkEhrUtil";
import {ThinkEhrModelParser} from "./ThinkEhrModelParser";
import {AstDurationLiteral} from "../ast/literal/AstDurationLiteral";
import {CodedTextFieldModel} from "../model/fieldModel/CodedTextFieldModel";
import {ThinkEhrDependencyParser} from "./ThinkEhrDependencyParser";
import {RmType} from "../RmType";
import {FormObjectModel} from "../model/FormObjectModel";
import {TextFieldModel} from "../model/fieldModel/TextFieldModel";
import {FormRootModel} from "../model/FormRootModel";
import {ProportionFieldModel} from "../model/fieldModel/ProportionFieldModel";
import {CountFieldModel} from "../model/fieldModel/CountFieldModel";
import {BooleanFieldModel} from "../model/BooleanFieldModel";
import {DateFieldModel} from "../model/fieldModel/DateFieldModel";
import {TimeFieldModel} from "../model/fieldModel/TimeFieldModel";
import {DateTimeFieldModel} from "../model/fieldModel/DateTimeFieldModel";
import {EhrUriFieldModel} from "../model/fieldModel/EhrUriFieldModel";
import {DurationFieldModel} from "../model/fieldModel/DurationFieldModel";
import {OrdinalFieldModel} from "../model/fieldModel/OrdinalFieldModel";
import {UriFieldModel} from "../model/fieldModel/UriFieldModel";

describe("Ehr Form Dependency Support Test", function () {

  var vsDesc:any = {
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
    "templateLanguages": [
      "en",
      "sl"
    ],
    "children": [
      {
        "name": "Symptoms",
        "localizedName": "Symptoms",
        "rmType": "DV_CODED_TEXT",
        "nodeId": "at0.63",
        "min": 0,
        "max": 2,
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
        "formId": "vitals/vitals/body_temperature/any_event/symptoms"
      },
      {
        "name": "Temperature",
        "localizedName": "Temperature",
        "rmType": "DV_QUANTITY",
        "nodeId": "at0004",
        "min": 0,
        "max": 1,
        "localizedNames": {
          "en": "Temperature",
          "sl": "Telesna temperatura"
        },
        "localizedDescriptions": {
          "en": "The measured body temperature (as a surrogate for the whole body)",
          "sl": "Izmerjena telesna temperatura za celotno telo"
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
                    "minOp": ">=",
                    "min": 1,
                    "maxOp": "<=",
                    "max": 1
                  }
                }
              },
              {
                "value": "°F",
                "label": "°F",
                "validation": {
                  "precision": {
                    "minOp": ">=",
                    "min": 1,
                    "maxOp": "<=",
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
            "magnitude": {
              "presentation": "combobox"
            }
          }
        }
      }
    ]
  };

  var vsContDesc:any= {
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
    "templateLanguages": [
      "en",
      "sl"
    ],
    "children": [
      {
        "name": "Body temperature",
        "localizedName": "Body temperature",
        "rmType": "OBSERVATION",
        "nodeId": "openEHR-EHR-OBSERVATION.body_temperature-zn.v1",
        "min": "0",
        "max": "100",
        "localizedNames": {
          "en": "Body temperature",
          "sl": "Telesna temperatura"
        },
        "localizedDescriptions": {
          "en": "A measurement of the body temperature, which is a surrogate for the whole body\n                    temperature of the person.\n                ",
          "sl": "Merjenje telesne temperature, ki se lahko nanaša na celotno telo pacieta"
        },
        "aqlPath": "/content[openEHR-EHR-SECTION.ispek_dialog.v1,'Vitals']/items[openEHR-EHR-OBSERVATION.body_temperature-zn.v1]",
        "formId": "vitals/vitals/body_temperature",
        "viewConfig": {
          "advanced": {
            "hidden": false,
            "readonly": false,
            "render": false
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
          "tags": [
            "multi"
          ]
        },
        "children": [
          {
            "name": "Temperature",
            "localizedName": "Temperature",
            "rmType": "DV_QUANTITY",
            "nodeId": "at0004",
            "min": 0,
            "max": 1,
            "localizedNames": {
              "en": "Temperature",
              "sl": "Telesna temperatura"
            },
            "localizedDescriptions": {
              "en": "The measured body temperature (as a surrogate for the whole body)",
              "sl": "Izmerjena telesna temperatura za celotno telo"
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
                        "minOp": ">=",
                        "min": 1,
                        "maxOp": "<=",
                        "max": 1
                      }
                    }
                  },
                  {
                    "value": "°F",
                    "label": "°F",
                    "validation": {
                      "precision": {
                        "minOp": ">=",
                        "min": 1,
                        "maxOp": "<=",
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
                "magnitude": {
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
            "formId": "vitals/vitals/body_temperature/any_event/symptoms"
          }
        ]
      }
    ]
  };

  var tsDesc:any = {
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
    "templateLanguages": [
      "en",
      "sl"
    ],
    "children": [
      {
        "name": "Date",
        "localizedName": "Date",
        "rmType": "DV_DATE",
        "nodeId": "at0013",
        "min": 0,
        "max": 1,
        "localizedNames": {
          "en": "Date",
          "sl": "*Date(en)"
        },
        "localizedDescriptions": {
          "en": "*",
          "sl": "**(en)"
        },
        "aqlPath": "/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0013]/value",
        "inputs": [
          {
            "type": "DATE",
            "defaultValue": "2015-05-19"
          }
        ],
        "formId": "testing_template/context/testing/date"
      },
      {
        "name": "Time",
        "localizedName": "Time",
        "rmType": "DV_TIME",
        "nodeId": "at0014",
        "min": 0,
        "max": 1,
        "localizedNames": {
          "en": "Time",
          "sl": "*Time(en)"
        },
        "localizedDescriptions": {
          "en": "*",
          "sl": "**(en)"
        },
        "aqlPath": "/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0014]/value",
        "inputs": [
          {
            "type": "TIME"
          }
        ],
        "formId": "testing_template/context/testing/time"
      },
      {
        "name": "Date time",
        "localizedName": "Date time",
        "rmType": "DV_DATE_TIME",
        "nodeId": "at0015",
        "min": 0,
        "max": 1,
        "localizedNames": {
          "en": "Date time",
          "sl": "*Date time(en)"
        },
        "localizedDescriptions": {
          "en": "*",
          "sl": "**(en)"
        },
        "aqlPath": "/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0015]/value",
        "inputs": [
          {
            "type": "DATETIME"
          }
        ],
        "formId": "testing_template/context/testing/date_time"
      },
      {
        "name": "Name 1",
        "rmType": "DV_TEXT",
        "nodeId": "at0018",
        "min": 0,
        "max": 1,
        "localizedNames": {
          "en": "Name 1",
          "sl": "*Name 1(en)"
        },
        "localizedDescriptions": {
          "en": "*",
          "sl": "**(en)"
        },
        "aqlPath": "/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0018,'Name 1']/value",
        "inputs": [
          {
            "type": "TEXT"
          }
        ],
        "formId": "testing_template/context/testing/name_1"
      }
    ]
  };

  var vsContTargetDesc:any = {
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
        "name": "Date",
        "localizedName": "Date",
        "rmType": "DV_DATE",
        "nodeId": "at0013",
        "min": 0,
        "max": 1,
        "localizedNames": {
          "en": "Date",
          "sl": "*Date(en)"
        },
        "localizedDescriptions": {
          "en": "*",
          "sl": "**(en)"
        },
        "aqlPath": "/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0013]/value",
        "inputs": [
          {
            "type": "DATE",
            "defaultValue": "2015-05-19"
          }
        ],
        "formId": "testing_template/context/testing/date"
      },
      {
        "name": "Time",
        "localizedName": "Time",
        "rmType": "DV_TIME",
        "nodeId": "at0014",
        "min": 0,
        "max": 1,
        "localizedNames": {
          "en": "Time",
          "sl": "*Time(en)"
        },
        "localizedDescriptions": {
          "en": "*",
          "sl": "**(en)"
        },
        "aqlPath": "/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0014]/value",
        "inputs": [
          {
            "type": "TIME"
          }
        ],
        "formId": "testing_template/context/testing/time"
      },
      {
        "name": "Date time",
        "localizedName": "Date time",
        "rmType": "DV_DATE_TIME",
        "nodeId": "at0015",
        "min": 0,
        "max": 1,
        "localizedNames": {
          "en": "Date time",
          "sl": "*Date time(en)"
        },
        "localizedDescriptions": {
          "en": "*",
          "sl": "**(en)"
        },
        "aqlPath": "/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0015]/value",
        "inputs": [
          {
            "type": "DATETIME"
          }
        ],
        "formId": "testing_template/context/testing/date_time"
      },
      {
        "name": "Name 1",
        "rmType": "DV_TEXT",
        "nodeId": "at0018",
        "min": 0,
        "max": 1,
        "localizedNames": {
          "en": "Name 1",
          "sl": "*Name 1(en)"
        },
        "localizedDescriptions": {
          "en": "*",
          "sl": "**(en)"
        },
        "aqlPath": "/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0018,'Name 1']/value",
        "inputs": [
          {
            "type": "TEXT"
          }
        ],
        "formId": "testing_template/context/testing/name_1"
      },
      {
        "name": "Fixed name",
        "localizedName": "Fixed name",
        "rmType": "CLUSTER",
        "nodeId": "openEHR-EHR-CLUSTER.testing.v1",
        "min": 0,
        "max": 1,
        "localizedNames": {
          "en": "Testing",
          "sl": "Testiranje"
        },
        "localizedDescriptions": {
          "en": "Testing archetype",
          "sl": "*Testing archetype(en)"
        },
        "aqlPath": "/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.testing.v1,'Fixed name']",
        "inputs": [
          {
            "type": "TEXT"
          }
        ],
        "formId": "testing_template/context/fixed_name",
        "children": [
          {
            "name": "Fixed values",
            "localizedName": "Fixed values",
            "rmType": "CLUSTER",
            "nodeId": "at0001",
            "min": 0,
            "max": 1,
            "cardinalities": [
              {
                "min": 5,
                "max": -1,
                "ids": [
                  "fixed_text",
                  "fixed_count",
                  "fixed_ordinal",
                  "fixed_boolean",
                  "fixed_quantity"
                ]
              }
            ],
            "localizedNames": {
              "en": "Fixed values",
              "sl": "Fiksne vrednosti"
            },
            "localizedDescriptions": {
              "en": "*",
              "sl": "**(en)"
            },
            "aqlPath": "/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.testing.v1,'Fixed name']/items[at0001]",
            "formId": "testing_template/context/fixed_name/fixed_values",
            "children": [
              {
                "name": "Fixed Text",
                "localizedName": "Fixed Text",
                "rmType": "DV_CODED_TEXT",
                "nodeId": "at0004",
                "min": 1,
                "max": 1,
                "localizedNames": {
                  "en": "Fixed Text",
                  "sl": "Fiksen tekst"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.testing.v1,'Fixed name']/items[at0001]/items[at0004]/value",
                "inputs": [
                  {
                    "suffix": "code",
                    "type": "CODED_TEXT",
                    "list": [
                      {
                        "value": "at0008",
                        "label": "Fixed value",
                        "localizedLabels": {
                          "en": "Fixed value",
                          "sl": "Fiksna vrednost"
                        },
                        "localizedDescriptions": {
                          "en": "Fixed value",
                          "sl": "*Fixed value(en)"
                        }
                      }
                    ],
                    "defaultValue": "at0008"
                  }
                ],
                "formId": "testing_template/context/fixed_name/fixed_values/fixed_text"
              },
              {
                "name": "Fixed Count",
                "localizedName": "Fixed Count",
                "rmType": "DV_COUNT",
                "nodeId": "at0002",
                "min": 1,
                "max": 1,
                "localizedNames": {
                  "en": "Fixed Count",
                  "sl": "Fiksen count"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.testing.v1,'Fixed name']/items[at0001]/items[at0002]/value",
                "inputs": [
                  {
                    "type": "INTEGER",
                    "validation": {
                      "range": {
                        "minOp": ">=",
                        "min": 1,
                        "maxOp": "<=",
                        "max": 1
                      }
                    },
                    "defaultValue": 1
                  }
                ],
                "formId": "testing_template/context/fixed_name/fixed_values/fixed_count"
              },
              {
                "name": "Fixed Ordinal",
                "localizedName": "Fixed Ordinal",
                "rmType": "DV_ORDINAL",
                "nodeId": "at0005",
                "min": 1,
                "max": 1,
                "localizedNames": {
                  "en": "Fixed Ordinal",
                  "sl": "Fiksen ordinal"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.testing.v1,'Fixed name']/items[at0001]/items[at0005]/value",
                "inputs": [
                  {
                    "type": "CODED_TEXT",
                    "list": [
                      {
                        "value": "at0009",
                        "label": "Fixed ordinal",
                        "localizedLabels": {
                          "en": "Fixed ordinal",
                          "sl": "Fiksen ordinal"
                        },
                        "localizedDescriptions": {
                          "en": "Fixed ordinal",
                          "sl": "*Fixed ordinal(en)"
                        },
                        "ordinal": 1
                      }
                    ],
                    "defaultValue": "at0009"
                  }
                ],
                "formId": "testing_template/context/fixed_name/fixed_values/fixed_ordinal"
              },
              {
                "name": "Fixed Boolean",
                "localizedName": "Fixed Boolean",
                "rmType": "DV_BOOLEAN",
                "nodeId": "at0006",
                "min": 1,
                "max": 1,
                "localizedNames": {
                  "en": "Fixed Boolean",
                  "sl": "Fiksen boolean"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.testing.v1,'Fixed name']/items[at0001]/items[at0006]/value",
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
                "formId": "testing_template/context/fixed_name/fixed_values/fixed_boolean"
              },
              {
                "name": "Fixed Quantity",
                "localizedName": "Fixed Quantity",
                "rmType": "DV_QUANTITY",
                "nodeId": "at0007",
                "min": 1,
                "max": 1,
                "localizedNames": {
                  "en": "Fixed Quantity",
                  "sl": "Fiksen quantity"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.testing.v1,'Fixed name']/items[at0001]/items[at0007]/value",
                "inputs": [
                  {
                    "suffix": "magnitude",
                    "type": "DECIMAL",
                    "validation": {
                      "range": {
                        "minOp": ">=",
                        "min": 50,
                        "maxOp": "<=",
                        "max": 50
                      },
                      "precision": {
                        "minOp": ">=",
                        "min": 1,
                        "maxOp": "<=",
                        "max": 1
                      }
                    }
                  },
                  {
                    "suffix": "unit",
                    "type": "CODED_TEXT",
                    "list": [
                      {
                        "value": "kg",
                        "label": "kg",
                        "validation": {
                          "range": {
                            "minOp": ">=",
                            "min": 50,
                            "maxOp": "<=",
                            "max": 50
                          },
                          "precision": {
                            "minOp": ">=",
                            "min": 1,
                            "maxOp": "<=",
                            "max": 1
                          }
                        }
                      }
                    ],
                    "defaultValue": "kg"
                  }
                ],
                "formId": "testing_template/context/fixed_name/fixed_values/fixed_quantity",
                "viewConfig": {
                  "field": {
                    "magnitude": {
                      "presentation": "combobox"
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "Decimal Percentage",
            "localizedName": "Decimal Percentage",
            "rmType": "DV_PROPORTION",
            "nodeId": "at0052",
            "min": 0,
            "max": 1,
            "localizedNames": {
              "en": "Decimal Percentage",
              "sl": "*Decimal Percentage(en)"
            },
            "localizedDescriptions": {
              "en": "*",
              "sl": "**(en)"
            },
            "aqlPath": "/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.testing.v1,'Fixed name']/items[at0052]/value",
            "inputs": [
              {
                "suffix": "numerator",
                "type": "DECIMAL",
                "validation": {
                  "range": {
                    "minOp": ">=",
                    "min": 0,
                    "maxOp": "<=",
                    "max": 100
                  }
                }
              },
              {
                "suffix": "denominator",
                "type": "DECIMAL",
                "validation": {
                  "range": {
                    "minOp": ">=",
                    "min": 100,
                    "maxOp": "<=",
                    "max": 100
                  }
                }
              }
            ],
            "formId": "testing_template/context/fixed_name/decimal_percentage"
          }
        ]
      },
      {
        "name": "EhrUri",
        "localizedName": "Ehr Uri",
        "rmType": "DV_EHR_URI",
        "nodeId": "at0012",
        "min": "0",
        "max": "1",
        "localizedNames": {
          "en": "Ehr Uri",
          "sl": "*Ehr Uri(en)"
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
        "formId": "test_encounter/testing/testing/ehruri",
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
              "valign": "top",
              "align": "left"
            },
            "field": {
              "valign": "inherit",
              "align": "left"
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

  it("Dependency Model Test - Manual Construction", function () {

    var ast = new Ast();
    var qf = new AstField({field: "vitals/vitals/body_temperature/any_event/temperature"});
    ast.fields(qf);
    var c1 = new AstCondition();
    qf.conditions(c1);
    var ql = new AstQuantityLiteral({
      magnitudeLiteral: new AstNumericLiteral({value: 40}),
      unitLiteral: new AstStringLiteral({value: "°C"})
    });
    var qvFunc = function () {
      return {magnitude: [45], unit: ["°C"]};
    };
    var thinkEhrDependencyParser:ThinkEhrDependencyParser = new ThinkEhrDependencyParser();
    var geFunc = thinkEhrDependencyParser.getDependancyOperatorFunction({op: 'ge'}, RmType.DV_QUANTITY);

    var qe = new AstBinaryQuantityExpression({
      lhsOperand: new AstFunctionExpression({func: qvFunc}),
      rhsOperand: ql, operatorFunc: geFunc
    });
    c1.setExpression(qe);

    var actSts = new AstActionsStatement();
    c1.setThenStatement(actSts);
    var a1 = new AstActionStatement();
    actSts.actions(a1);
    a1.setName("hide");


    ///a1.setTargetId("vitals/vitals/body_temperature/any_event/symptoms");

    var symDesc:any = {
      "name": "Symptoms",
      "localizedName": "Symptoms",
      "rmType": "DV_CODED_TEXT",
      "nodeId": "at0.63",
      "min": 0,
      "max": 2,
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
      "formId": "vitals/vitals/body_temperature/any_event/symptoms"
    };
    var symModel = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescriptionSnippet(symDesc, {});
    expect(symModel instanceof CodedTextFieldModel).toBe(true);

    a1.addTarget(symModel);

    var res = {
      triggered: false
    };
    var triggerFunc = function (target) {
      res.triggered = true;
      expect(target).toBe(symModel);
    };
    a1.setActionFunc(triggerFunc);
    ast.process({});
    expect(res.triggered).toBe(true);

    res.triggered = false;
    expect(res.triggered).toBe(false);
    qe.setLhsOperand(new AstFunctionExpression({
      func: function () {
        return {
          magnitude: 39.3,
          unit: "°C"
        }
      }
    }));
    ast.process({});
    expect(res.triggered).toBeFalsy();

    res.triggered = false;
    expect(res.triggered).toBe(false);
    qe.setLhsOperand(new AstFunctionExpression({
      func: function () {
        return {
          magnitude: 47.3,
          unit: "°F"
        }
      }
    }));
    ast.process({});
    expect(res.triggered).toBeFalsy();

    res.triggered = false;
    expect(res.triggered).toBe(false);
    qe.setLhsOperand(new AstFunctionExpression({
      func: function () {
        return {
          magnitude: [40.0],
          unit: ["°C"]
        }
      }
    }));
    ast.process({});
    expect(res.triggered).toBeTruthy();
  });

  it("Dependency Model Parse Test - Quantity - All Numeric Functions", function () {
    var desc = vsDesc;

    var deps:any = [
      {
        "field": "vitals/vitals/body_temperature/any_event/temperature",
        "conditions": [
          {
            "operator": "ge",
            "value": {
              "magnitude": 40,
              "unit": "°C"
            },
            "actions": [
              {
                "action": "hide",
                "target": "vitals/vitals/body_temperature/any_event/symptoms",
                "value": {
                  "code": ""
                }
              },
              {
                "action": "show",
                "target": "vitals/vitals/body_temperature/any_event/temperature",
                "value": {
                  "magnitude": 40,
                  "unit": "°C"
                }
              }
            ]
          },
          {
            "operator": "lt",
            "value": {
              "magnitude": 20,
              "unit": "°C"
            },
            "actions": [
              {
                "action": "show",
                "target": "vitals/vitals/body_temperature/any_event/temperature",
                "value": {
                  "magnitude": 20,
                  "unit": "°C"
                }
              }
            ]
          }
        ]
      }
    ];



    var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, {});
    var ast = (new ThinkEhrDependencyParser()).parseDependencies(rm, deps);

    expect(ast instanceof Ast).toBeTruthy();
    expect(ast.getRawDesc()).not.toBe(deps);
    expect(ast.fields().length).toBe(1);
    var field = ast.fields()[0];
    expect(field instanceof AstField).toBeTruthy();
    expect(field.getFieldId()).toBe("vitals/vitals/body_temperature/any_event/temperature");
    expect(field.getRawDesc()).toBe(deps[0]);
    expect(field.conditions().length).toBe(2);

    var c1 = field.conditions()[0];
    expect(c1 instanceof AstCondition).toBeTruthy();
    expect(c1.getRawDesc()).toBe(deps[0].conditions[0]);
    var ce:AstBinaryQuantityExpression = c1.getExpression();
    expect(ce instanceof AstBinaryQuantityExpression).toBeTruthy();
    var lhsOp = ce.getLhsOperand();
    expect(lhsOp instanceof AstFunctionExpression).toBeTruthy();
    var lhsEval = lhsOp.evaluate();
    expect(lhsEval.magnitude[0]).toBeUndefined();
    expect(lhsEval.unit[0]).toBeUndefined();
    var rhsOp = ce.getRhsOperand();
    expect(rhsOp instanceof AstQuantityLiteral).toBeTruthy();
    expect(rhsOp.getRawDesc()).toBe(deps[0].conditions[0].value);
    var rhsEval = rhsOp.evaluate();
    expect(rhsEval.magnitude).toBeCloseTo(40.0);
    expect(rhsEval.unit).toBe("°C");
    var ceEval:boolean = ce.evaluate();
    expect(ceEval).toBe(false);
    var thenStatement = c1.getThenStatement();
    expect(thenStatement instanceof AstActionsStatement).toBeTruthy();
    expect(thenStatement.getRawDesc()).toBe(deps[0].conditions[0].actions);
    expect(thenStatement.actions().length).toBe(2);
    var a1 = thenStatement.actions()[0];
    expect(a1 instanceof AstHideAction).toBeTruthy();
    expect(a1.getRawDesc()).toBe(deps[0].conditions[0].actions[0]);
    expect(a1.getName()).toBe("hide");
    expect(a1.getTargets()[0].getPath()).toBe("vitals/vitals/body_temperature/any_event/symptoms");
    ///        expect(a1.getTargetId()).toBe("vitals/vitals/body_temperature/any_event/symptoms");
    var symptomModel = rm.findSuccessorWithPath("vitals/vitals/body_temperature/any_event/symptoms");
    expect(symptomModel instanceof CodedTextFieldModel).toBeTruthy();
    expect(a1.getTargets()[0]).toBe(symptomModel);

    // Evaluate the action directly
    a1.evaluate();
    expect(symptomModel.getViewConfig().isHidden()).toBeTruthy(); // Change happens
    symptomModel.getViewConfig().setHidden(false);
    expect(symptomModel.getViewConfig().isHidden()).toBeFalsy();
    // Now evaluate from condition - ge
    c1.process();
    expect(symptomModel.getViewConfig().isHidden()).toBeFalsy(); // No change happens

    var quantityModel = rm.findSuccessorWithPath("vitals/vitals/body_temperature/any_event/temperature") as QuantityFieldModel;
    expect(quantityModel instanceof QuantityFieldModel).toBeTruthy();

    quantityModel.magnitudeValue(41.1);
    quantityModel.unitValue("°C");
    c1.process();
    expect(symptomModel.getViewConfig().isHidden()).toBeTruthy(); // Change happens

    symptomModel.getViewConfig().setHidden(false);
    expect(symptomModel.getViewConfig().isHidden()).toBeFalsy();
    quantityModel.magnitudeValue(40.0);
    quantityModel.unitValue("°C");
    c1.process();
    expect(symptomModel.getViewConfig().isHidden()).toBeTruthy(); // Change happens

    symptomModel.getViewConfig().setHidden(false);
    expect(symptomModel.getViewConfig().isHidden()).toBeFalsy();
    quantityModel.magnitudeValue(39.9);
    quantityModel.unitValue("°C");
    c1.process();
    expect(symptomModel.getViewConfig().isHidden()).toBeFalsy(); // No change

    // Now just test action firing based on different operators

    // gt
    symptomModel.getViewConfig().setHidden(false);
    expect(symptomModel.getViewConfig().isHidden()).toBeFalsy();

    deps[0].conditions[0].operator = "gt";
    ast = (new ThinkEhrDependencyParser()).parseDependencies(rm, deps);
    var pc = ast.fields()[0].conditions()[0];

    quantityModel.magnitudeValue(40.0);
    pc.process({});
    expect(symptomModel.getViewConfig().isHidden()).toBeFalsy(); // No change

    quantityModel.magnitudeValue(40.01);
    pc.process({});
    expect(symptomModel.getViewConfig().isHidden()).toBeTruthy(); // Change happens

    symptomModel.getViewConfig().setHidden(false);
    expect(symptomModel.getViewConfig().isHidden()).toBeFalsy();
    quantityModel.unitValue("°F");
    pc.process({});
    expect(symptomModel.getViewConfig().isHidden()).toBeFalsy();

    // eq
    symptomModel.getViewConfig().setHidden(false);
    expect(symptomModel.getViewConfig().isHidden()).toBeFalsy();

    deps[0].conditions[0].operator = "eq";
    ast = (new ThinkEhrDependencyParser()).parseDependencies(rm, deps);
    pc = ast.fields()[0].conditions()[0];

    quantityModel.magnitudeValue(40.0);
    quantityModel.unitValue("°C");
    pc.process({});
    expect(symptomModel.getViewConfig().isHidden()).toBeTruthy();

    symptomModel.getViewConfig().setHidden(false);
    expect(symptomModel.getViewConfig().isHidden()).toBeFalsy();
    quantityModel.magnitudeValue(40.01);
    pc.process({});
    expect(symptomModel.getViewConfig().isHidden()).toBeFalsy();

    symptomModel.getViewConfig().setHidden(false);
    expect(symptomModel.getViewConfig().isHidden()).toBeFalsy();
    quantityModel.magnitudeValue(40.0);
    quantityModel.unitValue("°F");
    pc.process({});
    expect(symptomModel.getViewConfig().isHidden()).toBeFalsy();

    // ne
    symptomModel.getViewConfig().setHidden(false);
    expect(symptomModel.getViewConfig().isHidden()).toBeFalsy();

    deps[0].conditions[0].operator = "ne";
    ast = (new ThinkEhrDependencyParser()).parseDependencies(rm, deps);
    pc = ast.fields()[0].conditions()[0];

    quantityModel.magnitudeValue(40.0);
    quantityModel.unitValue("°C");
    pc.process({});
    expect(symptomModel.getViewConfig().isHidden()).toBeFalsy();

    symptomModel.getViewConfig().setHidden(false);
    expect(symptomModel.getViewConfig().isHidden()).toBeFalsy();
    quantityModel.magnitudeValue(40.01);
    pc.process({});
    expect(symptomModel.getViewConfig().isHidden()).toBeTruthy();

    symptomModel.getViewConfig().setHidden(false);
    expect(symptomModel.getViewConfig().isHidden()).toBeFalsy();
    quantityModel.magnitudeValue(40.0);
    quantityModel.unitValue("°F");
    pc.process({});
    expect(symptomModel.getViewConfig().isHidden()).toBeTruthy();

    // a2
    var a2 = thenStatement.actions()[1];
    expect(a2 instanceof AstShowAction).toBeTruthy();
    expect(a2.getRawDesc()).toBe(deps[0].conditions[0].actions[1]);
    expect(a2.getName()).toBe("show");
    expect(a2.getTargets()[0].getPath()).toBe("vitals/vitals/body_temperature/any_event/temperature");
    expect(a2.getTargets()[0]).toBe(quantityModel);

    // c2
    var c2 = field.conditions()[1];
    expect(c2 instanceof AstCondition).toBeTruthy();
    expect(c2.getRawDesc()).toBe(deps[0].conditions[1]);
    ce = c2.getExpression();
    expect(ce instanceof AstBinaryQuantityExpression).toBeTruthy();
    lhsOp = ce.getLhsOperand();
    expect(lhsOp instanceof AstFunctionExpression).toBeTruthy();
    lhsEval = lhsOp.evaluate();
    expect(lhsEval.magnitude[0]).toBeCloseTo(40.0);
    expect(lhsEval.unit[0]).toBe("°F");
    rhsOp = ce.getRhsOperand();
    expect(rhsOp instanceof AstQuantityLiteral).toBeTruthy();
    expect(rhsOp.getRawDesc()).toBe(deps[0].conditions[1].value);
    rhsEval = rhsOp.evaluate();
    expect(rhsEval.magnitude).toBeCloseTo(20.0);
    expect(rhsEval.unit).toBe("°C");
    ceEval = ce.evaluate();
    expect(ceEval).toBe(false);
    thenStatement = c2.getThenStatement();
    expect(thenStatement instanceof AstActionsStatement).toBeTruthy();
    expect(thenStatement.getRawDesc()).toBe(deps[0].conditions[1].actions);
    expect(thenStatement.actions().length).toBe(1);
    a1 = thenStatement.actions()[0];
    expect(a1 instanceof AstShowAction).toBeTruthy();
    expect(a1.getRawDesc()).toBe(deps[0].conditions[1].actions[0]);
    expect(a1.getName()).toBe("show");
    expect(a1.getTargets()[0].getPath()).toBe("vitals/vitals/body_temperature/any_event/temperature");
    expect(a1.getTargets()[0]).toBe(quantityModel);

    // lt
    quantityModel.getViewConfig().setHidden(true);
    expect(quantityModel.getViewConfig().isHidden()).toBeTruthy();
    quantityModel.magnitudeValue(15.8);
    quantityModel.unitValue("°C");
    c2.process({});
    expect(quantityModel.getViewConfig().isHidden()).toBeFalsy();

    quantityModel.getViewConfig().setHidden(true);
    expect(quantityModel.getViewConfig().isHidden()).toBeTruthy();
    quantityModel.unitValue("°F");
    c2.process({});
    expect(quantityModel.getViewConfig().isHidden()).toBeTruthy();

    quantityModel.magnitudeValue(20.0);
    quantityModel.unitValue("°C");
    c2.process({});
    expect(quantityModel.getViewConfig().isHidden()).toBeTruthy();

    quantityModel.magnitudeValue(20.011);
    quantityModel.unitValue("°C");
    c2.process({});
    expect(quantityModel.getViewConfig().isHidden()).toBeTruthy();

    quantityModel.magnitudeValue(19.99);
    quantityModel.unitValue("°C");
    c2.process({});
    expect(quantityModel.getViewConfig().isHidden()).toBeFalsy();
    // lte
    deps[0].conditions[1].operator = "le";
    ast = (new ThinkEhrDependencyParser()).parseDependencies(rm, deps);
    var ce3 = ast.fields()[0].conditions()[1];

    quantityModel.getViewConfig().setHidden(true);
    expect(quantityModel.getViewConfig().isHidden()).toBeTruthy();
    quantityModel.magnitudeValue(18.845);
    quantityModel.unitValue("°C");
    ce3.process({});
    expect(quantityModel.getViewConfig().isHidden()).toBeFalsy();

    quantityModel.getViewConfig().setHidden(true);
    expect(quantityModel.getViewConfig().isHidden()).toBeTruthy();
    quantityModel.unitValue("°F");
    ce3.process({});
    expect(quantityModel.getViewConfig().isHidden()).toBeTruthy();

    quantityModel.magnitudeValue(20.0);
    quantityModel.unitValue("°C");
    ce3.process({});
    expect(quantityModel.getViewConfig().isHidden()).toBeFalsy();

    quantityModel.getViewConfig().setHidden(true);
    expect(quantityModel.getViewConfig().isHidden()).toBeTruthy();
    quantityModel.magnitudeValue(20.011);
    quantityModel.unitValue("°C");
    ce3.process({});
    expect(quantityModel.getViewConfig().isHidden()).toBeTruthy();

    quantityModel.magnitudeValue(19.99);
    quantityModel.unitValue("°C");
    c2.process({});
    expect(quantityModel.getViewConfig().isHidden()).toBeFalsy();
  });

    it("Dependency Model - Quantity - Unary Expression empty", function () {
      var desc = vsDesc;

      var deps = [
        {
          "field": "vitals/vitals/body_temperature/any_event/temperature",
          "conditions": [
            {
              "operator": "empty",
              "value": null,
              "actions": [
                {
                  "action": "hide",
                  "target": "vitals/vitals/body_temperature/any_event/symptoms",
                  "value": {
                    "code": ""
                  }
                }
              ]
            }
          ]
        }
      ];

      var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, {});
      var ast = (new ThinkEhrDependencyParser()).parseDependencies(rm, deps);

      expect(ast instanceof Ast).toBeTruthy();
      expect(ast.getRawDesc()).not.toBe(deps);
      expect(ast.fields().length).toBe(1);
      var field = ast.fields()[0];
      expect(field instanceof AstField).toBeTruthy();
      expect(field.getFieldId()).toBe("vitals/vitals/body_temperature/any_event/temperature");
      expect(field.getRawDesc()).toBe(deps[0]);
      expect(field.conditions().length).toBe(1);

      var cond = field.conditions()[0];
      expect(cond instanceof AstCondition).toBeTruthy();
      expect(cond.getRawDesc()).toBe(deps[0].conditions[0]);
      var ce = cond.getExpression();
      expect(ce instanceof AstUnaryQuantityExpression).toBeTruthy();
      var lhsOp = ce.getLhsOperand();
      expect(lhsOp instanceof AstFunctionExpression).toBeTruthy();
      var lhsEval = lhsOp.evaluate();
      expect(lhsEval.magnitude[0]).toBeUndefined();
      expect(lhsEval.unit[0]).toBeUndefined();
      expect(ce.getRhsOperand).toBeUndefined();
      expect(ce.operatorDef.op).toBe("empty");
      expect(ce.evaluate()).toBeTruthy();
      ast.process({});
      var symptomModel = rm.findSuccessorWithPath("vitals/vitals/body_temperature/any_event/symptoms");
      expect(symptomModel.getViewConfig().isHidden()).toBeTruthy();

      var quantityModel = rm.findSuccessorWithPath("vitals/vitals/body_temperature/any_event/temperature") as QuantityFieldModel;

      symptomModel.getViewConfig().setHidden(false);
      quantityModel.magnitudeValue(34.4);
      ast.process({});
      expect(symptomModel.getViewConfig().isHidden()).toBeTruthy();

      symptomModel.getViewConfig().setHidden(false);
      quantityModel.unitValue("°C");
      ast.process({});
      expect(symptomModel.getViewConfig().isHidden()).toBeFalsy();

      quantityModel.unitValue(null);
      ast.process({});
      expect(symptomModel.getViewConfig().isHidden()).toBeTruthy();
    });

    it("Dependency Node Test", function () {
      var desc:any = vsDesc;

      var deps:any = [
        {
          "field": "vitals/vitals/body_temperature/any_event/temperature",
          "conditions": [
            {
              "operator": "ge",
              "value": {
                "magnitude": 40,
                "unit": "°C"
              },
              "actions": [
                {
                  "action": "hide",
                  "target": "vitals/vitals/body_temperature/any_event/symptoms",
                  "value": {
                    "code": ""
                  }
                },
                {
                  "action": "show",
                  "target": "vitals/vitals/body_temperature/any_event/temperature",
                  "value": {
                    "magnitude": 40,
                    "unit": "°C"
                  }
                }
              ]
            },
            {
              "operator": "lt",
              "value": {
                "magnitude": 20,
                "unit": "°C"
              },
              "actions": [
                {
                  "action": "show",
                  "target": "vitals/vitals/body_temperature/any_event/temperature",
                  "value": {
                    "magnitude": 20,
                    "unit": "°C"
                  }
                }
              ]
            }
          ]
        }
      ];

      var rm:FormRootModel = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, {}, deps) as FormRootModel;
      var ast = rm.getDependencyNode();
      expect(ast instanceof Ast).toBeTruthy();
      expect(ast.getRawDesc()).not.toBe(deps);

      var sm = rm.getChildModel(0) as CodedTextFieldModel;
      expect(sm instanceof CodedTextFieldModel).toBeTruthy();
      var f1 = sm.getDependencyNode();
      expect(f1).toBeUndefined();

      var qm = rm.getChildModel(1) as QuantityFieldModel;
      expect(qm instanceof QuantityFieldModel);
      var f2 = qm.getDependencyNode();
      expect(f2).toBe(ast.fields()[0]);
      expect(f2.getFieldId()).toBe(qm.getFormId());
    });

    it("Dependency - Field Duplication Test", function () {

      var desc:any = vsContDesc;

      var deps:any = [
        {
          "field": "vitals/vitals/body_temperature/any_event/temperature",
          "conditions": [
            {
              "operator": "ge",
              "value": {
                "magnitude": 40,
                "unit": "°C"
              },
              "actions": [
                {
                  "action": "hide",
                  "target": "vitals/vitals/body_temperature/any_event/symptoms",
                  "value": {
                    "code": ""
                  }
                }
              ]
            }
          ]
        }
      ];


      var values = {};
      var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, values, deps);
      var ast = rm.getDependencyNode();
      expect(ast instanceof Ast).toBeTruthy();

      var qm1 = rm.findSuccessorWithPath("vitals/vitals/body_temperature/any_event/temperature");
      expect(qm1 instanceof QuantityFieldModel).toBeTruthy();

      var sm1 = rm.findSuccessorWithPath("vitals/vitals/body_temperature/any_event/symptoms");
      expect(sm1 instanceof CodedTextFieldModel).toBeTruthy();
      expect(sm1.getViewConfig().isHidden()).toBeFalsy();
      expect(qm1.getDependencyNode().conditions()[0].getThenStatement().actions()[0].targets[0]).toBe(sm1);

      var cm1 = rm.findChildWithPath("vitals/vitals/body_temperature") as RmContainerModel;
      expect(cm1 instanceof RmContainerModel);

      var cm2 = (new ThinkEhrModelParser(rmTypeModelDictionary) ).duplicateModel(cm1, cm1);
      expect(cm2 instanceof RmContainerModel);
      expect(cm2 != cm1).toBeTruthy();

      var qm2 = cm2.findSuccessorWithPath("vitals/vitals/body_temperature/any_event/temperature") as QuantityFieldModel;
      expect(qm2 instanceof QuantityFieldModel).toBeTruthy();
      var dn2 = qm2.getDependencyNode();
      expect(dn2 instanceof AstField).toBeTruthy();
      expect(dn2 === qm1.getDependencyNode()).toBeFalsy();

      var sm2 = cm2.findSuccessorWithPath("vitals/vitals/body_temperature/any_event/symptoms");
      expect(sm2 instanceof CodedTextFieldModel).toBeTruthy();
      expect(sm2.getViewConfig().isHidden()).toBeFalsy();
      expect(dn2.conditions()[0].getThenStatement().actions()[0].targets[0]).toBe(sm2);

      qm2.magnitudeValue(41);
      qm2.unitValue("°C");

      ast.process({});
      expect(sm2.getViewConfig().isHidden()).toBeTruthy();
      expect(sm1.getViewConfig().isHidden()).toBeFalsy();

    });

    it("Dependency - Duplicated Containers From Values Test", function () {

      var desc:any = vsContDesc;

      var deps:any = [
        {
          "field": "vitals/vitals/body_temperature/any_event/temperature",
          "conditions": [
            {
              "operator": "ge",
              "value": {
                "magnitude": 40,
                "unit": "°C"
              },
              "actions": [
                {
                  "action": "hide",
                  "target": "vitals/vitals/body_temperature/any_event/symptoms",
                  "value": {
                    "code": ""
                  }
                }
              ]
            }
          ]
        }
      ];


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
                          "|magnitude": 40,
                          "|unit": "°C"
                        }
                      ],
                      "symptoms": [
                        {
                          "|code": "at0.64",
                          "|value": "Mrazenje/mrzlica"
                        }
                      ]
                    }
                  ]
                },
                {
                  "any_event": [
                    {
                      "temperature": [
                        {
                          "|magnitude": 29,
                          "|unit": "°C"
                        }
                      ],
                      "symptoms": []
                    }
                  ]
                },
                {
                  "any_event": [
                    {
                      "temperature": [],
                      "symptoms": []
                    }
                  ]
                }
              ]
            }
          ]
        }
      };

      var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, values, deps);
      var ast = rm.getDependencyNode();
      expect(ast instanceof Ast).toBeTruthy();
      ast.process({});

      var qm = rm.findSuccessorsWithPath("vitals/vitals/body_temperature/any_event/temperature");
      expect(ThinkEhrUtil.isArray(qm)).toBeTruthy();
      expect(qm.length).toBe(3);
      var qm1 = qm[0];
      expect(qm1.getDependencyNode()).toBeTruthy();

      var sm = rm.findSuccessorsWithPath("vitals/vitals/body_temperature/any_event/symptoms");
      expect(sm.length).toBe(3);
      expect(qm1.getDependencyNode().conditions()[0].getThenStatement().actions()[0].targets[0]).toBe(sm[0]);
      expect(sm[0].getViewConfig().isHidden()).toBeTruthy();

      var qm2 = qm[1];
      expect(qm2.getDependencyNode()).toBeTruthy();
      expect(qm2.getDependencyNode().conditions()[0].getThenStatement().actions()[0].targets[0]).toBe(sm[1]);
      expect(sm[1].getViewConfig().isHidden()).toBeFalsy();

      var qm3 = qm[2];
      expect(qm3.getDependencyNode()).toBeTruthy();
      expect(qm3.getDependencyNode().conditions()[0].getThenStatement().actions()[0].targets[0]).toBe(sm[2]);
      expect(sm[2].getViewConfig().isHidden()).toBeFalsy();
    });

    it("Dependency - Coded Text - Empty and Not Empty", function () {

      var desc:any = vsContDesc;

      var deps:any = [
        {
          "field": "vitals/vitals/body_temperature/any_event/symptoms",
          "conditions": [
            {
              "operator": "notempty",
              "value": null,
              "actions": [
                {
                  "action": "hide",
                  "target": "vitals/vitals/body_temperature/any_event/temperature",
                  "value": {
                    "unit": ""
                  }
                }
              ]
            },
            {
              "operator": "empty",
              "value": null,
              "actions": [
                {
                  "action": "show",
                  "target": "vitals/vitals/body_temperature/any_event/temperature",
                  "value": {
                    "unit": ""
                  }
                }
              ]
            }
          ]
        }
      ];


      var values:any = {};

      var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, values, deps);
      var ast = rm.getDependencyNode();
      expect(ast instanceof Ast).toBeTruthy();
      ast.process({});

      var qm = rm.findSuccessorWithPath("vitals/vitals/body_temperature/any_event/temperature");
      expect(qm.getDependencyNode()).toBeFalsy();
      expect(qm.getViewConfig().isHidden()).toBeFalsy();

      var sm = rm.findSuccessorWithPath("vitals/vitals/body_temperature/any_event/symptoms") as CodedTextFieldModel;
      expect(sm.getDependencyNode()).toBeTruthy();

      sm.codeValue("at0.64");
      ast.process({});
      expect(qm.getViewConfig().isHidden()).toBeTruthy();

      sm.codeValue(null);
      ast.process({});
      expect(qm.getViewConfig().isHidden()).toBeFalsy();

    });

    it("Dependency - Coded Text - Equals and Not Equals", function () {

      var desc:any = vsContDesc;

      var deps:any = [
        {
          "field": "vitals/vitals/body_temperature/any_event/symptoms",
          "conditions": [
            {
              "operator": "equals",
              "value": {
                "code": "at0.64"
              },
              "actions": [
                {
                  "action": "hide",
                  "target": "vitals/vitals/body_temperature/any_event/temperature",
                  "value": {
                    "unit": ""
                  }
                }
              ]
            },
            {
              "operator": "notequals",
              "value": {
                "code": "at0.64"
              },
              "actions": [
                {
                  "action": "show",
                  "target": "vitals/vitals/body_temperature/any_event/temperature",
                  "value": {
                    "unit": ""
                  }
                }
              ]
            }
          ]}
      ];

      var values = {};

      var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, values, deps);
      var ast = rm.getDependencyNode();
      expect(ast instanceof Ast).toBeTruthy();
      ast.process({});

      var qm = rm.findSuccessorWithPath("vitals/vitals/body_temperature/any_event/temperature");
      expect(qm.getDependencyNode()).toBeFalsy();
      expect(qm.getViewConfig().isHidden()).toBeFalsy();

      var sm = rm.findSuccessorWithPath("vitals/vitals/body_temperature/any_event/symptoms") as CodedTextFieldModel;
      expect(sm.getDependencyNode()).toBeTruthy();

      sm.codeValue("at0.64");
      ast.process({});
      expect(qm.getViewConfig().isHidden()).toBeTruthy();

      sm.codeValue("at0.65");
      ast.process({});
      expect(qm.getViewConfig().isHidden()).toBeFalsy();

      sm.codeValue(null);
      ast.process({});
      expect(qm.getViewConfig().isHidden()).toBeFalsy();

    });

    it("Dependency - Coded Text - Starts With, Ends With, Contains", function () {

      var desc:any = vsContDesc;

      var deps:any = [
        {
          "field": "vitals/vitals/body_temperature/any_event/symptoms",
          "conditions": [
            {
              "operator": "startswith",
              "value": {
                "value": "Goose"
              },
              "actions": [
                {
                  "action": "hide",
                  "target": "vitals/vitals/body_temperature/any_event/temperature",
                  "value": ""
                }
              ]
            },
            {
              "operator": "contains",
              "value": {
                "value": "rigo"
              },
              "actions": [
                {
                  "action": "show",
                  "target": "vitals/vitals/body_temperature/any_event/temperature",
                  "value": ""
                }
              ]
            },
            {
              "operator": "endswith",
              "value": {
                "value": "umps"
              },
              "actions": [
                {
                  "action": "disable",
                  "target": "vitals/vitals/body_temperature/any_event/temperature",
                  "value": ""
                }
              ]
            }
          ]
        }
      ];

      var values = {};

      var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, values, deps);
      var ast = rm.getDependencyNode();
      expect(ast instanceof Ast).toBeTruthy();
      ast.process({});

      var qm = rm.findSuccessorWithPath("vitals/vitals/body_temperature/any_event/temperature");
      expect(qm.getDependencyNode()).toBeFalsy();
      expect(qm.getViewConfig().isHidden()).toBeFalsy();
      expect(qm.getViewConfig().isReadOnly()).toBeFalsy();

      var sm = rm.findSuccessorWithPath("vitals/vitals/body_temperature/any_event/symptoms") as CodedTextFieldModel;
      expect(sm.getDependencyNode()).toBeTruthy();

      sm.codeValue("at0.64");
      ast.process({});
      expect(qm.getViewConfig().isHidden()).toBeFalsy();

      sm.codeValue("at0.65");
      ast.process({});
      expect(qm.getViewConfig().isHidden()).toBeTruthy();
      expect(qm.getViewConfig().isReadOnly()).toBeTruthy();

      sm.codeValue(null);
      ast.process({});
      expect(qm.getViewConfig().isHidden()).toBeTruthy();
      expect(qm.getViewConfig().isReadOnly()).toBeTruthy();

      sm.codeValue("at0.64");
      ast.process({});
      expect(qm.getViewConfig().isHidden()).toBeFalsy();
      expect(qm.getViewConfig().isReadOnly()).toBeTruthy();

    });

    it("Dependency - Ordinal - Ends With", function () {

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
        "templateLanguages": [
          "en",
          "sl"
        ],
        "children": [
          {
            "name": "Body temperature",
            "localizedName": "Body temperature",
            "rmType": "OBSERVATION",
            "nodeId": "openEHR-EHR-OBSERVATION.body_temperature-zn.v1",
            "min": "0",
            "max": "100",
            "localizedNames": {
              "en": "Body temperature",
              "sl": "Telesna temperatura"
            },
            "localizedDescriptions": {
              "en": "A measurement of the body temperature, which is a surrogate for the whole body\n                    temperature of the person.\n                ",
              "sl": "Merjenje telesne temperature, ki se lahko nanaša na celotno telo pacieta"
            },
            "aqlPath": "/content[openEHR-EHR-SECTION.ispek_dialog.v1,'Vitals']/items[openEHR-EHR-OBSERVATION.body_temperature-zn.v1]",
            "formId": "vitals/vitals/body_temperature",
            "viewConfig": {
              "advanced": {
                "hidden": false,
                "readonly": false,
                "render": false
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
              "tags": [
                "multi"
              ]
            },
            "children": [
              {
                "name": "Temperature",
                "localizedName": "Temperature",
                "rmType": "DV_QUANTITY",
                "nodeId": "at0004",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "Temperature",
                  "sl": "Telesna temperatura"
                },
                "localizedDescriptions": {
                  "en": "The measured body temperature (as a surrogate for the whole body)",
                  "sl": "Izmerjena telesna temperatura za celotno telo"
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
                            "minOp": ">=",
                            "min": 1,
                            "maxOp": "<=",
                            "max": 1
                          }
                        }
                      },
                      {
                        "value": "°F",
                        "label": "°F",
                        "validation": {
                          "precision": {
                            "minOp": ">=",
                            "min": 1,
                            "maxOp": "<=",
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
                    "magnitude": {
                      "presentation": "combobox"
                    }
                  }
                }
              },
              {
                "name": "Symptoms",
                "localizedName": "Symptoms",
                "rmType": "DV_ORDINAL",
                "nodeId": "at0.63",
                "min": 0,
                "max": 2,
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
                        },
                        "ordinal": 1
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
                        },
                        "ordinal": 2
                      }
                    ]
                  }
                ],
                "formId": "vitals/vitals/body_temperature/any_event/symptoms",
                "viewConfig": {
                  "field": {
                    "code": {
                      "presentation": "radios",
                      "columns": "2"
                    }
                  }
                }
              }
            ]
          }
        ]
      };

      var deps:any = [
        {
          "field": "vitals/vitals/body_temperature/any_event/symptoms",
          "conditions": [
            {
              "operator": "endswith",
              "value": {
                "value": "bumps"
              },
              "actions": [
                {
                  "action": "disable",
                  "target": "vitals/vitals/body_temperature/any_event/temperature",
                  "value": ""
                }
              ]
            },
            {
              "operator": "endswith",
              "value": {
                "value": "shivering"
              },
              "actions": [
                {
                  "action": "enable",
                  "target": "vitals/vitals/body_temperature/any_event/temperature",
                  "value": ""
                }
              ]
            }
          ]
        }
      ];

      var values = {};

      var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, values, deps);
      var ast = rm.getDependencyNode();
      expect(ast instanceof Ast).toBeTruthy();
      ast.process({});

      var qm = rm.findSuccessorWithPath("vitals/vitals/body_temperature/any_event/temperature");
      expect(qm.getDependencyNode()).toBeFalsy();
      expect(qm.getViewConfig().isReadOnly()).toBeFalsy();

      var sm = rm.findSuccessorWithPath("vitals/vitals/body_temperature/any_event/symptoms") as CodedTextFieldModel;
      expect(sm.getDependencyNode()).toBeTruthy();

      sm.codeValue("at0.64");
      ast.process({});
      expect(qm.getViewConfig().isReadOnly()).toBeFalsy();

      sm.codeValue("at0.65");
      ast.process({});
      expect(qm.getViewConfig().isReadOnly()).toBeTruthy();

      sm.codeValue(null);
      ast.process({});
      expect(qm.getViewConfig().isReadOnly()).toBeTruthy();

      sm.codeValue("at0.64");
      ast.process({});
      expect(qm.getViewConfig().isReadOnly()).toBeFalsy();

    });

    it("Dependency - Coded Text - List Open", function () {

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
        "templateLanguages": [
          "en",
          "sl"
        ],
        "children": [
          {
            "name": "Body temperature",
            "localizedName": "Body temperature",
            "rmType": "OBSERVATION",
            "nodeId": "openEHR-EHR-OBSERVATION.body_temperature-zn.v1",
            "min": "0",
            "max": "100",
            "localizedNames": {
              "en": "Body temperature",
              "sl": "Telesna temperatura"
            },
            "localizedDescriptions": {
              "en": "A measurement of the body temperature, which is a surrogate for the whole body\n                    temperature of the person.\n                ",
              "sl": "Merjenje telesne temperature, ki se lahko nanaša na celotno telo pacieta"
            },
            "aqlPath": "/content[openEHR-EHR-SECTION.ispek_dialog.v1,'Vitals']/items[openEHR-EHR-OBSERVATION.body_temperature-zn.v1]",
            "formId": "vitals/vitals/body_temperature",
            "viewConfig": {
              "advanced": {
                "hidden": false,
                "readonly": false,
                "render": false
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
              "tags": [
                "multi"
              ]
            },
            "children": [
              {
                "name": "Temperature",
                "localizedName": "Temperature",
                "rmType": "DV_QUANTITY",
                "nodeId": "at0004",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "Temperature",
                  "sl": "Telesna temperatura"
                },
                "localizedDescriptions": {
                  "en": "The measured body temperature (as a surrogate for the whole body)",
                  "sl": "Izmerjena telesna temperatura za celotno telo"
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
                            "minOp": ">=",
                            "min": 1,
                            "maxOp": "<=",
                            "max": 1
                          }
                        }
                      },
                      {
                        "value": "°F",
                        "label": "°F",
                        "validation": {
                          "precision": {
                            "minOp": ">=",
                            "min": 1,
                            "maxOp": "<=",
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
                    "magnitude": {
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
                    ],
                    "listOpen": true
                  }
                ],
                "formId": "vitals/vitals/body_temperature/any_event/symptoms",
                "viewConfig": {
                  "field": {
                    "code": {
                      "presentation": "combobox",
                      "columns": "2"
                    }
                  }
                }
              }
            ]
          }
        ]
      };

      var deps:any = [
        {
          "field": "vitals/vitals/body_temperature/any_event/symptoms",
          "conditions": [
            {
              "operator": "endswith",
              "value": {
                "value": "hurricane"
              },
              "actions": [
                {
                  "action": "disable",
                  "target": "vitals/vitals/body_temperature/any_event/temperature",
                  "value": ""
                }
              ]
            },
            {
              "operator": "startswith",
              "value": {
                "value": "Partner"
              },
              "actions": [
                {
                  "action": "enable",
                  "target": "vitals/vitals/body_temperature/any_event/temperature",
                  "value": ""
                }
              ]
            }
          ]
        }
      ];

      var values = {};

      var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, values, deps);
      var ast = rm.getDependencyNode();
      expect(ast instanceof Ast).toBeTruthy();
      ast.process({});

      var qm = rm.findSuccessorWithPath("vitals/vitals/body_temperature/any_event/temperature");
      expect(qm.getDependencyNode()).toBeFalsy();
      expect(qm.getViewConfig().isReadOnly()).toBeFalsy();

      var sm = rm.findSuccessorWithPath("vitals/vitals/body_temperature/any_event/symptoms") as CodedTextFieldModel;
      expect(sm.getDependencyNode()).toBeTruthy();

      sm.codeValue("at0.64");
      ast.process({});
      expect(qm.getViewConfig().isReadOnly()).toBeFalsy();

      sm.codeValue("at0.65");
      ast.process({});
      expect(qm.getViewConfig().isReadOnly()).toBeFalsy();

      sm.codeValue(null);
      ast.process({});
      expect(qm.getViewConfig().isReadOnly()).toBeFalsy();

      sm.codeValue("at0.64");
      ast.process({});
      expect(qm.getViewConfig().isReadOnly()).toBeFalsy();

      sm.otherValue("His name is the hurricane");
      ast.process({});
      expect(qm.getViewConfig().isReadOnly()).toBeTruthy();

      sm.otherValue("Random text something");
      ast.process({});
      expect(qm.getViewConfig().isReadOnly()).toBeTruthy();

      sm.otherValue("Partner is who he is.");
      ast.process({});
      expect(qm.getViewConfig().isReadOnly()).toBeFalsy();

    });

    it("Dependency - DV_Text - Contains, Not Empty, Equals, Ends With - Enable, Disable", function () {

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
        "templateLanguages": [
          "en",
          "sl"
        ],
        "children": [
          {
            "name": "Body temperature",
            "localizedName": "Body temperature",
            "rmType": "OBSERVATION",
            "nodeId": "openEHR-EHR-OBSERVATION.body_temperature-zn.v1",
            "min": 0,
            "max": -1,
            "localizedNames": {
              "en": "Body temperature",
              "sl": "Telesna temperatura"
            },
            "localizedDescriptions": {
              "en": "A measurement of the body temperature, which is a surrogate for the whole body\n                    temperature of the person.\n                ",
              "sl": "Merjenje telesne temperature, ki se lahko nanaša na celotno telo pacieta"
            },
            "aqlPath": "/content[openEHR-EHR-SECTION.ispek_dialog.v1,'Vitals']/items[openEHR-EHR-OBSERVATION.body_temperature-zn.v1]",
            "formId": "vitals/vitals/body_temperature",
            "children": [
              {
                "name": "Any event",
                "localizedName": "Any event",
                "rmType": "EVENT",
                "nodeId": "at0003",
                "min": 0,
                "max": -1,
                "localizedNames": {
                  "en": "Any event",
                  "sl": "*Any event(en)"
                },
                "localizedDescriptions": {
                  "en": "Any event",
                  "sl": "*Any event(en)"
                },
                "aqlPath": "/content[openEHR-EHR-SECTION.ispek_dialog.v1,'Vitals']/items[openEHR-EHR-OBSERVATION.body_temperature-zn.v1]/data[at0002]/events[at0003]",
                "formId": "vitals/vitals/body_temperature/any_event",
                "children": [
                  {
                    "name": "Temperature",
                    "localizedName": "Temperature",
                    "rmType": "DV_QUANTITY",
                    "nodeId": "at0004",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {
                      "en": "Temperature",
                      "sl": "Telesna temperatura"
                    },
                    "localizedDescriptions": {
                      "en": "The measured body temperature (as a surrogate for the whole body)",
                      "sl": "Izmerjena telesna temperatura za celotno telo"
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
                                "minOp": ">=",
                                "min": 1,
                                "maxOp": "<=",
                                "max": 1
                              }
                            }
                          },
                          {
                            "value": "°F",
                            "label": "°F",
                            "validation": {
                              "precision": {
                                "minOp": ">=",
                                "min": 1,
                                "maxOp": "<=",
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
                        "magnitude": {
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
                    "formId": "vitals/vitals/body_temperature/any_event/symptoms"
                  },
                  {
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
                      "en": "Description of thermal stress",
                      "sl": "Opis"
                    },
                    "localizedDescriptions": {
                      "en": "Description of the conditions applied to the subject that might influence their\n                    measured body temperature.\n                ",
                      "sl": "Opis pogojev/stanja, ki lahko vplivajo na telesno temperaturo pacienta"
                    },
                    "aqlPath": "/content[openEHR-EHR-SECTION.ispek_dialog.v1,'Vitals']/items[openEHR-EHR-OBSERVATION.body_temperature-zn.v1]/data[at0002]/events[at0003]/state[at0029]/items[at0041]/value",
                    "inputs": [
                      {
                        "type": "TEXT"
                      }
                    ],
                    "formId": "vitals/vitals/body_temperature/any_event/description_of_thermal_stress"
                  }
                ]
              }
            ]
          }
        ]
      };

      var deps:any = [
        {
          "field": "vitals/vitals/body_temperature/any_event/description_of_thermal_stress",
          "conditions": [
            {
              "operator": "contains",
              "value": {
                "value": "hix"
              },
              "actions": [
                {
                  "action": "disable",
                  "target": "vitals/vitals/body_temperature/any_event/temperature",
                  "value": {
                    "unit": ""
                  }
                }
              ]
            },
            {
              "operator": "notempty",
              "value": null,
              "actions": [
                {
                  "action": "disable",
                  "target": "vitals/vitals/body_temperature/any_event/symptoms",
                  "value": {
                    "code": ""
                  }
                }
              ]
            },
            {
              "operator": "equals",
              "value": {
                "value": "This is some long description."
              },
              "actions": [
                {
                  "action": "enable",
                  "target": "vitals/vitals/body_temperature/any_event/temperature",
                  "value": {
                    "unit": ""
                  }
                }
              ]
            },
            {
              "operator": "endswith",
              "value": {
                "value": "lpok."
              },
              "actions": [
                {
                  "action": "enable",
                  "target": "vitals/vitals/body_temperature/any_event/symptoms",
                  "value": {
                    "code": ""
                  }
                }
              ]
            }
          ]
        }
      ];

      var values = {};

      var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, values, deps);
      var ast = rm.getDependencyNode();
      expect(ast instanceof Ast).toBeTruthy();
      ast.process({});

      var qm = rm.findSuccessorWithPath("vitals/vitals/body_temperature/any_event/temperature");
      expect(qm.getDependencyNode()).toBeFalsy();
      expect(qm.getViewConfig().isReadOnly()).toBeFalsy();

      var sm = rm.findSuccessorWithPath("vitals/vitals/body_temperature/any_event/symptoms");
      expect(sm.getDependencyNode()).toBeFalsy();
      expect(sm.getViewConfig().isReadOnly()).toBeFalsy();

      var tm = rm.findSuccessorWithPath("vitals/vitals/body_temperature/any_event/description_of_thermal_stress") as TextFieldModel;
      expect(tm.getDependencyNode()).toBeTruthy();
      expect(tm.getDependencyNode().conditions()[2].getThenStatement().actions()[0].getName()).toBe("enable");
      expect(tm.getDependencyNode().conditions()[2].getThenStatement().actions()[0].getTargets()[0]).toBe(qm);
      expect(tm.getDependencyNode().conditions()[1].getThenStatement().actions()[0].getName()).toBe("disable");
      expect(tm.getDependencyNode().conditions()[1].getThenStatement().actions()[0].getTargets()[0]).toBe(sm);

      tm.textValue("Superhix is the best");
      ast.process({});
      expect(qm.getViewConfig().isReadOnly()).toBeTruthy();
      expect(sm.getViewConfig().isReadOnly()).toBeTruthy();

      tm.textValue("This is some long description.");
      ast.process({});
      expect(qm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(sm.getViewConfig().isReadOnly()).toBeTruthy();

      tm.textValue(null);
      ast.process({});
      expect(qm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(sm.getViewConfig().isReadOnly()).toBeTruthy();

      tm.textValue("This is a total lpok.");
      ast.process({});
      expect(qm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(sm.getViewConfig().isReadOnly()).toBeFalsy();

      tm.textValue("This is a total hix lpok.");
      ast.process({});
      expect(qm.getViewConfig().isReadOnly()).toBeTruthy();
      expect(sm.getViewConfig().isReadOnly()).toBeFalsy();
    });

    it("Dependency - DV_PROPORTION - Less Than, Greater Equals, Empty, Equals - Show, Hide, Enable, Disable", function () {

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
        "templateLanguages": [
          "en",
          "sl"
        ],
        "children": [
          {
            "name": "HbA1c",
            "localizedName": "HbA1c",
            "rmType": "DV_PROPORTION",
            "nodeId": "at0078.1",
            "min": 0,
            "max": 1,
            "localizedNames": {
              "en": "HbA1c",
              "sl": "HbA1c"
            },
            "localizedDescriptions": {
              "en": "Haemaglobin A 1c",
              "sl": "HbA1c"
            },
            "aqlPath": "/content[openEHR-EHR-SECTION.ispek_dialog.v1,'Vitals']/items[openEHR-EHR-OBSERVATION.lab_test-hba1c.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0078.1]/value",
            "inputs": [
              {
                "suffix": "numerator",
                "type": "DECIMAL",
                "validation": {
                  "range": {
                    "minOp": ">=",
                    "min": 0,
                    "maxOp": "<=",
                    "max": 100
                  }
                }
              },
              {
                "suffix": "denominator",
                "type": "DECIMAL"
              }
            ],
            "formId": "vitals/vitals/haemoglobin_a1c/any_event/hba1c"
          },
          {
            "name": "Body temperature",
            "localizedName": "Body temperature",
            "rmType": "OBSERVATION",
            "nodeId": "openEHR-EHR-OBSERVATION.body_temperature-zn.v1",
            "min": 0,
            "max": -1,
            "localizedNames": {
              "en": "Body temperature",
              "sl": "Telesna temperatura"
            },
            "localizedDescriptions": {
              "en": "A measurement of the body temperature, which is a surrogate for the whole body\n                    temperature of the person.\n                ",
              "sl": "Merjenje telesne temperature, ki se lahko nanaša na celotno telo pacieta"
            },
            "aqlPath": "/content[openEHR-EHR-SECTION.ispek_dialog.v1,'Vitals']/items[openEHR-EHR-OBSERVATION.body_temperature-zn.v1]",
            "formId": "vitals/vitals/body_temperature",
            "children": [
              {
                "name": "Any event",
                "localizedName": "Any event",
                "rmType": "EVENT",
                "nodeId": "at0003",
                "min": 0,
                "max": -1,
                "localizedNames": {
                  "en": "Any event",
                  "sl": "*Any event(en)"
                },
                "localizedDescriptions": {
                  "en": "Any event",
                  "sl": "*Any event(en)"
                },
                "aqlPath": "/content[openEHR-EHR-SECTION.ispek_dialog.v1,'Vitals']/items[openEHR-EHR-OBSERVATION.body_temperature-zn.v1]/data[at0002]/events[at0003]",
                "formId": "vitals/vitals/body_temperature/any_event",
                "children": [
                  {
                    "name": "Temperature",
                    "localizedName": "Temperature",
                    "rmType": "DV_QUANTITY",
                    "nodeId": "at0004",
                    "min": 0,
                    "max": 1,
                    "localizedNames": {
                      "en": "Temperature",
                      "sl": "Telesna temperatura"
                    },
                    "localizedDescriptions": {
                      "en": "The measured body temperature (as a surrogate for the whole body)",
                      "sl": "Izmerjena telesna temperatura za celotno telo"
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
                                "minOp": ">=",
                                "min": 1,
                                "maxOp": "<=",
                                "max": 1
                              }
                            }
                          },
                          {
                            "value": "°F",
                            "label": "°F",
                            "validation": {
                              "precision": {
                                "minOp": ">=",
                                "min": 1,
                                "maxOp": "<=",
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
                        "magnitude": {
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
                    "formId": "vitals/vitals/body_temperature/any_event/symptoms"
                  },
                  {
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
                      "en": "Description of thermal stress",
                      "sl": "Opis"
                    },
                    "localizedDescriptions": {
                      "en": "Description of the conditions applied to the subject that might influence their\n                    measured body temperature.\n                ",
                      "sl": "Opis pogojev/stanja, ki lahko vplivajo na telesno temperaturo pacienta"
                    },
                    "aqlPath": "/content[openEHR-EHR-SECTION.ispek_dialog.v1,'Vitals']/items[openEHR-EHR-OBSERVATION.body_temperature-zn.v1]/data[at0002]/events[at0003]/state[at0029]/items[at0041]/value",
                    "inputs": [
                      {
                        "type": "TEXT"
                      }
                    ],
                    "formId": "vitals/vitals/body_temperature/any_event/description_of_thermal_stress"
                  }
                ]
              }
            ]
          }
        ]
      };

      var deps:any = [
        {
          "field": "vitals/vitals/haemoglobin_a1c/any_event/hba1c",
          "conditions": [
            {
              "operator": "lt",
              "value": {
                "numerator": 50,
                "denominator": 100
              },
              "actions": [
                {
                  "action": "hide",
                  "target": "vitals/vitals/body_temperature/any_event/temperature",
                  "value": {
                    "unit": ""
                  }
                }
              ]
            },
            {
              "operator": "ge",
              "value": {
                "numerator": 101.12,
                "denominator": 100
              },
              "actions": [
                {
                  "action": "show",
                  "target": "vitals/vitals/body_temperature/any_event/temperature",
                  "value": {
                    "unit": ""
                  }
                }
              ]
            },
            {
              "operator": "empty",
              "value": null,
              "actions": [
                {
                  "action": "disable",
                  "target": "vitals/vitals/body_temperature/any_event/description_of_thermal_stress",
                  "value": {
                    "value": "This is some long description."
                  }
                }
              ]
            },
            {
              "operator": "eq",
              "value": {
                "numerator": 63,
                "denominator": 100
              },
              "actions": [
                {
                  "action": "enable",
                  "target": "vitals/vitals/body_temperature/any_event/description_of_thermal_stress",
                  "value": {
                    "value": "This is some long description."
                  }
                }
              ]
            }
          ]
        }
      ];

      var values = {};

      var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, values, deps);
      var ast = rm.getDependencyNode();
      expect(ast instanceof Ast).toBeTruthy();
      ast.process({});

      var qm = rm.findSuccessorWithPath("vitals/vitals/body_temperature/any_event/temperature");
      expect(qm.getDependencyNode()).toBeFalsy();
      expect(qm.getViewConfig().isHidden()).toBeFalsy();
      expect(qm.getViewConfig().isReadOnly()).toBeFalsy();

      var sm = rm.findSuccessorWithPath("vitals/vitals/body_temperature/any_event/symptoms");
      expect(sm.getDependencyNode()).toBeFalsy();
      expect(sm.getViewConfig().isHidden()).toBeFalsy();
      expect(sm.getViewConfig().isReadOnly()).toBeFalsy();

      var tm = rm.findSuccessorWithPath("vitals/vitals/body_temperature/any_event/description_of_thermal_stress");
      expect(tm.getDependencyNode()).toBeFalsy();
      expect(tm.getViewConfig().isHidden()).toBeFalsy();
      expect(tm.getViewConfig().isReadOnly()).toBeTruthy();

      var pm = rm.findSuccessorWithPath("vitals/vitals/haemoglobin_a1c/any_event/hba1c") as ProportionFieldModel;
      expect(pm.getDependencyNode()).toBeTruthy();
      expect(pm.getDependencyNode().conditions()[2].getThenStatement().actions()[0].getName()).toBe("disable");
      expect(pm.getDependencyNode().conditions()[2].getThenStatement().actions()[0].getTargets()[0]).toBe(tm);
      expect(pm.getDependencyNode().conditions()[2].getExpression().operatorDef.op).toBe("empty");
      expect(pm.getDependencyNode().conditions()[1].getThenStatement().actions()[0].getName()).toBe("show");
      expect(pm.getDependencyNode().conditions()[1].getThenStatement().actions()[0].getTargets()[0]).toBe(qm);
      expect(pm.getDependencyNode().conditions()[1].getExpression().operatorDef.op).toBe("ge");
      expect(pm.denominatorValue()).toBeCloseTo(null);
      pm.denominatorValue(100);
      expect(pm.denominatorValue()).toBeCloseTo(100);

      pm.numeratorValue(44.124);
      ast.process({});
      expect(qm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(qm.getViewConfig().isHidden()).toBeTruthy();
      expect(sm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(sm.getViewConfig().isHidden()).toBeFalsy();
      expect(tm.getViewConfig().isReadOnly()).toBeTruthy();
      expect(tm.getViewConfig().isHidden()).toBeFalsy();

      pm.numeratorValue(101.12);
      ast.process({});
      expect(qm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(qm.getViewConfig().isHidden()).toBeFalsy();
      expect(sm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(sm.getViewConfig().isHidden()).toBeFalsy();
      expect(tm.getViewConfig().isReadOnly()).toBeTruthy();
      expect(tm.getViewConfig().isHidden()).toBeFalsy();

      pm.numeratorValue(null);
      ast.process({});
      expect(qm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(qm.getViewConfig().isHidden()).toBeFalsy();
      expect(sm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(sm.getViewConfig().isHidden()).toBeFalsy();
      expect(tm.getViewConfig().isReadOnly()).toBeTruthy();
      expect(tm.getViewConfig().isHidden()).toBeFalsy();

      pm.numeratorValue(63);
      ast.process({});
      expect(qm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(qm.getViewConfig().isHidden()).toBeFalsy();
      expect(sm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(sm.getViewConfig().isHidden()).toBeFalsy();
      expect(tm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(tm.getViewConfig().isHidden()).toBeFalsy();

      pm.denominatorValue(127.01);
      ast.process({});
      expect(qm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(qm.getViewConfig().isHidden()).toBeTruthy();
      expect(sm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(sm.getViewConfig().isHidden()).toBeFalsy();
      expect(tm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(tm.getViewConfig().isHidden()).toBeFalsy();

    });

    it("Dependency - DV_COUNT - Greater Equals, Not Equals, Empty, Equals - Show, Hide, Enable, Disable", function () {

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
        "templateLanguages": [
          "en",
          "sl"
        ],
        "children": [
          {
            "name": "Count1",
            "localizedName": "Count1",
            "rmType": "DV_COUNT",
            "nodeId": "at0033",
            "min": 0,
            "max": 1,
            "localizedNames": {
              "en": "Count1",
              "sl": "*Count1(en)"
            },
            "localizedDescriptions": {
              "en": "*",
              "sl": "**(en)"
            },
            "aqlPath": "/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0033]/value",
            "inputs": [
              {
                "type": "INTEGER",
                "validation": {
                  "range": {
                    "minOp": ">=",
                    "min": 1,
                    "maxOp": "<=",
                    "max": 20
                  }
                }
              }
            ],
            "formId": "testing_template/context/testing/count1"
          },
          {
            "name": "Testing DV_TEXT",
            "localizedName": "Testing DV_TEXT",
            "rmType": "DV_TEXT",
            "nodeId": "at0026",
            "min": 0,
            "max": 1,
            "localizedNames": {
              "en": "Testing DV_TEXT",
              "sl": "*Testing DV_TEXT(en)"
            },
            "localizedDescriptions": {
              "en": "*",
              "sl": "**(en)"
            },
            "aqlPath": "/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0026]/value",
            "inputs": [
              {
                "type": "TEXT"
              }
            ],
            "formId": "testing_template/context/testing/testing_dv_text"
          },
          {
            "name": "Boolean1",
            "localizedName": "Boolean1",
            "rmType": "DV_BOOLEAN",
            "nodeId": "at0045",
            "min": 0,
            "max": 1,
            "localizedNames": {
              "en": "Boolean1",
              "sl": "*Boolean1(en)"
            },
            "localizedDescriptions": {
              "en": "*",
              "sl": "**(en)"
            },
            "aqlPath": "/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0045]/value",
            "inputs": [
              {
                "type": "BOOLEAN"
              }
            ],
            "formId": "testing_template/context/testing/boolean1"
          }
        ]
      };

      var deps:any = [
        {
          "field": "testing_template/context/testing/count1",
          "conditions": [
            {
              "operator": "ge",
              "value": {
                "value": 5
              },
              "actions": [
                {
                  "action": "hide",
                  "target": "testing_template/context/testing/testing_dv_text",
                  "value": {
                    "value": ""
                  }
                }
              ]
            },
            {
              "operator": "ne",
              "value": {
                "value": 2
              },
              "actions": [
                {
                  "action": "disable",
                  "target": "testing_template/context/testing/boolean1",
                  "value": {
                    "value": ""
                  }
                }
              ]
            },
            {
              "operator": "empty",
              "value": null,
              "actions": [
                {
                  "action": "show",
                  "target": "testing_template/context/testing/testing_dv_text",
                  "value": {
                    "value": ""
                  }
                }
              ]
            },
            {
              "operator": "eq",
              "value": {
                "value": 4
              },
              "actions": [
                {
                  "action": "enable",
                  "target": "testing_template/context/testing/boolean1",
                  "value": {
                    "value": ""
                  }
                }
              ]
            }
          ]
        }
      ];

      var values:any = {};

      var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, values, deps);
      var ast = rm.getDependencyNode();
      expect(ast instanceof Ast).toBeTruthy();
      ast.process({});

      var tm = rm.findSuccessorWithPath("testing_template/context/testing/testing_dv_text");
      expect(tm.getDependencyNode()).toBeFalsy();
      expect(tm.getViewConfig().isHidden()).toBeFalsy();
      expect(tm.getViewConfig().isReadOnly()).toBeFalsy();

      var bm = rm.findSuccessorWithPath("testing_template/context/testing/boolean1");
      expect(bm.getDependencyNode()).toBeFalsy();
      expect(bm.getViewConfig().isHidden()).toBeFalsy();
      expect(bm.getViewConfig().isReadOnly()).toBeTruthy();

      var cm = rm.findSuccessorWithPath("testing_template/context/testing/count1") as CountFieldModel;
      expect(cm.getDependencyNode()).toBeTruthy();
      expect(cm.getDependencyNode().conditions()[0].getThenStatement().actions()[0].getName()).toBe("hide");
      expect(cm.getDependencyNode().conditions()[0].getThenStatement().actions()[0].getTargets()[0]).toBe(tm);
      expect(cm.getDependencyNode().conditions()[0].getExpression().operatorDef.op).toBe("ge");
      expect(cm.getDependencyNode().conditions()[3].getThenStatement().actions()[0].getName()).toBe("enable");
      expect(cm.getDependencyNode().conditions()[3].getThenStatement().actions()[0].getTargets()[0]).toBe(bm);
      expect(cm.getDependencyNode().conditions()[3].getExpression().operatorDef.op).toBe("eq");

      cm.countValue(5);
      ast.process({});
      expect(cm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(cm.getViewConfig().isHidden()).toBeFalsy();
      expect(tm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(tm.getViewConfig().isHidden()).toBeTruthy();
      expect(bm.getViewConfig().isReadOnly()).toBeTruthy();
      expect(bm.getViewConfig().isHidden()).toBeFalsy();

      cm.countValue(null);
      ast.process({});
      expect(cm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(cm.getViewConfig().isHidden()).toBeFalsy();
      expect(tm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(tm.getViewConfig().isHidden()).toBeFalsy();
      expect(bm.getViewConfig().isReadOnly()).toBeTruthy();
      expect(bm.getViewConfig().isHidden()).toBeFalsy();

      cm.countValue(2);
      ast.process({});
      expect(cm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(cm.getViewConfig().isHidden()).toBeFalsy();
      expect(tm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(tm.getViewConfig().isHidden()).toBeFalsy();
      expect(bm.getViewConfig().isReadOnly()).toBeTruthy();
      expect(bm.getViewConfig().isHidden()).toBeFalsy();

      cm.countValue(4);
      ast.process({});
      expect(cm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(cm.getViewConfig().isHidden()).toBeFalsy();
      expect(tm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(tm.getViewConfig().isHidden()).toBeFalsy();
      expect(bm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(bm.getViewConfig().isHidden()).toBeFalsy();

    });

    it("Dependency - DV_BOOLEAN - Is, Is Not, Empty - Show, Hide, Disable", function () {

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
            "name": "Count1",
            "localizedName": "Count1",
            "rmType": "DV_COUNT",
            "nodeId": "at0033",
            "min": 0,
            "max": 1,
            "localizedNames": {
              "en": "Count1",
              "sl": "*Count1(en)"
            },
            "localizedDescriptions": {
              "en": "*",
              "sl": "**(en)"
            },
            "aqlPath": "/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0033]/value",
            "inputs": [
              {
                "type": "INTEGER",
                "validation": {
                  "range": {
                    "minOp": ">=",
                    "min": 1,
                    "maxOp": "<=",
                    "max": 20
                  }
                }
              }
            ],
            "formId": "testing_template/context/testing/count1"
          },
          {
            "name": "Testing DV_TEXT",
            "localizedName": "Testing DV_TEXT",
            "rmType": "DV_TEXT",
            "nodeId": "at0026",
            "min": 0,
            "max": 1,
            "localizedNames": {
              "en": "Testing DV_TEXT",
              "sl": "*Testing DV_TEXT(en)"
            },
            "localizedDescriptions": {
              "en": "*",
              "sl": "**(en)"
            },
            "aqlPath": "/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0026]/value",
            "inputs": [
              {
                "type": "TEXT"
              }
            ],
            "formId": "testing_template/context/testing/testing_dv_text"
          },
          {
            "name": "Boolean1",
            "localizedName": "Boolean1",
            "rmType": "DV_BOOLEAN",
            "nodeId": "at0045",
            "min": 0,
            "max": 1,
            "localizedNames": {
              "en": "Boolean1",
              "sl": "*Boolean1(en)"
            },
            "localizedDescriptions": {
              "en": "*",
              "sl": "**(en)"
            },
            "aqlPath": "/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0045]/value",
            "inputs": [
              {
                "type": "BOOLEAN"
              }
            ],
            "formId": "testing_template/context/testing/boolean1"
          },
          {
            "name": "Boolean",
            "localizedName": "Boolean",
            "rmType": "DV_BOOLEAN",
            "nodeId": "at0046",
            "min": "0",
            "max": "1",
            "localizedNames": {
              "en": "Boolean",
              "sl": "Boolean"
            },
            "localizedDescriptions": {
              "en": "*",
              "sl": "**(en)"
            },
            "aqlPath": "/context/other_context[at0001]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0046]/value",
            "inputs": [
              {
                "type": "BOOLEAN"
              }
            ],
            "formId": "testing_template/context/testing/boolean2",
            "viewConfig": {
              "advanced": {
                "hidden": false,
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
                "input": {
                  "threeState": true
                },
                "type": "DV_BOOLEAN"
              }
            }
          }
        ]
      };

      var deps :any= [
        {
          "field": "testing_template/context/testing/boolean1",
          "conditions": [
            {
              "operator": "empty",
              "value": null,
              "actions": [
                {
                  "action": "hide",
                  "target": "testing_template/context/testing/boolean2",
                  "value": {}
                }
              ]
            },
            {
              "operator": "is",
              "value": {
                "value": true
              },
              "actions": [
                {
                  "action": "hide",
                  "target": "testing_template/context/testing/count1",
                  "value": {}
                }
              ]
            },
            {
              "operator": "isnot",
              "value": {
                "value": true
              },
              "actions": [
                {
                  "action": "show",
                  "target": "testing_template/context/testing/count1",
                  "value": {
                    "value": ""
                  }
                }
              ]
            }
          ]
        },
        {
          "field": "testing_template/context/testing/boolean2",
          "conditions": [
            {
              "operator": "empty",
              "value": null,
              "actions": [
                {
                  "action": "disable",
                  "target": "testing_template/context/testing/testing_dv_text",
                  "value": {}
                }
              ]
            }
          ]
        }
      ];

      var values = {};

      var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, values, deps);
      var ast = rm.getDependencyNode();
      expect(ast instanceof Ast).toBeTruthy();
      ast.process({});

      var tm = rm.findSuccessorWithPath("testing_template/context/testing/testing_dv_text");
      expect(tm.getDependencyNode()).toBeFalsy();
      expect(tm.getViewConfig().isHidden()).toBeFalsy();
      expect(tm.getViewConfig().isReadOnly()).toBeTruthy();

      var cm = rm.findSuccessorWithPath("testing_template/context/testing/count1");
      expect(cm.getDependencyNode()).toBeFalsy();
      expect(cm.getViewConfig().isHidden()).toBeFalsy();
      expect(cm.getViewConfig().isReadOnly()).toBeFalsy();

      var bm2 = rm.findSuccessorWithPath("testing_template/context/testing/boolean2") as BooleanFieldModel;
      expect(bm2 instanceof BooleanFieldModel).toBeTruthy();

      var bm = rm.findSuccessorWithPath("testing_template/context/testing/boolean1") as BooleanFieldModel;
      expect(bm.getDependencyNode()).toBeTruthy();
      expect(bm.getViewConfig().isHidden()).toBeFalsy();
      expect(bm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(bm.getDependencyNode().conditions()[0].getThenStatement().actions()[0].getName()).toBe("hide");
      expect(bm.getDependencyNode().conditions()[0].getThenStatement().actions()[0].getTargets()[0]).toBe(bm2);
      expect(bm.getDependencyNode().conditions()[0].getExpression().operatorDef.op).toBe("empty");
      expect(bm.getDependencyNode().conditions()[2].getThenStatement().actions()[0].getName()).toBe("show");
      expect(bm.getDependencyNode().conditions()[2].getThenStatement().actions()[0].getTargets()[0]).toBe(cm);
      expect(bm.getDependencyNode().conditions()[2].getExpression().operatorDef.op).toBe("isnot");

      expect(bm2.getDependencyNode()).toBeTruthy();
      expect(bm2.getViewConfig().isHidden()).toBeFalsy();
      expect(bm2.getViewConfig().isReadOnly()).toBeFalsy();
      expect(bm2.getDependencyNode().conditions()[0].getThenStatement().actions()[0].getName()).toBe("disable");
      expect(bm2.getDependencyNode().conditions()[0].getThenStatement().actions()[0].getTargets()[0]).toBe(tm);
      expect(bm2.getDependencyNode().conditions()[0].getExpression().operatorDef.op).toBe("empty");

      bm.booleanValue(true);
      ast.process({});
      expect(cm.getViewConfig().isHidden()).toBeTruthy();
      expect(cm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(tm.getViewConfig().isHidden()).toBeFalsy();
      expect(tm.getViewConfig().isReadOnly()).toBeTruthy();
      expect(bm2.getViewConfig().isHidden()).toBeFalsy();
      expect(bm2.getViewConfig().isReadOnly()).toBeFalsy();

      bm.booleanValue(false);
      ast.process({});
      expect(cm.getViewConfig().isHidden()).toBeFalsy();
      expect(cm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(tm.getViewConfig().isHidden()).toBeFalsy();
      expect(tm.getViewConfig().isReadOnly()).toBeTruthy();
      expect(bm2.getViewConfig().isHidden()).toBeFalsy();
      expect(bm2.getViewConfig().isReadOnly()).toBeFalsy();
    });

    it("Dependency - DV_DATE - Less Than Equals, Not Equals, Empty, Equals - Show, Hide, Enable, Disable", function () {

      var desc:any = tsDesc;

      var deps :any= [
        {
          "field": "testing_template/context/testing/date",
          "conditions": [
            {
              "operator": "le",
              "value": {
                "value": "2015-05-25"
              },
              "actions": [
                {
                  "action": "hide",
                  "target": "testing_template/context/testing/time",
                  "value": {
                    "value": "03:10:15"
                  }
                }
              ]
            },
            {
              "operator": "ne",
              "value": {
                "value": "2015-05-19"
              },
              "actions": [
                {
                  "action": "disable",
                  "target": "testing_template/context/testing/name_1",
                  "value": {
                    "value": ""
                  }
                }
              ]
            },
            {
              "operator": "eq",
              "value": {
                "value": "2015-05-19"
              },
              "actions": [
                {
                  "action": "enable",
                  "target": "testing_template/context/testing/name_1",
                  "value": {
                    "value": ""
                  }
                }
              ]
            },
            {
              "operator": "empty",
              "actions": [
                {
                  "action": "show",
                  "target": "testing_template/context/testing/time",
                  "value": {
                    "value": ""
                  }
                }
              ]
            }
          ]
        }
      ];

      var values = {};

      var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, values, deps);
      var ast = rm.getDependencyNode();
      expect(ast instanceof Ast).toBeTruthy();
      ast.process({});

      var tm = rm.findSuccessorWithPath("testing_template/context/testing/time");
      expect(tm.getDependencyNode()).toBeFalsy();
      expect(tm.getViewConfig().isHidden()).toBeTruthy();
      expect(tm.getViewConfig().isReadOnly()).toBeFalsy();

      var dtm = rm.findSuccessorWithPath("testing_template/context/testing/date_time");
      expect(dtm.getDependencyNode()).toBeFalsy();
      expect(dtm.getViewConfig().isHidden()).toBeFalsy();
      expect(dtm.getViewConfig().isReadOnly()).toBeFalsy();

      var nm = rm.findSuccessorWithPath("testing_template/context/testing/name_1");
      expect(nm.getDependencyNode()).toBeFalsy();
      expect(nm.getViewConfig().isHidden()).toBeFalsy();
      expect(nm.getViewConfig().isReadOnly()).toBeFalsy();


      var dm = rm.findSuccessorWithPath("testing_template/context/testing/date") as DateFieldModel;
      expect(dm.getDependencyNode()).toBeTruthy();
      expect(dm.getViewConfig().isHidden()).toBeFalsy();
      expect(dm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(dm.getDependencyNode().conditions()[1].getThenStatement().actions()[0].getName()).toBe("disable");
      expect(dm.getDependencyNode().conditions()[1].getThenStatement().actions()[0].getTargets()[0]).toBe(nm);
      expect(dm.getDependencyNode().conditions()[1].getExpression().operatorDef.op).toBe("ne");
      expect(dm.getDependencyNode().conditions()[2].getThenStatement().actions()[0].getName()).toBe("enable");
      expect(dm.getDependencyNode().conditions()[2].getThenStatement().actions()[0].getTargets()[0]).toBe(nm);
      expect(dm.getDependencyNode().conditions()[2].getExpression().operatorDef.op).toBe("eq");


      dm.dateValue("2015-05-26");
      ast.process({});
      expect(dtm.getViewConfig().isHidden()).toBeFalsy();
      expect(dtm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(tm.getViewConfig().isHidden()).toBeTruthy();
      expect(tm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(nm.getViewConfig().isHidden()).toBeFalsy();
      expect(nm.getViewConfig().isReadOnly()).toBeTruthy();

      dm.dateValue(null);
      ast.process({});
      expect(dtm.getViewConfig().isHidden()).toBeFalsy();
      expect(dtm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(tm.getViewConfig().isHidden()).toBeFalsy();
      expect(tm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(nm.getViewConfig().isHidden()).toBeFalsy();
      expect(nm.getViewConfig().isReadOnly()).toBeTruthy();

      dm.dateValue("2015-05-28");
      ast.process({});
      expect(dtm.getViewConfig().isHidden()).toBeFalsy();
      expect(dtm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(tm.getViewConfig().isHidden()).toBeFalsy();
      expect(tm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(nm.getViewConfig().isHidden()).toBeFalsy();
      expect(nm.getViewConfig().isReadOnly()).toBeTruthy();

      dm.dateValue("2015-05-19");
      ast.process({});
      expect(dtm.getViewConfig().isHidden()).toBeFalsy();
      expect(dtm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(tm.getViewConfig().isHidden()).toBeTruthy();
      expect(tm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(nm.getViewConfig().isHidden()).toBeFalsy();
      expect(nm.getViewConfig().isReadOnly()).toBeFalsy();

    });

    it("Dependency - DV_TIME - Less Than, Greater Than Equals, Empty, Equals - Show, Hide, Enable, Disable", function () {

      var desc:any = tsDesc;

      var deps:any = [
        {
          "field": "testing_template/context/testing/time",
          "conditions": [
            {
              "operator": "lt",
              "value": {
                "value": "14:05:09"
              },
              "actions": [
                {
                  "action": "hide",
                  "target": "testing_template/context/testing/name_1",
                  "value": {
                    "value": ""
                  }
                }
              ]
            },
            {
              "operator": "ge",
              "value": {
                "value": "21:31:16"
              },
              "actions": [
                {
                  "action": "show",
                  "target": "testing_template/context/testing/name_1",
                  "value": {
                    "value": ""
                  }
                }
              ]
            },
            {
              "operator": "empty",
              "value": null,
              "actions": [
                {
                  "action": "disable",
                  "target": "testing_template/context/testing/date_time",
                  "value": {
                    "value": ""
                  }
                }
              ]
            },
            {
              "operator": "eq",
              "value": {
                "value": "06:17"
              },
              "actions": [
                {
                  "action": "enable",
                  "target": "testing_template/context/testing/date_time",
                  "value": {
                    "value": ""
                  }
                }
              ]
            }
          ]
        }
      ];

      var values = {};

      var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, values, deps);
      var ast = rm.getDependencyNode();
      expect(ast instanceof Ast).toBeTruthy();
      ast.process({});


      var dtm = rm.findSuccessorWithPath("testing_template/context/testing/date_time");
      expect(dtm.getDependencyNode()).toBeFalsy();
      expect(dtm.getViewConfig().isHidden()).toBeFalsy();
      expect(dtm.getViewConfig().isReadOnly()).toBeTruthy();

      var nm = rm.findSuccessorWithPath("testing_template/context/testing/name_1");
      expect(nm.getDependencyNode()).toBeFalsy();
      expect(nm.getViewConfig().isHidden()).toBeFalsy();
      expect(nm.getViewConfig().isReadOnly()).toBeFalsy();


      var dm = rm.findSuccessorWithPath("testing_template/context/testing/date");
      expect(dm.getDependencyNode()).toBeFalsy();
      expect(dm.getViewConfig().isHidden()).toBeFalsy();
      expect(dm.getViewConfig().isReadOnly()).toBeFalsy();

      var tm = rm.findSuccessorWithPath("testing_template/context/testing/time") as TimeFieldModel;
      expect(tm.getDependencyNode()).toBeTruthy();
      expect(tm.getViewConfig().isHidden()).toBeFalsy();
      expect(tm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(tm.getDependencyNode().conditions()[2].getThenStatement().actions()[0].getName()).toBe("disable");
      expect(tm.getDependencyNode().conditions()[2].getThenStatement().actions()[0].getTargets()[0]).toBe(dtm);
      expect(tm.getDependencyNode().conditions()[2].getExpression().operatorDef.op).toBe("empty");
      expect(tm.getDependencyNode().conditions()[3].getThenStatement().actions()[0].getName()).toBe("enable");
      expect(tm.getDependencyNode().conditions()[3].getThenStatement().actions()[0].getTargets()[0]).toBe(dtm);
      expect(tm.getDependencyNode().conditions()[3].getExpression().operatorDef.op).toBe("eq");

      tm.timeValue("14:05:09");
      ast.process({});
      expect(dtm.getViewConfig().isHidden()).toBeFalsy();
      expect(dtm.getViewConfig().isReadOnly()).toBeTruthy();
      expect(dm.getViewConfig().isHidden()).toBeFalsy();
      expect(dm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(nm.getViewConfig().isHidden()).toBeFalsy();
      expect(nm.getViewConfig().isReadOnly()).toBeFalsy();

      tm.timeValue("14:05:08");
      ast.process({});
      expect(dtm.getViewConfig().isHidden()).toBeFalsy();
      expect(dtm.getViewConfig().isReadOnly()).toBeTruthy();
      expect(dm.getViewConfig().isHidden()).toBeFalsy();
      expect(dm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(nm.getViewConfig().isHidden()).toBeTruthy();
      expect(nm.getViewConfig().isReadOnly()).toBeFalsy();

      tm.timeValue("21:31:16");
      ast.process({});
      expect(dtm.getViewConfig().isHidden()).toBeFalsy();
      expect(dtm.getViewConfig().isReadOnly()).toBeTruthy();
      expect(dm.getViewConfig().isHidden()).toBeFalsy();
      expect(dm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(nm.getViewConfig().isHidden()).toBeFalsy();
      expect(nm.getViewConfig().isReadOnly()).toBeFalsy();

      tm.timeValue("06:17:00.000");
      ast.process({});
      expect(dtm.getViewConfig().isHidden()).toBeFalsy();
      expect(dtm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(dm.getViewConfig().isHidden()).toBeFalsy();
      expect(dm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(nm.getViewConfig().isHidden()).toBeTruthy();
      expect(nm.getViewConfig().isReadOnly()).toBeFalsy();

      tm.timeValue(null);
      ast.process({});
      expect(dtm.getViewConfig().isHidden()).toBeFalsy();
      expect(dtm.getViewConfig().isReadOnly()).toBeTruthy();
      expect(dm.getViewConfig().isHidden()).toBeFalsy();
      expect(dm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(nm.getViewConfig().isHidden()).toBeTruthy();
      expect(nm.getViewConfig().isReadOnly()).toBeFalsy();
    });

    it("Dependency - DV_DATE_TIME - Equals, Not Equals, Less Than Equals, Greater Than - Show, Hide, Enable, Disable", function () {

      var desc:any = tsDesc;

      var deps:any = [
        {
          "field": "testing_template/context/testing/date_time",
          "conditions": [
            {
              "operator": "eq",
              "value": {
                "value": "2015-05-26T02:03:00"
              },
              "actions": [
                {
                  "action": "hide",
                  "target": "testing_template/context/testing/name_1",
                  "value": {
                    "value": ""
                  }
                }
              ]
            },
            {
              "operator": "ne",
              "value": {
                "value": "2015-05-26T02:03:00"
              },
              "actions": [
                {
                  "action": "show",
                  "target": "testing_template/context/testing/name_1",
                  "value": {
                    "value": ""
                  }
                }
              ]
            },
            {
              "operator": "le",
              "value": {
                "value": "2015-05-30T14:08:00"
              },
              "actions": [
                {
                  "action": "disable",
                  "target": "testing_template/context/testing/date",
                  "value": {
                    "value": "2015-05-19"
                  }
                }
              ]
            },
            {
              "operator": "gt",
              "value": {
                "value": "2018-11-04T00:00:00"
              },
              "actions": [
                {
                  "action": "enable",
                  "target": "testing_template/context/testing/date",
                  "value": {
                    "value": "2015-05-19"
                  }
                }
              ]
            }
          ]
        }
      ];

      var values = {};

      var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, values, deps);
      var ast = rm.getDependencyNode();
      expect(ast instanceof Ast).toBeTruthy();
      ast.process({});

      var nm = rm.findSuccessorWithPath("testing_template/context/testing/name_1");
      expect(nm.getDependencyNode()).toBeFalsy();
      expect(nm.getViewConfig().isHidden()).toBeFalsy();
      expect(nm.getViewConfig().isReadOnly()).toBeFalsy();

      var dm = rm.findSuccessorWithPath("testing_template/context/testing/date");
      expect(dm.getDependencyNode()).toBeFalsy();
      expect(dm.getViewConfig().isHidden()).toBeFalsy();
      expect(dm.getViewConfig().isReadOnly()).toBeFalsy();

      var tm = rm.findSuccessorWithPath("testing_template/context/testing/time");
      expect(tm.getDependencyNode()).toBeFalsy();
      expect(tm.getViewConfig().isHidden()).toBeFalsy();
      expect(tm.getViewConfig().isReadOnly()).toBeFalsy();

      var dtm = rm.findSuccessorWithPath("testing_template/context/testing/date_time") as DateTimeFieldModel;
      expect(dtm.getDependencyNode()).toBeTruthy();
      expect(dtm.getViewConfig().isHidden()).toBeFalsy();
      expect(dtm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(dtm.getDependencyNode().conditions()[1].getThenStatement().actions()[0].getName()).toBe("show");
      expect(dtm.getDependencyNode().conditions()[1].getThenStatement().actions()[0].getTargets()[0]).toBe(nm);
      expect(dtm.getDependencyNode().conditions()[1].getExpression().operatorDef.op).toBe("ne");
      expect(dtm.getDependencyNode().conditions()[2].getThenStatement().actions()[0].getName()).toBe("disable");
      expect(dtm.getDependencyNode().conditions()[2].getThenStatement().actions()[0].getTargets()[0]).toBe(dm);
      expect(dtm.getDependencyNode().conditions()[2].getExpression().operatorDef.op).toBe("le");

      ///var d = util.toDateApplyTzDiff(new Date("2015-05-26T02:03:00"));
      ///var d = new Date(util.toLocalTimezoneOffsetISOString("2015-05-26T02:03:00"));
      dtm.dateTimeValue("2015-05-26T02:03:00");
      ast.process({});
      expect(tm.getViewConfig().isHidden()).toBeFalsy();
      expect(tm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(dm.getViewConfig().isHidden()).toBeFalsy();
      expect(dm.getViewConfig().isReadOnly()).toBeTruthy();
      expect(nm.getViewConfig().isHidden()).toBeTruthy();
      expect(nm.getViewConfig().isReadOnly()).toBeFalsy();

      //d = util.toDateApplyTzDiff(new Date("2015-05-31T00:00:00"));
      dtm.dateTimeValue("2015-05-31T00:00:00");
      ast.process({});
      expect(tm.getViewConfig().isHidden()).toBeFalsy();
      expect(tm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(dm.getViewConfig().isHidden()).toBeFalsy();
      expect(dm.getViewConfig().isReadOnly()).toBeTruthy();
      expect(nm.getViewConfig().isHidden()).toBeFalsy();
      expect(nm.getViewConfig().isReadOnly()).toBeFalsy();

      //d = util.toDateApplyTzDiff(new Date("2018-11-04T00:00:00"));
      dtm.dateTimeValue("2018-11-04T00:00:00");
      ast.process({});
      expect(tm.getViewConfig().isHidden()).toBeFalsy();
      expect(tm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(dm.getViewConfig().isHidden()).toBeFalsy();
      expect(dm.getViewConfig().isReadOnly()).toBeTruthy();
      expect(nm.getViewConfig().isHidden()).toBeFalsy();
      expect(nm.getViewConfig().isReadOnly()).toBeFalsy();

      //d = util.toDateApplyTzDiff(new Date("2018-11-04T00:00:01"));
      dtm.dateTimeValue("2018-11-04T00:00:01");
      ast.process({});
      expect(tm.getViewConfig().isHidden()).toBeFalsy();
      expect(tm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(dm.getViewConfig().isHidden()).toBeFalsy();
      expect(dm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(nm.getViewConfig().isHidden()).toBeFalsy();
      expect(nm.getViewConfig().isReadOnly()).toBeFalsy();

      //d = util.toDateApplyTzDiff(new Date("2015-05-30T14:08:00"));
      dtm.dateTimeValue("2015-05-30T14:08:00");
      ast.process({});
      expect(tm.getViewConfig().isHidden()).toBeFalsy();
      expect(tm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(dm.getViewConfig().isHidden()).toBeFalsy();
      expect(dm.getViewConfig().isReadOnly()).toBeTruthy();
      expect(nm.getViewConfig().isHidden()).toBeFalsy();
      expect(nm.getViewConfig().isReadOnly()).toBeFalsy();

      dtm.dateTimeValue(null);
      ast.process({});
      expect(tm.getViewConfig().isHidden()).toBeFalsy();
      expect(tm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(dm.getViewConfig().isHidden()).toBeFalsy();
      expect(dm.getViewConfig().isReadOnly()).toBeTruthy();
      expect(nm.getViewConfig().isHidden()).toBeFalsy();
      expect(nm.getViewConfig().isReadOnly()).toBeFalsy();

    });

    it("Dependency -  Show and Hide", function () {

      var desc:any = vsContTargetDesc;

      var deps :any= [
        {
          "field": "testing_template/context/testing/name_1",
          "conditions": [
            {
              "operator": "equals",
              "value": {
                "value": "ABC"
              },
              "actions": [
                {
                  "action": "hide",
                  "target": "testing_template/context/fixed_name",
                  "value": {
                    "value": ""
                  }
                }
              ]
            },
            {
              "operator": "startswith",
              "value": {
                "value": "DEF"
              },
              "actions": [
                {
                  "action": "show",
                  "target": "testing_template/context/fixed_name",
                  "value": {
                    "value": ""
                  }
                }
              ]
            },
            {
              "operator": "equals",
              "value": {
                "value": "ABC"
              },
              "actions": [
                {
                  "action": "hide",
                  "target": "test_encounter/testing/testing/ehruri",
                  "value": {
                    "value": ""
                  }
                }
              ]
            },
            {
              "operator": "startswith",
              "value": {
                "value": "DEF"
              },
              "actions": [
                {
                  "action": "show",
                  "target": "test_encounter/testing/testing/ehruri",
                  "value": {
                    "value": ""
                  }
                }
              ]
            }
          ]
        },
        {
          "field": "test_encounter/testing/testing/ehruri",
          "conditions": [
            {
              "operator": "startswith",
              "value": {
                "value": "ehr://"
              },
              "actions": [
                {
                  "action": "hide",
                  "target": "testing_template/context/fixed_name",
                  "value": {
                    "value": ""
                  }
                }
              ]
            }
          ]
        }
      ];

      var values = {};

      var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, values, deps);
      var ast = rm.getDependencyNode();
      expect(ast instanceof Ast).toBeTruthy();
      ast.process({});

      var cm = rm.findSuccessorWithPath("testing_template/context/fixed_name");
      var cmUri = rm.findSuccessorWithPath("test_encounter/testing/testing/ehruri") as EhrUriFieldModel;
      expect(cm).toBeTruthy();
      expect(cm.getViewConfig().isHidden()).toBeFalsy();
      expect(cm.getViewConfig().isReadOnly()).toBeFalsy();

      var nm = rm.findSuccessorWithPath("testing_template/context/testing/name_1") as TextFieldModel;
      expect(nm.getDependencyNode()).toBeTruthy();
      expect(nm.getViewConfig().isHidden()).toBeFalsy();
      expect(nm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(nm.getDependencyNode().conditions()[0].getThenStatement().actions()[0].getTargets()[0]).toBe(cm);

      nm.textValue("ABC");
      ast.process({});
      expect(cm.getViewConfig().isHidden()).toBeTruthy();
      expect(cm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(cmUri.getViewConfig().isHidden()).toBeTruthy();
      expect(cmUri.getViewConfig().isReadOnly()).toBeFalsy();

      nm.textValue("dDEFd");
      ast.process({});
      expect(cm.getViewConfig().isHidden()).toBeTruthy();
      expect(cm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(cmUri.getViewConfig().isHidden()).toBeTruthy();
      expect(cmUri.getViewConfig().isReadOnly()).toBeFalsy();

      nm.textValue("DEF df af flv bgg ");
      ast.process({});
      expect(cm.getViewConfig().isHidden()).toBeFalsy();
      expect(cm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(cmUri.getViewConfig().isHidden()).toBeFalsy();
      expect(cmUri.getViewConfig().isReadOnly()).toBeFalsy();

      expect(cmUri.getDependencyNode()).toBeTruthy();
      expect(cmUri.getDependencyNode().conditions()[0].getThenStatement().actions()[0].getTargets()[0]).toBe(cm);

      expect(cm.getViewConfig().isHidden()).toBeFalsy();
      cmUri.ehrUriValue("ehr:");
      ast.process({});
      expect(cm.getViewConfig().isHidden()).toBeFalsy();
      expect(cm.getViewConfig().isReadOnly()).toBeFalsy();

      cmUri.ehrUriValue("ehr://value");
      ast.process({});
      expect(cm.getViewConfig().isHidden()).toBeTruthy();
      expect(cm.getViewConfig().isReadOnly()).toBeFalsy();

    });

    it("Dependency - Set, Clear Value", function () {

      var desc:any ={
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
            "name": "Testing",
            "localizedName": "Testing",
            "rmType": "EVALUATION",
            "nodeId": "openEHR-EHR-EVALUATION.testing.v2",
            "min": 0,
            "max": -1,
            "localizedNames": {
              "en": "Testing",
              "sl": "*Testing(en)"
            },
            "localizedDescriptions": {
              "en": "Testing evaluation",
              "sl": "*Testing evaluation(en)"
            },
            "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]",
            "formId": "encounter/testing",
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
                "name": "Text",
                "localizedName": "Text",
                "rmType": "DV_TEXT",
                "nodeId": "at0012",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "Text",
                  "sl": "*Text(en)"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0012]/value",
                "inputs": [
                  {
                    "type": "TEXT"
                  }
                ],
                "formId": "encounter/testing/text",
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
                      "presentation": "textfield"
                    }
                  }
                }
              },
              {
                "name": "Quantity",
                "localizedName": "Quantity",
                "rmType": "DV_QUANTITY",
                "nodeId": "at0013",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "Quantity",
                  "sl": "*Quantity(en)"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0013]/value",
                "inputs": [
                  {
                    "suffix": "magnitude",
                    "type": "DECIMAL",
                    "validation": {
                      "range": {
                        "minOp": ">=",
                        "min": 20,
                        "maxOp": "<=",
                        "max": 300
                      },
                      "precision": {
                        "minOp": ">=",
                        "min": 1,
                        "maxOp": "<=",
                        "max": 1
                      }
                    },
                    "defaultValue": 120
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
                            "min": 20,
                            "maxOp": "<=",
                            "max": 300
                          },
                          "precision": {
                            "minOp": ">=",
                            "min": 1,
                            "maxOp": "<=",
                            "max": 1
                          }
                        }
                      }
                    ],
                    "defaultValue": "mm[Hg]"
                  }
                ],
                "formId": "encounter/testing/quantity",
                "viewConfig": {
                  "field": {
                    "unit": {
                      "presentation": "combobox"
                    }
                  },
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
                "name": "Count",
                "localizedName": "Count",
                "rmType": "DV_COUNT",
                "nodeId": "at0014",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "Count",
                  "sl": "*Count(en)"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0014]/value",
                "inputs": [
                  {
                    "type": "INTEGER"
                  }
                ],
                "formId": "encounter/testing/count",
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
                "name": "DateTime",
                "localizedName": "DateTime",
                "rmType": "DV_DATE_TIME",
                "nodeId": "at0015",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "DateTime",
                  "sl": "*DateTime(en)"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0015]/value",
                "inputs": [
                  {
                    "type": "DATETIME",
                    "defaultValue": "2015-09-23T01:02:03"
                  }
                ],
                "formId": "encounter/testing/datetime",
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
              },
              {
                "name": "Duration",
                "localizedName": "Duration",
                "rmType": "DV_DURATION",
                "nodeId": "at0016",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "Duration",
                  "sl": "*Duration(en)"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0016]/value",
                "inputs": [
                  {
                    "suffix": "year",
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
                    "defaultValue": 0
                  },
                  {
                    "suffix": "hour",
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
                    "suffix": "minute",
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
                "formId": "encounter/testing/duration",
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
                    "columns": 7
                  }
                }
              },
              {
                "name": "Ordinal",
                "localizedName": "Ordinal",
                "rmType": "DV_ORDINAL",
                "nodeId": "at0017",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "Ordinal",
                  "sl": "*Ordinal(en)"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0017]/value",
                "inputs": [
                  {
                    "type": "CODED_TEXT",
                    "list": [
                      {
                        "value": "at0029",
                        "label": "Hello",
                        "localizedLabels": {
                          "en": "Hello",
                          "sl": "*Hello(en)"
                        },
                        "localizedDescriptions": {
                          "en": "Hello",
                          "sl": "*Hello(en)"
                        },
                        "ordinal": 1
                      },
                      {
                        "value": "at0030",
                        "label": "World",
                        "localizedLabels": {
                          "en": "World",
                          "sl": "*World(en)"
                        },
                        "localizedDescriptions": {
                          "en": "World",
                          "sl": "*World(en)"
                        },
                        "ordinal": 2
                      }
                    ]
                  }
                ],
                "formId": "encounter/testing/ordinal",
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
                "name": "Boolean",
                "localizedName": "Boolean",
                "rmType": "DV_BOOLEAN",
                "nodeId": "at0018",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "Boolean",
                  "sl": "*Boolean(en)"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0018]/value",
                "inputs": [
                  {
                    "type": "BOOLEAN",
                    "defaultValue": false
                  }
                ],
                "formId": "encounter/testing/boolean",
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
                "name": "IntervalQuantity",
                "localizedName": "IntervalQuantity",
                "rmType": "DV_INTERVAL<DV_QUANTITY>",
                "nodeId": "at0019",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "IntervalQuantity",
                  "sl": "*IntervalQuantity(en)"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0019]/value",
                "formId": "encounter/testing/intervalquantity",
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
                "inputs": [
                  {
                    "type": "TEXT"
                  }
                ],
                "children": [
                  {
                    "rmType": "DV_QUANTITY",
                    "nodeId": "",
                    "min": 1,
                    "max": 1,
                    "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0019]/value/upper",
                    "inputs": [
                      {
                        "suffix": "magnitude",
                        "type": "DECIMAL",
                        "validation": {
                          "precision": {
                            "minOp": ">=",
                            "min": 1,
                            "maxOp": "<=",
                            "max": 1
                          }
                        },
                        "defaultValue": 180
                      },
                      {
                        "suffix": "unit",
                        "type": "CODED_TEXT",
                        "list": [
                          {
                            "value": "mm[Hg]",
                            "label": "mm[Hg]",
                            "validation": {
                              "precision": {
                                "minOp": ">=",
                                "min": 1,
                                "maxOp": "<=",
                                "max": 1
                              }
                            }
                          }
                        ],
                        "defaultValue": "mm[Hg]"
                      }
                    ],
                    "formId": "encounter/testing/intervalquantity/upper",
                    "viewConfig": {
                      "field": {
                        "unit": {
                          "presentation": "combobox"
                        }
                      },
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
                    "rmType": "DV_QUANTITY",
                    "nodeId": "",
                    "min": 1,
                    "max": 1,
                    "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0019]/value/lower",
                    "inputs": [
                      {
                        "suffix": "magnitude",
                        "type": "DECIMAL",
                        "validation": {
                          "precision": {
                            "minOp": ">=",
                            "min": 1,
                            "maxOp": "<=",
                            "max": 1
                          }
                        },
                        "defaultValue": 120
                      },
                      {
                        "suffix": "unit",
                        "type": "CODED_TEXT",
                        "list": [
                          {
                            "value": "mm[Hg]",
                            "label": "mm[Hg]",
                            "validation": {
                              "precision": {
                                "minOp": ">=",
                                "min": 1,
                                "maxOp": "<=",
                                "max": 1
                              }
                            }
                          }
                        ],
                        "defaultValue": "mm[Hg]"
                      }
                    ],
                    "formId": "encounter/testing/intervalquantity/lower",
                    "viewConfig": {
                      "field": {
                        "unit": {
                          "presentation": "combobox"
                        }
                      },
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
                  }
                ]
              },
              {
                "name": "IntervalCount",
                "localizedName": "IntervalCount",
                "rmType": "DV_INTERVAL<DV_COUNT>",
                "nodeId": "at0020",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "IntervalCount",
                  "sl": "*IntervalCount(en)"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0020]/value",
                "formId": "encounter/testing/intervalcount",
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
                "inputs": [
                  {
                    "type": "TEXT"
                  }
                ],
                "children": [
                  {
                    "rmType": "DV_COUNT",
                    "nodeId": "",
                    "min": 1,
                    "max": 1,
                    "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0020]/value/upper",
                    "inputs": [
                      {
                        "type": "INTEGER"
                      }
                    ],
                    "formId": "encounter/testing/intervalcount/upper",
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
                    "rmType": "DV_COUNT",
                    "nodeId": "",
                    "min": 1,
                    "max": 1,
                    "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0020]/value/lower",
                    "inputs": [
                      {
                        "type": "INTEGER"
                      }
                    ],
                    "formId": "encounter/testing/intervalcount/lower",
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
                  }
                ]
              },
              {
                "name": "IntervalDateTime",
                "localizedName": "IntervalDateTime",
                "rmType": "DV_INTERVAL<DV_DATE_TIME>",
                "nodeId": "at0021",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "IntervalDateTime",
                  "sl": "*IntervalDateTime(en)"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0021]/value",
                "formId": "encounter/testing/intervaldatetime",
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
                    "rmType": "DV_DATE_TIME",
                    "nodeId": "",
                    "min": 1,
                    "max": 1,
                    "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0021]/value/upper",
                    "inputs": [
                      {
                        "type": "DATETIME"
                      }
                    ],
                    "formId": "encounter/testing/intervaldatetime/upper",
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
                  },
                  {
                    "rmType": "DV_DATE_TIME",
                    "nodeId": "",
                    "min": 1,
                    "max": 1,
                    "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0021]/value/lower",
                    "inputs": [
                      {
                        "type": "DATETIME"
                      }
                    ],
                    "formId": "encounter/testing/intervaldatetime/lower",
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
                "name": "Multimedia",
                "localizedName": "Multimedia",
                "rmType": "DV_MULTIMEDIA",
                "nodeId": "at0022",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "Multimedia",
                  "sl": "*Multimedia(en)"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0022]/value",
                "inputs": [
                  {
                    "type": "TEXT"
                  }
                ],
                "formId": "encounter/testing/multimedia",
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
                      "presentation": "textfield"
                    }
                  }
                }
              },
              {
                "name": "Uri",
                "localizedName": "Uri",
                "rmType": "DV_URI",
                "nodeId": "at0024",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "Uri",
                  "sl": "*Uri(en)"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0024]/value",
                "inputs": [
                  {
                    "type": "TEXT",
                    "listOpen": false,
                    "validation": {
                      "pattern": "abcdef"
                    }
                  }
                ],
                "formId": "encounter/testing/uri",
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
                      "presentation": "textfield"
                    }
                  }
                }
              },
              {
                "name": "EhrUri",
                "localizedName": "EhrUri",
                "rmType": "DV_EHR_URI",
                "nodeId": "at0025",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "EhrUri",
                  "sl": "*EhrUri(en)"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0025]/value",
                "inputs": [
                  {
                    "type": "TEXT",
                    "listOpen": false,
                    "validation": {
                      "pattern": "xyz"
                    }
                  }
                ],
                "formId": "encounter/testing/ehruri",
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
                      "presentation": "textfield"
                    }
                  }
                }
              },
              {
                "name": "Proportion",
                "localizedName": "Proportion",
                "rmType": "DV_PROPORTION",
                "nodeId": "at0026",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "Proportion",
                  "sl": "*Proportion(en)"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0026]/value",
                "inputs": [
                  {
                    "suffix": "numerator",
                    "type": "DECIMAL"
                  },
                  {
                    "suffix": "denominator",
                    "type": "DECIMAL"/*,
                   "validation": {
                   "range": {
                   "minOp": ">=",
                   "min": 100,
                   "maxOp": "<=",
                   "max": 100
                   }
                   }*/
                  }
                ],
                "formId": "encounter/testing/proportion",
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
                "name": "ProportionMulti",
                "localizedName": "ProportionMulti",
                "rmType": "DV_PROPORTION",
                "nodeId": "at0032",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "ProportionMulti",
                  "sl": "*ProportionMulti(en)"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0032]/value",
                "inputs": [
                  {
                    "suffix": "numerator",
                    "type": "DECIMAL"
                  },
                  {
                    "suffix": "denominator",
                    "type": "DECIMAL"
                  }
                ],
                "formId": "encounter/testing/proportionmulti",
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
                "name": "ProportionPrec1",
                "localizedName": "ProportionPrec1",
                "rmType": "DV_PROPORTION",
                "nodeId": "at0033",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "ProportionPrec1",
                  "sl": "*ProportionPrec1(en)"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0033]/value",
                "inputs": [
                  {
                    "suffix": "numerator",
                    "type": "DECIMAL",
                    "validation": {
                      "range": {
                        "minOp": ">=",
                        "min": 7,
                        "maxOp": "<=",
                        "max": 77
                      }
                    },
                    "defaultValue": 17
                  },
                  {
                    "suffix": "denominator",
                    "type": "DECIMAL",
                    "validation": {
                      "range": {
                        "minOp": ">=",
                        "min": 100,
                        "maxOp": "<=",
                        "max": 100
                      }
                    }
                  }
                ],
                "formId": "encounter/testing/proportionprec1",
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
                "name": "ProportionInt",
                "localizedName": "ProportionInt",
                "rmType": "DV_PROPORTION",
                "nodeId": "at0034",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "ProportionInt",
                  "sl": "*ProportionInt(en)"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0034]/value",
                "inputs": [
                  {
                    "suffix": "numerator",
                    "type": "INTEGER",
                    "validation": {
                      "range": {
                        "minOp": ">=",
                        "min": 5,
                        "maxOp": "<=",
                        "max": 50
                      }
                    },
                    "defaultValue": 20
                  },
                  {
                    "suffix": "denominator",
                    "type": "INTEGER"/*,
                   "validation": {
                   "range": {
                   "minOp": ">=",
                   "min": 100,
                   "maxOp": "<=",
                   "max": 100
                   }
                   }*/
                  }
                ],
                "formId": "encounter/testing/proportionint",
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
                "name": "Identifier",
                "localizedName": "Identifier",
                "rmType": "DV_IDENTIFIER",
                "nodeId": "at0027",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "Identifier",
                  "sl": "*Identifier(en)"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0027]/value",
                "inputs": [
                  {
                    "suffix": "id",
                    "type": "TEXT",
                    "listOpen": false,
                    "validation": {
                      "pattern": "assign.*"
                    }
                  },
                  {
                    "suffix": "type",
                    "type": "TEXT",
                    "listOpen": false,
                    "validation": {
                      "pattern": "type.*"
                    }
                  },
                  {
                    "suffix": "issuer",
                    "type": "TEXT",
                    "listOpen": false,
                    "validation": {
                      "pattern": "ukc.*"
                    }
                  },
                  {
                    "suffix": "assigner",
                    "type": "TEXT"
                  }
                ],
                "formId": "encounter/testing/identifier",
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
                    "id": {
                      "presentation": "textfield"
                    },
                    "type": {
                      "presentation": "textfield"
                    },
                    "issuer": {
                      "presentation": "textfield"
                    },
                    "assigner": {
                      "presentation": "textfield"
                    }
                  }
                }
              },
              {
                "name": "Parsable",
                "localizedName": "Parsable",
                "rmType": "DV_PARSABLE",
                "nodeId": "at0028",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "Parsable",
                  "sl": "*Parsable(en)"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0028]/value",
                "inputs": [
                  {
                    "type": "TEXT"
                  }
                ],
                "formId": "encounter/testing/parsable",
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
                      "presentation": "textfield"
                    }
                  }
                }
              },
              {
                "name": "Date",
                "localizedName": "Date",
                "rmType": "DV_DATE",
                "nodeId": "at0035",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "Date",
                  "sl": "*Date(en)"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0035]/value",
                "inputs": [
                  {
                    "type": "DATE",
                    "defaultValue": "2015-09-09"
                  }
                ],
                "formId": "encounter/testing/date",
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
              },
              {
                "name": "Time",
                "localizedName": "Time",
                "rmType": "DV_TIME",
                "nodeId": "at0036",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "Time",
                  "sl": "*Time(en)"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0036]/value",
                "inputs": [
                  {
                    "type": "TIME",
                    "defaultValue": "10:16:00"
                  }
                ],
                "formId": "encounter/testing/time",
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
          }
        ]
      };

      var deps:any = [
        {
          "field": "encounter/testing/text",
          "conditions": [
            {
              "operator": "notempty",
              "value": null,
              "actions": [
                {
                  "action": "set",
                  "target": "encounter/testing/date",
                  "value": {
                    "value": "2015-09-08"
                  }
                },
                {
                  "action": "set",
                  "target": "encounter/testing/time",
                  "value": {
                    "value": "16:32:19"
                  }
                },
                {
                  "action": "set",
                  "target": "encounter/testing/datetime",
                  "value": {
                    "value": "2015-09-01T09:15:14"
                  }
                },
                {
                  "action": "set",
                  "target": "encounter/testing/quantity",
                  "value": {
                    "magnitude": 123,
                    "unit": "mm[Hg]"
                  }
                },
                {
                  "action": "set",
                  "target": "encounter/testing/count",
                  "value": {
                    "value": 456
                  }
                },
                {
                  "action": "set",
                  "target": "encounter/testing/duration",
                  "value": {
                    "year": 1,
                    "month": 1,
                    "day": 0,
                    "week": 0,
                    "hour": 0,
                    "minute": 1,
                    "second": 1
                  }
                },
                {
                  "action": "set",
                  "target": "encounter/testing/ordinal",
                  "value": {
                    "value": "at0030"
                  }
                },
                {
                  "action": "set",
                  "target": "encounter/testing/boolean",
                  "value": {
                    "value": true
                  }
                },
                {
                  "action": "set",
                  "target": "encounter/testing/intervalquantity/upper",
                  "value": {
                    "magnitude": 222,
                    "unit": "mm[Hg]"
                  }
                },
                {
                  "action": "set",
                  "target": "encounter/testing/intervalquantity/lower",
                  "value": {
                    "magnitude": 99,
                    "unit": "mm[Hg]"
                  }
                },
                {
                  "action": "set",
                  "target": "encounter/testing/intervalcount/upper",
                  "value": {
                    "value": 88
                  }
                },
                {
                  "action": "set",
                  "target": "encounter/testing/intervalcount/lower",
                  "value": {
                    "value": 33
                  }
                },
                {
                  "action": "set",
                  "target": "encounter/testing/uri",
                  "value": {
                    "value": "uri"
                  }
                },
                {
                  "action": "set",
                  "target": "encounter/testing/ehruri",
                  "value": {
                    "value": "ehruu"
                  }
                },
                {
                  "action": "set",
                  "target": "encounter/testing/proportion",
                  "value": {
                    "numerator": 2,
                    "denominator": 1
                  }
                },
                {
                  "action": "set",
                  "target": "encounter/testing/proportionmulti",
                  "value": {
                    "numerator": 3,
                    "denominator": 2
                  }
                },
                {
                  "action": "set",
                  "target": "encounter/testing/proportionprec1",
                  "value": {
                    "numerator": 17,
                    "denominator": 100
                  }
                },
                {
                  "action": "set",
                  "target": "encounter/testing/proportionint",
                  "value": {
                    "numerator": 20,
                    "denominator": 10
                  }
                },
                {
                  "action": "set",
                  "target": "encounter/testing/identifier",
                  "value": {
                    "id": "1",
                    "type": "2",
                    "issuer": "3",
                    "assigner": "4"
                  }
                },
                {
                  "action": "set",
                  "target": "encounter/testing/intervaldatetime/upper",
                  "value": {
                    "value": "2015-09-17T02:05:06"
                  }
                },
                {
                  "action": "set",
                  "target": "encounter/testing/intervaldatetime/lower",
                  "value": {
                    "value": "2015-09-01T06:12:17"
                  }
                }
              ]
            }
          ]
        },
        {
          "field": "encounter/testing/text",
          "conditions": [
            {
              "operator": "equals",
              "value": {
                "value": "clear"
              },
              "actions": [
                {
                  "action": "clear",
                  "target": "encounter/testing/quantity",
                  "value": {
                    "magnitude": 120,
                    "unit": "mm[Hg]"
                  }
                },
                {
                  "action": "clear",
                  "target": "encounter/testing/text",
                  "value": {
                    "value": "clear"
                  }
                },
                {
                  "action": "clear",
                  "target": "encounter/testing/count",
                  "value": null
                },
                {
                  "action": "clear",
                  "target": "encounter/testing/datetime",
                  "value": {
                    "value": "2015-09-23T01:02:03"
                  }
                },
                {
                  "action": "clear",
                  "target": "encounter/testing/duration",
                  "value": {
                    "year": 0,
                    "month": 0,
                    "day": 0,
                    "week": 0,
                    "hour": 0,
                    "minute": 0,
                    "second": 0
                  }
                },
                {
                  "action": "clear",
                  "target": "encounter/testing/ordinal",
                  "value": {
                    "value": ""
                  }
                },
                {
                  "action": "clear",
                  "target": "encounter/testing/boolean",
                  "value": {
                    "value": false
                  }
                },
                {
                  "action": "clear",
                  "target": "encounter/testing/intervalquantity/upper",
                  "value": {
                    "magnitude": 180,
                    "unit": "mm[Hg]"
                  }
                },
                {
                  "action": "clear",
                  "target": "encounter/testing/intervalquantity/lower",
                  "value": {
                    "magnitude": 120,
                    "unit": "mm[Hg]"
                  }
                },
                {
                  "action": "clear",
                  "target": "encounter/testing/intervalcount/upper",
                  "value": null
                },
                {
                  "action": "clear",
                  "target": "encounter/testing/intervalcount/lower",
                  "value": null
                },
                {
                  "action": "clear",
                  "target": "encounter/testing/intervaldatetime/upper",
                  "value": {
                    "value": ""
                  }
                },
                {
                  "action": "clear",
                  "target": "encounter/testing/intervaldatetime/lower",
                  "value": {
                    "value": ""
                  }
                },
                {
                  "action": "clear",
                  "target": "encounter/testing/uri",
                  "value": {
                    "value": ""
                  }
                },
                {
                  "action": "clear",
                  "target": "encounter/testing/ehruri",
                  "value": {
                    "value": ""
                  }
                },
                {
                  "action": "clear",
                  "target": "encounter/testing/proportion",
                  "value": {}
                },
                {
                  "action": "clear",
                  "target": "encounter/testing/proportionmulti",
                  "value": {}
                },
                {
                  "action": "clear",
                  "target": "encounter/testing/proportionprec1",
                  "value": {
                    "numerator": 17
                  }
                },
                {
                  "action": "clear",
                  "target": "encounter/testing/date",
                  "value": {
                    "value": "2015-09-09"
                  }
                },
                {
                  "action": "clear",
                  "target": "encounter/testing/proportionint",
                  "value": {
                    "numerator": 20
                  }
                },
                {
                  "action": "clear",
                  "target": "encounter/testing/time",
                  "value": {
                    "value": "10:16:00"
                  }
                }
              ]
            }
          ]
        }
      ];

      var values = {};

      var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, values, deps);
      var ast = rm.getDependencyNode();
      expect(ast instanceof Ast).toBeTruthy();
      ast.process({});

      var cmText = rm.findSuccessorWithPath("encounter/testing/text") as TextFieldModel;
      expect(cmText).toBeTruthy();
      expect(cmText.getValue()).toBeFalsy();

      var cmQuantity = rm.findSuccessorWithPath("encounter/testing/quantity") as QuantityFieldModel;
      expect(cmQuantity).toBeTruthy();
      expect(cmQuantity.getValue()).toBeFalsy();
      cmQuantity.magnitudeValue('999');
      expect(cmQuantity.getValue()['|magnitude']).toBe( 999 );

      var cmCount=rm.findSuccessorWithPath("encounter/testing/count") as CountFieldModel;
      expect(cmCount).toBeTruthy();
      expect(cmCount.getValue()).toBeFalsy();

      var cmDateTime=rm.findSuccessorWithPath("encounter/testing/datetime") as DateTimeFieldModel;
      expect(cmDateTime).toBeTruthy();
      expect(cmDateTime.getValue()).toBeFalsy();

      var cmDuration=rm.findSuccessorWithPath("encounter/testing/duration") as DurationFieldModel;
      expect(cmDuration).toBeTruthy();
      expect(cmDuration.getValue()).toBeFalsy();

      var cmOrdinal=rm.findSuccessorWithPath("encounter/testing/ordinal") as OrdinalFieldModel;
      expect(cmOrdinal).toBeTruthy();
      expect(cmOrdinal.getValue()).toBeFalsy();

      var cmBoolean=rm.findSuccessorWithPath("encounter/testing/boolean") as BooleanFieldModel;
      expect(cmBoolean).toBeTruthy();
      expect(cmBoolean.getValue()).toBeFalsy();

      var cmIntervalQUpper=rm.findSuccessorWithPath("encounter/testing/intervalquantity/upper") as QuantityFieldModel;
      expect(cmIntervalQUpper).toBeTruthy();
      expect(cmIntervalQUpper.getValue()).toBeFalsy();

      var cmIntervalQLower=rm.findSuccessorWithPath("encounter/testing/intervalquantity/lower") as QuantityFieldModel;
      expect(cmIntervalQLower).toBeTruthy();
      expect(cmIntervalQLower.getValue()).toBeFalsy();

      var cmIntervalCUpper=rm.findSuccessorWithPath("encounter/testing/intervalcount/upper") as QuantityFieldModel;
      expect(cmIntervalCUpper).toBeTruthy();
      expect(cmIntervalCUpper.getValue()).toBeFalsy();

      var cmIntervalCLower=rm.findSuccessorWithPath("encounter/testing/intervalcount/lower") as QuantityFieldModel;
      expect(cmIntervalCLower).toBeTruthy();
      expect(cmIntervalCLower.getValue()).toBeFalsy();

      var cmUri=rm.findSuccessorWithPath("encounter/testing/uri") as UriFieldModel;
      expect(cmUri).toBeTruthy();
      expect(cmUri.getValue()).toBeFalsy();

      var cmEhrUri=rm.findSuccessorWithPath("encounter/testing/ehruri") as EhrUriFieldModel;
      expect(cmEhrUri).toBeTruthy();
      expect(cmEhrUri.getValue()).toBeFalsy();

      var cmProportion=rm.findSuccessorWithPath("encounter/testing/proportion") as ProportionFieldModel;
      expect(cmProportion).toBeTruthy();
      expect(cmProportion.getValue()).toBeFalsy();

      var cmProportionMulti=rm.findSuccessorWithPath("encounter/testing/proportionmulti") as ProportionFieldModel;
      expect(cmProportionMulti).toBeTruthy();
      expect(cmProportionMulti.getValue()).toBeFalsy();

      var cmProportionPrec1=rm.findSuccessorWithPath("encounter/testing/proportionprec1") as ProportionFieldModel;
      expect(cmProportionPrec1).toBeTruthy();
      expect(cmProportionPrec1.getValue()).toBeFalsy();

      var cmProportionInt=rm.findSuccessorWithPath("encounter/testing/proportionint") as ProportionFieldModel;
      expect(cmProportionInt).toBeTruthy();
      expect(cmProportionInt.getValue()).toBeFalsy();

      var cmDate=rm.findSuccessorWithPath("encounter/testing/date") as DateFieldModel;
      expect(cmDate).toBeTruthy();
      expect(cmDate.getValue()).toBeFalsy();

      var cmTime=rm.findSuccessorWithPath("encounter/testing/time") as TimeFieldModel;
      expect(cmTime).toBeTruthy();
      expect(cmTime.getValue()).toBeFalsy();

      cmText.setValue('text to set values with dependencies');
      expect(cmText.getValue()).toBeTruthy();
      ast.process({});


      expect(cmQuantity.getValue()).toBeTruthy();
      expect(cmQuantity.getValue()['|magnitude']).toBe( 123 );

      expect(cmCount.getValue()).toBeTruthy();
      expect(cmCount.getValue()).toBe( 456 );

      expect(cmDateTime.getValue()).toBeTruthy();
      expect(cmDateTime.getValue()).toBe( '2015-09-01T09:15:14.000+02:00' );

      expect(cmDuration.getValue()).toBeTruthy();
      expect(cmDuration.getValue()).toBe( 'P1Y1MT1M1S' );

      expect(cmOrdinal.getValue()).toBeTruthy();
      expect(cmOrdinal.getValue()['|code']).toBe( 'at0030' );

      expect(cmBoolean.getValue()).toBeTruthy();
      expect(cmBoolean.getValue()).toBe( true );

      expect(cmIntervalQUpper.getValue()).toBeTruthy();
      expect(cmIntervalQUpper.getValue()['|magnitude']).toBe( 222 );

      expect(cmIntervalQLower.getValue()).toBeTruthy();
      expect(cmIntervalQLower.getValue()['|magnitude']).toBe( 99 );

      expect(cmIntervalCUpper.getValue()).toBeTruthy();
      expect(cmIntervalCUpper.getValue()).toBe( 88);

      expect(cmIntervalCLower.getValue()).toBeTruthy();
      expect(cmIntervalCLower.getValue()).toBe( 33);

      expect(cmUri.getValue()).toBeTruthy();
      expect(cmUri.getValue()).toBe( 'uri');

      expect(cmEhrUri.getValue()).toBeTruthy();
      expect(cmEhrUri.getValue()).toBe( 'ehruu');

      expect(cmProportion.getValue()).toBeTruthy();
      expect(cmProportion.getValue()['|numerator']).toBe( 2);
      expect(cmProportion.getValue()['|denominator']).toBe( 1);

      expect(cmProportionMulti.getValue()).toBeTruthy();
      expect(cmProportionMulti.getValue()['|numerator']).toBe( 3);
      expect(cmProportionMulti.getValue()['|denominator']).toBe(2);

      expect(cmProportionPrec1.getValue()).toBeTruthy();
      expect(cmProportionPrec1.getValue()['|numerator']).toBe( 17);
      expect(cmProportionPrec1.getValue()['|denominator']).toBe(100);

      expect(cmProportionInt.getValue()).toBeTruthy();
      expect(cmProportionInt.getValue()['|numerator']).toBe( 20);
      expect(cmProportionInt.getValue()['|denominator']).toBe(10);

      expect(cmDate.getValue()).toBeTruthy();
      expect(cmDate.getValue()).toBe( '2015-09-08');

      expect(cmTime.getValue()).toBeTruthy();
      expect(cmTime.getValue()).toBe( '16:32:19' );


      cmText.setValue('clear');
      expect(cmText.getValue()).toBeTruthy();
      ast.process({});

      expect(cmQuantity.getValue('|magnitude',0)).toBe( null );

      expect(cmCount.getValue()).toBe( null );

      expect(cmDateTime.getValue()).toBe(null);

      expect(cmDuration.getValue()).toBe( null );

      expect(cmOrdinal.getValue('|code',0)).toBe( null );

      expect(cmBoolean.getValue()).toBe( null );

      expect(cmIntervalQUpper.getValue(undefined, undefined).length).toBe( 0 );

      expect(cmIntervalQLower.getValue(undefined, undefined).length).toBe( 0 );

      expect(cmIntervalCUpper.getValue()).toBe( null);

      expect(cmIntervalCLower.getValue()).toBe( null);

      expect(cmUri.getValue()).toBe( null );

      expect(cmEhrUri.getValue()).toBe( null );

      expect(cmProportion.getValue()['|numerator']).toBe(null);
      expect(cmProportion.getValue()['|denominator']).toBe( null );

      expect(cmProportionMulti.getValue()['|numerator']).toBe( null );
      expect(cmProportionMulti.getValue()['|denominator']).toBe(null);

      expect(cmProportionPrec1.getValue()['|numerator']).toBe( null );
      expect(cmProportionPrec1.getValue()['|denominator']).toBe(null);

      expect(cmProportionInt.getValue()['|numerator']).toBe( null);
      expect(cmProportionInt.getValue()['|denominator']).toBe(null);

      expect(cmDate.getValue()).toBe( null );

      expect(cmTime.getValue()).toBe( null );

    });

    it("Dependency - Reset Value", function () {

      var desc:any ={
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
        "templateLanguages": [
          "en",
          "sl"
        ],
        "children": [
          {
            "name": "Testing",
            "localizedName": "Testing",
            "rmType": "EVALUATION",
            "nodeId": "openEHR-EHR-EVALUATION.testing.v2",
            "min": 0,
            "max": -1,
            "localizedNames": {
              "en": "Testing",
              "sl": "*Testing(en)"
            },
            "localizedDescriptions": {
              "en": "Testing evaluation",
              "sl": "*Testing evaluation(en)"
            },
            "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]",
            "formId": "encounter/testing",
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
                "name": "Text",
                "localizedName": "Text",
                "rmType": "DV_TEXT",
                "nodeId": "at0012",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "Text",
                  "sl": "*Text(en)"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0012]/value",
                "inputs": [
                  {
                    "type": "TEXT",
                    "defaultValue": "se"
                  }
                ],
                "formId": "encounter/testing/text",
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
                      "presentation": "textfield"
                    }
                  }
                }
              },
              {
                "name": "Quantity",
                "localizedName": "Quantity",
                "rmType": "DV_QUANTITY",
                "nodeId": "at0013",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "Quantity",
                  "sl": "*Quantity(en)"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0013]/value",
                "inputs": [
                  {
                    "suffix": "magnitude",
                    "type": "DECIMAL",
                    "validation": {
                      "range": {
                        "minOp": ">=",
                        "min": 20,
                        "maxOp": "<=",
                        "max": 300
                      },
                      "precision": {
                        "minOp": ">=",
                        "min": 1,
                        "maxOp": "<=",
                        "max": 1
                      }
                    },
                    "defaultValue": 1202
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
                            "min": 20,
                            "maxOp": "<=",
                            "max": 300
                          },
                          "precision": {
                            "minOp": ">=",
                            "min": 1,
                            "maxOp": "<=",
                            "max": 1
                          }
                        }
                      }
                    ],
                    "defaultValue": "mm[Hg]"
                  }
                ],
                "formId": "encounter/testing/quantity",
                "viewConfig": {
                  "field": {
                    "unit": {
                      "presentation": "combobox"
                    }
                  },
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
                "name": "Count",
                "localizedName": "Count",
                "rmType": "DV_COUNT",
                "nodeId": "at0014",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "Count",
                  "sl": "*Count(en)"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0014]/value",
                "inputs": [
                  {
                    "type": "INTEGER",
                    "defaultValue": 2
                  }
                ],
                "formId": "encounter/testing/count",
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
                "name": "DateTime",
                "localizedName": "DateTime",
                "rmType": "DV_DATE_TIME",
                "nodeId": "at0015",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "DateTime",
                  "sl": "*DateTime(en)"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0015]/value",
                "inputs": [
                  {
                    "type": "DATETIME",
                    "defaultValue": "2015-09-23T04:27:08"
                  }
                ],
                "formId": "encounter/testing/datetime",
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
              },
              {
                "name": "Duration",
                "localizedName": "Duration",
                "rmType": "DV_DURATION",
                "nodeId": "at0016",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "Duration",
                  "sl": "*Duration(en)"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0016]/value",
                "inputs": [
                  {
                    "suffix": "year",
                    "type": "INTEGER",
                    "validation": {
                      "range": {
                        "minOp": ">=",
                        "min": 0
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
                    "defaultValue": 2
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
                    "defaultValue": 3
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
                    "defaultValue": 4
                  },
                  {
                    "suffix": "hour",
                    "type": "INTEGER",
                    "validation": {
                      "range": {
                        "minOp": ">=",
                        "min": 0
                      }
                    },
                    "defaultValue": 5
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
                    "defaultValue": 6
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
                    "defaultValue": 7
                  }
                ],
                "formId": "encounter/testing/duration",
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
                    "columns": 7
                  }
                }
              },
              {
                "name": "Ordinal",
                "localizedName": "Ordinal",
                "rmType": "DV_ORDINAL",
                "nodeId": "at0017",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "Ordinal",
                  "sl": "*Ordinal(en)"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0017]/value",
                "inputs": [
                  {
                    "type": "CODED_TEXT",
                    "list": [
                      {
                        "value": "at0029",
                        "label": "Hello",
                        "localizedLabels": {
                          "en": "Hello",
                          "sl": "*Hello(en)"
                        },
                        "localizedDescriptions": {
                          "en": "Hello",
                          "sl": "*Hello(en)"
                        },
                        "ordinal": 1
                      },
                      {
                        "value": "at0030",
                        "label": "World",
                        "localizedLabels": {
                          "en": "World",
                          "sl": "*World(en)"
                        },
                        "localizedDescriptions": {
                          "en": "World",
                          "sl": "*World(en)"
                        },
                        "ordinal": 2
                      }
                    ],
                    "defaultValue": "at0030"
                  }
                ],
                "formId": "encounter/testing/ordinal",
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
                "name": "Boolean",
                "localizedName": "Boolean",
                "rmType": "DV_BOOLEAN",
                "nodeId": "at0018",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "Boolean",
                  "sl": "*Boolean(en)"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0018]/value",
                "inputs": [
                  {
                    "type": "BOOLEAN",
                    "defaultValue": true
                  }
                ],
                "formId": "encounter/testing/boolean",
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
                "name": "IntervalQuantity",
                "localizedName": "IntervalQuantity",
                "rmType": "DV_INTERVAL<DV_QUANTITY>",
                "nodeId": "at0019",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "IntervalQuantity",
                  "sl": "*IntervalQuantity(en)"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0019]/value",
                "inputs": [
                  {
                    "type": "TEXT"
                  }
                ],
                "formId": "encounter/testing/intervalquantity",
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
                    "rmType": "DV_QUANTITY",
                    "nodeId": "",
                    "min": 1,
                    "max": 1,
                    "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0019]/value/upper",
                    "inputs": [
                      {
                        "suffix": "magnitude",
                        "type": "DECIMAL",
                        "validation": {
                          "precision": {
                            "minOp": ">=",
                            "min": 1,
                            "maxOp": "<=",
                            "max": 1
                          }
                        },
                        "defaultValue": 333
                      },
                      {
                        "suffix": "unit",
                        "type": "CODED_TEXT",
                        "list": [
                          {
                            "value": "mm[Hg]",
                            "label": "mm[Hg]",
                            "validation": {
                              "precision": {
                                "minOp": ">=",
                                "min": 1,
                                "maxOp": "<=",
                                "max": 1
                              }
                            }
                          }
                        ],
                        "defaultValue": "mm[Hg]"
                      }
                    ],
                    "formId": "encounter/testing/intervalquantity/upper",
                    "viewConfig": {
                      "field": {
                        "unit": {
                          "presentation": "combobox"
                        }
                      },
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
                    "rmType": "DV_QUANTITY",
                    "nodeId": "",
                    "min": 1,
                    "max": 1,
                    "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0019]/value/lower",
                    "inputs": [
                      {
                        "suffix": "magnitude",
                        "type": "DECIMAL",
                        "validation": {
                          "precision": {
                            "minOp": ">=",
                            "min": 1,
                            "maxOp": "<=",
                            "max": 1
                          }
                        },
                        "defaultValue": 444
                      },
                      {
                        "suffix": "unit",
                        "type": "CODED_TEXT",
                        "list": [
                          {
                            "value": "mm[Hg]",
                            "label": "mm[Hg]",
                            "validation": {
                              "precision": {
                                "minOp": ">=",
                                "min": 1,
                                "maxOp": "<=",
                                "max": 1
                              }
                            }
                          }
                        ],
                        "defaultValue": "mm[Hg]"
                      }
                    ],
                    "formId": "encounter/testing/intervalquantity/lower",
                    "viewConfig": {
                      "field": {
                        "unit": {
                          "presentation": "combobox"
                        }
                      },
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
                  }
                ]
              },
              {
                "name": "IntervalCount",
                "localizedName": "IntervalCount",
                "rmType": "DV_INTERVAL<DV_COUNT>",
                "nodeId": "at0020",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "IntervalCount",
                  "sl": "*IntervalCount(en)"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0020]/value",
                "formId": "encounter/testing/intervalcount",
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
                    "rmType": "DV_COUNT",
                    "nodeId": "",
                    "min": 1,
                    "max": 1,
                    "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0020]/value/upper",
                    "inputs": [
                      {
                        "type": "INTEGER",
                        "defaultValue": 10
                      }
                    ],
                    "formId": "encounter/testing/intervalcount/upper",
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
                    "rmType": "DV_COUNT",
                    "nodeId": "",
                    "min": 1,
                    "max": 1,
                    "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0020]/value/lower",
                    "inputs": [
                      {
                        "type": "INTEGER",
                        "defaultValue": 8
                      }
                    ],
                    "formId": "encounter/testing/intervalcount/lower",
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
                  }
                ]
              },
              {
                "name": "IntervalDateTime",
                "localizedName": "IntervalDateTime",
                "rmType": "DV_INTERVAL<DV_DATE_TIME>",
                "nodeId": "at0021",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "IntervalDateTime",
                  "sl": "*IntervalDateTime(en)"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0021]/value",
                "formId": "encounter/testing/intervaldatetime",
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
                    "rmType": "DV_DATE_TIME",
                    "nodeId": "",
                    "min": 1,
                    "max": 1,
                    "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0021]/value/upper",
                    "inputs": [
                      {
                        "type": "DATETIME",
                        "defaultValue": "2015-09-24T04:20:27"
                      }
                    ],
                    "formId": "encounter/testing/intervaldatetime/upper",
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
                  },
                  {
                    "rmType": "DV_DATE_TIME",
                    "nodeId": "",
                    "min": 1,
                    "max": 1,
                    "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0021]/value/lower",
                    "inputs": [
                      {
                        "type": "DATETIME",
                        "defaultValue": "2015-09-01T06:19:43"
                      }
                    ],
                    "formId": "encounter/testing/intervaldatetime/lower",
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
                "name": "Multimedia",
                "localizedName": "Multimedia",
                "rmType": "DV_MULTIMEDIA",
                "nodeId": "at0022",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "Multimedia",
                  "sl": "*Multimedia(en)"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0022]/value",
                "inputs": [
                  {
                    "type": "TEXT",
                    "defaultValue": "mm"
                  }
                ],
                "formId": "encounter/testing/multimedia",
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
                      "presentation": "textfield"
                    }
                  }
                }
              },
              {
                "name": "Uri",
                "localizedName": "Uri",
                "rmType": "DV_URI",
                "nodeId": "at0024",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "Uri",
                  "sl": "*Uri(en)"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0024]/value",
                "inputs": [
                  {
                    "type": "TEXT",
                    "listOpen": false,
                    "validation": {
                      "pattern": "abcdef"
                    },
                    "defaultValue": "uu"
                  }
                ],
                "formId": "encounter/testing/uri",
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
                      "presentation": "textfield"
                    }
                  }
                }
              },
              {
                "name": "EhrUri",
                "localizedName": "EhrUri",
                "rmType": "DV_EHR_URI",
                "nodeId": "at0025",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "EhrUri",
                  "sl": "*EhrUri(en)"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0025]/value",
                "inputs": [
                  {
                    "type": "TEXT",
                    "listOpen": false,
                    "validation": {
                      "pattern": "xyz"
                    },
                    "defaultValue": "ee"
                  }
                ],
                "formId": "encounter/testing/ehruri",
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
                      "presentation": "textfield"
                    }
                  }
                }
              },
              {
                "name": "Proportion",
                "localizedName": "Proportion",
                "rmType": "DV_PROPORTION",
                "nodeId": "at0026",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "Proportion",
                  "sl": "*Proportion(en)"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0026]/value",
                "inputs": [
                  {
                    "suffix": "numerator",
                    "type": "DECIMAL",
                    "defaultValue": 1
                  },
                  {
                    "suffix": "denominator",
                    "type": "DECIMAL",
                    "validation": {
                      "range": {
                        "minOp": ">=",
                        "min": 100,
                        "maxOp": "<=",
                        "max": 100
                      }
                    },
                    "defaultValue": 2
                  }
                ],
                "formId": "encounter/testing/proportion",
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
                "name": "ProportionMulti",
                "localizedName": "ProportionMulti",
                "rmType": "DV_PROPORTION",
                "nodeId": "at0032",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "ProportionMulti",
                  "sl": "*ProportionMulti(en)"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0032]/value",
                "inputs": [
                  {
                    "suffix": "numerator",
                    "type": "DECIMAL",
                    "defaultValue": 50
                  },
                  {
                    "suffix": "denominator",
                    "type": "DECIMAL",
                    "defaultValue": 100
                  }
                ],
                "formId": "encounter/testing/proportionmulti",
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
                "name": "ProportionPrec1",
                "localizedName": "ProportionPrec1",
                "rmType": "DV_PROPORTION",
                "nodeId": "at0033",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "ProportionPrec1",
                  "sl": "*ProportionPrec1(en)"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0033]/value",
                "inputs": [
                  {
                    "suffix": "numerator",
                    "type": "DECIMAL",
                    "validation": {
                      "range": {
                        "minOp": ">=",
                        "min": 7,
                        "maxOp": "<=",
                        "max": 77
                      }
                    },
                    "defaultValue": 11
                  },
                  {
                    "suffix": "denominator",
                    "type": "DECIMAL",
                    "validation": {
                      "range": {
                        "minOp": ">=",
                        "min": 100,
                        "maxOp": "<=",
                        "max": 100
                      }
                    },
                    "defaultValue": 111
                  }
                ],
                "formId": "encounter/testing/proportionprec1",
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
                "name": "ProportionInt",
                "localizedName": "ProportionInt",
                "rmType": "DV_PROPORTION",
                "nodeId": "at0034",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "ProportionInt",
                  "sl": "*ProportionInt(en)"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0034]/value",
                "inputs": [
                  {
                    "suffix": "numerator",
                    "type": "INTEGER",
                    "validation": {
                      "range": {
                        "minOp": ">=",
                        "min": 5,
                        "maxOp": "<=",
                        "max": 50
                      }
                    },
                    "defaultValue": 30
                  },
                  {
                    "suffix": "denominator",
                    "type": "INTEGER",
                    "validation": {
                      "range": {
                        "minOp": ">=",
                        "min": 100,
                        "maxOp": "<=",
                        "max": 100
                      }
                    },
                    "defaultValue": 60
                  }
                ],
                "formId": "encounter/testing/proportionint",
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
                "name": "Identifier",
                "localizedName": "Identifier",
                "rmType": "DV_IDENTIFIER",
                "nodeId": "at0027",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "Identifier",
                  "sl": "*Identifier(en)"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0027]/value",
                "inputs": [
                  {
                    "suffix": "id",
                    "type": "TEXT",
                    "listOpen": false,
                    "validation": {
                      "pattern": "assign.*"
                    }
                  },
                  {
                    "suffix": "type",
                    "type": "TEXT",
                    "listOpen": false,
                    "validation": {
                      "pattern": "type.*"
                    }
                  },
                  {
                    "suffix": "issuer",
                    "type": "TEXT",
                    "listOpen": false,
                    "validation": {
                      "pattern": "ukc.*"
                    }
                  },
                  {
                    "suffix": "assigner",
                    "type": "TEXT"
                  }
                ],
                "formId": "encounter/testing/identifier",
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
                    "id": {
                      "presentation": "textfield"
                    },
                    "type": {
                      "presentation": "textfield"
                    },
                    "issuer": {
                      "presentation": "textfield"
                    },
                    "assigner": {
                      "presentation": "textfield"
                    }
                  }
                }
              },
              {
                "name": "Parsable",
                "localizedName": "Parsable",
                "rmType": "DV_PARSABLE",
                "nodeId": "at0028",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "Parsable",
                  "sl": "*Parsable(en)"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0028]/value",
                "inputs": [
                  {
                    "type": "TEXT"
                  }
                ],
                "formId": "encounter/testing/parsable",
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
                      "presentation": "textfield"
                    }
                  }
                }
              },
              {
                "name": "Date",
                "localizedName": "Date",
                "rmType": "DV_DATE",
                "nodeId": "at0035",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "Date",
                  "sl": "*Date(en)"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0035]/value",
                "inputs": [
                  {
                    "type": "DATE",
                    "defaultValue": "2015-09-26"
                  }
                ],
                "formId": "encounter/testing/date",
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
              },
              {
                "name": "Time",
                "localizedName": "Time",
                "rmType": "DV_TIME",
                "nodeId": "at0036",
                "min": 0,
                "max": 1,
                "localizedNames": {
                  "en": "Time",
                  "sl": "*Time(en)"
                },
                "localizedDescriptions": {
                  "en": "*",
                  "sl": "**(en)"
                },
                "aqlPath": "/content[openEHR-EHR-EVALUATION.testing.v2]/data[at0001]/items[at0036]/value",
                "inputs": [
                  {
                    "type": "TIME",
                    "defaultValue": "18:22:16"
                  }
                ],
                "formId": "encounter/testing/time",
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
          }
        ]
      };

      var deps:any = [
        {
          "field": "encounter/testing/text",
          "conditions": [
            {
              "operator": "equals",
              "value": {
                "value": "set"
              },
              "actions": [
                {
                  "action": "set",
                  "target": "encounter/testing/quantity",
                  "value": {
                    "magnitude": 50,
                    "unit": "mm[Hg]"
                  }
                },
                {
                  "action": "set",
                  "target": "encounter/testing/count",
                  "value": {
                    "value": 55
                  }
                },
                {
                  "action": "set",
                  "target": "encounter/testing/datetime",
                  "value": {
                    "value": "2015-11-17T04:27:08"
                  }
                },
                {
                  "action": "set",
                  "target": "encounter/testing/duration",
                  "value": {
                    "year": 8,
                    "month": 9,
                    "day": 10,
                    "week": 11,
                    "hour": 12,
                    "minute": 13,
                    "second": 14
                  }
                },
                {
                  "action": "set",
                  "target": "encounter/testing/ordinal",
                  "value": {
                    "value": "at0029"
                  }
                },
                {
                  "action": "set",
                  "target": "encounter/testing/boolean",
                  "value": {
                    "value": false
                  }
                },
                {
                  "action": "set",
                  "target": "encounter/testing/intervalquantity/upper",
                  "value": {
                    "magnitude": 44,
                    "unit": "mm[Hg]"
                  }
                },
                {
                  "action": "set",
                  "target": "encounter/testing/intervalquantity/lower",
                  "value": {
                    "magnitude": 33,
                    "unit": "mm[Hg]"
                  }
                },
                {
                  "action": "set",
                  "target": "encounter/testing/intervalcount/upper",
                  "value": {
                    "value": 88
                  }
                },
                {
                  "action": "set",
                  "target": "encounter/testing/intervalcount/lower",
                  "value": {
                    "value": 77
                  }
                },
                {
                  "action": "set",
                  "target": "encounter/testing/intervaldatetime/upper",
                  "value": {
                    "value": "2015-08-05T04:20:27"
                  }
                },
                {
                  "action": "set",
                  "target": "encounter/testing/intervaldatetime/lower",
                  "value": {
                    "value": "2015-06-03T06:19:43"
                  }
                },
                {
                  "action": "set",
                  "target": "encounter/testing/uri",
                  "value": {
                    "value": "uu123"
                  }
                },
                {
                  "action": "set",
                  "target": "encounter/testing/ehruri",
                  "value": {
                    "value": "ee123"
                  }
                },
                {
                  "action": "set",
                  "target": "encounter/testing/proportion",
                  "value": {
                    "numerator": 6,
                    "denominator": 8
                  }
                },
                {
                  "action": "set",
                  "target": "encounter/testing/proportionmulti",
                  "value": {
                    "numerator": 66,
                    "denominator": 222
                  }
                },
                {
                  "action": "set",
                  "target": "encounter/testing/proportionprec1",
                  "value": {
                    "numerator": 77,
                    "denominator": 777
                  }
                },
                {
                  "action": "set",
                  "target": "encounter/testing/proportionint",
                  "value": {
                    "numerator": 55,
                    "denominator": 555
                  }
                },
                {
                  "action": "set",
                  "target": "encounter/testing/date",
                  "value": {
                    "value": "2015-12-18"
                  }
                },
                {
                  "action": "set",
                  "target": "encounter/testing/time",
                  "value": {
                    "value": "14:13:24"
                  }
                }
              ]
            }
          ]
        },
        {
          "field": "encounter/testing/text",
          "conditions": [
            {
              "operator": "equals",
              "value": {
                "value": "reset"
              },
              "actions": [
                {
                  "action": "reset",
                  "target": "encounter/testing/text",
                  "value": {
                    "value": "reset"
                  }
                },
                {
                  "action": "reset",
                  "target": "encounter/testing/quantity",
                  "value": {
                    "magnitude": 50,
                    "unit": ""
                  }
                },
                {
                  "action": "reset",
                  "target": "encounter/testing/count",
                  "value": {
                    "value": 55
                  }
                },
                {
                  "action": "reset",
                  "target": "encounter/testing/datetime",
                  "value": {
                    "value": "2015-11-17T04:27:08"
                  }
                },
                {
                  "action": "reset",
                  "target": "encounter/testing/duration",
                  "value": {
                    "year": 8,
                    "month": 9,
                    "day": 10,
                    "week": 11,
                    "hour": 12,
                    "minute": 13,
                    "second": 14
                  }
                },
                {
                  "action": "reset",
                  "target": "encounter/testing/ordinal",
                  "value": {
                    "value": "at0029"
                  }
                },
                {
                  "action": "reset",
                  "target": "encounter/testing/boolean",
                  "value": {
                    "value": false
                  }
                },
                {
                  "action": "reset",
                  "target": "encounter/testing/intervalquantity/upper",
                  "value": {
                    "magnitude": 44,
                    "unit": ""
                  }
                },
                {
                  "action": "reset",
                  "target": "encounter/testing/intervalquantity/lower",
                  "value": {
                    "magnitude": 33,
                    "unit": ""
                  }
                },
                {
                  "action": "reset",
                  "target": "encounter/testing/intervalcount/upper",
                  "value": {
                    "value": 88
                  }
                },
                {
                  "action": "reset",
                  "target": "encounter/testing/intervalcount/lower",
                  "value": {
                    "value": 77
                  }
                },
                {
                  "action": "reset",
                  "target": "encounter/testing/intervaldatetime/upper",
                  "value": {
                    "value": "2015-08-05T04:20:27"
                  }
                },
                {
                  "action": "reset",
                  "target": "encounter/testing/intervaldatetime/lower",
                  "value": {
                    "value": "2015-06-03T06:19:43"
                  }
                },
                {
                  "action": "reset",
                  "target": "encounter/testing/uri",
                  "value": {
                    "value": "uu123"
                  }
                },
                {
                  "action": "reset",
                  "target": "encounter/testing/ehruri",
                  "value": {
                    "value": "ee123"
                  }
                },
                {
                  "action": "reset",
                  "target": "encounter/testing/proportion",
                  "value": {
                    "numerator": 6,
                    "denominator": 8
                  }
                },
                {
                  "action": "reset",
                  "target": "encounter/testing/proportionmulti",
                  "value": {
                    "numerator": 66,
                    "denominator": 222
                  }
                },
                {
                  "action": "reset",
                  "target": "encounter/testing/proportionprec1",
                  "value": {
                    "numerator": 17,
                    "denominator": 777
                  }
                },
                {
                  "action": "reset",
                  "target": "encounter/testing/proportionint",
                  "value": {
                    "numerator": 20,
                    "denominator": 555
                  }
                },
                {
                  "action": "reset",
                  "target": "encounter/testing/date",
                  "value": {
                    "value": "2015-12-18"
                  }
                },
                {
                  "action": "reset",
                  "target": "encounter/testing/time",
                  "value": {
                    "value": "14:13:24"
                  }
                }
              ]
            }
          ]
        }
      ];

      var values = {};

      var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, values, deps);
      var ast = rm.getDependencyNode();
      expect(ast instanceof Ast).toBeTruthy();
      ast.process({});

      var cmText = rm.findSuccessorWithPath("encounter/testing/text") as TextFieldModel;
      expect(cmText).toBeTruthy();
      expect(cmText.textValue()).toBe('se');
      cmText.textValue("txt");
      expect(cmText.textValue()).toBe('txt');

      var cmQuantity = rm.findSuccessorWithPath("encounter/testing/quantity") as QuantityFieldModel;
      expect(cmQuantity).toBeTruthy();
      expect(cmQuantity.magnitudeValue()).toBe(1202);
      cmQuantity.magnitudeValue(999);
      expect(cmQuantity.magnitudeValue()).toBe( 999 );

      var cmCount=rm.findSuccessorWithPath("encounter/testing/count") as CountFieldModel;
      expect(cmCount).toBeTruthy();
      expect(cmCount.countValue()).toBe(2);
      cmCount.countValue(6);
      expect(cmCount.countValue()).toBe(6);

      var cmDateTime=rm.findSuccessorWithPath("encounter/testing/datetime") as DateTimeFieldModel;
      expect(cmDateTime).toBeTruthy();
      expect(cmDateTime.dateTimeValue()).toBe("2015-09-23T04:27:08");
      cmDateTime.dateTimeValue('2016-09-21T04:27:08');
      expect(cmDateTime.dateTimeValue()).toBe("2016-09-21T04:27:08.000+02:00");

      var cmDuration=rm.findSuccessorWithPath("encounter/testing/duration") as DurationFieldModel;
      expect(cmDuration).toBeTruthy();
      expect(cmDuration.durationValue()).toBe('P1Y2M4W3DT5H6M7S');
      cmDuration.durationValue('P2Y4M4W2DT5H6M7S');
      expect(cmDuration.durationValue()).toBe('P2Y4M4W2DT5H6M7S');

      var cmOrdinal=rm.findSuccessorWithPath("encounter/testing/ordinal") as CodedTextFieldModel;
      expect(cmOrdinal).toBeTruthy();
      expect(cmOrdinal.codeValue()).toBe('at0030');
      cmOrdinal.codeValue('at0029');
      expect(cmOrdinal.codeValue()).toBe('at0029');

      var cmBoolean=rm.findSuccessorWithPath("encounter/testing/boolean") as BooleanFieldModel;
      expect(cmBoolean).toBeTruthy();
      expect(cmBoolean.booleanValue()).toBe(true);

      var cmIntervalQUpper=rm.findSuccessorWithPath("encounter/testing/intervalquantity/upper") as QuantityFieldModel;
      expect(cmIntervalQUpper).toBeTruthy();
      expect(cmIntervalQUpper.magnitudeValue()).toBe(333);
      cmIntervalQUpper.magnitudeValue(444);
      expect(cmIntervalQUpper.magnitudeValue()).toBe(444);

      var cmIntervalQLower=rm.findSuccessorWithPath("encounter/testing/intervalquantity/lower") as QuantityFieldModel;
      expect(cmIntervalQLower).toBeTruthy();
      expect(cmIntervalQLower.magnitudeValue()).toBe(444);
      cmIntervalQUpper.magnitudeValue(555);
      expect(cmIntervalQUpper.magnitudeValue()).toBe(555);

      var cmIntervalCUpper=rm.findSuccessorWithPath("encounter/testing/intervalcount/upper") as CountFieldModel;
      expect(cmIntervalCUpper).toBeTruthy();
      expect(cmIntervalCUpper.countValue()).toBe(10);
      cmIntervalCUpper.countValue(15);
      expect(cmIntervalCUpper.countValue()).toBe(15);

      var cmIntervalCLower=rm.findSuccessorWithPath("encounter/testing/intervalcount/lower") as CountFieldModel;
      expect(cmIntervalCLower).toBeTruthy();
      expect(cmIntervalCLower.countValue()).toBe(8);
      cmIntervalCLower.countValue(88);
      expect(cmIntervalCLower.countValue()).toBe(88);

      var cmUri:any=rm.findSuccessorWithPath("encounter/testing/uri");
      expect(cmUri).toBeTruthy();
      expect(cmUri.uriValue()).toBe('uu');
      cmUri.uriValue('uurii');
      expect(cmUri.uriValue()).toBe('uurii');

      var cmEhrUri:any=rm.findSuccessorWithPath("encounter/testing/ehruri");
      expect(cmEhrUri).toBeTruthy();
      expect(cmEhrUri.ehrUriValue()).toBe('ee');
      cmEhrUri.ehrUriValue('ehhhrruu');
      expect(cmEhrUri.ehrUriValue()).toBe('ehhhrruu');

      var cmProportion:any=rm.findSuccessorWithPath("encounter/testing/proportion");
      expect(cmProportion).toBeTruthy();
      expect(cmProportion.denominatorValue()).toBe(100);
      expect(cmProportion.numeratorValue()).toBe(1);
      expect(cmProportion.denominatorValue(55)).toBe(100);
      expect(cmProportion.denominatorValue()).toBe(100);
      cmProportion.numeratorValue(56);
      expect(cmProportion.denominatorValue()).toBe(100);
      expect(cmProportion.numeratorValue()).toBe(56);

      var cmProportionMulti:any=rm.findSuccessorWithPath("encounter/testing/proportionmulti");
      expect(cmProportionMulti).toBeTruthy();
      expect(cmProportionMulti.denominatorValue()).toBe(100);
      expect(cmProportionMulti.numeratorValue()).toBe(50);
      cmProportionMulti.denominatorValue(77);
      cmProportionMulti.numeratorValue(777);
      expect(cmProportionMulti.denominatorValue()).toBe(77);
      expect(cmProportionMulti.numeratorValue()).toBe(777);

      var cmDate:any=rm.findSuccessorWithPath("encounter/testing/date");
      expect(cmDate).toBeTruthy();
      expect(cmDate.dateValue()).toBe('2015-09-26');
      cmDate.dateValue('2015-09-21');
      expect(cmDate.dateValue()).toBe('2015-09-21');

      var cmTime:any=rm.findSuccessorWithPath("encounter/testing/time");
      expect(cmTime).toBeTruthy();
      expect(cmTime.timeValue()).toBe('18:22:16');
      cmTime.timeValue('08:02:06');
      expect(cmTime.timeValue()).toBe('08:02:06');


      cmText.setValue('reset');
      expect(cmText.textValue()).toBe('reset');
      ast.process({});


      expect(cmText.textValue()).toBe('se');
      expect(cmQuantity.magnitudeValue()).toBe(1202);

      expect(cmCount.countValue()).toBe(2);
      expect(cmDateTime.dateTimeValue()).toBe("2015-09-23T04:27:08.000+02:00");
      expect(cmDuration.durationValue()).toBe('P1Y2M4W3DT5H6M7S');
      expect(cmOrdinal.codeValue()).toBe('at0030');
      expect(cmBoolean.booleanValue()).toBe(true);
      expect(cmIntervalQUpper.magnitudeValue()).toBe(333);
      expect(cmIntervalQLower.magnitudeValue()).toBe(444);
      expect(cmIntervalCUpper.countValue()).toBe(10);
      expect(cmIntervalCLower.countValue()).toBe(8);
      expect(cmUri.uriValue()).toBe('uu');
      expect(cmEhrUri.ehrUriValue()).toBe('ee');
      expect(cmProportion.denominatorValue()).toBe(100);
      expect(cmProportion.numeratorValue()).toBe(1);
      expect(cmProportionMulti.denominatorValue()).toBe(100);
      expect(cmProportionMulti.numeratorValue()).toBe(50);
      expect(cmDate.dateValue()).toBe('2015-09-26');
      expect(cmTime.timeValue()).toBe('18:22:16');

    });

    it("Dependency - Container Clear ", function () {
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
            "name": "Comment",
            "localizedName": "Comment",
            "rmType": "DV_TEXT",
            "nodeId": "at0011",
            "min": 0,
            "max": 1,
            "dependsOn": [
              "any_event"
            ],
            "localizedNames": {
              "en": "Comment",
              "sl": "Opombe"
            },
            "localizedDescriptions": {
              "en": "Comment about the Body Mass Index measurement eg noting that the measurements used were adjusted weight/height.",
              "sl": "Opombe"
            },
            "aqlPath": "/content[openEHR-EHR-OBSERVATION.body_mass_index.v1]/protocol[at0005]/items[at0011]/value",
            "inputs": [
              {
                "type": "TEXT"
              }
            ],
            "formId": "vital_signs/body_mass_index/comment",
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
                "input": {
                  "presentation": "textfield"
                }
              }
            }
          },
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
            "formId": "generic-field-42517",
            "inputs": [
              {
                "type": "TEXT"
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
              }
            },
            "children": [
              {
                "name": "Body temperature",
                "localizedName": "Body temperature",
                "rmType": "OBSERVATION",
                "nodeId": "openEHR-EHR-OBSERVATION.body_temperature.v1",
                "min": "0",
                "max": "100",
                "localizedNames": {
                  "en": "Body temperature",
                  "sl": "Telesna temperature"
                },
                "localizedDescriptions": {
                  "en": "A measurement of the body temperature, which is a surrogate for the whole body temperature of the person.",
                  "sl": "*A measurement of the body temperature, which is a surrogate for the whole body temperature of the person.(en)"
                },
                "aqlPath": "/content[openEHR-EHR-OBSERVATION.body_temperature.v1]",
                "inputs": [
                  {
                    "type": "TEXT"
                  }
                ],
                "formId": "vital_signs/body_temperature",
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
                    "multi"
                  ]
                },
                "children": [
                  {
                    "name": "Any event",
                    "localizedName": "Any event",
                    "rmType": "EVENT",
                    "nodeId": "at0003",
                    "min": 0,
                    "max": -1,
                    "localizedNames": {
                      "en": "Any event",
                      "sl": "Any event"
                    },
                    "localizedDescriptions": {
                      "en": "Any event",
                      "sl": "*Any event(en)"
                    },
                    "aqlPath": "/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]",
                    "formId": "vital_signs/body_temperature/any_event",
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
                        "name": "Temperature",
                        "localizedName": "Temperature",
                        "rmType": "DV_QUANTITY",
                        "nodeId": "at0004",
                        "min": 1,
                        "max": 1,
                        "localizedNames": {
                          "en": "Temperature",
                          "sl": "Telesna temperature"
                        },
                        "localizedDescriptions": {
                          "en": "The measured body temperature (as a surrogate for the whole body)",
                          "sl": "*The measured body temperature (as a surrogate for the whole body)(en)"
                        },
                        "aqlPath": "/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value",
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
                                    "minOp": ">=",
                                    "min": 1,
                                    "maxOp": "<=",
                                    "max": 1
                                  }
                                }
                              },
                              {
                                "value": "°F",
                                "label": "°F",
                                "validation": {
                                  "precision": {
                                    "minOp": ">=",
                                    "min": 1,
                                    "maxOp": "<=",
                                    "max": 1
                                  }
                                }
                              }
                            ]
                          }
                        ],
                        "formId": "vital_signs/body_temperature/any_event/temperature",
                        "viewConfig": {
                          "field": {
                            "unit": {
                              "presentation": "combobox"
                            }
                          },
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
                        "name": "Body exposure",
                        "localizedName": "Body exposure",
                        "rmType": "DV_CODED_TEXT",
                        "nodeId": "at0030",
                        "min": 0,
                        "max": 1,
                        "dependsOn": [
                          "temperature"
                        ],
                        "localizedNames": {
                          "en": "Body exposure",
                          "sl": "Obleka"
                        },
                        "localizedDescriptions": {
                          "en": "The thermal situation of the person who is having the temperature taken",
                          "sl": "*The thermal situation of the person who is having the temperature taken(en)"
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
                                  "en": "Naked",
                                  "sl": "Gol"
                                },
                                "localizedDescriptions": {
                                  "en": "No clothing, bedding or covering",
                                  "sl": "*No clothing, bedding or covering(en)"
                                }
                              },
                              {
                                "value": "at0032",
                                "label": "Reduced clothing/bedding",
                                "localizedLabels": {
                                  "en": "Reduced clothing/bedding",
                                  "sl": "Premalo oblečen (zavit)"
                                },
                                "localizedDescriptions": {
                                  "en": "The person is covered by a lesser amount of clothing or bedding than deemed appropriate for the environmental circumstances",
                                  "sl": "*The person is covered by a lesser amount of clothing or bedding than deemed appropriate for the environmental circumstances(en)"
                                }
                              },
                              {
                                "value": "at0033",
                                "label": "Appropriate clothing/bedding",
                                "localizedLabels": {
                                  "en": "Appropriate clothing/bedding",
                                  "sl": "Primerno oblečen (zavit)"
                                },
                                "localizedDescriptions": {
                                  "en": "The person is covered by an amount of clothing or bedding deemed appropriate for the environmental circumstances",
                                  "sl": "*The person is covered by an amount of clothing or bedding deemed appropriate for the environmental circumstances(en)"
                                }
                              },
                              {
                                "value": "at0034",
                                "label": "Increased clothing/bedding",
                                "localizedLabels": {
                                  "en": "Increased clothing/bedding",
                                  "sl": "Preveč oblečen (zavit)"
                                },
                                "localizedDescriptions": {
                                  "en": "The person is covered by an increased amount of clothing or bedding than deemed appropriate for the environmental circumstances",
                                  "sl": "*The person is covered by an increased amount of clothing or bedding than deemed appropriate for the environmental circumstances(en)"
                                }
                              }
                            ],
                            "defaultValue": "at0033"
                          }
                        ],
                        "formId": "vital_signs/body_temperature/any_event/body_exposure",
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
                        "name": "Description of thermal stress",
                        "localizedName": "Description of thermal stress",
                        "rmType": "DV_TEXT",
                        "nodeId": "at0041",
                        "min": 0,
                        "max": 1,
                        "dependsOn": [
                          "temperature"
                        ],
                        "localizedNames": {
                          "en": "Description of thermal stress",
                          "sl": "Opis"
                        },
                        "localizedDescriptions": {
                          "en": "Description of the conditions applied to the subject that might influence their measured body temperature.",
                          "sl": "*Description of the conditions applied to the subject that might influence their measured body temperature.(en)"
                        },
                        "aqlPath": "/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]/state[at0029]/items[at0041]/value",
                        "inputs": [
                          {
                            "type": "TEXT",
                            "defaultValue": "defVal"
                          }
                        ],
                        "formId": "vital_signs/body_temperature/any_event/description_of_thermal_stress",
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
                            "input": {
                              "presentation": "textfield"
                            }
                          }
                        }
                      }
                    ]
                  },
                  {
                    "name": "Site of measurement",
                    "localizedName": "Site of measurement",
                    "rmType": "DV_CODED_TEXT",
                    "nodeId": "at0021",
                    "min": 0,
                    "max": 1,
                    "dependsOn": [
                      "any_event"
                    ],
                    "localizedNames": {
                      "en": "Site of measurement",
                      "sl": "Stran telesa"
                    },
                    "localizedDescriptions": {
                      "en": "The anatomical site of measurement of the temperature",
                      "sl": "*The anatomical site of measurement of the temperature(en)"
                    },
                    "aqlPath": "/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/protocol[at0020]/items[at0021]/value",
                    "inputs": [
                      {
                        "suffix": "code",
                        "type": "CODED_TEXT",
                        "list": [
                          {
                            "value": "at0022",
                            "label": "Mouth",
                            "localizedLabels": {
                              "en": "Mouth",
                              "sl": "Usta"
                            },
                            "localizedDescriptions": {
                              "en": "Temperature is measured within the mouth",
                              "sl": "*Temperature is measured within the mouth(en)"
                            }
                          },
                          {
                            "value": "at0023",
                            "label": "Ear canal",
                            "localizedLabels": {
                              "en": "Ear canal",
                              "sl": "V ušesu"
                            },
                            "localizedDescriptions": {
                              "en": "Temperature is measured from within the external auditory canal",
                              "sl": "*Temperature is measured from within the external auditory canal(en)"
                            }
                          },
                          {
                            "value": "at0024",
                            "label": "Axilla",
                            "localizedLabels": {
                              "en": "Axilla",
                              "sl": "Pod pazduho"
                            },
                            "localizedDescriptions": {
                              "en": "Temperature is measured from the skin of the axilla with the arm positioned down by the side",
                              "sl": "*Temperature is measured from the skin of the axilla with the arm positioned down by the side(en)"
                            }
                          },
                          {
                            "value": "at0025",
                            "label": "Rectum",
                            "localizedLabels": {
                              "en": "Rectum",
                              "sl": "Rektalno"
                            },
                            "localizedDescriptions": {
                              "en": "Temperature measured within the rectum",
                              "sl": "*Temperature measured within the rectum(en)"
                            }
                          },
                          {
                            "value": "at0026",
                            "label": "Nasopharynx",
                            "localizedLabels": {
                              "en": "Nasopharynx",
                              "sl": "Nazofarinks"
                            },
                            "localizedDescriptions": {
                              "en": "Temperature is measured within the nasopharynx",
                              "sl": "*Temperature is measured within the nasopharynx(en)"
                            }
                          },
                          {
                            "value": "at0027",
                            "label": "Urinary bladder",
                            "localizedLabels": {
                              "en": "Urinary bladder",
                              "sl": "Sečni mehur"
                            },
                            "localizedDescriptions": {
                              "en": "Temperature is measured in the urinary bladder",
                              "sl": "*Temperature is measured in the urinary bladder(en)"
                            }
                          },
                          {
                            "value": "at0028",
                            "label": "Intravascular",
                            "localizedLabels": {
                              "en": "Intravascular",
                              "sl": "Intravaskularno"
                            },
                            "localizedDescriptions": {
                              "en": "Temperature is measured within the vascular system",
                              "sl": "*Temperature is measured within the vascular system(en)"
                            }
                          },
                          {
                            "value": "at0043",
                            "label": "Skin",
                            "localizedLabels": {
                              "en": "Skin",
                              "sl": "Na koži"
                            },
                            "localizedDescriptions": {
                              "en": "Temperature is measured from exposed skin",
                              "sl": "*Temperature is measured from exposed skin(en)"
                            }
                          },
                          {
                            "value": "at0051",
                            "label": "Vagina",
                            "localizedLabels": {
                              "en": "Vagina",
                              "sl": "Vaginalno"
                            },
                            "localizedDescriptions": {
                              "en": "Temperature is measured within the vagina",
                              "sl": "*Temperature is measured within the vagina(en)"
                            }
                          },
                          {
                            "value": "at0054",
                            "label": "Oesophagus",
                            "localizedLabels": {
                              "en": "Oesophagus",
                              "sl": "V požiralniku"
                            },
                            "localizedDescriptions": {
                              "en": "Temperatue is measured within the oesophagus",
                              "sl": "*Temperatue is measured within the oesophagus(en)"
                            }
                          },
                          {
                            "value": "at0055",
                            "label": "Inguinal skin crease",
                            "localizedLabels": {
                              "en": "Inguinal skin crease",
                              "sl": "V ustih"
                            },
                            "localizedDescriptions": {
                              "en": "Temperature is measured in the inguinal skin crease between the leg and abdominal wall",
                              "sl": "*Temperature is measured in the inguinal skin crease between the leg and abdominal wall(en)"
                            }
                          }
                        ]
                      }
                    ],
                    "formId": "vital_signs/body_temperature/site_of_measurement",
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
              }
            ]
          }
        ]
      };

      var deps:any = [
        {
          "field": "vital_signs/body_mass_index/comment",
          "conditions": [
            {
              "operator": "equals",
              "value": {
                "value": "hide"
              },
              "actions": [
                {
                  "action": "hide",
                  "target": "vital_signs/body_temperature",
                  "value": {
                    "value": ""
                  }
                }
              ]
            },
            {
              "operator": "equals",
              "value": {
                "value": "show"
              },
              "actions": [
                {
                  "action": "show",
                  "target": "vital_signs/body_temperature",
                  "value": {
                    "value": ""
                  }
                }
              ]
            },
            {
              "operator": "equals",
              "value": {
                "value": "clear"
              },
              "actions": [
                {
                  "action": "clear",
                  "target": "generic-field-42517",
                  "value": {
                    "value": ""
                  }
                }
              ]
            },
            {
              "operator": "equals",
              "value": {
                "value": "reset"
              },
              "actions": [
                {
                  "action": "reset",
                  "target": "generic-field-42517",
                  "value": {
                    "value": ""
                  }
                }
              ]
            }
          ]
        }
      ];

      var values = {};

      var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, values, deps);
      var ast = rm.getDependencyNode();
      expect(ast instanceof Ast).toBeTruthy();
      ast.process({});

      var dependanciesTrigger:any = rm.findSuccessorWithPath("vital_signs/body_mass_index/comment");
      var checkDefaultModel:any = rm.findSuccessorWithPath("vital_signs/body_temperature/any_event/description_of_thermal_stress");
      var multiContainerModel:any = rm.findSuccessorWithPath("vital_signs/body_temperature");
      expect(multiContainerModel).toBeTruthy();
      expect(multiContainerModel.isMulti()).toBeTruthy();

      expect(dependanciesTrigger.textValue()).toBe(null);
      expect(checkDefaultModel.textValue()).toBe("defVal");
      var container2 = (new ThinkEhrModelParser(rmTypeModelDictionary) ).duplicateModel(multiContainerModel, multiContainerModel);
      expect(rm.findSuccessorsWithPath(container2.getPath()).length).toBe(2);
      dependanciesTrigger.textValue('clear');
      ast.process({});

      expect(dependanciesTrigger.textValue()).toBe("clear");
      expect(checkDefaultModel.textValue()).toBe(null);
      expect(rm.findSuccessorsWithPath(container2.getPath()).length).toBe(2);

    });

    it("Dependency - Container Reset ", function () {

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
            "name": "Comment",
            "localizedName": "Comment",
            "rmType": "DV_TEXT",
            "nodeId": "at0011",
            "min": 0,
            "max": 1,
            "dependsOn": [
              "any_event"
            ],
            "localizedNames": {
              "en": "Comment",
              "sl": "Opombe"
            },
            "localizedDescriptions": {
              "en": "Comment about the Body Mass Index measurement eg noting that the measurements used were adjusted weight/height.",
              "sl": "Opombe"
            },
            "aqlPath": "/content[openEHR-EHR-OBSERVATION.body_mass_index.v1]/protocol[at0005]/items[at0011]/value",
            "inputs": [
              {
                "type": "TEXT"
              }
            ],
            "formId": "vital_signs/body_mass_index/comment",
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
                "input": {
                  "presentation": "textfield"
                }
              }
            }
          },
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
            "formId": "generic-field-42517",
            "inputs": [
              {
                "type": "TEXT"
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
              }
            },
            "children": [
              {
                "name": "Body temperature",
                "localizedName": "Body temperature",
                "rmType": "OBSERVATION",
                "nodeId": "openEHR-EHR-OBSERVATION.body_temperature.v1",
                "min": "0",
                "max": "100",
                "localizedNames": {
                  "en": "Body temperature",
                  "sl": "Telesna temperature"
                },
                "localizedDescriptions": {
                  "en": "A measurement of the body temperature, which is a surrogate for the whole body temperature of the person.",
                  "sl": "*A measurement of the body temperature, which is a surrogate for the whole body temperature of the person.(en)"
                },
                "aqlPath": "/content[openEHR-EHR-OBSERVATION.body_temperature.v1]",
                "inputs": [
                  {
                    "type": "TEXT"
                  }
                ],
                "formId": "vital_signs/body_temperature",
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
                    "multi"
                  ]
                },
                "children": [
                  {
                    "name": "Any event",
                    "localizedName": "Any event",
                    "rmType": "EVENT",
                    "nodeId": "at0003",
                    "min": 0,
                    "max": -1,
                    "localizedNames": {
                      "en": "Any event",
                      "sl": "Any event"
                    },
                    "localizedDescriptions": {
                      "en": "Any event",
                      "sl": "*Any event(en)"
                    },
                    "aqlPath": "/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]",
                    "formId": "vital_signs/body_temperature/any_event",
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
                        "name": "Temperature",
                        "localizedName": "Temperature",
                        "rmType": "DV_QUANTITY",
                        "nodeId": "at0004",
                        "min": 1,
                        "max": 1,
                        "localizedNames": {
                          "en": "Temperature",
                          "sl": "Telesna temperature"
                        },
                        "localizedDescriptions": {
                          "en": "The measured body temperature (as a surrogate for the whole body)",
                          "sl": "*The measured body temperature (as a surrogate for the whole body)(en)"
                        },
                        "aqlPath": "/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value",
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
                                    "minOp": ">=",
                                    "min": 1,
                                    "maxOp": "<=",
                                    "max": 1
                                  }
                                }
                              },
                              {
                                "value": "°F",
                                "label": "°F",
                                "validation": {
                                  "precision": {
                                    "minOp": ">=",
                                    "min": 1,
                                    "maxOp": "<=",
                                    "max": 1
                                  }
                                }
                              }
                            ]
                          }
                        ],
                        "formId": "vital_signs/body_temperature/any_event/temperature",
                        "viewConfig": {
                          "field": {
                            "unit": {
                              "presentation": "combobox"
                            }
                          },
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
                        "name": "Body exposure",
                        "localizedName": "Body exposure",
                        "rmType": "DV_CODED_TEXT",
                        "nodeId": "at0030",
                        "min": 0,
                        "max": 1,
                        "dependsOn": [
                          "temperature"
                        ],
                        "localizedNames": {
                          "en": "Body exposure",
                          "sl": "Obleka"
                        },
                        "localizedDescriptions": {
                          "en": "The thermal situation of the person who is having the temperature taken",
                          "sl": "*The thermal situation of the person who is having the temperature taken(en)"
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
                                  "en": "Naked",
                                  "sl": "Gol"
                                },
                                "localizedDescriptions": {
                                  "en": "No clothing, bedding or covering",
                                  "sl": "*No clothing, bedding or covering(en)"
                                }
                              },
                              {
                                "value": "at0032",
                                "label": "Reduced clothing/bedding",
                                "localizedLabels": {
                                  "en": "Reduced clothing/bedding",
                                  "sl": "Premalo oblečen (zavit)"
                                },
                                "localizedDescriptions": {
                                  "en": "The person is covered by a lesser amount of clothing or bedding than deemed appropriate for the environmental circumstances",
                                  "sl": "*The person is covered by a lesser amount of clothing or bedding than deemed appropriate for the environmental circumstances(en)"
                                }
                              },
                              {
                                "value": "at0033",
                                "label": "Appropriate clothing/bedding",
                                "localizedLabels": {
                                  "en": "Appropriate clothing/bedding",
                                  "sl": "Primerno oblečen (zavit)"
                                },
                                "localizedDescriptions": {
                                  "en": "The person is covered by an amount of clothing or bedding deemed appropriate for the environmental circumstances",
                                  "sl": "*The person is covered by an amount of clothing or bedding deemed appropriate for the environmental circumstances(en)"
                                }
                              },
                              {
                                "value": "at0034",
                                "label": "Increased clothing/bedding",
                                "localizedLabels": {
                                  "en": "Increased clothing/bedding",
                                  "sl": "Preveč oblečen (zavit)"
                                },
                                "localizedDescriptions": {
                                  "en": "The person is covered by an increased amount of clothing or bedding than deemed appropriate for the environmental circumstances",
                                  "sl": "*The person is covered by an increased amount of clothing or bedding than deemed appropriate for the environmental circumstances(en)"
                                }
                              }
                            ],
                            "defaultValue": "at0033"
                          }
                        ],
                        "formId": "vital_signs/body_temperature/any_event/body_exposure",
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
                        "name": "Description of thermal stress",
                        "localizedName": "Description of thermal stress",
                        "rmType": "DV_TEXT",
                        "nodeId": "at0041",
                        "min": 0,
                        "max": 1,
                        "dependsOn": [
                          "temperature"
                        ],
                        "localizedNames": {
                          "en": "Description of thermal stress",
                          "sl": "Opis"
                        },
                        "localizedDescriptions": {
                          "en": "Description of the conditions applied to the subject that might influence their measured body temperature.",
                          "sl": "*Description of the conditions applied to the subject that might influence their measured body temperature.(en)"
                        },
                        "aqlPath": "/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]/state[at0029]/items[at0041]/value",
                        "inputs": [
                          {
                            "type": "TEXT",
                            "defaultValue": "defVal"
                          }
                        ],
                        "formId": "vital_signs/body_temperature/any_event/description_of_thermal_stress",
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
                            "input": {
                              "presentation": "textfield"
                            }
                          }
                        }
                      }
                    ]
                  },
                  {
                    "name": "Site of measurement",
                    "localizedName": "Site of measurement",
                    "rmType": "DV_CODED_TEXT",
                    "nodeId": "at0021",
                    "min": 0,
                    "max": 1,
                    "dependsOn": [
                      "any_event"
                    ],
                    "localizedNames": {
                      "en": "Site of measurement",
                      "sl": "Stran telesa"
                    },
                    "localizedDescriptions": {
                      "en": "The anatomical site of measurement of the temperature",
                      "sl": "*The anatomical site of measurement of the temperature(en)"
                    },
                    "aqlPath": "/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/protocol[at0020]/items[at0021]/value",
                    "inputs": [
                      {
                        "suffix": "code",
                        "type": "CODED_TEXT",
                        "list": [
                          {
                            "value": "at0022",
                            "label": "Mouth",
                            "localizedLabels": {
                              "en": "Mouth",
                              "sl": "Usta"
                            },
                            "localizedDescriptions": {
                              "en": "Temperature is measured within the mouth",
                              "sl": "*Temperature is measured within the mouth(en)"
                            }
                          },
                          {
                            "value": "at0023",
                            "label": "Ear canal",
                            "localizedLabels": {
                              "en": "Ear canal",
                              "sl": "V ušesu"
                            },
                            "localizedDescriptions": {
                              "en": "Temperature is measured from within the external auditory canal",
                              "sl": "*Temperature is measured from within the external auditory canal(en)"
                            }
                          },
                          {
                            "value": "at0024",
                            "label": "Axilla",
                            "localizedLabels": {
                              "en": "Axilla",
                              "sl": "Pod pazduho"
                            },
                            "localizedDescriptions": {
                              "en": "Temperature is measured from the skin of the axilla with the arm positioned down by the side",
                              "sl": "*Temperature is measured from the skin of the axilla with the arm positioned down by the side(en)"
                            }
                          },
                          {
                            "value": "at0025",
                            "label": "Rectum",
                            "localizedLabels": {
                              "en": "Rectum",
                              "sl": "Rektalno"
                            },
                            "localizedDescriptions": {
                              "en": "Temperature measured within the rectum",
                              "sl": "*Temperature measured within the rectum(en)"
                            }
                          },
                          {
                            "value": "at0026",
                            "label": "Nasopharynx",
                            "localizedLabels": {
                              "en": "Nasopharynx",
                              "sl": "Nazofarinks"
                            },
                            "localizedDescriptions": {
                              "en": "Temperature is measured within the nasopharynx",
                              "sl": "*Temperature is measured within the nasopharynx(en)"
                            }
                          },
                          {
                            "value": "at0027",
                            "label": "Urinary bladder",
                            "localizedLabels": {
                              "en": "Urinary bladder",
                              "sl": "Sečni mehur"
                            },
                            "localizedDescriptions": {
                              "en": "Temperature is measured in the urinary bladder",
                              "sl": "*Temperature is measured in the urinary bladder(en)"
                            }
                          },
                          {
                            "value": "at0028",
                            "label": "Intravascular",
                            "localizedLabels": {
                              "en": "Intravascular",
                              "sl": "Intravaskularno"
                            },
                            "localizedDescriptions": {
                              "en": "Temperature is measured within the vascular system",
                              "sl": "*Temperature is measured within the vascular system(en)"
                            }
                          },
                          {
                            "value": "at0043",
                            "label": "Skin",
                            "localizedLabels": {
                              "en": "Skin",
                              "sl": "Na koži"
                            },
                            "localizedDescriptions": {
                              "en": "Temperature is measured from exposed skin",
                              "sl": "*Temperature is measured from exposed skin(en)"
                            }
                          },
                          {
                            "value": "at0051",
                            "label": "Vagina",
                            "localizedLabels": {
                              "en": "Vagina",
                              "sl": "Vaginalno"
                            },
                            "localizedDescriptions": {
                              "en": "Temperature is measured within the vagina",
                              "sl": "*Temperature is measured within the vagina(en)"
                            }
                          },
                          {
                            "value": "at0054",
                            "label": "Oesophagus",
                            "localizedLabels": {
                              "en": "Oesophagus",
                              "sl": "V požiralniku"
                            },
                            "localizedDescriptions": {
                              "en": "Temperatue is measured within the oesophagus",
                              "sl": "*Temperatue is measured within the oesophagus(en)"
                            }
                          },
                          {
                            "value": "at0055",
                            "label": "Inguinal skin crease",
                            "localizedLabels": {
                              "en": "Inguinal skin crease",
                              "sl": "V ustih"
                            },
                            "localizedDescriptions": {
                              "en": "Temperature is measured in the inguinal skin crease between the leg and abdominal wall",
                              "sl": "*Temperature is measured in the inguinal skin crease between the leg and abdominal wall(en)"
                            }
                          }
                        ]
                      }
                    ],
                    "formId": "vital_signs/body_temperature/site_of_measurement",
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
              }
            ]
          }
        ]
      };

      var deps:any = [
        {
          "field": "vital_signs/body_mass_index/comment",
          "conditions": [
            {
              "operator": "equals",
              "value": {
                "value": "hide"
              },
              "actions": [
                {
                  "action": "hide",
                  "target": "vital_signs/body_temperature",
                  "value": {
                    "value": ""
                  }
                }
              ]
            },
            {
              "operator": "equals",
              "value": {
                "value": "show"
              },
              "actions": [
                {
                  "action": "show",
                  "target": "vital_signs/body_temperature",
                  "value": {
                    "value": ""
                  }
                }
              ]
            },
            {
              "operator": "equals",
              "value": {
                "value": "clear"
              },
              "actions": [
                {
                  "action": "clear",
                  "target": "generic-field-42517",
                  "value": {
                    "value": ""
                  }
                }
              ]
            },
            {
              "operator": "equals",
              "value": {
                "value": "reset"
              },
              "actions": [
                {
                  "action": "reset",
                  "target": "generic-field-42517",
                  "value": {
                    "value": ""
                  }
                }
              ]
            }
          ]
        }
      ];

      var values = {};

      var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, values, deps);
      var ast = rm.getDependencyNode();
      expect(ast instanceof Ast).toBeTruthy();
      ast.process({});

      var dependanciesTrigger:any = rm.findSuccessorWithPath("vital_signs/body_mass_index/comment");
      var checkDefaultModel:any = rm.findSuccessorWithPath("vital_signs/body_temperature/any_event/description_of_thermal_stress");
      var multiContainerModel:any = rm.findSuccessorWithPath("vital_signs/body_temperature");
      expect(multiContainerModel).toBeTruthy();
      expect(multiContainerModel.isMulti()).toBeTruthy();

      expect(dependanciesTrigger.textValue()).toBe(null);
      expect(checkDefaultModel.textValue()).toBe("defVal");
      (new ThinkEhrModelParser(rmTypeModelDictionary) ).duplicateModel(multiContainerModel, multiContainerModel);
      expect(rm.findSuccessorsWithPath(multiContainerModel.getPath()).length).toBe(2);
      dependanciesTrigger.textValue('reset');
      ast.process({});

      expect(dependanciesTrigger.textValue()).toBe("reset");
      expect(checkDefaultModel.textValue()).toBe("defVal");
      expect(rm.findSuccessorsWithPath(multiContainerModel.getPath()).length).toBe(1);


    });

    it("Dependency - Container Enable and Disable", function () {

      var desc:any = vsContTargetDesc;

      var deps:any = [
        {
          "field": "testing_template/context/testing/name_1",
          "conditions": [
            {
              "operator": "equals",
              "value": {
                "value": "XXX"
              },
              "actions": [
                {
                  "action": "disable",
                  "target": "testing_template/context/fixed_name/fixed_values",
                  "value": {
                    "value": ""
                  }
                }
              ]
            },
            {
              "operator": "startswith",
              "value": {
                "value": "fGH"
              },
              "actions": [
                {
                  "action": "enable",
                  "target": "testing_template/context/fixed_name/fixed_values",
                  "value": {
                    "value": ""
                  }
                }
              ]
            }
          ]
        }
      ];

      var values = {};

      var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, values, deps);
      var ast = rm.getDependencyNode();
      expect(ast instanceof Ast).toBeTruthy();
      ast.process({});

      var cm = rm.findSuccessorWithPath("testing_template/context/fixed_name/fixed_values");
      expect(cm).toBeTruthy();
      expect(cm.getViewConfig().isHidden()).toBeFalsy();
      expect(cm.getViewConfig().isReadOnly()).toBeFalsy();

      var nm:any = rm.findSuccessorWithPath("testing_template/context/testing/name_1");
      expect(nm.getDependencyNode()).toBeTruthy();
      expect(nm.getViewConfig().isHidden()).toBeFalsy();
      expect(nm.getViewConfig().isReadOnly()).toBeFalsy();
      expect(nm.getDependencyNode().conditions()[1].getThenStatement().actions()[0].getTargets()[0]).toBe(cm);

      nm.textValue("XXX");
      ast.process({});
      expect(cm.getViewConfig().isHidden()).toBeFalsy();
      expect(cm.getViewConfig().isReadOnly()).toBeTruthy();

      nm.textValue("dDEFd");
      ast.process({});
      expect(cm.getViewConfig().isHidden()).toBeFalsy();
      expect(cm.getViewConfig().isReadOnly()).toBeTruthy();

      nm.textValue("fGH");
      ast.process({});
      expect(cm.getViewConfig().isHidden()).toBeFalsy();
      expect(cm.getViewConfig().isReadOnly()).toBeFalsy();

    });

    it("AstDurationLiteral Test", function () {

      var value:any = {
        "year": 0,
        "month": 50
      };

      var adl = new AstDurationLiteral({value: value});
      expect(adl.evaluate()).toBe(50 * 2592000);

      value = {
        "year": 100,
        "month": 23
      };

      adl = new AstDurationLiteral({value: value});
      expect(adl.evaluate()).toBe(100 * 31104000 + 23 * 2592000);

      value = {
        "year": 100,
        "month": 23
      };

      adl = new AstDurationLiteral({value: value});
      expect(adl.evaluate()).toBe(100 * 31104000 + 23 * 2592000);


      //"year": 31104000,
      //    "month": 2592000,
      //    "week": 604800,
      //    "day": 86400,
      //    "hour": 3600,
      //    "minute": 60,
      //    "second": 1

      value = {
        "year": 1,
        "month": 2,
        "week": 3,
        "day": 4,
        "hour": 5,
        "minute": 6,
        second: 7
      };

      adl = new AstDurationLiteral({value: value});
      expect(adl.evaluate()).toBe(31104000 + 2 * 2592000 + 3 * 604800 + 4 * 86400 + 5 * 3600 + 6 * 60 + 7);

      value = {
        "month": 2,
        "day": 4,
        second: 7
      };

      adl = new AstDurationLiteral({value: value});
      expect(adl.evaluate()).toBe(2 * 2592000 + 4 * 86400 + 7);
    });

    it("Ast getThenStatementsWithModelPath", function () {


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
        "templateLanguages": [
          "en",
          "sl"
        ],
        "children": [
          {
            "name": "Comment",
            "localizedName": "Comment",
            "rmType": "DV_TEXT",
            "nodeId": "at0011",
            "min": 0,
            "max": 1,
            "dependsOn": [
              "any_event"
            ],
            "localizedNames": {
              "en": "Comment",
              "sl": "Opombe"
            },
            "localizedDescriptions": {
              "en": "Comment about the Body Mass Index measurement eg noting that the measurements used were adjusted weight/height.",
              "sl": "Opombe"
            },
            "aqlPath": "/content[openEHR-EHR-OBSERVATION.body_mass_index.v1]/protocol[at0005]/items[at0011]/value",
            "inputs": [
              {
                "type": "TEXT"
              }
            ],
            "formId": "vital_signs/body_mass_index/comment",
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
                "input": {
                  "presentation": "textfield"
                }
              }
            }
          },
          {
            "name": "Body temperature",
            "localizedName": "Body temperature",
            "rmType": "OBSERVATION",
            "nodeId": "openEHR-EHR-OBSERVATION.body_temperature.v1",
            "min": "0",
            "max": "100",
            "localizedNames": {
              "en": "Body temperature",
              "sl": "Telesna temperature"
            },
            "localizedDescriptions": {
              "en": "A measurement of the body temperature, which is a surrogate for the whole body temperature of the person.",
              "sl": "*A measurement of the body temperature, which is a surrogate for the whole body temperature of the person.(en)"
            },
            "aqlPath": "/content[openEHR-EHR-OBSERVATION.body_temperature.v1]",
            "inputs": [
              {
                "type": "TEXT"
              }
            ],
            "formId": "vital_signs/body_temperature",
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
                "multi"
              ]
            },
            "children": [
              {
                "name": "Any event",
                "localizedName": "Any event",
                "rmType": "EVENT",
                "nodeId": "at0003",
                "min": 0,
                "max": -1,
                "localizedNames": {
                  "en": "Any event",
                  "sl": "Any event"
                },
                "localizedDescriptions": {
                  "en": "Any event",
                  "sl": "*Any event(en)"
                },
                "aqlPath": "/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]",
                "formId": "vital_signs/body_temperature/any_event",
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
                    "name": "Temperature",
                    "localizedName": "Temperature",
                    "rmType": "DV_QUANTITY",
                    "nodeId": "at0004",
                    "min": 1,
                    "max": 1,
                    "localizedNames": {
                      "en": "Temperature",
                      "sl": "Telesna temperature"
                    },
                    "localizedDescriptions": {
                      "en": "The measured body temperature (as a surrogate for the whole body)",
                      "sl": "*The measured body temperature (as a surrogate for the whole body)(en)"
                    },
                    "aqlPath": "/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value",
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
                                "minOp": ">=",
                                "min": 1,
                                "maxOp": "<=",
                                "max": 1
                              }
                            }
                          },
                          {
                            "value": "°F",
                            "label": "°F",
                            "validation": {
                              "precision": {
                                "minOp": ">=",
                                "min": 1,
                                "maxOp": "<=",
                                "max": 1
                              }
                            }
                          }
                        ]
                      }
                    ],
                    "formId": "vital_signs/body_temperature/any_event/temperature",
                    "viewConfig": {
                      "field": {
                        "unit": {
                          "presentation": "combobox"
                        }
                      },
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
                    "name": "Body exposure",
                    "localizedName": "Body exposure",
                    "rmType": "DV_CODED_TEXT",
                    "nodeId": "at0030",
                    "min": 0,
                    "max": 1,
                    "dependsOn": [
                      "temperature"
                    ],
                    "localizedNames": {
                      "en": "Body exposure",
                      "sl": "Obleka"
                    },
                    "localizedDescriptions": {
                      "en": "The thermal situation of the person who is having the temperature taken",
                      "sl": "*The thermal situation of the person who is having the temperature taken(en)"
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
                              "en": "Naked",
                              "sl": "Gol"
                            },
                            "localizedDescriptions": {
                              "en": "No clothing, bedding or covering",
                              "sl": "*No clothing, bedding or covering(en)"
                            }
                          },
                          {
                            "value": "at0032",
                            "label": "Reduced clothing/bedding",
                            "localizedLabels": {
                              "en": "Reduced clothing/bedding",
                              "sl": "Premalo oblečen (zavit)"
                            },
                            "localizedDescriptions": {
                              "en": "The person is covered by a lesser amount of clothing or bedding than deemed appropriate for the environmental circumstances",
                              "sl": "*The person is covered by a lesser amount of clothing or bedding than deemed appropriate for the environmental circumstances(en)"
                            }
                          },
                          {
                            "value": "at0033",
                            "label": "Appropriate clothing/bedding",
                            "localizedLabels": {
                              "en": "Appropriate clothing/bedding",
                              "sl": "Primerno oblečen (zavit)"
                            },
                            "localizedDescriptions": {
                              "en": "The person is covered by an amount of clothing or bedding deemed appropriate for the environmental circumstances",
                              "sl": "*The person is covered by an amount of clothing or bedding deemed appropriate for the environmental circumstances(en)"
                            }
                          },
                          {
                            "value": "at0034",
                            "label": "Increased clothing/bedding",
                            "localizedLabels": {
                              "en": "Increased clothing/bedding",
                              "sl": "Preveč oblečen (zavit)"
                            },
                            "localizedDescriptions": {
                              "en": "The person is covered by an increased amount of clothing or bedding than deemed appropriate for the environmental circumstances",
                              "sl": "*The person is covered by an increased amount of clothing or bedding than deemed appropriate for the environmental circumstances(en)"
                            }
                          }
                        ],
                        "defaultValue": "at0033"
                      }
                    ],
                    "formId": "vital_signs/body_temperature/any_event/body_exposure",
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
                    "name": "Description of thermal stress",
                    "localizedName": "Description of thermal stress",
                    "rmType": "DV_TEXT",
                    "nodeId": "at0041",
                    "min": 0,
                    "max": 1,
                    "dependsOn": [
                      "temperature"
                    ],
                    "localizedNames": {
                      "en": "Description of thermal stress",
                      "sl": "Opis"
                    },
                    "localizedDescriptions": {
                      "en": "Description of the conditions applied to the subject that might influence their measured body temperature.",
                      "sl": "*Description of the conditions applied to the subject that might influence their measured body temperature.(en)"
                    },
                    "aqlPath": "/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]/state[at0029]/items[at0041]/value",
                    "inputs": [
                      {
                        "type": "TEXT"
                      }
                    ],
                    "formId": "vital_signs/body_temperature/any_event/description_of_thermal_stress",
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
                        "input": {
                          "presentation": "textfield"
                        }
                      }
                    }
                  }
                ]
              },
              {
                "name": "Site of measurement",
                "localizedName": "Site of measurement",
                "rmType": "DV_CODED_TEXT",
                "nodeId": "at0021",
                "min": 0,
                "max": 1,
                "dependsOn": [
                  "any_event"
                ],
                "localizedNames": {
                  "en": "Site of measurement",
                  "sl": "Stran telesa"
                },
                "localizedDescriptions": {
                  "en": "The anatomical site of measurement of the temperature",
                  "sl": "*The anatomical site of measurement of the temperature(en)"
                },
                "aqlPath": "/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/protocol[at0020]/items[at0021]/value",
                "inputs": [
                  {
                    "suffix": "code",
                    "type": "CODED_TEXT",
                    "list": [
                      {
                        "value": "at0022",
                        "label": "Mouth",
                        "localizedLabels": {
                          "en": "Mouth",
                          "sl": "Usta"
                        },
                        "localizedDescriptions": {
                          "en": "Temperature is measured within the mouth",
                          "sl": "*Temperature is measured within the mouth(en)"
                        }
                      },
                      {
                        "value": "at0023",
                        "label": "Ear canal",
                        "localizedLabels": {
                          "en": "Ear canal",
                          "sl": "V ušesu"
                        },
                        "localizedDescriptions": {
                          "en": "Temperature is measured from within the external auditory canal",
                          "sl": "*Temperature is measured from within the external auditory canal(en)"
                        }
                      },
                      {
                        "value": "at0024",
                        "label": "Axilla",
                        "localizedLabels": {
                          "en": "Axilla",
                          "sl": "Pod pazduho"
                        },
                        "localizedDescriptions": {
                          "en": "Temperature is measured from the skin of the axilla with the arm positioned down by the side",
                          "sl": "*Temperature is measured from the skin of the axilla with the arm positioned down by the side(en)"
                        }
                      },
                      {
                        "value": "at0025",
                        "label": "Rectum",
                        "localizedLabels": {
                          "en": "Rectum",
                          "sl": "Rektalno"
                        },
                        "localizedDescriptions": {
                          "en": "Temperature measured within the rectum",
                          "sl": "*Temperature measured within the rectum(en)"
                        }
                      },
                      {
                        "value": "at0026",
                        "label": "Nasopharynx",
                        "localizedLabels": {
                          "en": "Nasopharynx",
                          "sl": "Nazofarinks"
                        },
                        "localizedDescriptions": {
                          "en": "Temperature is measured within the nasopharynx",
                          "sl": "*Temperature is measured within the nasopharynx(en)"
                        }
                      },
                      {
                        "value": "at0027",
                        "label": "Urinary bladder",
                        "localizedLabels": {
                          "en": "Urinary bladder",
                          "sl": "Sečni mehur"
                        },
                        "localizedDescriptions": {
                          "en": "Temperature is measured in the urinary bladder",
                          "sl": "*Temperature is measured in the urinary bladder(en)"
                        }
                      },
                      {
                        "value": "at0028",
                        "label": "Intravascular",
                        "localizedLabels": {
                          "en": "Intravascular",
                          "sl": "Intravaskularno"
                        },
                        "localizedDescriptions": {
                          "en": "Temperature is measured within the vascular system",
                          "sl": "*Temperature is measured within the vascular system(en)"
                        }
                      },
                      {
                        "value": "at0043",
                        "label": "Skin",
                        "localizedLabels": {
                          "en": "Skin",
                          "sl": "Na koži"
                        },
                        "localizedDescriptions": {
                          "en": "Temperature is measured from exposed skin",
                          "sl": "*Temperature is measured from exposed skin(en)"
                        }
                      },
                      {
                        "value": "at0051",
                        "label": "Vagina",
                        "localizedLabels": {
                          "en": "Vagina",
                          "sl": "Vaginalno"
                        },
                        "localizedDescriptions": {
                          "en": "Temperature is measured within the vagina",
                          "sl": "*Temperature is measured within the vagina(en)"
                        }
                      },
                      {
                        "value": "at0054",
                        "label": "Oesophagus",
                        "localizedLabels": {
                          "en": "Oesophagus",
                          "sl": "V požiralniku"
                        },
                        "localizedDescriptions": {
                          "en": "Temperatue is measured within the oesophagus",
                          "sl": "*Temperatue is measured within the oesophagus(en)"
                        }
                      },
                      {
                        "value": "at0055",
                        "label": "Inguinal skin crease",
                        "localizedLabels": {
                          "en": "Inguinal skin crease",
                          "sl": "V ustih"
                        },
                        "localizedDescriptions": {
                          "en": "Temperature is measured in the inguinal skin crease between the leg and abdominal wall",
                          "sl": "*Temperature is measured in the inguinal skin crease between the leg and abdominal wall(en)"
                        }
                      }
                    ]
                  }
                ],
                "formId": "vital_signs/body_temperature/site_of_measurement",
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
          }
        ]
      };

      var deps:any = [
        {
          "field": "vital_signs/body_mass_index/comment",
          "conditions": [
            {
              "operator": "equals",
              "value": {
                "value": "hide"
              },
              "actions": [
                {
                  "action": "hide",
                  "target": "vital_signs/body_temperature",
                  "value": {
                    "value": ""
                  }
                }
              ]
            },
            {
              "operator": "equals",
              "value": {
                "value": "show"
              },
              "actions": [
                {
                  "action": "show",
                  "target": "vital_signs/body_temperature",
                  "value": {
                    "value": ""
                  }
                }
              ]
            }
          ]
        }
      ];


      var values = {};
      var model = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, values, deps);

      var rm = model;
      var ast = rm.getDependencyNode();
      expect(ast instanceof Ast).toBeTruthy();
      expect(ast.getRawDesc()).not.toBe(deps);

      var astConditionField = rm.findSuccessorWithPath("vital_signs/body_mass_index/comment");
      var containerModels = rm.findSuccessorsWithPath("vital_signs/body_temperature");

      expect(ast.fields().length).toBe(1);
      expect(ast.fields()[0].conditions().length).toBe(2);
      expect(ThinkEhrDependencyParser.getThenStatementsWithModelPath(ast, containerModels[0].getPath()).length).toBe(2);
    });



});

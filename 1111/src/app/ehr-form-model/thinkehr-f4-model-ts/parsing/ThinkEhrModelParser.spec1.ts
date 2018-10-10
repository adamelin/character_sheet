import {} from '@angular/core/testing';
import {ThinkEhrModelParser} from "../parsing/ThinkEhrModelParser";
import {RmType} from "../RmType";
import {FormRootModel} from "../model/FormRootModel";
import {CodedTextFieldModel} from "../model/fieldModel/CodedTextFieldModel";
import {EhrContext} from "../EhrContext";


describe('UriFieldModel', () => {

  it("model.findSuccessorWithTag()", function () {
    let desc: any = {
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
          "label": {
            "valign": "inherit",
            "align": "inherit"
          },
          "field": {
            "valign": "inherit",
            "align": "inherit"
          }
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
              "min": "0",
              "max": "1",
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
                  "input-field-tag"
                ]
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
              "localizedName": "Fieldset",
              "localizedNames": {
                "en": "Fieldset",
                "sl": "Fieldset"
              },
              "min": 0,
              "max": -1,
              "name": "Fieldset",
              "rmType": "GENERIC_FIELDSET",
              "formId": "generic-field-38700",
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
                  "min": "0",
                  "max": "1",
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
                      "text-field",
                      "input-field-tag"
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
                  "min": "1",
                  "max": "1",
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
                      "interval-q-upper"
                    ]
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
                  "uri-field"
                ],
                "field": {
                  "input": {
                    "presentation": "textfield",
                    "lines": "1"
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
                  "type": "INTEGER",
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

    let rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, {}, []);

    expect(rm.findSuccessorWithTag('no-tag-set')).toBe(null);
    expect(rm.findSuccessorsWithTag('no-tag-set').length).toBe(0);
    expect(rm.findSuccessorWithTag('text-field')).toBeTruthy();
    expect(rm.findSuccessorWithTag('interval-q-upper')).toBeTruthy();
    expect(rm.findSuccessorsWithTag('interval-q-upper').length).toBe(1);
    expect(rm.findSuccessorWithTag('input-field-tag')).toBeTruthy();
    expect(rm.findSuccessorsWithTag('input-field-tag').length).toBe(2);

  });

  it("model.findAncestorWithRmType()", function () {
    let desc: any = {
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
          "localizedName": "Fieldset",
          "localizedNames": {
            "en": "Fieldset"
          },
          "min": 0,
          "max": -1,
          "name": "Fieldset",
          "rmType": "GENERIC_FIELDSET",
          "formId": "generic-field-12835",
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
                  "name": "1.7/8 Allergen",
                  "localizedName": "1.7/8 Allergen",
                  "rmType": "DV_CODED_TEXT",
                  "nodeId": "at0002",
                  "min": "1",
                  "max": "1",
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
                      "noExclusion"
                    ],
                    "field": {
                      "code": {
                        "presentation": "textfield"
                      },
                      "value": {
                        "presentation": "textfield"
                      }
                    },
                    "annotations": {
                      "function": "thinkehr.f4.setupExclusions",
                      "exclusion": "custom-exclusion"
                    }
                  }
                },
                {
                  "name": "Exclusion Statement",
                  "localizedName": "Exclusion Statement",
                  "rmType": "DV_TEXT",
                  "nodeId": "at0002.1",
                  "min": "0",
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
                      "exclusion",
                      "custom-exclusion"
                    ],
                    "field": {
                      "input": {
                        "presentation": "textfield",
                        "lines": "1"
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
                },
                "annotations": {}
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
              "exclusion",
              "custom-exclusion"
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

    let rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, {}, []);
    let parentFieldset = rm.findSuccessorWithPath('generic-field-12835');
    let childFieldset = rm.findSuccessorWithPath('generic-field-55040');

    expect(rm.findAncestorWithRmType(RmType.GENERIC_FIELDSET)).toBe(null);
    expect(parentFieldset.findAncestorWithRmType(RmType.GENERIC_FIELDSET, true)).toBeTruthy();
    expect(parentFieldset.findAncestorWithRmType(RmType.GENERIC_FIELDSET, false)).toBeFalsy();
    expect(childFieldset.findAncestorWithRmType(RmType.GENERIC_FIELDSET, false)).toBe(parentFieldset);

  });
  it("Set External Context - Success", function () {
    let externalContext: EhrContext = new EhrContext();
    externalContext.language = 'en';

    let rootModel = new FormRootModel();
    (new ThinkEhrModelParser(rmTypeModelDictionary) ).setExternalContext(rootModel, externalContext);
    expect(rootModel['_externalContext']).toBe(externalContext);
  });

  it("Set External Context - Wrong Model", function () {
    let externalContext: EhrContext = new EhrContext();
    externalContext.language = 'en';

    let model = new CodedTextFieldModel();

    expect(function () {
      (new ThinkEhrModelParser(rmTypeModelDictionary) ).setExternalContext(model, externalContext)
    }).toThrowError("External context can only be attached to the root form model");

  });
});

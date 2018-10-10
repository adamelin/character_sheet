import {DependencyFormScriptConverter} from "./DependencyFormScriptConverter";

export const dependenciesToTest = [
  {
    "field": "test_encounter/testing/testing/name_1",
    "conditions": [
      {
        "operator": "empty",
        "value": null,
        "actions": [
          {
            "action": "show",
            "target": "test_encounter/testing/testing/name_2",
            "value": {
              "value": ""
            }
          }
        ]
      }
    ]
  },
  {
    "field": "test_encounter/testing/testing/name_1",
    "conditions": [
      {
        "operator": "notempty",
        "value": null,
        "actions": [
          {
            "action": "hide",
            "target": "test_encounter/testing/testing/name_2",
            "value": {
              "value": ""
            }
          }
        ]
      }
    ]
  },
  {
    "field": "test_encounter/testing/testing/date",
    "conditions": [
      {
        "operator": "empty",
        "value": null,
        "actions": [
          {
            "action": "show",
            "target": "test_encounter/testing/testing/name_2",
            "value": {
              "value": ""
            }
          }
        ]
      }
    ]
  },
  {
    "field": "test_encounter/testing/testing/date",
    "conditions": [
      {
        "operator": "notempty",
        "value": null,
        "actions": [
          {
            "action": "hide",
            "target": "test_encounter/testing/testing/name_2",
            "value": {
              "value": ""
            }
          }
        ]
      }
    ]
  },
  {
    "field": "test_encounter/testing/testing/time",
    "conditions": [
      {
        "operator": "empty",
        "value": null,
        "actions": [
          {
            "action": "show",
            "target": "test_encounter/testing/testing/name_2",
            "value": {
              "value": ""
            }
          }
        ]
      }
    ]
  },
  {
    "field": "test_encounter/testing/testing/time",
    "conditions": [
      {
        "operator": "notempty",
        "value": null,
        "actions": [
          {
            "action": "hide",
            "target": "test_encounter/testing/testing/name_2",
            "value": {
              "value": ""
            }
          }
        ]
      }
    ]
  },
  {
    "field": "test_encounter/testing/testing/date_time",
    "conditions": [
      {
        "operator": "empty",
        "value": null,
        "actions": [
          {
            "action": "show",
            "target": "test_encounter/testing/testing/name_2",
            "value": {
              "value": ""
            }
          }
        ]
      }
    ]
  },
  {
    "field": "test_encounter/testing/testing/date_time",
    "conditions": [
      {
        "operator": "notempty",
        "value": null,
        "actions": [
          {
            "action": "hide",
            "target": "test_encounter/testing/testing/name_2",
            "value": {
              "value": ""
            }
          }
        ]
      }
    ]
  },
  {
    "field": "test_encounter/testing/testing/intervals/quantity/upper",
    "conditions": [
      {
        "operator": "notempty",
        "value": null,
        "actions": [
          {
            "action": "hide",
            "target": "test_encounter/testing/testing/name_2",
            "value": {
              "value": ""
            }
          }
        ]
      }
    ]
  },
  {
    "field": "test_encounter/testing/testing/intervals/quantity/upper",
    "conditions": [
      {
        "operator": "empty",
        "value": null,
        "actions": [
          {
            "action": "show",
            "target": "test_encounter/testing/testing/name_2",
            "value": {
              "value": ""
            }
          }
        ]
      }
    ]
  },
  {
    "field": "test_encounter/testing/testing/intervals/count/upper",
    "conditions": [
      {
        "operator": "notempty",
        "value": null,
        "actions": [
          {
            "action": "hide",
            "target": "test_encounter/testing/testing/name_2",
            "value": {
              "value": ""
            }
          }
        ]
      }
    ]
  },
  {
    "field": "test_encounter/testing/testing/intervals/count/upper",
    "conditions": [
      {
        "operator": "empty",
        "value": null,
        "actions": [
          {
            "action": "show",
            "target": "test_encounter/testing/testing/name_2",
            "value": {
              "value": ""
            }
          }
        ]
      }
    ]
  },
  {
    "field": "test_encounter/testing/testing/testing_dv_coded_text",
    "conditions": [
      {
        "operator": "empty",
        "value": null,
        "actions": [
          {
            "action": "show",
            "target": "test_encounter/testing/testing/name_2",
            "value": {
              "value": ""
            }
          }
        ]
      }
    ]
  },
  {
    "field": "test_encounter/testing/testing/testing_dv_coded_text",
    "conditions": [
      {
        "operator": "notempty",
        "value": null,
        "actions": [
          {
            "action": "hide",
            "target": "test_encounter/testing/testing/name_2",
            "value": {
              "value": ""
            }
          }
        ]
      }
    ]
  },
  {
    "field": "test_encounter/testing/testing/boolean1",
    "conditions": [
      {
        "operator": "notempty",
        "value": null,
        "actions": [
          {
            "action": "hide",
            "target": "test_encounter/testing/testing/name_2",
            "value": {
              "value": ""
            }
          }
        ]
      }
    ]
  },
  {
    "field": "test_encounter/testing/testing/boolean1",
    "conditions": [
      {
        "operator": "empty",
        "value": null,
        "actions": [
          {
            "action": "show",
            "target": "test_encounter/testing/testing/name_2",
            "value": {
              "value": ""
            }
          }
        ]
      }
    ]
  },
  {
    "field": "test_encounter/testing/testing/proportion1",
    "conditions": [
      {
        "operator": "empty",
        "value": null,
        "actions": [
          {
            "action": "show",
            "target": "test_encounter/testing/testing/name_2",
            "value": {
              "value": ""
            }
          }
        ]
      }
    ]
  },
  {
    "field": "test_encounter/testing/testing/proportion1",
    "conditions": [
      {
        "operator": "notempty",
        "value": null,
        "actions": [
          {
            "action": "hide",
            "target": "test_encounter/testing/testing/name_2",
            "value": {
              "value": ""
            }
          }
        ]
      }
    ]
  },
  {
    "field": "test_encounter/testing/testing/proportion2",
    "conditions": [
      {
        "operator": "notempty",
        "value": null,
        "actions": [
          {
            "action": "hide",
            "target": "test_encounter/testing/testing/name_2",
            "value": {
              "value": ""
            }
          }
        ]
      }
    ]
  },
  {
    "field": "test_encounter/testing/testing/proportion2",
    "conditions": [
      {
        "operator": "empty",
        "value": null,
        "actions": [
          {
            "action": "show",
            "target": "test_encounter/testing/testing/name_2",
            "value": {
              "value": ""
            }
          }
        ]
      }
    ]
  },
  {
    "field": "test_encounter/testing/testing/ehr_uri",
    "conditions": [
      {
        "operator": "empty",
        "value": null,
        "actions": [
          {
            "action": "show",
            "target": "test_encounter/testing/testing/name_2",
            "value": {
              "value": ""
            }
          }
        ]
      }
    ]
  },
  {
    "field": "test_encounter/testing/testing/ehr_uri",
    "conditions": [
      {
        "operator": "notempty",
        "value": null,
        "actions": [
          {
            "action": "hide",
            "target": "test_encounter/testing/testing/name_2",
            "value": {
              "value": ""
            }
          }
        ]
      }
    ]
  },
  {
    "field": "test_encounter/testing/testing/ordinal1",
    "conditions": [
      {
        "operator": "empty",
        "value": null,
        "actions": [
          {
            "action": "show",
            "target": "test_encounter/testing/testing/name_2",
            "value": {
              "value": ""
            }
          }
        ]
      }
    ]
  },
  {
    "field": "test_encounter/testing/testing/ordinal1",
    "conditions": [
      {
        "operator": "notempty",
        "value": null,
        "actions": [
          {
            "action": "hide",
            "target": "test_encounter/testing/testing/name_2",
            "value": {
              "value": ""
            }
          }
        ]
      }
    ]
  }
]

export const dvDependenciesTest = {
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
    "en"
  ],
  "children": [
    {
      "name": "TO HIDE",
      "localizedName": "TO HIDE",
      "rmType": "DV_TEXT",
      "nodeId": "at0018",
      "min": 0,
      "max": -1,
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
          "field": {
            "valign": "inherit",
            "align": "inherit"
          }
        },
        "label": {
          "custom": true
        }
      }
    },
    {
      "name": "Name 1",
      "localizedName": "Name 1",
      "rmType": "DV_TEXT",
      "nodeId": "at0018",
      "min": 0,
      "max": -1,
      "localizedNames": {
        "en": "Name 1"
      },
      "localizedDescriptions": {
        "en": "*"
      },
      "aqlPath": "/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0018,'Name 1']/value",
      "inputs": [
        {
          "type": "TEXT"
        }
      ],
      "formId": "test_encounter/testing/testing/name_1",
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
      "name": "Date",
      "localizedName": "Date",
      "rmType": "DV_DATE",
      "nodeId": "at0013",
      "min": 0,
      "max": -1,
      "localizedNames": {
        "en": "Date"
      },
      "localizedDescriptions": {
        "en": "*"
      },
      "aqlPath": "/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0013]/value",
      "inputs": [
        {
          "type": "DATE"
        }
      ],
      "formId": "test_encounter/testing/testing/date",
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
      "name": "Time",
      "localizedName": "Time",
      "rmType": "DV_TIME",
      "nodeId": "at0014",
      "min": 0,
      "max": -1,
      "localizedNames": {
        "en": "Time"
      },
      "localizedDescriptions": {
        "en": "*"
      },
      "aqlPath": "/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0014]/value",
      "inputs": [
        {
          "type": "TIME"
        }
      ],
      "formId": "test_encounter/testing/testing/time",
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
      "name": "Date time",
      "localizedName": "Date time",
      "rmType": "DV_DATE_TIME",
      "nodeId": "at0015",
      "min": 0,
      "max": -1,
      "localizedNames": {
        "en": "Date time"
      },
      "localizedDescriptions": {
        "en": "*"
      },
      "aqlPath": "/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0015]/value",
      "inputs": [
        {
          "type": "DATETIME"
        }
      ],
      "formId": "test_encounter/testing/testing/date_time",
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
      "rmType": "DV_QUANTITY",
      "nodeId": "",
      "min": 1,
      "max": 1,
      "aqlPath": "/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0022]/items[at0023]/value/upper",
      "inputs": [
        {
          "suffix": "magnitude",
          "type": "DECIMAL",
          "validation": {
            "range": {
              "minOp": ">=",
              "min": 0,
              "maxOp": "<=",
              "max": 300
            },
            "precision": {
              "minOp": ">=",
              "min": 3,
              "maxOp": "<=",
              "max": 3
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
                  "min": 0,
                  "maxOp": "<=",
                  "max": 300
                },
                "precision": {
                  "minOp": ">=",
                  "min": 3,
                  "maxOp": "<=",
                  "max": 3
                }
              }
            }
          ],
          "defaultValue": "kg"
        }
      ],
      "formId": "test_encounter/testing/testing/intervals/quantity/upper",
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
      "rmType": "DV_COUNT",
      "nodeId": "",
      "min": 1,
      "max": 1,
      "aqlPath": "/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0022]/items[at0024]/value/upper",
      "inputs": [
        {
          "type": "INTEGER",
          "validation": {
            "range": {
              "minOp": ">=",
              "min": 0,
              "maxOp": "<=",
              "max": 20
            }
          }
        }
      ],
      "formId": "test_encounter/testing/testing/intervals/count/upper",
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
      "name": "Testing DV_CODED_TEXT",
      "localizedName": "Testing DV_CODED_TEXT",
      "rmType": "DV_CODED_TEXT",
      "nodeId": "at0027",
      "min": 0,
      "max": -1,
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
        "field": {
          "code": {
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
      "name": "Boolean1",
      "localizedName": "Boolean1",
      "rmType": "DV_BOOLEAN",
      "nodeId": "at0045",
      "min": 0,
      "max": 1,
      "localizedNames": {
        "en": "Boolean1"
      },
      "localizedDescriptions": {
        "en": "*"
      },
      "aqlPath": "/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0045]/value",
      "inputs": [
        {
          "type": "BOOLEAN"
        }
      ],
      "formId": "test_encounter/testing/testing/boolean1",
      "viewConfig": {
        "field": {
          "input": {
            "threeState": false
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
      "name": "Proportion1",
      "localizedName": "Proportion1",
      "rmType": "DV_PROPORTION",
      "nodeId": "at0049",
      "min": 0,
      "max": -1,
      "localizedNames": {
        "en": "Proportion1"
      },
      "localizedDescriptions": {
        "en": "*"
      },
      "aqlPath": "/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0049]/value",
      "proportionTypes": [
        "percent"
      ],
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
      "formId": "test_encounter/testing/testing/proportion1",
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
      "name": "Proportion2",
      "localizedName": "Proportion2",
      "rmType": "DV_PROPORTION",
      "nodeId": "at0050",
      "min": 0,
      "max": 1,
      "localizedNames": {
        "en": "Proportion2"
      },
      "localizedDescriptions": {
        "en": "*"
      },
      "aqlPath": "/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0050]/value",
      "proportionTypes": [
        "ratio"
      ],
      "inputs": [
        {
          "suffix": "numerator",
          "type": "DECIMAL",
          "validation": {
            "range": {
              "minOp": ">=",
              "min": 20,
              "maxOp": "<=",
              "max": 120
            }
          }
        },
        {
          "suffix": "denominator",
          "type": "DECIMAL",
          "validation": {
            "range": {
              "minOp": ">=",
              "min": 50,
              "maxOp": "<=",
              "max": 750
            }
          }
        }
      ],
      "formId": "test_encounter/testing/testing/proportion2",
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
      "name": "EHR Uri",
      "localizedName": "EHR Uri",
      "rmType": "DV_EHR_URI",
      "nodeId": "at0067",
      "min": 0,
      "max": -1,
      "localizedNames": {
        "en": "EHR Uri"
      },
      "localizedDescriptions": {
        "en": "*"
      },
      "aqlPath": "/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0067]/value",
      "inputs": [
        {
          "type": "TEXT"
        }
      ],
      "formId": "test_encounter/testing/testing/ehr_uri",
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
      "name": "Ordinal1",
      "localizedName": "Ordinal1",
      "rmType": "DV_ORDINAL",
      "nodeId": "at0042",
      "min": 0,
      "max": -1,
      "localizedNames": {
        "en": "Ordinal1"
      },
      "localizedDescriptions": {
        "en": "*"
      },
      "aqlPath": "/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0042]/value",
      "inputs": [
        {
          "type": "CODED_TEXT",
          "list": [
            {
              "value": "at0043",
              "label": "First",
              "localizedLabels": {
                "en": "First"
              },
              "localizedDescriptions": {
                "en": "*"
              },
              "ordinal": 1
            },
            {
              "value": "at0044",
              "label": "Second",
              "localizedLabels": {
                "en": "Second"
              },
              "localizedDescriptions": {
                "en": "*"
              },
              "ordinal": 2
            }
          ]
        }
      ],
      "formId": "test_encounter/testing/testing/ordinal1",
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
dvDependenciesTest.viewConfig['ehrFormScript'] = [DependencyFormScriptConverter.toFormScript(dependenciesToTest, dvDependenciesTest)];

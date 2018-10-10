

import {ThinkEhrModelParser} from "../parsing/ThinkEhrModelParser";
describe("resetValue spec", function () {

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
                "type": "DECIMAL"
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

  it("thinkehr.f4.TextFieldModel.resetValue()", function () {

    var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, {}, []);

    var textFieldModel:any = rm.findSuccessorWithPath('encounter/testing/text');
    expect(textFieldModel).toBeTruthy();
    expect(textFieldModel.textValue()).toBe('se');
    expect(textFieldModel.isDefaultValue()).toBe(true);
    textFieldModel.textValue('text1');
    expect(textFieldModel.textValue()).toBe('text1');
    expect(textFieldModel.isDefaultValue()).toBe(false);
    expect(textFieldModel.resetValue());
    expect(textFieldModel.textValue()).toBe('se');
    expect(textFieldModel.isDefaultValue()).toBe(true);
  });

  it("thinkehr.f4.QuantityFieldModel.resetValue()", function () {

    var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, {}, []);

    var quantityModel:any = rm.findSuccessorWithPath('encounter/testing/quantity');
    expect(quantityModel).toBeTruthy();
    expect(quantityModel.magnitudeValue()).toBe(1202);
    expect(quantityModel.unitValue()).toBe('mm[Hg]');
    expect(quantityModel.isDefaultValue()).toBe(true);
    quantityModel.magnitudeValue('111');
    expect(quantityModel.magnitudeValue()).toBe(111);
    expect(quantityModel.isDefaultValue()).toBe(false);
    quantityModel.unitValue('unt');
    expect(quantityModel.unitValue()).toBe('unt');
    quantityModel.resetValue();
    expect(quantityModel.isDefaultValue()).toBe(true);
    expect(quantityModel.magnitudeValue()).toBe(1202);
    expect(quantityModel.unitValue()).toBe('mm[Hg]');
  });

  it("thinkehr.f4.OrdinalFieldModel.resetValue()", function () {

    var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, {}, []);

    var ordinalModel:any = rm.findSuccessorWithPath('encounter/testing/ordinal');
    expect(ordinalModel).toBeTruthy();
    expect(ordinalModel.codeValue()).toBe('at0030');
    expect(ordinalModel.isDefaultValue()).toBe(true);
    ordinalModel.codeValue('at0029');
    expect(ordinalModel.codeValue()).toBe('at0029');
    expect(ordinalModel.isDefaultValue()).toBe(false);
    ordinalModel.resetValue();
    expect(ordinalModel.codeValue()).toBe('at0030');
    expect(ordinalModel.isDefaultValue()).toBe(true);
  });

  it("thinkehr.f4.ProportionFieldModel.resetValue()", function () {

    var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, {}, []);

    var modelToTest:any = rm.findSuccessorWithPath('encounter/testing/proportion');
    expect(modelToTest).toBeTruthy();
    expect(modelToTest.numeratorValue()).toBe(1);
    expect(modelToTest.denominatorValue()).toBe(null);
    expect(modelToTest.isDefaultValue()).toBe(true);
    modelToTest.numeratorValue(3);
    modelToTest.denominatorValue(4);
    expect(modelToTest.numeratorValue()).toBe(3);
    expect(modelToTest.denominatorValue()).toBe(4);
    expect(modelToTest.isDefaultValue()).toBe(false);
    modelToTest.resetValue();
    expect(modelToTest.numeratorValue()).toBe(1);
    expect(modelToTest.denominatorValue()).toBe(null);
    expect(modelToTest.isDefaultValue()).toBe(true);

  });

  it("thinkehr.f4.ProportionFieldModel.resetValue() fixed denominator", function () {
    var descFixed = {
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
              "min": "0",
              "max": "1",
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
                "field": {
                  "columns": "7"
                },
                "advanced": {
                  "hidden": false,
                  "readonly": false
                },
                "tags": [
                  "duration-component"
                ]
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
    var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, descFixed, {}, []);

    var testModel:any = rm.findSuccessorWithPath('encounter/testing/proportion');
    expect(testModel).toBeTruthy();
    expect(testModel.numeratorValue()).toBe(null);
    expect(testModel.denominatorValue()).toBe(100);
    expect(testModel.isDefaultValue()).toBe(true);
    testModel.numeratorValue(3);
    testModel.denominatorValue(4);
    expect(testModel.numeratorValue()).toBe(3);
    expect(testModel.denominatorValue()).toBe(100);
    expect(testModel.isDefaultValue()).toBe(false);
    testModel.resetValue();
    expect(testModel.numeratorValue()).toBe(null);
    expect(testModel.denominatorValue()).toBe(100);
    expect(testModel.isDefaultValue()).toBe(true);

  });

  it("thinkehr.f4.DateFieldModel.resetValue()", function () {

    var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, {}, []);

    var testModel:any = rm.findSuccessorWithPath('encounter/testing/date');
    expect(testModel).toBeTruthy();
    expect(testModel.dateValue()).toBe('2015-09-26');
    expect(testModel.isDefaultValue()).toBe(true);
    testModel.dateValue('2015-11-11');
    expect(testModel.dateValue()).toBe('2015-11-11');
    expect(testModel.isDefaultValue()).toBe(false);
    testModel.resetValue();
    expect(testModel.dateValue()).toBe('2015-09-26');
    expect(testModel.isDefaultValue()).toBe(true);

  });

  it("thinkehr.f4.TimeFieldModel.resetValue()", function () {

    var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, {}, []);

    var testModel:any = rm.findSuccessorWithPath('encounter/testing/time');
    expect(testModel).toBeTruthy();
    expect(testModel.timeValue()).toBe('18:22:16');
    expect(testModel.isDefaultValue()).toBe(true);
    testModel.timeValue('20:20:20');
    expect(testModel.timeValue()).toBe('20:20:20');
    expect(testModel.isDefaultValue()).toBe(false);
    testModel.resetValue();
    expect(testModel.timeValue()).toBe('18:22:16');
    expect(testModel.isDefaultValue()).toBe(true);

  });

  it("thinkehr.f4.DateTimeFieldModel.resetValue()", function () {

    var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, {}, []);

    var testModel:any = rm.findSuccessorWithPath('encounter/testing/datetime');
    expect(testModel).toBeTruthy();
    expect(testModel.dateTimeValue()).toBe('2015-09-23T04:27:08');
    expect(testModel.isDefaultValue()).toBe(true);
    testModel.dateTimeValue('2013-03-20T04:27:08');
    expect(testModel.dateTimeValue()).toBe('2013-03-20T04:27:08.000+01:00');
    expect(testModel.isDefaultValue()).toBe(false);

    testModel.resetValue();
    //TODO why is offset to +02:00 should be +01:00
    // expect(dateTimeModel.dateTimeValue()).toBe('2015-09-23T04:27:08');
    expect(testModel.dateTimeValue()).toBe("2015-09-23T04:27:08.000+02:00");
    expect(testModel.isDefaultValue()).toBe(true);

  });

  it("thinkehr.f4.CountFieldModel.resetValue()", function () {

    var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, {}, []);

    var testModel:any = rm.findSuccessorWithPath('encounter/testing/count');
    expect(testModel).toBeTruthy();
    expect(testModel.countValue()).toBe(2);
    expect(testModel.isDefaultValue()).toBe(true);
    testModel.countValue(99);
    expect(testModel.countValue()).toBe(99);
    expect(testModel.isDefaultValue()).toBe(false);
    testModel.resetValue();
    expect(testModel.countValue()).toBe(2);
    expect(testModel.isDefaultValue()).toBe(true);

  });

  it("thinkehr.f4.DurationFieldModel.resetValue()", function () {

    var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, {}, []);

    var durationModel:any = rm.findSuccessorWithPath('encounter/testing/duration');
    expect(durationModel).toBeTruthy();
    expect(durationModel.durationValue()).toBe('P1Y2M4W3DT5H6M7S');
    expect(durationModel.isDefaultValue()).toBe(true);
    durationModel.setValue('P2Y2M7W3DT5H6M7S');
    expect(durationModel.durationValue()).toBe('P2Y2M7W3DT5H6M7S');
    expect(durationModel.isDefaultValue()).toBe(false);
    durationModel.resetValue();
    expect(durationModel.durationValue()).toBe('P1Y2M4W3DT5H6M7S');
    expect(durationModel.isDefaultValue()).toBe(true);
  });

  it("thinkehr.f4.BooleanFieldModel.resetValue()", function () {

    var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, {}, []);

    var durationModel:any = rm.findSuccessorWithPath('encounter/testing/boolean');
    expect(durationModel).toBeTruthy();
    expect(durationModel.booleanValue()).toBe(true);
    durationModel.booleanValue(false);
    expect(durationModel.booleanValue()).toBe(false);
    durationModel.resetValue();
    expect(durationModel.booleanValue()).toBe(true);

  });

  it("thinkehr.f4.UriFieldModel.resetValue()", function () {

    var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, {}, []);

    var testModel:any = rm.findSuccessorWithPath('encounter/testing/uri');
    expect(testModel).toBeTruthy();
    expect(testModel.uriValue()).toBe('uu');
    expect(testModel.isDefaultValue()).toBe(true);
    testModel.uriValue('text1');
    expect(testModel.uriValue()).toBe('text1');
    expect(testModel.isDefaultValue()).toBe(false);
    expect(testModel.resetValue());
    expect(testModel.uriValue()).toBe('uu');
    expect(testModel.isDefaultValue()).toBe(true);
  });

  it("thinkehr.f4.EhrUriFieldModel.resetValue()", function () {

    var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, {}, []);

    var testModel:any = rm.findSuccessorWithPath('encounter/testing/ehruri');
    expect(testModel).toBeTruthy();
    expect(testModel.uriValue()).toBe('ee');
    expect(testModel.isDefaultValue()).toBe(true);
    testModel.uriValue('text1');
    expect(testModel.uriValue()).toBe('text1');
    expect(testModel.isDefaultValue()).toBe(false);
    expect(testModel.resetValue());
    expect(testModel.uriValue()).toBe('ee');
    expect(testModel.isDefaultValue()).toBe(true);
  });

  it("thinkehr.f4.MultimediaFieldModel.resetValue()", function () {

    var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, {}, []);

    var testModel:any = rm.findSuccessorWithPath('encounter/testing/multimedia');
    expect(testModel).toBeTruthy();
    expect(testModel.uriValue()).toBe('mm');
    expect(testModel.isDefaultValue()).toBe(true);
    testModel.uriValue('text1');
    expect(testModel.uriValue()).toBe('text1');
    expect(testModel.isDefaultValue()).toBe(false);
    expect(testModel.resetValue());
    expect(testModel.uriValue()).toBe('mm');
    expect(testModel.isDefaultValue()).toBe(true);
  });
});

import {
} from '@angular/core/testing';
import {MultimediaFieldModel} from "./MultimediaFieldModel";
import {ThinkEhrModelParser} from "../../parsing/ThinkEhrModelParser";
import {TextFieldModel} from "./TextFieldModel";
import {RmType} from "../../RmType";
import {FormRootModel} from "../FormRootModel";


describe('MultimediaFieldModel', () => {

  it("DV_MULTIMEDIA set get values - single", function () {

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
        "pt-br"
      ],
      "children": [
        {
          "name": "Global assessment!",
          "localizedName": "Global assessment!",
          "rmType": "OBSERVATION",
          "nodeId": "openEHR-EHR-OBSERVATION.global-hsl.v1",
          "min": 0,
          "max": -1,
          "localizedNames": {
            "pt-br": "",
            "en": "Global assessment!"
          },
          "localizedDescriptions": {
            "en": "General assessment of the whole patient by the clinician.!"
          },
          "aqlPath": "/content[openEHR-EHR-OBSERVATION.global-hsl.v1]",
          "children": [
            {
              "name": "Vaccination",
              "localizedName": "Vaccination",
              "rmType": "CLUSTER",
              "nodeId": "at0.177",
              "min": 0,
              "max": 1,
              "localizedNames": {
                "pt-br": "",
                "en": "*New cluster(en)"
              },
              "localizedDescriptions": {
                "en": "**(en)"
              },
              "aqlPath": "/content[openEHR-EHR-OBSERVATION.global-hsl.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0.177]",
              "children": [
                {
                  "name": "Observation",
                  "localizedName": "Observation",
                  "rmType": "DV_TEXT",
                  "nodeId": "at0.180",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {
                    "pt-br": "",
                    "en": "*New element(en)"
                  },
                  "localizedDescriptions": {
                    "en": "**(en)"
                  },
                  "aqlPath": "/content[openEHR-EHR-OBSERVATION.global-hsl.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0.177]/items[at0.180]/value",
                  "inputs": [
                    {
                      "type": "TEXT"
                    }
                  ],
                  "formId": "encounter/global_assessment/new_cluster_en/new_element_en",
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
                  "name": "Image of card",
                  "localizedName": "Image of card",
                  "rmType": "DV_MULTIMEDIA",
                  "nodeId": "at0.210",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {
                    "pt-br": "",
                    "en": "*New element(en)"
                  },
                  "localizedDescriptions": {
                    "en": "**(en)"
                  },
                  "aqlPath": "/content[openEHR-EHR-OBSERVATION.global-hsl.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0.177]/items[at0.210]/value",
                  "inputs": [
                    {
                      "type": "TEXT",
                      "defaultValue": "multiUri"
                    }
                  ],
                  "formId": "encounter/global_assessment/new_cluster_en/new_element_en2",
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
                      "custom": false
                    },
                    "annotations": {

                    }
                  }
                }
              ],
              "formId": "encounter/global_assessment/new_cluster_en",
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
          ],
          "formId": "encounter/global_assessment",
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

    var deps = [];

    var values = {};

    var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, values, deps);
    var tm = rm.findSuccessorWithPath("encounter/global_assessment/new_cluster_en/new_element_en2") as MultimediaFieldModel;
    expect(tm.getDependencyNode()).toBeFalsy();
    expect(tm.getViewConfig().isHidden()).toBeFalsy();
    expect(tm.isMulti()).toBeFalsy();
    expect(tm.getViewConfig().isReadOnly()).toBeFalsy();
    expect(tm.defaultValueUri()).toBe("multiUri");
    var newVal = '/path/to/file.png';
    expect(tm.uriValue(newVal)).toBe(newVal);
    expect(tm.uriValue()).toBe(newVal);
    expect(tm.getValue()["|uri"]).toBe(newVal);
    tm.clearUriValue();
    expect(tm.uriValue()).toBe(null);
    expect(tm.getRmType()).toBe(RmType.DV_MULTIMEDIA);

  });

  it("DV_MULTIMEDIA set get values - multi", function () {

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
        "pt-br"
      ],
      "children": [
        {
          "name": "Global assessment!",
          "localizedName": "Global assessment!",
          "rmType": "OBSERVATION",
          "nodeId": "openEHR-EHR-OBSERVATION.global-hsl.v1",
          "min": 0,
          "max": -1,
          "localizedNames": {
            "pt-br": "",
            "en": "Global assessment!"
          },
          "localizedDescriptions": {
            "en": "General assessment of the whole patient by the clinician.!"
          },
          "aqlPath": "/content[openEHR-EHR-OBSERVATION.global-hsl.v1]",
          "children": [
            {
              "name": "Vaccination",
              "localizedName": "Vaccination",
              "rmType": "CLUSTER",
              "nodeId": "at0.177",
              "min": 0,
              "max": 1,
              "localizedNames": {
                "pt-br": "",
                "en": "*New cluster(en)"
              },
              "localizedDescriptions": {
                "en": "**(en)"
              },
              "aqlPath": "/content[openEHR-EHR-OBSERVATION.global-hsl.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0.177]",
              "children": [
                {
                  "name": "Observation",
                  "localizedName": "Observation",
                  "rmType": "DV_TEXT",
                  "nodeId": "at0.180",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {
                    "pt-br": "",
                    "en": "*New element(en)"
                  },
                  "localizedDescriptions": {
                    "en": "**(en)"
                  },
                  "aqlPath": "/content[openEHR-EHR-OBSERVATION.global-hsl.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0.177]/items[at0.180]/value",
                  "inputs": [
                    {
                      "type": "TEXT"
                    }
                  ],
                  "formId": "encounter/global_assessment/new_cluster_en/new_element_en",
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
                  "name": "Image of card",
                  "localizedName": "Image of card",
                  "rmType": "DV_MULTIMEDIA",
                  "nodeId": "at0.210",
                  "min": 0,
                  "max": 100,
                  "localizedNames": {
                    "pt-br": "",
                    "en": "*New element(en)"
                  },
                  "localizedDescriptions": {
                    "en": "**(en)"
                  },
                  "aqlPath": "/content[openEHR-EHR-OBSERVATION.global-hsl.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0.177]/items[at0.210]/value",
                  "inputs": [
                    {
                      "type": "TEXT",
                      "defaultValue": "multiUri"
                    }
                  ],
                  "formId": "encounter/global_assessment/new_cluster_en/new_element_en2",
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
                      "custom": false
                    },
                    "annotations": {

                    },
                    "tags":["multi"]
                  }
                }
              ],
              "formId": "encounter/global_assessment/new_cluster_en",
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
          ],
          "formId": "encounter/global_assessment",
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

    var deps = [];

    var values = {};

    var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, values, deps);
    var tm = rm.findSuccessorWithPath("encounter/global_assessment/new_cluster_en/new_element_en2") as MultimediaFieldModel;
    expect(tm.getDependencyNode()).toBeFalsy();
    expect(tm.getViewConfig().isHidden()).toBeFalsy();
    expect(tm.getViewConfig().isReadOnly()).toBeFalsy();
    expect(tm.isMulti()).toBeTruthy();
    expect(tm.defaultValueUri()).toBe("multiUri");
    var newVal = '/path/to/file.png';
    expect(tm.uriValue(newVal, 0)).toBe(newVal);
    expect(tm.uriValue(undefined, 0)).toBe(newVal);
    expect(tm.getValue()[0]["|uri"]).toBe(newVal);
    tm.clearUriValue(0);
    expect(tm.uriValue(undefined, 0)).toBe(null);

    var newVal1 = '/path/to/file1.png';
    expect(tm.uriValue(newVal,0)).toBe(newVal);
    expect(tm.uriValue(newVal1,1)).toBe(newVal1);
    expect(tm.uriValue(undefined,0)).toBe(newVal);
    expect(tm.uriValue(undefined,1)).toBe(newVal1);
    expect(tm.uriValue(undefined, undefined).length).toBe(2);
    expect(tm.getValue(undefined, undefined)[0]["|uri"]).toBe(newVal);
    expect(tm.getValue(undefined, undefined)[1]["|uri"]).toBe(newVal1);
    expect(tm.getRmType()).toBe(RmType.DV_MULTIMEDIA);

  });

  it("DV_MULTIMEDIA set values object - multi", function () {

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
        "pt-br"
      ],
      "children": [
        {
          "name": "Global assessment!",
          "localizedName": "Global assessment!",
          "rmType": "OBSERVATION",
          "nodeId": "openEHR-EHR-OBSERVATION.global-hsl.v1",
          "min": 0,
          "max": -1,
          "localizedNames": {
            "pt-br": "",
            "en": "Global assessment!"
          },
          "localizedDescriptions": {
            "en": "General assessment of the whole patient by the clinician.!"
          },
          "aqlPath": "/content[openEHR-EHR-OBSERVATION.global-hsl.v1]",
          "children": [
            {
              "name": "Vaccination",
              "localizedName": "Vaccination",
              "rmType": "CLUSTER",
              "nodeId": "at0.177",
              "min": 0,
              "max": 1,
              "localizedNames": {
                "pt-br": "",
                "en": "*New cluster(en)"
              },
              "localizedDescriptions": {
                "en": "**(en)"
              },
              "aqlPath": "/content[openEHR-EHR-OBSERVATION.global-hsl.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0.177]",
              "children": [
                {
                  "name": "Observation",
                  "localizedName": "Observation",
                  "rmType": "DV_TEXT",
                  "nodeId": "at0.180",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {
                    "pt-br": "",
                    "en": "*New element(en)"
                  },
                  "localizedDescriptions": {
                    "en": "**(en)"
                  },
                  "aqlPath": "/content[openEHR-EHR-OBSERVATION.global-hsl.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0.177]/items[at0.180]/value",
                  "inputs": [
                    {
                      "type": "TEXT"
                    }
                  ],
                  "formId": "encounter/global_assessment/new_cluster_en/new_element_en",
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
                  "name": "Image of card",
                  "localizedName": "Image of card",
                  "rmType": "DV_MULTIMEDIA",
                  "nodeId": "at0.210",
                  "min": 0,
                  "max": 100,
                  "localizedNames": {
                    "pt-br": "",
                    "en": "*New element(en)"
                  },
                  "localizedDescriptions": {
                    "en": "**(en)"
                  },
                  "aqlPath": "/content[openEHR-EHR-OBSERVATION.global-hsl.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0.177]/items[at0.210]/value",
                  "inputs": [
                    {
                      "type": "TEXT",
                      "defaultValue": "multiUri"
                    }
                  ],
                  "formId": "encounter/global_assessment/new_cluster_en/new_element_en2",
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
                      "custom": false
                    },
                    "annotations": {

                    },
                    "tags":["multi"]
                  }
                }
              ],
              "formId": "encounter/global_assessment/new_cluster_en",
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
          ],
          "formId": "encounter/global_assessment",
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

    var deps = [];

    var values:any = {
      "encounter": {
        "global_assessment": [
          {
            "new_cluster_en": [
              {
                "new_element_en": [],
                "new_element_en2": [
                  {"|uri":"setUriValue", "|mimetype":"my/mime"},
                  {"|uri":"setUriValue1", "|mimetype":"my/mime1"}
                ]
              }
            ]
          }
        ]
      }
    };

    var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, values, deps);
    var tm = rm.findSuccessorWithPath("encounter/global_assessment/new_cluster_en/new_element_en2") as MultimediaFieldModel;
    expect(tm.getDependencyNode()).toBeFalsy();
    expect(tm.getViewConfig().isHidden()).toBeFalsy();
    expect(tm.getViewConfig().isReadOnly()).toBeFalsy();
    expect(tm.isMulti()).toBeTruthy();
    expect(tm.defaultValueUri()).toBe("multiUri");

    expect(tm.uriValue(undefined, 0)).toBe(values.encounter.global_assessment[0].new_cluster_en[0].new_element_en2[0]["|uri"]);
    expect(tm.mimeTypeValue(undefined, 0)).toBe(values.encounter.global_assessment[0].new_cluster_en[0].new_element_en2[0]["|mimetype"]);
    expect(tm.uriValue(undefined, 1)).toBe(values.encounter.global_assessment[0].new_cluster_en[0].new_element_en2[1]["|uri"]);
    expect(tm.mimeTypeValue(undefined, 1)).toBe(values.encounter.global_assessment[0].new_cluster_en[0].new_element_en2[1]["|mimetype"]);

    var newVal = '/path/to/file.png';
    expect(tm.uriValue(newVal, 0)).toBe(newVal);
    expect(tm.uriValue(undefined, 0)).toBe(newVal);
    expect(tm.getValue()[0]["|uri"]).toBe(newVal);
    tm.clearUriValue(0);
    expect(tm.uriValue(undefined, 0)).toBe(null);

    var newVal1 = '/path/to/file1.png';
    expect(tm.uriValue(newVal,0)).toBe(newVal);
    expect(tm.uriValue(newVal1,1)).toBe(newVal1);
    expect(tm.uriValue(undefined,0)).toBe(newVal);
    expect(tm.uriValue(undefined,1)).toBe(newVal1);
    expect(tm.uriValue(undefined, undefined).length).toBe(2);
    expect(tm.getValue(undefined, undefined)[0]["|uri"]).toBe(newVal);
    expect(tm.getValue(undefined, undefined)[1]["|uri"]).toBe(newVal1);
    expect(tm.getRmType()).toBe(RmType.DV_MULTIMEDIA);

  });

  it("DV_MULTIMEDIA set values object", function () {

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
        "pt-br"
      ],
      "children": [
        {
          "name": "Global assessment!",
          "localizedName": "Global assessment!",
          "rmType": "OBSERVATION",
          "nodeId": "openEHR-EHR-OBSERVATION.global-hsl.v1",
          "min": 0,
          "max": -1,
          "localizedNames": {
            "pt-br": "",
            "en": "Global assessment!"
          },
          "localizedDescriptions": {
            "en": "General assessment of the whole patient by the clinician.!"
          },
          "aqlPath": "/content[openEHR-EHR-OBSERVATION.global-hsl.v1]",
          "children": [
            {
              "name": "Vaccination",
              "localizedName": "Vaccination",
              "rmType": "CLUSTER",
              "nodeId": "at0.177",
              "min": 0,
              "max": 1,
              "localizedNames": {
                "pt-br": "",
                "en": "*New cluster(en)"
              },
              "localizedDescriptions": {
                "en": "**(en)"
              },
              "aqlPath": "/content[openEHR-EHR-OBSERVATION.global-hsl.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0.177]",
              "children": [
                {
                  "name": "Observation",
                  "localizedName": "Observation",
                  "rmType": "DV_TEXT",
                  "nodeId": "at0.180",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {
                    "pt-br": "",
                    "en": "*New element(en)"
                  },
                  "localizedDescriptions": {
                    "en": "**(en)"
                  },
                  "aqlPath": "/content[openEHR-EHR-OBSERVATION.global-hsl.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0.177]/items[at0.180]/value",
                  "inputs": [
                    {
                      "type": "TEXT"
                    }
                  ],
                  "formId": "encounter/global_assessment/new_cluster_en/new_element_en",
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
                  "name": "Image of card",
                  "localizedName": "Image of card",
                  "rmType": "DV_MULTIMEDIA",
                  "nodeId": "at0.210",
                  "min": 0,
                  "max": 100,
                  "localizedNames": {
                    "pt-br": "",
                    "en": "*New element(en)"
                  },
                  "localizedDescriptions": {
                    "en": "**(en)"
                  },
                  "aqlPath": "/content[openEHR-EHR-OBSERVATION.global-hsl.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0.177]/items[at0.210]/value",
                  "inputs": [
                    {
                      "type": "TEXT",
                      "defaultValue": "multiUri"
                    }
                  ],
                  "formId": "encounter/global_assessment/new_cluster_en/new_element_en2",
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
                      "custom": false
                    },
                    "annotations": {

                    },
                    "tags":[]
                  }
                }
              ],
              "formId": "encounter/global_assessment/new_cluster_en",
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
          ],
          "formId": "encounter/global_assessment",
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

    var deps = [];

    var values:any = {
      "encounter": {
        "global_assessment": [
          {
            "new_cluster_en": [
              {
                "new_element_en": [],
                "new_element_en2": [
                  {"|uri":"setUriValue", "|mimetype":"my/mime"}
                ]
              }
            ]
          }
        ]
      }
    };

    var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, values, deps);
    var tm = rm.findSuccessorWithPath("encounter/global_assessment/new_cluster_en/new_element_en2") as MultimediaFieldModel;
    expect(tm.getDependencyNode()).toBeFalsy();
    expect(tm.getViewConfig().isHidden()).toBeFalsy();
    expect(tm.getViewConfig().isReadOnly()).toBeFalsy();
    expect(tm.isMulti()).toBeTruthy();
    expect(tm.defaultValueUri()).toBe("multiUri");

    expect(tm.uriValue(undefined, 0)).toBe(values.encounter.global_assessment[0].new_cluster_en[0].new_element_en2[0]["|uri"]);
    expect(tm.mimeTypeValue(undefined, 0)).toBe(values.encounter.global_assessment[0].new_cluster_en[0].new_element_en2[0]["|mimetype"]);

    var newVal = '/path/to/file.png';
    expect(tm.uriValue(newVal, 0)).toBe(newVal);
    expect(tm.uriValue(undefined, 0)).toBe(newVal);
    expect(tm.uriValue()[0]).toBe(newVal);
    expect(tm.getValue()[0]["|uri"]).toBe(newVal);
    tm.clearUriValue(0);
    expect(tm.uriValue(undefined, 0)).toBe(null);

    expect(tm.getRmType()).toBe(RmType.DV_MULTIMEDIA);

  });

  it("DV_MULTIMEDIA dependency set values - multi", function () {
    console.log("TODO Multimedia dependencies");
   /* var desc:any = {
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
        "pt-br"
      ],
      "children": [
        {
          "name": "Global assessment!",
          "localizedName": "Global assessment!",
          "rmType": "OBSERVATION",
          "nodeId": "openEHR-EHR-OBSERVATION.global-hsl.v1",
          "min": 0,
          "max": -1,
          "localizedNames": {
            "pt-br": "",
            "en": "Global assessment!"
          },
          "localizedDescriptions": {
            "en": "General assessment of the whole patient by the clinician.!"
          },
          "aqlPath": "/content[openEHR-EHR-OBSERVATION.global-hsl.v1]",
          "children": [
            {
              "name": "Vaccination",
              "localizedName": "Vaccination",
              "rmType": "CLUSTER",
              "nodeId": "at0.177",
              "min": 0,
              "max": 1,
              "localizedNames": {
                "pt-br": "",
                "en": "*New cluster(en)"
              },
              "localizedDescriptions": {
                "en": "**(en)"
              },
              "aqlPath": "/content[openEHR-EHR-OBSERVATION.global-hsl.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0.177]",
              "children": [
                {
                  "name": "Observation",
                  "localizedName": "Observation",
                  "rmType": "DV_TEXT",
                  "nodeId": "at0.180",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {
                    "pt-br": "",
                    "en": "*New element(en)"
                  },
                  "localizedDescriptions": {
                    "en": "**(en)"
                  },
                  "aqlPath": "/content[openEHR-EHR-OBSERVATION.global-hsl.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0.177]/items[at0.180]/value",
                  "inputs": [
                    {
                      "type": "TEXT"
                    }
                  ],
                  "formId": "encounter/global_assessment/new_cluster_en/new_element_en",
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
                  "name": "Image of card",
                  "localizedName": "Image of card",
                  "rmType": "DV_MULTIMEDIA",
                  "nodeId": "at0.210",
                  "min": 0,
                  "max": 100,
                  "localizedNames": {
                    "pt-br": "",
                    "en": "*New element(en)"
                  },
                  "localizedDescriptions": {
                    "en": "**(en)"
                  },
                  "aqlPath": "/content[openEHR-EHR-OBSERVATION.global-hsl.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0.177]/items[at0.210]/value",
                  "inputs": [
                    {
                      "type": "TEXT",
                      "defaultValue": "multiUri"
                    }
                  ],
                  "formId": "encounter/global_assessment/new_cluster_en/new_element_en2",
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
                      "custom": false
                    },
                    "annotations": {

                    },
                    "tags":["multi"]
                  }
                }
              ],
              "formId": "encounter/global_assessment/new_cluster_en",
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
          ],
          "formId": "encounter/global_assessment",
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

    var deps:any = [
      {
        "field": "encounter/global_assessment/new_cluster_en/new_element_en",
        "conditions": [
          {
            "operator": "equals",
            "value": {
              "value": "set"
            },
            "actions": [
              {
                "action": "set",
                "target": "encounter/global_assessment/new_cluster_en/new_element_en2",
                "value": {
                  "value": "set/image.jpg"
                }
              }
            ]
          }
        ]
      }
    ];

    var values = {};

    var rm = (new ThinkEhrModelParser(rmTypeModelDictionary) ).parseFormDescription({}, desc, values, deps) as FormRootModel;
    var ast = rm.getDependencyNode();
    expect(ast instanceof Ast).toBeTruthy();
    var text = rm.findSuccessorWithPath("encounter/global_assessment/new_cluster_en/new_element_en");
    var multimedia = rm.findSuccessorWithPath("encounter/global_assessment/new_cluster_en/new_element_en2");
    expect(multimedia.getDependencyNode()).toBeFalsy();
    expect(multimedia.getViewConfig().isHidden()).toBeFalsy();
    expect(multimedia.getViewConfig().isReadOnly()).toBeFalsy();
    expect(multimedia.isMulti()).toBeTruthy();
    expect(text.textValue("set"));
    ast.process({});

    expect(multimedia.uriValue(undefined,0)).toBe("set/image.jpg");

    expect(multimedia.getRmType()).toBe(RmType.DV_MULTIMEDIA);*/

  });

  it("DV_MULTIMEDIA dependency set values", function () {
    console.log("TODO Multimedia dependencies");
    /*var desc:any = {
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
        "pt-br"
      ],
      "children": [
        {
          "name": "Global assessment!",
          "localizedName": "Global assessment!",
          "rmType": "OBSERVATION",
          "nodeId": "openEHR-EHR-OBSERVATION.global-hsl.v1",
          "min": 0,
          "max": -1,
          "localizedNames": {
            "pt-br": "",
            "en": "Global assessment!"
          },
          "localizedDescriptions": {
            "en": "General assessment of the whole patient by the clinician.!"
          },
          "aqlPath": "/content[openEHR-EHR-OBSERVATION.global-hsl.v1]",
          "children": [
            {
              "name": "Vaccination",
              "localizedName": "Vaccination",
              "rmType": "CLUSTER",
              "nodeId": "at0.177",
              "min": 0,
              "max": 1,
              "localizedNames": {
                "pt-br": "",
                "en": "*New cluster(en)"
              },
              "localizedDescriptions": {
                "en": "**(en)"
              },
              "aqlPath": "/content[openEHR-EHR-OBSERVATION.global-hsl.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0.177]",
              "children": [
                {
                  "name": "Observation",
                  "localizedName": "Observation",
                  "rmType": "DV_TEXT",
                  "nodeId": "at0.180",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {
                    "pt-br": "",
                    "en": "*New element(en)"
                  },
                  "localizedDescriptions": {
                    "en": "**(en)"
                  },
                  "aqlPath": "/content[openEHR-EHR-OBSERVATION.global-hsl.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0.177]/items[at0.180]/value",
                  "inputs": [
                    {
                      "type": "TEXT"
                    }
                  ],
                  "formId": "encounter/global_assessment/new_cluster_en/new_element_en",
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
                  "name": "Image of card",
                  "localizedName": "Image of card",
                  "rmType": "DV_MULTIMEDIA",
                  "nodeId": "at0.210",
                  "min": 0,
                  "max": 100,
                  "localizedNames": {
                    "pt-br": "",
                    "en": "*New element(en)"
                  },
                  "localizedDescriptions": {
                    "en": "**(en)"
                  },
                  "aqlPath": "/content[openEHR-EHR-OBSERVATION.global-hsl.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0.177]/items[at0.210]/value",
                  "inputs": [
                    {
                      "type": "TEXT",
                      "defaultValue": "multiUri"
                    }
                  ],
                  "formId": "encounter/global_assessment/new_cluster_en/new_element_en2",
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
                      "custom": false
                    },
                    "annotations": {

                    },
                    "tags":[""]
                  }
                }
              ],
              "formId": "encounter/global_assessment/new_cluster_en",
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
          ],
          "formId": "encounter/global_assessment",
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

    var deps:any = [
      {
        "field": "encounter/global_assessment/new_cluster_en/new_element_en",
        "conditions": [
          {
            "operator": "equals",
            "value": {
              "value": "set"
            },
            "actions": [
              {
                "action": "set",
                "target": "encounter/global_assessment/new_cluster_en/new_element_en2",
                "value": {
                  "value": "set/image.jpg"
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
    var text = rm.findSuccessorWithPath("encounter/global_assessment/new_cluster_en/new_element_en");
    var multimedia = rm.findSuccessorWithPath("encounter/global_assessment/new_cluster_en/new_element_en2");
    expect(multimedia.getDependencyNode()).toBeFalsy();
    expect(multimedia.getViewConfig().isHidden()).toBeFalsy();
    expect(multimedia.getViewConfig().isReadOnly()).toBeFalsy();
    expect(multimedia.isMulti()).toBeFalsy();
    expect(text.textValue("set"));
    ast.process({});

    expect(multimedia.uriValue()).toBe("set/image.jpg");

    expect(multimedia.getRmType()).toBe(RmType.DV_MULTIMEDIA);*/

  });

  it("DV_MULTIMEDIA dependency clear values", function () {

    console.log("TODO Multimedia dependencies");
    /*var desc:any = {
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
        "pt-br"
      ],
      "children": [
        {
          "name": "Global assessment!",
          "localizedName": "Global assessment!",
          "rmType": "OBSERVATION",
          "nodeId": "openEHR-EHR-OBSERVATION.global-hsl.v1",
          "min": 0,
          "max": -1,
          "localizedNames": {
            "pt-br": "",
            "en": "Global assessment!"
          },
          "localizedDescriptions": {
            "en": "General assessment of the whole patient by the clinician.!"
          },
          "aqlPath": "/content[openEHR-EHR-OBSERVATION.global-hsl.v1]",
          "children": [
            {
              "name": "Vaccination",
              "localizedName": "Vaccination",
              "rmType": "CLUSTER",
              "nodeId": "at0.177",
              "min": 0,
              "max": 1,
              "localizedNames": {
                "pt-br": "",
                "en": "*New cluster(en)"
              },
              "localizedDescriptions": {
                "en": "**(en)"
              },
              "aqlPath": "/content[openEHR-EHR-OBSERVATION.global-hsl.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0.177]",
              "children": [
                {
                  "name": "Observation",
                  "localizedName": "Observation",
                  "rmType": "DV_TEXT",
                  "nodeId": "at0.180",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {
                    "pt-br": "",
                    "en": "*New element(en)"
                  },
                  "localizedDescriptions": {
                    "en": "**(en)"
                  },
                  "aqlPath": "/content[openEHR-EHR-OBSERVATION.global-hsl.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0.177]/items[at0.180]/value",
                  "inputs": [
                    {
                      "type": "TEXT"
                    }
                  ],
                  "formId": "encounter/global_assessment/new_cluster_en/new_element_en",
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
                  "name": "Image of card",
                  "localizedName": "Image of card",
                  "rmType": "DV_MULTIMEDIA",
                  "nodeId": "at0.210",
                  "min": 0,
                  "max": 100,
                  "localizedNames": {
                    "pt-br": "",
                    "en": "*New element(en)"
                  },
                  "localizedDescriptions": {
                    "en": "**(en)"
                  },
                  "aqlPath": "/content[openEHR-EHR-OBSERVATION.global-hsl.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0.177]/items[at0.210]/value",
                  "inputs": [
                    {
                      "type": "TEXT",
                      "defaultValue": "multiUri"
                    }
                  ],
                  "formId": "encounter/global_assessment/new_cluster_en/new_element_en2",
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
                      "custom": false
                    },
                    "annotations": {

                    },
                    "tags":[""]
                  }
                }
              ],
              "formId": "encounter/global_assessment/new_cluster_en",
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
          ],
          "formId": "encounter/global_assessment",
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

    var deps:any = [
      {
        "field": "encounter/global_assessment/new_cluster_en/new_element_en",
        "conditions": [
          {
            "operator": "equals",
            "value": {
              "value": "clear"
            },
            "actions": [
              {
                "action": "clear",
                "target": "encounter/global_assessment/new_cluster_en/new_element_en2",
                "value": {
                  "value": "set/image.jpg"
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
    var text = rm.findSuccessorWithPath("encounter/global_assessment/new_cluster_en/new_element_en");
    var multimedia = rm.findSuccessorWithPath("encounter/global_assessment/new_cluster_en/new_element_en2");
    expect(multimedia.getDependencyNode()).toBeFalsy();
    expect(multimedia.getViewConfig().isHidden()).toBeFalsy();
    expect(multimedia.getViewConfig().isReadOnly()).toBeFalsy();
    expect(multimedia.isMulti()).toBeFalsy();
    multimedia.uriValue("set/image.jpg");
    expect(multimedia.uriValue()).toBe("set/image.jpg");
    expect(text.textValue("clear"));
    ast.process({});

    expect(multimedia.uriValue()).toBe(null);

    expect(multimedia.getRmType()).toBe(RmType.DV_MULTIMEDIA);*/

  });

  it("DV_MULTIMEDIA dependency clear values - multi", function () {

    console.log("TODO Multimedia dependencies");
    /*var desc:any = {
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
        "pt-br"
      ],
      "children": [
        {
          "name": "Global assessment!",
          "localizedName": "Global assessment!",
          "rmType": "OBSERVATION",
          "nodeId": "openEHR-EHR-OBSERVATION.global-hsl.v1",
          "min": 0,
          "max": -1,
          "localizedNames": {
            "pt-br": "",
            "en": "Global assessment!"
          },
          "localizedDescriptions": {
            "en": "General assessment of the whole patient by the clinician.!"
          },
          "aqlPath": "/content[openEHR-EHR-OBSERVATION.global-hsl.v1]",
          "children": [
            {
              "name": "Vaccination",
              "localizedName": "Vaccination",
              "rmType": "CLUSTER",
              "nodeId": "at0.177",
              "min": 0,
              "max": 1,
              "localizedNames": {
                "pt-br": "",
                "en": "*New cluster(en)"
              },
              "localizedDescriptions": {
                "en": "**(en)"
              },
              "aqlPath": "/content[openEHR-EHR-OBSERVATION.global-hsl.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0.177]",
              "children": [
                {
                  "name": "Observation",
                  "localizedName": "Observation",
                  "rmType": "DV_TEXT",
                  "nodeId": "at0.180",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {
                    "pt-br": "",
                    "en": "*New element(en)"
                  },
                  "localizedDescriptions": {
                    "en": "**(en)"
                  },
                  "aqlPath": "/content[openEHR-EHR-OBSERVATION.global-hsl.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0.177]/items[at0.180]/value",
                  "inputs": [
                    {
                      "type": "TEXT"
                    }
                  ],
                  "formId": "encounter/global_assessment/new_cluster_en/new_element_en",
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
                  "name": "Image of card",
                  "localizedName": "Image of card",
                  "rmType": "DV_MULTIMEDIA",
                  "nodeId": "at0.210",
                  "min": 0,
                  "max": 100,
                  "localizedNames": {
                    "pt-br": "",
                    "en": "*New element(en)"
                  },
                  "localizedDescriptions": {
                    "en": "**(en)"
                  },
                  "aqlPath": "/content[openEHR-EHR-OBSERVATION.global-hsl.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0.177]/items[at0.210]/value",
                  "inputs": [
                    {
                      "type": "TEXT",
                      "defaultValue": "multiUri"
                    }
                  ],
                  "formId": "encounter/global_assessment/new_cluster_en/new_element_en2",
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
                      "custom": false
                    },
                    "annotations": {

                    },
                    "tags":["multi"]
                  }
                }
              ],
              "formId": "encounter/global_assessment/new_cluster_en",
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
          ],
          "formId": "encounter/global_assessment",
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

    var deps:any = [
      {
        "field": "encounter/global_assessment/new_cluster_en/new_element_en",
        "conditions": [
          {
            "operator": "equals",
            "value": {
              "value": "clear"
            },
            "actions": [
              {
                "action": "clear",
                "target": "encounter/global_assessment/new_cluster_en/new_element_en2",
                "value": {
                  "value": "set/image.jpg"
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
    var text = rm.findSuccessorWithPath("encounter/global_assessment/new_cluster_en/new_element_en");
    var multimedia = rm.findSuccessorWithPath("encounter/global_assessment/new_cluster_en/new_element_en2");
    expect(multimedia.getDependencyNode()).toBeFalsy();
    expect(multimedia.getViewConfig().isHidden()).toBeFalsy();
    expect(multimedia.getViewConfig().isReadOnly()).toBeFalsy();
    expect(multimedia.isMulti()).toBeTruthy();
    multimedia.uriValue("set/image.jpg",0);
    multimedia.uriValue("set/image1.jpg",1);
    expect(multimedia.uriValue(undefined,0)).toBe("set/image.jpg");
    expect(multimedia.uriValue(undefined,1)).toBe("set/image1.jpg");
    text.textValue("clear");
    ast.process({});

    expect(multimedia.uriValue(undefined,0)).toBe(null);
    expect(multimedia.uriValue(undefined,1)).toBe(null);

    expect(multimedia.getRmType()).toBe(RmType.DV_MULTIMEDIA);
*/
  });

  it("DV_MULTIMEDIA dependency reset value - multi", function () {

    console.log("TODO Multimedia dependencies");
    /*var desc:any = {
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
        "pt-br"
      ],
      "children": [
        {
          "name": "Global assessment!",
          "localizedName": "Global assessment!",
          "rmType": "OBSERVATION",
          "nodeId": "openEHR-EHR-OBSERVATION.global-hsl.v1",
          "min": 0,
          "max": -1,
          "localizedNames": {
            "pt-br": "",
            "en": "Global assessment!"
          },
          "localizedDescriptions": {
            "en": "General assessment of the whole patient by the clinician.!"
          },
          "aqlPath": "/content[openEHR-EHR-OBSERVATION.global-hsl.v1]",
          "children": [
            {
              "name": "Vaccination",
              "localizedName": "Vaccination",
              "rmType": "CLUSTER",
              "nodeId": "at0.177",
              "min": 0,
              "max": 1,
              "localizedNames": {
                "pt-br": "",
                "en": "*New cluster(en)"
              },
              "localizedDescriptions": {
                "en": "**(en)"
              },
              "aqlPath": "/content[openEHR-EHR-OBSERVATION.global-hsl.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0.177]",
              "children": [
                {
                  "name": "Observation",
                  "localizedName": "Observation",
                  "rmType": "DV_TEXT",
                  "nodeId": "at0.180",
                  "min": 0,
                  "max": 1,
                  "localizedNames": {
                    "pt-br": "",
                    "en": "*New element(en)"
                  },
                  "localizedDescriptions": {
                    "en": "**(en)"
                  },
                  "aqlPath": "/content[openEHR-EHR-OBSERVATION.global-hsl.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0.177]/items[at0.180]/value",
                  "inputs": [
                    {
                      "type": "TEXT"
                    }
                  ],
                  "formId": "encounter/global_assessment/new_cluster_en/new_element_en",
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
                  "name": "Image of card",
                  "localizedName": "Image of card",
                  "rmType": "DV_MULTIMEDIA",
                  "nodeId": "at0.210",
                  "min": 0,
                  "max": 100,
                  "localizedNames": {
                    "pt-br": "",
                    "en": "*New element(en)"
                  },
                  "localizedDescriptions": {
                    "en": "**(en)"
                  },
                  "aqlPath": "/content[openEHR-EHR-OBSERVATION.global-hsl.v1]/data[at0001]/events[at0002]/data[at0003]/items[at0.177]/items[at0.210]/value",
                  "inputs": [
                    {
                      "type": "TEXT",
                      "defaultValue": "multiUri"
                    }
                  ],
                  "formId": "encounter/global_assessment/new_cluster_en/new_element_en2",
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
                      "custom": false
                    },
                    "annotations": {

                    },
                    "tags":["multi"]
                  }
                }
              ],
              "formId": "encounter/global_assessment/new_cluster_en",
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
          ],
          "formId": "encounter/global_assessment",
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

    var deps:any = [
      {
        "field": "encounter/global_assessment/new_cluster_en/new_element_en",
        "conditions": [
          {
            "operator": "equals",
            "value": {
              "value": "reset"
            },
            "actions": [
              {
                "action": "reset",
                "target": "encounter/global_assessment/new_cluster_en/new_element_en2",
                "value": {
                  "value": "set/image.jpg"
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
    var text = rm.findSuccessorWithPath("encounter/global_assessment/new_cluster_en/new_element_en");
    var multimedia = rm.findSuccessorWithPath("encounter/global_assessment/new_cluster_en/new_element_en2");
    expect(multimedia.getDependencyNode()).toBeFalsy();
    expect(multimedia.getViewConfig().isHidden()).toBeFalsy();
    expect(multimedia.getViewConfig().isReadOnly()).toBeFalsy();
    expect(multimedia.isMulti()).toBeTruthy();
    expect(multimedia.defaultValueUri()).toBe("multiUri");
    multimedia.uriValue("set/image.jpg",0);
    multimedia.uriValue("set/image1.jpg",1);
    expect(multimedia.uriValue(undefined,0)).toBe("set/image.jpg");
    expect(multimedia.uriValue(undefined,1)).toBe("set/image1.jpg");
    text.textValue("reset");
    ast.process({});

    expect(multimedia.uriValue(undefined,undefined).length).toBe(1);
    expect(multimedia.uriValue(undefined,0)).toBe("multiUri");

    expect(multimedia.getRmType()).toBe(RmType.DV_MULTIMEDIA);
*/
  });

});

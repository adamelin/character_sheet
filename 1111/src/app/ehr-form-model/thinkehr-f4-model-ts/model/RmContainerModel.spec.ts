import {ThinkEhrModelParser} from '../parsing/ThinkEhrModelParser';
import {FormRootModel} from './FormRootModel';
import {TextFieldModel} from './fieldModel/TextFieldModel';
import {rmTypeModelDictionary} from './rmTypeModelDictonary';
import {QuantityFieldModel} from './fieldModel/QuantityFieldModel';
import {FormRepeatableElementModel} from './FormRepeatableElementModel';
import {Model} from './Model';
import {AbstractContainerModel} from './AbstractContainerModel';


describe('RmContainerModel', () => {
  /*
  ex 1:

  container1 (min: 0)
    container2 (min: 0)
        field1 (min: 1) [valid even if empty because container2 is not required and empty]

  ex 2:

    container1 (min: 0)
      container2 (min: 0)
          field1 (min: 1) [invalid if empty because field2 is not empty]
          field2 (min: 0) [ this field has value]

  ex 2.1:

    container1 (min: 0)
      container2 (min: 0)
               field3(min:0) [has value]
          field1 (min: 1) [invalid if empty because container2 is not empty]
          field2 (min: 0) [ empty field]

   ex 3:

   container1 (min: 1)
    container2 (min: 1)
        field1 (min: 1) [invalid if empty because all containers are mandatory]

   ex 4:

   container1 (min: 0)
     container2 (min: 1)
         field1 (min: 1) [valid if empty because container1 is empty => container2 is valid even if empty]
         field2 (min: 0) [empty field]

  ex 5:

  container1 (min: 0)
        field3 (min: 0) [ this field has value]
    container2 (min: 1)
           field1 (min: 1) [invalid if empty because field3 has value => container1 is not empty and container2 becomes required and all required fields in it should have values]
           field2 (min: 0) [empty field]

   ex 6:

   container1 (min: 0)
     container2 (min: 1)
             field3 (min:1) [valid if empty because of parent is not required]
         field1 (min: 1) [valid if empty]
         field2 (min: 0) [empty field]
*/
  it('Container structured validation - sibling empty, not empty (ex. 1,2)', function (done) {

    const desc = {
      'formId': 'form_root',
      'name': 'Form root',
      'rmType': 'FORM_DEFINITION',
      'viewConfig': {
        'label': {
          'custom': false,
          'value': '',
          'useLocalizations': false,
          'localizationsList': {}
        },
        'size': {
          'field': 'inherit',
          'label': 'inherit',
          'fill': 'inherit'
        },
        'layout': {
          'valign': 'inherit',
          'align': 'inherit'
        },
        'tags': []
      },
      'templateLanguages': [
        'en',
        'sl'
      ],
      'children': [
        {
          'name': 'Body temperature',
          'localizedName': 'Body temperature',
          'rmType': 'OBSERVATION',
          'nodeId': 'openEHR-EHR-OBSERVATION.body_temperature.v1',
          'min': 0,
          'max': -1,
          'localizedNames': {
            'en': 'Body temperature',
            'sl': 'Telesna temperature'
          },
          'localizedDescriptions': {
            'en': 'A measurement of the body temperature, which is a surrogate for the whole body temperature of the person.',
            'sl': '*A measurement of the body temperature, which is a surrogate for the whole body temperature of the person.(en)'
          },
          'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]',
          'children': [
            {
              'name': 'Any event',
              'localizedName': 'Any event',
              'rmType': 'EVENT',
              'nodeId': 'at0003',
              'min': 0,
              'max': -1,
              'localizedNames': {
                'en': 'Any event',
                'sl': 'Any event'
              },
              'localizedDescriptions': {
                'en': 'Any event',
                'sl': '*Any event(en)'
              },
              'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]',
              'children': [
                {
                  'name': 'Temperature',
                  'localizedName': 'Temperature',
                  'rmType': 'DV_QUANTITY',
                  'nodeId': 'at0004',
                  'min': 1,
                  'max': 1,
                  'localizedNames': {
                    'en': 'Temperature',
                    'sl': 'Telesna temperature'
                  },
                  'localizedDescriptions': {
                    'en': 'The measured body temperature (as a surrogate for the whole body)',
                    'sl': '*The measured body temperature (as a surrogate for the whole body)(en)'
                  },
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value',
                  'inputs': [
                    {
                      'suffix': 'magnitude',
                      'type': 'DECIMAL'
                    },
                    {
                      'suffix': 'unit',
                      'type': 'CODED_TEXT',
                      'list': [
                        {
                          'value': '°C',
                          'label': '°C',
                          'validation': {
                            'precision': {
                              'minOp': '>=',
                              'min': 1,
                              'maxOp': '<=',
                              'max': 1
                            }
                          }
                        },
                        {
                          'value': '°F',
                          'label': '°F',
                          'validation': {
                            'precision': {
                              'minOp': '>=',
                              'min': 1,
                              'maxOp': '<=',
                              'max': 1
                            }
                          }
                        }
                      ]
                    }
                  ],
                  'formId': 'vital_signs/body_temperature/any_event/temperature',
                  'viewConfig': {
                    'field': {
                      'unit': {
                        'presentation': 'combobox'
                      }
                    },
                    'size': {
                      'field': 'inherit',
                      'label': 'inherit',
                      'fill': 'inherit'
                    },
                    'layout': {
                      'field': {
                        'valign': 'inherit',
                        'align': 'inherit'
                      }
                    }
                  }
                },
                {
                  'name': 'Body exposure',
                  'localizedName': 'Body exposure',
                  'rmType': 'DV_CODED_TEXT',
                  'nodeId': 'at0030',
                  'min': 0,
                  'max': 1,
                  'dependsOn': [
                    'temperature'
                  ],
                  'localizedNames': {
                    'en': 'Body exposure',
                    'sl': 'Obleka'
                  },
                  'localizedDescriptions': {
                    'en': 'The thermal situation of the person who is having the temperature taken',
                    'sl': '*The thermal situation of the person who is having the temperature taken(en)'
                  },
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]/state[at0029]/items[at0030]/value',
                  'inputs': [
                    {
                      'suffix': 'code',
                      'type': 'CODED_TEXT',
                      'list': [
                        {
                          'value': 'at0031',
                          'label': 'Naked',
                          'localizedLabels': {
                            'en': 'Naked',
                            'sl': 'Gol'
                          },
                          'localizedDescriptions': {
                            'en': 'No clothing, bedding or covering',
                            'sl': '*No clothing, bedding or covering(en)'
                          }
                        },
                        {
                          'value': 'at0032',
                          'label': 'Reduced clothing/bedding',
                          'localizedLabels': {
                            'en': 'Reduced clothing/bedding',
                            'sl': 'Premalo oblečen (zavit)'
                          },
                          'localizedDescriptions': {
                            'en': 'The person is covered by a lesser amount of clothing or bedding than deemed appropriate for the environmental circumstances',
                            'sl': '*The person is covered by a lesser amount of clothing or bedding than deemed appropriate for the environmental circumstances(en)'
                          }
                        },
                        {
                          'value': 'at0033',
                          'label': 'Appropriate clothing/bedding',
                          'localizedLabels': {
                            'en': 'Appropriate clothing/bedding',
                            'sl': 'Primerno oblečen (zavit)'
                          },
                          'localizedDescriptions': {
                            'en': 'The person is covered by an amount of clothing or bedding deemed appropriate for the environmental circumstances',
                            'sl': '*The person is covered by an amount of clothing or bedding deemed appropriate for the environmental circumstances(en)'
                          }
                        },
                        {
                          'value': 'at0034',
                          'label': 'Increased clothing/bedding',
                          'localizedLabels': {
                            'en': 'Increased clothing/bedding',
                            'sl': 'Preveč oblečen (zavit)'
                          },
                          'localizedDescriptions': {
                            'en': 'The person is covered by an increased amount of clothing or bedding than deemed appropriate for the environmental circumstances',
                            'sl': '*The person is covered by an increased amount of clothing or bedding than deemed appropriate for the environmental circumstances(en)'
                          }
                        }
                      ]
                    }
                  ],
                  'formId': 'vital_signs/body_temperature/any_event/body_exposure',
                  'viewConfig': {
                    'field': {
                      'code': {
                        'presentation': 'combobox'
                      }
                    },
                    'size': {
                      'field': 'inherit',
                      'label': 'inherit',
                      'fill': 'inherit'
                    },
                    'layout': {
                      'field': {
                        'valign': 'inherit',
                        'align': 'inherit'
                      }
                    }
                  }
                },
                {
                  'name': 'Description of thermal stress',
                  'localizedName': 'Description of thermal stress',
                  'rmType': 'DV_TEXT',
                  'nodeId': 'at0041',
                  'min': 0,
                  'max': 1,
                  'dependsOn': [
                    'temperature'
                  ],
                  'localizedNames': {
                    'en': 'Description of thermal stress',
                    'sl': 'Opis'
                  },
                  'localizedDescriptions': {
                    'en': 'Description of the conditions applied to the subject that might influence their measured body temperature.',
                    'sl': '*Description of the conditions applied to the subject that might influence their measured body temperature.(en)'
                  },
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]/state[at0029]/items[at0041]/value',
                  'inputs': [
                    {
                      'type': 'TEXT'
                    }
                  ],
                  'formId': 'vital_signs/body_temperature/any_event/description_of_thermal_stress',
                  'viewConfig': {
                    'size': {
                      'field': 'inherit',
                      'label': 'inherit',
                      'fill': 'inherit'
                    },
                    'layout': {
                      'field': {
                        'valign': 'inherit',
                        'align': 'inherit'
                      }
                    }
                  }
                },
                {
                  'name': 'Intervals',
                  'localizedName': 'Intervals',
                  'rmType': 'CLUSTER',
                  'nodeId': 'at0022',
                  'min': 0,
                  'max': 1,
                  'localizedNames': {
                    'en': 'Intervals'
                  },
                  'localizedDescriptions': {
                    'en': '*'
                  },
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0022]',
                  'children': [
                    {
                      'name': 'Quantity',
                      'localizedName': 'Quantity',
                      'rmType': 'DV_INTERVAL<DV_QUANTITY>',
                      'nodeId': 'at0023',
                      'min': 0,
                      'max': 1,
                      'localizedNames': {
                        'en': 'Quantity'
                      },
                      'localizedDescriptions': {
                        'en': '*'
                      },
                      'aqlPath': '/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0022]/items[at0023]/value',
                      'children': [
                        {
                          'rmType': 'DV_QUANTITY',
                          'nodeId': '',
                          'min': 0,
                          'max': 1,
                          'aqlPath': '/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0022]/items[at0023]/value/upper',
                          'inputs': [
                            {
                              'suffix': 'magnitude',
                              'type': 'DECIMAL',
                              'validation': {
                                'range': {
                                  'minOp': '>=',
                                  'min': 0,
                                  'maxOp': '<=',
                                  'max': 300
                                },
                                'precision': {
                                  'minOp': '>=',
                                  'min': 3,
                                  'maxOp': '<=',
                                  'max': 3
                                }
                              }
                            },
                            {
                              'suffix': 'unit',
                              'type': 'CODED_TEXT',
                              'list': [
                                {
                                  'value': 'kg',
                                  'label': 'kg',
                                  'validation': {
                                    'range': {
                                      'minOp': '>=',
                                      'min': 0,
                                      'maxOp': '<=',
                                      'max': 300
                                    },
                                    'precision': {
                                      'minOp': '>=',
                                      'min': 3,
                                      'maxOp': '<=',
                                      'max': 3
                                    }
                                  }
                                }
                              ],
                              'defaultValue': 'kg'
                            }
                          ],
                          'formId': 'test_encounter/testing/testing/intervals/quantity/upper',
                          'viewConfig': {
                            'field': {
                              'unit': {
                                'presentation': 'combobox'
                              }
                            },
                            'size': {
                              'field': 'inherit',
                              'label': 'inherit',
                              'fill': 'inherit'
                            },
                            'layout': {
                              'field': {
                                'valign': 'inherit',
                                'align': 'inherit'
                              }
                            }
                          }
                        },
                        {
                          'rmType': 'DV_QUANTITY',
                          'nodeId': '',
                          'min': 0,
                          'max': 1,
                          'aqlPath': '/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0022]/items[at0023]/value/lower',
                          'inputs': [
                            {
                              'suffix': 'magnitude',
                              'type': 'DECIMAL',
                              'validation': {
                                'range': {
                                  'minOp': '>=',
                                  'min': 0,
                                  'maxOp': '<=',
                                  'max': 200
                                },
                                'precision': {
                                  'minOp': '>=',
                                  'min': 3,
                                  'maxOp': '<=',
                                  'max': 3
                                }
                              }
                            },
                            {
                              'suffix': 'unit',
                              'type': 'CODED_TEXT',
                              'list': [
                                {
                                  'value': 'kg',
                                  'label': 'kg',
                                  'validation': {
                                    'range': {
                                      'minOp': '>=',
                                      'min': 0,
                                      'maxOp': '<=',
                                      'max': 200
                                    },
                                    'precision': {
                                      'minOp': '>=',
                                      'min': 3,
                                      'maxOp': '<=',
                                      'max': 3
                                    }
                                  }
                                }
                              ],
                              'defaultValue': 'kg'
                            }
                          ],
                          'formId': 'test_encounter/testing/testing/intervals/quantity/lower',
                          'viewConfig': {
                            'field': {
                              'unit': {
                                'presentation': 'combobox'
                              }
                            },
                            'size': {
                              'field': 'inherit',
                              'label': 'inherit',
                              'fill': 'inherit'
                            },
                            'layout': {
                              'field': {
                                'valign': 'inherit',
                                'align': 'inherit'
                              }
                            }
                          }
                        }
                      ],
                      'formId': 'test_encounter/testing/testing/intervals/quantity',
                      'viewConfig': {
                        'size': {
                          'field': 'inherit',
                          'label': 'inherit',
                          'fill': 'inherit'
                        },
                        'layout': {
                          'field': {
                            'valign': 'inherit',
                            'align': 'inherit'
                          }
                        }
                      }
                    }
                  ],
                  'formId': 'test_encounter/testing/testing/intervals',
                  'viewConfig': {
                    'size': {
                      'field': 'inherit',
                      'label': 'inherit',
                      'fill': 'inherit'
                    },
                    'layout': {
                      'field': {
                        'valign': 'inherit',
                        'align': 'inherit'
                      }
                    }
                  }
                }
              ],
              'formId': 'vital_signs/body_temperature/any_event',
              'viewConfig': {
                'size': {
                  'field': 'inherit',
                  'label': 'inherit',
                  'fill': 'inherit'
                },
                'layout': {
                  'field': {
                    'valign': 'inherit',
                    'align': 'inherit'
                  }
                }
              }
            },
            {
              'name': 'Site of measurement',
              'localizedName': 'Site of measurement',
              'rmType': 'DV_CODED_TEXT',
              'nodeId': 'at0021',
              'min': 0,
              'max': 1,
              'dependsOn': [
                'any_event'
              ],
              'localizedNames': {
                'en': 'Site of measurement',
                'sl': 'Stran telesa'
              },
              'localizedDescriptions': {
                'en': 'The anatomical site of measurement of the temperature',
                'sl': '*The anatomical site of measurement of the temperature(en)'
              },
              'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/protocol[at0020]/items[at0021]/value',
              'inputs': [
                {
                  'suffix': 'code',
                  'type': 'CODED_TEXT',
                  'list': [
                    {
                      'value': 'at0022',
                      'label': 'Mouth',
                      'localizedLabels': {
                        'en': 'Mouth',
                        'sl': 'Usta'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured within the mouth',
                        'sl': '*Temperature is measured within the mouth(en)'
                      }
                    },
                    {
                      'value': 'at0023',
                      'label': 'Ear canal',
                      'localizedLabels': {
                        'en': 'Ear canal',
                        'sl': 'V ušesu'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured from within the external auditory canal',
                        'sl': '*Temperature is measured from within the external auditory canal(en)'
                      }
                    },
                    {
                      'value': 'at0024',
                      'label': 'Axilla',
                      'localizedLabels': {
                        'en': 'Axilla',
                        'sl': 'Pod pazduho'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured from the skin of the axilla with the arm positioned down by the side',
                        'sl': '*Temperature is measured from the skin of the axilla with the arm positioned down by the side(en)'
                      }
                    },
                    {
                      'value': 'at0025',
                      'label': 'Rectum',
                      'localizedLabels': {
                        'en': 'Rectum',
                        'sl': 'Rektalno'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature measured within the rectum',
                        'sl': '*Temperature measured within the rectum(en)'
                      }
                    },
                    {
                      'value': 'at0026',
                      'label': 'Nasopharynx',
                      'localizedLabels': {
                        'en': 'Nasopharynx',
                        'sl': 'Nazofarinks'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured within the nasopharynx',
                        'sl': '*Temperature is measured within the nasopharynx(en)'
                      }
                    },
                    {
                      'value': 'at0027',
                      'label': 'Urinary bladder',
                      'localizedLabels': {
                        'en': 'Urinary bladder',
                        'sl': 'Sečni mehur'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured in the urinary bladder',
                        'sl': '*Temperature is measured in the urinary bladder(en)'
                      }
                    },
                    {
                      'value': 'at0028',
                      'label': 'Intravascular',
                      'localizedLabels': {
                        'en': 'Intravascular',
                        'sl': 'Intravaskularno'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured within the vascular system',
                        'sl': '*Temperature is measured within the vascular system(en)'
                      }
                    },
                    {
                      'value': 'at0043',
                      'label': 'Skin',
                      'localizedLabels': {
                        'en': 'Skin',
                        'sl': 'Na koži'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured from exposed skin',
                        'sl': '*Temperature is measured from exposed skin(en)'
                      }
                    },
                    {
                      'value': 'at0051',
                      'label': 'Vagina',
                      'localizedLabels': {
                        'en': 'Vagina',
                        'sl': 'Vaginalno'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured within the vagina',
                        'sl': '*Temperature is measured within the vagina(en)'
                      }
                    },
                    {
                      'value': 'at0054',
                      'label': 'Oesophagus',
                      'localizedLabels': {
                        'en': 'Oesophagus',
                        'sl': 'V požiralniku'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperatue is measured within the oesophagus',
                        'sl': '*Temperatue is measured within the oesophagus(en)'
                      }
                    },
                    {
                      'value': 'at0055',
                      'label': 'Inguinal skin crease',
                      'localizedLabels': {
                        'en': 'Inguinal skin crease',
                        'sl': 'V ustih'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured in the inguinal skin crease between the leg and abdominal wall',
                        'sl': '*Temperature is measured in the inguinal skin crease between the leg and abdominal wall(en)'
                      }
                    }
                  ]
                }
              ],
              'formId': 'vital_signs/body_temperature/site_of_measurement',
              'viewConfig': {
                'field': {
                  'code': {
                    'presentation': 'combobox'
                  }
                },
                'size': {
                  'field': 'inherit',
                  'label': 'inherit',
                  'fill': 'inherit'
                },
                'layout': {
                  'field': {
                    'valign': 'inherit',
                    'align': 'inherit'
                  }
                }
              }
            }
          ],
          'formId': 'vital_signs/body_temperature',
          'viewConfig': {
            'size': {
              'field': 'inherit',
              'label': 'inherit',
              'fill': 'inherit'
            },
            'layout': {
              'field': {
                'valign': 'inherit',
                'align': 'inherit'
              }
            }
          }
        }
      ]
    };

    let rm = (new ThinkEhrModelParser(rmTypeModelDictionary)).parseFormDescription({}, desc, {}, []) as FormRootModel;
console.log("TEST !!!!!!!")
    expect(rm.getChildModels().length).toBe(1);
    let tempF: QuantityFieldModel = rm.findSuccessorsWithPath('vital_signs/body_temperature/any_event/temperature')[0] as QuantityFieldModel;
    expect(tempF).toBeTruthy();
    //tempF.magnitudeValue(37)
    expect(tempF.getMin()).toBe(1);
    expect(tempF.init_min).toBe(1);
    expect(tempF.isInitRequired()).toBe(true);
    expect(tempF.isValueSet()).toBe(false);
    expect(tempF.isRequired()).toBe(true);

    const parentContainer = tempF.getParentModel() as AbstractContainerModel;
    const initReqModels: Model[] = parentContainer.getChildModels().filter((model: FormRepeatableElementModel) => {
      return model.isInitRequired();
    });

    expect(parentContainer.isContainer()).toBe(true);
    expect(parentContainer.isValueSet()).toBe(false);
    expect(initReqModels.length).toBe(1);
    expect(initReqModels[0]).toBe(tempF);

    parentContainer.resetChildrenStructuredValidation();
    expect(tempF.isInitRequired()).toBe(true);
    expect(tempF.isValueSet()).toBe(false);
    expect(tempF.isRequired()).toBe(false);
    expect(tempF.isStructuredRequired()).toBe(false);

    let tempSiblingStressDesc = rm.findSuccessorsWithPath('vital_signs/body_temperature/any_event/description_of_thermal_stress')[0] as TextFieldModel;
    expect(tempSiblingStressDesc.isValueSet()).toBe(false);

    tempSiblingStressDesc.textValue('testValue');

    setTimeout(() => {
      // value change callback gets called with setTimeout()
      expect(tempSiblingStressDesc.isValueSet()).toBe(true);
      expect(tempF.isRequired()).toBe(true);
      expect(tempF.isStructuredRequired()).toBe(true);


      tempSiblingStressDesc.textValue('');
      expect(tempSiblingStressDesc.isValueSet()).toBe(false);

      setTimeout(() => {
        expect(tempSiblingStressDesc.isValueSet()).toBe(false);
        expect(tempF.isRequired()).toBe(false);
        expect(tempF.isStructuredRequired()).toBe(false);
        done();
      }, 10);

    }, 10);
  });

  it('Container structured validation - sibling container empty, not empty (ex. 2.1)', function (done) {

    const desc = {
      'formId': 'form_root',
      'name': 'Form root',
      'rmType': 'FORM_DEFINITION',
      'viewConfig': {
        'label': {
          'custom': false,
          'value': '',
          'useLocalizations': false,
          'localizationsList': {}
        },
        'size': {
          'field': 'inherit',
          'label': 'inherit',
          'fill': 'inherit'
        },
        'layout': {
          'valign': 'inherit',
          'align': 'inherit'
        },
        'tags': []
      },
      'templateLanguages': [
        'en',
        'sl'
      ],
      'children': [
        {
          'name': 'Body temperature',
          'localizedName': 'Body temperature',
          'rmType': 'OBSERVATION',
          'nodeId': 'openEHR-EHR-OBSERVATION.body_temperature.v1',
          'min': 0,
          'max': -1,
          'localizedNames': {
            'en': 'Body temperature',
            'sl': 'Telesna temperature'
          },
          'localizedDescriptions': {
            'en': 'A measurement of the body temperature, which is a surrogate for the whole body temperature of the person.',
            'sl': '*A measurement of the body temperature, which is a surrogate for the whole body temperature of the person.(en)'
          },
          'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]',
          'children': [
            {
              'name': 'Any event',
              'localizedName': 'Any event',
              'rmType': 'EVENT',
              'nodeId': 'at0003',
              'min': 0,
              'max': -1,
              'localizedNames': {
                'en': 'Any event',
                'sl': 'Any event'
              },
              'localizedDescriptions': {
                'en': 'Any event',
                'sl': '*Any event(en)'
              },
              'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]',
              'children': [
                {
                  'name': 'Temperature',
                  'localizedName': 'Temperature',
                  'rmType': 'DV_QUANTITY',
                  'nodeId': 'at0004',
                  'min': 1,
                  'max': 1,
                  'localizedNames': {
                    'en': 'Temperature',
                    'sl': 'Telesna temperature'
                  },
                  'localizedDescriptions': {
                    'en': 'The measured body temperature (as a surrogate for the whole body)',
                    'sl': '*The measured body temperature (as a surrogate for the whole body)(en)'
                  },
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value',
                  'inputs': [
                    {
                      'suffix': 'magnitude',
                      'type': 'DECIMAL'
                    },
                    {
                      'suffix': 'unit',
                      'type': 'CODED_TEXT',
                      'list': [
                        {
                          'value': '°C',
                          'label': '°C',
                          'validation': {
                            'precision': {
                              'minOp': '>=',
                              'min': 1,
                              'maxOp': '<=',
                              'max': 1
                            }
                          }
                        },
                        {
                          'value': '°F',
                          'label': '°F',
                          'validation': {
                            'precision': {
                              'minOp': '>=',
                              'min': 1,
                              'maxOp': '<=',
                              'max': 1
                            }
                          }
                        }
                      ]
                    }
                  ],
                  'formId': 'vital_signs/body_temperature/any_event/temperature',
                  'viewConfig': {
                    'field': {
                      'unit': {
                        'presentation': 'combobox'
                      }
                    },
                    'size': {
                      'field': 'inherit',
                      'label': 'inherit',
                      'fill': 'inherit'
                    },
                    'layout': {
                      'field': {
                        'valign': 'inherit',
                        'align': 'inherit'
                      }
                    }
                  }
                },
                {
                  'name': 'Body exposure',
                  'localizedName': 'Body exposure',
                  'rmType': 'DV_CODED_TEXT',
                  'nodeId': 'at0030',
                  'min': 0,
                  'max': 1,
                  'dependsOn': [
                    'temperature'
                  ],
                  'localizedNames': {
                    'en': 'Body exposure',
                    'sl': 'Obleka'
                  },
                  'localizedDescriptions': {
                    'en': 'The thermal situation of the person who is having the temperature taken',
                    'sl': '*The thermal situation of the person who is having the temperature taken(en)'
                  },
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]/state[at0029]/items[at0030]/value',
                  'inputs': [
                    {
                      'suffix': 'code',
                      'type': 'CODED_TEXT',
                      'list': [
                        {
                          'value': 'at0031',
                          'label': 'Naked',
                          'localizedLabels': {
                            'en': 'Naked',
                            'sl': 'Gol'
                          },
                          'localizedDescriptions': {
                            'en': 'No clothing, bedding or covering',
                            'sl': '*No clothing, bedding or covering(en)'
                          }
                        },
                        {
                          'value': 'at0032',
                          'label': 'Reduced clothing/bedding',
                          'localizedLabels': {
                            'en': 'Reduced clothing/bedding',
                            'sl': 'Premalo oblečen (zavit)'
                          },
                          'localizedDescriptions': {
                            'en': 'The person is covered by a lesser amount of clothing or bedding than deemed appropriate for the environmental circumstances',
                            'sl': '*The person is covered by a lesser amount of clothing or bedding than deemed appropriate for the environmental circumstances(en)'
                          }
                        },
                        {
                          'value': 'at0033',
                          'label': 'Appropriate clothing/bedding',
                          'localizedLabels': {
                            'en': 'Appropriate clothing/bedding',
                            'sl': 'Primerno oblečen (zavit)'
                          },
                          'localizedDescriptions': {
                            'en': 'The person is covered by an amount of clothing or bedding deemed appropriate for the environmental circumstances',
                            'sl': '*The person is covered by an amount of clothing or bedding deemed appropriate for the environmental circumstances(en)'
                          }
                        },
                        {
                          'value': 'at0034',
                          'label': 'Increased clothing/bedding',
                          'localizedLabels': {
                            'en': 'Increased clothing/bedding',
                            'sl': 'Preveč oblečen (zavit)'
                          },
                          'localizedDescriptions': {
                            'en': 'The person is covered by an increased amount of clothing or bedding than deemed appropriate for the environmental circumstances',
                            'sl': '*The person is covered by an increased amount of clothing or bedding than deemed appropriate for the environmental circumstances(en)'
                          }
                        }
                      ]
                    }
                  ],
                  'formId': 'vital_signs/body_temperature/any_event/body_exposure',
                  'viewConfig': {
                    'field': {
                      'code': {
                        'presentation': 'combobox'
                      }
                    },
                    'size': {
                      'field': 'inherit',
                      'label': 'inherit',
                      'fill': 'inherit'
                    },
                    'layout': {
                      'field': {
                        'valign': 'inherit',
                        'align': 'inherit'
                      }
                    }
                  }
                },
                {
                  'name': 'Description of thermal stress',
                  'localizedName': 'Description of thermal stress',
                  'rmType': 'DV_TEXT',
                  'nodeId': 'at0041',
                  'min': 0,
                  'max': 1,
                  'dependsOn': [
                    'temperature'
                  ],
                  'localizedNames': {
                    'en': 'Description of thermal stress',
                    'sl': 'Opis'
                  },
                  'localizedDescriptions': {
                    'en': 'Description of the conditions applied to the subject that might influence their measured body temperature.',
                    'sl': '*Description of the conditions applied to the subject that might influence their measured body temperature.(en)'
                  },
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]/state[at0029]/items[at0041]/value',
                  'inputs': [
                    {
                      'type': 'TEXT'
                    }
                  ],
                  'formId': 'vital_signs/body_temperature/any_event/description_of_thermal_stress',
                  'viewConfig': {
                    'size': {
                      'field': 'inherit',
                      'label': 'inherit',
                      'fill': 'inherit'
                    },
                    'layout': {
                      'field': {
                        'valign': 'inherit',
                        'align': 'inherit'
                      }
                    }
                  }
                },
                {
                  'name': 'Intervals',
                  'localizedName': 'Intervals',
                  'rmType': 'CLUSTER',
                  'nodeId': 'at0022',
                  'min': 0,
                  'max': 1,
                  'localizedNames': {
                    'en': 'Intervals'
                  },
                  'localizedDescriptions': {
                    'en': '*'
                  },
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0022]',
                  'children': [
                    {
                      'name': 'Quantity',
                      'localizedName': 'Quantity',
                      'rmType': 'DV_INTERVAL<DV_QUANTITY>',
                      'nodeId': 'at0023',
                      'min': 0,
                      'max': 1,
                      'localizedNames': {
                        'en': 'Quantity'
                      },
                      'localizedDescriptions': {
                        'en': '*'
                      },
                      'aqlPath': '/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0022]/items[at0023]/value',
                      'children': [
                        {
                          'rmType': 'DV_QUANTITY',
                          'nodeId': '',
                          'min': 0,
                          'max': 1,
                          'aqlPath': '/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0022]/items[at0023]/value/upper',
                          'inputs': [
                            {
                              'suffix': 'magnitude',
                              'type': 'DECIMAL',
                              'validation': {
                                'range': {
                                  'minOp': '>=',
                                  'min': 0,
                                  'maxOp': '<=',
                                  'max': 300
                                },
                                'precision': {
                                  'minOp': '>=',
                                  'min': 3,
                                  'maxOp': '<=',
                                  'max': 3
                                }
                              }
                            },
                            {
                              'suffix': 'unit',
                              'type': 'CODED_TEXT',
                              'list': [
                                {
                                  'value': 'kg',
                                  'label': 'kg',
                                  'validation': {
                                    'range': {
                                      'minOp': '>=',
                                      'min': 0,
                                      'maxOp': '<=',
                                      'max': 300
                                    },
                                    'precision': {
                                      'minOp': '>=',
                                      'min': 3,
                                      'maxOp': '<=',
                                      'max': 3
                                    }
                                  }
                                }
                              ],
                              'defaultValue': 'kg'
                            }
                          ],
                          'formId': 'test_encounter/testing/testing/intervals/quantity/upper',
                          'viewConfig': {
                            'field': {
                              'unit': {
                                'presentation': 'combobox'
                              }
                            },
                            'size': {
                              'field': 'inherit',
                              'label': 'inherit',
                              'fill': 'inherit'
                            },
                            'layout': {
                              'field': {
                                'valign': 'inherit',
                                'align': 'inherit'
                              }
                            }
                          }
                        },
                        {
                          'rmType': 'DV_QUANTITY',
                          'nodeId': '',
                          'min': 0,
                          'max': 1,
                          'aqlPath': '/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0022]/items[at0023]/value/lower',
                          'inputs': [
                            {
                              'suffix': 'magnitude',
                              'type': 'DECIMAL',
                              'validation': {
                                'range': {
                                  'minOp': '>=',
                                  'min': 0,
                                  'maxOp': '<=',
                                  'max': 200
                                },
                                'precision': {
                                  'minOp': '>=',
                                  'min': 3,
                                  'maxOp': '<=',
                                  'max': 3
                                }
                              }
                            },
                            {
                              'suffix': 'unit',
                              'type': 'CODED_TEXT',
                              'list': [
                                {
                                  'value': 'kg',
                                  'label': 'kg',
                                  'validation': {
                                    'range': {
                                      'minOp': '>=',
                                      'min': 0,
                                      'maxOp': '<=',
                                      'max': 200
                                    },
                                    'precision': {
                                      'minOp': '>=',
                                      'min': 3,
                                      'maxOp': '<=',
                                      'max': 3
                                    }
                                  }
                                }
                              ],
                              'defaultValue': 'kg'
                            }
                          ],
                          'formId': 'test_encounter/testing/testing/intervals/quantity/lower',
                          'viewConfig': {
                            'field': {
                              'unit': {
                                'presentation': 'combobox'
                              }
                            },
                            'size': {
                              'field': 'inherit',
                              'label': 'inherit',
                              'fill': 'inherit'
                            },
                            'layout': {
                              'field': {
                                'valign': 'inherit',
                                'align': 'inherit'
                              }
                            }
                          }
                        }
                      ],
                      'formId': 'test_encounter/testing/testing/intervals/quantity',
                      'viewConfig': {
                        'size': {
                          'field': 'inherit',
                          'label': 'inherit',
                          'fill': 'inherit'
                        },
                        'layout': {
                          'field': {
                            'valign': 'inherit',
                            'align': 'inherit'
                          }
                        }
                      }
                    }
                  ],
                  'formId': 'test_encounter/testing/testing/intervals',
                  'viewConfig': {
                    'size': {
                      'field': 'inherit',
                      'label': 'inherit',
                      'fill': 'inherit'
                    },
                    'layout': {
                      'field': {
                        'valign': 'inherit',
                        'align': 'inherit'
                      }
                    }
                  }
                }
              ],
              'formId': 'vital_signs/body_temperature/any_event',
              'viewConfig': {
                'size': {
                  'field': 'inherit',
                  'label': 'inherit',
                  'fill': 'inherit'
                },
                'layout': {
                  'field': {
                    'valign': 'inherit',
                    'align': 'inherit'
                  }
                }
              }
            },
            {
              'name': 'Site of measurement',
              'localizedName': 'Site of measurement',
              'rmType': 'DV_CODED_TEXT',
              'nodeId': 'at0021',
              'min': 0,
              'max': 1,
              'dependsOn': [
                'any_event'
              ],
              'localizedNames': {
                'en': 'Site of measurement',
                'sl': 'Stran telesa'
              },
              'localizedDescriptions': {
                'en': 'The anatomical site of measurement of the temperature',
                'sl': '*The anatomical site of measurement of the temperature(en)'
              },
              'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/protocol[at0020]/items[at0021]/value',
              'inputs': [
                {
                  'suffix': 'code',
                  'type': 'CODED_TEXT',
                  'list': [
                    {
                      'value': 'at0022',
                      'label': 'Mouth',
                      'localizedLabels': {
                        'en': 'Mouth',
                        'sl': 'Usta'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured within the mouth',
                        'sl': '*Temperature is measured within the mouth(en)'
                      }
                    },
                    {
                      'value': 'at0023',
                      'label': 'Ear canal',
                      'localizedLabels': {
                        'en': 'Ear canal',
                        'sl': 'V ušesu'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured from within the external auditory canal',
                        'sl': '*Temperature is measured from within the external auditory canal(en)'
                      }
                    },
                    {
                      'value': 'at0024',
                      'label': 'Axilla',
                      'localizedLabels': {
                        'en': 'Axilla',
                        'sl': 'Pod pazduho'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured from the skin of the axilla with the arm positioned down by the side',
                        'sl': '*Temperature is measured from the skin of the axilla with the arm positioned down by the side(en)'
                      }
                    },
                    {
                      'value': 'at0025',
                      'label': 'Rectum',
                      'localizedLabels': {
                        'en': 'Rectum',
                        'sl': 'Rektalno'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature measured within the rectum',
                        'sl': '*Temperature measured within the rectum(en)'
                      }
                    },
                    {
                      'value': 'at0026',
                      'label': 'Nasopharynx',
                      'localizedLabels': {
                        'en': 'Nasopharynx',
                        'sl': 'Nazofarinks'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured within the nasopharynx',
                        'sl': '*Temperature is measured within the nasopharynx(en)'
                      }
                    },
                    {
                      'value': 'at0027',
                      'label': 'Urinary bladder',
                      'localizedLabels': {
                        'en': 'Urinary bladder',
                        'sl': 'Sečni mehur'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured in the urinary bladder',
                        'sl': '*Temperature is measured in the urinary bladder(en)'
                      }
                    },
                    {
                      'value': 'at0028',
                      'label': 'Intravascular',
                      'localizedLabels': {
                        'en': 'Intravascular',
                        'sl': 'Intravaskularno'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured within the vascular system',
                        'sl': '*Temperature is measured within the vascular system(en)'
                      }
                    },
                    {
                      'value': 'at0043',
                      'label': 'Skin',
                      'localizedLabels': {
                        'en': 'Skin',
                        'sl': 'Na koži'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured from exposed skin',
                        'sl': '*Temperature is measured from exposed skin(en)'
                      }
                    },
                    {
                      'value': 'at0051',
                      'label': 'Vagina',
                      'localizedLabels': {
                        'en': 'Vagina',
                        'sl': 'Vaginalno'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured within the vagina',
                        'sl': '*Temperature is measured within the vagina(en)'
                      }
                    },
                    {
                      'value': 'at0054',
                      'label': 'Oesophagus',
                      'localizedLabels': {
                        'en': 'Oesophagus',
                        'sl': 'V požiralniku'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperatue is measured within the oesophagus',
                        'sl': '*Temperatue is measured within the oesophagus(en)'
                      }
                    },
                    {
                      'value': 'at0055',
                      'label': 'Inguinal skin crease',
                      'localizedLabels': {
                        'en': 'Inguinal skin crease',
                        'sl': 'V ustih'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured in the inguinal skin crease between the leg and abdominal wall',
                        'sl': '*Temperature is measured in the inguinal skin crease between the leg and abdominal wall(en)'
                      }
                    }
                  ]
                }
              ],
              'formId': 'vital_signs/body_temperature/site_of_measurement',
              'viewConfig': {
                'field': {
                  'code': {
                    'presentation': 'combobox'
                  }
                },
                'size': {
                  'field': 'inherit',
                  'label': 'inherit',
                  'fill': 'inherit'
                },
                'layout': {
                  'field': {
                    'valign': 'inherit',
                    'align': 'inherit'
                  }
                }
              }
            }
          ],
          'formId': 'vital_signs/body_temperature',
          'viewConfig': {
            'size': {
              'field': 'inherit',
              'label': 'inherit',
              'fill': 'inherit'
            },
            'layout': {
              'field': {
                'valign': 'inherit',
                'align': 'inherit'
              }
            }
          }
        }
      ]
    };

    let rm = (new ThinkEhrModelParser(rmTypeModelDictionary)).parseFormDescription({}, desc, {}, []) as FormRootModel;
    /*

        container1 (min: 0)
            container2 (min: 0)
                      field3(min:0) [has value]
                field1 (min: 1) [invalid if empty because container2 is not empty]
                field2 (min: 0) [ empty field]
    */

    expect(rm.getChildModels().length).toBe(1);
    let field1: QuantityFieldModel = rm.findSuccessorsWithPath('vital_signs/body_temperature/any_event/temperature')[0] as QuantityFieldModel;
    expect(field1).toBeTruthy();
    expect(field1.getMin()).toBe(1);
    expect(field1.init_min).toBe(1);
    expect(field1.isInitRequired()).toBe(true);
    expect(field1.isValueSet()).toBe(false);
    expect(field1.isRequired()).toBe(true);

    const container1 = field1.getParentModel() as AbstractContainerModel;
    const initReqModels: Model[] = container1.getChildModels().filter((model: FormRepeatableElementModel) => {
      return model.isInitRequired();
    });

    expect(container1.isContainer()).toBe(true);
    expect(container1.isValueSet()).toBe(false);
    expect(initReqModels.length).toBe(1);
    expect(initReqModels[0]).toBe(field1);

    container1.getRootModel().resetStructuredValidation();
    expect(field1.isInitRequired()).toBe(true);
    expect(field1.isValueSet()).toBe(false);
    expect(field1.isRequired()).toBe(false);
    expect(field1.isStructuredRequired()).toBe(false);

    let field2 = rm.findSuccessorsWithPath('vital_signs/body_temperature/any_event/description_of_thermal_stress')[0] as TextFieldModel;
    expect(field2.isValueSet()).toBe(false);

    let container2 = rm.findSuccessorsWithPath('test_encounter/testing/testing/intervals')[0] as AbstractContainerModel;
    expect(container2.isValueSet()).toBe(false);
    let field3 = rm.findSuccessorsWithPath('test_encounter/testing/testing/intervals/quantity/upper')[0] as QuantityFieldModel;
    expect(field3.isValueSet()).toBe(false);

    field3.magnitudeValue(0);

    setTimeout(() => {
      // value change callback gets called with setTimeout()
      expect(container2.isValueSet()).toBe(true);
      expect(field3.isValueSet()).toBe(true);
      expect(field1.isRequired()).toBe(true);
      expect(field1.isStructuredRequired()).toBe(true);

      field3.magnitudeValue(null);

      setTimeout(() => {
        expect(field3.isValueSet()).toBe(false);
        expect(container2.isValueSet()).toBe(false);
        expect(field2.isValueSet()).toBe(false);
        expect(field1.isRequired()).toBe(false);
        expect(field1.isStructuredRequired()).toBe(false);
        done();
      }, 10);

    }, 10);
  });

  it('Container structured validation - inside required container (ex. 3)', function (done) {
    const desc = {
      'formId': 'form_root',
      'name': 'Form root',
      'rmType': 'FORM_DEFINITION',
      'viewConfig': {
        'label': {
          'custom': false,
          'value': '',
          'useLocalizations': false,
          'localizationsList': {}
        },
        'size': {
          'field': 'inherit',
          'label': 'inherit',
          'fill': 'inherit'
        },
        'layout': {
          'valign': 'inherit',
          'align': 'inherit'
        },
        'tags': []
      },
      'templateLanguages': [
        'en',
        'sl'
      ],
      'children': [
        {
          'name': 'Body temperature',
          'localizedName': 'Body temperature',
          'rmType': 'OBSERVATION',
          'nodeId': 'openEHR-EHR-OBSERVATION.body_temperature.v1',
          'min': 1,
          'max': -1,
          'localizedNames': {
            'en': 'Body temperature',
            'sl': 'Telesna temperature'
          },
          'localizedDescriptions': {
            'en': 'A measurement of the body temperature, which is a surrogate for the whole body temperature of the person.',
            'sl': '*A measurement of the body temperature, which is a surrogate for the whole body temperature of the person.(en)'
          },
          'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]',
          'children': [
            {
              'name': 'Any event',
              'localizedName': 'Any event',
              'rmType': 'EVENT',
              'nodeId': 'at0003',
              'min': 0,
              'max': -1,
              'localizedNames': {
                'en': 'Any event',
                'sl': 'Any event'
              },
              'localizedDescriptions': {
                'en': 'Any event',
                'sl': '*Any event(en)'
              },
              'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]',
              'children': [
                {
                  'name': 'Temperature',
                  'localizedName': 'Temperature',
                  'rmType': 'DV_QUANTITY',
                  'nodeId': 'at0004',
                  'min': 1,
                  'max': 1,
                  'localizedNames': {
                    'en': 'Temperature',
                    'sl': 'Telesna temperature'
                  },
                  'localizedDescriptions': {
                    'en': 'The measured body temperature (as a surrogate for the whole body)',
                    'sl': '*The measured body temperature (as a surrogate for the whole body)(en)'
                  },
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value',
                  'inputs': [
                    {
                      'suffix': 'magnitude',
                      'type': 'DECIMAL'
                    },
                    {
                      'suffix': 'unit',
                      'type': 'CODED_TEXT',
                      'list': [
                        {
                          'value': '°C',
                          'label': '°C',
                          'validation': {
                            'precision': {
                              'minOp': '>=',
                              'min': 1,
                              'maxOp': '<=',
                              'max': 1
                            }
                          }
                        },
                        {
                          'value': '°F',
                          'label': '°F',
                          'validation': {
                            'precision': {
                              'minOp': '>=',
                              'min': 1,
                              'maxOp': '<=',
                              'max': 1
                            }
                          }
                        }
                      ]
                    }
                  ],
                  'formId': 'vital_signs/body_temperature/any_event/temperature',
                  'viewConfig': {
                    'field': {
                      'unit': {
                        'presentation': 'combobox'
                      }
                    },
                    'size': {
                      'field': 'inherit',
                      'label': 'inherit',
                      'fill': 'inherit'
                    },
                    'layout': {
                      'field': {
                        'valign': 'inherit',
                        'align': 'inherit'
                      }
                    }
                  }
                },
                {
                  'name': 'Body exposure',
                  'localizedName': 'Body exposure',
                  'rmType': 'DV_CODED_TEXT',
                  'nodeId': 'at0030',
                  'min': 0,
                  'max': 1,
                  'dependsOn': [
                    'temperature'
                  ],
                  'localizedNames': {
                    'en': 'Body exposure',
                    'sl': 'Obleka'
                  },
                  'localizedDescriptions': {
                    'en': 'The thermal situation of the person who is having the temperature taken',
                    'sl': '*The thermal situation of the person who is having the temperature taken(en)'
                  },
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]/state[at0029]/items[at0030]/value',
                  'inputs': [
                    {
                      'suffix': 'code',
                      'type': 'CODED_TEXT',
                      'list': [
                        {
                          'value': 'at0031',
                          'label': 'Naked',
                          'localizedLabels': {
                            'en': 'Naked',
                            'sl': 'Gol'
                          },
                          'localizedDescriptions': {
                            'en': 'No clothing, bedding or covering',
                            'sl': '*No clothing, bedding or covering(en)'
                          }
                        },
                        {
                          'value': 'at0032',
                          'label': 'Reduced clothing/bedding',
                          'localizedLabels': {
                            'en': 'Reduced clothing/bedding',
                            'sl': 'Premalo oblečen (zavit)'
                          },
                          'localizedDescriptions': {
                            'en': 'The person is covered by a lesser amount of clothing or bedding than deemed appropriate for the environmental circumstances',
                            'sl': '*The person is covered by a lesser amount of clothing or bedding than deemed appropriate for the environmental circumstances(en)'
                          }
                        },
                        {
                          'value': 'at0033',
                          'label': 'Appropriate clothing/bedding',
                          'localizedLabels': {
                            'en': 'Appropriate clothing/bedding',
                            'sl': 'Primerno oblečen (zavit)'
                          },
                          'localizedDescriptions': {
                            'en': 'The person is covered by an amount of clothing or bedding deemed appropriate for the environmental circumstances',
                            'sl': '*The person is covered by an amount of clothing or bedding deemed appropriate for the environmental circumstances(en)'
                          }
                        },
                        {
                          'value': 'at0034',
                          'label': 'Increased clothing/bedding',
                          'localizedLabels': {
                            'en': 'Increased clothing/bedding',
                            'sl': 'Preveč oblečen (zavit)'
                          },
                          'localizedDescriptions': {
                            'en': 'The person is covered by an increased amount of clothing or bedding than deemed appropriate for the environmental circumstances',
                            'sl': '*The person is covered by an increased amount of clothing or bedding than deemed appropriate for the environmental circumstances(en)'
                          }
                        }
                      ]
                    }
                  ],
                  'formId': 'vital_signs/body_temperature/any_event/body_exposure',
                  'viewConfig': {
                    'field': {
                      'code': {
                        'presentation': 'combobox'
                      }
                    },
                    'size': {
                      'field': 'inherit',
                      'label': 'inherit',
                      'fill': 'inherit'
                    },
                    'layout': {
                      'field': {
                        'valign': 'inherit',
                        'align': 'inherit'
                      }
                    }
                  }
                },
                {
                  'name': 'Description of thermal stress',
                  'localizedName': 'Description of thermal stress',
                  'rmType': 'DV_TEXT',
                  'nodeId': 'at0041',
                  'min': 0,
                  'max': 1,
                  'dependsOn': [
                    'temperature'
                  ],
                  'localizedNames': {
                    'en': 'Description of thermal stress',
                    'sl': 'Opis'
                  },
                  'localizedDescriptions': {
                    'en': 'Description of the conditions applied to the subject that might influence their measured body temperature.',
                    'sl': '*Description of the conditions applied to the subject that might influence their measured body temperature.(en)'
                  },
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]/state[at0029]/items[at0041]/value',
                  'inputs': [
                    {
                      'type': 'TEXT'
                    }
                  ],
                  'formId': 'vital_signs/body_temperature/any_event/description_of_thermal_stress',
                  'viewConfig': {
                    'size': {
                      'field': 'inherit',
                      'label': 'inherit',
                      'fill': 'inherit'
                    },
                    'layout': {
                      'field': {
                        'valign': 'inherit',
                        'align': 'inherit'
                      }
                    }
                  }
                },

                {
                  'name': 'Intervals',
                  'localizedName': 'Intervals',
                  'rmType': 'CLUSTER',
                  'nodeId': 'at0022',
                  'min': 0,
                  'max': 1,
                  'localizedNames': {
                    'en': 'Intervals'
                  },
                  'localizedDescriptions': {
                    'en': '*'
                  },
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0022]',
                  'children': [
                    {
                      'name': 'Quantity',
                      'localizedName': 'Quantity',
                      'rmType': 'DV_INTERVAL<DV_QUANTITY>',
                      'nodeId': 'at0023',
                      'min': 0,
                      'max': 1,
                      'localizedNames': {
                        'en': 'Quantity'
                      },
                      'localizedDescriptions': {
                        'en': '*'
                      },
                      'aqlPath': '/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0022]/items[at0023]/value',
                      'children': [
                        {
                          'rmType': 'DV_QUANTITY',
                          'nodeId': '',
                          'min': 0,
                          'max': 1,
                          'aqlPath': '/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0022]/items[at0023]/value/upper',
                          'inputs': [
                            {
                              'suffix': 'magnitude',
                              'type': 'DECIMAL',
                              'validation': {
                                'range': {
                                  'minOp': '>=',
                                  'min': 0,
                                  'maxOp': '<=',
                                  'max': 300
                                },
                                'precision': {
                                  'minOp': '>=',
                                  'min': 3,
                                  'maxOp': '<=',
                                  'max': 3
                                }
                              }
                            },
                            {
                              'suffix': 'unit',
                              'type': 'CODED_TEXT',
                              'list': [
                                {
                                  'value': 'kg',
                                  'label': 'kg',
                                  'validation': {
                                    'range': {
                                      'minOp': '>=',
                                      'min': 0,
                                      'maxOp': '<=',
                                      'max': 300
                                    },
                                    'precision': {
                                      'minOp': '>=',
                                      'min': 3,
                                      'maxOp': '<=',
                                      'max': 3
                                    }
                                  }
                                }
                              ],
                              'defaultValue': 'kg'
                            }
                          ],
                          'formId': 'test_encounter/testing/testing/intervals/quantity/upper',
                          'viewConfig': {
                            'field': {
                              'unit': {
                                'presentation': 'combobox'
                              }
                            },
                            'size': {
                              'field': 'inherit',
                              'label': 'inherit',
                              'fill': 'inherit'
                            },
                            'layout': {
                              'field': {
                                'valign': 'inherit',
                                'align': 'inherit'
                              }
                            }
                          }
                        },
                        {
                          'rmType': 'DV_QUANTITY',
                          'nodeId': '',
                          'min': 0,
                          'max': 1,
                          'aqlPath': '/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0022]/items[at0023]/value/lower',
                          'inputs': [
                            {
                              'suffix': 'magnitude',
                              'type': 'DECIMAL',
                              'validation': {
                                'range': {
                                  'minOp': '>=',
                                  'min': 0,
                                  'maxOp': '<=',
                                  'max': 200
                                },
                                'precision': {
                                  'minOp': '>=',
                                  'min': 3,
                                  'maxOp': '<=',
                                  'max': 3
                                }
                              }
                            },
                            {
                              'suffix': 'unit',
                              'type': 'CODED_TEXT',
                              'list': [
                                {
                                  'value': 'kg',
                                  'label': 'kg',
                                  'validation': {
                                    'range': {
                                      'minOp': '>=',
                                      'min': 0,
                                      'maxOp': '<=',
                                      'max': 200
                                    },
                                    'precision': {
                                      'minOp': '>=',
                                      'min': 3,
                                      'maxOp': '<=',
                                      'max': 3
                                    }
                                  }
                                }
                              ],
                              'defaultValue': 'kg'
                            }
                          ],
                          'formId': 'test_encounter/testing/testing/intervals/quantity/lower',
                          'viewConfig': {
                            'field': {
                              'unit': {
                                'presentation': 'combobox'
                              }
                            },
                            'size': {
                              'field': 'inherit',
                              'label': 'inherit',
                              'fill': 'inherit'
                            },
                            'layout': {
                              'field': {
                                'valign': 'inherit',
                                'align': 'inherit'
                              }
                            }
                          }
                        }
                      ],
                      'formId': 'test_encounter/testing/testing/intervals/quantity',
                      'viewConfig': {
                        'size': {
                          'field': 'inherit',
                          'label': 'inherit',
                          'fill': 'inherit'
                        },
                        'layout': {
                          'field': {
                            'valign': 'inherit',
                            'align': 'inherit'
                          }
                        }
                      }
                    }
                  ],
                  'formId': 'test_encounter/testing/testing/intervals',
                  'viewConfig': {
                    'size': {
                      'field': 'inherit',
                      'label': 'inherit',
                      'fill': 'inherit'
                    },
                    'layout': {
                      'field': {
                        'valign': 'inherit',
                        'align': 'inherit'
                      }
                    }
                  }
                }
              ],
              'formId': 'vital_signs/body_temperature/any_event',
              'viewConfig': {
                'size': {
                  'field': 'inherit',
                  'label': 'inherit',
                  'fill': 'inherit'
                },
                'layout': {
                  'field': {
                    'valign': 'inherit',
                    'align': 'inherit'
                  }
                }
              }
            },
            {
              'name': 'Site of measurement',
              'localizedName': 'Site of measurement',
              'rmType': 'DV_CODED_TEXT',
              'nodeId': 'at0021',
              'min': 0,
              'max': 1,
              'dependsOn': [
                'any_event'
              ],
              'localizedNames': {
                'en': 'Site of measurement',
                'sl': 'Stran telesa'
              },
              'localizedDescriptions': {
                'en': 'The anatomical site of measurement of the temperature',
                'sl': '*The anatomical site of measurement of the temperature(en)'
              },
              'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/protocol[at0020]/items[at0021]/value',
              'inputs': [
                {
                  'suffix': 'code',
                  'type': 'CODED_TEXT',
                  'list': [
                    {
                      'value': 'at0022',
                      'label': 'Mouth',
                      'localizedLabels': {
                        'en': 'Mouth',
                        'sl': 'Usta'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured within the mouth',
                        'sl': '*Temperature is measured within the mouth(en)'
                      }
                    },
                    {
                      'value': 'at0023',
                      'label': 'Ear canal',
                      'localizedLabels': {
                        'en': 'Ear canal',
                        'sl': 'V ušesu'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured from within the external auditory canal',
                        'sl': '*Temperature is measured from within the external auditory canal(en)'
                      }
                    },
                    {
                      'value': 'at0024',
                      'label': 'Axilla',
                      'localizedLabels': {
                        'en': 'Axilla',
                        'sl': 'Pod pazduho'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured from the skin of the axilla with the arm positioned down by the side',
                        'sl': '*Temperature is measured from the skin of the axilla with the arm positioned down by the side(en)'
                      }
                    },
                    {
                      'value': 'at0025',
                      'label': 'Rectum',
                      'localizedLabels': {
                        'en': 'Rectum',
                        'sl': 'Rektalno'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature measured within the rectum',
                        'sl': '*Temperature measured within the rectum(en)'
                      }
                    },
                    {
                      'value': 'at0026',
                      'label': 'Nasopharynx',
                      'localizedLabels': {
                        'en': 'Nasopharynx',
                        'sl': 'Nazofarinks'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured within the nasopharynx',
                        'sl': '*Temperature is measured within the nasopharynx(en)'
                      }
                    },
                    {
                      'value': 'at0027',
                      'label': 'Urinary bladder',
                      'localizedLabels': {
                        'en': 'Urinary bladder',
                        'sl': 'Sečni mehur'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured in the urinary bladder',
                        'sl': '*Temperature is measured in the urinary bladder(en)'
                      }
                    },
                    {
                      'value': 'at0028',
                      'label': 'Intravascular',
                      'localizedLabels': {
                        'en': 'Intravascular',
                        'sl': 'Intravaskularno'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured within the vascular system',
                        'sl': '*Temperature is measured within the vascular system(en)'
                      }
                    },
                    {
                      'value': 'at0043',
                      'label': 'Skin',
                      'localizedLabels': {
                        'en': 'Skin',
                        'sl': 'Na koži'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured from exposed skin',
                        'sl': '*Temperature is measured from exposed skin(en)'
                      }
                    },
                    {
                      'value': 'at0051',
                      'label': 'Vagina',
                      'localizedLabels': {
                        'en': 'Vagina',
                        'sl': 'Vaginalno'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured within the vagina',
                        'sl': '*Temperature is measured within the vagina(en)'
                      }
                    },
                    {
                      'value': 'at0054',
                      'label': 'Oesophagus',
                      'localizedLabels': {
                        'en': 'Oesophagus',
                        'sl': 'V požiralniku'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperatue is measured within the oesophagus',
                        'sl': '*Temperatue is measured within the oesophagus(en)'
                      }
                    },
                    {
                      'value': 'at0055',
                      'label': 'Inguinal skin crease',
                      'localizedLabels': {
                        'en': 'Inguinal skin crease',
                        'sl': 'V ustih'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured in the inguinal skin crease between the leg and abdominal wall',
                        'sl': '*Temperature is measured in the inguinal skin crease between the leg and abdominal wall(en)'
                      }
                    }
                  ]
                }
              ],
              'formId': 'vital_signs/body_temperature/site_of_measurement',
              'viewConfig': {
                'field': {
                  'code': {
                    'presentation': 'combobox'
                  }
                },
                'size': {
                  'field': 'inherit',
                  'label': 'inherit',
                  'fill': 'inherit'
                },
                'layout': {
                  'field': {
                    'valign': 'inherit',
                    'align': 'inherit'
                  }
                }
              }
            }
          ],
          'formId': 'vital_signs/body_temperature',
          'viewConfig': {
            'size': {
              'field': 'inherit',
              'label': 'inherit',
              'fill': 'inherit'
            },
            'layout': {
              'field': {
                'valign': 'inherit',
                'align': 'inherit'
              }
            }
          }
        }
      ]
    };

    let rm = (new ThinkEhrModelParser(rmTypeModelDictionary)).parseFormDescription({}, desc, {}, []) as FormRootModel;

    expect(rm.getChildModels().length).toBe(1);
    let tempF: QuantityFieldModel = rm.findSuccessorsWithPath('vital_signs/body_temperature/any_event/temperature')[0] as QuantityFieldModel;
    expect(tempF).toBeTruthy();
    //tempF.magnitudeValue(37)
    expect(tempF.getMin()).toBe(1);
    expect(tempF.init_min).toBe(1);
    expect(tempF.isInitRequired()).toBe(true);
    expect(tempF.isValueSet()).toBe(false);
    expect(tempF.isRequired()).toBe(true);

    const parentContainer = tempF.getParentModel() as AbstractContainerModel;
    const initReqModels: Model[] = parentContainer.getChildModels().filter((model: FormRepeatableElementModel) => {
      return model.isInitRequired();
    });

    expect(parentContainer.isContainer()).toBe(true);
    expect(parentContainer.isValueSet()).toBe(false);

    expect(initReqModels.length).toBe(1);
    expect(initReqModels[0]).toBe(tempF);

    tempF.min = 0;
    expect(tempF.isRequired()).toBe(false);

    parentContainer.getRootModel().resetStructuredValidation();
    expect(tempF.isInitRequired()).toBe(true);
    expect(tempF.isValueSet()).toBe(false);
    expect(tempF.min).toBe(1);
    expect(tempF.isRequired()).toBe(true);
    expect(tempF.isStructuredRequired()).toBe(true);

    done();
  });

  it('Container structured validation - required empty sibling container (ex. 4)', function (done) {
/*
   container1 (min: 0)
     container2 (min: 1)
         field1 (min: 1) [valid if empty because container1 is empty => container2 is valid even if empty]
         field2 (min: 0) [empty field]
*/
    const desc = {
      'formId': 'form_root',
      'name': 'Form root',
      'rmType': 'FORM_DEFINITION',
      'viewConfig': {
        'label': {
          'custom': false,
          'value': '',
          'useLocalizations': false,
          'localizationsList': {}
        },
        'size': {
          'field': 'inherit',
          'label': 'inherit',
          'fill': 'inherit'
        },
        'layout': {
          'valign': 'inherit',
          'align': 'inherit'
        },
        'tags': []
      },
      'templateLanguages': [
        'en',
        'sl'
      ],
      'children': [
        {
          'name': 'Body temperature',
          'localizedName': 'Body temperature',
          'rmType': 'OBSERVATION',
          'nodeId': 'openEHR-EHR-OBSERVATION.body_temperature.v1',
          'min': 0,
          'max': -1,
          'localizedNames': {
            'en': 'Body temperature',
            'sl': 'Telesna temperature'
          },
          'localizedDescriptions': {
            'en': 'A measurement of the body temperature, which is a surrogate for the whole body temperature of the person.',
            'sl': '*A measurement of the body temperature, which is a surrogate for the whole body temperature of the person.(en)'
          },
          'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]',
          'children': [
            {
              'name': 'Any event',
              'localizedName': 'Any event',
              'rmType': 'EVENT',
              'nodeId': 'at0003',
              'min': 0,
              'max': -1,
              'localizedNames': {
                'en': 'Any event',
                'sl': 'Any event'
              },
              'localizedDescriptions': {
                'en': 'Any event',
                'sl': '*Any event(en)'
              },
              'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]',
              'children': [
                {
                  'name': 'Temperature',
                  'localizedName': 'Temperature',
                  'rmType': 'DV_QUANTITY',
                  'nodeId': 'at0004',
                  'min': 1,
                  'max': 1,
                  'localizedNames': {
                    'en': 'Temperature',
                    'sl': 'Telesna temperature'
                  },
                  'localizedDescriptions': {
                    'en': 'The measured body temperature (as a surrogate for the whole body)',
                    'sl': '*The measured body temperature (as a surrogate for the whole body)(en)'
                  },
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value',
                  'inputs': [
                    {
                      'suffix': 'magnitude',
                      'type': 'DECIMAL'
                    },
                    {
                      'suffix': 'unit',
                      'type': 'CODED_TEXT',
                      'list': [
                        {
                          'value': '°C',
                          'label': '°C',
                          'validation': {
                            'precision': {
                              'minOp': '>=',
                              'min': 1,
                              'maxOp': '<=',
                              'max': 1
                            }
                          }
                        },
                        {
                          'value': '°F',
                          'label': '°F',
                          'validation': {
                            'precision': {
                              'minOp': '>=',
                              'min': 1,
                              'maxOp': '<=',
                              'max': 1
                            }
                          }
                        }
                      ]
                    }
                  ],
                  'formId': 'vital_signs/body_temperature/any_event/temperature',
                  'viewConfig': {
                    'field': {
                      'unit': {
                        'presentation': 'combobox'
                      }
                    },
                    'size': {
                      'field': 'inherit',
                      'label': 'inherit',
                      'fill': 'inherit'
                    },
                    'layout': {
                      'field': {
                        'valign': 'inherit',
                        'align': 'inherit'
                      }
                    }
                  }
                },
                {
                  'name': 'Body exposure',
                  'localizedName': 'Body exposure',
                  'rmType': 'DV_CODED_TEXT',
                  'nodeId': 'at0030',
                  'min': 0,
                  'max': 1,
                  'dependsOn': [
                    'temperature'
                  ],
                  'localizedNames': {
                    'en': 'Body exposure',
                    'sl': 'Obleka'
                  },
                  'localizedDescriptions': {
                    'en': 'The thermal situation of the person who is having the temperature taken',
                    'sl': '*The thermal situation of the person who is having the temperature taken(en)'
                  },
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]/state[at0029]/items[at0030]/value',
                  'inputs': [
                    {
                      'suffix': 'code',
                      'type': 'CODED_TEXT',
                      'list': [
                        {
                          'value': 'at0031',
                          'label': 'Naked',
                          'localizedLabels': {
                            'en': 'Naked',
                            'sl': 'Gol'
                          },
                          'localizedDescriptions': {
                            'en': 'No clothing, bedding or covering',
                            'sl': '*No clothing, bedding or covering(en)'
                          }
                        },
                        {
                          'value': 'at0032',
                          'label': 'Reduced clothing/bedding',
                          'localizedLabels': {
                            'en': 'Reduced clothing/bedding',
                            'sl': 'Premalo oblečen (zavit)'
                          },
                          'localizedDescriptions': {
                            'en': 'The person is covered by a lesser amount of clothing or bedding than deemed appropriate for the environmental circumstances',
                            'sl': '*The person is covered by a lesser amount of clothing or bedding than deemed appropriate for the environmental circumstances(en)'
                          }
                        },
                        {
                          'value': 'at0033',
                          'label': 'Appropriate clothing/bedding',
                          'localizedLabels': {
                            'en': 'Appropriate clothing/bedding',
                            'sl': 'Primerno oblečen (zavit)'
                          },
                          'localizedDescriptions': {
                            'en': 'The person is covered by an amount of clothing or bedding deemed appropriate for the environmental circumstances',
                            'sl': '*The person is covered by an amount of clothing or bedding deemed appropriate for the environmental circumstances(en)'
                          }
                        },
                        {
                          'value': 'at0034',
                          'label': 'Increased clothing/bedding',
                          'localizedLabels': {
                            'en': 'Increased clothing/bedding',
                            'sl': 'Preveč oblečen (zavit)'
                          },
                          'localizedDescriptions': {
                            'en': 'The person is covered by an increased amount of clothing or bedding than deemed appropriate for the environmental circumstances',
                            'sl': '*The person is covered by an increased amount of clothing or bedding than deemed appropriate for the environmental circumstances(en)'
                          }
                        }
                      ]
                    }
                  ],
                  'formId': 'vital_signs/body_temperature/any_event/body_exposure',
                  'viewConfig': {
                    'field': {
                      'code': {
                        'presentation': 'combobox'
                      }
                    },
                    'size': {
                      'field': 'inherit',
                      'label': 'inherit',
                      'fill': 'inherit'
                    },
                    'layout': {
                      'field': {
                        'valign': 'inherit',
                        'align': 'inherit'
                      }
                    }
                  }
                },
                {
                  'name': 'Description of thermal stress',
                  'localizedName': 'Description of thermal stress',
                  'rmType': 'DV_TEXT',
                  'nodeId': 'at0041',
                  'min': 0,
                  'max': 1,
                  'dependsOn': [
                    'temperature'
                  ],
                  'localizedNames': {
                    'en': 'Description of thermal stress',
                    'sl': 'Opis'
                  },
                  'localizedDescriptions': {
                    'en': 'Description of the conditions applied to the subject that might influence their measured body temperature.',
                    'sl': '*Description of the conditions applied to the subject that might influence their measured body temperature.(en)'
                  },
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]/state[at0029]/items[at0041]/value',
                  'inputs': [
                    {
                      'type': 'TEXT'
                    }
                  ],
                  'formId': 'vital_signs/body_temperature/any_event/description_of_thermal_stress',
                  'viewConfig': {
                    'size': {
                      'field': 'inherit',
                      'label': 'inherit',
                      'fill': 'inherit'
                    },
                    'layout': {
                      'field': {
                        'valign': 'inherit',
                        'align': 'inherit'
                      }
                    }
                  }
                },
                {
                  'name': 'Intervals',
                  'localizedName': 'Intervals',
                  'rmType': 'CLUSTER',
                  'nodeId': 'at0022',
                  'min': 1,
                  'max': 1,
                  'localizedNames': {
                    'en': 'Intervals'
                  },
                  'localizedDescriptions': {
                    'en': '*'
                  },
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0022]',
                  'children': [
                    {
                      'name': 'Quantity',
                      'localizedName': 'Quantity',
                      'rmType': 'DV_INTERVAL<DV_QUANTITY>',
                      'nodeId': 'at0023',
                      'min': 0,
                      'max': 1,
                      'localizedNames': {
                        'en': 'Quantity'
                      },
                      'localizedDescriptions': {
                        'en': '*'
                      },
                      'aqlPath': '/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0022]/items[at0023]/value',
                      'children': [
                        {
                          'rmType': 'DV_QUANTITY',
                          'nodeId': '',
                          'min': 0,
                          'max': 1,
                          'aqlPath': '/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0022]/items[at0023]/value/upper',
                          'inputs': [
                            {
                              'suffix': 'magnitude',
                              'type': 'DECIMAL',
                              'validation': {
                                'range': {
                                  'minOp': '>=',
                                  'min': 0,
                                  'maxOp': '<=',
                                  'max': 300
                                },
                                'precision': {
                                  'minOp': '>=',
                                  'min': 3,
                                  'maxOp': '<=',
                                  'max': 3
                                }
                              }
                            },
                            {
                              'suffix': 'unit',
                              'type': 'CODED_TEXT',
                              'list': [
                                {
                                  'value': 'kg',
                                  'label': 'kg',
                                  'validation': {
                                    'range': {
                                      'minOp': '>=',
                                      'min': 0,
                                      'maxOp': '<=',
                                      'max': 300
                                    },
                                    'precision': {
                                      'minOp': '>=',
                                      'min': 3,
                                      'maxOp': '<=',
                                      'max': 3
                                    }
                                  }
                                }
                              ],
                              'defaultValue': 'kg'
                            }
                          ],
                          'formId': 'test_encounter/testing/testing/intervals/quantity/upper',
                          'viewConfig': {
                            'field': {
                              'unit': {
                                'presentation': 'combobox'
                              }
                            },
                            'size': {
                              'field': 'inherit',
                              'label': 'inherit',
                              'fill': 'inherit'
                            },
                            'layout': {
                              'field': {
                                'valign': 'inherit',
                                'align': 'inherit'
                              }
                            }
                          }
                        },
                        {
                          'rmType': 'DV_QUANTITY',
                          'nodeId': '',
                          'min': 0,
                          'max': 1,
                          'aqlPath': '/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0022]/items[at0023]/value/lower',
                          'inputs': [
                            {
                              'suffix': 'magnitude',
                              'type': 'DECIMAL',
                              'validation': {
                                'range': {
                                  'minOp': '>=',
                                  'min': 0,
                                  'maxOp': '<=',
                                  'max': 200
                                },
                                'precision': {
                                  'minOp': '>=',
                                  'min': 3,
                                  'maxOp': '<=',
                                  'max': 3
                                }
                              }
                            },
                            {
                              'suffix': 'unit',
                              'type': 'CODED_TEXT',
                              'list': [
                                {
                                  'value': 'kg',
                                  'label': 'kg',
                                  'validation': {
                                    'range': {
                                      'minOp': '>=',
                                      'min': 0,
                                      'maxOp': '<=',
                                      'max': 200
                                    },
                                    'precision': {
                                      'minOp': '>=',
                                      'min': 3,
                                      'maxOp': '<=',
                                      'max': 3
                                    }
                                  }
                                }
                              ],
                              'defaultValue': 'kg'
                            }
                          ],
                          'formId': 'test_encounter/testing/testing/intervals/quantity/lower',
                          'viewConfig': {
                            'field': {
                              'unit': {
                                'presentation': 'combobox'
                              }
                            },
                            'size': {
                              'field': 'inherit',
                              'label': 'inherit',
                              'fill': 'inherit'
                            },
                            'layout': {
                              'field': {
                                'valign': 'inherit',
                                'align': 'inherit'
                              }
                            }
                          }
                        }
                      ],
                      'formId': 'test_encounter/testing/testing/intervals/quantity',
                      'viewConfig': {
                        'size': {
                          'field': 'inherit',
                          'label': 'inherit',
                          'fill': 'inherit'
                        },
                        'layout': {
                          'field': {
                            'valign': 'inherit',
                            'align': 'inherit'
                          }
                        }
                      }
                    }
                  ],
                  'formId': 'test_encounter/testing/testing/intervals',
                  'viewConfig': {
                    'size': {
                      'field': 'inherit',
                      'label': 'inherit',
                      'fill': 'inherit'
                    },
                    'layout': {
                      'field': {
                        'valign': 'inherit',
                        'align': 'inherit'
                      }
                    }
                  }
                }
              ],
              'formId': 'vital_signs/body_temperature/any_event',
              'viewConfig': {
                'size': {
                  'field': 'inherit',
                  'label': 'inherit',
                  'fill': 'inherit'
                },
                'layout': {
                  'field': {
                    'valign': 'inherit',
                    'align': 'inherit'
                  }
                }
              }
            },
            {
              'name': 'Site of measurement',
              'localizedName': 'Site of measurement',
              'rmType': 'DV_CODED_TEXT',
              'nodeId': 'at0021',
              'min': 0,
              'max': 1,
              'dependsOn': [
                'any_event'
              ],
              'localizedNames': {
                'en': 'Site of measurement',
                'sl': 'Stran telesa'
              },
              'localizedDescriptions': {
                'en': 'The anatomical site of measurement of the temperature',
                'sl': '*The anatomical site of measurement of the temperature(en)'
              },
              'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/protocol[at0020]/items[at0021]/value',
              'inputs': [
                {
                  'suffix': 'code',
                  'type': 'CODED_TEXT',
                  'list': [
                    {
                      'value': 'at0022',
                      'label': 'Mouth',
                      'localizedLabels': {
                        'en': 'Mouth',
                        'sl': 'Usta'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured within the mouth',
                        'sl': '*Temperature is measured within the mouth(en)'
                      }
                    },
                    {
                      'value': 'at0023',
                      'label': 'Ear canal',
                      'localizedLabels': {
                        'en': 'Ear canal',
                        'sl': 'V ušesu'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured from within the external auditory canal',
                        'sl': '*Temperature is measured from within the external auditory canal(en)'
                      }
                    },
                    {
                      'value': 'at0024',
                      'label': 'Axilla',
                      'localizedLabels': {
                        'en': 'Axilla',
                        'sl': 'Pod pazduho'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured from the skin of the axilla with the arm positioned down by the side',
                        'sl': '*Temperature is measured from the skin of the axilla with the arm positioned down by the side(en)'
                      }
                    },
                    {
                      'value': 'at0025',
                      'label': 'Rectum',
                      'localizedLabels': {
                        'en': 'Rectum',
                        'sl': 'Rektalno'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature measured within the rectum',
                        'sl': '*Temperature measured within the rectum(en)'
                      }
                    },
                    {
                      'value': 'at0026',
                      'label': 'Nasopharynx',
                      'localizedLabels': {
                        'en': 'Nasopharynx',
                        'sl': 'Nazofarinks'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured within the nasopharynx',
                        'sl': '*Temperature is measured within the nasopharynx(en)'
                      }
                    },
                    {
                      'value': 'at0027',
                      'label': 'Urinary bladder',
                      'localizedLabels': {
                        'en': 'Urinary bladder',
                        'sl': 'Sečni mehur'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured in the urinary bladder',
                        'sl': '*Temperature is measured in the urinary bladder(en)'
                      }
                    },
                    {
                      'value': 'at0028',
                      'label': 'Intravascular',
                      'localizedLabels': {
                        'en': 'Intravascular',
                        'sl': 'Intravaskularno'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured within the vascular system',
                        'sl': '*Temperature is measured within the vascular system(en)'
                      }
                    },
                    {
                      'value': 'at0043',
                      'label': 'Skin',
                      'localizedLabels': {
                        'en': 'Skin',
                        'sl': 'Na koži'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured from exposed skin',
                        'sl': '*Temperature is measured from exposed skin(en)'
                      }
                    },
                    {
                      'value': 'at0051',
                      'label': 'Vagina',
                      'localizedLabels': {
                        'en': 'Vagina',
                        'sl': 'Vaginalno'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured within the vagina',
                        'sl': '*Temperature is measured within the vagina(en)'
                      }
                    },
                    {
                      'value': 'at0054',
                      'label': 'Oesophagus',
                      'localizedLabels': {
                        'en': 'Oesophagus',
                        'sl': 'V požiralniku'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperatue is measured within the oesophagus',
                        'sl': '*Temperatue is measured within the oesophagus(en)'
                      }
                    },
                    {
                      'value': 'at0055',
                      'label': 'Inguinal skin crease',
                      'localizedLabels': {
                        'en': 'Inguinal skin crease',
                        'sl': 'V ustih'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured in the inguinal skin crease between the leg and abdominal wall',
                        'sl': '*Temperature is measured in the inguinal skin crease between the leg and abdominal wall(en)'
                      }
                    }
                  ]
                }
              ],
              'formId': 'vital_signs/body_temperature/site_of_measurement',
              'viewConfig': {
                'field': {
                  'code': {
                    'presentation': 'combobox'
                  }
                },
                'size': {
                  'field': 'inherit',
                  'label': 'inherit',
                  'fill': 'inherit'
                },
                'layout': {
                  'field': {
                    'valign': 'inherit',
                    'align': 'inherit'
                  }
                }
              }
            }
          ],
          'formId': 'vital_signs/body_temperature',
          'viewConfig': {
            'size': {
              'field': 'inherit',
              'label': 'inherit',
              'fill': 'inherit'
            },
            'layout': {
              'field': {
                'valign': 'inherit',
                'align': 'inherit'
              }
            }
          }
        }
      ]
    };

    let rm = (new ThinkEhrModelParser(rmTypeModelDictionary)).parseFormDescription({}, desc, {}, []) as FormRootModel;

    expect(rm.getChildModels().length).toBe(1);
    let field1: QuantityFieldModel = rm.findSuccessorsWithPath('vital_signs/body_temperature/any_event/temperature')[0] as QuantityFieldModel;
    expect(field1).toBeTruthy();
    expect(field1.getMin()).toBe(1);
    expect(field1.init_min).toBe(1);
    expect(field1.isInitRequired()).toBe(true);
    expect(field1.isValueSet()).toBe(false);
    expect(field1.isRequired()).toBe(true);

    const container1 = field1.getParentModel() as AbstractContainerModel;
    const initReqModels: Model[] = container1.getChildModels().filter((model: FormRepeatableElementModel) => {
      return model.isInitRequired();
    });

    expect(container1.isContainer()).toBe(true);
    expect(container1.isValueSet()).toBe(false);
    expect(initReqModels.length).toBe(2);
    expect(initReqModels[0]).toBe(field1);

    container1.getRootModel().resetStructuredValidation();
    expect(field1.isInitRequired()).toBe(true);
    expect(field1.isValueSet()).toBe(false);
    expect(field1.isRequired()).toBe(false);
    expect(field1.isStructuredRequired()).toBe(false);

    let field2 = rm.findSuccessorsWithPath('vital_signs/body_temperature/any_event/description_of_thermal_stress')[0] as TextFieldModel;
    expect(field2.isValueSet()).toBe(false);

    let container2 = rm.findSuccessorsWithPath('test_encounter/testing/testing/intervals')[0] as AbstractContainerModel;
    expect(container2.isValueSet()).toBe(false);
    let field3 = rm.findSuccessorsWithPath('test_encounter/testing/testing/intervals/quantity/upper')[0] as QuantityFieldModel;
    expect(field3.isValueSet()).toBe(false);
    done();

  });

  it('Container structured validation - sibling container empty, not empty (ex. 5)', function (done) {

    const desc = {
      'formId': 'form_root',
      'name': 'Form root',
      'rmType': 'FORM_DEFINITION',
      'viewConfig': {
        'label': {
          'custom': false,
          'value': '',
          'useLocalizations': false,
          'localizationsList': {}
        },
        'size': {
          'field': 'inherit',
          'label': 'inherit',
          'fill': 'inherit'
        },
        'layout': {
          'valign': 'inherit',
          'align': 'inherit'
        },
        'tags': []
      },
      'templateLanguages': [
        'en',
        'sl'
      ],
      'children': [
        {
          'name': 'Body temperature',
          'localizedName': 'Body temperature',
          'rmType': 'OBSERVATION',
          'nodeId': 'openEHR-EHR-OBSERVATION.body_temperature.v1',
          'min': 0,
          'max': -1,
          'localizedNames': {
            'en': 'Body temperature',
            'sl': 'Telesna temperature'
          },
          'localizedDescriptions': {
            'en': 'A measurement of the body temperature, which is a surrogate for the whole body temperature of the person.',
            'sl': '*A measurement of the body temperature, which is a surrogate for the whole body temperature of the person.(en)'
          },
          'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]',
          'children': [
            {
              'name': 'Any event',
              'localizedName': 'Any event',
              'rmType': 'EVENT',
              'nodeId': 'at0003',
              'min': 0,
              'max': -1,
              'localizedNames': {
                'en': 'Any event',
                'sl': 'Any event'
              },
              'localizedDescriptions': {
                'en': 'Any event',
                'sl': '*Any event(en)'
              },
              'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]',
              'children': [
                {
                  'name': 'Temperature',
                  'localizedName': 'Temperature',
                  'rmType': 'DV_QUANTITY',
                  'nodeId': 'at0004',
                  'min': 0,
                  'max': 1,
                  'localizedNames': {
                    'en': 'Temperature',
                    'sl': 'Telesna temperature'
                  },
                  'localizedDescriptions': {
                    'en': 'The measured body temperature (as a surrogate for the whole body)',
                    'sl': '*The measured body temperature (as a surrogate for the whole body)(en)'
                  },
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value',
                  'inputs': [
                    {
                      'suffix': 'magnitude',
                      'type': 'DECIMAL'
                    },
                    {
                      'suffix': 'unit',
                      'type': 'CODED_TEXT',
                      'list': [
                        {
                          'value': '°C',
                          'label': '°C',
                          'validation': {
                            'precision': {
                              'minOp': '>=',
                              'min': 1,
                              'maxOp': '<=',
                              'max': 1
                            }
                          }
                        },
                        {
                          'value': '°F',
                          'label': '°F',
                          'validation': {
                            'precision': {
                              'minOp': '>=',
                              'min': 1,
                              'maxOp': '<=',
                              'max': 1
                            }
                          }
                        }
                      ]
                    }
                  ],
                  'formId': 'vital_signs/body_temperature/any_event/temperature',
                  'viewConfig': {
                    'field': {
                      'unit': {
                        'presentation': 'combobox'
                      }
                    },
                    'size': {
                      'field': 'inherit',
                      'label': 'inherit',
                      'fill': 'inherit'
                    },
                    'layout': {
                      'field': {
                        'valign': 'inherit',
                        'align': 'inherit'
                      }
                    }
                  }
                },
                {
                  'name': 'Body exposure',
                  'localizedName': 'Body exposure',
                  'rmType': 'DV_CODED_TEXT',
                  'nodeId': 'at0030',
                  'min': 0,
                  'max': 1,
                  'dependsOn': [
                    'temperature'
                  ],
                  'localizedNames': {
                    'en': 'Body exposure',
                    'sl': 'Obleka'
                  },
                  'localizedDescriptions': {
                    'en': 'The thermal situation of the person who is having the temperature taken',
                    'sl': '*The thermal situation of the person who is having the temperature taken(en)'
                  },
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]/state[at0029]/items[at0030]/value',
                  'inputs': [
                    {
                      'suffix': 'code',
                      'type': 'CODED_TEXT',
                      'list': [
                        {
                          'value': 'at0031',
                          'label': 'Naked',
                          'localizedLabels': {
                            'en': 'Naked',
                            'sl': 'Gol'
                          },
                          'localizedDescriptions': {
                            'en': 'No clothing, bedding or covering',
                            'sl': '*No clothing, bedding or covering(en)'
                          }
                        },
                        {
                          'value': 'at0032',
                          'label': 'Reduced clothing/bedding',
                          'localizedLabels': {
                            'en': 'Reduced clothing/bedding',
                            'sl': 'Premalo oblečen (zavit)'
                          },
                          'localizedDescriptions': {
                            'en': 'The person is covered by a lesser amount of clothing or bedding than deemed appropriate for the environmental circumstances',
                            'sl': '*The person is covered by a lesser amount of clothing or bedding than deemed appropriate for the environmental circumstances(en)'
                          }
                        },
                        {
                          'value': 'at0033',
                          'label': 'Appropriate clothing/bedding',
                          'localizedLabels': {
                            'en': 'Appropriate clothing/bedding',
                            'sl': 'Primerno oblečen (zavit)'
                          },
                          'localizedDescriptions': {
                            'en': 'The person is covered by an amount of clothing or bedding deemed appropriate for the environmental circumstances',
                            'sl': '*The person is covered by an amount of clothing or bedding deemed appropriate for the environmental circumstances(en)'
                          }
                        },
                        {
                          'value': 'at0034',
                          'label': 'Increased clothing/bedding',
                          'localizedLabels': {
                            'en': 'Increased clothing/bedding',
                            'sl': 'Preveč oblečen (zavit)'
                          },
                          'localizedDescriptions': {
                            'en': 'The person is covered by an increased amount of clothing or bedding than deemed appropriate for the environmental circumstances',
                            'sl': '*The person is covered by an increased amount of clothing or bedding than deemed appropriate for the environmental circumstances(en)'
                          }
                        }
                      ]
                    }
                  ],
                  'formId': 'vital_signs/body_temperature/any_event/body_exposure',
                  'viewConfig': {
                    'field': {
                      'code': {
                        'presentation': 'combobox'
                      }
                    },
                    'size': {
                      'field': 'inherit',
                      'label': 'inherit',
                      'fill': 'inherit'
                    },
                    'layout': {
                      'field': {
                        'valign': 'inherit',
                        'align': 'inherit'
                      }
                    }
                  }
                },
                {
                  'name': 'Description of thermal stress',
                  'localizedName': 'Description of thermal stress',
                  'rmType': 'DV_TEXT',
                  'nodeId': 'at0041',
                  'min': 0,
                  'max': 1,
                  'dependsOn': [
                    'temperature'
                  ],
                  'localizedNames': {
                    'en': 'Description of thermal stress',
                    'sl': 'Opis'
                  },
                  'localizedDescriptions': {
                    'en': 'Description of the conditions applied to the subject that might influence their measured body temperature.',
                    'sl': '*Description of the conditions applied to the subject that might influence their measured body temperature.(en)'
                  },
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]/state[at0029]/items[at0041]/value',
                  'inputs': [
                    {
                      'type': 'TEXT'
                    }
                  ],
                  'formId': 'vital_signs/body_temperature/any_event/description_of_thermal_stress',
                  'viewConfig': {
                    'size': {
                      'field': 'inherit',
                      'label': 'inherit',
                      'fill': 'inherit'
                    },
                    'layout': {
                      'field': {
                        'valign': 'inherit',
                        'align': 'inherit'
                      }
                    }
                  }
                },
                {
                  'name': 'Intervals',
                  'localizedName': 'Intervals',
                  'rmType': 'CLUSTER',
                  'nodeId': 'at0022',
                  'min': 1,
                  'max': 1,
                  'localizedNames': {
                    'en': 'Intervals'
                  },
                  'localizedDescriptions': {
                    'en': '*'
                  },
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0022]',
                  'children': [
                    {
                      'name': 'Quantity',
                      'localizedName': 'Quantity',
                      'rmType': 'DV_INTERVAL<DV_QUANTITY>',
                      'nodeId': 'at0023',
                      'min': 0,
                      'max': 1,
                      'localizedNames': {
                        'en': 'Quantity'
                      },
                      'localizedDescriptions': {
                        'en': '*'
                      },
                      'aqlPath': '/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0022]/items[at0023]/value',
                      'children': [
                        {
                          'rmType': 'DV_QUANTITY',
                          'nodeId': '',
                          'min': 1,
                          'max': 1,
                          'aqlPath': '/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0022]/items[at0023]/value/upper',
                          'inputs': [
                            {
                              'suffix': 'magnitude',
                              'type': 'DECIMAL',
                              'validation': {
                                'range': {
                                  'minOp': '>=',
                                  'min': 0,
                                  'maxOp': '<=',
                                  'max': 300
                                },
                                'precision': {
                                  'minOp': '>=',
                                  'min': 3,
                                  'maxOp': '<=',
                                  'max': 3
                                }
                              }
                            },
                            {
                              'suffix': 'unit',
                              'type': 'CODED_TEXT',
                              'list': [
                                {
                                  'value': 'kg',
                                  'label': 'kg',
                                  'validation': {
                                    'range': {
                                      'minOp': '>=',
                                      'min': 0,
                                      'maxOp': '<=',
                                      'max': 300
                                    },
                                    'precision': {
                                      'minOp': '>=',
                                      'min': 3,
                                      'maxOp': '<=',
                                      'max': 3
                                    }
                                  }
                                }
                              ],
                              'defaultValue': 'kg'
                            }
                          ],
                          'formId': 'test_encounter/testing/testing/intervals/quantity/upper',
                          'viewConfig': {
                            'field': {
                              'unit': {
                                'presentation': 'combobox'
                              }
                            },
                            'size': {
                              'field': 'inherit',
                              'label': 'inherit',
                              'fill': 'inherit'
                            },
                            'layout': {
                              'field': {
                                'valign': 'inherit',
                                'align': 'inherit'
                              }
                            }
                          }
                        },
                        {
                          'rmType': 'DV_QUANTITY',
                          'nodeId': '',
                          'min': 0,
                          'max': 1,
                          'aqlPath': '/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0022]/items[at0023]/value/lower',
                          'inputs': [
                            {
                              'suffix': 'magnitude',
                              'type': 'DECIMAL',
                              'validation': {
                                'range': {
                                  'minOp': '>=',
                                  'min': 0,
                                  'maxOp': '<=',
                                  'max': 200
                                },
                                'precision': {
                                  'minOp': '>=',
                                  'min': 3,
                                  'maxOp': '<=',
                                  'max': 3
                                }
                              }
                            },
                            {
                              'suffix': 'unit',
                              'type': 'CODED_TEXT',
                              'list': [
                                {
                                  'value': 'kg',
                                  'label': 'kg',
                                  'validation': {
                                    'range': {
                                      'minOp': '>=',
                                      'min': 0,
                                      'maxOp': '<=',
                                      'max': 200
                                    },
                                    'precision': {
                                      'minOp': '>=',
                                      'min': 3,
                                      'maxOp': '<=',
                                      'max': 3
                                    }
                                  }
                                }
                              ],
                              'defaultValue': 'kg'
                            }
                          ],
                          'formId': 'test_encounter/testing/testing/intervals/quantity/lower',
                          'viewConfig': {
                            'field': {
                              'unit': {
                                'presentation': 'combobox'
                              }
                            },
                            'size': {
                              'field': 'inherit',
                              'label': 'inherit',
                              'fill': 'inherit'
                            },
                            'layout': {
                              'field': {
                                'valign': 'inherit',
                                'align': 'inherit'
                              }
                            }
                          }
                        }
                      ],
                      'formId': 'test_encounter/testing/testing/intervals/quantity',
                      'viewConfig': {
                        'size': {
                          'field': 'inherit',
                          'label': 'inherit',
                          'fill': 'inherit'
                        },
                        'layout': {
                          'field': {
                            'valign': 'inherit',
                            'align': 'inherit'
                          }
                        }
                      }
                    }
                  ],
                  'formId': 'test_encounter/testing/testing/intervals',
                  'viewConfig': {
                    'size': {
                      'field': 'inherit',
                      'label': 'inherit',
                      'fill': 'inherit'
                    },
                    'layout': {
                      'field': {
                        'valign': 'inherit',
                        'align': 'inherit'
                      }
                    }
                  }
                }
              ],
              'formId': 'vital_signs/body_temperature/any_event',
              'viewConfig': {
                'size': {
                  'field': 'inherit',
                  'label': 'inherit',
                  'fill': 'inherit'
                },
                'layout': {
                  'field': {
                    'valign': 'inherit',
                    'align': 'inherit'
                  }
                }
              }
            },
            {
              'name': 'Site of measurement',
              'localizedName': 'Site of measurement',
              'rmType': 'DV_CODED_TEXT',
              'nodeId': 'at0021',
              'min': 0,
              'max': 1,
              'dependsOn': [
                'any_event'
              ],
              'localizedNames': {
                'en': 'Site of measurement',
                'sl': 'Stran telesa'
              },
              'localizedDescriptions': {
                'en': 'The anatomical site of measurement of the temperature',
                'sl': '*The anatomical site of measurement of the temperature(en)'
              },
              'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/protocol[at0020]/items[at0021]/value',
              'inputs': [
                {
                  'suffix': 'code',
                  'type': 'CODED_TEXT',
                  'list': [
                    {
                      'value': 'at0022',
                      'label': 'Mouth',
                      'localizedLabels': {
                        'en': 'Mouth',
                        'sl': 'Usta'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured within the mouth',
                        'sl': '*Temperature is measured within the mouth(en)'
                      }
                    },
                    {
                      'value': 'at0023',
                      'label': 'Ear canal',
                      'localizedLabels': {
                        'en': 'Ear canal',
                        'sl': 'V ušesu'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured from within the external auditory canal',
                        'sl': '*Temperature is measured from within the external auditory canal(en)'
                      }
                    },
                    {
                      'value': 'at0024',
                      'label': 'Axilla',
                      'localizedLabels': {
                        'en': 'Axilla',
                        'sl': 'Pod pazduho'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured from the skin of the axilla with the arm positioned down by the side',
                        'sl': '*Temperature is measured from the skin of the axilla with the arm positioned down by the side(en)'
                      }
                    },
                    {
                      'value': 'at0025',
                      'label': 'Rectum',
                      'localizedLabels': {
                        'en': 'Rectum',
                        'sl': 'Rektalno'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature measured within the rectum',
                        'sl': '*Temperature measured within the rectum(en)'
                      }
                    },
                    {
                      'value': 'at0026',
                      'label': 'Nasopharynx',
                      'localizedLabels': {
                        'en': 'Nasopharynx',
                        'sl': 'Nazofarinks'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured within the nasopharynx',
                        'sl': '*Temperature is measured within the nasopharynx(en)'
                      }
                    },
                    {
                      'value': 'at0027',
                      'label': 'Urinary bladder',
                      'localizedLabels': {
                        'en': 'Urinary bladder',
                        'sl': 'Sečni mehur'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured in the urinary bladder',
                        'sl': '*Temperature is measured in the urinary bladder(en)'
                      }
                    },
                    {
                      'value': 'at0028',
                      'label': 'Intravascular',
                      'localizedLabels': {
                        'en': 'Intravascular',
                        'sl': 'Intravaskularno'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured within the vascular system',
                        'sl': '*Temperature is measured within the vascular system(en)'
                      }
                    },
                    {
                      'value': 'at0043',
                      'label': 'Skin',
                      'localizedLabels': {
                        'en': 'Skin',
                        'sl': 'Na koži'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured from exposed skin',
                        'sl': '*Temperature is measured from exposed skin(en)'
                      }
                    },
                    {
                      'value': 'at0051',
                      'label': 'Vagina',
                      'localizedLabels': {
                        'en': 'Vagina',
                        'sl': 'Vaginalno'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured within the vagina',
                        'sl': '*Temperature is measured within the vagina(en)'
                      }
                    },
                    {
                      'value': 'at0054',
                      'label': 'Oesophagus',
                      'localizedLabels': {
                        'en': 'Oesophagus',
                        'sl': 'V požiralniku'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperatue is measured within the oesophagus',
                        'sl': '*Temperatue is measured within the oesophagus(en)'
                      }
                    },
                    {
                      'value': 'at0055',
                      'label': 'Inguinal skin crease',
                      'localizedLabels': {
                        'en': 'Inguinal skin crease',
                        'sl': 'V ustih'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured in the inguinal skin crease between the leg and abdominal wall',
                        'sl': '*Temperature is measured in the inguinal skin crease between the leg and abdominal wall(en)'
                      }
                    }
                  ]
                }
              ],
              'formId': 'vital_signs/body_temperature/site_of_measurement',
              'viewConfig': {
                'field': {
                  'code': {
                    'presentation': 'combobox'
                  }
                },
                'size': {
                  'field': 'inherit',
                  'label': 'inherit',
                  'fill': 'inherit'
                },
                'layout': {
                  'field': {
                    'valign': 'inherit',
                    'align': 'inherit'
                  }
                }
              }
            }
          ],
          'formId': 'vital_signs/body_temperature',
          'viewConfig': {
            'size': {
              'field': 'inherit',
              'label': 'inherit',
              'fill': 'inherit'
            },
            'layout': {
              'field': {
                'valign': 'inherit',
                'align': 'inherit'
              }
            }
          }
        }
      ]
    };

    let rm = (new ThinkEhrModelParser(rmTypeModelDictionary)).parseFormDescription({}, desc, {}, []) as FormRootModel;
    /*

  container1 (min: 0)
          field3 (min: 0) [ this field has value]
      container2 (min: 1)
             field1 (min: 1) [invalid if empty because field3 has value => container1 is not empty and container2 becomes required and all required fields in it should have values]
             field2 (min: 0) [empty field]

    */

    expect(rm.getChildModels().length).toBe(1);
    let field1: QuantityFieldModel = rm.findSuccessorsWithPath('test_encounter/testing/testing/intervals/quantity/upper')[0] as QuantityFieldModel;
    expect(field1).toBeTruthy();
    expect(field1.getMin()).toBe(1);
    expect(field1.init_min).toBe(1);
    expect(field1.isInitRequired()).toBe(true);
    expect(field1.isValueSet()).toBe(false);
    expect(field1.isRequired()).toBe(true);

    let field2 = rm.findSuccessorsWithPath('test_encounter/testing/testing/intervals/quantity/lower')[0] as QuantityFieldModel;
    expect(field2.isValueSet()).toBe(false);

    let container2 = rm.findSuccessorsWithPath('test_encounter/testing/testing/intervals')[0] as AbstractContainerModel;
    expect(container2.isValueSet()).toBe(false);
    let field3 = rm.findSuccessorsWithPath('vital_signs/body_temperature/any_event/description_of_thermal_stress')[0] as TextFieldModel;
    expect(field3.isValueSet()).toBe(false);

    const container1 = container2.getParentModel() as AbstractContainerModel;
    const initReqModels: Model[] = container1.getChildModels().filter((model: FormRepeatableElementModel) => {
      return model.isInitRequired();
    });

    expect(container1.isContainer()).toBe(true);
    expect(container1.isValueSet()).toBe(false);
    expect(container1.isRequired()).toBe(false);
    expect(initReqModels.length).toBe(1);
    expect(initReqModels[0]).toBe(container2);

    container1.getRootModel().resetStructuredValidation();
    expect(field1.isInitRequired()).toBe(true);
    expect(field1.isValueSet()).toBe(false);
    expect(field1.isRequired()).toBe(false);
    expect(field1.isStructuredRequired()).toBe(false);

    expect(container2.isValueSet()).toBe(false);
    expect(container2.isRequired()).toBe(false);
    expect(container2.isStructuredRequired()).toBe(false);

    field3.textValue('text here');

    setTimeout(() => {
      // value change callback gets called with setTimeout()
      expect(field3.isValueSet()).toBe(true);
      expect(container2.isValueSet()).toBe(false);
      expect(container2.isRequired()).toBe(true);
      expect(container2.isStructuredRequired()).toBe(true);
      expect(field1.isRequired()).toBe(true);
      expect(field1.isStructuredRequired()).toBe(true);

      field3.textValue('');

      setTimeout(() => {
        expect(field3.isValueSet()).toBe(false);
        expect(container2.isValueSet()).toBe(false);
        expect(container2.isRequired()).toBe(false);
        expect(container2.isStructuredRequired()).toBe(false);
        expect(field1.isRequired()).toBe(false);
        expect(field1.isStructuredRequired()).toBe(false);
        done();
      }, 10);
    }, 10);
  });

  it('Container structured validation - sibling container empty, not empty (ex. 6)', function (done) {

    const desc = {
      'formId': 'form_root',
      'name': 'Form root',
      'rmType': 'FORM_DEFINITION',
      'viewConfig': {
        'label': {
          'custom': false,
          'value': '',
          'useLocalizations': false,
          'localizationsList': {}
        },
        'size': {
          'field': 'inherit',
          'label': 'inherit',
          'fill': 'inherit'
        },
        'layout': {
          'valign': 'inherit',
          'align': 'inherit'
        },
        'tags': []
      },
      'templateLanguages': [
        'en',
        'sl'
      ],
      'children': [
        {
          'name': 'Body temperature',
          'localizedName': 'Body temperature',
          'rmType': 'OBSERVATION',
          'nodeId': 'openEHR-EHR-OBSERVATION.body_temperature.v1',
          'min': 0,
          'max': -1,
          'localizedNames': {
            'en': 'Body temperature',
            'sl': 'Telesna temperature'
          },
          'localizedDescriptions': {
            'en': 'A measurement of the body temperature, which is a surrogate for the whole body temperature of the person.',
            'sl': '*A measurement of the body temperature, which is a surrogate for the whole body temperature of the person.(en)'
          },
          'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]',
          'children': [
            {
              'name': 'Any event',
              'localizedName': 'Any event',
              'rmType': 'EVENT',
              'nodeId': 'at0003',
              'min': 0,
              'max': -1,
              'localizedNames': {
                'en': 'Any event',
                'sl': 'Any event'
              },
              'localizedDescriptions': {
                'en': 'Any event',
                'sl': '*Any event(en)'
              },
              'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]',
              'children': [
                {
                  'name': 'Temperature',
                  'localizedName': 'Temperature',
                  'rmType': 'DV_QUANTITY',
                  'nodeId': 'at0004',
                  'min': 1,
                  'max': 1,
                  'localizedNames': {
                    'en': 'Temperature',
                    'sl': 'Telesna temperature'
                  },
                  'localizedDescriptions': {
                    'en': 'The measured body temperature (as a surrogate for the whole body)',
                    'sl': '*The measured body temperature (as a surrogate for the whole body)(en)'
                  },
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value',
                  'inputs': [
                    {
                      'suffix': 'magnitude',
                      'type': 'DECIMAL'
                    },
                    {
                      'suffix': 'unit',
                      'type': 'CODED_TEXT',
                      'list': [
                        {
                          'value': '°C',
                          'label': '°C',
                          'validation': {
                            'precision': {
                              'minOp': '>=',
                              'min': 1,
                              'maxOp': '<=',
                              'max': 1
                            }
                          }
                        },
                        {
                          'value': '°F',
                          'label': '°F',
                          'validation': {
                            'precision': {
                              'minOp': '>=',
                              'min': 1,
                              'maxOp': '<=',
                              'max': 1
                            }
                          }
                        }
                      ]
                    }
                  ],
                  'formId': 'vital_signs/body_temperature/any_event/temperature',
                  'viewConfig': {
                    'field': {
                      'unit': {
                        'presentation': 'combobox'
                      }
                    },
                    'size': {
                      'field': 'inherit',
                      'label': 'inherit',
                      'fill': 'inherit'
                    },
                    'layout': {
                      'field': {
                        'valign': 'inherit',
                        'align': 'inherit'
                      }
                    }
                  }
                },
                {
                  'name': 'Body exposure',
                  'localizedName': 'Body exposure',
                  'rmType': 'DV_CODED_TEXT',
                  'nodeId': 'at0030',
                  'min': 0,
                  'max': 1,
                  'dependsOn': [
                    'temperature'
                  ],
                  'localizedNames': {
                    'en': 'Body exposure',
                    'sl': 'Obleka'
                  },
                  'localizedDescriptions': {
                    'en': 'The thermal situation of the person who is having the temperature taken',
                    'sl': '*The thermal situation of the person who is having the temperature taken(en)'
                  },
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]/state[at0029]/items[at0030]/value',
                  'inputs': [
                    {
                      'suffix': 'code',
                      'type': 'CODED_TEXT',
                      'list': [
                        {
                          'value': 'at0031',
                          'label': 'Naked',
                          'localizedLabels': {
                            'en': 'Naked',
                            'sl': 'Gol'
                          },
                          'localizedDescriptions': {
                            'en': 'No clothing, bedding or covering',
                            'sl': '*No clothing, bedding or covering(en)'
                          }
                        },
                        {
                          'value': 'at0032',
                          'label': 'Reduced clothing/bedding',
                          'localizedLabels': {
                            'en': 'Reduced clothing/bedding',
                            'sl': 'Premalo oblečen (zavit)'
                          },
                          'localizedDescriptions': {
                            'en': 'The person is covered by a lesser amount of clothing or bedding than deemed appropriate for the environmental circumstances',
                            'sl': '*The person is covered by a lesser amount of clothing or bedding than deemed appropriate for the environmental circumstances(en)'
                          }
                        },
                        {
                          'value': 'at0033',
                          'label': 'Appropriate clothing/bedding',
                          'localizedLabels': {
                            'en': 'Appropriate clothing/bedding',
                            'sl': 'Primerno oblečen (zavit)'
                          },
                          'localizedDescriptions': {
                            'en': 'The person is covered by an amount of clothing or bedding deemed appropriate for the environmental circumstances',
                            'sl': '*The person is covered by an amount of clothing or bedding deemed appropriate for the environmental circumstances(en)'
                          }
                        },
                        {
                          'value': 'at0034',
                          'label': 'Increased clothing/bedding',
                          'localizedLabels': {
                            'en': 'Increased clothing/bedding',
                            'sl': 'Preveč oblečen (zavit)'
                          },
                          'localizedDescriptions': {
                            'en': 'The person is covered by an increased amount of clothing or bedding than deemed appropriate for the environmental circumstances',
                            'sl': '*The person is covered by an increased amount of clothing or bedding than deemed appropriate for the environmental circumstances(en)'
                          }
                        }
                      ]
                    }
                  ],
                  'formId': 'vital_signs/body_temperature/any_event/body_exposure',
                  'viewConfig': {
                    'field': {
                      'code': {
                        'presentation': 'combobox'
                      }
                    },
                    'size': {
                      'field': 'inherit',
                      'label': 'inherit',
                      'fill': 'inherit'
                    },
                    'layout': {
                      'field': {
                        'valign': 'inherit',
                        'align': 'inherit'
                      }
                    }
                  }
                },
                {
                  'name': 'Description of thermal stress',
                  'localizedName': 'Description of thermal stress',
                  'rmType': 'DV_TEXT',
                  'nodeId': 'at0041',
                  'min': 0,
                  'max': 1,
                  'dependsOn': [
                    'temperature'
                  ],
                  'localizedNames': {
                    'en': 'Description of thermal stress',
                    'sl': 'Opis'
                  },
                  'localizedDescriptions': {
                    'en': 'Description of the conditions applied to the subject that might influence their measured body temperature.',
                    'sl': '*Description of the conditions applied to the subject that might influence their measured body temperature.(en)'
                  },
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]/state[at0029]/items[at0041]/value',
                  'inputs': [
                    {
                      'type': 'TEXT'
                    }
                  ],
                  'formId': 'vital_signs/body_temperature/any_event/description_of_thermal_stress',
                  'viewConfig': {
                    'size': {
                      'field': 'inherit',
                      'label': 'inherit',
                      'fill': 'inherit'
                    },
                    'layout': {
                      'field': {
                        'valign': 'inherit',
                        'align': 'inherit'
                      }
                    }
                  }
                },
                {
                  'name': 'Intervals',
                  'localizedName': 'Intervals',
                  'rmType': 'CLUSTER',
                  'nodeId': 'at0022',
                  'min': 1,
                  'max': 1,
                  'localizedNames': {
                    'en': 'Intervals'
                  },
                  'localizedDescriptions': {
                    'en': '*'
                  },
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0022]',
                  'children': [
                    {
                      'name': 'Quantity',
                      'localizedName': 'Quantity',
                      'rmType': 'DV_INTERVAL<DV_QUANTITY>',
                      'nodeId': 'at0023',
                      'min': 0,
                      'max': 1,
                      'localizedNames': {
                        'en': 'Quantity'
                      },
                      'localizedDescriptions': {
                        'en': '*'
                      },
                      'aqlPath': '/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0022]/items[at0023]/value',
                      'children': [
                        {
                          'rmType': 'DV_QUANTITY',
                          'nodeId': '',
                          'min': 1,
                          'max': 1,
                          'aqlPath': '/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0022]/items[at0023]/value/upper',
                          'inputs': [
                            {
                              'suffix': 'magnitude',
                              'type': 'DECIMAL',
                              'validation': {
                                'range': {
                                  'minOp': '>=',
                                  'min': 0,
                                  'maxOp': '<=',
                                  'max': 300
                                },
                                'precision': {
                                  'minOp': '>=',
                                  'min': 3,
                                  'maxOp': '<=',
                                  'max': 3
                                }
                              }
                            },
                            {
                              'suffix': 'unit',
                              'type': 'CODED_TEXT',
                              'list': [
                                {
                                  'value': 'kg',
                                  'label': 'kg',
                                  'validation': {
                                    'range': {
                                      'minOp': '>=',
                                      'min': 0,
                                      'maxOp': '<=',
                                      'max': 300
                                    },
                                    'precision': {
                                      'minOp': '>=',
                                      'min': 3,
                                      'maxOp': '<=',
                                      'max': 3
                                    }
                                  }
                                }
                              ],
                              'defaultValue': 'kg'
                            }
                          ],
                          'formId': 'test_encounter/testing/testing/intervals/quantity/upper',
                          'viewConfig': {
                            'field': {
                              'unit': {
                                'presentation': 'combobox'
                              }
                            },
                            'size': {
                              'field': 'inherit',
                              'label': 'inherit',
                              'fill': 'inherit'
                            },
                            'layout': {
                              'field': {
                                'valign': 'inherit',
                                'align': 'inherit'
                              }
                            }
                          }
                        },
                        {
                          'rmType': 'DV_QUANTITY',
                          'nodeId': '',
                          'min': 0,
                          'max': 1,
                          'aqlPath': '/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0022]/items[at0023]/value/lower',
                          'inputs': [
                            {
                              'suffix': 'magnitude',
                              'type': 'DECIMAL',
                              'validation': {
                                'range': {
                                  'minOp': '>=',
                                  'min': 0,
                                  'maxOp': '<=',
                                  'max': 200
                                },
                                'precision': {
                                  'minOp': '>=',
                                  'min': 3,
                                  'maxOp': '<=',
                                  'max': 3
                                }
                              }
                            },
                            {
                              'suffix': 'unit',
                              'type': 'CODED_TEXT',
                              'list': [
                                {
                                  'value': 'kg',
                                  'label': 'kg',
                                  'validation': {
                                    'range': {
                                      'minOp': '>=',
                                      'min': 0,
                                      'maxOp': '<=',
                                      'max': 200
                                    },
                                    'precision': {
                                      'minOp': '>=',
                                      'min': 3,
                                      'maxOp': '<=',
                                      'max': 3
                                    }
                                  }
                                }
                              ],
                              'defaultValue': 'kg'
                            }
                          ],
                          'formId': 'test_encounter/testing/testing/intervals/quantity/lower',
                          'viewConfig': {
                            'field': {
                              'unit': {
                                'presentation': 'combobox'
                              }
                            },
                            'size': {
                              'field': 'inherit',
                              'label': 'inherit',
                              'fill': 'inherit'
                            },
                            'layout': {
                              'field': {
                                'valign': 'inherit',
                                'align': 'inherit'
                              }
                            }
                          }
                        }
                      ],
                      'formId': 'test_encounter/testing/testing/intervals/quantity',
                      'viewConfig': {
                        'size': {
                          'field': 'inherit',
                          'label': 'inherit',
                          'fill': 'inherit'
                        },
                        'layout': {
                          'field': {
                            'valign': 'inherit',
                            'align': 'inherit'
                          }
                        }
                      }
                    }
                  ],
                  'formId': 'test_encounter/testing/testing/intervals',
                  'viewConfig': {
                    'size': {
                      'field': 'inherit',
                      'label': 'inherit',
                      'fill': 'inherit'
                    },
                    'layout': {
                      'field': {
                        'valign': 'inherit',
                        'align': 'inherit'
                      }
                    }
                  }
                }
              ],
              'formId': 'vital_signs/body_temperature/any_event',
              'viewConfig': {
                'size': {
                  'field': 'inherit',
                  'label': 'inherit',
                  'fill': 'inherit'
                },
                'layout': {
                  'field': {
                    'valign': 'inherit',
                    'align': 'inherit'
                  }
                }
              }
            },
            {
              'name': 'Site of measurement',
              'localizedName': 'Site of measurement',
              'rmType': 'DV_CODED_TEXT',
              'nodeId': 'at0021',
              'min': 0,
              'max': 1,
              'dependsOn': [
                'any_event'
              ],
              'localizedNames': {
                'en': 'Site of measurement',
                'sl': 'Stran telesa'
              },
              'localizedDescriptions': {
                'en': 'The anatomical site of measurement of the temperature',
                'sl': '*The anatomical site of measurement of the temperature(en)'
              },
              'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/protocol[at0020]/items[at0021]/value',
              'inputs': [
                {
                  'suffix': 'code',
                  'type': 'CODED_TEXT',
                  'list': [
                    {
                      'value': 'at0022',
                      'label': 'Mouth',
                      'localizedLabels': {
                        'en': 'Mouth',
                        'sl': 'Usta'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured within the mouth',
                        'sl': '*Temperature is measured within the mouth(en)'
                      }
                    },
                    {
                      'value': 'at0023',
                      'label': 'Ear canal',
                      'localizedLabels': {
                        'en': 'Ear canal',
                        'sl': 'V ušesu'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured from within the external auditory canal',
                        'sl': '*Temperature is measured from within the external auditory canal(en)'
                      }
                    },
                    {
                      'value': 'at0024',
                      'label': 'Axilla',
                      'localizedLabels': {
                        'en': 'Axilla',
                        'sl': 'Pod pazduho'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured from the skin of the axilla with the arm positioned down by the side',
                        'sl': '*Temperature is measured from the skin of the axilla with the arm positioned down by the side(en)'
                      }
                    },
                    {
                      'value': 'at0025',
                      'label': 'Rectum',
                      'localizedLabels': {
                        'en': 'Rectum',
                        'sl': 'Rektalno'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature measured within the rectum',
                        'sl': '*Temperature measured within the rectum(en)'
                      }
                    },
                    {
                      'value': 'at0026',
                      'label': 'Nasopharynx',
                      'localizedLabels': {
                        'en': 'Nasopharynx',
                        'sl': 'Nazofarinks'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured within the nasopharynx',
                        'sl': '*Temperature is measured within the nasopharynx(en)'
                      }
                    },
                    {
                      'value': 'at0027',
                      'label': 'Urinary bladder',
                      'localizedLabels': {
                        'en': 'Urinary bladder',
                        'sl': 'Sečni mehur'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured in the urinary bladder',
                        'sl': '*Temperature is measured in the urinary bladder(en)'
                      }
                    },
                    {
                      'value': 'at0028',
                      'label': 'Intravascular',
                      'localizedLabels': {
                        'en': 'Intravascular',
                        'sl': 'Intravaskularno'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured within the vascular system',
                        'sl': '*Temperature is measured within the vascular system(en)'
                      }
                    },
                    {
                      'value': 'at0043',
                      'label': 'Skin',
                      'localizedLabels': {
                        'en': 'Skin',
                        'sl': 'Na koži'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured from exposed skin',
                        'sl': '*Temperature is measured from exposed skin(en)'
                      }
                    },
                    {
                      'value': 'at0051',
                      'label': 'Vagina',
                      'localizedLabels': {
                        'en': 'Vagina',
                        'sl': 'Vaginalno'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured within the vagina',
                        'sl': '*Temperature is measured within the vagina(en)'
                      }
                    },
                    {
                      'value': 'at0054',
                      'label': 'Oesophagus',
                      'localizedLabels': {
                        'en': 'Oesophagus',
                        'sl': 'V požiralniku'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperatue is measured within the oesophagus',
                        'sl': '*Temperatue is measured within the oesophagus(en)'
                      }
                    },
                    {
                      'value': 'at0055',
                      'label': 'Inguinal skin crease',
                      'localizedLabels': {
                        'en': 'Inguinal skin crease',
                        'sl': 'V ustih'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured in the inguinal skin crease between the leg and abdominal wall',
                        'sl': '*Temperature is measured in the inguinal skin crease between the leg and abdominal wall(en)'
                      }
                    }
                  ]
                }
              ],
              'formId': 'vital_signs/body_temperature/site_of_measurement',
              'viewConfig': {
                'field': {
                  'code': {
                    'presentation': 'combobox'
                  }
                },
                'size': {
                  'field': 'inherit',
                  'label': 'inherit',
                  'fill': 'inherit'
                },
                'layout': {
                  'field': {
                    'valign': 'inherit',
                    'align': 'inherit'
                  }
                }
              }
            }
          ],
          'formId': 'vital_signs/body_temperature',
          'viewConfig': {
            'size': {
              'field': 'inherit',
              'label': 'inherit',
              'fill': 'inherit'
            },
            'layout': {
              'field': {
                'valign': 'inherit',
                'align': 'inherit'
              }
            }
          }
        }
      ]
    };

    let rm = (new ThinkEhrModelParser(rmTypeModelDictionary)).parseFormDescription({}, desc, {}, []) as FormRootModel;
    /*

   container1 (min: 0)
       container2 (min: 1)
               field3 (min:1) [valid if empty because of parent is not required]
           field1 (min: 1) [valid if empty]
           field2 (min: 0) [empty field]
    */

    expect(rm.getChildModels().length).toBe(1);
    let field1: QuantityFieldModel = rm.findSuccessorsWithPath('vital_signs/body_temperature/any_event/temperature')[0] as QuantityFieldModel;
    expect(field1).toBeTruthy();
    expect(field1.getMin()).toBe(1);
    expect(field1.init_min).toBe(1);
    expect(field1.isInitRequired()).toBe(true);
    expect(field1.isValueSet()).toBe(false);
    expect(field1.isRequired()).toBe(true);

    const container1 = field1.getParentModel() as AbstractContainerModel;
    const initReqModels: Model[] = container1.getChildModels().filter((model: FormRepeatableElementModel) => {
      return model.isInitRequired();
    });

    expect(container1.isContainer()).toBe(true);
    expect(container1.isValueSet()).toBe(false);
    expect(initReqModels.length).toBe(2);
    expect(initReqModels[0]).toBe(field1);

    let container2 = rm.findSuccessorsWithPath('test_encounter/testing/testing/intervals')[0] as AbstractContainerModel;
    expect(container2.isValueSet()).toBe(false);
    expect(container2.isRequired()).toBe(true);
    expect(container2.isInitRequired()).toBe(true);

    let field3 = rm.findSuccessorsWithPath('test_encounter/testing/testing/intervals/quantity/upper')[0] as QuantityFieldModel;
    expect(field3.isValueSet()).toBe(false);
    expect(field3.isRequired()).toBe(true);
    expect(field3.isInitRequired()).toBe(true);

    container1.getRootModel().resetStructuredValidation();

    expect(field1.isInitRequired()).toBe(true);
    expect(field1.isValueSet()).toBe(false);
    expect(field1.isRequired()).toBe(false);
    expect(field1.isStructuredRequired()).toBe(false);

    let field2 = rm.findSuccessorsWithPath('vital_signs/body_temperature/any_event/description_of_thermal_stress')[0] as TextFieldModel;
    expect(field2.isValueSet()).toBe(false);

    expect(container2.isValueSet()).toBe(false);
    expect(container2.isRequired()).toBe(false);
    expect(container2.isStructuredRequired()).toBe(false);
    expect(container2.isInitRequired()).toBe(true);

    expect(field3.isValueSet()).toBe(false);
    expect(field3.isRequired()).toBe(false);
    expect(field3.isStructuredRequired()).toBe(false);
    expect(field3.isInitRequired()).toBe(true);

    // makes field1 required
    field3.magnitudeValue(0);

    setTimeout(() => {
      // value change callback gets called with setTimeout()
      expect(container2.isValueSet()).toBe(true);
      expect(field3.isValueSet()).toBe(true);
      expect(field1.isRequired()).toBe(true);
      expect(field1.isStructuredRequired()).toBe(true);
      expect(field2.isValueSet()).toBe(false);


      // makes field1 not required
      field3.magnitudeValue(null);

      setTimeout(() => {
        expect(field3.isValueSet()).toBe(false);
        expect(container2.isValueSet()).toBe(false);
        expect(field2.isValueSet()).toBe(false);
        expect(field1.isRequired()).toBe(false);
        expect(field1.isStructuredRequired()).toBe(false);

        //makes field1 and field3 required
        field2.textValue('txt');
        setTimeout(() => {
          expect(field3.isValueSet()).toBe(false);
          expect(container2.isValueSet()).toBe(false);
          expect(field2.isValueSet()).toBe(true);
          expect(field1.isValueSet()).toBe(false);

          expect(field1.isRequired()).toBe(true);
          expect(field1.isStructuredRequired()).toBe(true);
          expect(field3.isRequired()).toBe(true);
          expect(field3.isStructuredRequired()).toBe(true);
          expect(container2.isRequired()).toBe(true);
          expect(container2.isStructuredRequired()).toBe(true);


          field2.textValue('');
          setTimeout(() => {
            expect(field3.isValueSet()).toBe(false);
            expect(container2.isValueSet()).toBe(false);
            expect(field2.isValueSet()).toBe(false);
            expect(field1.isValueSet()).toBe(false);

            expect(field1.isRequired()).toBe(false);
            expect(field1.isStructuredRequired()).toBe(false);
            expect(field3.isRequired()).toBe(false);
            expect(field3.isStructuredRequired()).toBe(false);
            expect(container2.isRequired()).toBe(false);
            expect(container2.isStructuredRequired()).toBe(false);
            done();
          }, 10);
        }, 10);
      }, 10);

    }, 10);
  });

  it('Container structured validation with field set in child container ()', function (done) {
    const desc = {
      'formId': 'form_root',
      'name': 'Form root',
      'rmType': 'FORM_DEFINITION',
      'viewConfig': {
        'label': {
          'custom': false,
          'value': '',
          'useLocalizations': false,
          'localizationsList': {}
        },
        'size': {
          'field': 'inherit',
          'label': 'inherit',
          'fill': 'inherit'
        },
        'layout': {
          'valign': 'inherit',
          'align': 'inherit'
        },
        'tags': []
      },
      'templateLanguages': [
        'en',
        'sl'
      ],
      'children': [
        {
          'name': 'Body temperature',
          'localizedName': 'Body temperature',
          'rmType': 'OBSERVATION',
          'nodeId': 'openEHR-EHR-OBSERVATION.body_temperature.v1',
          'min': 0,
          'max': -1,
          'localizedNames': {
            'en': 'Body temperature',
            'sl': 'Telesna temperature'
          },
          'localizedDescriptions': {
            'en': 'A measurement of the body temperature, which is a surrogate for the whole body temperature of the person.',
            'sl': '*A measurement of the body temperature, which is a surrogate for the whole body temperature of the person.(en)'
          },
          'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]',
          'children': [
            {
              'name': 'Any event',
              'localizedName': 'Any event',
              'rmType': 'EVENT',
              'nodeId': 'at0003',
              'min': 0,
              'max': -1,
              'localizedNames': {
                'en': 'Any event',
                'sl': 'Any event'
              },
              'localizedDescriptions': {
                'en': 'Any event',
                'sl': '*Any event(en)'
              },
              'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]',
              'children': [
                {
                  'name': 'Temperature',
                  'localizedName': 'Temperature',
                  'rmType': 'DV_QUANTITY',
                  'nodeId': 'at0004',
                  'min': 1,
                  'max': 1,
                  'localizedNames': {
                    'en': 'Temperature',
                    'sl': 'Telesna temperature'
                  },
                  'localizedDescriptions': {
                    'en': 'The measured body temperature (as a surrogate for the whole body)',
                    'sl': '*The measured body temperature (as a surrogate for the whole body)(en)'
                  },
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value',
                  'inputs': [
                    {
                      'suffix': 'magnitude',
                      'type': 'DECIMAL'
                    },
                    {
                      'suffix': 'unit',
                      'type': 'CODED_TEXT',
                      'list': [
                        {
                          'value': '°C',
                          'label': '°C',
                          'validation': {
                            'precision': {
                              'minOp': '>=',
                              'min': 1,
                              'maxOp': '<=',
                              'max': 1
                            }
                          }
                        },
                        {
                          'value': '°F',
                          'label': '°F',
                          'validation': {
                            'precision': {
                              'minOp': '>=',
                              'min': 1,
                              'maxOp': '<=',
                              'max': 1
                            }
                          }
                        }
                      ]
                    }
                  ],
                  'formId': 'vital_signs/body_temperature/any_event/temperature',
                  'viewConfig': {
                    'field': {
                      'unit': {
                        'presentation': 'combobox'
                      }
                    },
                    'size': {
                      'field': 'inherit',
                      'label': 'inherit',
                      'fill': 'inherit'
                    },
                    'layout': {
                      'field': {
                        'valign': 'inherit',
                        'align': 'inherit'
                      }
                    }
                  }
                },
                {
                  'name': 'Body exposure',
                  'localizedName': 'Body exposure',
                  'rmType': 'DV_CODED_TEXT',
                  'nodeId': 'at0030',
                  'min': 0,
                  'max': 1,
                  'dependsOn': [
                    'temperature'
                  ],
                  'localizedNames': {
                    'en': 'Body exposure',
                    'sl': 'Obleka'
                  },
                  'localizedDescriptions': {
                    'en': 'The thermal situation of the person who is having the temperature taken',
                    'sl': '*The thermal situation of the person who is having the temperature taken(en)'
                  },
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]/state[at0029]/items[at0030]/value',
                  'inputs': [
                    {
                      'suffix': 'code',
                      'type': 'CODED_TEXT',
                      'list': [
                        {
                          'value': 'at0031',
                          'label': 'Naked',
                          'localizedLabels': {
                            'en': 'Naked',
                            'sl': 'Gol'
                          },
                          'localizedDescriptions': {
                            'en': 'No clothing, bedding or covering',
                            'sl': '*No clothing, bedding or covering(en)'
                          }
                        },
                        {
                          'value': 'at0032',
                          'label': 'Reduced clothing/bedding',
                          'localizedLabels': {
                            'en': 'Reduced clothing/bedding',
                            'sl': 'Premalo oblečen (zavit)'
                          },
                          'localizedDescriptions': {
                            'en': 'The person is covered by a lesser amount of clothing or bedding than deemed appropriate for the environmental circumstances',
                            'sl': '*The person is covered by a lesser amount of clothing or bedding than deemed appropriate for the environmental circumstances(en)'
                          }
                        },
                        {
                          'value': 'at0033',
                          'label': 'Appropriate clothing/bedding',
                          'localizedLabels': {
                            'en': 'Appropriate clothing/bedding',
                            'sl': 'Primerno oblečen (zavit)'
                          },
                          'localizedDescriptions': {
                            'en': 'The person is covered by an amount of clothing or bedding deemed appropriate for the environmental circumstances',
                            'sl': '*The person is covered by an amount of clothing or bedding deemed appropriate for the environmental circumstances(en)'
                          }
                        },
                        {
                          'value': 'at0034',
                          'label': 'Increased clothing/bedding',
                          'localizedLabels': {
                            'en': 'Increased clothing/bedding',
                            'sl': 'Preveč oblečen (zavit)'
                          },
                          'localizedDescriptions': {
                            'en': 'The person is covered by an increased amount of clothing or bedding than deemed appropriate for the environmental circumstances',
                            'sl': '*The person is covered by an increased amount of clothing or bedding than deemed appropriate for the environmental circumstances(en)'
                          }
                        }
                      ]
                    }
                  ],
                  'formId': 'vital_signs/body_temperature/any_event/body_exposure',
                  'viewConfig': {
                    'field': {
                      'code': {
                        'presentation': 'combobox'
                      }
                    },
                    'size': {
                      'field': 'inherit',
                      'label': 'inherit',
                      'fill': 'inherit'
                    },
                    'layout': {
                      'field': {
                        'valign': 'inherit',
                        'align': 'inherit'
                      }
                    }
                  }
                },
                {
                  'name': 'Description of thermal stress',
                  'localizedName': 'Description of thermal stress',
                  'rmType': 'DV_TEXT',
                  'nodeId': 'at0041',
                  'min': 0,
                  'max': 1,
                  'dependsOn': [
                    'temperature'
                  ],
                  'localizedNames': {
                    'en': 'Description of thermal stress',
                    'sl': 'Opis'
                  },
                  'localizedDescriptions': {
                    'en': 'Description of the conditions applied to the subject that might influence their measured body temperature.',
                    'sl': '*Description of the conditions applied to the subject that might influence their measured body temperature.(en)'
                  },
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]/state[at0029]/items[at0041]/value',
                  'inputs': [
                    {
                      'type': 'TEXT'
                    }
                  ],
                  'formId': 'vital_signs/body_temperature/any_event/description_of_thermal_stress',
                  'viewConfig': {
                    'size': {
                      'field': 'inherit',
                      'label': 'inherit',
                      'fill': 'inherit'
                    },
                    'layout': {
                      'field': {
                        'valign': 'inherit',
                        'align': 'inherit'
                      }
                    }
                  }
                },

                {
                  'name': 'Intervals',
                  'localizedName': 'Intervals',
                  'rmType': 'CLUSTER',
                  'nodeId': 'at0022',
                  'min': 0,
                  'max': 1,
                  'localizedNames': {
                    'en': 'Intervals'
                  },
                  'localizedDescriptions': {
                    'en': '*'
                  },
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0022]',
                  'children': [
                    {
                      'name': 'Quantity',
                      'localizedName': 'Quantity',
                      'rmType': 'DV_INTERVAL<DV_QUANTITY>',
                      'nodeId': 'at0023',
                      'min': 0,
                      'max': 1,
                      'localizedNames': {
                        'en': 'Quantity'
                      },
                      'localizedDescriptions': {
                        'en': '*'
                      },
                      'aqlPath': '/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0022]/items[at0023]/value',
                      'children': [
                        {
                          'rmType': 'DV_QUANTITY',
                          'nodeId': '',
                          'min': 0,
                          'max': 1,
                          'aqlPath': '/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0022]/items[at0023]/value/upper',
                          'inputs': [
                            {
                              'suffix': 'magnitude',
                              'type': 'DECIMAL',
                              'validation': {
                                'range': {
                                  'minOp': '>=',
                                  'min': 0,
                                  'maxOp': '<=',
                                  'max': 300
                                },
                                'precision': {
                                  'minOp': '>=',
                                  'min': 3,
                                  'maxOp': '<=',
                                  'max': 3
                                }
                              }
                            },
                            {
                              'suffix': 'unit',
                              'type': 'CODED_TEXT',
                              'list': [
                                {
                                  'value': 'kg',
                                  'label': 'kg',
                                  'validation': {
                                    'range': {
                                      'minOp': '>=',
                                      'min': 0,
                                      'maxOp': '<=',
                                      'max': 300
                                    },
                                    'precision': {
                                      'minOp': '>=',
                                      'min': 3,
                                      'maxOp': '<=',
                                      'max': 3
                                    }
                                  }
                                }
                              ],
                              'defaultValue': 'kg'
                            }
                          ],
                          'formId': 'test_encounter/testing/testing/intervals/quantity/upper',
                          'viewConfig': {
                            'field': {
                              'unit': {
                                'presentation': 'combobox'
                              }
                            },
                            'size': {
                              'field': 'inherit',
                              'label': 'inherit',
                              'fill': 'inherit'
                            },
                            'layout': {
                              'field': {
                                'valign': 'inherit',
                                'align': 'inherit'
                              }
                            }
                          }
                        },
                        {
                          'rmType': 'DV_QUANTITY',
                          'nodeId': '',
                          'min': 0,
                          'max': 1,
                          'aqlPath': '/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0022]/items[at0023]/value/lower',
                          'inputs': [
                            {
                              'suffix': 'magnitude',
                              'type': 'DECIMAL',
                              'validation': {
                                'range': {
                                  'minOp': '>=',
                                  'min': 0,
                                  'maxOp': '<=',
                                  'max': 200
                                },
                                'precision': {
                                  'minOp': '>=',
                                  'min': 3,
                                  'maxOp': '<=',
                                  'max': 3
                                }
                              }
                            },
                            {
                              'suffix': 'unit',
                              'type': 'CODED_TEXT',
                              'list': [
                                {
                                  'value': 'kg',
                                  'label': 'kg',
                                  'validation': {
                                    'range': {
                                      'minOp': '>=',
                                      'min': 0,
                                      'maxOp': '<=',
                                      'max': 200
                                    },
                                    'precision': {
                                      'minOp': '>=',
                                      'min': 3,
                                      'maxOp': '<=',
                                      'max': 3
                                    }
                                  }
                                }
                              ],
                              'defaultValue': 'kg'
                            }
                          ],
                          'formId': 'test_encounter/testing/testing/intervals/quantity/lower',
                          'viewConfig': {
                            'field': {
                              'unit': {
                                'presentation': 'combobox'
                              }
                            },
                            'size': {
                              'field': 'inherit',
                              'label': 'inherit',
                              'fill': 'inherit'
                            },
                            'layout': {
                              'field': {
                                'valign': 'inherit',
                                'align': 'inherit'
                              }
                            }
                          }
                        }
                      ],
                      'formId': 'test_encounter/testing/testing/intervals/quantity',
                      'viewConfig': {
                        'size': {
                          'field': 'inherit',
                          'label': 'inherit',
                          'fill': 'inherit'
                        },
                        'layout': {
                          'field': {
                            'valign': 'inherit',
                            'align': 'inherit'
                          }
                        }
                      }
                    }
                  ],
                  'formId': 'test_encounter/testing/testing/intervals',
                  'viewConfig': {
                    'size': {
                      'field': 'inherit',
                      'label': 'inherit',
                      'fill': 'inherit'
                    },
                    'layout': {
                      'field': {
                        'valign': 'inherit',
                        'align': 'inherit'
                      }
                    }
                  }
                }
              ],
              'formId': 'vital_signs/body_temperature/any_event',
              'viewConfig': {
                'size': {
                  'field': 'inherit',
                  'label': 'inherit',
                  'fill': 'inherit'
                },
                'layout': {
                  'field': {
                    'valign': 'inherit',
                    'align': 'inherit'
                  }
                }
              }
            },
            {
              'name': 'Site of measurement',
              'localizedName': 'Site of measurement',
              'rmType': 'DV_CODED_TEXT',
              'nodeId': 'at0021',
              'min': 0,
              'max': 1,
              'dependsOn': [
                'any_event'
              ],
              'localizedNames': {
                'en': 'Site of measurement',
                'sl': 'Stran telesa'
              },
              'localizedDescriptions': {
                'en': 'The anatomical site of measurement of the temperature',
                'sl': '*The anatomical site of measurement of the temperature(en)'
              },
              'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/protocol[at0020]/items[at0021]/value',
              'inputs': [
                {
                  'suffix': 'code',
                  'type': 'CODED_TEXT',
                  'list': [
                    {
                      'value': 'at0022',
                      'label': 'Mouth',
                      'localizedLabels': {
                        'en': 'Mouth',
                        'sl': 'Usta'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured within the mouth',
                        'sl': '*Temperature is measured within the mouth(en)'
                      }
                    },
                    {
                      'value': 'at0023',
                      'label': 'Ear canal',
                      'localizedLabels': {
                        'en': 'Ear canal',
                        'sl': 'V ušesu'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured from within the external auditory canal',
                        'sl': '*Temperature is measured from within the external auditory canal(en)'
                      }
                    },
                    {
                      'value': 'at0024',
                      'label': 'Axilla',
                      'localizedLabels': {
                        'en': 'Axilla',
                        'sl': 'Pod pazduho'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured from the skin of the axilla with the arm positioned down by the side',
                        'sl': '*Temperature is measured from the skin of the axilla with the arm positioned down by the side(en)'
                      }
                    },
                    {
                      'value': 'at0025',
                      'label': 'Rectum',
                      'localizedLabels': {
                        'en': 'Rectum',
                        'sl': 'Rektalno'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature measured within the rectum',
                        'sl': '*Temperature measured within the rectum(en)'
                      }
                    },
                    {
                      'value': 'at0026',
                      'label': 'Nasopharynx',
                      'localizedLabels': {
                        'en': 'Nasopharynx',
                        'sl': 'Nazofarinks'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured within the nasopharynx',
                        'sl': '*Temperature is measured within the nasopharynx(en)'
                      }
                    },
                    {
                      'value': 'at0027',
                      'label': 'Urinary bladder',
                      'localizedLabels': {
                        'en': 'Urinary bladder',
                        'sl': 'Sečni mehur'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured in the urinary bladder',
                        'sl': '*Temperature is measured in the urinary bladder(en)'
                      }
                    },
                    {
                      'value': 'at0028',
                      'label': 'Intravascular',
                      'localizedLabels': {
                        'en': 'Intravascular',
                        'sl': 'Intravaskularno'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured within the vascular system',
                        'sl': '*Temperature is measured within the vascular system(en)'
                      }
                    },
                    {
                      'value': 'at0043',
                      'label': 'Skin',
                      'localizedLabels': {
                        'en': 'Skin',
                        'sl': 'Na koži'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured from exposed skin',
                        'sl': '*Temperature is measured from exposed skin(en)'
                      }
                    },
                    {
                      'value': 'at0051',
                      'label': 'Vagina',
                      'localizedLabels': {
                        'en': 'Vagina',
                        'sl': 'Vaginalno'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured within the vagina',
                        'sl': '*Temperature is measured within the vagina(en)'
                      }
                    },
                    {
                      'value': 'at0054',
                      'label': 'Oesophagus',
                      'localizedLabels': {
                        'en': 'Oesophagus',
                        'sl': 'V požiralniku'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperatue is measured within the oesophagus',
                        'sl': '*Temperatue is measured within the oesophagus(en)'
                      }
                    },
                    {
                      'value': 'at0055',
                      'label': 'Inguinal skin crease',
                      'localizedLabels': {
                        'en': 'Inguinal skin crease',
                        'sl': 'V ustih'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured in the inguinal skin crease between the leg and abdominal wall',
                        'sl': '*Temperature is measured in the inguinal skin crease between the leg and abdominal wall(en)'
                      }
                    }
                  ]
                }
              ],
              'formId': 'vital_signs/body_temperature/site_of_measurement',
              'viewConfig': {
                'field': {
                  'code': {
                    'presentation': 'combobox'
                  }
                },
                'size': {
                  'field': 'inherit',
                  'label': 'inherit',
                  'fill': 'inherit'
                },
                'layout': {
                  'field': {
                    'valign': 'inherit',
                    'align': 'inherit'
                  }
                }
              }
            }
          ],
          'formId': 'vital_signs/body_temperature',
          'viewConfig': {
            'size': {
              'field': 'inherit',
              'label': 'inherit',
              'fill': 'inherit'
            },
            'layout': {
              'field': {
                'valign': 'inherit',
                'align': 'inherit'
              }
            }
          }
        }
      ]
    };

    let rm = (new ThinkEhrModelParser(rmTypeModelDictionary)).parseFormDescription({}, desc, {}, []) as FormRootModel;

    expect(rm.getChildModels().length).toBe(1);
    let tempF: QuantityFieldModel = rm.findSuccessorsWithPath('vital_signs/body_temperature/any_event/temperature')[0] as QuantityFieldModel;
    expect(tempF).toBeTruthy();
    //tempF.magnitudeValue(37)
    expect(tempF.getMin()).toBe(1);
    expect(tempF.init_min).toBe(1);
    expect(tempF.isInitRequired()).toBe(true);
    expect(tempF.isValueSet()).toBe(false);
    expect(tempF.isRequired()).toBe(true);

    const parentContainer = tempF.getParentModel() as AbstractContainerModel;
    const initReqModels: Model[] = parentContainer.getChildModels().filter((model: FormRepeatableElementModel) => {
      return model.isInitRequired();
    });

    expect(parentContainer.isContainer()).toBe(true);
    expect(parentContainer.isValueSet()).toBe(false);

    expect(initReqModels.length).toBe(1);
    expect(initReqModels[0]).toBe(tempF);

    parentContainer.resetChildrenStructuredValidation();
    expect(tempF.isInitRequired()).toBe(true);
    expect(tempF.isValueSet()).toBe(false);
    expect(tempF.isRequired()).toBe(false);
    expect(tempF.isStructuredRequired()).toBe(false);

    let tempSiblingStressDesc = rm.findSuccessorsWithPath('vital_signs/body_temperature/any_event/description_of_thermal_stress')[0] as TextFieldModel;
    expect(tempSiblingStressDesc.isValueSet()).toBe(false);

    tempSiblingStressDesc.textValue('testValue');

    setTimeout(() => {
      // value change callback gets called with setTimeout()
      expect(tempSiblingStressDesc.isValueSet()).toBe(true);
      expect(tempF.isRequired()).toBe(true);
      expect(tempF.isStructuredRequired()).toBe(true);


      tempSiblingStressDesc.textValue('');
      expect(tempSiblingStressDesc.isValueSet()).toBe(false);

      setTimeout(() => {
        expect(tempSiblingStressDesc.isValueSet()).toBe(false);
        expect(tempF.isRequired()).toBe(false);
        expect(tempF.isStructuredRequired()).toBe(false);

        const deepSiblingQuantField = rm.findSuccessorsWithPath('test_encounter/testing/testing/intervals/quantity/upper')[0] as QuantityFieldModel;
        expect(deepSiblingQuantField).toBeTruthy();
        deepSiblingQuantField.magnitudeValue(77);

        setTimeout(() => {
          expect(tempSiblingStressDesc.isValueSet()).toBe(false);
          const deepSiblingContainer = rm.findSuccessorsWithPath('test_encounter/testing/testing/intervals')[0] as AbstractContainerModel;
          expect(deepSiblingContainer.isValueSet()).toBe(true);
          expect(tempF.min).toBe(1);
          expect(tempF.isRequired()).toBe(true);
          expect(tempF.isStructuredRequired()).toBe(true);
          done();
        }, 10)

      }, 10);

    }, 10);

  });

  it('Container structured validation with required container', function (done) {
    const desc = {
      'formId': 'form_root',
      'name': 'Form root',
      'rmType': 'FORM_DEFINITION',
      'viewConfig': {
        'label': {
          'custom': false,
          'value': '',
          'useLocalizations': false,
          'localizationsList': {}
        },
        'size': {
          'field': 'inherit',
          'label': 'inherit',
          'fill': 'inherit'
        },
        'layout': {
          'valign': 'inherit',
          'align': 'inherit'
        },
        'tags': []
      },
      'templateLanguages': [
        'en',
        'sl'
      ],
      'children': [
        {
          'name': 'Body temperature',
          'localizedName': 'Body temperature',
          'rmType': 'OBSERVATION',
          'nodeId': 'openEHR-EHR-OBSERVATION.body_temperature.v1',
          'min': 0,
          'max': -1,
          'localizedNames': {
            'en': 'Body temperature',
            'sl': 'Telesna temperature'
          },
          'localizedDescriptions': {
            'en': 'A measurement of the body temperature, which is a surrogate for the whole body temperature of the person.',
            'sl': '*A measurement of the body temperature, which is a surrogate for the whole body temperature of the person.(en)'
          },
          'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]',
          'children': [
            {
              'name': 'Any event',
              'localizedName': 'Any event',
              'rmType': 'EVENT',
              'nodeId': 'at0003',
              'min': 0,
              'max': -1,
              'localizedNames': {
                'en': 'Any event',
                'sl': 'Any event'
              },
              'localizedDescriptions': {
                'en': 'Any event',
                'sl': '*Any event(en)'
              },
              'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]',
              'children': [
                {
                  'name': 'Temperature',
                  'localizedName': 'Temperature',
                  'rmType': 'DV_QUANTITY',
                  'nodeId': 'at0004',
                  'min': 1,
                  'max': 1,
                  'localizedNames': {
                    'en': 'Temperature',
                    'sl': 'Telesna temperature'
                  },
                  'localizedDescriptions': {
                    'en': 'The measured body temperature (as a surrogate for the whole body)',
                    'sl': '*The measured body temperature (as a surrogate for the whole body)(en)'
                  },
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value',
                  'inputs': [
                    {
                      'suffix': 'magnitude',
                      'type': 'DECIMAL'
                    },
                    {
                      'suffix': 'unit',
                      'type': 'CODED_TEXT',
                      'list': [
                        {
                          'value': '°C',
                          'label': '°C',
                          'validation': {
                            'precision': {
                              'minOp': '>=',
                              'min': 1,
                              'maxOp': '<=',
                              'max': 1
                            }
                          }
                        },
                        {
                          'value': '°F',
                          'label': '°F',
                          'validation': {
                            'precision': {
                              'minOp': '>=',
                              'min': 1,
                              'maxOp': '<=',
                              'max': 1
                            }
                          }
                        }
                      ]
                    }
                  ],
                  'formId': 'vital_signs/body_temperature/any_event/temperature',
                  'viewConfig': {
                    'field': {
                      'unit': {
                        'presentation': 'combobox'
                      }
                    },
                    'size': {
                      'field': 'inherit',
                      'label': 'inherit',
                      'fill': 'inherit'
                    },
                    'layout': {
                      'field': {
                        'valign': 'inherit',
                        'align': 'inherit'
                      }
                    }
                  }
                },
                {
                  'name': 'Body exposure',
                  'localizedName': 'Body exposure',
                  'rmType': 'DV_CODED_TEXT',
                  'nodeId': 'at0030',
                  'min': 0,
                  'max': 1,
                  'dependsOn': [
                    'temperature'
                  ],
                  'localizedNames': {
                    'en': 'Body exposure',
                    'sl': 'Obleka'
                  },
                  'localizedDescriptions': {
                    'en': 'The thermal situation of the person who is having the temperature taken',
                    'sl': '*The thermal situation of the person who is having the temperature taken(en)'
                  },
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]/state[at0029]/items[at0030]/value',
                  'inputs': [
                    {
                      'suffix': 'code',
                      'type': 'CODED_TEXT',
                      'list': [
                        {
                          'value': 'at0031',
                          'label': 'Naked',
                          'localizedLabels': {
                            'en': 'Naked',
                            'sl': 'Gol'
                          },
                          'localizedDescriptions': {
                            'en': 'No clothing, bedding or covering',
                            'sl': '*No clothing, bedding or covering(en)'
                          }
                        },
                        {
                          'value': 'at0032',
                          'label': 'Reduced clothing/bedding',
                          'localizedLabels': {
                            'en': 'Reduced clothing/bedding',
                            'sl': 'Premalo oblečen (zavit)'
                          },
                          'localizedDescriptions': {
                            'en': 'The person is covered by a lesser amount of clothing or bedding than deemed appropriate for the environmental circumstances',
                            'sl': '*The person is covered by a lesser amount of clothing or bedding than deemed appropriate for the environmental circumstances(en)'
                          }
                        },
                        {
                          'value': 'at0033',
                          'label': 'Appropriate clothing/bedding',
                          'localizedLabels': {
                            'en': 'Appropriate clothing/bedding',
                            'sl': 'Primerno oblečen (zavit)'
                          },
                          'localizedDescriptions': {
                            'en': 'The person is covered by an amount of clothing or bedding deemed appropriate for the environmental circumstances',
                            'sl': '*The person is covered by an amount of clothing or bedding deemed appropriate for the environmental circumstances(en)'
                          }
                        },
                        {
                          'value': 'at0034',
                          'label': 'Increased clothing/bedding',
                          'localizedLabels': {
                            'en': 'Increased clothing/bedding',
                            'sl': 'Preveč oblečen (zavit)'
                          },
                          'localizedDescriptions': {
                            'en': 'The person is covered by an increased amount of clothing or bedding than deemed appropriate for the environmental circumstances',
                            'sl': '*The person is covered by an increased amount of clothing or bedding than deemed appropriate for the environmental circumstances(en)'
                          }
                        }
                      ]
                    }
                  ],
                  'formId': 'vital_signs/body_temperature/any_event/body_exposure',
                  'viewConfig': {
                    'field': {
                      'code': {
                        'presentation': 'combobox'
                      }
                    },
                    'size': {
                      'field': 'inherit',
                      'label': 'inherit',
                      'fill': 'inherit'
                    },
                    'layout': {
                      'field': {
                        'valign': 'inherit',
                        'align': 'inherit'
                      }
                    }
                  }
                },
                {
                  'name': 'Description of thermal stress',
                  'localizedName': 'Description of thermal stress',
                  'rmType': 'DV_TEXT',
                  'nodeId': 'at0041',
                  'min': 0,
                  'max': 1,
                  'dependsOn': [
                    'temperature'
                  ],
                  'localizedNames': {
                    'en': 'Description of thermal stress',
                    'sl': 'Opis'
                  },
                  'localizedDescriptions': {
                    'en': 'Description of the conditions applied to the subject that might influence their measured body temperature.',
                    'sl': '*Description of the conditions applied to the subject that might influence their measured body temperature.(en)'
                  },
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]/state[at0029]/items[at0041]/value',
                  'inputs': [
                    {
                      'type': 'TEXT'
                    }
                  ],
                  'formId': 'vital_signs/body_temperature/any_event/description_of_thermal_stress',
                  'viewConfig': {
                    'size': {
                      'field': 'inherit',
                      'label': 'inherit',
                      'fill': 'inherit'
                    },
                    'layout': {
                      'field': {
                        'valign': 'inherit',
                        'align': 'inherit'
                      }
                    }
                  }
                },

                {
                  'name': 'Intervals',
                  'localizedName': 'Intervals',
                  'rmType': 'CLUSTER',
                  'nodeId': 'at0022',
                  'min': 1,
                  'max': 1,
                  'localizedNames': {
                    'en': 'Intervals'
                  },
                  'localizedDescriptions': {
                    'en': '*'
                  },
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0022]',
                  'children': [
                    {
                      'name': 'Quantity',
                      'localizedName': 'Quantity',
                      'rmType': 'DV_INTERVAL<DV_QUANTITY>',
                      'nodeId': 'at0023',
                      'min': 0,
                      'max': 1,
                      'localizedNames': {
                        'en': 'Quantity'
                      },
                      'localizedDescriptions': {
                        'en': '*'
                      },
                      'aqlPath': '/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0022]/items[at0023]/value',
                      'children': [
                        {
                          'rmType': 'DV_QUANTITY',
                          'nodeId': '',
                          'min': 0,
                          'max': 1,
                          'aqlPath': '/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0022]/items[at0023]/value/upper',
                          'inputs': [
                            {
                              'suffix': 'magnitude',
                              'type': 'DECIMAL',
                              'validation': {
                                'range': {
                                  'minOp': '>=',
                                  'min': 0,
                                  'maxOp': '<=',
                                  'max': 300
                                },
                                'precision': {
                                  'minOp': '>=',
                                  'min': 3,
                                  'maxOp': '<=',
                                  'max': 3
                                }
                              }
                            },
                            {
                              'suffix': 'unit',
                              'type': 'CODED_TEXT',
                              'list': [
                                {
                                  'value': 'kg',
                                  'label': 'kg',
                                  'validation': {
                                    'range': {
                                      'minOp': '>=',
                                      'min': 0,
                                      'maxOp': '<=',
                                      'max': 300
                                    },
                                    'precision': {
                                      'minOp': '>=',
                                      'min': 3,
                                      'maxOp': '<=',
                                      'max': 3
                                    }
                                  }
                                }
                              ],
                              'defaultValue': 'kg'
                            }
                          ],
                          'formId': 'test_encounter/testing/testing/intervals/quantity/upper',
                          'viewConfig': {
                            'field': {
                              'unit': {
                                'presentation': 'combobox'
                              }
                            },
                            'size': {
                              'field': 'inherit',
                              'label': 'inherit',
                              'fill': 'inherit'
                            },
                            'layout': {
                              'field': {
                                'valign': 'inherit',
                                'align': 'inherit'
                              }
                            }
                          }
                        },
                        {
                          'rmType': 'DV_QUANTITY',
                          'nodeId': '',
                          'min': 0,
                          'max': 1,
                          'aqlPath': '/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0022]/items[at0023]/value/lower',
                          'inputs': [
                            {
                              'suffix': 'magnitude',
                              'type': 'DECIMAL',
                              'validation': {
                                'range': {
                                  'minOp': '>=',
                                  'min': 0,
                                  'maxOp': '<=',
                                  'max': 200
                                },
                                'precision': {
                                  'minOp': '>=',
                                  'min': 3,
                                  'maxOp': '<=',
                                  'max': 3
                                }
                              }
                            },
                            {
                              'suffix': 'unit',
                              'type': 'CODED_TEXT',
                              'list': [
                                {
                                  'value': 'kg',
                                  'label': 'kg',
                                  'validation': {
                                    'range': {
                                      'minOp': '>=',
                                      'min': 0,
                                      'maxOp': '<=',
                                      'max': 200
                                    },
                                    'precision': {
                                      'minOp': '>=',
                                      'min': 3,
                                      'maxOp': '<=',
                                      'max': 3
                                    }
                                  }
                                }
                              ],
                              'defaultValue': 'kg'
                            }
                          ],
                          'formId': 'test_encounter/testing/testing/intervals/quantity/lower',
                          'viewConfig': {
                            'field': {
                              'unit': {
                                'presentation': 'combobox'
                              }
                            },
                            'size': {
                              'field': 'inherit',
                              'label': 'inherit',
                              'fill': 'inherit'
                            },
                            'layout': {
                              'field': {
                                'valign': 'inherit',
                                'align': 'inherit'
                              }
                            }
                          }
                        }
                      ],
                      'formId': 'test_encounter/testing/testing/intervals/quantity',
                      'viewConfig': {
                        'size': {
                          'field': 'inherit',
                          'label': 'inherit',
                          'fill': 'inherit'
                        },
                        'layout': {
                          'field': {
                            'valign': 'inherit',
                            'align': 'inherit'
                          }
                        }
                      }
                    }
                  ],
                  'formId': 'test_encounter/testing/testing/intervals',
                  'viewConfig': {
                    'size': {
                      'field': 'inherit',
                      'label': 'inherit',
                      'fill': 'inherit'
                    },
                    'layout': {
                      'field': {
                        'valign': 'inherit',
                        'align': 'inherit'
                      }
                    }
                  }
                }
              ],
              'formId': 'vital_signs/body_temperature/any_event',
              'viewConfig': {
                'size': {
                  'field': 'inherit',
                  'label': 'inherit',
                  'fill': 'inherit'
                },
                'layout': {
                  'field': {
                    'valign': 'inherit',
                    'align': 'inherit'
                  }
                }
              }
            },
            {
              'name': 'Site of measurement',
              'localizedName': 'Site of measurement',
              'rmType': 'DV_CODED_TEXT',
              'nodeId': 'at0021',
              'min': 0,
              'max': 1,
              'dependsOn': [
                'any_event'
              ],
              'localizedNames': {
                'en': 'Site of measurement',
                'sl': 'Stran telesa'
              },
              'localizedDescriptions': {
                'en': 'The anatomical site of measurement of the temperature',
                'sl': '*The anatomical site of measurement of the temperature(en)'
              },
              'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/protocol[at0020]/items[at0021]/value',
              'inputs': [
                {
                  'suffix': 'code',
                  'type': 'CODED_TEXT',
                  'list': [
                    {
                      'value': 'at0022',
                      'label': 'Mouth',
                      'localizedLabels': {
                        'en': 'Mouth',
                        'sl': 'Usta'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured within the mouth',
                        'sl': '*Temperature is measured within the mouth(en)'
                      }
                    },
                    {
                      'value': 'at0023',
                      'label': 'Ear canal',
                      'localizedLabels': {
                        'en': 'Ear canal',
                        'sl': 'V ušesu'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured from within the external auditory canal',
                        'sl': '*Temperature is measured from within the external auditory canal(en)'
                      }
                    },
                    {
                      'value': 'at0024',
                      'label': 'Axilla',
                      'localizedLabels': {
                        'en': 'Axilla',
                        'sl': 'Pod pazduho'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured from the skin of the axilla with the arm positioned down by the side',
                        'sl': '*Temperature is measured from the skin of the axilla with the arm positioned down by the side(en)'
                      }
                    },
                    {
                      'value': 'at0025',
                      'label': 'Rectum',
                      'localizedLabels': {
                        'en': 'Rectum',
                        'sl': 'Rektalno'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature measured within the rectum',
                        'sl': '*Temperature measured within the rectum(en)'
                      }
                    },
                    {
                      'value': 'at0026',
                      'label': 'Nasopharynx',
                      'localizedLabels': {
                        'en': 'Nasopharynx',
                        'sl': 'Nazofarinks'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured within the nasopharynx',
                        'sl': '*Temperature is measured within the nasopharynx(en)'
                      }
                    },
                    {
                      'value': 'at0027',
                      'label': 'Urinary bladder',
                      'localizedLabels': {
                        'en': 'Urinary bladder',
                        'sl': 'Sečni mehur'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured in the urinary bladder',
                        'sl': '*Temperature is measured in the urinary bladder(en)'
                      }
                    },
                    {
                      'value': 'at0028',
                      'label': 'Intravascular',
                      'localizedLabels': {
                        'en': 'Intravascular',
                        'sl': 'Intravaskularno'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured within the vascular system',
                        'sl': '*Temperature is measured within the vascular system(en)'
                      }
                    },
                    {
                      'value': 'at0043',
                      'label': 'Skin',
                      'localizedLabels': {
                        'en': 'Skin',
                        'sl': 'Na koži'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured from exposed skin',
                        'sl': '*Temperature is measured from exposed skin(en)'
                      }
                    },
                    {
                      'value': 'at0051',
                      'label': 'Vagina',
                      'localizedLabels': {
                        'en': 'Vagina',
                        'sl': 'Vaginalno'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured within the vagina',
                        'sl': '*Temperature is measured within the vagina(en)'
                      }
                    },
                    {
                      'value': 'at0054',
                      'label': 'Oesophagus',
                      'localizedLabels': {
                        'en': 'Oesophagus',
                        'sl': 'V požiralniku'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperatue is measured within the oesophagus',
                        'sl': '*Temperatue is measured within the oesophagus(en)'
                      }
                    },
                    {
                      'value': 'at0055',
                      'label': 'Inguinal skin crease',
                      'localizedLabels': {
                        'en': 'Inguinal skin crease',
                        'sl': 'V ustih'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured in the inguinal skin crease between the leg and abdominal wall',
                        'sl': '*Temperature is measured in the inguinal skin crease between the leg and abdominal wall(en)'
                      }
                    }
                  ]
                }
              ],
              'formId': 'vital_signs/body_temperature/site_of_measurement',
              'viewConfig': {
                'field': {
                  'code': {
                    'presentation': 'combobox'
                  }
                },
                'size': {
                  'field': 'inherit',
                  'label': 'inherit',
                  'fill': 'inherit'
                },
                'layout': {
                  'field': {
                    'valign': 'inherit',
                    'align': 'inherit'
                  }
                }
              }
            }
          ],
          'formId': 'vital_signs/body_temperature',
          'viewConfig': {
            'size': {
              'field': 'inherit',
              'label': 'inherit',
              'fill': 'inherit'
            },
            'layout': {
              'field': {
                'valign': 'inherit',
                'align': 'inherit'
              }
            }
          }
        }
      ]
    };

    let rm = (new ThinkEhrModelParser(rmTypeModelDictionary)).parseFormDescription({}, desc, {}, []) as FormRootModel;

    expect(rm.getChildModels().length).toBe(1);
    const deepSiblingContainer = rm.findSuccessorsWithPath('test_encounter/testing/testing/intervals')[0] as AbstractContainerModel;
    let tempF: QuantityFieldModel = rm.findSuccessorsWithPath('vital_signs/body_temperature/any_event/temperature')[0] as QuantityFieldModel;
    expect(tempF).toBeTruthy();
    //tempF.magnitudeValue(37)
    expect(tempF.getMin()).toBe(1);
    expect(tempF.init_min).toBe(1);
    expect(tempF.isInitRequired()).toBe(true);
    expect(tempF.isValueSet()).toBe(false);
    expect(tempF.isRequired()).toBe(true);
    expect(deepSiblingContainer.isValueSet()).toBe(false);
    expect(deepSiblingContainer.isInitRequired()).toBe(true);
    expect(deepSiblingContainer.isValueSet()).toBe(false);
    expect(deepSiblingContainer.isRequired()).toBe(true);

    const parentContainer = tempF.getParentModel() as AbstractContainerModel;
    const initReqModels: Model[] = parentContainer.getChildModels().filter((model: FormRepeatableElementModel) => {
      return model.isInitRequired();
    });

    expect(parentContainer.isContainer()).toBe(true);
    expect(parentContainer.isValueSet()).toBe(false);

    expect(initReqModels.length).toBe(2);
    expect(initReqModels[0]).toBe(tempF);
    expect(initReqModels[1]).toBe(deepSiblingContainer);

    parentContainer.resetChildrenStructuredValidation();
    expect(tempF.isInitRequired()).toBe(true);
    expect(tempF.isValueSet()).toBe(false);
    expect(tempF.isRequired()).toBe(false);
    expect(tempF.isStructuredRequired()).toBe(false);

    expect(deepSiblingContainer.isInitRequired()).toBe(true);
    expect(deepSiblingContainer.isValueSet()).toBe(false);
    expect(deepSiblingContainer.isRequired()).toBe(false);
    expect(deepSiblingContainer.isStructuredRequired()).toBe(false);

    let tempSiblingStressDesc = rm.findSuccessorsWithPath('vital_signs/body_temperature/any_event/description_of_thermal_stress')[0] as TextFieldModel;
    // value change callback gets called with setTimeout()

    expect(tempSiblingStressDesc.isValueSet()).toBe(false);
    expect(tempF.isRequired()).toBe(false);
    expect(tempF.isStructuredRequired()).toBe(false);

    const deepSiblingQuantField = rm.findSuccessorsWithPath('test_encounter/testing/testing/intervals/quantity/upper')[0] as QuantityFieldModel;
    expect(deepSiblingQuantField).toBeTruthy();
    deepSiblingQuantField.magnitudeValue(0);

    setTimeout(() => {
      expect(tempSiblingStressDesc.isValueSet()).toBe(false);
      expect(deepSiblingContainer.isValueSet()).toBe(true);
      expect(tempF.min).toBe(1);
      expect(tempF.isRequired()).toBe(true);
      expect(tempF.isStructuredRequired()).toBe(true);

      expect(deepSiblingContainer.isValueSet()).toBe(true);
      expect(deepSiblingContainer.isStructuredRequired()).toBe(true);
      expect(deepSiblingContainer.min).toBe(1);
      expect(deepSiblingContainer.isRequired()).toBe(true);

      done();
    }, 10)

  });

  it('Container structured validation with required container', function (done) {
    const desc = {
      'formId': 'form_root',
      'name': 'Form root',
      'rmType': 'FORM_DEFINITION',
      'viewConfig': {
        'label': {
          'custom': false,
          'value': '',
          'useLocalizations': false,
          'localizationsList': {}
        },
        'size': {
          'field': 'inherit',
          'label': 'inherit',
          'fill': 'inherit'
        },
        'layout': {
          'valign': 'inherit',
          'align': 'inherit'
        },
        'tags': []
      },
      'templateLanguages': [
        'en',
        'sl'
      ],
      'children': [
        {
          'name': 'Body temperature',
          'localizedName': 'Body temperature',
          'rmType': 'OBSERVATION',
          'nodeId': 'openEHR-EHR-OBSERVATION.body_temperature.v1',
          'min': 0,
          'max': -1,
          'localizedNames': {
            'en': 'Body temperature',
            'sl': 'Telesna temperature'
          },
          'localizedDescriptions': {
            'en': 'A measurement of the body temperature, which is a surrogate for the whole body temperature of the person.',
            'sl': '*A measurement of the body temperature, which is a surrogate for the whole body temperature of the person.(en)'
          },
          'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]',
          'children': [
            {
              'name': 'Any event',
              'localizedName': 'Any event',
              'rmType': 'EVENT',
              'nodeId': 'at0003',
              'min': 0,
              'max': -1,
              'localizedNames': {
                'en': 'Any event',
                'sl': 'Any event'
              },
              'localizedDescriptions': {
                'en': 'Any event',
                'sl': '*Any event(en)'
              },
              'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]',
              'children': [
                {
                  'name': 'Temperature',
                  'localizedName': 'Temperature',
                  'rmType': 'DV_QUANTITY',
                  'nodeId': 'at0004',
                  'min': 1,
                  'max': 1,
                  'localizedNames': {
                    'en': 'Temperature',
                    'sl': 'Telesna temperature'
                  },
                  'localizedDescriptions': {
                    'en': 'The measured body temperature (as a surrogate for the whole body)',
                    'sl': '*The measured body temperature (as a surrogate for the whole body)(en)'
                  },
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]/data[at0001]/items[at0004]/value',
                  'inputs': [
                    {
                      'suffix': 'magnitude',
                      'type': 'DECIMAL'
                    },
                    {
                      'suffix': 'unit',
                      'type': 'CODED_TEXT',
                      'list': [
                        {
                          'value': '°C',
                          'label': '°C',
                          'validation': {
                            'precision': {
                              'minOp': '>=',
                              'min': 1,
                              'maxOp': '<=',
                              'max': 1
                            }
                          }
                        },
                        {
                          'value': '°F',
                          'label': '°F',
                          'validation': {
                            'precision': {
                              'minOp': '>=',
                              'min': 1,
                              'maxOp': '<=',
                              'max': 1
                            }
                          }
                        }
                      ]
                    }
                  ],
                  'formId': 'vital_signs/body_temperature/any_event/temperature',
                  'viewConfig': {
                    'field': {
                      'unit': {
                        'presentation': 'combobox'
                      }
                    },
                    'size': {
                      'field': 'inherit',
                      'label': 'inherit',
                      'fill': 'inherit'
                    },
                    'layout': {
                      'field': {
                        'valign': 'inherit',
                        'align': 'inherit'
                      }
                    }
                  }
                },
                {
                  'name': 'Body exposure',
                  'localizedName': 'Body exposure',
                  'rmType': 'DV_CODED_TEXT',
                  'nodeId': 'at0030',
                  'min': 0,
                  'max': 1,
                  'dependsOn': [
                    'temperature'
                  ],
                  'localizedNames': {
                    'en': 'Body exposure',
                    'sl': 'Obleka'
                  },
                  'localizedDescriptions': {
                    'en': 'The thermal situation of the person who is having the temperature taken',
                    'sl': '*The thermal situation of the person who is having the temperature taken(en)'
                  },
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]/state[at0029]/items[at0030]/value',
                  'inputs': [
                    {
                      'suffix': 'code',
                      'type': 'CODED_TEXT',
                      'list': [
                        {
                          'value': 'at0031',
                          'label': 'Naked',
                          'localizedLabels': {
                            'en': 'Naked',
                            'sl': 'Gol'
                          },
                          'localizedDescriptions': {
                            'en': 'No clothing, bedding or covering',
                            'sl': '*No clothing, bedding or covering(en)'
                          }
                        },
                        {
                          'value': 'at0032',
                          'label': 'Reduced clothing/bedding',
                          'localizedLabels': {
                            'en': 'Reduced clothing/bedding',
                            'sl': 'Premalo oblečen (zavit)'
                          },
                          'localizedDescriptions': {
                            'en': 'The person is covered by a lesser amount of clothing or bedding than deemed appropriate for the environmental circumstances',
                            'sl': '*The person is covered by a lesser amount of clothing or bedding than deemed appropriate for the environmental circumstances(en)'
                          }
                        },
                        {
                          'value': 'at0033',
                          'label': 'Appropriate clothing/bedding',
                          'localizedLabels': {
                            'en': 'Appropriate clothing/bedding',
                            'sl': 'Primerno oblečen (zavit)'
                          },
                          'localizedDescriptions': {
                            'en': 'The person is covered by an amount of clothing or bedding deemed appropriate for the environmental circumstances',
                            'sl': '*The person is covered by an amount of clothing or bedding deemed appropriate for the environmental circumstances(en)'
                          }
                        },
                        {
                          'value': 'at0034',
                          'label': 'Increased clothing/bedding',
                          'localizedLabels': {
                            'en': 'Increased clothing/bedding',
                            'sl': 'Preveč oblečen (zavit)'
                          },
                          'localizedDescriptions': {
                            'en': 'The person is covered by an increased amount of clothing or bedding than deemed appropriate for the environmental circumstances',
                            'sl': '*The person is covered by an increased amount of clothing or bedding than deemed appropriate for the environmental circumstances(en)'
                          }
                        }
                      ]
                    }
                  ],
                  'formId': 'vital_signs/body_temperature/any_event/body_exposure',
                  'viewConfig': {
                    'field': {
                      'code': {
                        'presentation': 'combobox'
                      }
                    },
                    'size': {
                      'field': 'inherit',
                      'label': 'inherit',
                      'fill': 'inherit'
                    },
                    'layout': {
                      'field': {
                        'valign': 'inherit',
                        'align': 'inherit'
                      }
                    }
                  }
                },
                {
                  'name': 'Description of thermal stress',
                  'localizedName': 'Description of thermal stress',
                  'rmType': 'DV_TEXT',
                  'nodeId': 'at0041',
                  'min': 0,
                  'max': 1,
                  'dependsOn': [
                    'temperature'
                  ],
                  'localizedNames': {
                    'en': 'Description of thermal stress',
                    'sl': 'Opis'
                  },
                  'localizedDescriptions': {
                    'en': 'Description of the conditions applied to the subject that might influence their measured body temperature.',
                    'sl': '*Description of the conditions applied to the subject that might influence their measured body temperature.(en)'
                  },
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/data[at0002]/events[at0003]/state[at0029]/items[at0041]/value',
                  'inputs': [
                    {
                      'type': 'TEXT'
                    }
                  ],
                  'formId': 'vital_signs/body_temperature/any_event/description_of_thermal_stress',
                  'viewConfig': {
                    'size': {
                      'field': 'inherit',
                      'label': 'inherit',
                      'fill': 'inherit'
                    },
                    'layout': {
                      'field': {
                        'valign': 'inherit',
                        'align': 'inherit'
                      }
                    }
                  }
                },

                {
                  'name': 'Intervals',
                  'localizedName': 'Intervals',
                  'rmType': 'CLUSTER',
                  'nodeId': 'at0022',
                  'min': 1,
                  'max': 1,
                  'localizedNames': {
                    'en': 'Intervals'
                  },
                  'localizedDescriptions': {
                    'en': '*'
                  },
                  'aqlPath': '/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0022]',
                  'children': [
                    {
                      'name': 'Quantity',
                      'localizedName': 'Quantity',
                      'rmType': 'DV_INTERVAL<DV_QUANTITY>',
                      'nodeId': 'at0023',
                      'min': 0,
                      'max': 1,
                      'localizedNames': {
                        'en': 'Quantity'
                      },
                      'localizedDescriptions': {
                        'en': '*'
                      },
                      'aqlPath': '/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0022]/items[at0023]/value',
                      'children': [
                        {
                          'rmType': 'DV_QUANTITY',
                          'nodeId': '',
                          'min': 0,
                          'max': 1,
                          'aqlPath': '/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0022]/items[at0023]/value/upper',
                          'inputs': [
                            {
                              'suffix': 'magnitude',
                              'type': 'DECIMAL',
                              'validation': {
                                'range': {
                                  'minOp': '>=',
                                  'min': 0,
                                  'maxOp': '<=',
                                  'max': 300
                                },
                                'precision': {
                                  'minOp': '>=',
                                  'min': 3,
                                  'maxOp': '<=',
                                  'max': 3
                                }
                              }
                            },
                            {
                              'suffix': 'unit',
                              'type': 'CODED_TEXT',
                              'list': [
                                {
                                  'value': 'kg',
                                  'label': 'kg',
                                  'validation': {
                                    'range': {
                                      'minOp': '>=',
                                      'min': 0,
                                      'maxOp': '<=',
                                      'max': 300
                                    },
                                    'precision': {
                                      'minOp': '>=',
                                      'min': 3,
                                      'maxOp': '<=',
                                      'max': 3
                                    }
                                  }
                                }
                              ],
                              'defaultValue': 'kg'
                            }
                          ],
                          'formId': 'test_encounter/testing/testing/intervals/quantity/upper',
                          'viewConfig': {
                            'field': {
                              'unit': {
                                'presentation': 'combobox'
                              }
                            },
                            'size': {
                              'field': 'inherit',
                              'label': 'inherit',
                              'fill': 'inherit'
                            },
                            'layout': {
                              'field': {
                                'valign': 'inherit',
                                'align': 'inherit'
                              }
                            }
                          }
                        },
                        {
                          'rmType': 'DV_QUANTITY',
                          'nodeId': '',
                          'min': 0,
                          'max': 1,
                          'aqlPath': '/content[openEHR-EHR-OBSERVATION.testing.v1]/data[at0001]/events[at0002]/data[at0003]/items[openEHR-EHR-CLUSTER.testing.v1]/items[at0022]/items[at0023]/value/lower',
                          'inputs': [
                            {
                              'suffix': 'magnitude',
                              'type': 'DECIMAL',
                              'validation': {
                                'range': {
                                  'minOp': '>=',
                                  'min': 0,
                                  'maxOp': '<=',
                                  'max': 200
                                },
                                'precision': {
                                  'minOp': '>=',
                                  'min': 3,
                                  'maxOp': '<=',
                                  'max': 3
                                }
                              }
                            },
                            {
                              'suffix': 'unit',
                              'type': 'CODED_TEXT',
                              'list': [
                                {
                                  'value': 'kg',
                                  'label': 'kg',
                                  'validation': {
                                    'range': {
                                      'minOp': '>=',
                                      'min': 0,
                                      'maxOp': '<=',
                                      'max': 200
                                    },
                                    'precision': {
                                      'minOp': '>=',
                                      'min': 3,
                                      'maxOp': '<=',
                                      'max': 3
                                    }
                                  }
                                }
                              ],
                              'defaultValue': 'kg'
                            }
                          ],
                          'formId': 'test_encounter/testing/testing/intervals/quantity/lower',
                          'viewConfig': {
                            'field': {
                              'unit': {
                                'presentation': 'combobox'
                              }
                            },
                            'size': {
                              'field': 'inherit',
                              'label': 'inherit',
                              'fill': 'inherit'
                            },
                            'layout': {
                              'field': {
                                'valign': 'inherit',
                                'align': 'inherit'
                              }
                            }
                          }
                        }
                      ],
                      'formId': 'test_encounter/testing/testing/intervals/quantity',
                      'viewConfig': {
                        'size': {
                          'field': 'inherit',
                          'label': 'inherit',
                          'fill': 'inherit'
                        },
                        'layout': {
                          'field': {
                            'valign': 'inherit',
                            'align': 'inherit'
                          }
                        }
                      }
                    }
                  ],
                  'formId': 'test_encounter/testing/testing/intervals',
                  'viewConfig': {
                    'size': {
                      'field': 'inherit',
                      'label': 'inherit',
                      'fill': 'inherit'
                    },
                    'layout': {
                      'field': {
                        'valign': 'inherit',
                        'align': 'inherit'
                      }
                    }
                  }
                }
              ],
              'formId': 'vital_signs/body_temperature/any_event',
              'viewConfig': {
                'size': {
                  'field': 'inherit',
                  'label': 'inherit',
                  'fill': 'inherit'
                },
                'layout': {
                  'field': {
                    'valign': 'inherit',
                    'align': 'inherit'
                  }
                }
              }
            },
            {
              'name': 'Site of measurement',
              'localizedName': 'Site of measurement',
              'rmType': 'DV_CODED_TEXT',
              'nodeId': 'at0021',
              'min': 0,
              'max': 1,
              'dependsOn': [
                'any_event'
              ],
              'localizedNames': {
                'en': 'Site of measurement',
                'sl': 'Stran telesa'
              },
              'localizedDescriptions': {
                'en': 'The anatomical site of measurement of the temperature',
                'sl': '*The anatomical site of measurement of the temperature(en)'
              },
              'aqlPath': '/content[openEHR-EHR-OBSERVATION.body_temperature.v1]/protocol[at0020]/items[at0021]/value',
              'inputs': [
                {
                  'suffix': 'code',
                  'type': 'CODED_TEXT',
                  'list': [
                    {
                      'value': 'at0022',
                      'label': 'Mouth',
                      'localizedLabels': {
                        'en': 'Mouth',
                        'sl': 'Usta'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured within the mouth',
                        'sl': '*Temperature is measured within the mouth(en)'
                      }
                    },
                    {
                      'value': 'at0023',
                      'label': 'Ear canal',
                      'localizedLabels': {
                        'en': 'Ear canal',
                        'sl': 'V ušesu'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured from within the external auditory canal',
                        'sl': '*Temperature is measured from within the external auditory canal(en)'
                      }
                    },
                    {
                      'value': 'at0024',
                      'label': 'Axilla',
                      'localizedLabels': {
                        'en': 'Axilla',
                        'sl': 'Pod pazduho'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured from the skin of the axilla with the arm positioned down by the side',
                        'sl': '*Temperature is measured from the skin of the axilla with the arm positioned down by the side(en)'
                      }
                    },
                    {
                      'value': 'at0025',
                      'label': 'Rectum',
                      'localizedLabels': {
                        'en': 'Rectum',
                        'sl': 'Rektalno'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature measured within the rectum',
                        'sl': '*Temperature measured within the rectum(en)'
                      }
                    },
                    {
                      'value': 'at0026',
                      'label': 'Nasopharynx',
                      'localizedLabels': {
                        'en': 'Nasopharynx',
                        'sl': 'Nazofarinks'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured within the nasopharynx',
                        'sl': '*Temperature is measured within the nasopharynx(en)'
                      }
                    },
                    {
                      'value': 'at0027',
                      'label': 'Urinary bladder',
                      'localizedLabels': {
                        'en': 'Urinary bladder',
                        'sl': 'Sečni mehur'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured in the urinary bladder',
                        'sl': '*Temperature is measured in the urinary bladder(en)'
                      }
                    },
                    {
                      'value': 'at0028',
                      'label': 'Intravascular',
                      'localizedLabels': {
                        'en': 'Intravascular',
                        'sl': 'Intravaskularno'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured within the vascular system',
                        'sl': '*Temperature is measured within the vascular system(en)'
                      }
                    },
                    {
                      'value': 'at0043',
                      'label': 'Skin',
                      'localizedLabels': {
                        'en': 'Skin',
                        'sl': 'Na koži'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured from exposed skin',
                        'sl': '*Temperature is measured from exposed skin(en)'
                      }
                    },
                    {
                      'value': 'at0051',
                      'label': 'Vagina',
                      'localizedLabels': {
                        'en': 'Vagina',
                        'sl': 'Vaginalno'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured within the vagina',
                        'sl': '*Temperature is measured within the vagina(en)'
                      }
                    },
                    {
                      'value': 'at0054',
                      'label': 'Oesophagus',
                      'localizedLabels': {
                        'en': 'Oesophagus',
                        'sl': 'V požiralniku'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperatue is measured within the oesophagus',
                        'sl': '*Temperatue is measured within the oesophagus(en)'
                      }
                    },
                    {
                      'value': 'at0055',
                      'label': 'Inguinal skin crease',
                      'localizedLabels': {
                        'en': 'Inguinal skin crease',
                        'sl': 'V ustih'
                      },
                      'localizedDescriptions': {
                        'en': 'Temperature is measured in the inguinal skin crease between the leg and abdominal wall',
                        'sl': '*Temperature is measured in the inguinal skin crease between the leg and abdominal wall(en)'
                      }
                    }
                  ]
                }
              ],
              'formId': 'vital_signs/body_temperature/site_of_measurement',
              'viewConfig': {
                'field': {
                  'code': {
                    'presentation': 'combobox'
                  }
                },
                'size': {
                  'field': 'inherit',
                  'label': 'inherit',
                  'fill': 'inherit'
                },
                'layout': {
                  'field': {
                    'valign': 'inherit',
                    'align': 'inherit'
                  }
                }
              }
            }
          ],
          'formId': 'vital_signs/body_temperature',
          'viewConfig': {
            'size': {
              'field': 'inherit',
              'label': 'inherit',
              'fill': 'inherit'
            },
            'layout': {
              'field': {
                'valign': 'inherit',
                'align': 'inherit'
              }
            }
          }
        }
      ]
    };

    let rm = (new ThinkEhrModelParser(rmTypeModelDictionary)).parseFormDescription({}, desc, {}, []) as FormRootModel;

    expect(rm.getChildModels().length).toBe(1);
    const deepSiblingContainer = rm.findSuccessorsWithPath('test_encounter/testing/testing/intervals')[0] as AbstractContainerModel;
    let tempF: QuantityFieldModel = rm.findSuccessorsWithPath('vital_signs/body_temperature/any_event/temperature')[0] as QuantityFieldModel;
    expect(tempF).toBeTruthy();
    //tempF.magnitudeValue(37)
    expect(tempF.getMin()).toBe(1);
    expect(tempF.init_min).toBe(1);
    expect(tempF.isInitRequired()).toBe(true);
    expect(tempF.isValueSet()).toBe(false);
    expect(tempF.isRequired()).toBe(true);
    expect(deepSiblingContainer.isValueSet()).toBe(false);
    expect(deepSiblingContainer.isInitRequired()).toBe(true);
    expect(deepSiblingContainer.isValueSet()).toBe(false);
    expect(deepSiblingContainer.isRequired()).toBe(true);

    const parentContainer = tempF.getParentModel() as AbstractContainerModel;
    const initReqModels: Model[] = parentContainer.getChildModels().filter((model: FormRepeatableElementModel) => {
      return model.isInitRequired();
    });

    expect(parentContainer.isContainer()).toBe(true);
    expect(parentContainer.isValueSet()).toBe(false);

    expect(initReqModels.length).toBe(2);
    expect(initReqModels[0]).toBe(tempF);
    expect(initReqModels[1]).toBe(deepSiblingContainer);

    parentContainer.getRootModel().resetStructuredValidation();
    expect(tempF.isInitRequired()).toBe(true);
    expect(tempF.isValueSet()).toBe(false);
    expect(tempF.isRequired()).toBe(false);
    expect(tempF.isStructuredRequired()).toBe(false);

    expect(deepSiblingContainer.isInitRequired()).toBe(true);
    expect(deepSiblingContainer.isValueSet()).toBe(false);
    expect(deepSiblingContainer.isRequired()).toBe(false);
    expect(deepSiblingContainer.isStructuredRequired()).toBe(false);

    let tempSiblingStressDesc = rm.findSuccessorsWithPath('vital_signs/body_temperature/any_event/description_of_thermal_stress')[0] as TextFieldModel;
    // value change callback gets called with setTimeout()

    expect(tempSiblingStressDesc.isValueSet()).toBe(false);
    expect(tempF.isRequired()).toBe(false);
    expect(tempF.isStructuredRequired()).toBe(false);

    const deepSiblingQuantField = rm.findSuccessorsWithPath('test_encounter/testing/testing/intervals/quantity/upper')[0] as QuantityFieldModel;
    expect(deepSiblingQuantField).toBeTruthy();
    tempSiblingStressDesc.textValue('filled some value');

    setTimeout(() => {
      expect(tempSiblingStressDesc.isValueSet()).toBe(true);
      expect(deepSiblingContainer.isValueSet()).toBe(false);
      expect(tempF.min).toBe(1);
      expect(tempF.isRequired()).toBe(true);
      expect(tempF.isStructuredRequired()).toBe(true);

      expect(deepSiblingContainer.isStructuredRequired()).toBe(true);
      expect(deepSiblingContainer.min).toBe(1);
      expect(deepSiblingContainer.isRequired()).toBe(true);

      done();
    }, 10)

  });
});

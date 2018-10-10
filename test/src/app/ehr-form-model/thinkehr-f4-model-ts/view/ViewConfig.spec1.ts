import {FieldSize} from './FieldSize';
import {ViewConfigParser} from '../parsing/ViewConfigParser';
import {ViewConfig} from './ViewConfig';
import {LabelSize} from './LabelSize';
import {FormRootModel} from '../model/FormRootModel';
import {Layout} from './Layout';
import {NodeModel} from '../model/NodeModel';
import {FieldHorizontalAlignment} from './FieldHorizontalAlignment';
import {FieldVerticalAlignment} from './FieldVerticalAlignment';
import {LabelHorizontalAlignment} from './LabelHorizontalAlignment';
import {LabelVerticalAlignment} from './LabelVerticalAlignment';
import {Label} from './Label';
import {Field} from './Field';
import {FieldPresentation} from './FieldPresentation';
import {ThinkEhrUtil} from '../ThinkEhrUtil';

describe('ViewConfig Parsing Test Suite', () => {
  // let builder: TestComponentBuilder;

  it('ViewConfig Build - Size', function () {
    let vcPlain1 = {
      'size': {
        'field': 'large',
        'label': 'inherit'
      }
    };
    let vc1: ViewConfig = (new ViewConfigParser() ).parseViewConfig(vcPlain1);
    expect(vc1 instanceof ViewConfig).toBeTruthy();

    expect(vc1.getSize().getField()).toBe(FieldSize.LARGE);
    expect(vc1.getSize().getLabel()).toBe(LabelSize.INHERIT);

    let vcPlain2 = {
      'size': {
        'field': 'inherit'
      }
    };
    let vc2: ViewConfig = (new ViewConfigParser() ).parseViewConfig(vcPlain2);
    expect(vc2 instanceof ViewConfig).toBeTruthy();
    expect(vc2.getSize().getField()).toBe(FieldSize.INHERIT);
    expect(vc2.getSize().getLabel()).toBeUndefined();

    let vcPlain3 = {
      'size': {
        'field': 'medium',
        'label': '3',
        'customProperty': 'customValue'
      },

      'outsideProp': 'outside'
    };
    let vc3: ViewConfig = (new ViewConfigParser() ).parseViewConfig(vcPlain3);
    expect(vc3 instanceof ViewConfig).toBeTruthy();
    expect(vc3.getSize().getField()).toBe(FieldSize.MEDIUM);
    expect(!isNaN(vc3.getSize().getLabel())).toBeFalsy();
    expect(vc3.getSize().getLabel()).toBe(LabelSize[LabelSize.COLUMN_3]);
    expect(vc3.getSize()['customProperty']).toBe('customValue');
    expect(vc3['outsideProp']).toBe('outside');
  });

  it('ViewConfig Build - Layout', function () {
    let vcPlain1 = {
      'layout': {
        'field': {
          'align': 'Left',
          'valign': 'Middle'
        },
        'label': {
          'align': 'Top',
          'valign': 'Bottom'
        }
      }
    };
    let vc1 = (new ViewConfigParser() ).parseViewConfig(vcPlain1);
    let fm1 = new FormRootModel({viewConfig: vc1, name: '1'});
    ///vc1.setModel(fm1);
    expect(vc1 instanceof ViewConfig).toBeTruthy();
    expect(vc1.getLayout() instanceof Layout).toBeTruthy();
    expect(fm1.getViewConfig() instanceof ViewConfig).toBeTruthy();

    let vcPlain2 = {
      'layout': {
        'field': {
          'align': 'Inherit',
          'valign': 'Inherit'
        },
        'label': {
          'align': 'Inherit',
          'valign': 'Middle'
        }
      }
    };

    let vc2 = (new ViewConfigParser() ).parseViewConfig(vcPlain2);
    let fm2 = new NodeModel({viewConfig: vc2, name: '2'}, new ViewConfigParser());
    ///vc2.setModel(fm2);
    fm1.addChildModel(fm2);

    let vcPlain3 = {
      'layout': {

        'label': {
          'align': 'Right',
          'valign': 'Custom',
          'something': 'a'
        }
      }
    };

    let vc3 = (new ViewConfigParser() ).parseViewConfig(vcPlain3);
    let fm3 = new NodeModel({viewConfig: vc3, name: '3'}, new ViewConfigParser());
    ///vc3.setModel(fm3);
    fm2.addChildModel(fm3);

    expect(vc3.getLayout().getFieldHorizontalAlignment()).toBe(FieldHorizontalAlignment.LEFT);
    expect(vc3.getLayout().getFieldVerticalAlignment()).toBe(FieldVerticalAlignment.MIDDLE);
    expect(vc3.getLayout().getLabelHorizontalAlignment()).toBe(LabelHorizontalAlignment.RIGHT);
    expect(vc3.getLayout().getLabelVerticalAlignment()).toBe(LabelVerticalAlignment.CUSTOM);
    expect(vc3.getLayout()['label'].something).toBe('a');
    expect(vc3.getLayout(false).getFieldHorizontalAlignment(false)).toBeUndefined();
    expect(vc3.getLayout(false).getFieldVerticalAlignment(false)).toBeUndefined();
    expect(vc3.getLayout(false).getLabelHorizontalAlignment(false)).toBe(LabelHorizontalAlignment.RIGHT);
    expect(vc3.getLayout(false).getLabelVerticalAlignment(false)).toBe(LabelVerticalAlignment.CUSTOM);
    expect(vc3.getLayout(false)['label'].something).toBe('a');

    expect(vc2.getLayout().getFieldHorizontalAlignment()).toBe(FieldHorizontalAlignment.LEFT);
    expect(vc2.getLayout().getFieldVerticalAlignment()).toBe(FieldVerticalAlignment.MIDDLE);
    expect(vc2.getLayout().getLabelHorizontalAlignment()).toBe(LabelHorizontalAlignment.TOP);
    expect(vc2.getLayout().getLabelVerticalAlignment()).toBe(LabelVerticalAlignment.MIDDLE);
    expect(vc2.getLayout(false).getFieldHorizontalAlignment(false)).toBe(FieldHorizontalAlignment.INHERIT);
    expect(vc2.getLayout(false).getFieldVerticalAlignment(false)).toBe(FieldVerticalAlignment.INHERIT);
    expect(vc2.getLayout(false).getLabelHorizontalAlignment(false)).toBe(LabelHorizontalAlignment.INHERIT);
    expect(vc2.getLayout(false).getLabelVerticalAlignment(false)).toBe(LabelVerticalAlignment.MIDDLE);

    expect(vc1.getLayout().getFieldHorizontalAlignment()).toBe(FieldHorizontalAlignment.LEFT);
    expect(vc1.getLayout().getFieldVerticalAlignment()).toBe(FieldVerticalAlignment.MIDDLE);
    expect(vc1.getLayout().getLabelHorizontalAlignment()).toBe(LabelHorizontalAlignment.TOP);
    expect(vc1.getLayout().getLabelVerticalAlignment()).toBe(LabelVerticalAlignment.BOTTOM);
    expect(vc1.getLayout(false).getFieldHorizontalAlignment(false)).toBe(FieldHorizontalAlignment.LEFT);
    expect(vc1.getLayout(false).getFieldVerticalAlignment(false)).toBe(FieldVerticalAlignment.MIDDLE);
    expect(vc1.getLayout(false).getLabelHorizontalAlignment(false)).toBe(LabelHorizontalAlignment.TOP);
    expect(vc1.getLayout(false).getLabelVerticalAlignment(false)).toBe(LabelVerticalAlignment.BOTTOM);
  });

  it('ViewConfig Build - Label', function () {
    let vcPlain1 = {
      'label': {
        'custom': true,
        'value': 'Vitals',
        'useLocalizations': true,
        'localizationsList': {
          'sl': 'Dogodek',
          'en': 'Encounter'
        }
      }
    };
    let vc1 = (new ViewConfigParser() ).parseViewConfig(vcPlain1);
    expect(vc1 instanceof ViewConfig).toBeTruthy();
    let label = vc1.getLabel();
    expect(label instanceof Label).toBeTruthy();
    expect(label.isCustom()).toBeTruthy();
    expect(label.getValue()).toBe('Vitals');
    expect(label.isUseLocalizations()).toBeTruthy();
    expect(label.getLocalization('sl')).toBe('Dogodek');
    expect(label.getLocalization('en')).toBe('Encounter');
    expect(label.getLocalization('ro')).toBeNull();


    let vcPlain2 = {
      'label': {
        'custom': false,
        'value': '',
        'useLocalizations': false,
        'localizationsList': {},
        'someCustomProp': 29
      }
    };
    let vc2 = (new ViewConfigParser() ).parseViewConfig(vcPlain2);
    expect(vc2 instanceof ViewConfig).toBeTruthy();
    let label2 = vc2.getLabel();
    expect(label2 instanceof Label).toBeTruthy();
    expect(label2.isCustom()).toBeFalsy();
    expect(label2.getValue()).toBe('');
    expect(label2.isUseLocalizations()).toBeFalsy();
    expect(label2.getLocalization('sl')).toBeNull();
    expect(label2.getLocalization('en')).toBeNull();
    expect(label2.getLocalization('ro')).toBeNull();
    expect(label2['someCustomProp']).toBe(29);
  });

  it('ViewConfig Build - Field', function () {
    let vcPlain1 = {
      'field': {
        'input': {
          'presentation': 'combobox',
          'columns': '3',
          'lines': '4'
        }
      }
    };

    let vc1 = (new ViewConfigParser() ).parseViewConfig(vcPlain1);
    expect(vc1 instanceof ViewConfig).toBeTruthy();
    expect(vc1.getFields() instanceof Field).toBeTruthy();
    expect(vc1.getFields().getPresentation()).toBe(FieldPresentation.COMBOBOX);
    expect(vc1.getFields().getColumns()).toBe(3);
    expect(vc1.getFields().getLines()).toBe(4);
  });

  it('ViewConfig Build - Advanced', function () {
    let vcPlain1 = {
      'advanced': {
        'hidden': true,
        'readonly': false,
        'customProp': 'B'
      }
    };

    let vc1 = (new ViewConfigParser() ).parseViewConfig(vcPlain1);
    expect(vc1 instanceof ViewConfig).toBeTruthy();
    expect(vc1.isHidden()).toBeTruthy();
    expect(vc1.isReadOnly()).toBeFalsy();
    expect(vc1['advanced'].customProp).toBe('B');
  });

  it('ViewConfig Build - Multiplicity', function () {
    let vcPlain1 = {
      'multiplicity': {
        'min': '0',
        'max': '1',
        'custom': 'c'
      }
    };

    let vc1 = (new ViewConfigParser() ).parseViewConfig(vcPlain1);
    expect(vc1 instanceof ViewConfig).toBeTruthy();
    expect(vc1.getMin()).toBe(0);
    expect(vc1.getMax()).toBe(1);
    expect(vc1['multiplicity'].custom).toBe('c');

    let vcPlain01 = {
      'multiplicity': {
        'min': 1
      }
    };

    let vc01 = (new ViewConfigParser() ).parseViewConfig(vcPlain01);
    let fm01 = new NodeModel({viewConfig: vcPlain01, name: '1', min: 5, max: 9}, new ViewConfigParser());
    vc01.setModel(fm01);
    expect(vc01 instanceof ViewConfig).toBeTruthy();
    expect(vc01.getMin()).toBe(1);
    expect(vc01.getMax()).toBe(9);
    expect(vc01['multiplicity']).toBeUndefined();
  });

  it('View Config Build - Tags', function () {
    let vcPlain = {
      'advanced': {
        'hidden': false,
        'readonly': false
      },
      'size': {
        'field': 'inherit',
        'label': 'inherit'
      },
      'layout': {
        'label': {
          'valign': 'inherit',
          'align': 'inherit'
        },
        'field': {
          'valign': 'inherit',
          'align': 'inherit'
        }
      },
      'tags': [
        '2 col',
        'multi',
        'custom'
      ],
      'datasource': {
        'loadRemote': false,
        'loadRemoteUrl': ''
      },
      'annotations': {
        'display_ordinal': 'true',
        'lines': '1'
      },
      'field': {
        'presentation': 'combobox',
        'columns': '4'
      }
    };

    let vc1 = (new ViewConfigParser() ).parseViewConfig(vcPlain);
    expect(vc1 instanceof ViewConfig).toBeTruthy();
    expect(vc1.getTags().length).toBe(3);
    expect(vc1.hasTag('2 col')).toBeTruthy();
    expect(vc1.hasTag('multi')).toBeTruthy();
    expect(vc1.hasTag('MULTI')).toBeFalsy();
    expect(vc1.hasTag('custom')).toBeTruthy();
    expect(vc1.hasTag('lodl')).toBeFalsy();

  });

  it('View Config Build - Annotations', function () {
    let vcPlain = {
      'advanced': {
        'hidden': false,
        'readonly': false
      },
      'size': {
        'field': 'inherit',
        'label': 'inherit'
      },
      'layout': {
        'label': {
          'valign': 'inherit',
          'align': 'inherit'
        },
        'field': {
          'valign': 'inherit',
          'align': 'inherit'
        }
      },
      'tags': [
        '2 col',
        'multi',
        'custom'
      ],
      'datasource': {
        'loadRemote': false,
        'loadRemoteUrl': ''
      },
      'annotations': {
        'display_ordinal': 'true',
        'lines': '1'
      },
      'field': {
        'presentation': 'combobox',
        'columns': '4'
      }
    };

    let vc1 = (new ViewConfigParser() ).parseViewConfig(vcPlain);
    expect(vc1 instanceof ViewConfig).toBeTruthy();
    expect(ThinkEhrUtil.isObject(vc1.getAnnotations())).toBeTruthy();
    expect(vc1.hasAnnotation('display_ordinal')).toBeTruthy();
    expect(vc1.hasAnnotation('Display_ordinal')).toBeFalsy();
    expect(vc1.hasAnnotation('lines')).toBeTruthy();
    expect(vc1.annotationValue('display_ordinal')).toBe('true');
    expect(vc1.annotationValue('lines')).toBe('1');
    expect(vc1.annotationValue('ABC')).toBeUndefined();
    expect(vc1.annotationValue('Display_ordinal')).toBeUndefined();
  });


});


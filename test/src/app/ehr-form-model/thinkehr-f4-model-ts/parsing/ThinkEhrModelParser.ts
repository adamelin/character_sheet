import {RmType} from '../RmType';
import {ThinkEhrUtil} from '../ThinkEhrUtil';
import {Model} from '../model/Model';
import {FormObjectModel} from '../model/FormObjectModel';
import {ViewConfig} from '../view/ViewConfig';
import {ViewConfigParser} from './ViewConfigParser';
import {EhrContext} from '../EhrContext';
import {FormRootModel} from '../model/FormRootModel';
import {NodeModel} from '../model/NodeModel';
import {RmContainerModel} from '../model/RmContainerModel';
import {FormRepeatableElementModel} from '../model/FormRepeatableElementModel';
import {CustomModel} from '../model/fieldModel/CustomModel';
import {RmTypeModelValueGetter} from '../model/RmTypeModelValueGetter';
import {ThinkEhrInputParser} from './ThinkEhrInputParser';
import {GenericButtonModel} from '../model/GenericButtonModel';
import {AbstractContainerModel} from '../model/AbstractContainerModel';

export class ThinkEhrModelParser {

  //private static _instance: ThinkEhrModelParser;

  /*static getInstance(): ThinkEhrModelParser {
    if (!ThinkEhrModelParser._instance) {
      ThinkEhrModelParser._instance = new ThinkEhrModelParser(rmTypeModelDictionary);
    }
    return ThinkEhrModelParser._instance;
  }*/

  private _viewConfigParser = new ViewConfigParser();
  /*private _rmTypeToModelMap: Object = {
    [RmType.FORM_DEFINITION]: FormRootModel,
    [RmType.GENERIC_FIELDSET]: GenericFieldsetModel,
    [RmType.DV_QUANTITY]: QuantityFieldModel,
    [RmType.DV_CODED_TEXT]: CodedTextFieldModel,
    [RmType.DV_TEXT]: TextFieldModel,
    [RmType.DV_PROPORTION]: ProportionFieldModel,
    [RmType.DV_MULTIMEDIA]: MultimediaFieldModel,
    [RmType.DV_BOOLEAN]: BooleanFieldModel,
    [RmType.DV_DATE]: DateFieldModel,
    [RmType.DV_TIME]: TimeFieldModel,
    [RmType.DV_DATE_TIME]: DateTimeFieldModel,
    [RmType.DV_ORDINAL]: OrdinalFieldModel,
    [RmType.DV_COUNT]: CountFieldModel,
    [RmType.DV_DURATION]: DurationFieldModel,
    [RmType.DV_URI]: UriFieldModel,
    [RmType.DV_EHR_URI]: EhrUriFieldModel,
    [RmType.DV_IDENTIFIER]: IdentifierFieldModel
  };*/
  private _rmTypeToModelMap: any;

  constructor(rmTypeModelDict?: any) {
    this._rmTypeToModelMap = rmTypeModelDict;
  }

  parseFormDescription(context, formDescription, values, dependencies?: any): FormObjectModel {
    var rootRmType: any = RmType[formDescription.rmType];
    if (rootRmType !== RmType.FORM_DEFINITION) {
      throw new Error('Root element is not form definition'); // Using this syntax cause of Jasmine
    }
    var rootObj: FormRootModel = new FormRootModel(formDescription, this._viewConfigParser);
    /*///rootObj.setDescEl(formDescription);
     if (rootObj.children !== undefined) {
     delete  rootObj.children;
     }*/
    if (context) {
      rootObj.setContext(context);
    }
    this._parseViewConfig(rootObj, formDescription);

    if (formDescription.children) {
      for (var i = 0; i < formDescription.children.length; i++) {
        this._recursivelyParseDescription(rootObj, formDescription.children[i], null);
      }
    }
    if (!values) {
      values = {};
    }
    rootObj.setValueNodeRef(values);
    this._parseValues(rootObj, values, values);

    /*if (dependencies) {
      var ast = ThinkEhrDependencyParser.getInstance().parseDependencies(rootObj, dependencies);
      rootObj.setDependencyNode(ast);
    }*/
    this.recursivelySetDefaultValues(rootObj);
    return rootObj;
  }

  parseFormDescriptionSnippet(snippet: Object, values: Object, context?: EhrContext): FormRepeatableElementModel {
    var model: FormRepeatableElementModel = this._recursivelyParseDescription(null, snippet, context);

    if (model) {
      if (!values) {
        values = {};
      }

      this._parseValues(model, values, values);

    }
    this.recursivelySetDefaultValues(model);

    return model;
  }

  private recursivelySetDefaultValues(model: Model) {
    model.getChildModels().forEach((m: NodeModel) => {
      try {
        RmTypeModelValueGetter.getValue(m, undefined);
      } catch (e) {
      }
      this.recursivelySetDefaultValues(m);
    });
  }

  private _recursivelyParseDescription(parentModel: FormObjectModel, descEl: Object, context: EhrContext) {
    var model: FormRepeatableElementModel = this._parseRmClassCreateObj(descEl);
    if (context && model) {
      model.setContext(context);
    }

    var parseChildren = (model, descEl) => {
      if (descEl.children) {
        for (var i = 0; i < descEl.children.length; i++) {
          //TODO should context be passed??
          this._recursivelyParseDescription(model, descEl.children[i], null);
        }
      }
    };

    if (model != null) {
      this._parseViewConfig(model, descEl);
      var isCustomFnCustomComponent: boolean = model.isCustomFunctionCustomComponent();
      if (parentModel && !isCustomFnCustomComponent) {
        parentModel.insertChildModelAfterLastOfSamePath(model, true);
      }
      const thinkEhrInputParser = new ThinkEhrInputParser();
      thinkEhrInputParser._parseInputs(model, descEl);
      this._checkMinAndMax(model); // Goddamn it why can't this be consistently an integer?
      if (!isCustomFnCustomComponent) {
        parseChildren.call(this, model, descEl);
      }

      if (isCustomFnCustomComponent) {
        model = this._createCustomModel(model, descEl);
        if (parentModel) {
          parentModel.insertChildModelAfterLastOfSamePath(model, true);
        }
        parseChildren(model, descEl);
      }

    } else {
      var custFnStr = this._getAnnotation(descEl, 'function');
      var hasCustomTag = this._hasTag(descEl, 'custom');
      if (this.isCustomFunctionCustomComponent(custFnStr, hasCustomTag)) {
        model = this._createCustomModel(null, descEl);
        console.warn('Creating custom model without backing model, just descriptin for ', model.getPath());
      } else {
        console.warn('Skipping model creation for element: ', descEl);
      }
    }

    return model;
  }

  _hasTag(descEl, tag) {
    return descEl.viewConfig && descEl.viewConfig.tags && descEl.viewConfig.tags.indexOf(tag) >= 0;
  }

  _getAnnotation(descEl, annotation) {
    if (descEl.viewConfig && descEl.viewConfig.annotations && descEl.viewConfig.annotations[annotation] != undefined) {
      return descEl.viewConfig.annotations[annotation];
    } else {
      return null;
    }
  }

  _checkMinAndMax(model) {
    if (model.min !== undefined && model.min !== null && !ThinkEhrUtil.isInteger(model.min)) {
      model.min = model.setMin(parseInt(model.min));
    }

    if (model.max !== undefined && model.max !== null && !ThinkEhrUtil.isInteger(model.max)) {
      model.max = model.setMax(parseInt(model.max));
    }
  }

  private _parseRmClassCreateObj(descEl: Object): RmContainerModel {
    var rmType: any = null;
    var descRmType: any = RmType[descEl['rmType']];
    var cl: Function = this.getComponentTypeClassRef(descRmType as RmType);

    var isGenericField: boolean = false;
    if (!cl) {
      if (this._isContainerDesc(descEl)) {
        cl = RmContainerModel;
        rmType = RmType[descEl['rmType']];
      } else if (this._getGenericDescFieldClass(descEl)) {
        cl = this._getGenericDescFieldClass(descEl);
        isGenericField = true;
      } else {
        console.warn('Unknown rmType: ', descEl['rmType'], ' skipping model creation');
        return null;
      }
    } else {
      rmType = null;
    }
    var obj: RmContainerModel = this.instantiateModelFromObject<RmContainerModel>(cl, descEl);
    // TODO use just one instance of ViewConfigParser
    obj.setDescEl(descEl, this._viewConfigParser);
    if (rmType != null) {
      obj.setRmType(rmType);
    }

    obj.setIsGenericField(isGenericField);
    return obj;
  }

  private instantiateModelFromObject<T>(fn: any, formDescriptionSnippet: Object): T {
    return new fn(formDescriptionSnippet, this._viewConfigParser) as T;
  }

  private getComponentTypeClassRef(rmType: RmType): Function {
    return this._rmTypeToModelMap[rmType];
  }

  private _createCustomModel(delegateModel: FormObjectModel, descEl: Object): CustomModel {

    var haveDelegate = delegateModel != null;
    var model: CustomModel = new CustomModel();
    model.isGenericField = delegateModel.isGenericField;
    model.setDelegateModel(haveDelegate ? delegateModel : descEl);
    model.setViewConfig(this._viewConfigParser.parseViewConfig({model: model}));

    var func;
    if (haveDelegate) {
      func = delegateModel.getCustomFunction(); //delegateModel.annotationValue("function");
    } else {
      func = descEl['getCustomFunction'] ? descEl['getCustomFunction']() : this._getAnnotation(descEl, 'function');
    }
    if (!func) {
      console.error('No initialization function specified for custom component ' + model.getPath());
    }

    model.setCustomFunction(func);

    return model;
  }

  _getGenericDescFieldClass(descEl): Function {
    var descRmType: any = RmType[descEl.rmType];
    if (descRmType === RmType.GENERIC_BUTTON) {
      return GenericButtonModel;
    }
    return descRmType === RmType.GENERIC_FIELD && descEl.viewConfig && descEl.viewConfig.field && descEl.viewConfig.field.type ? this._rmTypeToModelMap[RmType[descEl.viewConfig.field.type]] : null;
  }

  _isContainerDesc(descEl: Object): boolean {
    return descEl['children'] !== undefined && ThinkEhrUtil.isArray(descEl['children']) && descEl['rmType'];
  }

  _parseViewConfig(model: FormObjectModel, descEl: Object) {
    var vc;
    if (descEl['viewConfig']) {
      vc = this._viewConfigParser.parseViewConfig(descEl['viewConfig']);
    } else {
      vc = new ViewConfig();
    }
    model.setViewConfig(vc);
    vc.setModel(model);

    return vc;
  }


  _parseValues(model: Object, values: Object, rootValues: Object, skipDefaultValue?: boolean): void {
    var models = [];
    this._getModelsRecursively(model, models);
    for (var i = 0; i < models.length; i++) {
      var m = models[i];
      var path = m.getPath();
      if (path != null && m.isAttachableToValueNode() && m.getRmType() !== RmType.FORM_DEFINITION) {
        var segments = path.split('/');
        if (!m.getIsGenericField()) {
          this._attachValueToModels(m, segments, 0, values, rootValues, skipDefaultValue);
        }
      }
    }
  }


  recursivelyForChildModels(model, func) {
    for (var i = 0; i < model.getChildCount(); i++) {
      var childModel = model.getChildModel(i);
      func(childModel);
      this.recursivelyForChildModels(childModel, func);
    }
  }

  _getPathChildIndex(model) {
    if (model.getParentModel() && model.getPath()) {
      var allChildrenWithPath = model.getParentModel().findChildrenWithPath(model.getPath());
      return allChildrenWithPath.indexOf(model);
    }

    return -1;
  }

  _markModelForDeletion(model) {
    model.__markedForDeletion = true;
    this.recursivelyForChildModels(model, (childModel) => {
      childModel.__markedForDeletion = true;
    });
    model.removeFromParent();
  }


  _attachValueToModels(model, segments, segmentIndex, values, rootValues, skipDefaultValue?: boolean) {
    if (!values || segmentIndex >= segments.length || model.__markedForDeletion === true) {
      return;
    }

    var segment = segments[segmentIndex];

    var lastSegment = segments.length === segmentIndex + 1;
    var segmentPath = this._segmentsToPath(segments, segmentIndex);

    var addedSegment = false;
    var pathChildIndex = -1;
    if (values[segment] === undefined) {
      pathChildIndex = this._getPathChildIndex(model);
      if (pathChildIndex > 0) {
        this._markModelForDeletion(model);
      } else {
        values[segment] = values === rootValues ? {} : [];
        addedSegment = true;
      }
    }

    if (values[segment] !== undefined) {
      var node = values[segment];

      var val;
      var valRef;
      var parentValRef;

      if (!lastSegment) {
        var ancestorForSegment = model.findAncestorWithPath(segmentPath);
        // We've already handled any splits further up the tree
        if (ancestorForSegment) {
          this._attachValueToModels(model, segments, segmentIndex + 1, ancestorForSegment.getValueNodeRef(), rootValues, skipDefaultValue);
          return;
        }

        val = null;
        parentValRef = null;
        if (ThinkEhrUtil.isArray(node)) {
          if (node.length > 1) {
            console.warn('A split occurred in the model at', segmentPath, ' will only use last value from the array for ' +
              'further processing');
          }
          if (addedSegment) {
            valRef = {};
            node.push(valRef);
          } else {
            valRef = node.length === 0 ? null : node[node.length - 1];
          }
        } else {
          valRef = node;
        }
      } else {
        // We are at our model

        if (pathChildIndex < 0) {
          pathChildIndex = this._getPathChildIndex(model);
        }

        if (pathChildIndex > 0) {
          if (!ThinkEhrUtil.isArray(node) || pathChildIndex >= node.length) {
            this._markModelForDeletion(model);
          } else {
            parentValRef = node;
            valRef = node[pathChildIndex];
            val = node[pathChildIndex];
          }
        } else if (ThinkEhrUtil.isArray(node)) {

          if (node.length === 0 && (!model.isMulti() || !model.isValueModel())) {
            val = null;
            if (addedSegment && !model.isValueModel()) {
              valRef = {};
              node.push(valRef);
            } else {
              valRef = null;
            }
            parentValRef = node;
          } else if (node.length === 1 && (!model.isMulti() || !model.isValueModel())) {
            val = node[0];
            valRef = node[0];
            parentValRef = node;
          } else {
            var doSplit;
            if (!model.isMulti()) {
              console.warn('Multiple values received for non-multi model', segmentPath, ', will only use the last one.');
              val = node[node.length - 1];
              valRef = val;
              parentValRef = node;
              doSplit = false;
            } else {
              val = node;
              valRef = node;
              parentValRef = values;
              doSplit = true;
            }

            // Do the splits
            if (doSplit && !model.isValueModel() && !addedSegment) {

              if (segmentPath != model.getPath()) {
                // Should never happen, this is a programmer assertion
                throw new Error('Segment path not the same as model path when we want to possibly split the model. Coding error?');
              }
              var parentModel: FormObjectModel = model.getParentModel() as FormObjectModel;
              for (var i = 1; i < valRef.length; i++) {
                // Do we already have our child?
                var childModel = parentModel.findChildWithPath(segmentPath, i);
                if (!childModel) {
                  this._recursivelyParseDescription(parentModel, model.getDescEl(), null);
                  childModel = parentModel.findChildWithPath(segmentPath, i);
                  if (!childModel) {
                    throw Error('Could not create child model for ' + model.getPath() + '.'); // Should REALLY never happen
                  }
                }

                childModel.setValueNodeRef(valRef[i]);
                childModel.setValueNodeParentRef(valRef);

                var subModels = [];
                this._getModelsRecursively(childModel, subModels);
                subModels.shift(); // Remove the childModel itself, since it's already been handled
                for (var j = 0; j < subModels.length; j++) {
                  var subModel = subModels[j];
                  if (subModel.getPath() != null) {
                    var subModelSegments = subModel.getPath().split('/');
                    this._attachValueToModels(subModel, subModelSegments, 0, rootValues, rootValues, skipDefaultValue);
                  }
                }
              }

              // This is for the first element, they will be set below
              parentValRef = valRef;
              valRef = valRef[0];
            } // splits
          } // array with multiple elements

        } // is array ends here
        else {
          // object
          val = node;
          valRef = node;
          parentValRef = values;
        }

        model.setValueNodeRef(valRef);
        model.setValueNodeParentRef(parentValRef);
        if (model.isValueModel()) {
          model.setValue(val);
          model._setSkipDefaultValue(!!skipDefaultValue, undefined);
        }

        if (!parentValRef && model.__markedForDeletion !== true) {
          console.warn('Parent value reference is null for', model, '. Is this legal?');
        }

        if (model.getRmType() === RmType.CUSTOM && model.getDelegateModel() && model.getDelegateModel().getRmType !== undefined) {
          var dm = model.getDelegateModel();
          dm.setValueNodeParentRef(parentValRef);
          dm.setValueNodeRef(valRef);
          if (dm.isValueModel()) {
            dm.setValue(val);
            dm._setSkipDefaultValue(!!skipDefaultValue);
          }
        }

      } // is last segment

      this._attachValueToModels(model, segments, segmentIndex + 1, valRef, rootValues, skipDefaultValue);

    } // we have some values
  }

  _segmentsToPath(segments, lastIndex) {
    var index = lastIndex === undefined ? segments.length : lastIndex + 1;
    var sliced = segments.slice(0, index);
    return sliced.join('/');
  }

  refreshValues(model, values) {
    if (model.getRmType() === RmType.FORM_DEFINITION) {
      model.setValueNodeRef(values);
    }
    this._parseValues(model, values, values);

    model._triggerModelRefreshed();
    this.recursivelyForChildModels(model, (m) => {
      m._triggerModelRefreshed();
    });
  }

  _getModelsRecursively(model, flatArray) {
    flatArray.push(model);
    for (var i = 0; i < model.getChildCount(); i++) {
      var childModel = model.getChildModel(i);
      this._getModelsRecursively(childModel, flatArray);
    }
  }


  isCustomFunctionCustomComponent(customFunctionString: string, hasCustomTagValue: boolean): boolean {
    if (!customFunctionString) return false;
    var customFnRef: any = null;
    try {
      customFnRef = eval(customFunctionString);
    } catch (e) {
      console.error('Custom function on path \'' + customFunctionString + '\' is not defined.');
    }

    if (customFnRef && customFnRef instanceof Function) {
      return hasCustomTagValue;
    } else if (customFnRef && typeof customFnRef === 'object') {
      if (customFnRef && customFnRef.function != null) {
        return customFnRef.customComponent == null ? hasCustomTagValue : customFnRef.customComponent == true;
      }
    }
    return false;
  }

  getCustomFunctionReference(customFunctionString) {
    var customFnRef = null;
    try {
      customFnRef = eval(customFunctionString);
    } catch (e) {
    }

    if (customFnRef && customFnRef instanceof Function) {
      return customFnRef;
    } else if (customFnRef && typeof customFnRef === 'object') {
      if (customFnRef && customFnRef.function != null) {
        return customFnRef.function;
      }
    }
    return null;
  }

  duplicateModel(model: FormRepeatableElementModel, insertAfterModel: FormObjectModel, setCurrentViewConfig: boolean = false) {
    if (!model.isMulti()) {
      console.warn('Only multi models can be duplicated model=', model);
      return;
    }
    var values = {};
    var rm: FormRootModel = model.getRootModel() as FormRootModel;
    var context = rm ? rm.getContext() : null;
    var newModel = this.parseFormDescriptionSnippet(model.getDescEl(), values, context);
    if (setCurrentViewConfig) {
      this._viewConfigParser.parseViewConfig(model.getViewConfig(), newModel.getViewConfig());
    }
    rm = model.getRootModel() as FormRootModel;
    /*if (rm && rm.getRmType() === RmType.FORM_DEFINITION) {
      var ast = rm.getDependencyNode();
      if (ast && ast.fields().length > 0) {
        var depsJson = ast.getRawDesc();
        var cm = [];
        this._getModelsRecursively(newModel, cm);
        cm.forEach((m) => {
          var fieldJson = ThinkEhrDependencyParser._findDependencyDef(m.getPath(), depsJson);
          if (fieldJson) {
            ThinkEhrDependencyParser.getInstance().parseDependencyField(ast, fieldJson, m);
          }
        });
      }

      if (ast && ast.fields().length > 0) {
        ThinkEhrDependencyParser.getThenStatementsWithModelPath(ast, model.getPath()).forEach((thenStatement) => {
          thenStatement.addTarget(newModel);
        })

      }
    }*/

    if (insertAfterModel) {
      var parent: AbstractContainerModel = model.getParentModel() as AbstractContainerModel;
      var index;
      if (parent) {
        index = parent.getChildModels().indexOf(insertAfterModel);
        if (parent) {
          if (index >= 0) {
            parent.insertChildModelAt(index + 1, newModel);
          }
        }
      }

      var parentValRef = model.getValueNodeParentRef();
      if (parentValRef && ThinkEhrUtil.isArray(parentValRef)) {
        newModel.setValueNodeParentRef(parentValRef);

        let valueIndex = index;
        const multiSiblings = parent.findChildrenWithPath(newModel.getPath());
        if (multiSiblings.length > 1) {
          valueIndex = multiSiblings.indexOf(insertAfterModel);
        }

        if (valueIndex === undefined || valueIndex < 0) {
          parentValRef.push(newModel.getValueNodeRef());
        } else {
          parentValRef.splice(valueIndex + 1, 0, newModel.getValueNodeRef());
        }
      }

    }

    return newModel;
  }

  addToValueObject(oldVals: any, newVals: any, onlyUpdateOldProps?: boolean): any {
    if (ThinkEhrUtil.isObject(oldVals) && ThinkEhrUtil.isObject(newVals)) {
      Object.keys(newVals).forEach((prop: string) => {
        if (!onlyUpdateOldProps || oldVals[prop]!== undefined) {
          oldVals[prop] = this.addToValueObject(oldVals[prop], newVals[prop], onlyUpdateOldProps);
        }
      });
      return oldVals;
    } else if (ThinkEhrUtil.isArray(oldVals) && ThinkEhrUtil.isArray(newVals)) {
      if (newVals.length === 0) {
        oldVals.length = 0;
      } else {
        // if this is leaf node remove values first
        const isLeafNodeValueArray:boolean = !oldVals.some(arrV => {
          if (ThinkEhrUtil.isObject(arrV) || ThinkEhrUtil.isArray(arrV)) {
            for (let prop in arrV) {
              if (ThinkEhrUtil.isObject(arrV[prop]) || ThinkEhrUtil.isArray(arrV[prop])) {
                return true;
              }
            }
          }
          return false;
        });
        if (isLeafNodeValueArray) {
          oldVals.length = 0;
          newVals.forEach((nVal, i)=>{
            oldVals[i] = nVal;
          });
        }else{
          newVals.forEach((newVal: any, i: number) => {
            if (oldVals[i] !== undefined) {
              this.addToValueObject(oldVals[i], newVal, onlyUpdateOldProps);
            } else if (!onlyUpdateOldProps) {
              oldVals[i] = newVal;
            }
          });
        }

      }
      return oldVals;
    }
    return newVals;
  }

  clearValues(oldVals: any) {
    if (ThinkEhrUtil.isObject(oldVals)) {
      Object.keys(oldVals).forEach((prop: string) => {
        oldVals[prop] = this.clearValues(oldVals[prop]);
      });
      return oldVals;
    } else if (ThinkEhrUtil.isArray(oldVals)) {
      if (oldVals.length != 0) {
        if (!oldVals.some(arrV => {
          if (ThinkEhrUtil.isObject(arrV) || ThinkEhrUtil.isArray(arrV)) {
            for (let prop in arrV) {
              if (ThinkEhrUtil.isObject(arrV[prop]) || ThinkEhrUtil.isArray(arrV[prop])) {
                return true;
              }
            }
          }
          return false;
        })) {
          // if this is leaf node array remove values
          oldVals.length = 0;
        } else {
          oldVals.forEach((oVal: any, i: number) => {
            oldVals[i] = this.clearValues(oVal);
          });
        }
      }
      return oldVals;
    }
    return oldVals;
  }


  /*destroyModel(model: FormObjectModel): void {
    model.removeFromParent();

    var parentValRef = model.getValueNodeParentRef();
    var valRef = model.getValueNodeRef();
    if (parentValRef && valRef) {
      if (ThinkEhrUtil.isArray(parentValRef)) {
        var index = parentValRef.indexOf(valRef);
        if (index >= 0) {
          parentValRef.splice(index, 1);
        }
      }
    }
  }*/

  setExternalContext(model: FormObjectModel, context: EhrContext) {
    if (model.getRmType() !== RmType.FORM_DEFINITION) {
      throw new Error('External context can only be attached to the root form model');
    }
//TODO where is this used??
    model['_externalContext'] = context;
  }

}

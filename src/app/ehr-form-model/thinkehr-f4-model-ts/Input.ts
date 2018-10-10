import {InputType} from "./view/InputType";
import {FormObjectModel} from "./model/FormObjectModel";
import {ThinkEhrUtil} from "./ThinkEhrUtil";
import {InputItem} from "./InputItem";
import {EhrContext} from "./EhrContext";
import {Validation} from "./Validation";
import {GetTerminologyListCallback, TerminologyItem} from "../../EhrTerminologyService";
import {InputParser} from "./parsing/ThinkEhrInputParser";

/**
 * Created by matjazhi on 15.4.2016.
 */

export class Input {

  suffix: string;
  type: InputType;
  list: any[] = [];
  validation: Validation;
  listOpen: boolean = false;
  defaultValue: any;
  defaultInputItem;
  terminology;
  context: EhrContext;
  inputForModel: FormObjectModel;
  terminologyListCache: Object = {};

  _lastTerminologySearchStrId: string;

  constructor(fromObj: any, private parser?:InputParser) {
    for (let prop in fromObj) {
      let setAsValue;
      try {
        setAsValue = fromObj[prop];
      } catch (e) {
      }

      if (fromObj.hasOwnProperty(prop)) {
        switch (prop) {
          case 'validation':
            setAsValue = new Validation(setAsValue);
            break;
          /*case 'type':
            if(ThinkEhrUtil.isString(setAsValue)){
              setAsValue = InputType[setAsValue];
            }
            break;*/
        }
        try {
          this[prop] = setAsValue;
        } catch (e) {
        }
      }
    }
  }

  static _toLabelValuePropsArr = function (codeDescPropsArr: TerminologyItem[], lang?:string, fromTerminologyStr?:string) {
    let ret = [];
    for (let i = 0; i < codeDescPropsArr.length; i++) {
      ret.push(Input._toLabelValuePropsItem(codeDescPropsArr[i], lang, fromTerminologyStr));
    }
    return ret;
  };
  static _toLabelValuePropsItem(codeDescPropsItem:TerminologyItem, lang, fromTerminologyStr) {
    if (codeDescPropsItem) {
      if(!codeDescPropsItem.label && !!codeDescPropsItem['description']) {
        codeDescPropsItem.label = codeDescPropsItem['description'];
      }
      if(!codeDescPropsItem.value && !!codeDescPropsItem['code']) {
        codeDescPropsItem.value = codeDescPropsItem['code'];
      }

      if (!codeDescPropsItem.localizedLabels) {
        codeDescPropsItem.localizedLabels = {};
      }
      if (lang && !codeDescPropsItem.localizedLabels[lang]) {
        codeDescPropsItem.localizedLabels[lang] = codeDescPropsItem.label;
      }

      if (fromTerminologyStr) {
        codeDescPropsItem.terminology = fromTerminologyStr;
      }
      /*delete codeDescPropsItem.description;
      delete codeDescPropsItem.code;*/
    }
    return codeDescPropsItem;
  };
/*
  static loadItemFromTerminology = function (codeValue: string, callbackFn: Function, language: string, terminologyCodeSystem: string, context: EhrContext) {
    if (terminologyCodeSystem && context) {
      let reqLang = language || context.language;
      if (context && context.getTerminologyItem) {
        context.getTerminologyItem(terminologyCodeSystem, codeValue, reqLang, function (resItem) {
          InputItem._toLabelValuePropsItem(resItem, reqLang, terminologyCodeSystem);
          //console.log("TERMIN_II_DEBUG Input.loadItemFromTerminology RES=",resItem)
          if (callbackFn) {
            callbackFn(resItem);
          }
        }.bind(this), this.inputForModel);
        return true;
      } else {
        console.warn("'getTerminologyItem' method not defined on form context object");
        return false;
      }
    }
    if (callbackFn) {
      callbackFn(null);
    }
    return false;
  };*/

  getSuffix() {
    return this.suffix;
  }

  setSuffix(suffix) {
    this.suffix = suffix;
  }

  setInputForModel(model) {
    this.inputForModel = model;
  }

  getType() {
    return this.type;
  }

  setType(type) {
    this.type = type;
  }

  getTerminologyItemsWithLabel(qryParam: any, callbackFn?: Function) {
    let qryString;
    if (ThinkEhrUtil.isObject(qryParam)) {
      if (qryParam.all == true) {
        qryString = '';
      }
      if (qryParam.query != null) {
        qryString = qryParam.query;
      }
      if (qryParam.force == true) {
        this._lastTerminologySearchStrId = null;
      }
    } else {
      qryString = qryParam;
    }

    let newLabelStrId = this._createLastTermStringId(qryString);
    let terminologyStr = this.getTerminology();
    if (terminologyStr && this._lastTerminologySearchStrId !== newLabelStrId) {
      if (this.getContext() && this.getContext().getTerminologyList) {
        this._lastTerminologySearchStrId = newLabelStrId;
        this.setList([], null);
        let reqLang = this.getContext().language;
        let terminologyCbFn: GetTerminologyListCallback =  (terminologyResultArr: TerminologyItem[], resLanguage?:string):void =>{
          let lang = resLanguage || reqLang;
          if (terminologyResultArr && terminologyResultArr.length) {
            terminologyResultArr = Input._toLabelValuePropsArr(terminologyResultArr, lang, terminologyStr);
            if(!this.parser) {
              throw new Error('input parser not provided')
            }
            this.setList(this.parser.parseInputItems(terminologyResultArr), true);
          }
          if (callbackFn) {
            callbackFn(this.getList(), qryParam);
          }
        };

        this.getContext().getTerminologyList(terminologyStr, qryParam, reqLang, terminologyCbFn, this.inputForModel);
      } else {
        console.warn("'getTerminologyList' method not defined on form context object");
      }
      return
    } else if (callbackFn) {
      callbackFn(this.getList(), qryParam);
    }
  }

  getList() {
    return this.list;
  }

  getTerminologyListCache() {
    if (!this.terminologyListCache[this.getTerminology()]) {
      this.terminologyListCache[this.getTerminology()] = {};
    }
    return this.terminologyListCache[this.getTerminology()];
  }

  setList(list, skipLoadFromTerminology: boolean = false) {
    list.forEach(function (inputItem) {
      this._connectItemToTerminology(inputItem, skipLoadFromTerminology);
    }, this);
    this.list = list;
  }

  getItem(index) {
    return index >= 0 && index < this.list.length ? this.list[index] : null;
  }

  addItem(item, skipLoadFromTerminology: boolean = false) {
    this._connectItemToTerminology(item, skipLoadFromTerminology);
    this.list.push(item);
  }

  hasItems() {
    return this.list.length > 0;
  }

  getValidation(): Validation {
    return this.validation;
  }

  setValidation(validation: Validation) {
    this.validation = validation;
  }

  isListOpen() {
    return this.listOpen;
  }

  setListOpen(listOpen) {
    this.listOpen = listOpen;
  }

  getDefaultValue() {
    return this.defaultValue;
  }

  _createTerminologyItem(value, skipTerminologyLoad, createWithDefaultValues) {
    if (value && this.getTerminology()) {
      if(!this.parser) {
        throw new Error('input parser not provided')
      }
      let termItem = this.parser.parseInputItems([{
        value: value,
        label: createWithDefaultValues && createWithDefaultValues.label ? createWithDefaultValues.label : 'value (' + value + ')',
        localizedLabels: createWithDefaultValues && createWithDefaultValues.localizedLabels ? createWithDefaultValues.localizedLabels : {}
      }])[0];
      this._connectItemToTerminology(termItem, skipTerminologyLoad);
      return termItem;
    }
  }

  getDefaultInputItem(createWithDefaultValues) {
    let defValue = this.getDefaultValue();
    if (!this.defaultInputItem && defValue) {
      this.defaultInputItem = this.findInputItemByValue(defValue, true, null);
      if (!this.defaultInputItem && this.getTerminology()) {
        this.defaultInputItem = this._createTerminologyItem(defValue, false, createWithDefaultValues);
      }
    }
    return this.defaultInputItem;
  }

  findInputItemByValue(value, skipDefault, createWithDefaultValues) {
    let listArr = this.getList();
    for (let i = 0; i < listArr.length; i++) {
      if (listArr[i].value === value) {
        return listArr[i];
      }
    }

    if (value && this.getTerminology()) {

      let retItem = this.getTerminologyListCache()[value];
      if (!retItem) {
        retItem = this._createTerminologyItem(value, false, createWithDefaultValues);
        this.addItem(retItem, null);
      }
      return retItem;
    }

    if (!skipDefault) {
      let defaultItem = this.getDefaultInputItem(null);
      if (defaultItem && defaultItem.value === value) {
        return defaultItem;
      }
    }

    return null;
  }

  setDefaultValue(defaultValue) {
    this.defaultValue = defaultValue;
  }

  getContext() {
    return this.context;
  }

  getTerminology() {
    return this.terminology;
  }

  setTerminology(terminology, reloadLastSearch: boolean = false) {
    let update = this.terminology != terminology;
    if (update) {
      this.terminology = terminology;
      if (reloadLastSearch) {
        this.reloadListFromTerminology();
      } else {
        this.setList([], null);
      }
    }
  }

  setContext(context: EhrContext, skipLoadFromTerminology: boolean = false) {
    let update = false;
    if (!skipLoadFromTerminology && this.context && context.language && this.context.language != context.language) {
      update = true;
    }
    this.context = context;
    if (update) {
      this.reloadListFromTerminology();
    }
    this.getList().forEach(function (item) {
      item.setContext(this.getContext(), false);
    }, this);
  }

  reloadListFromTerminology() {
    let lastQueryStr = this._getLastTermQryString(this._lastTerminologySearchStrId);
    if (lastQueryStr) {
      this.getTerminologyItemsWithLabel(lastQueryStr, null);
    }
  }

  _createLastTermStringId(labelString) {
    let language = this.getContext() ? this.getContext().language : 'noLang';
    return labelString + '~' + language + '~' + this.getTerminology();
  }

  _tokenizeLastTermStringId(lastTermLabelStr) {
    return lastTermLabelStr ? lastTermLabelStr.split('~') : null;
  }

  _getLastTermQryString(lastTermLabelStr) {
    let splArr = this._tokenizeLastTermStringId(lastTermLabelStr);
    if (splArr) {
      splArr.splice(splArr.length - 2, 2);
      return splArr.join("");
    }
    return null;
  }

  _connectItemToTerminology(inputItem, skipLoadFromTerminology) {
    if (this.getTerminology()) {
      inputItem.setContext(this.getContext(), true);
      inputItem.setTerminology(this.getTerminology(), skipLoadFromTerminology);
      let cachedInputItem = this.getTerminologyListCache()[inputItem.value];
      if (!cachedInputItem) {
        this.getTerminologyListCache()[inputItem.value] = inputItem;
      } else {
        if (cachedInputItem.onUpdateCallback) {
          cachedInputItem.applyValuesFrom(inputItem);
          cachedInputItem.onUpdateCallback.call(undefined, cachedInputItem);
        }
      }
    }
  }

  toString() {
    return "thinkehr.f4.Input";
  }
}

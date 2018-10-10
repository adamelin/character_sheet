import {EhrContext} from './EhrContext';
import {Input} from './Input';
import {Validation} from './Validation';
import {TerminologyItem} from "../../EhrTerminologyService";
/**
 * Created by matjazhi on 23.5.2016.
 */

export class InputItem {

  value: any;
  label: string;
  validation: Validation;
  localizedLabels: Object = {};
  onUpdateCallback: Function;
  terminology: string;
  context: EhrContext;
  status;
  _loadTerminologyRequestIdsInProgress: string[]=[];
  _stashedLabelValue: string = '';

  constructor(fromObj?: any) {
    for (let prop in fromObj) {
      if (fromObj.hasOwnProperty(prop)) {
        try {
          this[prop] = fromObj[prop];
        } catch (e) {
        }
      }
    }
  }

  static STATUS_LOADING: string = 'loading';
  static STATUS_NOT_FOUND: string = 'notfound';

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

  static OTHER_VALUE: string = '__other__';
  private _labelValueNotFound: string = 'Not found';

  _getNotFoundLabel(language: string, codeValue: string) {
    /*let notFound;///+thinkehr.f4.dict.tr('notFound', language);
     let ctx:EhrContext = this.getContext();
     if(ctx && language && ctx.translationService && ctx.translationService.getLangs().some(function(transLang:string){
     return language==transLang;
     })){
     ctx.translationService.get(language, 'other.inputLabel');
     }
     if (!notFound) {
     notFound = this._labelValueNotFound;
     }*/
    return this._labelValueNotFound + ' (' + codeValue + ')';
  };


  getValue() {
    return this.value;
  }

  setValue(value) {
    this.value = value;
  }

  getLabel(locale, disableIfOrdinal?:boolean) {
    if (locale) {
      let l = this.localizedLabels ? this.localizedLabels[locale] : null;
      if (locale && l == null) {
        this.updateFromTerminology(locale);
      }
      return l ? this.toOrdinalLabel(l) : this.toOrdinalLabel(this.label);
    }

    return this.toOrdinalLabel(this.label);
  }

  private toOrdinalLabel(plainLabel: string, disable?: boolean): string {
    if (!disable && this['ordinal'] != null) {
      return '(' + this['ordinal'] + ') ' + plainLabel;
    }
    return plainLabel;
  }

  setLabel(label) {
    this.label = label;
  }

  getValidation(): Validation {
    return this.validation;
  }

  setValidation(validation: Validation) {
    this.validation = validation;
  }

  setLocalizedLabels(localizedLabels) {
    this.localizedLabels = localizedLabels;
  }

  setLocalizedLabel(language, value) {
    if (language) {
      if (!this.localizedLabels) {
        this.setLocalizedLabels({});
      }
      this.localizedLabels[language] = value;
    }

  }

  setOnUpdateCallback(onUpdateCallback) {
    this.onUpdateCallback = onUpdateCallback;
  }

  getTerminology() {
    return this.terminology;
  }

  setTerminology(terminologyStr, skipTerminologyUpdate) {
    let update = this.terminology !== terminologyStr;
    this.terminology = terminologyStr;
    if (update && !skipTerminologyUpdate) {
      this.setLocalizedLabels({});
      this.updateFromTerminology(null);
    }
  }

  getContext(): EhrContext {
    return this.context || new EhrContext();
  }

  setContext(context, skipLoadFromTerminology) {
    this.context = context;
    if (!skipLoadFromTerminology) {
      this.updateFromTerminology(null);
    }
  }

  applyValuesFrom(inputItemObj) {
    if (inputItemObj) {
      this.label = inputItemObj.label;
      this.validation = inputItemObj.validation;
      if (inputItemObj.localizedLabels) {
        for (let langProp in inputItemObj.localizedLabels) {
          if (inputItemObj.localizedLabels.hasOwnProperty(langProp)) {
            this.localizedLabels[langProp] = inputItemObj.localizedLabels[langProp];
          }
        }
      }
      if (this.onUpdateCallback) {
        this.onUpdateCallback.call(undefined, this);
      }
    }
  }

  updateFromTerminology(language) {
    if (!language) {
      language = this.getContext().language;
    }
    let terminologyCodeSystem = this.getTerminology();
    if (terminologyCodeSystem) {
      let createRequestIdString = function (terCodeSystem, currVal, reqLang) {
        return terCodeSystem + ':' + currVal + ':' + reqLang;
      };
      let context = this.getContext();
      let currVal = this.getValue();
      let loadTermId = createRequestIdString(terminologyCodeSystem, currVal, language);
      if (this.localizedLabels[language] == null && !this._loadTerminologyRequestIdsInProgress.find((v)=> {return v==loadTermId}) && this.status!=InputItem.STATUS_NOT_FOUND) {
        this._loadTerminologyRequestIdsInProgress.push(loadTermId);
        let requestMade = InputItem.loadItemFromTerminology(currVal, function (terminologyItem) {
          let notFound = terminologyItem == null;
          //console.log("TERMIN_II_DEBUG InputItem.updateFromTerminology RES=",terminologyItem)
          if (!terminologyItem) {
            terminologyItem = {};
            terminologyItem.localizedLabels = {};
            let currentLocalizedLabel;
            for (let lang in this.localizedLabels) {
              if (this.localizedLabels.hasOwnProperty(lang) && lang !== language) {
                currentLocalizedLabel = this.localizedLabels[lang];
                // TODO set label value in context.getTerminologyItem or implement with Observable
                if (currentLocalizedLabel && currentLocalizedLabel.indexOf(this._getNotFoundLabel(lang, currVal)) < 0) {
                  currentLocalizedLabel = this._getNotFoundLabel(lang, currVal);
                  currentLocalizedLabel = this._stashedLabelValue ? currentLocalizedLabel + ' | ' + this._stashedLabelValue : currentLocalizedLabel;
                }
                terminologyItem.localizedLabels[lang] = currentLocalizedLabel;
              }
            }

            currentLocalizedLabel = this.localizedLabels[language];
            if (currentLocalizedLabel && currentLocalizedLabel.indexOf(this._getNotFoundLabel(language, currVal)) < 0) {
              currentLocalizedLabel = this._getNotFoundLabel(language, currVal);
              currentLocalizedLabel = this._stashedLabelValue ? currentLocalizedLabel + ' | ' + this._stashedLabelValue : currentLocalizedLabel;
            }
            terminologyItem.localizedLabels[language] = currentLocalizedLabel;

            terminologyItem.label = terminologyItem.localizedLabels[language];
          }

          if (terminologyItem) {
            this.applyValuesFrom(terminologyItem);
            this.status = notFound ? InputItem.STATUS_NOT_FOUND : null;
          }
          let atInd = this._loadTerminologyRequestIdsInProgress.indexOf(loadTermId);
          if(atInd>-1){
            this._loadTerminologyRequestIdsInProgress.splice( atInd, 1);
          }
        }.bind(this), language, terminologyCodeSystem, context);

        if (requestMade) {
          this._stashedLabelValue = this.label;
          this.setLocalizedLabel(language, this.label);
          this.status = InputItem.STATUS_LOADING;
        }else{
          this.status = InputItem.STATUS_NOT_FOUND;
        }
      }
    }
  }

  toString() {
    return 'InputItem';
  }

}

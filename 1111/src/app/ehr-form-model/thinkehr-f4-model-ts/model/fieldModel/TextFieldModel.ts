import {DirectValueModel} from "../DirectValueModel";
import {Input} from "../../Input";
import {InputType} from "../../view/InputType";
import {RmType} from "../../RmType";
import {ModelViewConfigParser} from "../../parsing/ViewConfigParser";
import {EhrModelEventType} from '../../../ehr-model-event';
/**
 * Created by matjazhi on 19.4.2016.
 */

export class TextFieldModel extends DirectValueModel {

    protected _otherValue:string;

    constructor(formDescriptionSnippet?:Object, viewConfigParser?: ModelViewConfigParser) {
        super(formDescriptionSnippet, viewConfigParser, 'textValue');
    }


    textValue(value?:string, multiIndex?:number):string {
      //if(value===null)arguments[0] = undefined;
      //console.log("argggg",arguments)
      return this.valueGetterSetter.apply(this, arguments);
    }

    getDefaultInput():Input {
        return this.getInputByType(InputType.TEXT);
    }

    isListOpen():boolean {
        return this.getInputFor('textValues').isListOpen();
    }

    getInputFor(suffix:string):Input {
        return suffix == "textValues" ? this.getInput(0) : super.getInputFor(suffix);
    }

    resetValue(multiIndex:number):void {
      this.textValue(this.defaultValue());
      this._setIsDefaultValue( true );
    }

    clearValue(){
      super.clearValue();
      this.eventDispatcher.dispatchEvent(EhrModelEventType.CLEAR_VALUE_EVENT, {model:this})
    }

    applyValue(value:string, valueType:string, multiIndex?:number) {
        if (!this._applyValueFromObject(value)) {
            if (valueType == null || valueType == 'value') {
                multiIndex = this._getDefaultMultiIndex(multiIndex);
                this.textValue(value, multiIndex);
            } else {
                console.warn("Setting non-existent value type (" + valueType + ") with value=" + value + " on RM type (" + this.toString() + ")")
            }
        }
    }

    getRmType():RmType {
        return RmType.DV_TEXT;
    }

    toString():string {
        return "TextFieldModel/" + this.getName() + "/" + RmType[this.getRmType()];
    }

}

/**
 * Created by matjazhi on 5.9.2017.
 */
import {InputItem} from "../InputItem";
import {Validation} from "../Validation";
import {NodeModel} from "../model/NodeModel";
import {Input} from "../Input";
import {InputType} from "../view/InputType";

export class ThinkEhrInputParser implements InputParser{

  parseInputItems(rawInputArr) {
    let parsedInputItems = [];
    if (rawInputArr) {
      for (let j = 0; j < rawInputArr.length; j++) {
        let inputItem = rawInputArr[j];
        let inputItemObj = new InputItem(inputItem);
        if (inputItem.validation) {
          inputItemObj.setValidation(new Validation(inputItem.validation));
        }
        parsedInputItems.push(inputItemObj)
      }
    }
    return parsedInputItems;
  }


  _parseInputs(model, descEl) {
    if (descEl.inputs && model instanceof NodeModel) {
      model.setInputs([]);
      for (let i = 0; i < descEl.inputs.length; i++) {
        let input = descEl.inputs[i];
        let inputObj = new Input(input, this);
        inputObj.setList([], null);
        inputObj.setContext(model.getContext(), null);
        let inputType: any = InputType[input.type];
        inputObj.setType(inputType as InputType);

        this.parseInputItems(input.list).forEach((inputItem) => {
          inputObj.addItem(inputItem, true);
        });
        model.addInput(inputObj);
      }
    }
  }


}

export interface InputParser{
  parseInputItems(rawInputArr)
}

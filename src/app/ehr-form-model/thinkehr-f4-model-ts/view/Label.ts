import {ViewConfigProperty} from './ViewConfigProperty';
import {ModelViewConfigParser} from "../parsing/ViewConfigParser";
/**
 * Created by matjazhi on 14.4.2016.
 */
export class Label extends ViewConfigProperty {
  custom: boolean;
  value: string;
  useLocalizations: boolean;
  localizationsList: Object;

  constructor(fromObj: Object, viewConfParser:ModelViewConfigParser) {
    super(fromObj, viewConfParser);
  }

  isCustom(): boolean {
    return this.custom;
  }

  setCustom(custom: boolean) {
    this.custom = custom;
  }

  getValue(): string {
    return this.value;
  }

  setValue(value: string) {
    this.value = value;
  }

  isUseLocalizations(): boolean {
    return this.useLocalizations;
  }

  setUseLocalizations(useLocalizations: boolean) {
    this.useLocalizations = useLocalizations;
  }

  getLocalization(locale: string) {
    let l = this.localizationsList[locale];
    return l ? l : null;
  }

  setLocalizations(localizationsList: Object) {
    this.localizationsList = localizationsList;
  }

  /*
   * @Override
   */
  toString(): string {
    return 'thinkehr.f4.Label/ViewConfigProperty';
  }
}

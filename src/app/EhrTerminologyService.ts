import {FormObjectModel} from "./ehr-form-model/thinkehr-f4-model-ts/model/FormObjectModel";

export interface EhrTerminologyService {
  extractTerminologyCodeSystem(terminologyString: string);
  getList:GetTerminologyListFn;
  getItem:GetTerminologyItemFn;
}


export interface GetTerminologyListFn {
  (terminologyStr: string, searchString: any, language: string, callbackFn: GetTerminologyListCallback, model: FormObjectModel);
}
export interface GetTerminologyItemFn {
  (terminologyStr: string, code: string, language: string, callbackFn: GetTerminologyItemCallback, model:FormObjectModel);
}

export interface GetTerminologyListCallback{
  (list:TerminologyItem[], resLanguage?:string):void;
}
export interface GetTerminologyItemCallback{
  (item:TerminologyItem, resLanguage?:string):void;
}

export interface TerminologyItem{
  label:string;
  value:string;
  localizedLabels?:{[lang:string]:string};
  terminology?:string
}

import {InjectionToken, Injector} from "@angular/core";
import {ScriptApi} from "../ScriptApi";
import {FormScriptApi} from "./FormScriptApi";

export const FORM_SCRIPT_FACT = (injector: Injector) => {
  return injector.get(ScriptApi, new ScriptApi());
};

export let FORM_SCRIPT_API = new InjectionToken<FormScriptApi>('FormScriptApiTkn');

export const FORM_SCRIPT_PROVIDER = {
  provide: FORM_SCRIPT_API,
  useFactory: FORM_SCRIPT_FACT,
  deps: [Injector]
};

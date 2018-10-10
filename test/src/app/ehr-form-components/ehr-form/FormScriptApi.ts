
import {FormObjectModel} from "../../ehr-form-model/thinkehr-f4-model-ts/model/FormObjectModel";
import {ModelScriptExecutor} from "../ScriptApi";
import {EhrModelObservable} from "../../ehr-form-model/ehr-model-observable";
import {ViewComponentsRegistryService} from "../registered-components.service";

export interface FormScriptApi {
  componentsRegistry: ViewComponentsRegistryService;

  exeFormScript(forModel: FormObjectModel, ehrFormScriptArr: string[], ehrModelObservable: EhrModelObservable): ModelScriptExecutor;

  registerComponent(componentInstance: any, model: FormObjectModel): void;

  unregisterComponent(componentInstance: any, model: FormObjectModel): void;

  destroy();
}

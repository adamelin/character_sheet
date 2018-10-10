import {NgModule} from '@angular/core';
import {ThinkEhrModelParser} from "./thinkehr-f4-model-ts/parsing/ThinkEhrModelParser";
import {rmTypeModelDictionary} from "./thinkehr-f4-model-ts/model/rmTypeModelDictonary";

export const modelParserFactory = () => {
  return new ThinkEhrModelParser(rmTypeModelDictionary);
};

@NgModule({
  imports: [],
  declarations: [],
  providers: [{provide: ThinkEhrModelParser, useFactory: modelParserFactory}]
})
export class EhrFormModelModule {
}

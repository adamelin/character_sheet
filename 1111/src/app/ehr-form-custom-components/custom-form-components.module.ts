import {NgModule} from '@angular/core';
import {EhrFormComponentsModule} from "../ehr-form-components/ehr-form-components.module";
import {BmiSimpleComponent} from "./bmi-simple/bmi-simple.component";
import {BmiIconComponent} from "./bmi-icon/bmi-icon.component";
import {ExtendedTextComponent} from "./extended-text/extended-text.component";
import {TranslateModule} from "ng2-translate";
import {ButtonPopupComponent} from "./button-popup/button-popup.component";
import {CodedSimpleComponent} from "./coded-simple/coded-simple.component";


@NgModule({
  imports: [
    EhrFormComponentsModule,
    TranslateModule.forRoot()
  ],
  declarations: [
    BmiSimpleComponent,
    BmiIconComponent,
    ExtendedTextComponent,
    ButtonPopupComponent,
    CodedSimpleComponent
  ],
  exports:[
    BmiSimpleComponent,
    BmiIconComponent,
    ExtendedTextComponent,
    ButtonPopupComponent,
    CodedSimpleComponent
  ],
  providers:[
  ],
  entryComponents:[
    BmiSimpleComponent,
    BmiIconComponent,
    ExtendedTextComponent,
    ButtonPopupComponent,
    CodedSimpleComponent
  ]
})
export class EhrFormCustomComponentsModule { }

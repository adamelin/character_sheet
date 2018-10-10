import {Injectable, Inject} from "@angular/core";
import {TranslateService} from "ng2-translate";
import {Observable} from "rxjs";
import {ValidationMessageResolver} from "mrd-ui-components";

@Injectable()
export class EhrValidationMessageResolver implements ValidationMessageResolver{

  private handlerFn: Function;

  constructor(@Inject(TranslateService) public translate:TranslateService){

  }

  getValidationMessage(validationKey: string, value: any): Observable<string> {

    let keyPrefix: string = 'validation.';
    let message: Observable<string> = this.translate.get(keyPrefix + validationKey, value);
    return message;

  }

  getValidationErrorValues(key:string, value:any):any{
    if(this.handlerFn) {
      return this.handlerFn(key, value);
    }
    return {};
  }

  setValidationErrorValueHandler(handlerFn:Function){
    this.handlerFn = handlerFn;
  }

}

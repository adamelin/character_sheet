import {Injectable} from "@angular/core";
import {Http, RequestOptions, URLSearchParams, Response} from "@angular/http";
import {ThinkEhrUtil} from "./ehr-form-model/thinkehr-f4-model-ts/ThinkEhrUtil";
import {
  EhrTerminologyService, GetTerminologyItemCallback, GetTerminologyListCallback,
  TerminologyItem
} from "./EhrTerminologyService";
import {FormObjectModel} from "./ehr-form-model/thinkehr-f4-model-ts/model/FormObjectModel";
import {RmTypeModelValueGetter} from "./ehr-form-model/thinkehr-f4-model-ts/model/RmTypeModelValueGetter";
import {NodeModel} from "./ehr-form-model/thinkehr-f4-model-ts/model/NodeModel";

/**
 * Created by matjazhi on 20.2.2017.
 */
@Injectable()
export class TerminologyService implements EhrTerminologyService {

  terminologyURLBase: string = 'http://parent.marand.si/terminology-adapter/rest/terminology/codesystem';

  constructor(private http: Http) {
  }

  extractTerminologyCodeSystem(terminologyStr: string) {
    //terminologyStr example: epSOS?subset=epSOSAllergenNoDrugs&language=en-GB
    let qrySplit = terminologyStr.split('?'),
      terminologyObj;

    if (qrySplit.length > 1) {
      let paramStrArr = qrySplit[1].split('&');
      for (let i = 0; i < paramStrArr.length; i++) {
        let keyVal = paramStrArr[i].split('=');
        if (keyVal[0] == 'subset') {
          (qrySplit.length == 2) ? terminologyObj = {"codeSystem": keyVal[1], "extQuery": null} :
            terminologyObj = {"codeSystem": keyVal[1], "extQuery": qrySplit[2].split('&')[0]};
        }
      }
    } else {
      terminologyObj = {"codeSystem": terminologyStr, "extQuery": null};
    }

    return terminologyObj;
  }

  getList(terminologyStr: string, searchString: any, language: string, callbackFn: GetTerminologyListCallback, model: FormObjectModel) {
    /*let tagVal = model.annotationValue("depends");
    let model2=model.findModelWithTag(tagVal)
*/
    console.log("TerminologyService.getList",searchString)
    if (searchString) {
      if (ThinkEhrUtil.isObject(searchString)) {
        if (searchString.force == true) {
          searchString = '';
        } else {
          searchString = searchString.query;
        }
      }
      let extractedTer = this.extractTerminologyCodeSystem(terminologyStr),
        objUrl;

      objUrl = (searchString == '') ?
        {
          "url": this.terminologyURLBase + '/' + extractedTer["codeSystem"] + '/entities',
          "params": {matchvalue: searchString}
        } :
        {
          "url": this.terminologyURLBase + '/' + extractedTer["codeSystem"] + '/entities/query',
          "params": {description: searchString}
        };
      let ro = new RequestOptions();
      let searchParams = new URLSearchParams();
      Object.keys(objUrl.params).forEach((key) => {
        searchParams.append(key, objUrl.params[key]);
      });
      ro.search = searchParams;
      this.http.get(objUrl.url, ro).toPromise().then(function (res: Response) {
        let body = res.json();
        let terminologyItems: TerminologyItem[];
        if (body) {

          let _resultObj: any[] = (body.items) ? body.items : body;
          terminologyItems = _resultObj.map((resVal: any) => {
            let val: string = extractedTer["extQuery"] ? resVal[extractedTer["extQuery"]] : resVal.code;
            let terItm: TerminologyItem = {label:resVal.description, value: val, terminology: resVal.terminology};
            return terItm
          });
        }
        if (callbackFn) {
          callbackFn(terminologyItems);
        }
      }, function (error) {
        if (callbackFn) {
          callbackFn(null);
        }
      });
    } else if (callbackFn) {
      callbackFn(null);
    }

  }

  getItem(terminologyStr: string, code: string, language: string, callbackFn: GetTerminologyItemCallback, model: FormObjectModel) {
    let extractedTer = this.extractTerminologyCodeSystem(terminologyStr);
    this.http.get(this.terminologyURLBase + '/' + extractedTer["codeSystem"] + '/entity/' + encodeURIComponent(code)).toPromise().then(function (res) {
      let resultObj = res.json();
      if (resultObj) {

        if (extractedTer["extQuery"]) {
          resultObj["description"] = resultObj[extractedTer["extQuery"]];
        }

      }
      if (callbackFn) {
        callbackFn(resultObj);
      }
    }, function (error) {
      if (callbackFn) {
        callbackFn(null);
      }
    });
  }

}



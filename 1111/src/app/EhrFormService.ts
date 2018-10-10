import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Headers, Http, RequestOptions, RequestOptionsArgs, Response} from '@angular/http';

/**
 * Created by matjazhi on 20.2.2017.
 */

@Injectable()
export class EhrFormService {

  formsDataSource: any[];

  constructor(private http:Http) {
  }

  startPingInterval(url: string, sessionId: string) {
    setInterval(() => {
      let requestOptionsArgs: RequestOptionsArgs = new RequestOptions();
      requestOptionsArgs.headers = new Headers();
      requestOptionsArgs.headers.append("Ehr-Session", sessionId);
      this.http.put(url, null, requestOptionsArgs).subscribe(() => {
        console.info("Successfully pinged ehr session", sessionId);
      }, (failure) => {
        console.error("Failed to ping ehr session", sessionId, " please reload page to create a new session.", failure);
      });
    }, 300000, 0, false)
  }

  loadForm(formName, formVersion, sessionId:string, formUrl:string): Observable<any> {
    console.log("loading from SERVER form: ", formName, formVersion);
    if (formVersion == '*') {
      return this.loadHighestVersion(formName, sessionId, formUrl);
    }

    return this.loadFormResource(formName, formVersion, sessionId, formUrl).map((success) => {

        let res: any = success.json();
      let fDesc = res.form.resources.find((res) => res.name === "form-description").content;
      let fLayout:String=res.form.resources.find((res) => res.name === "form-layout").content;

      return {description:fDesc, layout:fLayout};

        /*console.log("Form description ", this.ehrFormOptions.formDescription);


        if (!this.ehrFormOptions.formDescription) {
          console.error("Could not find form-description for form " + formName + ":" + formVersion);
        } else {
          this.values = {};
          let parsedFD: FormObjectModel = this.thinkEhrModelParser.parseFormDescription(this.formContext, this.ehrFormOptions.formDescription, this.values, null);

          //alert("Loaded")
          this.formRootModel = parsedFD;
          this.changeDetectorRef.markForCheck();
        }*/
      }
    )
  }

  loadHighestVersion(displayFormName:string, sessionId:string, url:string): Observable<Response> {

    var getHighestFormNameVersion = function (fName, forms) {
      var versionCompare = function (v1: any, v2: any, options?: any): number {
        var lexicographical = options && options.lexicographical,
          zeroExtend = options && options.zeroExtend,
          v1parts = v1.split('.'),
          v2parts = v2.split('.');

        function isValidPart(x) {
          return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
        }

        if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
          return NaN;
        }

        if (zeroExtend) {
          while (v1parts.length < v2parts.length) v1parts.push("0");
          while (v2parts.length < v1parts.length) v2parts.push("0");
        }

        if (!lexicographical) {
          v1parts = v1parts.map(Number);
          v2parts = v2parts.map(Number);
        }

        for (var i = 0; i < v1parts.length; ++i) {
          if (v2parts.length == i) {
            return 1;
          }

          if (v1parts[i] == v2parts[i]) {
            continue;
          }
          else if (v1parts[i] > v2parts[i]) {
            return 1;
          }
          else {
            return -1;
          }
        }

        if (v1parts.length != v2parts.length) {
          return -1;
        }

        return 0;
      };
      var collectedVersions = {name: fName, versions: []};
      forms.forEach(function (form) {
        if (form.name == fName) collectedVersions.versions.push(form.version)
      });
      collectedVersions.versions = collectedVersions.versions.sort(versionCompare);
      return collectedVersions;
    };

    if (this.formsDataSource) {
      var highestFormNameVersion = getHighestFormNameVersion(displayFormName, this.formsDataSource);
      return this.loadForm(highestFormNameVersion.name, highestFormNameVersion.versions.pop(), sessionId, url);
    } else {
      return this.loadFormsResource( sessionId, url).take(1).flatMap((res) => {
        let resObj = res.json();
        var highestFormNameVersion2 = getHighestFormNameVersion(displayFormName, resObj.forms);
        return this.loadForm(highestFormNameVersion2.name, highestFormNameVersion2.versions.pop(), sessionId, url);
      })
    }
  }

  loadFormResource(name: string, version: string, sessionId:string, url:string):Observable<Response> {
    let requestOptionsArgs: RequestOptionsArgs = new RequestOptions();
    requestOptionsArgs.headers = new Headers();
    requestOptionsArgs.headers.append("Ehr-Session", sessionId);
    return this.http.get(url + "/form/" + name + "/" + version + '?' + 'resources=form-description,form-layout', requestOptionsArgs).take(1);
  }

  loadFormsResource(sessionId:string, url:string) {
    let requestOptionsArgs: RequestOptionsArgs = new RequestOptions();
    requestOptionsArgs.headers = new Headers();
    requestOptionsArgs.headers.append("Ehr-Session", sessionId);
    return this.http.get(url + '/form', requestOptionsArgs).take(1);
  }

  login(url: string, usn: string, pass: string): Observable<any> {
    return this.http.post(url + '/session?username=' + usn + '&password=' + pass, '').map(success=>success.json().sessionId).take(1);
  }

}


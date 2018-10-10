import {Observable} from "rxjs";
/**
 * Created by matjazhi on 15.2.2017.
 */

export interface EhrCustomComponentsDictionary {
  componentName$(componentName): Observable<any>;
  registerComponent(compNameString: string, componentType: any): void;
}

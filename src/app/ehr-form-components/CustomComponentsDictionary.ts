import {Observable, BehaviorSubject, Subscription} from "rxjs";
import {EhrCustomComponentsDictionary} from "./EhrCustomComponentsDictionary";
import {Type} from "@angular/core";
import {EhrFormCustomComponent} from "./EhrFormCustomComponent";
/**
 * Created by matjazhi on 15.2.2017.
 */
export class CustomComponentsDictionary implements EhrCustomComponentsDictionary {

  public static createInstanceWithComponents(components: {[componentStringId: string]: Type<EhrFormCustomComponent>}):CustomComponentsDictionary {
    let retInstance = new CustomComponentsDictionary();
    retInstance.registerComponents(components);
    return retInstance;
  }

  get registeredComponents():{[compName: string]: Type<EhrFormCustomComponent>}{
    return this.components.getValue();
  }

  protected components: BehaviorSubject<{[compName: string]: Type<EhrFormCustomComponent>}> = new BehaviorSubject<{[compName: string]: Type<EhrFormCustomComponent>}>({});

  /*private parentCompDictSubscription: Subscription;

   private parentComponentDicts: CustomComponentsDictionary[] = [];*/

  constructor(components?: {[componentStringId: string]: Type<EhrFormCustomComponent>}) {
    this.registerComponents(components);
  }

  registerComponents(components: {[componentId: string]: Type<EhrFormCustomComponent>}): void {
    if(components){
      Object.getOwnPropertyNames(components).forEach((compStringId: string) => {
        this.registerComponent(compStringId, components[compStringId]);
      });
    }
  }

  registerComponent(compNameString: string, componentType: Type<EhrFormCustomComponent>) {
    if (compNameString) {
      compNameString = compNameString.trim();
      let newValObj: any = {};
      newValObj[compNameString] = componentType;
      this.components.next(Object.assign(this.components.getValue(), newValObj));
    }
  }

  /*specializeComponentDict(compDict:CustomComponentsDictionary){
   this.parentComponentDicts.push(compDict);
   if(this.parentCompDictSubscription){
   this.parentCompDictSubscription.unsubscribe();
   }
   this.parentCompDictSubscription=Observable.merge.apply(this, this.parentComponentDicts).subscribe((parentComponents:{[compName: string]: any})=>{
   this.components.next(Object.assign(parentComponents, this.components.getValue()));
   });
   }*/

  componentName$(componentName): Observable<any> {
    componentName = componentName.trim();
    return this.components.pluck(componentName).distinctUntilChanged();
  }

}

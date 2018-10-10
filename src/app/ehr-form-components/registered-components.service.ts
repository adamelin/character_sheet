import {BehaviorSubject, Observable} from "rxjs";
import {FormObjectModel} from "../ehr-form-model/thinkehr-f4-model-ts/model/FormObjectModel";

/**
 * Created by matjazhi on 24.2.2017.
 */

export class ViewComponentsRegistryService {

  constructor() {
  }

  private modelComponents: BehaviorSubject<{ all: { model: FormObjectModel, components: any[] }[], added: { model: FormObjectModel, components: any[] }, removed: { model: FormObjectModel, components: any[] } }> = new BehaviorSubject<{ all: { model: FormObjectModel, components: any[] }[], added: { model: FormObjectModel, components: any[] }, removed: { model: FormObjectModel, components: any[] } }>({
    all: [],
    added: null,
    removed: null
  });

  registerComponent(componentInstance: any, model: FormObjectModel) {
    let compsArr = this.modelComponents.getValue().all;
    let currentValue = this.findByModel(model, compsArr);

    if (currentValue) {
      let hasComp: boolean = !!currentValue.components.find(comp => comp === componentInstance);
      if (hasComp) {
        return;
      }
    } else {
      currentValue = {model: model, components: []};
      compsArr.push(currentValue);
    }
    currentValue.components.push(componentInstance);
    this.modelComponents.next({all: [...compsArr], added: currentValue, removed: null});
  }

  unregisterComponent(componentInstance: any, model: FormObjectModel) {
    let compsArr = this.modelComponents.getValue().all;
    let currValue: { model: FormObjectModel, components: any[] } = this.findByModel(model, compsArr);
    if (currValue) {
      let ind = currValue.components.indexOf(componentInstance);
      if (ind > -1) {
        if (currValue.components.length > 2) {
          currValue.components.splice(ind, 1);
        } else {
          compsArr.splice(compsArr.indexOf(currValue), 1);
        }
        this.modelComponents.next({all: [...compsArr], removed: currValue, added: null});
      }
    }
  }

  private findByModel(model: FormObjectModel, inArr: { model: FormObjectModel, components: any[] }[]): { model: FormObjectModel, components: any[] } {
    if (model) {
      return inArr.find((val: { model: FormObjectModel, components: any[] }) => {
        return val.model === model;
      });
    }
  }

  private findModelsByTag(tag: string, inArr: { model: FormObjectModel, components: any[] }[]): { model: FormObjectModel, components: any[] }[] {
    if (tag) {
      return inArr.filter((val: { model: FormObjectModel, components: any[] }) => {
        return val.model && val.model.hasTag(tag);
      });
    }
  }

  componentsWithModel$(withModel: FormObjectModel): Observable<{ model: FormObjectModel, components: any[] }> {
    let firstCalled: boolean = false;
    return this.modelComponents.asObservable().filter((comps: { all: { model: FormObjectModel, components: any[] }[], added: { model: FormObjectModel, components: any[] }, removed: { model: FormObjectModel, components: any[] } }) => {
      if (!firstCalled) {
        firstCalled = true;
        return true;
      }
      return (comps.added && comps.added.model == withModel) || (comps.removed && comps.removed.model == withModel);
    }).pluck('all').map((modelCompsArr: { model: FormObjectModel, components: any[] }[]) => {
      let modelComps = this.findByModel(withModel, modelCompsArr);
      return modelComps ? modelComps : {model: withModel, components: []};
    })


    /*///.distinctUntilChanged((v1: {model: FormObjectModel, components: any[]}, v2: {model: FormObjectModel, components: any[]}) => {
      return v1.components.length === v2.components.length && (v1.components.findIndex((val1: any, ind: number) => {
        return val1 !== v2.components[ind];
      }) < 0);
    });*/
  }

  componentsWithTag$(withTag: string): Observable<{ model: FormObjectModel, components: any[] }[]> {
    let firstCalled: boolean = false;
    return this.modelComponents.asObservable()
      .filter((comps: {
        all: { model: FormObjectModel, components: any[] }[],
        added: { model: FormObjectModel, components: any[] },
        removed: { model: FormObjectModel, components: any[] }
      }) => {
        if (!firstCalled) {
          firstCalled = true;
          return true;
        }
        return (comps.added && comps.added.model && comps.added.model.hasTag(withTag)) || (comps.removed && comps.removed.model && comps.removed.model.hasTag(withTag));
      })
      .pluck('all').map((modelCompsArr: { model: FormObjectModel, components: any[] }[]) => {
        return this.findModelsByTag(withTag, modelCompsArr);
      });
  }

  componentsWithFilter$(filterFn: ModelFilterFn): Observable<{ model: FormObjectModel, components: any[] }[]> {
    let firstCalled: boolean = false;
    return this.modelComponents.asObservable()
      .filter((comps: {
        all: { model: FormObjectModel, components: any[] }[],
        added: { model: FormObjectModel, components: any[] },
        removed: { model: FormObjectModel, components: any[] }
      }) => {
        if (!firstCalled) {
          firstCalled = true;
          return true;
        }
        return (comps.added && comps.added.model && filterFn(comps.added.model) || (comps.removed && comps.removed.model && filterFn(comps.removed.model)) );
      })
      .pluck('all').map( (modelCompsArr: { model: FormObjectModel, components: any[] }[]) => {
        //return this.findModelsByPathId(withPath, modelCompsArr);
        return modelCompsArr.filter((val: { model: FormObjectModel, components: any[] }) => {
          return filterFn(val.model);
        });
      });
  }

  destroy(){
    this.modelComponents.complete();
    this.modelComponents = null;
  }
}

export interface ModelFilterFn{
  (model:FormObjectModel):boolean;
}

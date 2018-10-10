import {BehaviorSubject, Observable} from "rxjs";
import {EhrContext} from "../../ehr-form-model/thinkehr-f4-model-ts/EhrContext";

/**
 * Created by matjazhi on 7.6.2016.
 */

export class EhrFormState {

  formRenderingContainersOneByOneComplete: BehaviorSubject<boolean> = new BehaviorSubject(undefined);

  private containersRenderingOneByOne: string[] = [];
  private _formContext: BehaviorSubject<EhrContext> = new BehaviorSubject(undefined);

  getFormContext(): Observable<EhrContext> {
    return this._formContext.asObservable();
  }

  setFormContext(ctx: EhrContext) {
    this._formContext.next(ctx);
  }

  get currentLanguage(): string {
    let value = this._formContext.getValue();
    return value ? value.language : null;
  }

  refreshFormContext() {
    this._formContext.next(this._formContext.getValue());
  }

  get oneByOneRenderingState(): Observable<boolean> {
    return this.formRenderingContainersOneByOneComplete.asObservable();
  }

  addOneByOneContainerRenderingStart(pathId: string) {
    if (this.containersRenderingOneByOne.indexOf(pathId) < 0) {
      this.containersRenderingOneByOne.push(pathId);
    }
    const anyOneByOne: boolean = !(this.containersRenderingOneByOne.length > 0);
    if (this.formRenderingContainersOneByOneComplete.getValue() !== anyOneByOne) {
      this.formRenderingContainersOneByOneComplete.next(anyOneByOne);
    }
  }

  removeOneByOneContainerRenderingStart(pathId: string) {
    const atInd = this.containersRenderingOneByOne.indexOf(pathId);
    if (atInd > -1) {
      this.containersRenderingOneByOne.splice(atInd, 1);
    }
    const anyOneByOne: boolean = !(this.containersRenderingOneByOne.length > 0);
    if (this.formRenderingContainersOneByOneComplete.getValue() !== anyOneByOne) {
      this.formRenderingContainersOneByOneComplete.next(anyOneByOne);
    }
  }

  clearOneByOneRenderingState() {
    this.containersRenderingOneByOne.length = 0;
    this.formRenderingContainersOneByOneComplete.next(undefined);
  }

}

export class EhrFormConfig {
  private _id: number = Math.random();

  getFormId(){
    return this._id;
  }

  constructor(){}
}

import {
  inject,
} from '@angular/core/testing';
import {FormObjectModel} from "./FormObjectModel";

describe('FormObjectModel', () => {
  //let builder: TestComponentBuilder;



  it('test should create instance', inject([], () => {
    expect(new FormObjectModel(null)).toBeTruthy();
  }));
});


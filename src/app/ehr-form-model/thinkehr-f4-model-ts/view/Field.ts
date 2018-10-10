import {ViewConfigProperty} from './ViewConfigProperty';
import {ViewConfig} from './ViewConfig';
import {FieldPresentation} from './FieldPresentation';
import {ModelViewConfigParser} from "../parsing/ViewConfigParser";
/**
 * Created by matjazhi on 15.4.2016.
 */

export class Field extends ViewConfigProperty {

  presentation: FieldPresentation;
  columns: number;
  lines: number;
  threeState:boolean;
  disabled:boolean;
  hideDate: boolean;
  hideTime: boolean;
  hidden: boolean;


  constructor(fromObj: Object, viewConfParser:ModelViewConfigParser) {
    super(fromObj, viewConfParser);
  }

  getPresentation(): FieldPresentation {
    return this.presentation;
  }

  setPresentation(presentation: FieldPresentation) {
    this.presentation = presentation;
  }

  getColumns(): number {
    return this.columns;
  }

  setColumns(columns: number) {
    this.columns = columns;
  }

  getLines(): number {
    return this.lines;
  }

  setLines(lines: number) {
    this.lines = lines;
  }

  /*
   * @Override
   */
  toString() {
    return 'thinkehr.f4.Field/ViewConfigProperty';
  }
}

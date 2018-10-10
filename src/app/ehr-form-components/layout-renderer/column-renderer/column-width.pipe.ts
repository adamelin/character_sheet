import {Pipe, PipeTransform} from '@angular/core';
import {EhrLayoutHelper} from '../../utils/EhrLayoutHelper';

@Pipe({
  name: 'columnWidth'
})
export class ColumnWidthPipe implements PipeTransform {

  transform(colObj: any, evenCols?: any): any {
    if (evenCols) {
      return ['col'];
    }
    return ['col-sm-' + EhrLayoutHelper.getColSizeNr(colObj.width).toString()];
  }

}

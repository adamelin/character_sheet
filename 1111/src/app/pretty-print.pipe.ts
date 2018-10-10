import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyPrint'
})
export class PrettyPrintPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value
      .replace(/ /g, '&nbsp;')
      .replace(/\n/g, '<br>');
  }

}

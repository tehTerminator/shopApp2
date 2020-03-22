import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleCase'
})
export class TitleCasePipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {
    return value.replace(
      /\w\S*/g,
      (txt) => {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

}

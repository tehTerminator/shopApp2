import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'underScoreToSpace'
})
export class UnderScoreToSpacePipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {
    return value.replace('_', ' ');
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFiltere'
})
export class SearchFilterePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

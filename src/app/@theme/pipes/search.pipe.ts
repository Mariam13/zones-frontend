import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  standalone: true,
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], value: string): any[] {
    if (!items) return [];
    if (!value) return items;

    value = value.toLowerCase();

    return items.filter(item => item.name.toLowerCase().includes(value));
  }
}

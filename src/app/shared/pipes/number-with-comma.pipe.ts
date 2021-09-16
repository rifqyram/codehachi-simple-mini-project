import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberWithComma',
})
export class NumberWithCommaPipe implements PipeTransform {
  transform(value: number | string, ...args: number[]): number | string {
    value = value.toString();
    let pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(value)) value = value.replace(pattern, '$1,$2');
    return `Rp ${value}`;
  }
}

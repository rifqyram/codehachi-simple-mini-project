import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    if (value.length > 100) {
      return value.substring(0, 168) + '...';
    } else if (value.length > 70 && value.length < 100) {
      return value.substring(0, 50) + '...';
    } else {
      return value;
    }
  }
}

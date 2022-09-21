import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalFriends',
})
export class TotalFriendsPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (Array.isArray(value)) {
      return value.length;
    }
    return '-';
  }
}

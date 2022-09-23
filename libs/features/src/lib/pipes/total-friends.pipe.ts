import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalFriends',
})
export class TotalFriendsPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    let length = 0;
    if (Array.isArray(value)) {
      length = value.length;
    }
    return length === 0 ? '-' : length;
  }
}

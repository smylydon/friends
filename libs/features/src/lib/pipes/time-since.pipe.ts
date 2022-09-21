import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

/**
 * Tell the duration since a given time
 */
@Pipe({
  name: 'timeSince',
})
export class TimeSincePipe implements PipeTransform {
  transform(
    value: string,
    precision: 'years' | 'months' | 'days' = 'years'
  ): string {
    const today = DateTime.now();
    const birthdate = DateTime.fromISO(value);

    let duration: any = today.diff(birthdate);
    let days, months, years: string;

    let html = '';
    switch (precision) {
      case 'days':
        // Note: Going one unit lower give us integer/rounded values
        duration = duration.shiftTo('years', 'months', 'days', 'hours');
        days = duration.days.toString();
        months = duration.months.toString();
        years = duration.years.toString();

        html += [years, 'years', months, 'months', days, 'days'].join(' ');
        break;
      case 'months':
        duration = duration.shiftTo('years', 'months', 'days');

        months = duration.months.toString();
        years = duration.years.toString();

        html += [years, 'years', months, 'months'].join(' ');
        break;
      default:
        // years
        duration = duration.shiftTo('years', 'months');

        years = duration.years.toString();

        // Do not display unit when only years
        html += years;
        break;
    }

    return html;
  }
}

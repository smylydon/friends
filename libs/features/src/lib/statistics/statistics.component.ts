import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'friends-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

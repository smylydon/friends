import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  AfterViewInit,
} from '@angular/core';
import * as d3 from 'd3';
import { FriendsEntity } from '../+state/friends.models';
import { WeightModel } from '../models/weight.model';
import { HelperService } from '../services/helper.service';

//https://d3-graph-gallery.com/graph/histogram_binSize.html
@Component({
  selector: 'friends-weight-histogram',
  templateUrl: './weight-histogram.component.html',
  styleUrls: ['./weight-histogram.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeightHistogramComponent implements AfterViewInit {
  @Input('data') set setData(friends: FriendsEntity[] | null | undefined) {
    this.data = this.helperService.getBarData(friends);
    if (this.afterInitDone) {
      this.updateChart(this.data);
    }
  }

  public data: WeightModel[] = [];

  private margin = { top: 20, right: 40, bottom: 30, left: 40 };
  private width = 450;
  private height = 450;
  private svg: any;

  private afterInitDone = false;

  constructor(
    private elementRef: ElementRef,
    private helperService: HelperService
  ) {}

  ngAfterViewInit(): void {
    this.updateChart(this.data);
    this.afterInitDone = true;
  }

  private updateChart(data: WeightModel[]) {
    this.createSvg();
    this.drawBars(data);
  }

  private createSvg(): void {
    d3.select(this.elementRef.nativeElement).select('svg').remove();

    this.svg = d3
      .select('figure#bar')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);
  }

  private drawBars(data: WeightModel[]) {
    const contentWidth = this.width - this.margin.left - this.margin.right;
    const contentHeight = this.height - this.margin.top - this.margin.bottom;

    const x = d3
      .scaleBand()
      .rangeRound([0, contentWidth])
      .padding(0.1)
      .domain(data.map((d: any) => d.weight));

    const y = d3
      .scaleLinear()
      .rangeRound([contentHeight, 0])
      .domain([0, d3.max(data, (d: any) => d.frequency)]);

    const g = this.svg
      .append('g')
      .attr(
        'transform',
        'translate(' + this.margin.left + ',' + this.margin.top + ')'
      );

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + contentHeight + ')')
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(10))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Frequency');

    g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d: any) => x(d.weight))
      .attr('y', (d: any) => y(d.frequency))
      .attr('width', x.bandwidth())
      .attr('height', (d: any) => contentHeight - y(d.frequency));
  }
}

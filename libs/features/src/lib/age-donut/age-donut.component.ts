import { Component, Input, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';

export interface SimpleDataModel {
  name: string;
  value: string;
  color?: string;
}
//https://stackblitz.com/edit/angular-d3-js-donut-chart?file=src%2Fapp%2Fd3-donut%2Fd3-donut.component.ts
@Component({
  selector: 'friends-age-donut',
  templateUrl: './age-donut.component.html',
  styleUrls: ['./age-donut.component.scss'],
})
export class AgeDonutComponent implements AfterViewInit {
  @Input('data') private data: SimpleDataModel[] = [
    { name: 'a', value: '9', color: '#665faac' },
    { name: 'b', value: '20', color: '#dd8050c4' },
    { name: 'c', value: '30', color: '#63adfeb3' },
    { name: 'd', value: '8', color: '#24b044d9' },
    { name: 'e', value: '12', color: '#ff516ed9' },
    { name: 'f', value: '3', color: '#ffcf59ed' },
    { name: 'g', value: '7', color: '#17a2b8' },
    { name: 'h', value: '14', color: '#976a6af2' },
  ];

  private margin = { top: 0, right: 30, bottom: 30, left: 30 };
  private width = 450;
  private height = 450;
  private svg: any;
  private colors: any;
  private radius = Math.min(this.width, this.height) / 2 - this.margin.left;
  constructor() {}

  ngAfterViewInit(): void {
    console.log('draw donut');
    this.createSvg();
    this.createColors(this.data);
    this.drawChart();
  }

  private createSvg(): void {
    console.log(document.getElementById('donut'));
    this.svg = d3
      .select('#donut')
      .append('svg')
      .attr('viewBox', `0 0 ${this.width} ${this.height}`)
      .append('g')
      .attr(
        'transform',
        'translate(' + this.width / 2 + ',' + this.height / 2 + ')'
      );
  }

  private createColors(data: any[]): void {
    let index = 0;
    const defaultColors = [
      '#6773f1',
      '#32325d',
      '#6162b5',
      '#6586f6',
      '#8b6ced',
      '#1b1b1b',
      '#212121',
    ];
    const colorsRange: any[] = [];
    this.data.forEach((element) => {
      if (element.color) colorsRange.push(element.color);
      else {
        colorsRange.push(defaultColors[index]);
        index++;
      }
    });
    this.colors = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.value.toString()))
      .range(colorsRange);
  }

  private drawChart(): void {
    // Compute the position of each group on the pie:
    const pie = d3
      .pie()
      .sort(null) // Do not sort group by size
      .value((d: any) => {
        return d.value;
      });
    const data_ready = pie(this.data as any);

    // The arc generator
    const arc = d3
      .arc()
      .innerRadius(this.radius * 0.5) // This is the size of the donut hole
      .outerRadius(this.radius * 0.8);

    // Another arc that won't be drawn. Just for labels positioning
    const outerArc = d3
      .arc()
      .innerRadius(this.radius * 0.9)
      .outerRadius(this.radius * 0.9);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    this.svg
      .selectAll('allSlices')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d: any) => this.colors(d.data.value))
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .style('opacity', 0.7);

    // Add the polylines between chart and labels:
    this.svg
      .selectAll('allPolylines')
      .data(data_ready)
      .enter()
      .append('polyline')
      .attr('stroke', 'black')
      .style('fill', 'none')
      .attr('stroke-width', 1)
      .attr('points', (d: any) => {
        const posA = arc.centroid(d); // line insertion in the slice
        const posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
        const posC = outerArc.centroid(d); // Label position = almost the same as posB
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
        posC[0] = this.radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
        return [posA, posB, posC];
      });

    // Add the polylines between chart and labels:
    this.svg
      .selectAll('allLabels')
      .data(data_ready)
      .enter()
      .append('text')
      .text((d: any) => {
        return d.data.name;
      })
      .attr('transform', (d: any) => {
        const pos = outerArc.centroid(d as any);
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = this.radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        return 'translate(' + pos + ')';
      })
      .style('text-anchor', (d: any) => {
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return midangle < Math.PI ? 'start' : 'end';
      });
  }
}

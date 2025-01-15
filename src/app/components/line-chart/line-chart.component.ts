import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Color, LineChartModule, ScaleType, TooltipModule} from "@swimlane/ngx-charts";
import {LineChartData} from "../../core/models/LineChartData";

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [LineChartModule, TooltipModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})

export class LineChartComponent implements OnInit {

  @Input() data: LineChartData[] | undefined;
  view: [number, number] = [700, 400];

  // options
  legend: boolean = false;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dates';
  yAxisLabel: string = 'Number of Medals';
  timeline: boolean = true;
  yScaleMin: number = 0;
  yScaleMax: number = 130;

  colorScheme: Color = {
    name: 'test',
    selectable: true,
    group: ScaleType.Linear,
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  ngOnInit(): void {
    this.updateViewDimensions();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    this.updateViewDimensions();
  }

  updateViewDimensions(): void {
    this.view = [window.innerWidth * 0.6, ((window.innerHeight > 590) ? (window.innerHeight * 0.478) : 400)];
  }
}

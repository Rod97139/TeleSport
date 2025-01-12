import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Color, LineChartModule, ScaleType} from "@swimlane/ngx-charts";

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [LineChartModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})

export class LineChartComponent implements OnInit {
  view: [number, number] = [700, 400];
  @Input() data: { name: string, value: number }[] | undefined;

  // options
  legend: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;

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
    this.view = [window.innerWidth, window.innerHeight * 0.7];
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}

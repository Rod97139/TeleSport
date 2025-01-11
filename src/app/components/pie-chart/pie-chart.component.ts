import {Component} from '@angular/core';
import {Color, LegendPosition, PieChartModule, ScaleType} from '@swimlane/ngx-charts';
import {single} from './data';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [
    PieChartModule
  ],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})

export class PieChartComponent {
  single: any[] | undefined;
  view: [number, number] = [700, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Below;

  // export interface Color {     name: string     selectable: boolean     group: ScaleType     domain: string[] }

  colorScheme: Color = {
    name: 'test',
    selectable: true,
    group: ScaleType.Linear,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() {
    Object.assign(this, { single });
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



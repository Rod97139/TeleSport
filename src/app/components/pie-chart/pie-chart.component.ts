import {Component, Input} from '@angular/core';
import {Color, LegendPosition, PieChartModule, ScaleType} from '@swimlane/ngx-charts';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [ PieChartModule ],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})

export class PieChartComponent {
  @Input() data: { id: number, name: string, value: number }[] | undefined;
  @Input() onClickFunction: ((id: number | undefined) => void) | undefined ;
  view: [number, number] = [700, 400];

  constructor() {}

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Below;

  colorScheme: Color = {
    name: 'test',
    selectable: true,
    group: ScaleType.Linear,
    domain: ['#956065', '#b8cbe7', '#89a1db', '#793d52', '#9780a1']
  };

  onSelect(data: any): void {
    const selectedItem = this.data?.find(item => item.name === data.name);
      console.log('Selected item ID:', selectedItem?.id);
    if (this.onClickFunction) {
      this.onClickFunction(selectedItem?.id);
    }
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}



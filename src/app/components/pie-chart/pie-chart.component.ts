import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Color, LegendPosition, PieChartModule, ScaleType} from '@swimlane/ngx-charts';
import {PieChartData} from "../../core/models/PieChartData";
import {EventObject} from "../../core/models/EventObject";

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [ PieChartModule ],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})

export class PieChartComponent implements OnInit {

  @Input() data: PieChartData[] | undefined;
  @Input() onClickFunction: ((id: number | undefined) => void) | undefined ;
  view: [number, number] = [700, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Below;

  colorScheme: Color = {
    name: 'test',
    selectable: true,
    group: ScaleType.Linear,
    domain: ['#956065', '#b8cbe7', '#89a1db', '#793d52', '#9780a1']
  };

  ngOnInit(): void {
    this.updateViewDimensions();
  }

  // function to update chart's view dimensions on window resize event listener angular built-in function
  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    this.updateViewDimensions();
  }

  // function to update chart's view dimensions on window resize event listener and on init component
  updateViewDimensions(): void {
    const height: number = (window.innerWidth < 643)
      ? window.innerWidth
      : window.innerHeight * 0.5;
    this.view = [window.innerWidth, height];
  }

  // function to navigate to details with id in template's click event retrieve from parent component
  onSelect($event: EventObject): void {
    const selectedItem = this.data?.find(item => item.name === $event.name);
    if (this.onClickFunction) {
      this.onClickFunction(selectedItem?.id);
    }
  }
}



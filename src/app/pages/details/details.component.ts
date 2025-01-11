import { Component } from '@angular/core';
import {LineChartComponent} from "../../components/line-chart/line-chart.component";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    LineChartComponent
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {

}

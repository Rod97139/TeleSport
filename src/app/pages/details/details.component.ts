import {Component, OnDestroy, OnInit} from '@angular/core';
import {LineChartComponent} from "../../components/line-chart/line-chart.component";
import {firstValueFrom, Observable, of} from "rxjs";
import {Olympic} from "../../core/models/Olympic";
import {OlympicService} from "../../core/services/olympic.service";
import {ActivatedRoute} from "@angular/router";
import {LoaderComponent} from "../../components/loader/loader.component";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    LineChartComponent,
    LoaderComponent
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit, OnDestroy {
  public olympics$: Observable<Olympic[] | null> = of(null);
  chartData: any[] | undefined = [];
  chartDataSubscribtion: any;
  isLoading = true;

  constructor(private olympicService: OlympicService, private route: ActivatedRoute) {

  }

  async ngOnInit(): Promise<void> {
    const countryId = Number(this.route.snapshot.paramMap.get('id'));
    this.olympics$ = this.olympicService.getOlympics();
    this.chartDataSubscribtion = this.olympics$.subscribe(olympics => {
      this.chartData = this.transformOlympicsToChartData(olympics, countryId)
    });
    await firstValueFrom(this.olympics$);
    this.isLoading = false;
  }

  transformOlympicsToChartData(olympics: Olympic[] | null, countryId: number): { name: string | undefined, series: { name: string, value: number }[] | undefined }[] | undefined {
    const selectedCountry = olympics?.find(olympic => olympic.id === countryId);
    if (selectedCountry) {
      return [
        {
          name: selectedCountry?.country,
          series: selectedCountry?.participations.map(participation => ({
            name: participation.year.toString(),
            value: participation.medalsCount
          }))
        }
      ];
    }
    return undefined;
  }

  ngOnDestroy() {
    this.chartDataSubscribtion.unsubscribe();
  }
}

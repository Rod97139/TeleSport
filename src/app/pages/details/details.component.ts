import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {LineChartComponent} from "../../components/line-chart/line-chart.component";
import {filter, firstValueFrom, Observable, of} from "rxjs";
import {Olympic} from "../../core/models/Olympic";
import {OlympicService} from "../../core/services/olympic.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LoaderComponent} from "../../components/loader/loader.component";
import {TitleComponent} from "../../components/title/title.component";
import {SubtitleComponent} from "../../components/subtitle/subtitle.component";
import {LineChartData} from "../../core/models/LineChartData";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    LineChartComponent,
    LoaderComponent,
    TitleComponent,
    SubtitleComponent
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class DetailsComponent implements OnInit, OnDestroy {
  public olympics$: Observable<Olympic[] | null> = of(null);
  chartData: LineChartData[] | undefined = [];
  chartDataSubscribtion: any;
  isLoading = true;

  constructor(private olympicService: OlympicService, private route: ActivatedRoute, private router: Router) {

  }

  async ngOnInit(): Promise<void> {
    const countryId = Number(this.route.snapshot.paramMap.get('id'));
    this.olympics$ = this.olympicService.getOlympics();
    this.chartDataSubscribtion = this.olympics$.subscribe(olympics => {
      this.chartData = this.convertOlympicsToChartData(olympics, countryId)
    });
    await firstValueFrom(this.olympics$.pipe(filter(data => data !== null && data !== undefined)));
    if (!this.chartData) {
      await this.router.navigate(['/not-found']);
    }
    this.isLoading = false;
  }

  convertOlympicsToChartData(olympics: Olympic[] | null, countryId: number): LineChartData[] | undefined {
    const selectedCountry = olympics?.find(olympic => olympic.id === countryId);
    if (selectedCountry) {
      return [
        {
          name: selectedCountry?.country,
          series: selectedCountry?.participations.map(participation => ({
            name: participation.year.toString(),
            value: participation.medalsCount,
            extra: participation.city
          })),
          totalMedals: selectedCountry?.participations.reduce((acc, curr) => acc + curr.medalsCount, 0),
          totalAthletes: selectedCountry?.participations.reduce((acc, curr) => acc + curr.athleteCount, 0)
        }
      ];
    }
    return undefined;
  }

  ngOnDestroy() {
    this.chartDataSubscribtion.unsubscribe();
  }
}

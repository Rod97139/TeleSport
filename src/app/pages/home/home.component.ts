import {Component, OnDestroy, OnInit} from '@angular/core';
import {filter, firstValueFrom, Observable, of, Subscription} from 'rxjs';
import { Router } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import {Olympic} from "../../core/models/Olympic";
import {PieChartData} from "../../core/models/PieChartData";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public olympics$: Observable<Olympic[] | null> = of(null);
  chartData: PieChartData[] | undefined;
  chartDataSubscribtion!: Subscription;
  isLoading = true;

  constructor(private olympicService: OlympicService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    this.olympics$ = this.olympicService.getOlympics();
    this.chartDataSubscribtion = this.olympics$.subscribe(olympics => {
      this.chartData = this.convertOlympicsToChartData(olympics);
    });
    await firstValueFrom(this.olympics$.pipe(filter(data => data !== null && data !== undefined)));
    this.isLoading = false;
  }

  // convert data from service to chart data
  convertOlympicsToChartData(olympics: Olympic[] | null): PieChartData[] | undefined {
    return olympics?.map((olympic: Olympic) => {
      const totalMedals = olympic.participations.reduce(
        (sum: number, participation: { medalsCount: number }) => sum + participation.medalsCount,
        0
      );
      return {
        id: olympic.id,
        name: olympic.country,
        value: totalMedals
      };
    });
  }

  ngOnDestroy() {
    this.chartDataSubscribtion.unsubscribe();
  }

  // function to navigate to details with id in template's click event
  onClickFunction = (id: number | undefined) => {
    this.router.navigate(['/details', id]);
  }
}

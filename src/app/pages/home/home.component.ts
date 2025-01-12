import {Component, OnDestroy, OnInit} from '@angular/core';
import {firstValueFrom, Observable, of} from 'rxjs';
import { Router } from '@angular/router';
import { OlympicService } from 'src/app/core/services/olympic.service';
import {Olympic} from "../../core/models/Olympic";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public olympics$: Observable<Olympic[] | null> = of(null);
  chartData: any[] | undefined = [];
  chartDataSubscribtion: any;
  isLoading = true;

  constructor(private olympicService: OlympicService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    this.olympics$ = this.olympicService.getOlympics();
    this.chartDataSubscribtion = this.olympics$.subscribe(olympics => {
      this.chartData = this.transformOlympicsToChartData(olympics);
    });
    await firstValueFrom(this.olympics$);
    this.isLoading = false;
  }

  transformOlympicsToChartData(olympics: Olympic[] | null): { id: number, name: string, value: number }[] | undefined {
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

  onClickFunction = (id: number | undefined) => {
    this.router.navigate(['/details', id]);
  }
}

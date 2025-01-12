import { provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {PieChartComponent} from "./components/pie-chart/pie-chart.component";
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {LineChartComponent} from "./components/line-chart/line-chart.component";
import {LoaderComponent} from "./components/loader/loader.component";

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent],
  imports: [BrowserModule, BrowserAnimationsModule, NoopAnimationsModule, AppRoutingModule, PieChartComponent, HeaderComponent, FooterComponent, LineChartComponent, LoaderComponent, HeaderComponent],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent],
})
export class AppModule {}

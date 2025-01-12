import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {HomeComponent} from "./pages/home/home.component";
import {DetailsComponent} from "./pages/details/details.component";
import {HttpClientTestingModule, provideHttpClientTesting} from "@angular/common/http/testing";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {of} from "rxjs";

export class ActivatedRouteStub {
  // Mock the necessary properties and methods
  snapshot = {
    paramMap: {
      get: (key: string) => 'mock-id'
    }
  };
  params = of({ id: 'mock-id' });
}


describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        FooterComponent,
        RouterModule. forRoot(
          [{path: '', component: HomeComponent}, {path: 'detail/:id', component: DetailsComponent}]
        )
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        provideHttpClientTesting(),
        HttpClient,
        HttpHandler
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'olympic-games-starter'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('olympic-games-starter');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('olympic-games-starter app is running!');
  });
});

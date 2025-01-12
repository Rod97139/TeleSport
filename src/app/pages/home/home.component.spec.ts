import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {LoaderComponent} from "../../components/loader/loader.component";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoaderComponent
        ],
      declarations: [ HomeComponent ],
      providers: [
        provideHttpClientTesting(),
        HttpClient,
        HttpHandler
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

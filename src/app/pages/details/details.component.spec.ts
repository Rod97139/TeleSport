import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsComponent } from './details.component';
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {LoaderComponent} from "../../components/loader/loader.component";
import {ActivatedRoute} from "@angular/router";
import {of} from "rxjs";
import {ActivatedRouteStub} from "../../app.component.spec";


describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsComponent, LoaderComponent],
      providers: [
        provideHttpClientTesting(),
        HttpClient,
        HttpHandler,
        { provide: ActivatedRoute, useClass: ActivatedRouteStub  }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

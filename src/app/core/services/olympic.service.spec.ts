import { TestBed } from '@angular/core/testing';

import { OlympicService } from './olympic.service';
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('OlympicService', () => {
  let service: OlympicService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClientTesting(),
        HttpClient,
        HttpHandler
      ]
    });
    service = TestBed.inject(OlympicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

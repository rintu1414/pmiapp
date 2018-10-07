import { TestBed, inject } from '@angular/core/testing';

import { GooglePieChartsService } from './google-pie-charts.service';

describe('GooglePieChartsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GooglePieChartsService]
    });
  });

  it('should be created', inject([GooglePieChartsService], (service: GooglePieChartsService) => {
    expect(service).toBeTruthy();
  }));
});

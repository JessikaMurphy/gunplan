import { TestBed, inject } from '@angular/core/testing';

import { KitService } from './kit.service';

describe('KitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KitService]
    });
  });

  it('should be created', inject([KitService], (service: KitService) => {
    expect(service).toBeTruthy();
  }));
});

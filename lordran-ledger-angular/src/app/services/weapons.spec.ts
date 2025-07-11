import { TestBed } from '@angular/core/testing';

import { WeaponsService } from '../services/weapons';

describe('Weapons', () => {
  let service: WeaponsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeaponsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

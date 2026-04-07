import { TestBed } from '@angular/core/testing';

import { Sonar } from './sonar';

describe('Sonar', () => {
  let service: Sonar;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Sonar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

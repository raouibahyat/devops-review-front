import { TestBed } from '@angular/core/testing';

import { Gitlab } from './gitlab';

describe('Gitlab', () => {
  let service: Gitlab;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Gitlab);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

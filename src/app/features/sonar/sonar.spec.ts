import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sonar } from './sonar';

describe('Sonar', () => {
  let component: Sonar;
  let fixture: ComponentFixture<Sonar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sonar],
    }).compileComponents();

    fixture = TestBed.createComponent(Sonar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

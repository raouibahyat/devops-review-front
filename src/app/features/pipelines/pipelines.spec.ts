import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pipelines } from './pipelines';

describe('Pipelines', () => {
  let component: Pipelines;
  let fixture: ComponentFixture<Pipelines>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pipelines],
    }).compileComponents();

    fixture = TestBed.createComponent(Pipelines);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

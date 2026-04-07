import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewBoard } from './review-board';

describe('ReviewBoard', () => {
  let component: ReviewBoard;
  let fixture: ComponentFixture<ReviewBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewBoard],
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewBoard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

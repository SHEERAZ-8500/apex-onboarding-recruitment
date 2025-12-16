import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewResultsComponent } from './interview-results.component';

describe('InterviewResultsComponent', () => {
  let component: InterviewResultsComponent;
  let fixture: ComponentFixture<InterviewResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterviewResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterviewResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiQuestionsComponent } from './kpi-questions.component';

describe('KpiQuestionsComponent', () => {
  let component: KpiQuestionsComponent;
  let fixture: ComponentFixture<KpiQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KpiQuestionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KpiQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

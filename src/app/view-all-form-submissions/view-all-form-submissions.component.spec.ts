import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllFormSubmissionsComponent } from './view-all-form-submissions.component';

describe('ViewAllFormSubmissionsComponent', () => {
  let component: ViewAllFormSubmissionsComponent;
  let fixture: ComponentFixture<ViewAllFormSubmissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewAllFormSubmissionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllFormSubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

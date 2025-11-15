import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFormSubmitedDataComponent } from './view-form-submited-data.component';

describe('ViewFormSubmitedDataComponent', () => {
  let component: ViewFormSubmitedDataComponent;
  let fixture: ComponentFixture<ViewFormSubmitedDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewFormSubmitedDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFormSubmitedDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

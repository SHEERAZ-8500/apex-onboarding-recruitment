import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTypeComponent } from './time-type.component';

describe('TimeTypeComponent', () => {
  let component: TimeTypeComponent;
  let fixture: ComponentFixture<TimeTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

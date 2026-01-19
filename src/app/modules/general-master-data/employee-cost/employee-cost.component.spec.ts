import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCostComponent } from './employee-cost.component';

describe('EmployeeCostComponent', () => {
  let component: EmployeeCostComponent;
  let fixture: ComponentFixture<EmployeeCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeCostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

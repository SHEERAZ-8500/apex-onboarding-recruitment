import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesGradeComponent } from './employees-grade.component';

describe('EmployeesGradeComponent', () => {
  let component: EmployeesGradeComponent;
  let fixture: ComponentFixture<EmployeesGradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeesGradeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeesGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

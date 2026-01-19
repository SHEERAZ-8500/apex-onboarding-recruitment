import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesCategoryComponent } from './employees-category.component';

describe('EmployeesCategoryComponent', () => {
  let component: EmployeesCategoryComponent;
  let fixture: ComponentFixture<EmployeesCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeesCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeesCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

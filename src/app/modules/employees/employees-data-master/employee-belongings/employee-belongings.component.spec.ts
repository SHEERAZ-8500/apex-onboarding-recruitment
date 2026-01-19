import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBelongingsComponent } from './employee-belongings.component';

describe('EmployeeBelongingsComponent', () => {
  let component: EmployeeBelongingsComponent;
  let fixture: ComponentFixture<EmployeeBelongingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeBelongingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeBelongingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

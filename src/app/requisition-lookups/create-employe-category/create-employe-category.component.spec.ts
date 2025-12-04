import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmployeCategoryComponent } from './create-employe-category.component';

describe('CreateEmployeCategoryComponent', () => {
  let component: CreateEmployeCategoryComponent;
  let fixture: ComponentFixture<CreateEmployeCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateEmployeCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEmployeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

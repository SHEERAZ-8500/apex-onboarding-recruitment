import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDefinationUpdateComponent } from './form-defination-update.component';

describe('FormDefinationUpdateComponent', () => {
  let component: FormDefinationUpdateComponent;
  let fixture: ComponentFixture<FormDefinationUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormDefinationUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDefinationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BelongingTypesComponent } from './belonging-types.component';

describe('BelongingTypesComponent', () => {
  let component: BelongingTypesComponent;
  let fixture: ComponentFixture<BelongingTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BelongingTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BelongingTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

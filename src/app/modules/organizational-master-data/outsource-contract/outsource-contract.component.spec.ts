import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutsourceContractComponent } from './outsource-contract.component';

describe('OutsourceContractComponent', () => {
  let component: OutsourceContractComponent;
  let fixture: ComponentFixture<OutsourceContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OutsourceContractComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutsourceContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

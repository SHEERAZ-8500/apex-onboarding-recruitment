import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RamadanTimingComponent } from './ramadan-timing.component';

describe('RamadanTimingComponent', () => {
  let component: RamadanTimingComponent;
  let fixture: ComponentFixture<RamadanTimingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RamadanTimingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RamadanTimingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

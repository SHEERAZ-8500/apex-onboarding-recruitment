import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GOSIIDComponent } from './gosiid.component';

describe('GOSIIDComponent', () => {
  let component: GOSIIDComponent;
  let fixture: ComponentFixture<GOSIIDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GOSIIDComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GOSIIDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

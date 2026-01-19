import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAssignmentComponent } from './post-assignment.component';

describe('PostAssignmentComponent', () => {
  let component: PostAssignmentComponent;
  let fixture: ComponentFixture<PostAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostAssignmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

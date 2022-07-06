import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeTestComponent } from './grade-test.component';

describe('GradeTestComponent', () => {
  let component: GradeTestComponent;
  let fixture: ComponentFixture<GradeTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradeTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

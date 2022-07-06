import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGradedTestComponent } from './view-graded-test.component';

describe('ViewGradedTestComponent', () => {
  let component: ViewGradedTestComponent;
  let fixture: ComponentFixture<ViewGradedTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewGradedTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGradedTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

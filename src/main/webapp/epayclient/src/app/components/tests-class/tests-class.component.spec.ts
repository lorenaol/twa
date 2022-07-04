import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsClassComponent } from './tests-class.component';

describe('TestsClassComponent', () => {
  let component: TestsClassComponent;
  let fixture: ComponentFixture<TestsClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestsClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestsClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

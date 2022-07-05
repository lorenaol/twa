import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaspundereTestComponent } from './raspundere-test.component';

describe('RaspundereTestComponent', () => {
  let component: RaspundereTestComponent;
  let fixture: ComponentFixture<RaspundereTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaspundereTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaspundereTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

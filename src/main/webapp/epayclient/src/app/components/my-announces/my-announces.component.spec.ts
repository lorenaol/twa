import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAnnouncesComponent } from './my-announces.component';

describe('MyAnnouncesComponent', () => {
  let component: MyAnnouncesComponent;
  let fixture: ComponentFixture<MyAnnouncesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAnnouncesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAnnouncesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

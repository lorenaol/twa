import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialsClassComponent } from './materials-class.component';

describe('MaterialsClassComponent', () => {
  let component: MaterialsClassComponent;
  let fixture: ComponentFixture<MaterialsClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialsClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialsClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

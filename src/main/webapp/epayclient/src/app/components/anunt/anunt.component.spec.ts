import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnuntComponent } from './anunt.component';

describe('AnuntComponent', () => {
  let component: AnuntComponent;
  let fixture: ComponentFixture<AnuntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnuntComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnuntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

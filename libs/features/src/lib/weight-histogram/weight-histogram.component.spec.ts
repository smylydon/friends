import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeDonutComponent } from './age-donut.component';

describe('AgeDonutComponent', () => {
  let component: AgeDonutComponent;
  let fixture: ComponentFixture<AgeDonutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgeDonutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AgeDonutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

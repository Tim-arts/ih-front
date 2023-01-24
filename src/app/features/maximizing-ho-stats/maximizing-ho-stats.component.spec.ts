import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaximizingHoStatsComponent } from './maximizing-ho-stats.component';

describe('MaximizingHoStatsComponent', () => {
  let component: MaximizingHoStatsComponent;
  let fixture: ComponentFixture<MaximizingHoStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaximizingHoStatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaximizingHoStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

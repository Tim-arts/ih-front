import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VIPLevelsComponent } from './vip-levels.component';

describe('VIPLevelsComponent', () => {
  let component: VIPLevelsComponent;
  let fixture: ComponentFixture<VIPLevelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VIPLevelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VIPLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

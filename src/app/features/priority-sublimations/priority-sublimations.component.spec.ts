import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrioritySublimationsComponent } from './priority-sublimations.component';

describe('PrioritySublimationsComponent', () => {
  let component: PrioritySublimationsComponent;
  let fixture: ComponentFixture<PrioritySublimationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrioritySublimationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrioritySublimationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

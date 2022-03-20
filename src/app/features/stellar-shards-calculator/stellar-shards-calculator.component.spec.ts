import { ComponentFixture, TestBed } from '@angular/core/testing'

import { StellarShardsCalculatorComponent } from './stellar-shards-calculator.component'

describe('CalculatorStellarShardsComponent', () => {
  let component: StellarShardsCalculatorComponent
  let fixture: ComponentFixture<StellarShardsCalculatorComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StellarShardsCalculatorComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(StellarShardsCalculatorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

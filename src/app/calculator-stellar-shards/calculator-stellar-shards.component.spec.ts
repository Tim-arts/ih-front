import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CalculatorStellarShardsComponent } from './calculator-stellar-shards.component'

describe('CalculatorStellarShardsComponent', () => {
  let component: CalculatorStellarShardsComponent
  let fixture: ComponentFixture<CalculatorStellarShardsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalculatorStellarShardsComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorStellarShardsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})

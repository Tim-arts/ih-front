import { Component } from '@angular/core'
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms'

import {
  staticDefaultValues,
  StaticModel,
  StellarCountValues,
} from './stellar-shards-calculator'

@Component({
  selector: 'app-stellar-shards-calculator',
  templateUrl: './stellar-shards-calculator.component.html',
  styleUrls: ['./stellar-shards-calculator.component.scss'],
})
export class StellarShardsCalculatorComponent {
  formControlModel: FormGroup = this.formBuilder.group({
    staticModel: this.formBuilder.group(staticDefaultValues),
    dynamicModel: this.formBuilder.array([]),
  })

  totalHeroCount: number = 0
  totalSSCount: number = 0
  StellarCountValues = StellarCountValues

  constructor(private formBuilder: FormBuilder) {}

  onSubmit(): void {
    this.totalHeroCount = this.getHeroCount()
    this.totalSSCount = this.getTotalSS()
  }

  resetForm(): void {
    const result = confirm('Are you sure you want to reset the form?')

    if (result) {
      this.formControlModel.controls.staticModel.reset()
      this.formControlModel.controls.dynamicModel.reset()

      for (
        let i = 0;
        i < this.formControlModel.value.dynamicModel.length;
        i++
      ) {
        this.removeHero(i)
      }
    }
  }

  getHeroCount(): number {
    return 0
  }

  getTotalSS(): number {
    return this.getTotalSSStatic() + this.getTotalSSDynamic()
  }

  getTotalSSStatic(): number {
    const values: StaticModel = this.formControlModel.value.staticModel
    let value: number = 0

    Object.keys(values).map((key: string, index: number) => {
      let _value: number = values[key]

      switch (index) {
        case 0:
          _value *= this.StellarCountValues.V4
          break
        case 1:
          _value *= this.StellarCountValues.V3
          break
        case 2:
          _value *= this.StellarCountValues.V2
          break
        case 3:
          _value *= this.StellarCountValues.V1
          break
        default:
          console.warn(`Data can't be handled by any case`)
      }

      value += _value
    })

    return value
  }

  getTotalSSDynamic(): number {
    return 0
  }

  removeHero(index: number) {}
}

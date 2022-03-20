import { Component, ViewChild } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, NgForm } from '@angular/forms'

import { StaticModel, StellarCountValues } from './stellar-shards-calculator'

@Component({
  selector: 'app-stellar-shards-calculator',
  templateUrl: './stellar-shards-calculator.component.html',
  styleUrls: ['./stellar-shards-calculator.component.scss'],
})
export class StellarShardsCalculatorComponent {
  formControlModel: FormGroup = this.formBuilder.group({
    staticModel: this.formBuilder.group({
      V4: null,
      V3: null,
      V2: null,
      V1: null,
    }),
    dynamicModel: this.formBuilder.array([
      this.formBuilder.group({
        'V0-HP': null,
        'V0-ATK': null,
        'V0-HP-ATK': null,
        'V1-HP': null,
        'V1-ATK': null,
        'V1-HP-ATK': null,
        'V2-HP': null,
        'V2-ATK': null,
        'V2-HP-ATK': null,
        'V3-HP': null,
        'V3-ATK': null,
        'V3-SPD': null,
      }),
    ]),
  })
  StellarCountValues = StellarCountValues

  @ViewChild('form', { static: true }) form!: NgForm

  get dynamicModel() {
    return this.formControlModel.get('dynamicModel') as FormArray
  }

  constructor(private formBuilder: FormBuilder) {}

  addHero() {
    this.dynamicModel.push(this.formBuilder.control(0))
  }

  onSubmit(): void {
    this.getHeroCount()
    this.getTotalSS()
  }

  getHeroCount(): number {
    let count: number = 0

    // Static
    Object.keys(this.formControlModel.value.staticModel).map((key: string) => {
      count += this.formControlModel.value.staticModel[key]
    })

    // Dynamic
    count += this.formControlModel.value.dynamicModel.length

    return count
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

  resetForm(): void {
    const result = confirm('Are you sure you want to reset the form?')

    if (result) {
      this.form.resetForm()
    }
  }
}

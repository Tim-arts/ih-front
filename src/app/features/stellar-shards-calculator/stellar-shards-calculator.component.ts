import { Component, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup } from '@angular/forms'

import {
  dynamicDefaultValues,
  DynamicModel,
  staticDefaultValues,
  StaticModel,
  StellarCountValues,
} from './stellar-shards-calculator'

@Component({
  selector: 'app-stellar-shards-calculator',
  templateUrl: './stellar-shards-calculator.component.html',
  styleUrls: ['./stellar-shards-calculator.component.scss'],
})
export class StellarShardsCalculatorComponent implements OnInit {
  formControlModel: FormGroup = this.formBuilder.group({
    staticModel: this.formBuilder.group(staticDefaultValues),
    dynamicModel: this.formBuilder.array([]),
  })
  StellarCountValues = StellarCountValues

  get dynamicModel(): FormArray {
    return this.formControlModel.get('dynamicModel') as FormArray
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    console.log(this.formControlModel.controls)
    this.loadDynamicData(dynamicDefaultValues)
  }

  loadDynamicData(data: DynamicModel[]): void {
    const control = <FormArray>this.formControlModel.get('dynamicModel')
    data.forEach((x: DynamicModel) => {
      control.push(this.patchValues(x.name, x.nodes))
    })
  }

  patchValues(name, nodes): FormGroup {
    return this.formBuilder.group({
      name: [name],
      nodes: this.formBuilder.group(nodes),
    })
  }

  onSubmit(): void {
    this.getHeroCount()
    this.getTotalSS()
    console.log(this.formControlModel.value.dynamicModel)
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
      this.formControlModel.controls.staticModel.reset()
      this.formControlModel.controls.dynamicModel.reset()
    }
  }

  addHero(): void {
    this.loadDynamicData(dynamicDefaultValues)
  }

  removeHero(index: number): void {
    const control = <FormArray>this.formControlModel.get('dynamicModel')
    control.removeAt(index)
  }
}

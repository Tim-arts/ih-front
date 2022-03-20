import { Component, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup } from '@angular/forms'

import {
  StaticModel,
  StellarShardsModel,
  VxValues,
} from './stellar-shards-calculator'

@Component({
  selector: 'app-stellar-shards-calculator',
  templateUrl: './stellar-shards-calculator.component.html',
  styleUrls: ['./stellar-shards-calculator.component.scss'],
})
export class StellarShardsCalculatorComponent implements OnInit {
  formControlModel: FormGroup = this.formBuilder.group({
    staticModel: this.formBuilder.group({
      V4: 0,
      V3: 0,
      V2: 0,
      V1: 0,
    }),
    dynamicModel: this.formBuilder.array([this.formBuilder.control(0)]),
  })
  VxValues = VxValues
  totalStellarShards: number = 0

  get dynamicModel() {
    return this.formControlModel.get('dynamicModel') as FormArray
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    console.log(this.formControlModel.value)
  }

  onSubmit(): void {
    console.log(this.getTotal(this.formControlModel.value))
  }

  addHero() {
    this.dynamicModel.push(this.formBuilder.control(0))
  }

  getTotal(values: StellarShardsModel): number {
    return (
      this.getTotalStatic(values.staticModel) +
      this.getTotalDynamic(values.dynamicModel)
    )
  }

  getTotalStatic(values: StaticModel): number {
    let value: number = 0

    Object.keys(values).map((key: string, index: number) => {
      let _value: number = values[key]

      switch (index) {
        case 0:
          _value *= this.VxValues.V4
          break
        case 1:
          _value *= this.VxValues.V3
          break
        case 2:
          _value *= this.VxValues.V2
          break
        case 3:
          _value *= this.VxValues.V1
          break
        default:
          console.warn(`Data can't be handled by any case`)
      }

      value += _value
    })

    return value
  }

  getTotalDynamic(values: number[]): number {
    console.log(values)
    return 0
  }
}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'

import {
  localStorageModel,
  staticDefaultValues,
  StaticModel,
  StellarCountValues,
} from './stellar-shards-calculator'
import { hasDataSavedInLocalStorage } from '../../shared/utils/helpers'
import { getObject, setObject } from '../../shared/utils/local-storage'

const KEY_LOCALSTORAGE: string = 'idle-heroes-ss-calculator'

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

  totalHeroCount: number = 0
  totalSSCount: number = 0
  totalSSDynamic: number = 0
  StellarCountValues = StellarCountValues

  constructor(
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    setTimeout(() => {
      if (hasDataSavedInLocalStorage()) {
        this.loadDataFromLocalStorage()
        this.updateSSCount()
        this.updateHeroCount()
      }
    }, 0)
  }

  ngAfterViewInit() {
    this.cdr.detectChanges()
  }

  onSubmit(): void {
    this.updateHeroCount()
    this.updateSSCount()
    this.updateLocalStorage()
  }

  resetForm(): void {
    const result = confirm(
      'Resetting the form will delete all current input data as well as the local backup, are you sure to proceed?'
    )

    if (result) {
      localStorage.removeItem(KEY_LOCALSTORAGE)
      window.location.reload()
    }
  }

  getHeroCount(): number {
    const staticData: Object = this.formControlModel.get('staticModel')?.value
    let value: number = 0

    Object.keys(staticData).forEach((key: string) => {
      if (key === 'bag') {
        return
      }

      value += Number(staticData[key])
    })

    value += this.formControlModel.get('dynamicModel')?.value.length

    return value
  }

  getTotalSS(): number {
    return this.getTotalStaticSS() + this.totalSSDynamic
  }

  updateForm(value: number | null) {
    if (value === null) {
      this.updateHeroCount()
      return
    }

    this.totalSSDynamic = value
    this.updateSSCount()
    this.updateHeroCount()
  }

  updateSSCount(): void {
    this.totalSSCount = this.getTotalSS()
  }

  updateHeroCount(): void {
    this.totalHeroCount = this.getHeroCount()
  }

  getTotalStaticSS(): number {
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
        case 4:
          _value
          break
        default:
          console.warn(`Data doesn't fit to any case`)
      }

      value += _value
    })

    return value
  }

  updateLocalStorage() {
    const values: StaticModel = this.formControlModel.get('staticModel')?.value
    const data: localStorageModel = getObject(KEY_LOCALSTORAGE)

    if (hasDataSavedInLocalStorage()) {
      data.staticModel = values
      setObject(KEY_LOCALSTORAGE, data)
    } else {
      const obj: localStorageModel = <localStorageModel>(<unknown>{
        staticModel: values,
        dynamicModel: null,
      })

      setObject(KEY_LOCALSTORAGE, obj)
    }
  }

  loadDataFromLocalStorage(): void {
    const data: localStorageModel = getObject(KEY_LOCALSTORAGE).staticModel

    if (!data) return

    Object.keys(data).forEach((key: string) => {
      this.formControlModel.get(`staticModel.${key}`)?.patchValue(data[key])
    })
  }
}

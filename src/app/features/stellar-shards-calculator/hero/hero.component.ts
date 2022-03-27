import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms'

import {
  dynamicDefaultValues,
  DynamicModel,
  DynamicNodeValuesModel,
  localStorageDynamicModel,
  localStorageModel,
  nodeValues,
  StellarCountValues,
} from '../stellar-shards-calculator'
import { getObject, setObject } from '../../../shared/utils/local-storage'
import {
  concatArrayToNumber,
  hasDataSavedInLocalStorage,
} from '../../../shared/utils/helpers'

const KEY_LOCALSTORAGE: string = 'idle-heroes-ss-calculator'

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit {
  formRoot!: FormGroup
  dynamicModel!: FormArray

  StellarCountValues = StellarCountValues
  totalSSCount: number = 0
  SSCountArray: number[] = []

  @Input() formArrayName!: string
  @Output() onSubmitValue = new EventEmitter<number | null>()

  constructor(
    private formBuilder: FormBuilder,
    private formGroupDirective: FormGroupDirective
  ) {}

  ngOnInit(): void {
    this.formRoot = this.formGroupDirective.control
    this.dynamicModel = this.formRoot.get(this.formArrayName) as FormArray

    if (
      hasDataSavedInLocalStorage() &&
      getObject(KEY_LOCALSTORAGE).dynamicModel
    ) {
      this.loadDataFromLocalStorage()
    } else {
      this.loadDefaultModel(dynamicDefaultValues)
    }

    this.loadSavedValues()
    this.onSubmitValue.emit(concatArrayToNumber(this.SSCountArray))
  }

  onSubmit(heroIndex: number, nodeIndex: number): void {
    this.updateNodes(heroIndex, nodeIndex)

    setTimeout(() => {
      this.calculateHeroStellarShards(heroIndex, nodeIndex)
      this.updateTotalSS()

      this.onSubmitValue.emit(this.totalSSCount)
    }, 0)
  }

  loadDefaultModel(data: DynamicModel[]): void {
    const control = <FormArray>this.dynamicModel
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

  addHero(): void {
    this.loadDefaultModel(dynamicDefaultValues)
    this.onSubmitValue.emit(null)
  }

  removeHero(index: number): void {
    const dataFromLocalStorage: localStorageModel = getObject(KEY_LOCALSTORAGE)

    this.dynamicModel.removeAt(index)
    this.onSubmitValue.emit(null)
    this.SSCountArray.splice(index, 1)

    if (!dataFromLocalStorage) return

    dataFromLocalStorage.dynamicModel!.splice(index, 1)
    setObject(KEY_LOCALSTORAGE, dataFromLocalStorage)
  }

  updateTotalSS() {
    this.totalSSCount = concatArrayToNumber(this.SSCountArray)
  }

  calculateHeroStellarShards(heroIndex: number, nodeIndex: number): void {
    const values: DynamicNodeValuesModel = this.dynamicModel.get(
      `${heroIndex}.nodes`
    )?.value
    const name: string = this.dynamicModel.get(`${heroIndex}.name`)?.value
    const associativeValuesArray: number[] = []
    let heroValue: number = 0

    for (let i = 0; i <= nodeIndex; i++) {
      let value: number = 0

      for (let j = 0; j < values[i]; j++) {
        value += nodeValues[i][j]
      }

      associativeValuesArray.push(value)
    }

    heroValue = concatArrayToNumber(associativeValuesArray)

    this.SSCountArray[heroIndex] = heroValue
    this.saveToLocalStorage({
      heroIndex: heroIndex,
      nodeIndex: nodeIndex,
      values: values,
      name: name,
    })
  }

  updateNodes(heroIndex, nodeIndex): void {
    // Update previous nodes by setting the maximum value
    for (let i = 0; i < nodeIndex; i++) {
      let patchValue: number

      if (i === 2 || i === 5 || i === 8 || i === 11) {
        patchValue = 10
      } else {
        patchValue = 30
      }

      this.dynamicModel.get(`${heroIndex}.nodes.${i}`)?.patchValue(patchValue)
    }

    // Update next nodes by setting the minimum value
    for (let i = 11; i > nodeIndex; i--) {
      this.dynamicModel.get(`${heroIndex}.nodes.${i}`)?.patchValue(0)
    }
  }

  resetHero(index: number): void {
    this.dynamicModel.controls[index].get('nodes')?.reset()
  }

  loadDataFromLocalStorage(): void {
    const control = <FormArray>this.dynamicModel
    const data: DynamicModel[] = getObject(KEY_LOCALSTORAGE).dynamicModel

    data.forEach((x: DynamicModel) => {
      control.push(this.patchValues(x.name, x.nodes))
    })
  }

  saveToLocalStorage(data: localStorageDynamicModel): void {
    const dataFromLocalStorage: localStorageModel = getObject(KEY_LOCALSTORAGE)
    const formattedData: localStorageModel =
      this.formatDataForLocalStorage(data)

    if (dataFromLocalStorage && dataFromLocalStorage.dynamicModel) {
      if (dataFromLocalStorage.dynamicModel[data.heroIndex!]) {
        dataFromLocalStorage.dynamicModel[data.heroIndex!].nodes =
          formattedData.dynamicModel![0].nodes
        dataFromLocalStorage.dynamicModel[data.heroIndex!].name =
          formattedData.dynamicModel![0].name
      } else {
        dataFromLocalStorage.dynamicModel.push({
          nodes: formattedData.dynamicModel![0].nodes,
          name: formattedData.dynamicModel![0].name,
        })
      }

      setObject(KEY_LOCALSTORAGE, dataFromLocalStorage)
    } else {
      setObject(KEY_LOCALSTORAGE, formattedData)
    }
  }

  formatDataForLocalStorage(hero: localStorageDynamicModel): localStorageModel {
    const array: number[] = Object.keys(hero.values).map(
      (index: string) => hero.values[index]
    )

    return <localStorageModel>(<unknown>{
      staticModel: null,
      dynamicModel: [
        {
          nodes: array,
          name: hero.name,
        },
      ],
    })
  }

  updateName(heroIndex: number): void {
    const data: localStorageModel = getObject(KEY_LOCALSTORAGE)
    const name: string = this.dynamicModel.get(`${heroIndex}.name`)?.value

    if (!hasDataSavedInLocalStorage()) return

    data.dynamicModel![heroIndex].name = name
    setObject(KEY_LOCALSTORAGE, data)
  }

  loadSavedValues(): void {
    const array: DynamicModel[] = this.dynamicModel.value

    array.forEach((values: DynamicModel, heroIndex: number) => {
      const tempArray = Object.keys(values.nodes).map(
        (value) => values.nodes[value]
      )
      let nodeIndex: number = -1

      tempArray.forEach((x: number, index: number) => {
        if (!x) {
          nodeIndex = index--
          return
        } else {
          nodeIndex = index
        }
      })

      this.calculateHeroStellarShards(heroIndex, nodeIndex)
    })
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms'

import {
  dynamicDefaultValues,
  dynamicDefaultValuesNodes,
  DynamicModel,
  DynamicModelNode,
  nodeValues,
  StellarCountValues,
} from '../stellar-shards-calculator'

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

  @Input() formArrayName!: string
  @Output() submitValue = new EventEmitter<number>()

  constructor(
    private formBuilder: FormBuilder,
    private formGroupDirective: FormGroupDirective
  ) {}

  ngOnInit(): void {
    this.formRoot = this.formGroupDirective.control
    this.dynamicModel = this.formRoot.get(this.formArrayName) as FormArray
    this.setupDynamicModel(dynamicDefaultValues)
  }

  onSubmit(value: number, element: HTMLInputElement): void {
    this.sanitizedUserInputValue(value, element)
    this.totalSSCount = this.getTotalStellarShards()
    this.submitValue.emit(this.totalSSCount)
  }

  setupDynamicModel(data: DynamicModel[]): void {
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
    this.setupDynamicModel(dynamicDefaultValues)
  }

  removeHero(index: number): void {
    const control = <FormArray>this.dynamicModel
    control.removeAt(index)
  }

  resetHero(index: number): void {
    const control = <FormArray>this.dynamicModel
    control.controls[index].get('nodes')?.reset()
  }

  sanitizedUserInputValue(value: number, element: HTMLInputElement): void {
    if (value === undefined || value === null) {
      return
    }

    if (value < 0) {
      element.value = '0'
      value = Number(element.value)
    }

    if (value > 30) {
      element.value = '30'
      value = Number(element.value)
    }
  }

  getTotalStellarShards(): number {
    const array: DynamicModel[] = this.dynamicModel.value
    let value: number = 0

    console.log(array)

    array.forEach((entry: DynamicModel) => {
      Object.keys(entry.nodes).forEach((node: string, index: number) => {
        const currentValue = entry.nodes[node]

        if (!currentValue) return

        value += this.getAssociatedValue(currentValue, index)
      })
    })

    return value
  }

  getAssociatedValue(nodeValue: number, nodePosition: number): number {
    const previousNodesValue: number = this.getPreviousNodeValue(nodePosition)
    const currentNodesValue: number = this.getCurrentNodeValue(
      nodeValue,
      nodePosition
    )

    return previousNodesValue + currentNodesValue
  }

  getPreviousNodeValue(nodePosition: number): number {
    // const array: number[] = partialNodeValues.slice(0, nodePosition)
    // return array.reduce((partialSum, a) => partialSum + a, 0)

    const values: DynamicModelNode = this.getMaximumValues()

    console.log(values)

    this.dynamicModel
      .get(`${nodePosition}.nodes`)
      ?.patchValue(values, { emitEvent: false })

    return 0
  }

  getCurrentNodeValue(nodeValue: number, nodePosition: number): number {
    const array: number[] = nodeValues[nodePosition]
    let value: number = 0

    for (let i = 0; i < nodeValue; i++) {
      value += array[i]
    }

    return value
  }

  getMaximumValues(): DynamicModelNode {
    const object: DynamicModelNode = dynamicDefaultValuesNodes

    Object.keys(object).forEach((key: string) => {
      if (key === 'V3-SPD') {
        object[key] = 10
      } else {
        object[key] = 30
      }
    })

    return object
  }
}

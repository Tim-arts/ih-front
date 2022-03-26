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

  onSubmit(event: Event, heroIndex: number, nodeIndex: number): void {
    this.updateNodes(heroIndex, nodeIndex)

    setTimeout(() => {
      this.totalSSCount = this.getTotalStellarShards()
      this.submitValue.emit(this.totalSSCount)
    }, 0)
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

  getTotalStellarShards(): number {
    console.log(this.dynamicModel.value)
    return 0
  }

  updateNodes(heroIndex, nodeIndex) {
    // Update previous nodes by setting the maximum value
    for (let i = 0; i < nodeIndex; i++) {
      this.dynamicModel.get(`${heroIndex}.nodes.${i}`)?.patchValue(30)
    }

    // Update next nodes by setting the minimum value
    for (let i = 11; i > nodeIndex; i--) {
      this.dynamicModel.get(`${heroIndex}.nodes.${i}`)?.patchValue(0)
    }
  }
}

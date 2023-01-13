import { Component, EventEmitter, Output } from '@angular/core'

import { ATK, HP, SE, SS, Gold, Spirit, TreeLevelModel } from './input-level'

@Component({
  selector: 'input-level',
  templateUrl: './input-level.component.html',
  styleUrls: ['./input-level.component.scss'],
})
export class InputLevelComponent {
  ATK: number = 0
  HP: number = 0
  SE: number = 0
  SS: number = 0
  maxHeroLevel: number = 350
  tenStars: number = 0
  gold: number = 0
  spirit: number = 0
  xStone: number = 0

  @Output() onUpdate: EventEmitter<TreeLevelModel> = new EventEmitter()

  wheelUpdateCharacteristics($event: WheelEvent) {
    setTimeout(() => {
      const direction = ((): number => {
        let _direction: number = 0

        if ($event instanceof WheelEvent) {
          _direction = $event.deltaY < 0 ? 1 : -1
        }
        if ($event instanceof KeyboardEvent) {
          _direction = $event.key === 'ArrowUp' ? 1 : -1
        }

        return _direction
      })()
      const target: HTMLInputElement = $event.target as HTMLInputElement
      const max = Number(target.max)
      const min = Number(target.min)
      const currentValue: number = Number(target.value)

      if (direction === -1 && currentValue - 1 < min) {
        target.value = String(min)
      }
      if (direction === 1 && currentValue + 1 > max) {
        target.value = String(max)
      }

      target.value = String(currentValue)
      this.updateUICharacteristics(currentValue)
    }, 0)
  }

  updateCharacteristics($event: Event) {
    const target: HTMLInputElement = $event.target as HTMLInputElement
    const max = Number(target.max)
    const min = Number(target.min)
    let value: number = Number(target.value)

    if (value > 120) value = max
    if (value < 0) value = min

    target.value = String(value)

    this.updateUICharacteristics(value)
  }

  updateUICharacteristics(value: number) {
    this.ATK = ATK[value]
    this.HP = HP[value]
    this.SS = SS[value]
    this.SE = SE[value]

    switch (true) {
      case value < 20:
        this.maxHeroLevel = 350
        this.tenStars = 0
        break
      case value > 19 && value < 40:
        this.maxHeroLevel = 360
        this.tenStars = 1
        break
      case value > 39 && value < 60:
        this.maxHeroLevel = 370
        this.tenStars = 2
        break
      case value > 59 && value < 80:
        this.maxHeroLevel = 380
        this.tenStars = 3
        break
      case value > 79 && value < 100:
        this.maxHeroLevel = 390
        this.tenStars = 4
        break
      case value > 99:
        this.maxHeroLevel = 400
        this.tenStars = 5
        break
      default:
        console.error('No range is associated to this value')
    }

    this.onUpdate.emit({
      totalSE: this.getTotalSE(value),
      totalSS: this.getTotalSS(value),
    })
  }

  getTotalSE(index: number): number {
    return this.getReduce(SE, index)
  }

  getTotalSS(index: number): number {
    return this.getReduce(SS, index)
  }

  getTotalSpirit(index: number): number {
    return this.getReduce(Spirit, index)
  }

  getTotalGold(index: number): number {
    return this.getReduce(Gold, index)
  }

  getReduce(array: number[], index): number {
    const reduce = (accumulator, currentValue) => accumulator + currentValue
    const newArray = array.slice(0, index + 1)
    return newArray.reduce(reduce, 0)
  }

  wheelUpdateResources($event: WheelEvent): void {
    setTimeout(() => {
      const direction = ((): number => {
        let _direction: number = 0

        if ($event instanceof WheelEvent) {
          _direction = $event.deltaY < 0 ? 1 : -1
        }
        if ($event instanceof KeyboardEvent) {
          _direction = $event.key === 'ArrowUp' ? 1 : -1
        }

        return _direction
      })()
      const target: HTMLInputElement = $event.target as HTMLInputElement
      const max = Number(target.max)
      const min = Number(target.min)
      const currentValue: number = Number(target.value)

      if (direction === -1 && currentValue - 1 < min) {
        target.value = String(min)
      }
      if (direction === 1 && currentValue + 1 > max) {
        target.value = String(max)
      }

      target.value = String(currentValue)
      this.updateUIResources(currentValue)
    }, 0)
  }

  updateResources($event: Event): void {
    const target: HTMLInputElement = $event.target as HTMLInputElement
    const max = Number(target.max)
    const min = Number(target.min)
    let value: number = Number(target.value)

    if (value > 120) value = max
    if (value < 0) value = min

    target.value = String(value)

    this.updateUIResources(value)
  }

  updateUIResources(value: number): void {
    this.spirit = Spirit[value]
    this.gold = Gold[value]

    switch (true) {
      case value < 1:
        this.xStone = 0
        break
      case value > 0 && value < 20:
        this.xStone = 500
        break
      case value > 19 && value < 40:
        this.xStone = 600
        break
      case value > 39 && value < 60:
        this.xStone = 700
        break
      case value > 59 && value < 80:
        this.xStone = 800
        break
      case value > 79:
        this.xStone = 900
        break
      default:
        console.error('No range is associated to this value')
    }

    this.onUpdate.emit({
      totalSpirit: this.getTotalSpirit(value),
      totalGold: this.getTotalGold(value),
    })
  }
}

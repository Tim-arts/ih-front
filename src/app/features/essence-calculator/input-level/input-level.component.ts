import { Component, EventEmitter, Output } from '@angular/core'

import { ATK, HP, SE, SS, TreeLevelModel } from './input-level'

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
  maxHeroLevel = 350

  @Output() onUpdate: EventEmitter<TreeLevelModel> = new EventEmitter()

  wheelUpdate($event: WheelEvent) {
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
      this.updateUI(currentValue)
    }, 0)
  }

  change($event: Event) {
    const value: number = Number(($event.target as HTMLInputElement)?.value)
    this.updateUI(value)
  }

  updateUI(value: number) {
    this.ATK = ATK[value]
    this.HP = HP[value]
    this.SS = SS[value]
    this.SE = SE[value]

    switch (true) {
      case value < 20:
        this.maxHeroLevel = 350
        break
      case value > 19 && value < 40:
        this.maxHeroLevel = 360
        break
      case value > 39 && value < 60:
        this.maxHeroLevel = 370
        break
      case value > 59 && value < 80:
        this.maxHeroLevel = 380
        break
      case value > 79 && value < 100:
        this.maxHeroLevel = 390
        break
      case value > 99:
        this.maxHeroLevel = 400
        break
      default:
        console.error('No range is associated to this value')
    }

    this.onUpdate.emit({
      totalSE: this.getTotalSE(value),
      totalSS: this.getTotalSS(value),
    })
  }

  getTotalSE(index): number {
    return this.getReduce(SE, index)
  }

  getTotalSS(index): number {
    return this.getReduce(SS, index)
  }

  getReduce(array: number[], index) {
    const reduce = (accumulator, currentValue) => accumulator + currentValue
    const newArray = array.slice(0, index + 1)
    return newArray.reduce(reduce, 0)
  }
}

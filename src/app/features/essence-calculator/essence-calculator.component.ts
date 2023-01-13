import { Component } from '@angular/core'

import { TreeLevelModel } from './input-level/input-level'

@Component({
  selector: 'app-essence-calculator',
  templateUrl: './essence-calculator.component.html',
  styleUrls: ['./essence-calculator.component.scss'],
})
export class EssenceCalculatorComponent {
  totalSSCount: number = 0
  totalSpiritualEssence: number = 0
  totalSpirit: number = 0
  totalGold: number = 0

  update($event: TreeLevelModel): void {
    if ($event.totalSS || $event.totalSS === 0)
      this.totalSSCount = $event.totalSS
    if ($event.totalSE || $event.totalSE === 0)
      this.totalSpiritualEssence = $event.totalSE
    if ($event.totalSpirit || $event.totalSpirit === 0)
      this.totalSpirit = $event.totalSpirit
    if ($event.totalGold || $event.totalGold === 0)
      this.totalGold = $event.totalGold
  }

  resetForm(): void {
    const result = confirm(
      'Resetting the form will delete all current input data, are you sure to proceed?'
    )

    if (result) {
      window.location.reload()
    }
  }
}

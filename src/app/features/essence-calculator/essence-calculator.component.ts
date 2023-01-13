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

  update($event: TreeLevelModel): void {
    this.totalSSCount = $event.totalSS
    this.totalSpiritualEssence = $event.totalSE
  }
}

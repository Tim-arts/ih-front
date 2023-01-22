import { Component, ViewEncapsulation } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SafeHTMLPipe } from '../../pipes/safe-html.pipe'

import {
  AddedHeroToBag,
  CasinoRollsBonus,
  EventRaidBonus,
  HandOfMidasBonus,
  HeroicSummonsBonus,
  ResourcesBonus,
  TavernQuestsBonus,
  Titles,
  USDCosts,
  VIPPoints,
} from './vip-levels'

@Component({
  standalone: true,
  selector: 'vip-levels',
  templateUrl: './vip-levels.component.html',
  styleUrls: ['./vip-levels.component.scss'],
  imports: [CommonModule, SafeHTMLPipe],
  encapsulation: ViewEncapsulation.None,
})
export class VIPLevelsComponent {
  titles: string[] = Titles

  generateCell(index: number): string {
    return `
      <tr>
        <th scope="row">${USDCosts[index]}</th>
        <td>${index}</td>
        <td>${VIPPoints[index]}</td>
        <td>${ResourcesBonus[index]}</td>
        <td>${HandOfMidasBonus[index]}</td>
        <td>${AddedHeroToBag[index]}</td>
        <td>${CasinoRollsBonus[index]}</td>
        <td>${HeroicSummonsBonus[index]}</td>
        <td>${TavernQuestsBonus[index]}</td>
        <td>${EventRaidBonus[index]}</td>
      </tr>
    `
  }

  generateArray() {
    const value: string[] = []

    for (let i = 0, count = 14; i < count; i++) {
      value.push(this.generateCell(i))
    }

    return value.join('')
  }
}

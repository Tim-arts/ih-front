import { Component } from '@angular/core'

@Component({
  selector: 'vip-levels',
  templateUrl: './vip-levels.component.html',
  styleUrls: ['./vip-levels.component.scss'],
})
export class VIPLevelsComponent {
  titles: string[] = [
    'Cost (USD)',
    'VIP Level',
    'VIP Points Needed',
    'Bonus, Gold, Spirit, Exp',
    'Hand of Midas Bonus',
    'Added Hero Bag Size',
    '10 for 8 Casino Rolls',
    '100 Heroic Summons Bonus 5*',
    'Tavern Quests Daily',
    'Event Raid Buys',
  ]
  USDCost: number[] = [
    0, 7, 14, 28, 63, 151.2, 378, 945, 2079, 3742.2, 5987.52, 8981.28, 13471.92,
    20207.88,
  ]
}

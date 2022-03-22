import { NgModule } from '@angular/core'

import { HeroModule } from './hero/hero.module'

import { StellarShardsCalculatorComponent } from './stellar-shards-calculator.component'
import { SharedModule } from '../shared.module'

@NgModule({
  declarations: [StellarShardsCalculatorComponent],
  exports: [StellarShardsCalculatorComponent],
  imports: [SharedModule, HeroModule],
})
export class StellarShardsCalculatorModule {}

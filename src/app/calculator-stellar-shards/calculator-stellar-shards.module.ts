import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CalculatorStellarShardsComponent } from './calculator-stellar-shards.component'

@NgModule({
  declarations: [CalculatorStellarShardsComponent],
  exports: [CalculatorStellarShardsComponent],
  imports: [CommonModule],
})
export class CalculatorStellarShardsModule {}

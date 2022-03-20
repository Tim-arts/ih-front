import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatTooltipModule } from '@angular/material/tooltip'

import { StellarShardsCalculatorComponent } from './stellar-shards-calculator.component'
import { FeaturesModule } from '../features.module'

@NgModule({
  declarations: [StellarShardsCalculatorComponent],
  exports: [StellarShardsCalculatorComponent],
  imports: [
    CommonModule,
    FeaturesModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
})
export class StellarShardsCalculatorModule {}

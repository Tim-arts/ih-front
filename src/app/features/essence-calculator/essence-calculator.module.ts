import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { EssenceCalculatorComponent } from './essence-calculator.component'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { InputLevelComponent } from './input-level/input-level.component'

@NgModule({
  declarations: [EssenceCalculatorComponent, InputLevelComponent],
  exports: [EssenceCalculatorComponent],
  imports: [
    CommonModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
  ],
})
export class EssenceCalculatorModule {}

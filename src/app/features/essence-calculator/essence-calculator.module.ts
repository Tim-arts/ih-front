import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { EssenceCalculatorComponent } from './essence-calculator.component'

@NgModule({
  declarations: [EssenceCalculatorComponent],
  exports: [EssenceCalculatorComponent],
  imports: [CommonModule],
})
export class EssenceCalculatorModule {}

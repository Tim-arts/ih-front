import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BrowserModule } from '@angular/platform-browser'

import { VIPLevelsComponent } from './vip-levels.component'

@NgModule({
  declarations: [VIPLevelsComponent],
  exports: [VIPLevelsComponent],
  imports: [CommonModule, BrowserModule],
})
export class VipLevelsModule {}

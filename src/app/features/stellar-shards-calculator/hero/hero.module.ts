import { NgModule } from '@angular/core'

import { HeroComponent } from './hero.component'
import { SharedModule } from '../../shared.module'

@NgModule({
  declarations: [HeroComponent],
  exports: [HeroComponent],
  imports: [SharedModule],
})
export class HeroModule {}

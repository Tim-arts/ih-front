import { NgModule } from '@angular/core'

import { HeroComponent } from './hero.component'
import { SharedModule } from '../../shared.module'

import { SetBackgroundImageDirective } from '../directives/set-background-image.directive'

@NgModule({
  declarations: [HeroComponent, SetBackgroundImageDirective],
  exports: [HeroComponent],
  imports: [SharedModule],
})
export class HeroModule {}

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatToolbarModule } from '@angular/material/toolbar'

import { HeaderComponent } from './components/header/header.component'
import { FooterComponent } from './components/footer/footer.component'

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  exports: [HeaderComponent, FooterComponent],
  imports: [CommonModule, MatToolbarModule],
})
export class SharedModule {}

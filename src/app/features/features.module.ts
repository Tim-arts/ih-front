import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
  declarations: [],
  exports: [ReactiveFormsModule],
  imports: [BrowserAnimationsModule, CommonModule, ReactiveFormsModule],
})
export class FeaturesModule {}

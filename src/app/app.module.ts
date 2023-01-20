import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { SharedModule } from './shared/shared.module'
import { StellarShardsCalculatorModule } from './features/stellar-shards-calculator/stellar-shards-calculator.module'
import { EssenceCalculatorModule } from './features/essence-calculator/essence-calculator.module'

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    StellarShardsCalculatorModule,
    EssenceCalculatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

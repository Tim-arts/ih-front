import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { StellarShardsCalculatorComponent } from './features/stellar-shards-calculator/stellar-shards-calculator.component'

const routes: Routes = [
  { path: '', redirectTo: '/stellar-shards-calculator', pathMatch: 'full' },
  {
    path: 'stellar-shards-calculator',
    component: StellarShardsCalculatorComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

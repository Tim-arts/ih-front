import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { StellarShardsCalculatorComponent } from './features/stellar-shards-calculator/stellar-shards-calculator.component'
import { EssenceCalculatorComponent } from './features/essence-calculator/essence-calculator.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/stellar-shards-calculator',
    pathMatch: 'full',
  },
  {
    path: 'stellar-shards-calculator',
    component: StellarShardsCalculatorComponent,
  },
  {
    path: 'essence-calculator',
    component: EssenceCalculatorComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

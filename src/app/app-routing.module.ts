import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { StellarShardsCalculatorComponent } from './features/stellar-shards-calculator/stellar-shards-calculator.component'
import { EssenceCalculatorComponent } from './features/essence-calculator/essence-calculator.component'
import { VIPLevelsComponent } from './features/vip-levels/vip-levels.component'
import { MaximizingHoStatsComponent } from './features/maximizing-ho-stats/maximizing-ho-stats.component'
import { PrioritySublimationsComponent } from './features/priority-sublimations/priority-sublimations.component'

const routes: Routes = [
  {
    path: 'stellar-shards-calculator',
    component: StellarShardsCalculatorComponent,
  },
  {
    path: 'essence-calculator',
    component: EssenceCalculatorComponent,
  },
  {
    path: 'vip-levels',
    component: VIPLevelsComponent,
  },
  {
    path: 'max-ho-stats',
    component: MaximizingHoStatsComponent,
  },
  {
    path: 'priority-sublimations',
    component: PrioritySublimationsComponent,
  },
  {
    path: '',
    redirectTo: '/stellar-shards-calculator',
    pathMatch: 'full',
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

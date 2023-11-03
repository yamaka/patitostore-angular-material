import { StoreComponent } from './pages/store/store.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'store', component: StoreComponent },
  // { path: 'warehouse', component: WarehouseComponent },
  {
    path: 'warehouse',
    loadChildren: () =>
      import('./pages/warehouse/warehouse.module').then(
        (m) => m.WarehouseModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

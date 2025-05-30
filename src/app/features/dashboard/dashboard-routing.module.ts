import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'farmacos',
        loadChildren: () =>
          import('../farmacos/farmacos.module').then((m) => m.FarmacosModule),
      },
      {
        path: 'favoritos',
        loadChildren: () =>
          import('../favoritos/favoritos.module').then(
            (m) => m.FavoritosModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

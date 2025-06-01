import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FarmacosComponent } from './features/farmacos/farmacos.component';
import { FavoritosComponent } from './features/favoritos/favoritos.component';
import { FormulasComponent } from './features/formulas/formulas.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/auth/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./features/auth/register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
  {
    path: 'info',
    loadChildren: () =>
      import('./features/info/info.module').then((m) => m.InfoModule),
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    // loadChildren: () =>
    //   import('./features/dashboard/dashboard.module').then(
    //     (m) => m.DashboardModule
    //   ),

    children: [
      {
        path: 'farmacos',
        loadChildren: () =>
          import('./features/farmacos/farmacos.module').then(
            (m) => m.FarmacosModule
          ),
      },
      {
        path: 'bacterias',
        loadChildren: () =>
          import('./features/bacterias/bacterias.module').then(
            (m) => m.BacteriasModule
          ),
      },
      {
        path: 'favoritos',
        loadChildren: () =>
          import('./features/favoritos/favoritos.module').then(
            (m) => m.FavoritosModule
          ),
      },
      {
        path: 'formulas',
        loadChildren: () =>
          import('./features/formulas/formulas.module').then(
            (m) => m.FormulasModule
          ),
      },
      {
        path: 'cuenta',
        loadChildren: () =>
          import('./features/cuenta/cuenta.module').then((m) => m.CuentaModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

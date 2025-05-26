import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { FarmacosComponent } from './features/farmacos/farmacos.component';
import { FavoritosComponent } from './features/favoritos/favoritos.component';
import { FormulasComponent } from './features/formulas/formulas.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'farmacos', component: FarmacosComponent },
  { path: 'favoritos', component: FavoritosComponent },
  { path: 'formulas', component: FormulasComponent },
 // { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

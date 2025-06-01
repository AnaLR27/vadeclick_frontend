import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormulasComponent } from './formulas.component';

const routes: Routes = [{ path: '', component: FormulasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormulasRoutingModule {}

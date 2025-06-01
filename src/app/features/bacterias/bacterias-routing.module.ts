import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BacteriasComponent } from './bacterias.component';

const routes: Routes = [{ path: '', component: BacteriasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BacteriasRoutingModule {}

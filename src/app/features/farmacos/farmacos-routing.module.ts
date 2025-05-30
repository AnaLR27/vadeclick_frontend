import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FarmacosComponent } from './farmacos.component';


const routes: Routes = [{ path: '', component: FarmacosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmacosRoutingModule {}

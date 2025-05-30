import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FarmacosComponent } from './farmacos.component';
import { FarmacosRoutingModule } from './farmacos-routing.module';



@NgModule({
  declarations: [
    FarmacosComponent
  ],
  imports: [
    CommonModule,
    FarmacosRoutingModule
  ]
})
export class FarmacosModule { }

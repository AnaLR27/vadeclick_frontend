import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuentaComponent } from './cuenta.component';
import { CuentaRoutingModule } from './cuenta-routing.module';



@NgModule({
  declarations: [
    CuentaComponent
  ],
  imports: [
    CommonModule,
    CuentaRoutingModule
  ]
})
export class CuentaModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BacteriasComponent } from './bacterias.component';
import { BacteriasRoutingModule } from './bacterias-routing.module';



@NgModule({
  declarations: [
    BacteriasComponent
  ],
  imports: [
    CommonModule,
    BacteriasRoutingModule
  ]
})
export class BacteriasModule { }

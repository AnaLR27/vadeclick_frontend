import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FarmacosComponent } from './farmacos.component';
import { FarmacosRoutingModule } from './farmacos-routing.module';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [FarmacosComponent],
  imports: [
    CommonModule,
    MatCard,
    MatFormField,
    MatInput,
    MatLabel,
    MatIcon,
    FormsModule,
    FarmacosRoutingModule,
  ],
})
export class FarmacosModule {}

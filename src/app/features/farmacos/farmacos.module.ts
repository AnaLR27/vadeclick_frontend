import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FarmacosComponent } from './farmacos.component';
import { FarmacosRoutingModule } from './farmacos-routing.module';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import {  FormsModule } from '@angular/forms';
import { ButtonModule } from '../../components/button/button.module';
import { FarmacosListModule } from '../../components/farmacos-list/farmacos-list.module';

@NgModule({
  declarations: [FarmacosComponent],
  imports: [
    CommonModule,
    MatCard,
    MatFormField,
    MatInput,
    MatLabel,
    MatIcon,
    MatIconModule,
    FormsModule,
    ButtonModule,
    FarmacosListModule,
    FarmacosRoutingModule,
  ],
})
export class FarmacosModule {}

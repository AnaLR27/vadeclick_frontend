import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FarmacosComponent } from './farmacos.component';
import { FarmacosRoutingModule } from './farmacos-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule, MatLabel } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '../../components/button/button.module';
import { FarmacosListModule } from '../../components/farmacos-list/farmacos-list.module';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [FarmacosComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    MatIconModule,
    FormsModule,
    ButtonModule,
    FarmacosListModule,
    FarmacosRoutingModule,
  ],
})
export class FarmacosModule {}

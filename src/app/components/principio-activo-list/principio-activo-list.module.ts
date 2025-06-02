import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatList, MatListItem, MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ButtonBarModule } from '../button-bar/button-bar.module';
import { PrincipioActivoListComponent } from './principio-activo-list.component';
import { FarmacosListModule } from "../farmacos-list/farmacos-list.module";

@NgModule({
  declarations: [PrincipioActivoListComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatList,
    MatListItem,
    ButtonBarModule,
    FarmacosListModule,
    FarmacosListModule
],
  exports: [PrincipioActivoListComponent],
})
export class PrincipioActivoListModule {}

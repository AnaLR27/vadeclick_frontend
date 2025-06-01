import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FarmacosListComponent } from './farmacos-list.component';
import { MatList, MatListItem, MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ButtonBarModule } from '../button-bar/button-bar.module';

@NgModule({
  declarations: [FarmacosListComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatList,
    MatListItem,
    ButtonBarModule
  ],
  exports: [FarmacosListComponent],
})
export class FarmacosListModule {}

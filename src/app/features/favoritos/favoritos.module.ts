import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritosComponent } from './favoritos.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FavoritosRoutingModule } from './favoritos-routing.module';
import { MatList, MatListItem } from '@angular/material/list';
import { ButtonBarModule } from '../../components/button-bar/button-bar.module';

@NgModule({
  declarations: [FavoritosComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatList,
    MatListItem,
    RouterModule, // Para usar routerLink
    ButtonBarModule,
    FavoritosRoutingModule,
  ],
  exports: [FavoritosComponent],
})
export class FavoritosModule {}

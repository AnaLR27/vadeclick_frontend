import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuentaComponent } from './cuenta.component';
import { CuentaRoutingModule } from './cuenta-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [CuentaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    CuentaRoutingModule,
  ],
})
export class CuentaModule {}

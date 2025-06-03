import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { RegisterComponent } from './register.component';
import { RouterModule } from '@angular/router';
import { RegisterRoutingModule } from './register-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ButtonModule } from '../../../components/button/button.module';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule, // necesario para routerLink en el template
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    ButtonModule,
    RegisterRoutingModule,
  ],
})
export class RegisterModule {}

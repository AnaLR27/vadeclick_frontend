import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BacteriasComponent } from './bacterias.component';
import { BacteriasRoutingModule } from './bacterias-routing.module';

// Angular Material Modules (SÓLO módulos, nada de componentes)
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonModule } from '../../components/button/button.module';
import { PrincipioActivoListModule } from '../../components/principio-activo-list/principio-activo-list.module';

@NgModule({
  declarations: [BacteriasComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    ButtonModule,
    PrincipioActivoListModule,
    BacteriasRoutingModule,
  ],
})
export class BacteriasModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormulasComponent } from './formulas.component';
import { FormulasRoutingModule } from './formulas-routing.module';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ButtonModule } from '../../components/button/button.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormulaModalModule } from '../../components/formula-modal/formula-modal.module';

@NgModule({
  declarations: [FormulasComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    ButtonModule,
    FormulaModalModule,
    MatFormFieldModule,
    FormulasRoutingModule,
  ],
})
export class FormulasModule {}

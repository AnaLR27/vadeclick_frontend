import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormulasComponent } from './formulas.component';
import { FormulasRoutingModule } from './formulas-routing.module';

@NgModule({
  declarations: [FormulasComponent],
  imports: [CommonModule, FormulasRoutingModule],
})
export class FormulasModule {}

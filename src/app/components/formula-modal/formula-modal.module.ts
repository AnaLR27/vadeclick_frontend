import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormulaModalComponent } from './formula-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ModalWrapperModule } from '../modal-wapper/modal-wrapper.module';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [FormulaModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ButtonModule,
    ModalWrapperModule,
  ],
  exports: [FormulaModalComponent],
})
export class FormulaModalModule {}

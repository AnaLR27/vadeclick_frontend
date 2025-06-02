import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonBarComponent } from './button-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ButtonModule } from "../button/button.module";

@NgModule({
  declarations: [ButtonBarComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule, ButtonModule],
  exports: [ButtonBarComponent, ButtonModule],
})
export class ButtonBarModule {}

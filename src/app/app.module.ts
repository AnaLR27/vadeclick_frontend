import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AuthModule } from './features/auth/auth.module';
import { FarmacosModule } from './features/farmacos/farmacos.module';
import { FavoritosModule } from './features/favoritos/favoritos.module';
import { FormulasModule } from './features/formulas/formulas.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    FarmacosModule,
    FavoritosModule,
    FormulasModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

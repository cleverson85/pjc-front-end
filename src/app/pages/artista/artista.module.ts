import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ArtistaRoutingModule } from './artista-routing.module';

import { ArtistaComponent } from './artista.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ArtistaRoutingModule
  ],
  declarations: [
    ArtistaComponent
  ]
})
export class ArtistaModule { }

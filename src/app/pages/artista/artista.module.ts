import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ArtistaComponent } from './artista.component';

import { ArtistaRoutingModule } from './artista-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ArtistaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ArtistaRoutingModule,
    SharedModule
  ],
})
export class ArtistaModule { }

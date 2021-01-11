import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArtistaResolverGuard } from 'src/app/guards/artista.resolver.guard';

import { ArtistaComponent } from './artista.component';

const routes: Routes = [
  { path: 'artista-edit', component: ArtistaComponent, resolve: { artista: ArtistaResolverGuard } },
  { path: 'artista-edit/:id', component: ArtistaComponent, resolve: { artista: ArtistaResolverGuard } }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ArtistaRoutingModule { }

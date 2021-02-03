import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';

import { ArtistaService } from '../providers/artista.service';

import { RoutesApi } from './../shared/routesAPI.enum';
import { Artista } from './../models/artista';

@Injectable({
  providedIn: 'root'
})
export class ArtistaResolverGuard implements Resolve<Artista> {

  constructor(private artistaService: ArtistaService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Artista> {

    if (route.params && route.params['id']) {
      return this.artistaService.getById(`${RoutesApi.Artista}/${route.params['id']}`);
    }

    return of({
      id: null,
      nome: null,
      albuns: null,
      imagens: null
    });
  }

}

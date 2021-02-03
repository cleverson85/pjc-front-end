import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RoutesApi } from '../shared/routesAPI.enum';
import { Artista } from '../models/artista';

import ApiBase from './common/apiBase.service';

@Injectable({
  providedIn: 'root'
})
export class ArtistaService extends ApiBase {

  saveArtista(artista: Artista): Observable<Artista> {
    if (artista.id){
      return this.update<Artista>(artista, RoutesApi.Artista);
    } else {
      return this.save<Artista>(artista, RoutesApi.Artista);
    }
  }

  getByName(name: string, order?: 'A'): Observable<Artista[]> {
    return this.get<Artista>(`${RoutesApi.Artista}?nome=${name}&order=${order}`);
  }
}

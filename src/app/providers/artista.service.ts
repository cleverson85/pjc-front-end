import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RoutesApi } from '../shared/routesAPI.enum';
import { Artista } from '../models/artista';

import ApiBase from './common/apiBase.service';
import { HttpParams } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

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

  getArtista(page?: any, nome?: string, order?: string, value?: string): Observable<Artista[]> {
    return this.get<Artista>(`${RoutesApi.Artista}?page=${page || 1}&nome=${nome || ""}&order=${order || "A"}&value=${value}`);
  }
}

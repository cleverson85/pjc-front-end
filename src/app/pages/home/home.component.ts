import { Component, EventEmitter, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { RoutesApi } from './../../shared/routesAPI.enum';
import { Artista } from "src/app/models/artista";

import { ArtistaService } from 'src/app/providers/artista.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  artistas: Artista[] = [];
  detail = new EventEmitter<Artista>();
  subscription = new Subscription();

  constructor(private artistaService: ArtistaService) { }

  ngOnInit(): void {
    this.getArtistas();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getArtistas(): void {
    this.subscription.add(this.artistaService.get<Artista>(RoutesApi.Artista)
      .subscribe((res) => {
        this.artistas = res;
      })
    );
  }

  getAlbuns(artista: Artista): any {
    return artista.albuns.map(e => e.nome).join(', ');
  }

  orderDetail(artista: Artista): void {
    this.detail.emit(artista);
    alert(`Artista id is ${JSON.stringify(artista)}`);
  }

  onPageChange(data: any) {
    this.artistas = data;
  }
}

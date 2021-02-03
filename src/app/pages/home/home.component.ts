import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { RoutesApi } from './../../shared/routesAPI.enum';
import { Artista } from "src/app/models/artista";

import { ArtistaService } from 'src/app/providers/artista.service';
import { ToasterService } from 'src/app/providers/common/toaster.service';
import { ModalService } from 'src/app/providers/modal.service';

import { PaginationComponent } from 'src/app/components/pagination/pagination.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  artistas: Artista[] = [];
  list: Artista[] = [];
  detail = new EventEmitter<Artista>();
  subscription = new Subscription();
  pageComp: PaginationComponent;
  placeholder = "Nome Artista";
  value = 'A';

  constructor(private artistaService: ArtistaService,
              private modalService: ModalService,
              private toaster: ToasterService) { }

  ngOnInit() {
    this.getArtistas();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getArtistas() {
    this.subscription.add(this.artistaService.get<Artista>(RoutesApi.Artista)
      .subscribe((result) => {
        this.artistas = result;
        this.list = this.artistas.slice(0, 10);
      })
    );
  }

  getAlbuns(artista: Artista): any {
    return artista.albuns.slice(0, 3).map(e => e.nome).join(', ') + ' ...';
  }

  getSrc(imagem: any): string {
    return imagem.url;
  }

  detalhes(artista: Artista) {
    this.modalService.showModal(artista);
    // this.detail.emit(artista);
    // alert(`Artista id is ${JSON.stringify(artista)}`);
  }

  onPageChange(data: any) {
    this.list = data;
  }

  onRefresh(artistas: Artista[]) {
    debugger;

    if (artistas.length > 0) {
      this.artistas = artistas;
      this.list = this.artistas.slice(0, 10);

      //const obj = this.pageService.handlePages(artistas);

      return;
    }

    this.getArtistas();
  }

  consultar(value: string) {
    this.subscription.add(this.artistaService.getByName(value)
      .subscribe((result) => {
        this.artistas = result;
        this.list = this.artistas.slice(0, 10);
      },
      (e: HttpErrorResponse) => {
        const { error } = e;
        this.toaster.showToastError(error.message);
      })
    );
  }

  changePlaceholder(type: string, value: string) {
    this.placeholder = `Nome ${type}`;
    this.value = value;
  }
}

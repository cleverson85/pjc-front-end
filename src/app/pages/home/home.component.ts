import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { Artista } from "src/app/models/artista";

import { ArtistaService } from 'src/app/providers/artista.service';
import { ModalService } from 'src/app/providers/modal.service';
import { PageService } from 'src/app/providers/page.service';

import { PaginationComponent } from 'src/app/components/pagination/pagination.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(PaginationComponent) childPagination: PaginationComponent;

  artistas: Artista[] = [];
  list: Artista[] = [];
  detail = new EventEmitter<Artista>();
  subscription = new Subscription();
  pageComp: PaginationComponent;
  placeholder = "Nome Artista";
  value = 'A';
  totalRow: number;
  order: boolean = true;
  orderAux: string = 'A';

  constructor(private artistaService: ArtistaService,
              private modalService: ModalService,
              private pageService: PageService) { }

  ngOnInit() {
    this.getArtistas();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getArtistas(page?: number, nome?: string) {
    this.subscription.add(this.artistaService.getArtista(page, nome, this.orderAux, this.value)
      .subscribe((result: any) => {
        const { total, model } = result;
        this.artistas = model;
        this.totalRow = total.length;

        this.onRefresh(this.totalRow);

        this.order = this.orderAux == 'A' ? false : true;
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
  }

  onPageChange(page: any) {
    this.getArtistas(page);
  }

  consultar(nome: string) {
    this.getArtistas(0, nome);
  }

  changePlaceholder(type: string, value: string) {
    this.placeholder = `nome ${type}`;
    this.value = value;
  }

  onRefresh(total: number) {
    try {
      const obj = this.pageService.handlePages(total)

      this.childPagination.totalPages = obj.totalPages;
      this.childPagination.pageNumbers = obj.pageNumber;
    } catch(e) {

    }
  }

  setOrder() {
    this.orderAux = this.order ? 'A' : 'D';
    this.getArtistas();
  }
}

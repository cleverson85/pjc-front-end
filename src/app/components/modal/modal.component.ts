import { Component, Input, OnInit } from '@angular/core';
import { Artista } from './../../models/artista';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() artista: Artista;

  constructor() { }

  ngOnInit() {
    this.getAlbuns();
  }

  getAlbuns(): any {
    return this.artista.albuns.map(e => e.nome).join(', ');
  }

  getSrc(imagem: any) {
    //return imagem.url;
  }
}

import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Artista } from 'src/app/models/artista';

import { ModalService } from 'src/app/providers/modal.service';
import { ToasterService } from 'src/app/providers/common/toaster.service';
import { ArtistaService } from 'src/app/providers/artista.service';

import { RoutesApi } from 'src/app/shared/routesAPI.enum';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {
  @Input() route: string;
  @Input() delete: Artista | any;
  @Output() artistas = new EventEmitter();
  @Output() detalhe = new EventEmitter();

  constructor(private router: Router,
              private modalService: ModalService,
              private artistaService: ArtistaService,
              private toaster: ToasterService) { }

  ngOnInit() { }

  editar() {
    this.router.navigate([this.route]);
  }

  deletar() {
    if (this.delete) {
      this.modalService.showConfirm('Atenção', `Confirma exclusão do artista ${this.delete.nome}?`)
      .subscribe((result: boolean)  => {
        if (result) {
          this.artistaService.delete<Artista>(this.delete.id, RoutesApi.Artista)
            .subscribe((result: any) => {
              const { message } = result;
              this.artistas.emit();

              this.toaster.showToastSuccess(message);
            },
            (e: HttpErrorResponse) => {
              const { error } = e;
              this.toaster.showToastError(error.message);
            })
        }
      });
    }
  }

  detalhar() {
    this.detalhe.emit();
  }
}

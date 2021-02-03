import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

import { ArtistaService } from './../../providers/artista.service';
import { ToasterService } from 'src/app/providers/common/toaster.service';

import { Artista } from './../../models/artista';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.scss']
})
export class ArtistaComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  submitted = false;
  subscription = new Subscription();
  artista: Artista;
  files: File[] = [];
  deletedFiles: any = [];
  fileNames: { id: number; nome: string; }[] = [];
  titulo: string;

  constructor(private artistaService: ArtistaService,
              private formBuilder: FormBuilder,
              private location: Location,
              private activatedRoute: ActivatedRoute,
              private toaster: ToasterService) { }

  ngOnInit() {
    this.artista = this.activatedRoute.snapshot.data['artista'];

    this.configurarImagemLista(this.artista);
    this.configurarTitulo(this.artista);

    this.formGroup = this.formBuilder.group({
      id: [ this.artista?.id ],
      artista: [ this.artista?.nome, Validators.required ],
      album: [ this.artista?.albuns?.map(e => e.nome).join(', '), Validators.required ],
      files: [ null ]
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  hasError(field: string) {
    return this.formGroup.get(field).errors;
  }

  save() {
    this.submitted = true;

    if (this.formGroup.valid) {
      this.subscription.add(this.artistaService.saveArtista(this.formGroup.value)
        .subscribe((result: any) => {
          const { message, id } = result;

          this.deleteFiles();
          this.uploadFiles(message, id);
        },
        (e: HttpErrorResponse) => {
          const { error } = e;
          this.toaster.showToastError(error.message);
        })
      );
    }
  }

  uploadFiles(message: string, id: number) {
    if (this.files.length > 0) {
      id = this.artista ? this.artista.id : id;

      this.artistaService.upload(this.files, id, this.formGroup.get('artista').value)
      .subscribe((result: any) => {
        this.toaster.showToastSuccess(message);
        this.location.back();
      },
      e => {
        this.toaster.showToastError(e.message);
      })
    }
  }

  deleteFiles() {
    if (this.deletedFiles.length > 0) {
      this.artistaService.deleteFiles(this.deletedFiles)
        .subscribe((result) => {
          if (this.files.length == 0) {
            this.location.back();
          }
        });
    }
  }

  onChange(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.fileNames.push({ id: 0, nome: files[i].name });
      this.files.push(files[i]);
    }
  }

  removeFromList(index: number) {
    this.deletedFiles.push(this.fileNames.splice(index, 1)[0]);
  }

  configurarImagemLista(artista: any) {
    const { imagens } = artista;
    if (imagens) {
      imagens.map((e: any) => { this.fileNames.push({ id: e.id, nome: e.nome }) });
    }
  }

  configurarTitulo(artista: any) {
    this.titulo = artista.id > 0 ? "Editar Artista" : "Cadastrar Artista"
  }
}

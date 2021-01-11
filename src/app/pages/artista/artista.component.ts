import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

import { ArtistaService } from './../../providers/artista.service';
import { ToasterService } from 'src/app/providers/common/toaster.service';

import { Artista } from './../../models/artista';
import { error } from '@angular/compiler/src/util';
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
  arquivos: Set<File>;

  constructor(private artistaService: ArtistaService,
              private formBuilder: FormBuilder,
              private location: Location,
              private activatedRoute: ActivatedRoute,
              private toaster: ToasterService) { }

  ngOnInit(): void {
    const artista = this.activatedRoute.snapshot.data['artista'];

    this.formGroup = this.formBuilder.group({
      artista: [ artista?.nome, Validators.required ],
      album: [ artista?.albuns?.map(e => e.nome).join(', '), Validators.required ],
      arquivo: [ null ]
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  hasError(field: string) {
    return this.formGroup.get(field).errors;
  }

  save(): void {
    this.submitted = true;

    if (this.formGroup.valid) {
      this.subscription.add(this.artistaService.saveArtista(this.formGroup.value)
        .subscribe((res: any) => {
          const { status, message } = res;

          // this.artistaService.upload(this.arquivos)
          //   .subscribe((res: any) => {

          //   },
          //   e => {
          //     console.log(e);
          //   })

          this.toaster.showToastSuccess(message);
          this.location.back();
        },
        (e: HttpErrorResponse) => {
          const { error } = e;
          this.toaster.showToastError(error.message);
        })
      );
    }
  }

  onChange(files: FileList) {
    const fileNames = [];
    this.arquivos = new Set();

    for (let i = 0; i < files.length; i++) {
      fileNames.push(files[i].name);
      this.arquivos.add(files[i]);
    }

    document.getElementById('selectedFiles').innerHTML = fileNames.join(', ');
  }
}

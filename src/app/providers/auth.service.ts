import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { HandleErrorService } from './handleError.service';
import { ToasterService } from './common/toaster.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private autenticado = false;
  private JwtToken: string
  private readonly API = environment.API;

  mostrarMenuEmitter = new EventEmitter<boolean>()

  get token () {
    return this.JwtToken;
  }

  constructor(private httpClient: HttpClient,
              private handleErrorService: HandleErrorService,
              private router: Router,
              private toaster: ToasterService) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  logar(usuario: Usuario): void {
    this.httpClient.post(`${this.API}session`, JSON.stringify(usuario), this.httpOptions)
      .subscribe((res: any) => {
        this.autenticado = res.autenticado;
        this.mostrarMenuEmitter.emit(this.autenticado);

        const { token } = res;
        this.JwtToken = token;
        this.router.navigate(['/']);
      },
      (e: HttpErrorResponse) => {
        const { error } = e;
        this.toaster.showToastError(error.message);
      });
  }

  usuarioAutenticado(): boolean {
    this.mostrarMenuEmitter.emit(this.autenticado);
    return this.autenticado;
  }
}

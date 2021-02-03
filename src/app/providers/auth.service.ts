import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { interval, Subscription, timer, Observable } from 'rxjs';

import { ToasterService } from './common/toaster.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API = environment.API;

  mostrarMenuEmitter = new EventEmitter<boolean>();
  tokenHelper = new JwtHelperService();

  get token () {
    return localStorage.getItem('token')
  }

  constructor(private httpClient: HttpClient,
              private router: Router,
              private toaster: ToasterService) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  login(usuario: Usuario) {
    this.httpClient.post(`${this.API}session`, JSON.stringify(usuario), this.httpOptions)
      .subscribe((result: any) => {
        this.configurarSessao(result);
      },
      (e: HttpErrorResponse) => {
        const { error } = e;
        this.toaster.showToastError(error.message);
      });
  }

  logOut() {
    const { email } = this.tokenHelper.decodeToken(localStorage.getItem('token'));
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('token');

    this.mostrarMenuEmitter.emit(false);

    this.router.navigate(['']);
  }


  configurarSessao(result: any) {
    const { token, autenticado, refreshToken } = result;

    if (autenticado) {
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('token', token);

      this.refreshToken();

      this.router.navigate(['/home']);
    } else {
      this.mostrarMenuEmitter.emit(false);
      this.router.navigate(['']);
    }
  }

  usuarioAutenticado() {
    this.refreshToken();

    const isExpired = this.tokenHelper.isTokenExpired(localStorage.getItem('token'));
    this.mostrarMenuEmitter.emit(!isExpired);

    return isExpired;
  }

  refreshToken() {
    const timerValue = timer(0, 3000 * 60);
    timerValue.subscribe(() => { this.postRefreshToken(); });
  }

  postRefreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    const { email } = this.tokenHelper.decodeToken(localStorage.getItem('token'));

    this.httpClient.post(`${this.API}token`, JSON.stringify({ email, refreshToken }), this.httpOptions)
                          .subscribe((result: any) => {
                            const { token } = result;
                            localStorage.setItem('token', token);

                            console.log('refreshToken');
                          });
  }
}

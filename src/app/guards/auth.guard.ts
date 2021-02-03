import { Injectable } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { CanActivate, CanLoad, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

import { AuthService } from '../providers/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
              private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) : Observable<boolean> | boolean {
    console.log('AuthGuard');
    return this.verificarAcesso();
  }

  canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean {
    console.log('canLoad: verificando se usuário pode carregar o cod módulo');
    return this.verificarAcesso();
  }

  private verificarAcesso(): boolean {
    if (this.authService.usuarioAutenticado()){
      this.router.navigate(['']);
    }

    return true;
  }
}

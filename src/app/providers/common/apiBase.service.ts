import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HandleErrorService } from '../handleError.service';
import { AuthService } from '../auth.service';

import { environment } from '../../../environments/environment';
import { RoutesApi } from 'src/app/shared/routesAPI.enum';

@Injectable({
  providedIn: 'root'
})
class ApiBase {

  private readonly API = environment.API;

  constructor(private httpClient: HttpClient,
              private handleErrorService: HandleErrorService,
              private authService: AuthService) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.token}`,
      observe: 'events',
      reportProgress: 'true'
    })
  };

  get<T>(route: string): Observable<T[]> {
    return this.httpClient.get<T[]>(this.API + route, this.httpOptions)
                          .pipe(
                            retry(3),
                            catchError(this.handleErrorService.handleError<T[]>(`GET ${route}`))
                          );
  }

  getById<T>(route: string): Observable<T> {
    return this.httpClient.get<T>(this.API + route, this.httpOptions)
                          .pipe(
                            retry(3),
                            catchError(this.handleErrorService.handleError<T>(`GET BY ID ${route}`))
                          );
  }

  update<T>(Entity: T, route: string): Observable<T> {
    return this.httpClient.put<T>(this.API + route, Entity, this.httpOptions)
                          .pipe(
                            catchError(this.handleErrorService.handleError<T>(`UPDATE ${route}`, Entity))
                          );
  }

  save<T>(Entity: T, route: string): Observable<T> {
    return this.httpClient.post<T>(this.API + route, Entity, this.httpOptions)
                          .pipe(
                            catchError(this.handleErrorService.handleError<T>(`SAVE ${route}`, Entity))
                          );
  }

  delete<T>(id: number, route: string): Observable<T> {
    return this.httpClient.delete<T>(this.API + route, this.httpOptions)
                          .pipe(
                            catchError(this.handleErrorService.handleError<T>(`DELETE ${route}`))
                          );
  }

  upload(arquivos: Set<File>): Observable<any> {
    const formData = new FormData();
    arquivos.forEach(file => formData.append('file', file, file.name));

    return this.httpClient.post(this.API + RoutesApi.Arquivos, formData, this.httpOptions)
      .pipe(
        catchError(this.handleErrorService.handleError<any>(`SAVE FILE ${this.API + RoutesApi.Arquivos}`, formData))
      );
  }

}

export default ApiBase;

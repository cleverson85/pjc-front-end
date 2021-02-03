import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MenuModule } from './components/menu/menu.module';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmModalModule } from './components/confirm-modal/confirm-modal.module';

import { HttpRequestInterceptor } from './shared/httprequest.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MenuModule,
    ConfirmModalModule,
    ToastrModule.forRoot()
  ],
  bootstrap: [
    AppComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true, }
  ]
})

export class AppModule { }

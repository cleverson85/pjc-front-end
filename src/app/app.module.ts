import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MenuModule } from './components/menu/menu.module';

import { AuthService } from './providers/auth.service';
import { ToastrModule } from 'ngx-toastr';

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
    ToastrModule.forRoot()
  ],
  bootstrap: [
    AppComponent,
  ]
})

export class AppModule { }

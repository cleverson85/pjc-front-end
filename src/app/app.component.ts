import { Component } from '@angular/core';

import { AuthService } from './providers/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  mostrarMenu: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(){
    this.authService.mostrarMenuEmitter.subscribe(
      (mostrar: boolean) => { this.mostrarMenu = mostrar }
    );
  }
}

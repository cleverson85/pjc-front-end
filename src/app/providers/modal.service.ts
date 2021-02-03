import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { ConfirmModalComponent } from '../components/confirm-modal/confirm-modal.component';
import { ModalComponent } from '../components/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(public dialog: MatDialog) { }

  showConfirm(titulo: string, mensagem: string) : Observable<any> {
    const dialogRef = this.dialog.open(ConfirmModalComponent);
    const componentInstance = dialogRef.componentInstance;

    componentInstance.titulo = titulo;
    componentInstance.mensagem = mensagem;

    return dialogRef.afterClosed();
  }

  showModal(data: any) : Observable<any> {
    debugger;
    const dialogRef = this.dialog.open(ModalComponent);
    return dialogRef.afterClosed();
  }
}

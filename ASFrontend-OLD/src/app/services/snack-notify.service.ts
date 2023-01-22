import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackNotifierComponent } from '../components/snack-notifier/snack-notifier.component';

@Injectable({
  providedIn: 'root',
})
export class SnackNotifyService {
  constructor(private snackbar: MatSnackBar) {}
  showNotification(
    displayMessage: any,
    buttonText: any,
    messageType: 'error' | 'success'
  ) {
    this.snackbar.openFromComponent(SnackNotifierComponent, {
      data: {
        message: displayMessage,
        buttonText: buttonText,
        type: messageType,
      },
      duration: 10000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: messageType,
    });
  }
}

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackserviceService {

  constructor(private snackBar: MatSnackBar) { }

  // funcion snackbar
  showSnackBar(message, action) {
    // tslint:disable-next-line:object-literal-shorthand
    return this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'left'
    });
  }
}

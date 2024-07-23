import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class ToastService {
  constructor(private _snackBar: MatSnackBar) {}

  public openToast(message: string): void {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3 * 1000
    });
  }
}

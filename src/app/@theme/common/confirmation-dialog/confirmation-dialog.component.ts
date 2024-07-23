import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';

import {DialogModel} from '@core/models/dialog.model';

@Component({
  standalone: true,
  selector: 'app-confirmation-dialog',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './confirmation-dialog.component.html',
})

export class ConfirmationDialogComponent extends DialogModel {
  public override onConfirm(): void {
    this.dialogRef.close(true);
  }
}

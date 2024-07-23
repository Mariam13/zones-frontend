import {Directive, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {ZoneService} from '@core/services/api/zone.service';
import {ToastService} from '@core/services/app/toast.service';

@Directive()
export abstract class DialogModel {
  constructor(protected zoneService: ZoneService,
              protected toastService: ToastService,
              protected dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) protected data: any) {}

  protected abstract onConfirm(): void;

  protected onCancel(): void {
    this.dialogRef.close(false);
  }
}

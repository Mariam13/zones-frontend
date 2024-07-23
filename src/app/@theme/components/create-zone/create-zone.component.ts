import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';

import {IZone} from '@core/interfaces/IZone';
import {DialogModel} from '@core/models/dialog.model';
import {MatInputModule} from '@angular/material/input';
import {ProgressEnum} from '@core/enums/progress.enum';
import {LoaderComponent} from '@theme/common/loader/loader.component';
import {ZonePolygonComponent} from '@theme/components/zone-polygon/zone-polygon.component';

@Component({
  standalone: true,
  selector: 'app-create-zone',
  templateUrl: './create-zone.component.html',
  imports: [
    FormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    LoaderComponent,
    MatFormFieldModule,
    ZonePolygonComponent
  ]
})

export class CreateZoneComponent extends DialogModel {
  private maxPointsCount: number = 4;

  public zone: IZone = {
    name: '',
    points: []
  } as IZone;
  public progressId: string = ProgressEnum.PRGRS_CREATE_ZONE;

  public addPoint(event: any): void {
    if (this.zone?.points?.length < 4) {
      const svgElement: SVGElement = (event.target as SVGElement);
      const rect: DOMRect = svgElement.getBoundingClientRect();
      const x: number = event.clientX - rect.left;
      const y: number = event.clientY - rect.top;
      this.zone.points.push([x, y]);
    }
  }

  public isValidPoints(): boolean {
    return this.zone?.points?.length === this.maxPointsCount;
  }

  public override onConfirm() {
    if (!this.isValidPoints() || !this.zone?.name) {
      if (!this.zone?.name) {
        this.toastService.openToast('Zone Name is required!');
      }
      return;
    }
    this.zoneService.createZones(this.zone).subscribe({
      next: (res: IZone) => this.dialogRef.close(res)
    });
  }
}

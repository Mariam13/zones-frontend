import {Subscription} from 'rxjs';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatTooltipModule} from '@angular/material/tooltip';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';

import {SearchPipe} from '@theme/pipes/search.pipe';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {ProgressEnum} from '@core/enums/progress.enum';
import {ZoneService} from '@core/services/api/zone.service';
import {IZone, IZoneListFilter} from '@core/interfaces/IZone';
import {LoaderComponent} from '@theme/common/loader/loader.component';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {CreateZoneComponent} from '@theme/components/create-zone/create-zone.component';
import {ZonePolygonComponent} from '@theme/components/zone-polygon/zone-polygon.component';
import {IConfirmationDialogModel} from '@theme/common/confirmation-dialog/confirmation-dialog.model';
import {ConfirmationDialogComponent} from '@theme/common/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SearchPipe,
    FormsModule,
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatChipsModule,
    LoaderComponent,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule,
    MatTooltipModule,
    MatFormFieldModule,
    CreateZoneComponent,
    ZonePolygonComponent,
    ConfirmationDialogComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy{
  public zones!: IZone[];
  public progressIds: typeof ProgressEnum = ProgressEnum;
  public filter: IZoneListFilter = {term: '', newest: true} as IZoneListFilter;

  private listSubscription!: Subscription;

  constructor(private dialog: MatDialog,
              private zoneService: ZoneService) {}

  ngOnInit() {
    this.initZonesList();
  }

  ngOnDestroy() {
    this.unsubscribeAll();
  }

  private unsubscribeAll(): void {
    this.listSubscription?.unsubscribe();
  }

  private initZonesList(): void {
    this.listSubscription = this.zoneService.getZones().subscribe({
      next: (res) => this.zones = res.reverse()
    });
  }

  public sortListing(): void {
    if (!this.zones?.length) {
      return;
    }
    this.filter.newest = !this.filter.newest;
    this.zones.reverse();
  }

  public createNewZone(): void {
    const dialogRef: MatDialogRef<CreateZoneComponent, any>
      = this.dialog.open(CreateZoneComponent);

    dialogRef.afterClosed().subscribe({
      next: (result: IZone) => {
        if (result) {
          this.filter.newest ? this.zones.unshift(result) : this.zones.push(result)
        }
      }
    })
  }

  public deleteZone(zone: IZone): void {
    const dialogRef: MatDialogRef<ConfirmationDialogComponent, any>
      = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          description: `Are you sure you want to delete ${zone?.name}`,
        } as IConfirmationDialogModel
    });

    const id: string = zone?.id || '';
    dialogRef.afterClosed().subscribe({
      next: result => {
        if (result) {
          this.zoneService.deleteZone(id, this.getCardProgressId(id)).subscribe({
            next: () => this.zones = this.zones.filter(item => item?.id !== id)
          });
        }
      }
    });
  }

  public getCardProgressId(id: string): string {
    return `${ProgressEnum.PRGRS_DELETE_ZONE}/${id}`;
  }
}

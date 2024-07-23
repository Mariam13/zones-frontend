import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Input, Output} from '@angular/core';

import {ZoneHelper} from '@core/services/helpers/zone.helper';

@Component({
  standalone: true,
  selector: 'app-zone-polygon',
  imports: [
    CommonModule
  ],
  templateUrl: './zone-polygon.component.html'
})

export class ZonePolygonComponent extends ZoneHelper {
  @Output() addPointEvent: EventEmitter<any> = new EventEmitter<any>();

  @Input() points: number[][] = [];
  @Input() customClass: string = '';
}

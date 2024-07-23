import {of} from 'rxjs';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

import {AppComponent} from './app.component';
import {ProgressEnum} from '@core/enums/progress.enum';
import {ZoneService} from '@core/services/api/zone.service';
import {provideAnimations} from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let zoneServiceMock: any;
  let matDialogMock: any;

  beforeEach(async () => {
    zoneServiceMock = jasmine.createSpyObj('ZoneService', ['getZones', 'deleteZone']);
    matDialogMock = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [MatDialogModule, AppComponent],
      providers: [
        provideAnimations(),
        { provide: ZoneService, useValue: zoneServiceMock },
        { provide: MatDialog, useValue: matDialogMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    zoneServiceMock.getZones.and.returnValue(of([
      { id: '1', name: 'Zone 1', points: [[12.3, 12.0], [16.3, 12.0], [16.3, 8.0], [11.4, 8.7]] }
    ]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init zones list on init', () => {
    component.ngOnInit();
    expect(zoneServiceMock.getZones).toHaveBeenCalled();
    expect(component.zones.length).toBe(1);
    expect(component.zones[0].name).toBe('Zone 1');
  });

  it('should reverse zones when click on sort filter', () => {
    component.sortListing();
    expect(component.filter.newest).toBeFalse();
    expect(component.zones).toEqual([
      { id: '1', name: 'Zone 1', points: [[12.3, 12.0], [16.3, 12.0], [16.3, 8.0], [11.4, 8.7]] }
    ]);
  });

  it('should get correct progress ID', () => {
    const id: string = '1';
    const progressId: string = component.getCardProgressId(id);
    expect(progressId).toBe(`${ProgressEnum.PRGRS_DELETE_ZONE}/${id}`);
  });
});

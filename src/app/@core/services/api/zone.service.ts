import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

import {IZone} from '@core/interfaces/IZone';
import {environment} from 'environments/environment';
import {ProgressEnum} from '@core/enums/progress.enum';
import {InterceptorHelper} from '@core/services/helpers/interceptor.helper';
import {ZoneHttpClient} from '@core/services/interceptors/httpClient/zone.httpClient';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {
  constructor(private http: ZoneHttpClient,
              private interceptorHelper: InterceptorHelper) {}

  public getZones(): Observable<IZone[]> {
    return this.http.get<IZone[]>(environment.endpoints.zones,
      this.interceptorHelper.generateContext({progressId: ProgressEnum.PRGRS_GET_ZONE_LIST}));
  }

  public createZones(data: IZone): Observable<IZone> {
    return this.http.post<IZone>(environment.endpoints.zones, data,
      this.interceptorHelper.generateContext({progressId: ProgressEnum.PRGRS_CREATE_ZONE}));
  }

  public deleteZone(id: string, progressId: string = ProgressEnum.PRGRS_DELETE_ZONE): Observable<{success: true}> {
    return this.http.delete<{success: true}>(`${environment.endpoints.zones}/${id}`,
      this.interceptorHelper.generateContext({progressId: progressId}));
  }
}

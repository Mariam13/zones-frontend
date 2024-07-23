import {Inject, Injectable} from '@angular/core';
import {HttpBackend, HttpClient, HttpInterceptor} from '@angular/common/http';

import {ZONE_HTTP_INTERCEPTORS} from '@core/services/interceptors/tokens/zone.token';
import {InterceptingHandler} from '@core/services/interceptors/handlers/intercepting.handler';

@Injectable({
  providedIn: 'root'
})
export class ZoneHttpClient extends HttpClient {
  constructor(backend: HttpBackend, @Inject(ZONE_HTTP_INTERCEPTORS) acInterceptors: HttpInterceptor[]) {
    super(new InterceptingHandler(backend, acInterceptors));
  }
}

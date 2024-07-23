import {InjectionToken} from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';

export const ZONE_HTTP_INTERCEPTORS: InjectionToken<HttpInterceptor[]> = new InjectionToken<HttpInterceptor[]>(
  'An abstraction on Zone HttpInterceptor[]'
);

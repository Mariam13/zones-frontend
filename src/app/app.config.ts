import {provideRouter} from '@angular/router';
import {provideAnimations} from '@angular/platform-browser/animations';
import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

import {routes} from './app.routes';
import {ZoneInterceptor} from '@core/services/interceptors/zone.interceptor';
import {ZONE_HTTP_INTERCEPTORS} from '@core/services/interceptors/tokens/zone.token';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: ZONE_HTTP_INTERCEPTORS, useClass: ZoneInterceptor, multi: true },
    provideHttpClient(withInterceptorsFromDi())
  ]
};

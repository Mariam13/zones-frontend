import {Injectable} from '@angular/core';
import {catchError, from, map, Observable, of, retry, tap, throwError, timer} from 'rxjs';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';

import {IHttpContext} from '@core/interfaces/IHttp';
import {environment} from 'environments/environment';
import {ToastService} from '@core/services/app/toast.service';
import {ErrorMessagesEnum} from '@core/enums/error-handling.enum';
import {LoaderService} from '@theme/common/loader/loader.service';
import {InterceptorHelper} from '@core/services/helpers/interceptor.helper';

@Injectable({
  providedIn: 'root'
})
export class ZoneInterceptor implements HttpInterceptor {
  constructor(private toastService: ToastService,
              private loaderService: LoaderService,
              private interceptorHelper: InterceptorHelper) {
  }

  private errorToast(message: string): void {
    if (!message) {
      return;
    }
    this.toastService.openToast(message);
  }

  private async handle(req: HttpRequest<any>, next: HttpHandler) {
    const context: IHttpContext = this.interceptorHelper.getContext(req);
    const progressId: string = context?.progressId || '';
    this.loaderService.httpProgress(LoaderService.getLoaderProgressData(true, progressId));
    req = req.clone(
      {url: `${environment.baseUrl}${req.url}`}
    );

    return next.handle(req).pipe(
      retry({count: 3, delay: (error: any) => {
          if (!error || !error?.status) {
            return timer(5000);
          }
          return throwError(error);
        }}),
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {

          /* We can manipulate with an error here using code below*/
          /*
            switch (error.status) {
              case 401:
              case 402:
              ...
            }
          */
        }
        return throwError(error);
      }),
      map(res => {
        if (res instanceof HttpResponse) {
          const body = res.body;
          return (body.success && body.data) ? new HttpResponse({body: body.data}) : res;
        }

        return res;
      }),
      tap({
        next: (res => {
          if (res instanceof HttpResponse) {
            this.loaderService.httpProgress(LoaderService.getLoaderProgressData(false, progressId));
          }
          return of(res);
        }),
        error: (err => {
          if (err instanceof HttpErrorResponse) {
            this.loaderService.httpProgress(LoaderService.getLoaderProgressData(false, progressId));
            if (!this.interceptorHelper.isOnline()) {
              return of(err);
            }

            const status: number = err.status;
            if (!status) {
              setTimeout(() => (this.interceptorHelper.isOnline()), 3000);
              return of(err);
            }

            switch (err.status) {
              case 401:
                break;
              case 429:
                this.errorToast(InterceptorHelper.getErrorMessage(err) || ErrorMessagesEnum.TOO_MANY_REQUESTS);
                break;
              default:
                this.errorToast(InterceptorHelper.getErrorMessage(err) || ErrorMessagesEnum.BAD_REQUEST);
                break;
            }
            return of(err);
          }
          return of(err);
        }),
      }),
    ).toPromise();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handle(req, next)) as any;
  }
}

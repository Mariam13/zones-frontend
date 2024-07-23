import {Observable} from 'rxjs';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

export class InterceptorHandler implements HttpHandler {
  constructor(private next: HttpHandler, private interceptor: HttpInterceptor) {}

  public handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    return this.interceptor.intercept(req, this.next);
  }
}

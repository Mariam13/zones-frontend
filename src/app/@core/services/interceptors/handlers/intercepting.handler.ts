import {Observable} from 'rxjs';
import {HttpBackend, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {InterceptorHandler} from '@core/services/interceptors/handlers/interceptor.handler';

export class InterceptingHandler implements HttpHandler {
  private chain!: HttpHandler;

  constructor(private backend: HttpBackend, private interceptors: HttpInterceptor[]) {
    this.buildChain();
  }

  private buildChain(): void {
    this.chain = this.interceptors.reduceRight((next: HttpBackend, interceptor: HttpInterceptor) =>
      new InterceptorHandler(next, interceptor), this.backend
    );
  }

  public handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    return this.chain.handle(req);
  }
}

import {
  HttpRequest,
  HttpContext,
  HttpContextToken,
  HttpErrorResponse
} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {IHttpContext} from '@core/interfaces/IHttp';
import {ToastService} from '@core/services/app/toast.service';
import {ErrorMessagesEnum} from '@core/enums/error-handling.enum';

@Injectable({
  providedIn: 'root'
})
export class InterceptorHelper {
  private context: HttpContextToken<IHttpContext> = new HttpContextToken<IHttpContext>(() => new Object({}) as IHttpContext);

  constructor(private toastService: ToastService) {}

  public generateContext(context: IHttpContext): {context: HttpContext} {
    return {context: new HttpContext().set(this.context, context)};
  }

  public getContext(req: HttpRequest<any>): IHttpContext {
    return req.context.get(this.context);
  }

  public isOnline(): boolean {
    if (navigator.onLine) {
      this.toastService.openToast(ErrorMessagesEnum.CONNECTION_ISSUE);
    }

    return navigator.onLine;
  }

  static getErrorMessage(err: HttpErrorResponse): string {
    return err?.error?.error?.message;
  }
}

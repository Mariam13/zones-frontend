import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {ILoader} from '@theme/common/loader/loader.model';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private containerStatus: BehaviorSubject<ILoader> = new BehaviorSubject<ILoader>({} as ILoader);

  public containerStatus$: Observable<ILoader> = this.containerStatus;

  static getLoaderProgressData(isProgress: boolean, progressId: string): ILoader {
    return {inProgress: isProgress, progressId: progressId};
  }

  public httpProgress(progressData: ILoader): void {
    this.containerStatus.next(progressData);
  }
}

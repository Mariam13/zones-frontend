import {Subscription} from 'rxjs';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';

import {LoaderService} from './loader.service';

@Component({
  standalone: true,
  selector: 'app-loader',
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './loader.component.html'
})

export class LoaderComponent implements OnDestroy {
  @Input() progressId!: string;
  @Input() showLoader?: boolean;

  @Output() loaderEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  private loaderSubscription!: Subscription;

  constructor(private loaderService: LoaderService) {
    this.loaderSubscribe();
  }

  ngOnDestroy() {
    this.loaderSubscription?.unsubscribe();
  }

  private loaderSubscribe(): void {
    this.loaderSubscription = this.loaderService.containerStatus$.subscribe({
      next: res => {
        if (res.progressId && res.progressId === this.progressId) {
          this.showLoader = res.inProgress;
          this.loaderEvent.emit(this.showLoader);
        }
      }
    });
  }

  public stopBinding(event: any): void {
    event.stopPropagation();
    event.preventDefault();
    // document.body.click();
  }
}

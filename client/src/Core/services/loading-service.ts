import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loadingRequestCount = signal(0);

  loading()
  {
    this.loadingRequestCount.update(current => current+1);
  }

  idle()
  {
    this.loadingRequestCount.update(current => Math.max(0,current-1));
  }
}

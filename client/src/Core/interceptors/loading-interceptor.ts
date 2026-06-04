import { HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading-service';
import { delay, finalize, of, tap } from 'rxjs';


const cache = new Map<string , HttpEvent<unknown>>();


export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);


  if(req.method === "GET")
  {
    const cachedResponse = cache.get(req.url);
    if(cachedResponse)
    {
      return of(cachedResponse);
    }

  }

  loadingService.loading();

  return next(req).pipe(
    delay(500),
    tap(response => {
      cache.set(req.url, response)
    }),
    finalize(() => {
      loadingService.idle();
    }),
  )
};

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastService } from '../../toast-service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);
  const router = inject(Router);

  return next(req).pipe(
    catchError(error => {
      console.log('Interceptor caught error status:', error.status);
      if (error) {
        switch (error.status) {
          case 400:
            toast.error(error.error);
            break;
          case 401:
            toast.error('Unauthorized');
            break;
          case 404:
            // toast.error('Not found');
            router.navigateByUrl("/sexnigga")
            break;
          case 500:
            toast.error('Server error');
            // console.log("intercepted server error in interceptor")
            break;
          default:
            toast.error('Something went wrong');
        }
      }

      return throwError(() => error);
    }))

};

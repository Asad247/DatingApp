import { CanActivateFn } from '@angular/router';
import { AccountServices } from '../account-services';
import { inject } from '@angular/core';
import { ToastService } from '../../toast-service';

export const authGuard: CanActivateFn = (route, state) => {
  const accountServices = inject(AccountServices);
  const toast = inject(ToastService);

  console.log('1. [GUARD] Checking user. Signal value is:', accountServices.currentUser());
  if (accountServices.currentUser()) return true;

  else {
    toast.error("Fuck a niggga notallowed")
    console.log('2. [GUARD] Check failed. Returning false.');
    return false;
  }
};

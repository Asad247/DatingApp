import { inject, Injectable } from '@angular/core';
import { AccountServices } from './Core/account-services';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InitService {
  protected accountServices = inject(AccountServices);

  init() {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      this.accountServices.setCurrentUser(user);

    }

    return of(null);
  }

}

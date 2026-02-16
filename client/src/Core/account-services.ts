import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { user, userLogin, userRegister } from '../types/user';
import { tap } from 'rxjs/internal/operators/tap';
import { ToastService } from '../toast-service';

@Injectable({
  providedIn: 'root',
})
export class AccountServices {
  private http = inject(HttpClient);
  protected toast = inject(ToastService);
  currentUser = signal<user | null>(null);

  url = 'https://localhost:5001/api/account/';

  login(creds: userLogin) {
    return this.http.post<user>(this.url + 'login', creds).pipe(
      tap(user => {
        this.setCurrentUser(user);
        this.toast.success("Fuck a nigga logged in");
      })
    );
  }

  setCurrentUser(user: user) {
    console.log('5. [SERVICE] Setting signal to:', user);
    this.currentUser.set(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  register(creds: userRegister) {
    return this.http.post<user>(this.url + 'register', creds).pipe(
      tap(user => {
        this.setCurrentUser(user)
      })
    );
  }


  logout() {
    this.currentUser.set(null);
    localStorage.removeItem('user');
  }
}


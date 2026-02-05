import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountServices } from '../../Core/account-services';

@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav implements OnInit {
  protected accountService = inject(AccountServices);
  protected creds: any = {};
  // protected IsLoggedIn = signal(false);


  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      // this.IsLoggedIn.set(true);
    }
  }
  login() {
    this.accountService.login(this.creds).subscribe({
      next: res => {
        console.log(res),
          // this.IsLoggedIn.set(true);
          this.creds = {};
      },
      error: err => alert(err)
    });
  };


  logout() {
    // this.IsLoggedIn.set(false);
    this.accountService.logout();
  }
}


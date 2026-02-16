import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountServices } from '../../Core/account-services';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { ToastService } from '../../toast-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav implements OnInit {
  protected accountService = inject(AccountServices);
  protected creds: any = {};
  protected router = inject(Router);
  protected toastService = inject(ToastService);
  // protected IsLoggedIn = signal(false);


  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      this.accountService.setCurrentUser(user);
      // this.IsLoggedIn.set(true);
    }
  }
  login() {
    this.accountService.login(this.creds).subscribe({
      next: res => {
        console.log(res),
          // this.IsLoggedIn.set(true);
          this.creds = {};
        this.router.navigateByUrl('/messages');
      },
      error: err => this.toastService.error("Panlun login karne aaya hai panlun")
    });
  };


  logout() {
    // this.IsLoggedIn.set(false);
    this.accountService.logout();
    this.router.navigateByUrl("/");
  }

}


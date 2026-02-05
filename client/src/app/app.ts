import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Nav } from "../Layout/nav/nav";
import { AccountServices } from '../Core/account-services';
import { Home } from "../Features/home/home";
import { user } from '../types/user';


@Component({
  selector: 'app-root',
  imports: [Nav, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private http = inject(HttpClient);
  private accountServices = inject(AccountServices);
  public readonly title = 'Dating App';
  protected members = signal<user[]>([])

  ngOnInit(): void {
    this.setCurrentUser();
    this.getmembers();
  };

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      this.accountServices.currentUser.set(user);
    }
  }

  getmembers() {
    this.http.get<user[]>('https://localhost:5001/api/members').subscribe({
      next: res => this.members.set(res),


      error: err => console.log(err)

    });
  }
}



import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-errors',
  standalone: true,
  imports: [],
  templateUrl: './test-errors.html',
  styleUrls: ['./test-errors.css'],
})
export class TestErrors {
  private http = inject(HttpClient);
  baseURL = " https://localhost:5001/api/";

  get404error() {
    this.http.get(this.baseURL + "buggy/not-found").subscribe({
      next: response => console.log(response),
      error: err => console.log(err)
    });
  }

  get400error() {
    this.http.get(this.baseURL + "buggy/bad-request").subscribe({
      next: response => console.log(response),
      error: err => console.log(err)
    });
  }

  get500error() {
    this.http.get(this.baseURL + "buggy/server-error").subscribe({
      next: response => console.log(response),
      error: err => console.log(err)
    });
  }


  getAuthError() {
    this.http.get(this.baseURL + "buggy/auth").subscribe({
      next: response => console.log(response),
      error: err => console.log(err)
    });
  }


  getValidationError() {
    this.http.post(this.baseURL + "account/register", { email: "" }).subscribe({
      next: response => console.log(response),
      error: err => console.log(err)
    });
  }
}

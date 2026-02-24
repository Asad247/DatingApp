import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common'; // 1. Import Location

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound implements OnInit {
  private location = inject(Location); // 2. Inject the service
  countdown = signal(5);

  ngOnInit(): void {
    // Visual countdown logic
    const interval = setInterval(() => {
      this.countdown.update((val) => val - 1);
      if (this.countdown() <= 0) clearInterval(interval);
    }, 1000);

    // 3. The Auto-Redirect Logic
    setTimeout(() => {
      this.goBack();
    }, 5000);
  }

  // Helper function to reuse logic for the button click
  goBack(): void {
    this.location.back(); // Tells the browser to go to the previous URL
  }
}
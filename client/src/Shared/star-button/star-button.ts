import { Component, input, output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-star-button',
  imports: [],
  templateUrl: './star-button.html',
  styleUrls: ['./star-button.css'],
})
export class StarButton {
  disabled = input<boolean>();
  selected = input<boolean>();
  clickEvent = output<Event>();

  onClick(event: Event) {
    this.clickEvent.emit(event);
  }
}

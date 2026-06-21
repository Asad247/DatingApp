import { Component, input, output } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-delete-button',
    imports: [],
    templateUrl: './delete-button.html',
    styleUrls: ['./delete-button.css'],
})
export class DeleteButton {
    disabled = input<boolean>();
    clickEvent = output<Event>();

    onClick(event: Event) {
        this.clickEvent.emit(event);
    }
}

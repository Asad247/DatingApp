import { Component, inject, output } from '@angular/core';
import { userRegister } from '../../../types/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Required for *ngIf
import { AccountServices } from '../../../Core/account-services';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private accountService = inject(AccountServices);
  cancelRegister = output<boolean>();
  protected creds = {
    interestedIn: 'everyone' // Defaulting for a better UX
  } as userRegister;

  protected previewUrl: string | null = null;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Create a local URL for the preview
      this.previewUrl = URL.createObjectURL(file);

      // If you need the file object in your creds for the API:
      // this.creds.photo = file; 
    }
  }

  register() {
    this.accountService.register(this.creds).subscribe(
      {
        next: response => {
          console.log(response);
          this.cancel();
        },
        error: error => console.log(error)
      }
    )
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}

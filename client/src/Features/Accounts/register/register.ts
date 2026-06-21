import { Component, inject, OnInit, output, signal } from '@angular/core';
import { userRegister } from '../../../types/user';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common'; // Required for *ngIf
import { AccountServices } from '../../../Core/account-services';
import { ValidationError } from '@angular/forms/signals';
import { TextInput } from '../../../Shared/text-input/text-input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, TextInput],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  private fb = inject(FormBuilder);
  private accountService = inject(AccountServices);
  cancelRegister = output<boolean>();
  protected router = inject(Router);
  protected previewUrl: string | null = null;
  protected credentialsForm: FormGroup = new FormGroup({});
  protected profileForm: FormGroup;
  protected currentStep = signal(1);
  protected validationErrors = signal<string[]>([]);

  constructor() {
    this.profileForm = this.fb.group({
      gender: ['male', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.ininitalizeForm();
  }

  ininitalizeForm() {
    this.credentialsForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      displayName: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
      ]),
      confirmPassword: new FormControl('', [Validators.required, this.matchValues('password')]),
    });

    this.credentialsForm.controls['password'].valueChanges.subscribe(() => {
      this.credentialsForm.controls['confirmPassword'].updateValueAndValidity();
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Create a local URL for the preview
      this.previewUrl = URL.createObjectURL(file);

      // If you need the file object in your creds for the API:
      // this.creds.photo = file;
    }
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const parent = control.parent;
      if (!parent) return null;

      const matchValue = parent.get(matchTo)?.value;
      return control.value === matchValue ? null : { passwordMismatch: true };
    };
  }

  nextStep() {
    if (this.credentialsForm.valid) {
      this.currentStep.update((prevStep) => prevStep + 1);
    }
  }

  lastStep() {
    this.currentStep.update((prevStep) => prevStep - 1);
  }

  register() {
    if (this.credentialsForm.valid && this.profileForm.valid) {
      const finalForm = { ...this.credentialsForm.value, ...this.profileForm.value };
      this.accountService.register(finalForm).subscribe({
        next: () => {
          this.router.navigateByUrl('/members');
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  maxAllowedDate() {
    const todaysDate = new Date();
    todaysDate.setFullYear(todaysDate.getFullYear() - 18);
    return todaysDate.toISOString().split('T')[0];
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}

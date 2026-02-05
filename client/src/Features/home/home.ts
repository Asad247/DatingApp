import { Component, inject, Input, input, signal } from '@angular/core';
import { AccountServices } from '../../Core/account-services';
import { Register } from "../Accounts/register/register";
import { user } from '../../types/user';
import { required } from '@angular/forms/signals';

@Component({
  selector: 'app-home',
  imports: [Register],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  @Input({ required: true }) membersFromAppts: user[] = [];
  protected isRegisterMode = signal(false);
  protected accountService = inject(AccountServices);

  showRegister() {
    this.isRegisterMode.set(true);
  }
  unshowRegister() {
    this.isRegisterMode.set(false);
  }



}

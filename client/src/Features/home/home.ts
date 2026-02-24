import { Component, inject, Input, signal } from '@angular/core';
import { AccountServices } from '../../Core/account-services';
import { Register } from "../Accounts/register/register";
import { user } from '../../types/user';
import { TestErrors } from "../test-errors/test-errors";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Register],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
  @Input() membersFromAppts: user[] = [];
  protected isRegisterMode = signal(false);
  protected accountService = inject(AccountServices);

  showRegister() {
    this.isRegisterMode.set(true);
  }
  unshowRegister() {
    this.isRegisterMode.set(false);
  }



}

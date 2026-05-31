import { Component, computed, inject, OnInit, signal, Signal } from '@angular/core';
import { MemberService } from '../../../Core/services/member-service';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Member } from '../../../types/member';
import { AsyncPipe, DatePipe } from '@angular/common';
import { AccountServices } from '../../../Core/account-services';

@Component({
  selector: 'app-member-details',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './member-details.html',
  styleUrl: './member-details.css',
})
export class MemberDetails implements OnInit {
  private accountService = inject(AccountServices);
  private route = inject(ActivatedRoute);
  protected title = signal<string | undefined>('Profile');
  protected memberService = inject(MemberService);
  protected member = signal<Member | undefined>(undefined);
  protected isCurrentUser = computed(() => {
    return this.accountService.currentUser()?.id === this.route.snapshot.paramMap.get('id');
  })


  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.member.set(data['member'])
    })

    this.title.set(this.route.firstChild?.snapshot.title);
  }


public changeTitle()
 {
  this.title.set('Photos');
  console.log("title changed");
  
 }

  calculateAge(dob: string): number {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }


  EditButtonPress()
  {
    this.memberService.editMode.set(!this.memberService.editMode());
  }
}

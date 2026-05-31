import { Component, inject } from '@angular/core';
import { MemberService } from '../../../Core/services/member-service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Photos } from '../../../types/photos';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-member-photos',
  imports: [AsyncPipe],
  templateUrl: './member-photos.html',
  styleUrl: './member-photos.css',
})
export class MemberPhotos {
  private route = inject(ActivatedRoute);
  private memberService = inject(MemberService);

  protected photos$?: Observable<Photos[]>;
  constructor() {
    const memberId = this.route.parent?.snapshot.paramMap.get('id')
    if (memberId) {
      this.photos$ = this.memberService.getMemberPhotos(memberId);
    }
  }





}

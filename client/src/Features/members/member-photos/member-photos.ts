import { Component, inject, OnDestroy } from '@angular/core';
import { MemberService } from '../../../Core/services/member-service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Photos } from '../../../types/photos';
import { AsyncPipe } from '@angular/common';
import { ImageUpload } from '../../../Shared/image-upload/image-upload';
import { AccountServices } from '../../../Core/account-services';
import { user } from '../../../types/user';
import { Member } from '../../../types/member';
import { ToastService } from '../../../toast-service';
import { StarButton } from "../../../Shared/star-button/star-button";
import { DeleteButton } from "../../../Shared/delete-button/delete-button";

@Component({
  selector: 'app-member-photos',
  imports: [ImageUpload, StarButton, DeleteButton],
  templateUrl: './member-photos.html',
  styleUrls: ['./member-photos.css'],
})
export class MemberPhotos implements OnDestroy {
  private route = inject(ActivatedRoute);
  private accountServices = inject(AccountServices);
  protected memberService = inject(MemberService);
  protected toaster = inject(ToastService);

  get isCurrentUserProfile() {
    const currentUser = this.accountServices.currentUser();
    const routeMemberId = this.route.parent?.snapshot.paramMap.get('id');
    return currentUser?.id === routeMemberId;
  }

  constructor() {
    const memberId = this.route.parent?.snapshot.paramMap.get('id')
    if (memberId) {
      this.memberService.getMemberPhotos(memberId).subscribe();
    }
  }

  ngOnDestroy(): void {
    this.memberService.editMode.set(false);
  }

  setMainPhoto(photo: Photos) {
    this.memberService.setMainPhoto(photo).subscribe({
      next: () => {
        const currentUser = this.accountServices.currentUser();
        if (currentUser) currentUser.photoUrl = photo.url;
        this.accountServices.setCurrentUser(currentUser as user);
        this.memberService.member.update(member => ({
          ...member,
          imageUrl: photo.url
        }) as Member)
        this.toaster.success("Profile picture updated successfully!");
      }
    })
  }

  deletePhoto(photo: Photos) {
    this.memberService.deletePhoto(photo).subscribe({
      next: () => {
        this.toaster.success("Photo deleted successfully!");
      },
      error: () => {
        this.toaster.error("Problem deleting photo");
      }
    });
  }
}

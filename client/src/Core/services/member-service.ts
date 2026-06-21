import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { EditableMember, Member } from '../../types/member';
import { AccountServices } from '../account-services';
import { Photos } from '../../types/photos';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  public editMode = signal(false);

  member = signal<Member | null>(null);
  photos = signal<Photos[]>([]);

  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'members',);
  }

  getMember(id: string) {
    return this.http.get<Member>(this.baseUrl + 'members/' + id).pipe(
      tap(theDateFlowinginThePipeWhichIsObviosulyMember => {
        this.member.set(theDateFlowinginThePipeWhichIsObviosulyMember);
      })
    );
  }

  getMemberPhotos(id: string) {
    return this.http.get<Photos[]>(this.baseUrl + 'members/' + id + '/photos').pipe(
      tap(photos => this.photos.set(photos))
    );
  }

  updateMember(member: EditableMember) {
    return this.http.put(this.baseUrl + 'members', member)
  }

  uploadPhoto(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<Photos>(this.baseUrl + 'members/add-photo', formData).pipe(
      tap(photo => {
        this.photos.update(current => [...current, photo]);
      })
    );
  }

  setMainPhoto(photo: Photos) {
    return this.http.put(this.baseUrl + 'members/set-main-photo/' + photo.id, {})
  }

  deletePhoto(photo: Photos) {
    return this.http.delete<void>(this.baseUrl + 'members/delete-photo/' + photo.id).pipe(
      tap(() => {
        this.photos.update(current => current.filter(p => p.id !== photo.id));
      })
    );
  }
}

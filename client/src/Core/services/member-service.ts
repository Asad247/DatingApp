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

  getMemberPhotos(id: string)
  {
    return this.http.get<Photos[]>(this.baseUrl + 'members/' + id + '/photos')
  }

  updateMember(member: EditableMember)
  {
    return this.http.put(this.baseUrl+ 'members', member)
  }



}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../../types/member';
import { AccountServices } from '../account-services';
import { Photos } from '../../types/photos';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  public editMode = signal(false);


  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'members',);
  }

  getMember(id: string) {
    return this.http.get<Member>(this.baseUrl + 'members/' + id);
  }

  getMemberPhotos(id: string)
  {
    return this.http.get<Photos[]>(this.baseUrl + 'members/' + id + '/photos')
  }



}

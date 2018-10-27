import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from '../../../node_modules/rxjs';
import {UserIdentityAvailability} from '../model/model.useravailability';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private userNameUrl = environment.userNameUrl;
  private emailAvailUrl = environment.emailAvailUrl;

  constructor(private http: HttpClient) { }

  getUserByUsername(username: string): Observable<UserIdentityAvailability> {
    username = username.trim();
    return this.http.get<UserIdentityAvailability>(this.userNameUrl + '?username=' + username);
  }

  getUserByEmail(userEmail: string): Observable<UserIdentityAvailability> {
    userEmail = userEmail.trim();
    return this.http.get<UserIdentityAvailability>(this.emailAvailUrl + '?email=' + userEmail);
  }

}

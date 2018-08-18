import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map, filter, catchError, mergeMap} from 'rxjs/operators';
import {User} from '../model/model.user';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private authUrl = '/api/auth/signin';
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
  }

  login(user: User) {
    return this.http.post<any>(this.authUrl,
      JSON.stringify({usernameOrEmail: user.usernameOrEmail, password: user.password}), {headers: this.headers})
      .pipe(map(data => {
        // login successful if there's a jwt token in the response
       const token = data && data.accessToken;
        if (token) {
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ usernameOrEmail: user.usernameOrEmail, token: token }));
          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      }));

  }

  getToken(): String {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const token = currentUser && currentUser.token;
    return token ? token : '';
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}

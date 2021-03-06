import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map, filter, catchError, mergeMap} from 'rxjs/operators';
import {User} from '../model/model.user';
import {BehaviorSubject} from '../../../node_modules/rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private authUrl = environment.authUrl;
  private registerUrl = environment.registerUrl;
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  constructor(private http: HttpClient) {
  }

  login(user: User) {
    return this.http.post<any>(this.authUrl,
      JSON.stringify({usernameOrEmail: user.usernameOrEmail, password: user.password}), {headers: this.headers})
      .pipe(map(data => {
        // login successful if there's a jwt token in the response
       const token = data && data.accessToken;
        if (token) {
          const helper = new JwtHelperService();
         const decodeToken = helper.decodeToken(token);
         console.log(decodeToken);
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({name: user.usernameOrEmail, roles: decodeToken.scopes, token: token }));
          // return true to indicate successful login
          this.loggedIn.next(true);
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      }));

  }
  registerUser(user: User) {
    return this.http.post(this.registerUrl,
      JSON.stringify({name: user.name, username: user.usernameOrEmail, email: user.email, password: user.password, roles: user.roles}),
      {headers: this.headers});
  }
  getToken(): String {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const token = currentUser && currentUser.token;
    return token ? token : '';
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.loggedIn.next(false);
  }
}

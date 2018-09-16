import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {User} from '../model/model.user';
import {AuthServiceService} from '../services/auth-service.service';
import {Router} from '@angular/router';
import {MediaMatcher} from '@angular/cdk/layout';
import {Observable} from 'rxjs/internal/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser: User;
  navbarOpen = false;
  mobileQuery: MediaQueryList;
  isLoggedIn$: Observable<boolean>;

  private _mobileQueryListener: () => void;
  constructor(public authService: AuthServiceService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn; // {2}
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
// login out from the app
  logOut() {
    this.authService.logout();
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }


}

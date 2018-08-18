import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {User} from '../model/model.user';
import {AuthServiceService} from '../services/auth-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  currentUser: User;
  navbarOpen = false;
  constructor(public authService: AuthServiceService, public router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  ngOnInit() {
  }
// login out from the app
  logOut() {
    this.authService.logout();
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }


}

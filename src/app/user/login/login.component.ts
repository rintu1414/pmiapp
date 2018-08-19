import { Component, OnInit } from '@angular/core';
import {User} from '../../model/model.user';
import {AuthServiceService} from '../../services/auth-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  errorMessage: string;
  loading = false;
  constructor(private authService: AuthServiceService, private router: Router) {}

  ngOnInit() {
  }

  login() {
    this.authService.login(this.user)
      .subscribe(data => {
          this.router.navigate(['/profile']);
        }, err => {
          this.errorMessage = 'error :  Username or password is incorrect';
        this.loading = false;
        }
      );
  }
}

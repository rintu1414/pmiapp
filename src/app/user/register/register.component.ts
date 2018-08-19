import { Component, OnInit } from '@angular/core';
import {Role} from '../../model/model.role';
import {AuthServiceService} from '../../services/auth-service.service';
import {User} from '../../model/model.user';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  allRoles = [
    new Role('ROLE_ADMIN', 'Admin'),
    new Role('ROLE_USER', 'User')
  ];
  constructor(private authService: AuthServiceService) { }

  ngOnInit() {
  }
  register(form: User) {
    this.authService.registerUser(form);
  }
}

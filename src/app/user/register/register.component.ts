import { Component, OnInit } from '@angular/core';
import {Role} from '../../model/model.role';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  allRoles = [
    new Role('ROLE_ADMIN', 'Admin'),
    new Role('ROLE_USER', 'User')
  ]
  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import {Role} from '../../model/model.role';
import {AuthServiceService} from '../../services/auth-service.service';
import {User} from '../../model/model.user';
import {NgForm, FormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  dataSaved = false;
  public user = new User();
  public successMsg;
  allRoles = [
    new Role('ROLE_ADMIN', 'Admin'),
    new Role('ROLE_USER', 'User')
  ];
  constructor(private authService: AuthServiceService) { }

  ngOnInit() {

  }
  register(form: NgForm) {
    this.dataSaved = false;
    this.user = form.value;
    this.authService.registerUser(this.user).subscribe(
      data => { this.successMsg = data;
        this.dataSaved = true; },
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done creating user')
    );
    form.reset();
  }
}

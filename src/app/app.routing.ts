import { Routes, RouterModule } from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {UrlPermission} from './urlPermission/UrlPermission';
import {LoginComponent} from './user/login/login.component';
import {RegisterComponent} from './user/register/register.component';


const appRoutes: Routes = [
  { path: 'profile', component: HeaderComponent , canActivate: [UrlPermission] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // otherwise redirect to profile
  { path: '**', redirectTo: '/login' }
];

export const routing = RouterModule.forRoot(appRoutes);

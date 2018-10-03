import { Routes, RouterModule } from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {UrlPermission} from './urlPermission/UrlPermission';
import {LoginComponent} from './user/login/login.component';
import {RegisterComponent} from './user/register/register.component';
import {UploadComponent} from './upload/upload.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RiskComponent} from './risk/risk.component';
import {RiskTabComponent} from './risk/risk-tab/risk-tab.component';
import {GlobalErrorHandlerServiceService} from './error/global-error-handler-service.service';
import {ErrorComponent} from './error/error.component';


const appRoutes: Routes = [
  { path: 'profile', component: HeaderComponent , canActivate: [UrlPermission] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'error',
    component: ErrorComponent
  },
  { path: 'risk', component: RiskComponent },
  { path: 'riskTab', component: RiskTabComponent },
  // otherwise redirect to profile
  { path: '**', redirectTo: '/login' }
];

export const routing = RouterModule.forRoot(appRoutes);

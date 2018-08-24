import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RiskComponent } from './risk/risk.component';
import {DataTableModule} from 'angular-6-datatable';
import {
  MatDividerModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule
} from '@angular/material';
import { UploadComponent } from './upload/upload.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { HeaderComponent } from './header/header.component';
import {FormsModule} from '@angular/forms';
import {UrlPermission} from './urlPermission/UrlPermission';
import {routing} from './app.routing';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {JwtInterceptor} from './urlPermission/JwtInterceptor';
import {ErrorInterceptor} from './urlPermission/ErrorInterceptor';
import {ExistingUsernameValidatorDirective} from './custom-validators/existingUsernameValidator';
import {ExistingEmailValidatorDirective} from './custom-validators/existing-email-validator';
import {EqualValidator} from './custom-validators/equal-validator';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    RiskComponent,
    UploadComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    ExistingUsernameValidatorDirective,
    ExistingEmailValidatorDirective,
    EqualValidator
  ],
  imports: [
    BrowserModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:3001/auth/']
      }
    }),
    DataTableModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    FormsModule,
    MatToolbarModule,
    routing,
    HttpClientModule
  ],
  providers: [UrlPermission,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

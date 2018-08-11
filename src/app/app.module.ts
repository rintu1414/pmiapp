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


@NgModule({
  declarations: [
    AppComponent,
    RiskComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
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
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

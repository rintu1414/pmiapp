import {AfterContentInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatGridList} from '@angular/material';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {AnimationFactory, AnimationPlayer} from '@angular/animations';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent /*implements AfterContentInit*/ {
/*@ViewChild('grid') grid: MatGridList;
    gridByBreakpoint = {
    xl: 8,
    lg: 6,
    md: 4,
    sm: 4,
    xs: 3
  };*/

  constructor(/*private observableMedia: ObservableMedia*/) {}

/* ngAfterContentInit() {
    this.observableMedia.asObservable().subscribe((change: MediaChange) => {
      this.grid.cols = this.gridByBreakpoint[change.mqAlias];
      this.grid.gutterSize = '5';
    });
  }*/
  openRiskDialogue() {

}
}

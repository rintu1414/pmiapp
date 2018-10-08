import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-risk-tab',
  templateUrl: './risk-tab.component.html',
  styleUrls: ['./risk-tab.component.css']
})
export class RiskTabComponent implements OnInit {

  myData = [
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 5]
  ];

  columnNames = ['Age', 'Weight'];
  roles = [];

  type = 'ScatterChart';

  constructor() { }

  ngOnInit() {
  }

}

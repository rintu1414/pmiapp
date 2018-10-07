import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-risk-tab',
  templateUrl: './risk-tab.component.html',
  styleUrls: ['./risk-tab.component.css']
})
export class RiskTabComponent implements OnInit {

  myData = [
    ['London', 8136000],
    ['New York', 8538000],
    ['Paris', 2244000],
    ['Berlin', 3470000],
    ['Kairo', 19500000]
  ];

  type = 'BarChart';

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-risk-tab',
  templateUrl: './risk-tab.component.html',
  styleUrls: ['./risk-tab.component.css']
})
export class RiskTabComponent implements OnInit {

  myData = [
    ['Resource', 3],
    ['Procurement', 2],
    ['Technology', 5],
    ['Process',3]
  ];

  columnNames = ['Category', 'Total'];
  roles = [];
  title: 'Patterns',
  type = 'PieChart';

  rank: any = {'1': {'color': 'yellow', 'data': {}},
    '2': {'color': 'yellow', 'data': {}},
    '3': {'color': 'yellow', 'data': {}},
    '4': {'color': 'amber', 'data': {}},
    '5': {'color': 'amber', 'data': {}},
    '6': {'color': 'amber', 'data': {}},
    '7': {'color': 'amber', 'data': {}},
    '8': {'color': 'amber', 'data': {}},
    '9': {'color': 'amber', 'data': {}},
    '10': {'color': 'amber', 'data': {}},
    '11': {'color': 'golden', 'data': {}},
    '12': {'color': 'golden', 'data': {}},
    '13': {'color': 'golden', 'data': {}},
    '14': {'color': 'golden', 'data': {}},
    '15': {'color': 'golden', 'data': {}},
    '16': {'color': 'golden', 'data': {}},
    '17': {'color': 'golden', 'data': {}},
    '18': {'color': 'golden', 'data': {}},
    '19': {'color': 'golden', 'data': {}},
    '20': {'color': 'red', 'data': {}},
    '21': {'color': 'red', 'data': {}},
    '22': {'color': 'red', 'data': {}},
    '23': {'color': 'red', 'data': {}},
    '24': {'color': 'red', 'data': {}},
    '25': {'color': 'red', 'data': {}}
  };

  ta: any = [['11', '16', '20', '23', '25'],
    ['7', '12', '17', '21', '24'],
    ['4', '8', '13', '18', '22'],
    ['2', '5', '9', '14', '19'],
    ['1', '3', '6', '10', '15']];

  constructor() { }

  ngOnInit() {

  }

  getCss(i: String) {
    return this.rank[i].color;
}

}

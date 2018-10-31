import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ExcelUploadService} from '../services/excel-upload.service';
import {MatPaginator, MatSort} from '@angular/material';
import {MatTableDataSource} from '@angular/material/table';
import {GetRecordsService} from '../services/get-records.service';
import {Risk} from '../model/model.risk';
import * as XLSX from 'xlsx';
import { noop as _noop } from 'lodash';
@Component({
  selector: 'app-risk',
  templateUrl: './risk.component.html',
  styleUrls: ['./risk.component.css']
})
export class RiskComponent implements OnInit {
  dataArr;
  headerArr;
  dataSource;
  display = 'none';
  tableCharData;
  limit = 1000;
  show = true;
  file: File;
  risk: Risk[];
  loading  =  true;
  myData = [
    ['Resource', 3],
    ['Procurement', 2],
    ['Technology', 5],
    ['Process', 3]
  ];

  columnNames = ['Category', 'Total'];
  roles = [];
  title = 'Pattern';
  type = 'PieChart';
  columnNamesArea: any = ['Year', 'Open', 'Closed'];
  areatitle = 'Response';
  areaType = 'AreaChart';
  areaOptions = {
    isStacked: 'relative',
    height: 300,
    legend: {position: 'top', maxLines: 2},
    vAxis: {
      minValue: 0,
      ticks: [0, .5, 1]
    }
  };
  pieOptions = {
    is3D: 'true'
  };

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

  areaData: any =  [
    ['2013', 10, 10],
    ['2014', 1170, 460],
    ['2015', 660, 1120],
    ['2016', 1030, 540]
  ];

 // @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('TABLE', { read: ElementRef }) table: ElementRef;
  constructor(public uploadService: ExcelUploadService, public getService: GetRecordsService) { }

  ngOnInit() {
    setTimeout(() => {

      this.loading  =  false;
      this.getData();
    }, 2000);
      }
  incomingfile(event) {
    this.uploadService.uploadFile$.subscribe(
      (file: File) => {
        this.headerArr = [];
        this.dataSource = new MatTableDataSource([]);
        this.ngOnInit();
  }
    );
    this.file = event.target.files[0];
    this.uploadService.uploadExcel(this.file);
  }
  getData() {
    this.getService.getData().subscribe((data) => {
      this.headerArr = Object.keys(data[0]);
      this.dataSource  = new MatTableDataSource(data);
    //  this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
      this.getPieChartData();
      this.getAreaChartData();
      this.tableCharData = this.getTableChartData();
    });
  }
  ExportTOExcel() {
    console.log('export');
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.filteredData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'SheetJS.xlsx');
    console.log('exported');

  }

  handleScroll = (scrolled: boolean) => {
    console.log('lastScrolled');
    scrolled ? this.getData() : _noop();
    console.log('lastScrolled after');
  }
  hasMore = () => !this.dataSource || this.dataSource.data.length < this.limit;



  getCss(i: String) {
    return this.rank[+i]['color'];
  }
  getPieChartData() {
    const pieData: any = new Map();
    if (this.dataSource) {
    this.dataSource.data.forEach((task) => {
     if (pieData.has(task.riskCategory)) {
       const va = pieData.get(task.riskCategory) + 1;
        pieData.set(task.riskCategory, va);
      } else {
        pieData.set(task.riskCategory, 1);

      }
    }); }
      this.myData = Array.from(pieData);

  }

  getTableChartData() {
    const tableChartData: any = new Map();
    let open = 0;
    let closed = 0;
    let dataOpen: string[];
      dataOpen = new Array();
    let dataClosed: string[];
    dataClosed = new Array();
    if (this.dataSource) {
      this.dataSource.data.forEach((task) => {
        dataOpen = [];
        dataClosed = [];
        if (tableChartData.has(task.rank)) {
          open = tableChartData.get(task.rank)['open'];
          closed = tableChartData.get(task.rank)['closed'];
          dataOpen = tableChartData.get(task.rank)['dataOpen'];
          dataClosed = tableChartData.get(task.rank)['dataClosed'];
        } else {
          open = 0;
          closed = 0;
        }
        if (task.status === 'Open') {
          dataOpen.push(task.id);
          tableChartData.set(task.rank, {'open': open + 1, 'closed' : closed,
            'dataOpen': dataOpen, 'dataClosed': dataClosed});
        } else {
          dataClosed.push(task.id);
          tableChartData.set(task.rank, {'open': open, 'closed' : closed + 1,
            'dataOpen': dataOpen, 'dataClosed': dataClosed});
        }
      }); }
  return tableChartData;
  }

  getAreaChartData() {
    const areaChartData: any = new Map();
    let open = 0;
    let closed = 0;
    if (this.dataSource) {
      this.dataSource.data.forEach((task) => {
        if (areaChartData.has(task.response)) {
          open = areaChartData.get(task.response)[1];
          closed = areaChartData.get(task.response)[2];
        } else {
          open = 0;
          closed = 0;
        }
        if (task.status === 'Open') {
              areaChartData.set(task.response, [task.response, open + 1, closed]);
            } else {
              areaChartData.set(task.response, [task.response, open, closed + 1]);
            }
        }); }

    this.areaData = Array.from(areaChartData.values());

  }


  getClosedData(t) {
    if (this.tableCharData) {
      if (this.tableCharData.has(t)) {
        return this.tableCharData.get(t)['closed'];
      } else {
        return '';
      }
    }
  }
  getOpenFullData(t) {
    if (this.tableCharData) {
      if (this.tableCharData.has(t)) {
        return this.tableCharData.get(t)['dataOpen'];
      } else {
        return '';
      }
    }
  }
  getOpenClosedData(t) {
    if (this.tableCharData) {
      if (this.tableCharData.has(t)) {
        return this.tableCharData.get(t)['dataClosed'];
      } else {
        return '';
      }
    }
  }

  getOpenData(t) {
    if (this.tableCharData) {
      if (this.tableCharData.has(t)) {
        return this.tableCharData.get(t)['open'];
      } else {
        return '';
      }
    }
  }

  openModal() {
  this.display = 'block';
  }

  onCloseHandled() {
    this.display = 'none';
  }
}

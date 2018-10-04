import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ExcelUploadService} from '../services/excel-upload.service';
import {MatPaginator, MatSort} from '@angular/material';
import {MatTableDataSource} from '@angular/material/table';
import {GetRecordsService} from '../services/get-records.service';
import {Risk} from '../model/model.risk';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-risk',
  templateUrl: './risk.component.html',
  styleUrls: ['./risk.component.css']
})
export class RiskComponent implements OnInit {
  dataArr;
  headerArr;
  dataSource;
  file: File;
  risk: Risk[];
  loading  =  true;
  // Rare	Insignificant
  // Unlikely	Insignificant
  // Possible	Insignificant
  // Likely	Insignificant
  // Rare	Minor
  // Unlikely	Minor
  // Certain	Insignificant
  // Possible	Minor
  // Likely	Minor
  // Certain	Minor
  // Rare	Moderate
  // Unlikely	Moderate
  // Rare	Major
  // Possible	Moderate
  // Likely	Moderate
  // Certain	Moderate
  // Unlikely	Major
  // Possible	Major
  // Rare	Catastrophic
  // Likely	Major
  // Certain	Major
  // Unlikely	Catastrophic
  // Possible	Catastrophic
  // Likely	Catastrophic
  // Certain	Catastrophic
  rank: any = {
    'Rare#Insignificant': '1',
    'Unlikely#Insignificant': '2',
    'Possible#Insignificant': '3',
    'Likely#Insignificant': '4',
    'Rare#Minor': '5',
    'Unlikely#Minor': '6',
    'Certain#Insignificant': '7',
    'Possible#Minor': '8',
    'Likely#Minor': '9',
    'Certain#Minor': '10',
    'Rare#Moderate': '11',
    'Rare#Major': '12',
    'Unlikely#Moderate': '13',
    'Possible#Moderate': '14',
    'Likely#Moderate': '15',
    'Certain#Moderate': '16',
    'Unlikely#Major': '17',
    'Possible#Major': '18',
    'Rare#Catastrophic': '19',
    'Likely#Major': '20',
    'Certain#Major': '21',
    'Unlikely#Catastrophic': '22',
    'Possible#Catastrophic': '23',
    'Likely#Catastrophic': '24',
    'Certain#Catastrophic': '25'
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
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
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
}

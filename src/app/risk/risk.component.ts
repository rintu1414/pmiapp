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

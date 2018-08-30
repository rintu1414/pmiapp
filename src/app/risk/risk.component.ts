import {Component, OnInit, ViewChild} from '@angular/core';
import {ExcelUploadService} from '../services/excel-upload.service';
import {MatPaginator, MatSort} from '@angular/material';
import {MatTableDataSource} from '@angular/material/table';
import {GetRecordsService} from '../services/get-records.service';
import {Risk} from '../model/model.risk';

@Component({
  selector: 'app-risk',
  templateUrl: './risk.component.html',
  styleUrls: ['./risk.component.css']
})
export class RiskComponent implements OnInit {
  dataArr;
  headerArr;
  dataSource;
  risk: Risk[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public uploadService: ExcelUploadService, public getService: GetRecordsService) { }

  ngOnInit() {
    this.getData();
  }
  getData() {
    this.getService.getData().subscribe((data) => {
      this.risk = data;
      this.headerArr = Object.keys(this.risk[0]);
      this.dataSource  = new MatTableDataSource(this.risk);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}

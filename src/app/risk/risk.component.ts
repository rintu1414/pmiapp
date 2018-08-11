import {Component, OnInit, ViewChild} from '@angular/core';
import {ExcelUploadService} from '../services/excel-upload.service';
import {MatPaginator, MatSort} from '@angular/material';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-risk',
  templateUrl: './risk.component.html',
  styleUrls: ['./risk.component.css']
})
export class RiskComponent implements OnInit {
  dataArr;
  headerArr;
  dataSource ;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public uploadService: ExcelUploadService) { }

  ngOnInit() {
    this.uploadService.uploadFile$.subscribe(
      (file: File) => {
        const header: String[] = [];
        console.log('file');
        console.log(file);
        if (!!file && !!file[0]) {
          this.headerArr = Object.keys(file[0]);
        }
        this.dataArr = file;
        this.dataSource  = new MatTableDataSource(this.dataArr);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

}

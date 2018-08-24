import { Component, OnInit } from '@angular/core';
import {ExcelUploadService} from '../services/excel-upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  file: File;
  dataArr;
  headerArr;
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
      }
    );
  }

  incomingfile(event) {
    this.file = event.target.files[0];
    this.uploadService.uploadExcel(this.file);
  }

}

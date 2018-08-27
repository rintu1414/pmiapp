import {Injectable} from '@angular/core';
import * as XLSX from 'xlsx';
import {BehaviorSubject, Subject} from 'rxjs';
import {PostRecordsService} from './post-records.service';
@Injectable({
  providedIn: 'root'
})
export class ExcelUploadService {
  arrayBuffer: any;
  fileReader: FileReader = new FileReader();
  fileData;
  postRecordService;


  dataArr: any =
    [
      {
        'ID': '001',
        'Name': 'Eurasian Collared-Dove',
        'Type': 'Dove',
        'Status': 'Streptopelia'
      },
      {
        'ID': '002',
        'Name': 'Bald Eagle',
        'Type': 'Hawk',
        'Status': 'Haliaeetus leucocephalus'
      },
      {
        'ID': '003',
        'Name': 'Cooper\'s Hawk',
        'Type': 'Hawk',
        'Status': 'Accipiter cooperii'
      }
    ];

  constructor(postRecordService: PostRecordsService) {
    this.postRecordService = postRecordService;
    this.fileReader.onload = (e) => {
      this.arrayBuffer = this.fileReader.result;

      const data: Uint8Array = new Uint8Array(this.arrayBuffer);
      const arr = new Array();
      for (let i = 0; i !== data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }
      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, {type: 'binary'});
      const first_sheet_name = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[first_sheet_name];
      this.fileData = XLSX.utils.sheet_to_json(worksheet, {raw: true});
      console.log(this.fileData);
      this.uploadFile.next(this.fileData.filter(
        task => !!task[Object.keys(task)[0]]));
    };

  }
  private uploadFile = new Subject<any>();
  public uploadFile$ = this.uploadFile.asObservable();

  uploadExcel(file: File) {
    this.fileReader.readAsArrayBuffer(file);
    this.uploadFile.subscribe((uploadData) => {
      this.postRecordService.postData(uploadData).subscribe((data) => {console.log(data);
      });
    })
   ;
  }
}


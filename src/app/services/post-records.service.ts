import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from '../../../node_modules/rxjs';
import * as XLSX from 'xlsx';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostRecordsService {

  constructor(private http: HttpClient) {
  }

  postData(data:any) {
    console.log("$$$$$$$POST$$$$$$$$$$");
    console.log(data);
    return this.http.post('/api/pmi/addRisk', data);
  }
}

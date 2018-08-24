import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from '../../../node_modules/rxjs';
import * as XLSX from 'xlsx';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetRecordsService {


  constructor(private http: HttpClient) {
  }

  getData() {
    return this.http.get
    ('/api/pmi/risk');

  }
}

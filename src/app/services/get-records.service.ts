import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {Risk} from '../model/model.risk';

@Injectable({
  providedIn: 'root'
})
export class GetRecordsService {


  constructor(private http: HttpClient) {
  }

  getData(): Observable<Risk[]> {
    return this.http.get<Risk[]>
    ('/api/pmi/risk');

  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {Risk} from '../model/model.risk';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetRecordsService {

  private riskUrl = environment.riskUrl;
  constructor(private http: HttpClient) {
  }

  getData(): Observable<Risk[]> {
    return this.http.get<Risk[]>
    (this.riskUrl);

  }
}

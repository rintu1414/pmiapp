import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Risk} from '../model/model.risk';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostRecordsService {
   risk: Risk[];
   private addRiskURL = environment.addRiskURL;
  constructor(private http: HttpClient) {
  }

  postData(data: any) {
    console.log('$$$$$$$POST$$$$$$$$$$');
    console.log(data);
    return this.http.post(this.addRiskURL, data);
  }
}

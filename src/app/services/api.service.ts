import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {getHeadersParams} from '../components/utils';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private  http: HttpClient) {
  }

  get(url, data): Observable<any> {
    return this.http.get(url, getHeadersParams(data));
  }
}

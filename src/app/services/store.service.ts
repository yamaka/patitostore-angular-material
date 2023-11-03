import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetail } from '../pages/store/store.component';
import { DuckData } from '../pages/warehouse/list/list.component';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  readonly apiUrl: string = 'http://localhost:9030/api';

  duckToSell?: DuckData;

  orderDetail?: OrderDetail;

  constructor(private http: HttpClient) {}

  createOrder(params: any): Observable<any> {
    return this.http.post(this.apiUrl + '/store', params);
  }
}

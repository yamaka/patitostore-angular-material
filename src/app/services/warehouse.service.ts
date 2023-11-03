import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { DuckData } from '../pages/warehouse/list/list.component';

@Injectable({
  providedIn: 'root',
})
export class WarehouseService {
  duckSeleted!: DuckData | null;
  constructor(private http: HttpClient) {}

  fetchDucks(params: any): Observable<any> {
    return this.http.get(environment.apiUrl + '/warehouse/ducks', { params });
  }

  createDuck(params: any): Observable<any> {
    return this.http.post(environment.apiUrl + '/warehouse/ducks', params);
  }

  updatDuck(params: any): Observable<any> {
    return this.http.put(environment.apiUrl + '/warehouse/ducks', params);
  }

  deleteDuck(id: number): Observable<any> {
    return this.http.delete(
      environment.apiUrl + '/warehouse/ducks/' + id.toString()
    );
  }

  getDashboard(): Observable<any> {
    return this.http.get(environment.apiUrl + '/warehouse/dashboard');
  }
}

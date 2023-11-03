import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private confirmDialog$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  constructor() {}

  public showConfirmDialog$() {
    this.confirmDialog$.next(true);
  }

  public hideConfirmDialog$() {
    this.confirmDialog$.next(false);
  }

  public getConfirmDialog$(): Observable<boolean> {
    return this.confirmDialog$.asObservable();
  }
}

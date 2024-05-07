import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filterValueSource = new BehaviorSubject<string>('');
  currentFilterValue = this.filterValueSource.asObservable();

  constructor() { }

  changeFilterValue(filterValue: string) {
    this.filterValueSource.next(filterValue);
  }
}

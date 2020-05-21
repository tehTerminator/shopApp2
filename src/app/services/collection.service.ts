import { Injectable } from '@angular/core';
import { SqlService } from './sql.service';
import { SqlResponse } from '../interface/sql-response';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private collection: Array<Element> = [];

  constructor(private sql: SqlService) { }

  fetchFromServer() {
    this.sql.select('collection')
    .subscribe((res: Array<Element>) => {
      this.collection = [];
      res.forEach((item: Element) => {
        this.collection.push(item);
      });
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { SqlService } from '../../../services/sql.service';
import { SqlRequest } from '../../../interface/sql-request';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  tableName = 'products';
  searchText = '';
  listData = [];

  constructor(private sql: SqlService) { }

  onSubmit() {
    const request: SqlRequest = {
      columns: ['id', 'title'],
      andWhere: {
        title: ['LIKE', `%${this.searchText}%`]
      }
    };
    this.sql.select(this.tableName, request)
    .subscribe((res: Array<any>) => {
      this.listData = res;
    });
  }
}

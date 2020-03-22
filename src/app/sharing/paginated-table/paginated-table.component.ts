import { Component, OnInit, Input } from '@angular/core';
import { SqlService } from '../../services/sql.service';
import { SqlRequest } from '../../interface/sql-request';

@Component({
  selector: 'app-paginated-table',
  templateUrl: './paginated-table.component.html',
  styleUrls: ['./paginated-table.component.css']
})
export class PaginatedTableComponent implements OnInit {

  @Input() tableName: string;
  @Input() sqlRequest: SqlRequest;
  @Input() tableData: Array<any>;
  @Input() smallSize = false;
  private pagination = {
    pageLength: 10,
    activePage: 1,
    totalPages: 0,
    pageArray: [],
    active: false,
  };
  private listOfItems: Array<any> = [];

  protected searchText = '';
  protected headers: Array<string> = [];

  constructor(private sql: SqlService) { }

  ngOnInit() {
    if (this.tableData === undefined ){
      this.fetchFromServer();
    } else {
      this.listOfItems = this.tableData;
      this.paginate();
    }
  }

  /**
   * Data Fetch Releated Functions
   */


  fetchFromServer() {
    let request: SqlRequest = {};
    if (this.sqlRequest !== undefined) {
      request = this.sqlRequest;
    }
    this.sql.select(this.tableName, request)
    .subscribe((res: Array<any>) => {
      this.listOfItems = res;
      this.paginate();
    });
  }

  /**
   * Pagination Related Function
   */

  paginate() {
    this.paginated = true;
    this.headers = Object.keys(this.listOfItems[0]);
    if ( this.listOfItems.length % this.pageLength === 0) {
      this.totalPages = (this.listOfItems.length / this.pageLength);
    } else {
      this.totalPages = Math.ceil(this.listOfItems.length / this.pageLength);
    }
    this.activePage = 1;
    this.pageArray = [];
    for ( let i = 1; i <= this.totalPages; i++) {
      this.pageArray.push(i);
    }
  }

  isLast() {
    return this.activePage === Math.max(...this.pageArray);
  }

  isFirst() {
    return this.activePage === Math.min(...this.pageArray);
  }

  next() {
    if (!this.isLast()) {
      this.activePage++;
    }
  }

  prev() {
    if (!this.isFirst()) {
      this.activePage--;
    }
  }

  first() {
    this.activePage = Math.min(...this.pageArray);
  }

  last() {
    this.activePage = Math.max(...this.pageArray);
  }

  /**
   * Getters and Setters
   */

  get items(): Array<any> {
    const startIndex: number = +(this.pageLength * (this.activePage - 1));
    const endIndex: number = startIndex + (+this.pageLength);
    const paginatedList = this.listOfItems.slice(startIndex, endIndex);
    return paginatedList;
  }

  get pageLength(): number {
    return this.pagination.pageLength;
  }

  set pageLength(length: number) {
    this.pagination.pageLength = length;
  }

  get activePage(): number {
    return this.pagination.activePage;
  }

  set activePage(page: number) {
    this.pagination.activePage = page;
  }

  get totalPages(): number {
    return this.pagination.totalPages;
  }

  set totalPages(pages: number) {
    this.pagination.totalPages = pages;
  }

  get pageArray(): Array<number> {
    return this.pagination.pageArray;
  }

  set pageArray(pages: Array<number>) {
    this.pagination.pageArray = pages;
  }

  get paginated(): boolean {
    return this.pagination.active;
  }

  set paginated(status: boolean) {
    this.pagination.active = status;
  }
}

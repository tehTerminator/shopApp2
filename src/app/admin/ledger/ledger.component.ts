import { Component, OnInit } from '@angular/core';
import { SqlRequest } from '../../interface/sql-request';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.css']
})
export class LedgerComponent implements OnInit {
  ledgerTableRequest: SqlRequest;
  constructor() {
    this.ledgerTableRequest = {
      columns: ['ledger.id as id', 'ledger.title as title', 'groups.title as groupTitle'],
      join: 'groups on groups.id = ledger.group_id',
      orderBy: 'groupTitle ASC'
    };
  }

  ngOnInit() {
  }

}

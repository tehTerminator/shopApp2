import { Injectable, OnDestroy } from '@angular/core';
import { Ledger } from '../interface/ledger';
import { SqlService } from './sql.service';
@Injectable({
  providedIn: 'root'
})
export class LedgerService implements OnDestroy {
  private listOfLedgers: Array<Ledger> = [];
  private myInterval: any;

  constructor(private sql: SqlService) {
    const MINUTE = 60 * 1000;
    setInterval(() => this.onRefresh(), MINUTE * 10);
  }

  private onRefresh() {
    this.sql.select('ledger', {
      columns: [
        'ledger.id as id',
        'ledger.title as title',
        'ledger.group_id as group_id',
        'group.title as group_title'
      ],
      join: 'GROUPS ON groups.id = ledger.id',
    }).subscribe((response: Array<Ledger>) => this.listOfLedgers = response);
  }

  ngOnDestroy() {
    clearInterval(this.myInterval);
  }

  getLedgerById(theId: number): Ledger {
    return this.listOfLedgers.find((x: Ledger) => +x.id === theId );
  }

  getLedgerByName(theName: string): Ledger {
    return this.listOfLedgers.find((x: Ledger) => {
      return x.title.toUpperCase() === theName.toUpperCase();
    });
  }

  get ledgers(): Array<Ledger> {
    return this.listOfLedgers;
  }
}

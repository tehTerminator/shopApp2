import { Component, OnInit } from '@angular/core';
import { BillService } from './bill.service';
import { Customer } from '../interface/customer';
import { Template } from '../class/template';
import { LedgerService } from '../services/ledger.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tab = 0;
  myTemp:Template;
  quantity = 0;
  amountPaid = 0;
  constructor(protected bill: BillService) { }

  ngOnInit() {
  }

  onReceivingTemplate($event: Template) {
    // Do Something with Template
    this.myTemp = Object.assign({}, $event);
    console.log(this.myTemp);
    if (this.myTemp.isProduct()) {
      this.tab = 2;
    } else {
      this.tab = 1;
    }
  }

    onReceivingCustomer($event: Customer) {
        /*
    this.bill.customer = $event;
    if ( this.myTemp.isRateFixed() ) {
      this.tab = 4;
    } else {
      this.tab = 3;
    }
         */
  }

  onSubmit() {
    // Sumbit Data to Bill
  }

  nextTab() {
    this.tab++;
  }
}

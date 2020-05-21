import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BillService } from '../bill.service';
import { SqlService } from '../../services/sql.service';
import { SqlRequest } from '../../interface/sql-request';
import { SqlResponse } from '../../interface/sql-response';
import { Customer } from '../../interface/customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {
  @Output() customerEmitter = new EventEmitter<Customer>();
  customer: Customer = { id: 1, title: 'Cash', address: 'Ashoknagar' };
  listOfCustomers: Array<Customer> = [];

  constructor(private sql: SqlService, private bill: BillService) { }

  onSearch() {
    // Do Something here
    this.customer.id = 0;
    const request: SqlRequest = { andWhere: { title: ['LIKE', `${this.customer.title}%`] } };
    this.sql.select('customers', request)
      .subscribe((res: Array<any>) => {
        this.listOfCustomers = res;
        console.log(res);
      });
  }

  selectCustomer(customer: Customer) {
    this.customer = Object.assign({}, customer);
    this.listOfCustomers = [];
  }

  onSubmit(customer: Customer) {
    // Do Some thing here
    if (customer.id > 0) {
      this.customerEmitter.emit(customer);
    } else {
      this.sql.insert('customers', {
        userData: {
          title: this.customer.title,
          address: this.customer.address
        }
      }, true)
        .subscribe((res: SqlResponse) => {
          this.customer.id = res.lastInsertId;
          this.customerEmitter.emit(customer);
        });
    }
  }

  get showResults(): boolean {
    return this.listOfCustomers.length > 0 && this.customer.title.length > 0;
  }

}

import { Injectable } from '@angular/core';
import { Template } from '../class/template';
import { Customer } from '../interface/customer';
import { InvoiceData } from '../interface/invoice-data';
import { ProductUsage } from '../interface/product-usage';
import { Voucher } from '../interface/voucher';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  theCustomer: Customer = {id: 1, title: 'Cash', address: 'Ashoknagar'};
  invoiceData: Array<InvoiceData> = [];
  vouchers: Array<Voucher> = [];
  productUsage: Array<ProductUsage> = [];

  constructor() { }

  addTemplate(temp: Template) {
    // Do Something here
  }

  setCustomer(customer: Customer) {
    this.customer = Object.assign({}, customer);
  }

  getCustomer(): Customer {
    return this.customer;
  }

  get customer(): Customer {
    return this.theCustomer;
  }

  set customer(theCustomer: Customer) {
    this.theCustomer = Object.assign({}, theCustomer);
  }
 }

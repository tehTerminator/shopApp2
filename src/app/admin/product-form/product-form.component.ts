import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SqlRequest } from './../../interface/sql-request';
import { SqlResponse } from './../../interface/sql-response';
import { SqlService } from './../../services/sql.service';
import { NotificationService } from './../../services/notification.service';
import { Product } from '../../interface/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  productForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private sql: SqlService,
    private ns: NotificationService
  ) {
    this.productForm = formBuilder.group({
      id: [0, ''],
      title: ['', Validators.required],
      rate: [0, Validators.required]
    });
  }

  onSubmit() {
    const request: SqlRequest = {
      userData: {
        title: this.title,
        rate: this.rate
      }
    };

    if ( this.id > 0 ) {
      request.andWhere = {id: this.id};
      this.sql.update('products', request)
      .subscribe(() => {
        this.ns.changeMessage({
          id: request.andWhere.id,
          title: 'Update Success',
          content: `Successfully updated ${request.userData.title}`
        });
      });
    } else {
      this.sql.insert('products', request, true)
      .subscribe((response: SqlResponse) => {
        this.ns.changeMessage({
          id: response.lastInsertId,
          title: 'Created New Product',
          content: `Successfully Created New Product ${request.userData.title}.`,
          additionalInfo: [
            'Please Update Consumption Template of Your New Product.'
          ]
        });
      });
    }
    this.onReset();
  }

  onReset() {
    this.productForm.reset();
  }

  fetchProduct() {
    this.sql.select('products', {andWhere: {id: this.id}})
    .subscribe((response: Array<Product>) => {
      if (response.length === 1) {
        const product = response[0];
        this.id = product.id;
        this.title = product.title;
        this.rate = product.rate;
      } else {
        this.onReset();
      }
    });
  }

  /** ---------------------------------
   * Getters And Setters Below Here
   * ----------------------------------
   */

  get id(): number {
    return this.productForm.get('id').value;
  }

  set id(theId: number) {
    this.productForm.get('id').setValue(theId);
  }

  get title(): string {
    return this.productForm.get('title').value;
  }

  set title(theTitle) {
    this.productForm.get('title').setValue(theTitle);
  }

  get rate(): number {
    return this.productForm.get('rate').value;
  }

  set rate(theRate: number) {
    this.productForm.get('rate').setValue(theRate);
  }
}

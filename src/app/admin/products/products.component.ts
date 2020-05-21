import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { SqlRequest } from '../../interface/sql-request';
import { SqlResponse } from '../../interface/sql-response';
import { BaseFormComponent } from '../../sharing/base-form/base-form.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent extends BaseFormComponent {
  constructor(injector: Injector) {
    super(injector);
    this.myForm = this.fb.group({
      id: [0],
      title: ['', [Validators.required, Validators.minLength(3)]],
      rate: [0, [Validators.required, Validators.min(1)]]
    });
  }

  onChange() {
    const request: SqlRequest = {
      andWhere: {id: this.id}
    };
    this.sq.select('products', request, true)
    .subscribe((res: SqlResponse) => {
      if (res.rows.length === 1) {
        const product = res.rows[0];
        this.title = product.title;
        this.rate = product.rate;
      } else {
        this.onReset();
      }
    });
  }

  onSubmit() {
    const request: SqlRequest = {
      userData: {
        title: this.title,
        rate: this.rate
      }
    };
    console.log(this.id);
    if (this.id > 0) {
      console.log('Trying to Update');
      this.update('products', request);
    } else {
      console.log('Trying to Insert');
      this.insert('products', request);
    }
  }

  /**
   * Getters and Setters
   */

  get rate(): number {
    return this.myForm.get('rate').value;
  }

  set rate(theRate) {
    if (theRate > 0 ) {
      this.myForm.get('rate').setValue(theRate);
    } else {
      this.rate = 0;
    }
  }
}

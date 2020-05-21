import { Component, OnInit } from '@angular/core';
import { SqlService, SqlRequest, SqlResponse } from '../../../services/sql.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Template } from '../../../class/template';
import { Product } from '../../../interface/product';

@Component({
  selector: 'app-template-products',
  templateUrl: './template-products.component.html',
  styleUrls: ['./template-products.component.css']
})
export class TemplateProductsComponent implements OnInit {
  tpForm: FormGroup;
  finalArray: Array<{template_id: number, product_id: number, quantity: number}> = [];
  templates: Array<Template> = [];
  products: Array<Product> = [];
  constructor(private sq: SqlService, private fb: FormBuilder) {
    this.tpForm = this.fb.group({
      template_id: [0, Validators.required],
      product_id: [0, Validators.required],
      quantity: [0, [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit() {
    this.sq.select('template')
    .subscribe((res: Array<Template>) => {
      for (const item of res) {
        this.templates.push(new Template(item.id, item.title, item.rate));
      }
    });
    this.sq.select('products')
    .subscribe((res: Array<Product>) => this.products = res);
  }

  onAdd() {
    const existingRow = this.finalArray.find( x => +x.product_id === +this.product );
    if (existingRow !== undefined ) {
      const index = this.finalArray.indexOf(existingRow);
      this.finalArray.splice(index, 1);
    }
    this.finalArray.push({
      template_id: this.template,
      product_id: this.product,
      quantity: this.quantity
    });
  }

  onSelect() {
    const req: SqlRequest = {
      andWhere: {template_id: this.template}
    };
    this.sq.select('template_products', req, true)
    .subscribe((res: SqlResponse) => {
      console.log(res);
      this.finalArray = res.rows;
    });
  }

  onDelete(item: any) {
    const req: SqlRequest = {
      andWhere : {
        template_id: this.template,
        product_id: item.product_id
      }
    };
    this.sq.delete('template_product', req).subscribe(() => {
      const index = this.finalArray.indexOf(item);
      this.finalArray.splice(index, 1);
    });
  }

  onSubmit() {
    this.sq.delete('template_products', {
      andWhere: {template_id: this.template}
    }).subscribe(() => {
      this.sq.insert('template_products', {
        userData: this.finalArray
      }, true).subscribe((res: SqlResponse) => console.log(res));
    });
  }


  get template(): number {
    return this.tpForm.get('template_id').value;
  }

  get product(): number {
    return this.tpForm.get('product_id').value;
  }

  get quantity(): number {
    return this.tpForm.get('quantity').value;
  }

}

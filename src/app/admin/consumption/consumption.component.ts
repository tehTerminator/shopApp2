import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';
import { SqlService } from '../../services/sql.service';
import { Product } from '../../interface/product';
import { RawMaterial } from '../../interface/raw-material';
import { SqlResponse } from '../../interface/sql-response';


@Component({
  selector: 'app-consumption',
  templateUrl: './consumption.component.html',
  styleUrls: ['./consumption.component.css']
})
export class ConsumptionComponent implements OnInit {
  consumptionForm: FormGroup;
  consumptionTemplate: Array<any> = [];
  private productList: Array<Product> = [];
  private materialList: Array<RawMaterial> = [];

  constructor(
    private fb: FormBuilder,
    private ns: NotificationService,
    private sql: SqlService) {
      this.consumptionForm = this.fb.group({
        product_id: [0, [Validators.required, Validators.min(1)]],
        material_id: [0, [Validators.required, Validators.min(1)]],
        quantity: [0, Validators.required]
      });
  }

  ngOnInit() {
    this.sql.select('products')
    .subscribe((res: Array<Product>) => this.productList = res);
    this.sql.select('raw_material')
    .subscribe((res: Array<RawMaterial>) => this.materialList = res);
    this.ns.changeMessage({
      title: 'Page Loaded',
      content: 'This implies that Notification Service is running correctly'
    });
  }

  onAdd() {
    console.log(this.consumptionTemplate, this.material);
    if ( this.consumptionTemplate.some( (x: any) => +x.material_id === +this.material ) ) {
      const index = this.consumptionTemplate.findIndex( (x: any) => +x.material_id === +this.material );
      this.consumptionTemplate[index].quantity = this.quantity;
    } else {
      this.consumptionTemplate.push({
        product_id: this.product,
        material_id: this.material,
        quantity: this.quantity
      });
    }
    this.material = 0;
    this.quantity = 0;
    this.consumptionForm.get('product_id').disable();
  }

  onRemove(index: number) {
    this.consumptionTemplate.splice(index, 1);
  }

  onReset = () => {
    this.consumptionTemplate = [];
    this.consumptionForm.reset();
    this.consumptionForm.get('product_id').enable();
  }

  onSubmit() {
    const info = [];
    for (const iterator of this.consumptionTemplate) {
      this.sql.insert('consumption_template', {
        userData: iterator
      }, true).subscribe((res: SqlResponse) => {
        console.log(res);
      });
      info.push(`Material - ${this.materialName(iterator.material_id)}; Quantity - ${iterator.quantity}`);
    }
    this.ns.changeMessage({
      title: 'Insert Success',
      content: `Successfully Created Consumption Template For ${this.productName(this.product)}`,
      additionalInfo: info
    });
    this.onReset();
  }

  productName(id: number): string {
    return this.productList.find((x: Product) => x.id === id).title;
  }

  materialName(id: number): string {
    return this.materialList.find((x: RawMaterial) => x.id === id).title;
  }

  /** ***************************************************************
   * Getters and Setters
   * ****************************************************************
   */

  get products(): Array<Product> {
    return this.productList;
  }

  get rawMaterials(): Array<RawMaterial> {
    return this.materialList;
  }

  get quantity(): number {
    return this.consumptionForm.get('quantity').value;
  }

  set quantity(q: number) {
    this.consumptionForm.get('quantity').setValue(q);
  }

  get product(): number {
    return this.consumptionForm.get('product_id').value;
  }

  get material(): number {
    return this.consumptionForm.get('material_id').value;
  }

  set material(id: number) {
    this.consumptionForm.get('material_id').setValue(id);
  }
}

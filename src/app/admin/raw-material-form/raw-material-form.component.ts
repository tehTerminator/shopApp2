import { Component, OnInit, OnDestroy } from '@angular/core';
import { SqlService } from './../../services/sql.service';
import { NotificationService } from './../../services/notification.service';
import { RawMaterial } from './../../interface/raw-material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SqlRequest } from '../../interface/sql-request';
import { SqlResponse } from '../../interface/sql-response';
import { Message } from '../../interface/message';

@Component({
  selector: 'app-raw-material-form',
  templateUrl: './raw-material-form.component.html',
  styleUrls: ['./raw-material-form.component.css']
})
export class RawMaterialFormComponent implements OnInit, OnDestroy {
  theForm: FormGroup;
  searchText = '';
  private timer: any;
  private rawMaterialList: Array<RawMaterial> = [];

  constructor(
    private fb: FormBuilder,
    private sql: SqlService,
    private notificationService: NotificationService,
  ) {
    this.theForm = this.fb.group({
      id: [0],
      title: ['', Validators.required],
      quantity: [0, Validators.required]
    });
  }

  ngOnInit() {
    this.onRefresh();
    this.timer = setInterval(() => this.onRefresh(), 5000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  onIdChange() {
    // Get Raw Material Name
    this.sql.select('raw_material', {
      andWhere: { id: this.id }
    }).subscribe((res: Array<RawMaterial>) => {
      if (res.length > 0) {
        this.id = res[0].id;
        this.title = res[0].title;
        this.quantity = res[0].quantity;
      } else {
        this.onReset();
      }
    });
  }

  onSubmit() {
    const request: SqlRequest = {
      userData: { title: this.title, quantity: this.quantity }
    };
    if (this.id > 0) {
      request.andWhere = { id: this.id };
      this.sql.update('raw_material', request)
        .subscribe(() => {
          this.onSuccess({
            id: this.id,
            title: 'Update Success',
            content: `Raw Material - ${this.title} updated Successfully.`,
          });
        });
    } else {
      this.sql.insert('raw_material', request, true)
        .subscribe((response: SqlResponse) => {
          this.onSuccess({
            id: response.lastInsertId,
            title: 'Insert Success',
            content: `New Raw Material - ${this.title}, created Successfully.`
          });
        });
    }
  }

  onSuccess(message: Message) {
    this.notificationService.changeMessage(message);
    this.onReset();
  }

  onRefresh = () => this.sql.select('raw_material')
  .subscribe((response: Array<RawMaterial>) => this.rawMaterialList = response)
  
  onReset = () => this.theForm.reset();

  // ---------------------------------------------
  // Getters and Setters Below Here
  // ---------------------------------------------
  get idField() {
    return this.theForm.get('id');
  }

  get titleField() {
    return this.theForm.get('title');
  }

  get quantityField() {
    return this.theForm.get('quantity');
  }

  get id(): number {
    return this.idField.value;
  }

  set id(val: number) {
    this.idField.setValue(val);
  }

  get title(): string {
    return this.titleField.value;
  }

  set title(theTitle: string) {
    this.titleField.setValue(theTitle);
  }

  get quantity(): number {
    return this.quantityField.value;
  }

  set quantity(theQuantity: number) {
    this.quantityField.setValue(theQuantity);
  }

  get rawMaterial(): Array<RawMaterial> {
    return this.rawMaterialList;
  }

}

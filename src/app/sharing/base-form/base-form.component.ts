import { Component, Injector } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SqlService } from '../../services/sql.service';
import { SqlRequest } from '../../interface/sql-request';
import { SqlResponse } from '../../interface/sql-response';

@Component({
  selector: 'app-base-form',
  template: `<div></div>`
})
export class BaseFormComponent {
  protected myForm: FormGroup;
  protected fb: FormBuilder;
  protected sq: SqlService;
  protected ns: NotificationService;

  constructor(injector: Injector) {
    this.fb = injector.get(FormBuilder);
    this.sq = injector.get(SqlService);
    this.ns = injector.get(NotificationService);
  }

  protected update(tableName: string, request: SqlRequest) {
    request.andWhere = {id: this.id};
    this.sq.update(tableName, request)
    .subscribe(() => {
      this.ns.changeMessage({
        id: this.id,
        title: 'Update Successfull',
        content: `${tableName.toUpperCase()} - ${this.title} updated successfully`
      });
      this.myForm.reset();
    });
  }

  protected insert(tableName: string, request: SqlRequest) {
    this.sq.insert(tableName, request, true)
    .subscribe(() => {
      this.ns.changeMessage({
        id: this.id,
        title: 'Insert Success',
        content: `${tableName.toUpperCase()} - ${this.title} inserted Successfully`
      });
      this.myForm.reset();
    });
  }

  onReset = () => this.myForm.reset();

  /**
   * Getters and Setters
   */
  get id(): number {
    return +this.myForm.get('id').value;
  }

  set id(theId: number) {
    this.myForm.get('id').setValue(theId);
  }

  get title(): string {
    return this.myForm.get('title').value;
  }

  set title(theTitle: string) {
    this.myForm.get('title').setValue(theTitle);
  }
}

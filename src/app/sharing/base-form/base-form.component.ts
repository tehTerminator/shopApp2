import { Component, Injector } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SqlService } from '../../services/sql.service';
import { SqlRequest } from '../../interface/sql-request';
import { SqlResponse } from '../../interface/sql-response';
import { Message } from '../../interface/message';

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

  protected update(tableName: string, request: SqlRequest, theMessage?: Message) {
    request.andWhere = {id: this.id};
    this.sq.update(tableName, request)
    .subscribe(() => {
      let message: Message = {
        id: this.id,
        title: 'Update Success',
        content: `${tableName.toUpperCase()} - ${this.title} updated successfully`
      };
      if (theMessage !== undefined ) {
        message = theMessage;
      }
      this.ns.changeMessage(message);
      this.myForm.reset();
    });
  }

  protected insert(tableName: string, request: SqlRequest, theMessage?: Message) {
    this.sq.insert(tableName, request, true)
    .subscribe((res: SqlResponse) => {
      console.log(res);
      let message: Message = {
          id: res.lastInsertId,
          title: 'Insert Success',
          content: `${tableName.toUpperCase()} - ${this.title} inserted Successfully`
      };
      if (theMessage !== undefined ) {
        message = theMessage;
        message.id = res.lastInsertId;
      }
      this.ns.changeMessage(message);
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
    try {
      return this.myForm.get('title').value;
    } catch (e) {
      return '';
    }
  }

  set title(theTitle: string) {
    try {
      this.myForm.get('title').setValue(theTitle);
    } catch (e) {
      console.log('Title Does not exist on this form');
    }
  }
}

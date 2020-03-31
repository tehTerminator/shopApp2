import { Component, OnInit, Inject, Injector } from '@angular/core';
import { BaseFormComponent } from '../../../sharing/base-form/base-form.component';
import { Validators } from '@angular/forms';
import { Ledger } from '../../../interface/ledger';
import { SqlRequest } from '../../../services/sql.service';

@Component({
  selector: 'app-template-info',
  templateUrl: './template-info.component.html',
  styleUrls: ['./template-info.component.css']
})
export class TemplateInfoComponent extends BaseFormComponent implements OnInit {
  private listOfLedgers: Array<Ledger> = [];
  private listOfTemplates: Array<{id: number, title: number}> = [];
  private listOfCategories: Array<{id: number, title: number}> = [];

  constructor(injector: Injector) {
    super(injector);
    this.myForm = this.fb.group({
      templateId: [0, Validators.required],
      categoryId: [0, Validators.required],
      creditorId: 0,
      amount: [0, Validators.min(0)]
    });
  }

  ngOnInit() {
    // Fetch Ledgers
    this.sq.select('ledger')
    .subscribe((res: Array<Ledger>) => this.listOfLedgers = res);

    // Fetch Templates
    this.sq.select('template', {columns: ['id', 'title']})
    .subscribe((res: Array<any>) => this.listOfTemplates = res);

    // Fetch Categories
    this.sq.select('category')
    .subscribe((res: any) => this.listOfCategories = res);
  }

  onTemplateIdChange() {
    this.sq.select('template_info', {andWhere: {template_id: this.templateId}})
    .subscribe((res: any) => {
      if (res.length === 1) {
        this.categoryId = res[0].category_id;
        this.creditorId = res[0].creditor_id;
        this.amount = res[0].amount;
      }
    });
  }

  onSubmit() {
    const request: SqlRequest = {
      userData: {
        template_id : this.templateId,
        creditor_id : this.creditorId,
        category_id : this.categoryId,
        amount: this.amount
      }
    };
    if (request.userData.creditor_id === 0 ) {
      delete(request.userData.creditor_id);
    }

    this.sq.delete('template_info', {andWhere: {template_id: this.templateId}})
    .subscribe(() => {
      this.sq.insert('template_info', request).subscribe(() => {
        this.ns.changeMessage({
          title: 'Success',
          content: 'Table Template Info Updated Successfully'
        });
        this.onReset();
      });
    });
  }

  /**
   * Getters and Setters
   */

  get categories(): Array<any> {
    return this.listOfCategories;
  }
  get ledger(): Array<any> {
    return this.listOfLedgers;
  }
  get templates(): Array<any> {
    return this.listOfTemplates;
  }

  get templateId(): number {
    return +this.myForm.get('templateId').value;
  }

  set templateId(theId: number) {
    this.myForm.get('templateId').setValue(theId);
  }

  get categoryId(): number {
    return +this.myForm.get('categoryId').value;
  }

  set categoryId(theId: number) {
    this.myForm.get('categoryId').setValue(theId);
  }

  get creditorId(): number {
    return +this.myForm.get('creditorId').value;
  }

  set creditorId(theId: number) {
    this.myForm.get('creditorId').setValue(theId);
  }

  get amount(): number {
    return +this.myForm.get('amount').value;
  }

  set amount(theAmount: number) {
    this.myForm.get('amount').setValue(theAmount);
  }


}

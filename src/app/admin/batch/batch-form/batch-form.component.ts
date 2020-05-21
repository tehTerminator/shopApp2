import { Component, Injector } from '@angular/core';
import { BaseFormComponent } from '../../../sharing/base-form/base-form.component';
import { Validators } from '@angular/forms';
import { SqlRequest } from '../../../interface/sql-request';
import { ValidateJSON } from './validate-json';
import { Template } from './../../../class/template';
import { SqlResponse } from '../../../interface/sql-response';

@Component({
  selector: 'app-batch-form',
  templateUrl: './batch-form.component.html',
  styleUrls: ['./batch-form.component.css']
})
export class BatchFormComponent extends BaseFormComponent {

  constructor(injector: Injector) {
    super(injector);
    this.myForm = this.fb.group({
      id: [0, Validators.min(0)],
      title: ['', [Validators.required, Validators.minLength(3)]],
      rate: [0, [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit() {
    const request: SqlRequest = {
      userData: {
        title: this.title,
        rate: this.rate,
      }
    };
    if (this.id > 0) {
      this.update('template', request);
    } else {
      this.insert('template', request);
    }
  }

  fetchTemplate() {
    this.sq.select('template', {andWhere: {id: this.id}}, true)
    .subscribe((res: SqlResponse) => {
      console.log(res);
      if (res.rows.length === 1) {
        const tmp = res.rows[0];
        this.title = tmp.title;
        this.rate = tmp.rate;
        this.info = tmp.info;
      } else {
        this.onReset();
      }
    });
  }

  /**
   * Getters and setters
   */
  get rate(): number {
    return this.myForm.get('rate').value;
  }

  set rate(theRate: number) {
    this.myForm.get('rate').setValue(theRate);
  }

  get info(): string {
    return JSON.stringify(this.myForm.get('info').value);
  }

  set info(theInfo: string) {
    this.myForm.get('info').setValue(theInfo);
  }

  get infoField() {
    return this.myForm.get('info');
  }
}

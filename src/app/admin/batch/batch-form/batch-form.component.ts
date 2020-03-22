import { Component, Injector } from '@angular/core';
import { BaseFormComponent } from '../../../sharing/base-form/base-form.component';
import { Validators } from '@angular/forms';
import { SqlRequest } from '../../../interface/sql-request';
import { ValidateJSON } from './validate-json';

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
      info: ['{}', [Validators.required, Validators.min(2), ValidateJSON]]
    });
  }

  onSubmit() {
    const request: SqlRequest = {
      userData: {
        title: this.title,
        rate: this.rate,
        info: this.info
      }
    };
    if (this.id > 0) {
      this.update('template', request);
    } else {
      this.insert('template', request);
    }
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

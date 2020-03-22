import { Component, OnInit, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { SqlRequest } from '../../../interface/sql-request';
import { BaseFormComponent } from '../../../sharing/base-form/base-form.component';


@Component({
  selector: 'app-ledger-form',
  templateUrl: './ledger-form.component.html',
  styleUrls: ['./ledger-form.component.css']
})
export class LedgerFormComponent extends BaseFormComponent implements OnInit {
  private listOfGroups: Array<{id: number, title: string}> = [];

  constructor(injector: Injector) {
    super(injector);
    this.myForm = this.fb.group({
      id: [0, Validators.min(0)],
      title: ['', [Validators.required, Validators.minLength(3)]],
      group_id: [0, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.sq.select('groups', {columns: ['id', 'title'], orderBy: 'title ASC'})
    .subscribe((res: Array<any>) => this.listOfGroups = res);
  }

  onSubmit() {
    const request: SqlRequest = {
      userData: {title: this.title, group_id: this.groupId }
    };
    if (this.id > 0) {
      this.update('ledger', request);
    } else {
      this.insert('ledger', request);
    }
  }

  fetchLedger() {
    this.sq.select('ledger', {andWhere: {id: this.id}})
    .subscribe((res: Array<any>) => {
      if (res.length === 1) {
        this.title = res[0].title;
        this.groupId = res[0].group_id;
      } else {
        this.onReset();
      }
    });
  }

  /***********************************************************
   *  Getters and Setters
   * *********************************************************
   */

  get groupId(): number {
    return +this.myForm.get('group_id').value;
  }

  set groupId(groupId: number) {
    this.myForm.get('group_id').setValue(groupId);
  }

  get groups(): Array<any> {
    return this.listOfGroups;
  }

}

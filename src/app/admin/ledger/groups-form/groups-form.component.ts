import { Component, OnInit, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { SqlRequest } from './../../../interface/sql-request';
import { BaseFormComponent } from '../../../sharing/base-form/base-form.component';


@Component({
  selector: 'app-groups-form',
  templateUrl: './groups-form.component.html',
  styleUrls: ['./groups-form.component.css']
})
export class GroupsFormComponent extends BaseFormComponent implements OnInit {
  private listOfGroups: Array<{id: number, title: string, child_of: number}> = [];

  constructor(injector: Injector) {
    super(injector);
    this.myForm = this.fb.group({
      id: [0, Validators.min(0)],
      title: ['', [Validators.required, Validators.minLength(3)]],
      childOf: [0, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    const request: SqlRequest = {
      userData: {
        title: this.title,
        child_of: this.childOf
      }
    };
    if (this.id > 0) {
      this.update('groups', request);
    } else {
      this.insert('groups', request);
    }
  }

  ngOnInit() {
    this.fetchAllGroups();
  }

  fetchAllGroups() {
    this.sq.select('groups').subscribe((res: Array<any>) => this.listOfGroups = res);
  }

  fetchGroup() {
    this.sq.select('groups', {andWhere: {id: this.id}})
    .subscribe((res: Array<any>) => {
      if (res.length === 1) {
        const group: {id: number, title: string, child_of: number} = res[0];
        this.id = group.id;
        this.title = group.title;
        this.childOf = group.child_of;
      } else {
        this.onReset();
      }
    });
  }

  /** ***************************************
   * Getters and Setters
   * ****************************************
   */
  get childOf(): number {
    return +this.myForm.get('childOf').value;
  }

  set childOf(childOf: number) {
    this.myForm.get('childOf').setValue(+childOf);
  }

  get groups(): Array<any> {
    return this.listOfGroups;
  }
}

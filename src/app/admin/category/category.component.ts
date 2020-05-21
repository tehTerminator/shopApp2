import { Component, OnInit, Injector } from '@angular/core';
import { BaseFormComponent } from '../../sharing/base-form/base-form.component';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent extends BaseFormComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
    this.myForm = this.fb.group({
      id: [0, Validators.min(0)],
      title: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSubmit() {
    const request = {
      userData: {
        id: this.id,
        title: this.title
      }
    };
    if (this.id > 0) {
      this.update('category', request);
    } else {
      this.insert('category', request);
    }
  }

  ngOnInit() {
  }

}

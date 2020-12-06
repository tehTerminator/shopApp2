import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PosItemService } from '../../../shared/pos-item.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {

  constructor(
    private posItemSerice: PosItemService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  showPosForm() {
    return this.posItemSerice.editMode;
  }

  showTemplateForm() {
    return (this.posItemSerice.editMode) && (this.posItemSerice.indexOfEditedTemplate >= 0)
  }

}

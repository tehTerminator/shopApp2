import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PosItem, PosItemService } from '../../../../shared/pos-item.service';
import { CollectionService } from '../../../../shared/collection.service';

@Component({
  selector: 'app-template-edit-form',
  templateUrl: './template-edit-form.component.html',
  styleUrls: ['./template-edit-form.component.css']
})
export class TemplateEditFormComponent implements OnInit {
  templateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private posItemService: PosItemService,
    private collectionService: CollectionService
  ) { }

  ngOnInit(): void {
    this.templateForm = this.formBuilder.group({
      'pos_item_id': [null, [Validators.required]],
      'collection_id': [null, [Validators.required]],
      'quantity': [null, [Validators.required, Validators.min(0.1)]],
      'rate': [null, [Validators.required, Validators.min(0.1)]]
    });
  }

  onSubmit() {
    if (this.templateForm.invalid) {
      return;
    }

    const template = this.posItemService.templateBeinEdited;
    template.pos_item_id = this.posItemId.value;
    template.collection_id = this.collectionId.value;
    template.quantity = this.quantity.value;
    template.rate = this.rate.value;

    this.posItemService.updatePosItemTemplate(template)
    .subscribe(() => {
      this.posItemService.indexOfEditedTemplate = -1;
      this.templateForm.reset();
    }, (error) => {
      this.snackBar.open(error, 'DISMISS', {duration: 5000});
    })
  }

  onReset() {
    this.posItemService.indexOfEditedTemplate = -1;
    this.templateForm.reset();
  }

  get templates() {
    let itemBeingEdited: PosItem;
    try{
      itemBeingEdited = this.posItemService.itemBeingEdited;
      if (itemBeingEdited.templates === undefined) {
        itemBeingEdited.templates = [];
      }
    } catch(error) {
      itemBeingEdited.templates = []
    } finally {
      return itemBeingEdited.templates;
    }
  }

  get posItems() {
    return this.posItemService.posItems;
  }

  get collections() {
    return this.collectionService.collection;
  }

  get showForm() {
    return this.posItemService.editMode && this.posItemService.indexOfEditedTemplate >= 0;
  }

  get posItemId() {
    return this.templateForm.get('pos_item_id') as FormControl;
  }

  get collectionId() {
    return this.templateForm.get('collection_id') as FormControl;
  }

  get quantity() {
    return this.templateForm.get('quantity') as FormControl;
  }

  get rate() {
    return this.templateForm.get('rate') as FormControl;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CollectionService } from '../../shared/collection.service';
import { PosItem, PosItemService } from '../../shared/pos-item.service';

@Component({
  selector: 'app-pos-item-form-page',
  templateUrl: './pos-item-form-page.component.html',
  styleUrls: ['./pos-item-form-page.component.css']
})
export class PosItemFormPageComponent implements OnInit {
  posForm: FormGroup;
  private editMode = false;
  private posItemId = 0;

  constructor(
    private fb: FormBuilder, 
    private collectionService: CollectionService,
    private snackBar: MatSnackBar,
    private posItemservice: PosItemService
  ) { }

  ngOnInit(): void {
    this.posForm = this.fb.group({
      'displayName': ['', [Validators.required, this.nameValidator.bind(this)]],
      'rate': [0, [Validators.required, Validators.min(1)]],
      'templates': this.fb.array([])
    });
  }

  createNewTemplate(){
    const newTemplate = this.fb.group({
      'pos_item_id': null,
      'collection_id': [null, Validators.required],
      'quantity': [0, [Validators.required, Validators.min(0.1)]],
      'rate': [0, [Validators.required, Validators.min(1)]]
    });

    this.templates.push(newTemplate);
  }

  onSubmit() {
    if ( this.posForm.invalid ) {
      this.snackBar.open('Invalid Form Data', 'DISMISS', {duration: 5000});
      return;
    }

    this.posItemservice.createNewPosItem(this.posForm.value)
    .subscribe(() => {
      this.snackBar.open('Item Create Success', 'DISMISS', {duration: 5000});
      this.posForm.reset();
    },(error) => {
      this.snackBar.open(error, 'DISMISS', {duration: 5000});
    });
  }

  private nameValidator(control: FormControl): ValidatorFn {
    return (control: FormControl) => {
      const name = control.value.toLowerCase();
      this.posItemservice.posItems
      .subscribe((items: PosItem[]) => {
        if( items.findIndex(x => x.displayName.toLowerCase() === name) >= 0 ) {
          return {'nameNotAvailable': true};
        }
      });
      return null;
    }
  }

  get templates() {
    return this.posForm.get('templates') as FormArray;
  }

  get displayName() {
    return this.posForm.get('displayName') as FormControl;
  }

  get rate() {
    return this.posForm.get('rate') as FormControl;
  }

  get collection() {
    return this.collectionService.collection;
  }

}
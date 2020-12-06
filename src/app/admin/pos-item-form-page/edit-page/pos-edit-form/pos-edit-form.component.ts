import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PosItemService } from '../../../../shared/pos-item.service';

@Component({
  selector: 'app-pos-edit-form',
  templateUrl: './pos-edit-form.component.html',
  styleUrls: ['./pos-edit-form.component.css']
})
export class PosEditFormComponent implements OnInit {
  posForm: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private posItemService: PosItemService) { }

  ngOnInit(): void {
    this.posForm = this.formBuilder.group({
      'displayName': [null, [Validators.required]],
      'rate': [null, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.posForm.invalid) {
      return;
    }
    try{
      const itemBeingEdited = this.posItemService.itemBeingEdited;
      itemBeingEdited.displayName = this.displayName.value;
      itemBeingEdited.rate = this.rate.value;

      this.posItemService.updatePosItem(itemBeingEdited)
      .subscribe(() => {
        this.snackBar.open(itemBeingEdited.displayName + ' updated Successfully', 'OK', {duration: 5000});
      }, (error) => {
        this.snackBar.open(error, 'DISMISS', {duration: 5000});
      });
    } catch(error) {
      this.snackBar.open(error, 'DISMISS', {duration: 5000});
    }
  }

  onReset() {
    this.posItemService.indexOfEditedItem = -1;
    this.posForm.reset();
  }

  get posItems() {
    return this.posItemService.posItems;
  }

  selectItem(index: number) {
    this.posItemService.indexOfEditedItem = index;
  }

  get showForm() {
    return this.posItemService.editMode;
  }

  get displayName() {
    return this.posForm.get('displayName') as FormControl;
  }

  get rate() {
    return this.posForm.get('rate') as FormControl;
  }
}

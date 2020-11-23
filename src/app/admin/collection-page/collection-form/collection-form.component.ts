import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { CollectionItem, CollectionService, KIND } from '../../../shared/collection.service';

@Component({
  selector: 'app-collection-form',
  templateUrl: './collection-form.component.html',
  styleUrls: ['./collection-form.component.css']
})
export class CollectionFormComponent implements OnInit{
  title: string;
  collectionForm: FormGroup;
  kindOfItems: Array<string> = Object.values(KIND);
  loading = false;

  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder, 
    private collectionService: CollectionService) { }

  ngOnInit(): void {
    this.title = 'Create New Collection Item';
    this.collectionForm = this.formBuilder.group({
      'id': null,
      'displayName': ['', Validators.required],
      'kind': [this.kindOfItems[0], Validators.required]
    });
  }

  onIdChange() {
    const value = this.id.value;
    let item = null;
    if (value >= 0) {
      try{
        item = this.collectionService.getCollectionById(value);
        this.patchFormValues(item);
      } catch(e) {
        this.snackBar.open(e, 'DISMISS', {duration: 2000});
        this.patchFormValues(null);
      }
    } else {
      this.patchFormValues(null);
    }
  }

  private patchFormValues(item: CollectionItem) {
    if( item === null ) {
      this.collectionForm.reset();
      this.title = 'Create New Collection Item';
      this.displayName.clearValidators();
      this.displayName.setValidators(Validators.required);
    } else {
      this.collectionForm.patchValue(item);
      this.displayName.setValidators(this.displayNameValidator.bind(this));
      this.title = 'Update Collection Item'
    }
  }

  onSubmit() {
    if(this.collectionForm.invalid) {
      return;
    }

    this.loading = true;
    if (this.id.value > 0) {
      this.collectionService.edit(this.collectionForm.value)
      .subscribe(
        () => this.onReset('Item Saved Success'),
        (error) => { 
          console.log(error);
          this.onReset('Unable to Save Item');
        }
      );
    } else {
      this.collectionService.create(this.displayName.value, this.kind.value)
      .subscribe(
        () => this.onReset('Item Created Success'),
        (error) => {
          console.log(error);
          this.onReset('Unable to Create New Item');
        }
      )
    }
  }

  private onReset(message: string) {
    this.loading = false;
    this.snackBar.open(message, 'DISMISS', {duration: 2000});
    this.collectionForm.reset();
  }

  displayNameValidator(): ValidatorFn {
    return (fn: FormControl) => {
      const itemName = fn.value;
      try{
        const item = this.collectionService.getCollectionByName(itemName)
        if (item !== undefined ) {
          return {'displayNameNotAvailable': true};
        }
      } catch (e) {
        return null;
      }
    }
  }

  get id(): FormControl {
    return this.collectionForm.get('id') as FormControl;
  }

  get displayName(): FormControl {
    return this.collectionForm.get('displayName') as FormControl;
  }

  get kind(): FormControl {
    return this.collectionForm.get('kind') as FormControl;
  }
}

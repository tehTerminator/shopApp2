import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class PosItemService {
  private _posItems: BehaviorSubject<PosItem[]> = new BehaviorSubject([]);
  private _indexOfEditedItem = -1;
  private _indexOfEditedTemplate = -1;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.fetchItems();
  }

  public fetchItems() {
    this.http.get('/api/pos-item')
    .subscribe((posItems: PosItem[]) => {
      this._posItems.next(posItems);
    },
    (error) => {
      this.snackBar.open('Unable to Fetch Pos Items', 'DISMISS', {duration: 5000});
      console.log(error);
    }
    );
  }

  get posItems(): Observable<PosItem[]> {
    return this._posItems;
  }

  private fetchTemplate(id: number) {
    return this.http.get(`/api/pos-item-template/${id}`,)
    .pipe(tap((posItemTemplate: POSItemTemplate[]) => {
      const posItems = this._posItems.value;
      const item = posItems.find(x => x.id === id);
      item.templates = posItemTemplate;
      this._posItems.next(posItems);
    }))
  }

  getItemById(id: number) {
    const item = this._posItems.value.find(x=>x.id === id);
    if (item === undefined) {
      throw 'Item Not Found';
    }
    
    if (item.templates !== undefined) {
      return Object.assign({}, item);
    } else {
      this.fetchTemplate(id)
      .subscribe(() => this.getItemById(id));
    }
  }

  createNewPosItem(posItem: PosItem){
    return this.http.post('/api/create/pos-item', posItem)
    .pipe(tap((posItem: PosItem) => {
      this._posItems.next([...this._posItems.value, posItem]);
    }),
    catchError(error => {
      console.log(error);
      throw 'Unable to Create New Item';
    }));
  }
  
  updatePosItem(posItem: PosItem) {
    return this.http.post('/api/update/pos-item', posItem)
    .pipe(tap(() => {
      const newPosItems = this._posItems.value;
      newPosItems.splice(this._indexOfEditedItem, 1, posItem);
      this._posItems.next(newPosItems);
    }),
    catchError(error => {
      console.log(error);
      throw 'Unable to Update Pos Item';
    }));
  }

  updatePosItemTemplate(template: POSItemTemplate) {
    return this.http.post('/api/update/pos-item-template', template)
    .pipe(tap((posTemplate: POSItemTemplate) => {
      const item = this.getItemByIndex(this.indexOfEditedItem);
      item.templates.splice(this._indexOfEditedTemplate, 1, posTemplate);
      const newPosItems = this._posItems.value;
      newPosItems.splice(this._indexOfEditedItem, 1, item);
      this._posItems.next(newPosItems);
      this._indexOfEditedTemplate = -1;
    }), catchError((error) => {
      console.log(error);
      throw 'Unable to Update POS Template';
    }));
  }

  /**
   * Returns PosItem using Index of Element
   * @param index of Item from List
   */
  getItemByIndex(index: number) {
    if( index < this._posItems.value.length){
      return Object.assign({}, this._posItems.value[index]);
    }
    else {
      throw 'Item Not Found Error';
    }
  }

  get indexOfEditedItem() {
    return this._indexOfEditedItem;
  }

  set indexOfEditedItem(index: number) {
    if(index < this._posItems.value.length) {
      this._indexOfEditedItem = index;
    } else {
      this._indexOfEditedItem = -1;
    }
  }

  get indexOfEditedTemplate() {
    return this._indexOfEditedTemplate;
  }

  set indexOfEditedTemplate(index: number) {
    const editedItem = this.getItemByIndex(this.indexOfEditedItem);
    if (index < editedItem.templates.length) {
      this._indexOfEditedTemplate = index;
    } else {
      this._indexOfEditedTemplate = -1;
    }
  }

  get editMode() {
    return this._indexOfEditedItem >= 0;
  }

  get itemBeingEdited {
    if (this.editMode) {
      return Object.assign({}, this.getItemByIndex(this.indexOfEditedItem));
    } else {
      throw 'Please Enable Edit Mode First';
    }
  }

  get templateBeinEdited {
    if (this.editMode) {
      return Object.assign({}, this.itemBeingEdited.templates[this.indexOfEditedTemplate]);
    } else {
      throw 'Please Select Template First';
    }
  }
}

export interface PosItem{
  id?: number;
  displayName: string;
  rate: number;
  templates?: POSItemTemplate[];
}

export interface POSItemTemplate {
  id?: number;
  pos_item_id: number;
  collection_id: number;
  quantity: number;
  rate: number;
}

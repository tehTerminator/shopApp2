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
      this.fetchTemplate(id).subscribe(() => this.getItemById(id));
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
    return this.http.post('/api/update', posItem)
    .pipe(tap(() => {
      const newPosItems = this._posItems.value;
      newPosItems.splice(newPosItems.findIndex(x=>x.id === posItem.id), 1, posItem);
      this._posItems.next(newPosItems);
    }),
    catchError(error => {
      console.log(error);
      throw 'Unable to Update Pos Item';
    }));
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

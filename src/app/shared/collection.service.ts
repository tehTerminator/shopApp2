import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollectionService implements OnDestroy {
  private _collection:BehaviorSubject<CollectionItem[]> = new BehaviorSubject([]);
  private _timer = null;

  constructor(private http: HttpClient) {
    this.OnInit();
  }

  refresh() {
    this.http.get('/api/collection')
    .subscribe((res: CollectionItem[]) => {
      this._collection.next(res);
    });
  }

  create(displayName: string, kind: string) {
    return this.http.post('/api/create/collection', {displayName, kind})
    .pipe(
      tap((item: CollectionItem) => this._collection.next([...this._collection.value, item])),
      catchError(error => { throw error.error; })
    );
  }

  edit(item: CollectionItem) {
    return this.http.post('/api/edit/collection', item)
    .pipe(
      tap((item: CollectionItem) => {
        const itemToDelete = this._collection.value.find(x=>x.id === item.id);
        const indexOfItemToDelete = this._collection.value.indexOf(itemToDelete);
        const newCollection = [...this._collection.value].splice(indexOfItemToDelete, 1);
        this._collection.next(newCollection);
      }),
      catchError(error => {throw error.error})
    );
  }

  getCollectionById(id: number) {
    const item = this._collection.value.find(x=> x.id === id);
    if (item === undefined) {
      throw 'Item Not Found';
    } 
    return Object.assign({}, item);
  }

  getCollectionByName(displayName: string) {
    displayName = displayName.toLowerCase();
    const item = this._collection.value.find(x=>x.displayName.toLowerCase() === displayName);
    if (item === undefined) {
      throw 'Item Not Found';
    }
    return Object.assign({}, item);
  }

  deleteItem(id: number) {
    return this.http.delete(`/api/delete/collection/${id}`)
    .pipe(tap((response: any) => {
      const newCollection = this._collection.value;
      newCollection.splice(newCollection.findIndex(x=>x.id === id), 1);
      this._collection.next(newCollection);
    }),
    catchError(error => {
      throw error.error.message;
    }));
  }

  get collection() {
    return this._collection;
  }

  get products(): Observable<CollectionItem[]>{
    return this.filterCollectionByKind(KIND.PRODUCT);
  }

  get ledgers(): Observable<CollectionItem[]>{
    return this.filterCollectionByKind(KIND.LEDGER);
  }

  get categories(): Observable<CollectionItem[]> {
    return this.filterCollectionByKind(KIND.CATEGORY);
  }

  private filterCollectionByKind(kind: string): Observable<CollectionItem[]>{
    return this._collection.pipe(
      map(collection => collection.filter(x=>x.kind === kind))
    );
  }

  OnInit(): void {
    this._timer = setInterval(() => this.refresh(), 1000 * 600);
    this.refresh();
  }

  ngOnDestroy() {
    clearInterval(this._timer);
  }
}

export const KIND = {
  PRODUCT: 'PRODUCT',
  LEDGER: 'LEDGER',
  CATEGORY: 'CATEGORY'
};

export interface CollectionItem {
  id: number;
  displayName: string;
  kind: string;
}
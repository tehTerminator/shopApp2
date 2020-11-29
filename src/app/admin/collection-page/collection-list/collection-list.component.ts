import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, Subscription } from 'rxjs';
import { CollectionItem, CollectionService } from '../../../shared/collection.service';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.css']
})
export class CollectionListComponent implements OnInit{
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private collectionService: CollectionService) { }

  ngOnInit(): void {
  }

  deleteItem(id: number) {
    this.collectionService.deleteItem(id)
    .subscribe((response) => {
      console.log(response);
    })
  }

  get collection(): Observable<CollectionItem[]> {
    return this.collectionService.collection;
  }

  get collectionLength(): number {
    return this.collectionService.collection.value.length;
  }
}

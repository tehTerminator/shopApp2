import { Component, OnInit } from '@angular/core';
import { PosItemService } from '../../../shared/pos-item.service';

@Component({
  selector: 'app-pos-item-list-page',
  templateUrl: './pos-item-list-page.component.html',
  styleUrls: ['./pos-item-list-page.component.css']
})
export class PosItemListPageComponent implements OnInit {

  constructor(private posItemService: PosItemService) { }

  ngOnInit(): void {
  }

  get items() {
    return this.posItemService.posItems;
  }

}

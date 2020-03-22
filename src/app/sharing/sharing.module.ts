import { NgModule } from '@angular/core';
import { SearchPipe } from './search.pipe';
import { BaseFormComponent } from './base-form/base-form.component';
import { PaginatedTableComponent } from './paginated-table/paginated-table.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [SearchPipe, BaseFormComponent, PaginatedTableComponent],
  imports: [
    FormsModule,
    CommonModule
  ],
  exports: [
    SearchPipe,
    BaseFormComponent,
    PaginatedTableComponent
  ]
})
export class SharingModule { }

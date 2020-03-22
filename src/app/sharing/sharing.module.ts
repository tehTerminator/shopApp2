import { NgModule } from '@angular/core';
import { SearchPipe } from './search.pipe';
import { BaseFormComponent } from './base-form/base-form.component';
import { PaginatedTableComponent } from './paginated-table/paginated-table.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TitleCasePipe } from './title-case.pipe';
import { UnderScoreToSpacePipe } from './under-score-to-space.pipe';



@NgModule({
  declarations: [
    SearchPipe,
    BaseFormComponent,
    PaginatedTableComponent,
    TitleCasePipe,
    UnderScoreToSpacePipe
  ],
  imports: [
    FormsModule,
    CommonModule
  ],
  exports: [
    BaseFormComponent,
    PaginatedTableComponent,
    FormsModule
  ]
})
export class SharingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PosItemFormPageRoutingModule } from './pos-item-form-page-routing.module';
import { PosItemFormPageComponent } from './pos-item-form-page.component';
import { CoreModule } from '../../shared/core.module';
import { NewItemFormComponent } from './new-item-form/new-item-form.component';
import { EditItemFormComponent } from './edit-item-form/edit-item-form.component';
import { PosItemListPageComponent } from './pos-item-list-page/pos-item-list-page.component';


@NgModule({
  declarations: [PosItemFormPageComponent, NewItemFormComponent, EditItemFormComponent, PosItemListPageComponent],
  imports: [
    CommonModule,
    CoreModule,
    PosItemFormPageRoutingModule
  ]
})
export class PosItemFormPageModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PosItemFormPageRoutingModule } from './pos-item-form-page-routing.module';
import { PosItemFormPageComponent } from './pos-item-form-page.component';
import { CoreModule } from '../../shared/core.module';
import { NewItemFormComponent } from './new-item-form/new-item-form.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { PosItemListPageComponent } from './pos-item-list-page/pos-item-list-page.component';
import { PosEditFormComponent } from './edit-page/pos-edit-form/pos-edit-form.component';
import { TemplateEditFormComponent } from './edit-page/template-edit-form/template-edit-form.component';


@NgModule({
  declarations: [
    PosItemFormPageComponent,
    NewItemFormComponent,
    EditPageComponent,
    PosItemListPageComponent,
    PosEditFormComponent,
    TemplateEditFormComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    PosItemFormPageRoutingModule
  ]
})
export class PosItemFormPageModule { }

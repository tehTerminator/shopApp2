import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditItemFormComponent } from './edit-item-form/edit-item-form.component';
import { NewItemFormComponent } from './new-item-form/new-item-form.component';

import { PosItemFormPageComponent } from './pos-item-form-page.component';
import { PosItemListPageComponent } from './pos-item-list-page/pos-item-list-page.component';

const routes: Routes = [
  { path: '', component: PosItemFormPageComponent },
  { path: 'new', component: NewItemFormComponent },
  { path: 'edit/:id', component: EditItemFormComponent },
  { path: 'view', component: PosItemListPageComponent },
  { path: '**', redirectTo: 'create', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosItemFormPageRoutingModule { }

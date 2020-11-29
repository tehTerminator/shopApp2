import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { PosItemListPageComponent } from './pos-item-list-page/pos-item-list-page.component';

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
    { path: 'collection', loadChildren: () => import('./collection-page/collection-page.module').then(m => m.CollectionPageModule) },
    { path: 'pos-item', loadChildren: () => import('./pos-item-form-page/pos-item-form-page.module').then(m => m.PosItemFormPageModule) }, 
    { path: '**', redirectTo: 'collection', pathMatch: 'full' }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

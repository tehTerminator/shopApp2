import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { ProductsComponent } from './products/products.component';
import { LedgerComponent } from './ledger/ledger.component';
import { CategoryComponent } from './category/category.component';
import { BatchComponent } from './batch/batch.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'products', component: ProductsComponent },
      { path: 'ledger', component: LedgerComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'batch', component: BatchComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

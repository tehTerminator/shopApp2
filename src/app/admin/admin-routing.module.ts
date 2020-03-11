import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { RawMaterialFormComponent } from './raw-material-form/raw-material-form.component';
import { LedgerFormComponent } from './ledger-form/ledger-form.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'products', component: ProductsComponent },
      { path: 'rawMaterial', component: RawMaterialFormComponent },
      { path: 'ledger', component: LedgerFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

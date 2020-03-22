import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { LedgerComponent } from './ledger/ledger.component';
import { SharingModule } from '../sharing/sharing.module';
import { GroupsFormComponent } from './ledger/groups-form/groups-form.component';
import { LedgerFormComponent } from './ledger/ledger-form/ledger-form.component';
import { BatchComponent } from './batch/batch.component';
import { ProductsComponent } from './products/products.component';
import { BatchFormComponent } from './batch/batch-form/batch-form.component';


@NgModule({
  declarations: [
    AdminComponent,
    LedgerComponent,
    GroupsFormComponent,
    LedgerFormComponent,
    BatchComponent,
    ProductsComponent,
    BatchFormComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    SharingModule
  ],
})
export class AdminModule { }

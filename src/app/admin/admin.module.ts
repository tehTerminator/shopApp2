import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { RawMaterialFormComponent } from './raw-material-form/raw-material-form.component';
import { LedgerFormComponent } from './ledger-form/ledger-form.component';
import { ApplicationPipesModule } from '../application-pipes/application-pipes.module';
import { ProductsComponent } from './products/products.component';
import { ConsumptionComponent } from './consumption/consumption.component';


@NgModule({
  declarations: [
    AdminComponent,
    ProductFormComponent,
    RawMaterialFormComponent,
    LedgerFormComponent,
    ProductsComponent,
    ConsumptionComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ApplicationPipesModule
  ],
})
export class AdminModule { }

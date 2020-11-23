import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../shared/core.module';

import { CollectionPageRoutingModule } from './collection-page-routing.module';
import { CollectionPageComponent } from './collection-page.component';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { CollectionFormComponent } from './collection-form/collection-form.component';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [CollectionPageComponent, CollectionListComponent, CollectionFormComponent],
  imports: [
    CommonModule,
    CoreModule,
    MatPaginatorModule,
    CollectionPageRoutingModule
  ]
})
export class CollectionPageModule { }

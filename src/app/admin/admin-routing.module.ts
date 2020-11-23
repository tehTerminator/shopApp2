import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
    { path: 'collection', loadChildren: () => import('./collection-page/collection-page.module').then(m => m.CollectionPageModule) },
    { path: '**', redirectTo: 'collection', pathMatch: 'full' }
  ]}, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

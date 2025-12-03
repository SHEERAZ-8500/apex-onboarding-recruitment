import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { SahringModule } from '../shared/modules/sahring.module';
import { ViewUserPermissionsComponent } from './view-user-permissions/view-user-permissions.component';

const routes: Routes = [
  {
    path: 'view-user-permissions',
    component: ViewUserPermissionsComponent 
  }
];
@NgModule({
  declarations: [
    ViewUserPermissionsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SahringModule,
  ]
})
export class PermissionsModule { }

import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { SahringModule } from '../shared/modules/sahring.module';
import { ViewUserPermissionsComponent } from './view-user-permissions/view-user-permissions.component';
import { ViewAllRolsComponent } from './view-all-rols/view-all-rols.component';
import { CreateNewRoleComponent } from './create-new-role/create-new-role.component';

const routes: Routes = [
  {
    path: 'view-permissions',
    component: ViewUserPermissionsComponent
  },
  {
    path: 'view-all-rols',
    component: ViewAllRolsComponent
  },
  {
    path: 'create-new-role',
    component: CreateNewRoleComponent
  }
];
@NgModule({
  declarations: [
    ViewUserPermissionsComponent,
    ViewAllRolsComponent,
    CreateNewRoleComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SahringModule,
  ]
})
export class PermissionsModule { }

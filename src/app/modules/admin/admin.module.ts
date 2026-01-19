import { NgModule } from '@angular/core';
import { CreateNewUserComponent } from './create-new-user/create-new-user.component';
import { RouterModule, Routes } from '@angular/router';
import { SahringModule } from '../../shared/modules/sahring.module';
import { ViewAllUsersComponent } from './view-all-users/view-all-users.component';

const routes: Routes = [
  {
    path: 'create-new-user',
    component: CreateNewUserComponent
  },
    {
    path: 'view-all-users',
    component: ViewAllUsersComponent
  }
];

@NgModule({
  declarations: [
    CreateNewUserComponent,
    ViewAllUsersComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SahringModule,
  ]
})
export class AdminModule { }

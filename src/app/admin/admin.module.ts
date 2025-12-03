import { NgModule } from '@angular/core';
import { CreateNewUserComponent } from './create-new-user/create-new-user.component';
import { RouterModule, Routes } from '@angular/router';
import { SahringModule } from '../shared/modules/sahring.module';

const routes: Routes = [
  {
    path: 'create-new-user',
    component: CreateNewUserComponent
  }
];

@NgModule({
  declarations: [
    CreateNewUserComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SahringModule,
  ]
})
export class AdminModule { }

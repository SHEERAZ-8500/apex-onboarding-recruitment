import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SahringModule } from '../shared/modules/sahring.module';

import { RouterModule, Routes } from '@angular/router';
import { ViewAllFormsComponent } from './view-all-forms/view-all-forms.component';
import { CreateNewUdfComponent } from './create-new-udf/create-new-udf.component';
import { CreateUddComponent } from './create-udd/create-udd.component';
import { ManageFiledsVisibilityComponent } from './manage-fileds-visibility/manage-fileds-visibility.component';
import { CreateNewRowComponent } from './create-new-row/create-new-row.component';
const routes: Routes = [
  {
    path: 'view-all-forms',
    component: ViewAllFormsComponent
  },
  {
    path: 'create-new-udf',
    component: CreateNewUdfComponent
  },
  {
    path: 'create-new-udd',
    component: CreateUddComponent
  }

  ,
  {
    path: 'manage-fields-visibility',
    component: ManageFiledsVisibilityComponent
  }
  ,
  {
    path: 'create-new-tabs-row',
    component: CreateNewRowComponent
  }
]
@NgModule({
  declarations: [ViewAllFormsComponent, CreateNewUdfComponent, CreateUddComponent, ManageFiledsVisibilityComponent, CreateNewRowComponent],
  imports: [
    RouterModule.forChild(routes),
    SahringModule,
  ]
})
export class FormsModule { }

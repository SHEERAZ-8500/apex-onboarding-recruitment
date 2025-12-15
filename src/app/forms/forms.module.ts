import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SahringModule } from '../shared/modules/sahring.module';

import { RouterModule, Routes } from '@angular/router';
import { ViewAllFormsComponent } from './view-all-forms/view-all-forms.component';
import { CreateNewUdfComponent } from './create-new-udf/create-new-udf.component';
const routes: Routes = [
  {
    path: 'view-all-forms',
    component: ViewAllFormsComponent
  },
    {
    path: 'create-new-udf',
    component: CreateNewUdfComponent
  }
]
@NgModule({
  declarations: [ViewAllFormsComponent, CreateNewUdfComponent],
  imports: [
        RouterModule.forChild(routes),
        SahringModule,
  ]
})
export class FormsModule { }

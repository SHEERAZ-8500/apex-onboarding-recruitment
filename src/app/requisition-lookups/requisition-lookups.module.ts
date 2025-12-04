import { NgModule } from '@angular/core';
import { SahringModule } from '../shared/modules/sahring.module';
import { RouterModule, Routes } from '@angular/router';
import { CreateJobTitleComponent } from './create-job-title/create-job-title.component';
import { CreateEmployeCategoryComponent } from './create-employe-category/create-employe-category.component';


const routes: Routes = [
  {
    path: 'create-job-title',
    component: CreateJobTitleComponent
  },
  {
    path: 'create-employee-category',
    component: CreateEmployeCategoryComponent
  }
];
@NgModule({
  declarations: [
    CreateJobTitleComponent,
    CreateEmployeCategoryComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SahringModule,
  ]
})
export class RequisitionLookupsModule { }

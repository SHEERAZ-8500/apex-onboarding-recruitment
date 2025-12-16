import { NgModule } from '@angular/core';
import { SahringModule } from '../shared/modules/sahring.module';
import { RouterModule, Routes } from '@angular/router';
import { CreateJobTitleComponent } from './create-job-title/create-job-title.component';
import { CreateLoopupEnumsComponent } from './create-loopup-enums/create-loopup-enums.component';


const routes: Routes = [
  {
    path: 'create-job-title',
    component: CreateJobTitleComponent
  },
  {
    path: 'create-employee-category',
    component: CreateJobTitleComponent
  }, {
    path: 'create-department',
    component: CreateJobTitleComponent
  }, {
    path: 'create-branch',
    component: CreateJobTitleComponent
  },
  {
    path: 'create-lookup-enums',
    component: CreateLoopupEnumsComponent
  }
];
@NgModule({
  declarations: [
    CreateJobTitleComponent,
    CreateLoopupEnumsComponent,
    
  ],
  imports: [
    RouterModule.forChild(routes),
    SahringModule,
  ]
})
export class RequisitionLookupsModule { }

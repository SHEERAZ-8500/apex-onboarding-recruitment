import { NgModule } from '@angular/core';
import { SahringModule } from '../../../shared/modules/sahring.module';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { GOSIIDComponent } from './gosiid/gosiid.component';
import { DepartmentsComponent } from './departments/departments.component';
import { MedicalInsuranceComponent } from './medical-insurance/medical-insurance.component';
import { AccommodationComponent } from './accommodation/accommodation.component';
import { LoansComponent } from './loans/loans.component';
import { EmployeeBelongingsComponent } from './employee-belongings/employee-belongings.component';
import { EmployeesCategoryComponent } from './employees-category/employees-category.component';
import { ProjectTransferComponent } from './project-transfer/project-transfer.component';


const routes: Routes = [
  {
    path: 'view-all-employees',
    component: EmployeesComponent , data: { title: 'view' }
  }, 
  {
    path: 'create-new-employees',
    component: EmployeesComponent , data: { title: 'create' }
  }, 
  {
    path: 'edit-employees',
    component: EmployeesComponent , data: { title: 'edit' }
  }, 
  {
    path: 'view-all-gosiid',
    component: GOSIIDComponent, data: { title: 'view' }
  }, 
  {
    path: 'create-new-gosiid',
    component: GOSIIDComponent, data: { title: 'create' }
  }, 
  {
    path: 'edit-gosiid',
    component: GOSIIDComponent, data: { title: 'edit' }
  }, 
  {
    path: 'view-all-departments',
    component: DepartmentsComponent, data: { title: 'view' }
  },
  {
    path: 'create-new-departments',
    component: DepartmentsComponent, data: { title: 'create' }
  },
  {
    path: 'edit-departments',
    component: DepartmentsComponent, data: { title: 'edit' }
  },
   {
    path: 'view-all-medical-insurance',
    component: MedicalInsuranceComponent, data: { title: 'view' }
  }, 
   {
    path: 'create-new-medical-insurance',
    component: MedicalInsuranceComponent, data: { title: 'create' }
  }, 
   {
    path: 'edit-medical-insurance',
    component: MedicalInsuranceComponent, data: { title: 'edit' }
  }, 
  {
    path: 'view-all-accommodation',
    component: AccommodationComponent, data: { title: 'view' }
  }, 
   {
    path: 'create-new-accommodation',
    component: AccommodationComponent, data: { title: 'create' }
  }, 
   {
    path: 'edit-accommodation',
    component: AccommodationComponent, data: { title: 'edit' }
  }, 
  {
    path: 'view-all-loans',
    component: LoansComponent, data: { title: 'view' }
  }, 
   {
    path: 'create-new-loans',
    component: LoansComponent, data: { title: 'create' }
  }, 
   {
    path: 'edit-loans',
    component: LoansComponent, data: { title: 'edit' }
  }, 
  {
    path: 'view-all-employee-belongings',
    component: EmployeeBelongingsComponent, data: { title: 'view' }
  }, 
   {
    path: 'create-new-employee-belongings',
    component: EmployeeBelongingsComponent, data: { title: 'create' }
  }, 
   {
    path: 'edit-employee-belongings',
    component: EmployeeBelongingsComponent, data: { title: 'edit' }
  }, 
  {
    path: 'view-all-employees-category',
    component: EmployeesCategoryComponent, data: { title: 'view' }
  }, 
   {
    path: 'create-new-employees-category',
    component: EmployeesCategoryComponent, data: { title: 'create' }
  }, 
   {
    path: 'edit-employees-category',
    component: EmployeesCategoryComponent, data: { title: 'edit' }
  }, 
  {
    path: 'view-all-project-transfer',
    component: ProjectTransferComponent, data: { title: 'view' }
  },
  {
    path: 'create-new-project-transfer',
    component: ProjectTransferComponent, data: { title: 'create' }
  },
  {
    path: 'edit-project-transfer',
    component: ProjectTransferComponent, data: { title: 'edit' }
  }
];
@NgModule({
  declarations: [
    EmployeesComponent,
    GOSIIDComponent,
    DepartmentsComponent,
    MedicalInsuranceComponent,
    AccommodationComponent,
    LoansComponent,
    EmployeeBelongingsComponent,
    EmployeesCategoryComponent,
    ProjectTransferComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SahringModule,
  ]
})
export class EmployeesMasterDataModule { }

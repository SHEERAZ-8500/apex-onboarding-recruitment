import { NgModule } from '@angular/core';
import { SahringModule } from '../../shared/modules/sahring.module';
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
    path: 'employees',
    component: EmployeesComponent
  }, 
  {
    path: 'gosiid',
    component: GOSIIDComponent
  }, 
  {
    path: 'departments',
    component: DepartmentsComponent
  },
   {
    path: 'medical-insurance',
    component: MedicalInsuranceComponent
  }, 
  {
    path: 'accommodation',
    component: AccommodationComponent
  }, 
  {
    path: 'loans',
    component: LoansComponent
  }, 
  {
    path: 'employee-belongings',
    component: EmployeeBelongingsComponent
  }, 
  {
    path: 'employees-category',
    component: EmployeesCategoryComponent
  }, 
  {
    path: 'project-transfer',
    component: ProjectTransferComponent
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

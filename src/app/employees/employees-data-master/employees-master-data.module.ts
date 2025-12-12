import { NgModule } from '@angular/core';
import { SahringModule } from '../../shared/modules/sahring.module';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';


const routes: Routes = [
  {
    path: 'employees',
    component: EmployeesComponent
  }
];
@NgModule({
  declarations: [
    EmployeesComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SahringModule,
  ]
})
export class EmployeesMasterDataModule { }

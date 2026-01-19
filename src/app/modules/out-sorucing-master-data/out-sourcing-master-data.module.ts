import { NgModule } from '@angular/core';
import { SahringModule } from '../../shared/modules/sahring.module';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { ClientComponent } from './client/client.component';
import { CustomerMasterComponent } from './customer-master/customer-master.component';

const routes: Routes = [
  {
    path: 'view-all-company',
    component: CompanyComponent , data: { title: 'view' }
  },
  {
    path: 'create-new-company',
    component: CompanyComponent , data: { title: 'create' }
  },
  {
    path: 'edit-company',
    component: CompanyComponent , data: { title: 'edit' }
  },
  {
    path: 'view-all-client',
    component: ClientComponent , data: { title: 'view' }
  },
    {
    path: 'create-new-client',
    component: ClientComponent , data: { title: 'create' }
  },
    {
    path: 'edit-client',
    component: ClientComponent , data: { title: 'edit' }
  },
  {
    path: 'view-all-customer-master',
    component: CustomerMasterComponent , data: { title: 'view' }
  },
  {
    path: 'create-new-customer-master',
    component: CustomerMasterComponent , data: { title: 'create' }
  },
  {
    path: 'edit-customer-master',
    component: CustomerMasterComponent , data: { title: 'edit' }
  }
];

@NgModule({
  declarations: [
    CompanyComponent,
    ClientComponent,
    CustomerMasterComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SahringModule,
  ]
})
export class OutSourcingMasterDataModule { }

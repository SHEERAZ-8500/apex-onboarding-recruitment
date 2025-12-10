import { NgModule } from '@angular/core';
import { SahringModule } from '../shared/modules/sahring.module';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { ClientComponent } from './client/client.component';
import { CustomerMasterComponent } from './customer-master/customer-master.component';

const routes: Routes = [
  {
    path: 'company',
    component: CompanyComponent
  },{
    path: 'client',
    component: ClientComponent
  },{
    path: 'customer-master',
    component: CustomerMasterComponent
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

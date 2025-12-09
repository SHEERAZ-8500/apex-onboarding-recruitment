import { NgModule } from '@angular/core';
import { SahringModule } from '../shared/modules/sahring.module';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company/company.component';

const routes: Routes = [
  {
    path: 'company',
    component: CompanyComponent
  }
];

@NgModule({
  declarations: [
    CompanyComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SahringModule,
  ]
})
export class OutSourcingMasterDataModule { }

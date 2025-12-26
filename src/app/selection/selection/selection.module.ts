import { NgModule } from '@angular/core';
import { SahringModule } from '../../shared/modules/sahring.module';
import { RouterModule, Routes } from '@angular/router';
import { OfferLetterComponent } from './offer-letter/offer-letter.component';
import { ContractComponent } from './contract/contract.component';
import { MobilizationComponent } from './mobilization/mobilization.component';
import { JoiningComponent } from './joining/joining.component';
import { InterviewReportComponent } from './interview-report/interview-report.component';
import { SelectionComponent } from './selection/selection.component';

const routes: Routes = [
  {
    path: 'view-all-contract',
    component: ContractComponent, data: { title: 'view' }
  }, 
  {
    path: 'create-new-contract',
    component: ContractComponent, data: { title: 'create' }
  }, 
  {
    path: 'contract',
    component: ContractComponent, data: { title: 'edit' }
  }, 
  
  {
    path: 'view-all-interview-report',
    component: InterviewReportComponent, data: { title: 'view' }
  }, 
  {
    path: 'create-new-interview-report',
    component: InterviewReportComponent, data: { title: 'create' }
  }, 
   {
    path: 'edit-interview-report',
    component: InterviewReportComponent, data: { title: 'edit' }
  }, 
  {
    path: 'view-all-offer-letter',
    component: OfferLetterComponent, data: { title: 'view' }
  },
  {
    path: 'create-new-offer-letter',
    component: OfferLetterComponent, data: { title: 'create' }
  },
  {
    path: 'edit-offer-letter',
    component: OfferLetterComponent, data: { title: 'edit' }
  },
   {
    path: 'view-all-mobilization',
    component: MobilizationComponent, data: { title: 'view' }
  }, 
  {
    path: 'create-new-mobilization',
    component: MobilizationComponent, data: { title: 'create' }
  }, 
  {
    path: 'edit-mobilization',
    component: MobilizationComponent, data: { title: 'edit' }
  }, 
  {
    path: 'view-all-joining',
    component: JoiningComponent, data: { title: 'view' }
  }, 
   {
    path: 'create-new-joining',
    component: JoiningComponent, data: { title: 'create' }
  }, 
   {
    path: 'edit-joining',
    component: JoiningComponent, data: { title: 'edit' }
  }, 
  {
    path: 'view-all-selection',
    component: SelectionComponent, data: { title: 'view' }
  },
   {
    path: 'create-new-selection',
    component: SelectionComponent, data: { title: 'create' }
  },
   {
    path: 'edit-selection',
    component: SelectionComponent , data: { title: 'edit' }
  }
  
];

@NgModule({
  declarations: [
    OfferLetterComponent,
    ContractComponent,
    MobilizationComponent,
    JoiningComponent,
    InterviewReportComponent,
    SelectionComponent
  ],
  imports: [
RouterModule.forChild(routes),
    SahringModule,  ]
})
export class SelectionModule { }

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
    path: 'contract',
    component: ContractComponent
  }, 
  {
    path: 'interview-report',
    component: InterviewReportComponent
  }, 
  {
    path: 'offer-letter',
    component: OfferLetterComponent
  },
   {
    path: 'mobilization',
    component: MobilizationComponent
  }, 
  {
    path: 'joining',
    component: JoiningComponent
  }, 
  {
    path: 'selection',
    component: SelectionComponent
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SahringModule } from '../../../shared/modules/sahring.module';
import { RequisitionComponent } from './requisition/requisition.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { InterviewSchedulingComponent } from './interview-scheduling/interview-scheduling.component';
import { FinalScreeningComponent } from './final-screening/final-screening.component';
import { CandidateScreeningComponent } from './candidate-screening/candidate-screening.component';
import { HrCandidateShortListingComponent } from './hr-candidate-short-listing/hr-candidate-short-listing.component';
import { InterviewFeedbackComponent } from './interview-feedback/interview-feedback.component';



const routes: Routes = [
  {
    path: 'view-all-requisition',
    component: RequisitionComponent, data: { title: 'view' }
  },
  {
    path: 'create-new-requisition',
    component: RequisitionComponent, data: { title: 'create' }
  },
  {
    path: 'edit-requisition',
    component: RequisitionComponent, data: { title: 'edit' }
  },

  {
    path: 'view-all-candidates',
    component: CandidatesComponent, data: { title: 'view' }
  },
   {
    path: 'create-new-candidates',
    component: CandidatesComponent, data: { title: 'create' }
  },
   {
    path: 'edit-candidates',
    component: CandidatesComponent, data: { title: 'edit' }
  },
  {
    path: 'create-new-interview-scheduling',
    component: InterviewSchedulingComponent, data: { title: 'create' }
  },
  {
    path: 'edit-interview-scheduling',
    component: InterviewSchedulingComponent, data: { title: 'edit' }
  },
  {
    path: 'view-all-interview-scheduling',
    component: InterviewSchedulingComponent, data: { title: 'view' }
  },
  {
    path: 'final-screening',
    component: FinalScreeningComponent
  }
  ,
  {
    path: 'candidate-screening',
    component: CandidateScreeningComponent
  } ,
  {
    path: 'hr-candidate-short-listing',
    component: HrCandidateShortListingComponent
  }
   ,
  {
    path: 'interview-feedback',
    component: InterviewFeedbackComponent
  }
];


@NgModule({
  declarations: [
    RequisitionComponent,
    CandidatesComponent,
    InterviewSchedulingComponent,
    FinalScreeningComponent
    ,CandidateScreeningComponent, HrCandidateShortListingComponent, InterviewFeedbackComponent
  ],
  imports: [
     RouterModule.forChild(routes),
    SahringModule,
  ]
})
export class OnboardingModule { }

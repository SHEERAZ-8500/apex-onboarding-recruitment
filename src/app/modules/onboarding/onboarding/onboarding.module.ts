import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SahringModule } from '../../../shared/modules/sahring.module';
import { RequisitionComponent } from './requisition/requisition.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { InterviewSchedulingComponent } from './interview-scheduling/interview-scheduling.component';
import { FinalScreeningComponent } from './final-screening/final-screening.component';



const routes: Routes = [
  {
    path: 'requisition',
    component: RequisitionComponent
  },
  {
    path: 'candidates',
    component: CandidatesComponent
  },
  {
    path: 'interview-scheduling',
    component: InterviewSchedulingComponent
  },
  {
    path: 'final-screening',
    component: FinalScreeningComponent
  }
];


@NgModule({
  declarations: [
    RequisitionComponent,
    CandidatesComponent,
    InterviewSchedulingComponent,
    FinalScreeningComponent
  ],
  imports: [
     RouterModule.forChild(routes),
    SahringModule,
  ]
})
export class OnboardingModule { }

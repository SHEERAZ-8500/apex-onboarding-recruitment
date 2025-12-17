import { NgModule } from '@angular/core';
import { SahringModule } from './../../shared/modules/sahring.module';
import { RouterModule, Routes } from '@angular/router';
import { RequisitionComponent } from './requisition/requisition.component';
import { CandidateInformationComponent } from './candidate-information/candidate-information.component';
import { ScreeningComponent } from './screening/screening.component';
import { InterviewSchedulingComponent } from './interview-scheduling/interview-scheduling.component';
import { InterviewResultsComponent } from './interview-results/interview-results.component';
const routes: Routes = [

{
    path: 'requisition',
    component: RequisitionComponent
  },
  { path: 'candidate-information',
    component: CandidateInformationComponent
  },
  {
    path: 'screening',
    component: ScreeningComponent
  },
  { path: 'interview-scheduling',
    component: InterviewSchedulingComponent
  },
  { path: 'interview-results',
    component: InterviewResultsComponent
  }
]

@NgModule({
  declarations: [
    RequisitionComponent,
    CandidateInformationComponent,
    ScreeningComponent,
    InterviewSchedulingComponent,
    InterviewResultsComponent
  ],
  imports: [
     RouterModule.forChild(routes),
     SahringModule,
   ]
})
export class RecruitmentFormsModule { }

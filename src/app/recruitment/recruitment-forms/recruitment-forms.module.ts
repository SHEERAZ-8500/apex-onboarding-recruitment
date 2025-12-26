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
    path: 'view-all-requisition',
    component: RequisitionComponent , data: { title: 'view' }
  },
  {
    path: 'create-new-requisition',
    component: RequisitionComponent , data: { title: 'create' }
  },
  {
    path: 'edit-requisition',
    component: RequisitionComponent, data: { title: 'edit' }
  },
  { path: 'candidate-information',
    component: CandidateInformationComponent
  },

  {
    path: 'screening',
    component: ScreeningComponent
  },
 
  { path: 'view-all-interview-scheduling',
    component: InterviewSchedulingComponent, data: { title: 'view' }
  },
  { path: 'create-new-interview-scheduling',
    component: InterviewSchedulingComponent, data: { title: 'create' }
  },
  { path: 'edit-interview-scheduling',
    component: InterviewSchedulingComponent, data: { title: 'edit' }
  },
  { path: 'view-all-interview-results',
    component: InterviewResultsComponent, data: { title: 'view' }
  },
  { path: 'create-new-interview-results',
    component: InterviewResultsComponent, data: { title: 'create' }
  },
  { path: 'edit-interview-results',
    component: InterviewResultsComponent , data: { title: 'edit' }
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

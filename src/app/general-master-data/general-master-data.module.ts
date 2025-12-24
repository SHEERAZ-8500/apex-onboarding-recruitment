import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SahringModule } from '../shared/modules/sahring.module';
import { SkillsComponent } from './skills/skills.component';
import { IdTypeComponent } from './id-type/id-type.component';
import { QualificationComponent } from './qualification/qualification.component';
import { EmployeeCostComponent } from './employee-cost/employee-cost.component';
import { RamadanTimingComponent } from './ramadan-timing/ramadan-timing.component';
import { TrainingsComponent } from './trainings/trainings.component';
import { JobDescriptionComponent } from './job-description/job-description.component';
import { PreRequisitesComponent } from './pre-requisites/pre-requisites.component';
import { BelongingTypesComponent } from './belonging-types/belonging-types.component';
import { CostCenterComponent } from './cost-center/cost-center.component';
import { WorkScheduleComponent } from './work-schedule/work-schedule.component';
import { DesignationComponent } from './designation/designation.component';
import { JobTitleComponent } from './job-title/job-title.component';
import { PostAssignmentComponent } from './post-assignment/post-assignment.component';
import { KpiQuestionsComponent } from './kpi-questions/kpi-questions.component';
import { EmployeesGradeComponent } from './employees-grade/employees-grade.component';


const routes: Routes = [
  {
    path: 'view-all-skills',
    component: SkillsComponent, data: { title: 'view' }
  },
  {
    path: 'create-new-skill',
    component: SkillsComponent, data: { title: 'create' }
  },
  {
    path: 'id-type',
    component: IdTypeComponent
  },
  {
    path: 'qualification',
    component: QualificationComponent
  },
  {
    path: 'employee-cost',
    component: EmployeeCostComponent
  },
  {
    path: 'ramadan-timing',
    component: RamadanTimingComponent
  },
  {
    path: 'trainings',
    component: TrainingsComponent
  },
  {
    path: 'job-description',
    component: JobDescriptionComponent
  },
  {
    path: 'pre-requisites',
    component: PreRequisitesComponent
  },
  {
    path: 'belonging-types',
    component: BelongingTypesComponent
  },
  {
    path: 'cost-center',
    component: CostCenterComponent
  },
  {
    path: 'work-schedule',
    component: WorkScheduleComponent
  },
  {
    path: 'designation',
    component: DesignationComponent
  },
  {
    path: 'job-title',
    component: JobTitleComponent
  },
  {
    path: 'post-assignment',
    component: PostAssignmentComponent
  },
  {
    path: 'kpi-questions',
    component: KpiQuestionsComponent
  },
  {
    path: 'employees-grade',
    component: EmployeesGradeComponent
  }
];
@NgModule({
  declarations: [
    SkillsComponent,
    IdTypeComponent,
    QualificationComponent,
    EmployeeCostComponent,
    RamadanTimingComponent,
    TrainingsComponent,
    JobDescriptionComponent,
    PreRequisitesComponent,
    BelongingTypesComponent,
    CostCenterComponent,
    WorkScheduleComponent,
    DesignationComponent,
    JobTitleComponent,
    PostAssignmentComponent,
    KpiQuestionsComponent,
    EmployeesGradeComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SahringModule,
  ]
})
export class GeneralMasterDataModule { }

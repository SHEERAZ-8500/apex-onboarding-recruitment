import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SahringModule } from '../../shared/modules/sahring.module';
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
import { CandidateScreeningComponent } from './candidate-screening/candidate-screening.component';


export const routes: Routes = [
  {
    path: 'view-all-skills',
    component: SkillsComponent, data: { title: 'view' }
  },
  {
    path: 'create-new-skill',
    component: SkillsComponent, data: { title: 'create' }
  },
  {

    path: 'edit-skill',
    component: SkillsComponent, data: { title: 'edit' }
  },

  {
    path: 'view-all-id-type',
    component: IdTypeComponent, data: { title: 'view' }
  },
  {
    path: 'create-new-id-type',
    component: IdTypeComponent, data: { title: 'create' }
  },
  {
    path: 'edit-id-type',
    component: IdTypeComponent, data: { title: 'edit' }
  },
  {
    path: 'view-all-qualification',
    component: QualificationComponent, data: { title: 'view' }
  },
  {
    path: 'create-new-qualification',
    component: QualificationComponent, data: { title: 'create' }
  },
  {
    path: 'edit-qualification',
    component: QualificationComponent, data: { title: 'edit' }
  },
  {
    path: 'view-all-employee-cost',
    component: EmployeeCostComponent, data: { title: 'view' }
  },
  {
    path: 'create-new-employee-cost',
    component: EmployeeCostComponent, data: { title: 'create' }
  },
  {
    path: 'edit-employee-cost',
    component: EmployeeCostComponent, data: { title: 'edit' }
  },
  {
    path: 'view-all-ramadan-timing',
    component: RamadanTimingComponent, data: { title: 'view' }
  },
  {
    path: 'create-new-ramadan-timing',
    component: RamadanTimingComponent, data: { title: 'create' }
  },
  {
    path: 'edit-ramadan-timing',
    component: RamadanTimingComponent, data: { title: 'edit' }
  },
  {
    path: 'view-all-trainings',
    component: TrainingsComponent, data: { title: 'view' }
  },
  {
    path: 'create-new-trainings',
    component: TrainingsComponent, data: { title: 'create' }
  },
  {
    path: 'edit-trainings',
    component: TrainingsComponent, data: { title: 'edit' }
  },
  {
    path: 'view-all-job-description',
    component: JobDescriptionComponent, data: { title: 'view' }
  },
  {
    path: 'create-new-job-description',
    component: JobDescriptionComponent, data: { title: 'create' }
  },
  {
    path: 'edit-job-description',
    component: JobDescriptionComponent, data: { title: 'edit' }
  },

  {
    path: 'view-all-pre-requisites',
    component: PreRequisitesComponent, data: { title: 'view' }
  },
  {
    path: 'create-new-pre-requisites',
    component: PreRequisitesComponent, data: { title: 'create' }
  },
  {
    path: 'edit-pre-requisites',
    component: PreRequisitesComponent, data: { title: 'edit' }
  },
  {
    path: 'view-all-belonging-types',
    component: BelongingTypesComponent, data: { title: 'view' }
  },
  {
    path: 'create-new-belonging-types',
    component: BelongingTypesComponent, data: { title: 'create' }
  },
  {
    path: 'edit-belonging-types',
    component: BelongingTypesComponent, data: { title: 'edit' }
  },
  {
    path: 'view-all-cost-center',
    component: CostCenterComponent, data: { title: 'view' }
  },
  {
    path: 'create-new-cost-center',
    component: CostCenterComponent, data: { title: 'create' }
  },
  {
    path: 'edit-cost-center',
    component: CostCenterComponent, data: { title: 'edit' }
  },
  {
    path: 'view-all-work-schedule',
    component: WorkScheduleComponent, data: { title: 'view' }
  },
  {
    path: 'create-new-work-schedule',
    component: WorkScheduleComponent, data: { title: 'create' }
  },
  {
    path: 'edit-work-schedule',
    component: WorkScheduleComponent, data: { title: 'edit' }
  },
  {
    path: 'view-all-designation',
    component: DesignationComponent, data: { title: 'view' }
  },

  {
    path: 'create-new-designation',
    component: DesignationComponent, data: { title: 'create' }
  },
  {
    path: 'edit-designation',
    component: DesignationComponent, data: { title: 'edit' }
  },
  {
    path: 'view-all-job-title',
    component: JobTitleComponent, data: { title: 'view' }
  },
  {
    path: 'create-new-job-title',
    component: JobTitleComponent, data: { title: 'create' }
  },
  {
    path: 'edit-job-title',
    component: JobTitleComponent, data: { title: 'edit' }
  },
  {
    path: 'view-all-post-assignment',
    component: PostAssignmentComponent, data: { title: 'view' }
  },
  {
    path: 'create-new-post-assignment',
    component: PostAssignmentComponent, data: { title: 'create' }
  },
  {
    path: 'edit-post-assignment',
    component: PostAssignmentComponent, data: { title: 'edit' }
  },
  {
    path: 'view-all-kpi-questions',
    component: KpiQuestionsComponent, data: { title: 'view' }
  },
  {
    path: 'create-new-kpi-questions',
    component: KpiQuestionsComponent, data: { title: 'create' }
  },
  {
    path: 'edit-kpi-questions',
    component: KpiQuestionsComponent, data: { title: 'edit' }
  },
  {
    path: 'view-all-employees-grade',
    component: EmployeesGradeComponent, data: { title: 'view' }
  },
  {
    path: 'create-new-employees-grade',
    component: EmployeesGradeComponent, data: { title: 'create' }
  },
  {
    path: 'edit-employees-grade',
    component: EmployeesGradeComponent, data: { title: 'edit' }
  },
  {
    path: 'candidate-screening',
    component: CandidateScreeningComponent
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
    EmployeesGradeComponent,
    CandidateScreeningComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SahringModule,
  ]
})
export class GeneralMasterDataModule { }

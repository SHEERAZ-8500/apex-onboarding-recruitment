import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SahringModule } from '../shared/modules/sahring.module';
import { HierarchyComponent } from './hierarchy/hierarchy.component';
import { OutsourceContractComponent } from './outsource-contract/outsource-contract.component';
import { ProjectsComponent } from './projects/projects.component';
import { PostsComponent } from './posts/posts.component';
import { LocationComponent } from './location/location.component';
import { TasksComponent } from './tasks/tasks.component';
import { LeavesComponent } from './leaves/leaves.component';
import { PayElementComponent } from './pay-element/pay-element.component';
import { TimeTypeComponent } from './time-type/time-type.component';


const routes: Routes = [
  {
    path: 'hierarchy',
    component: HierarchyComponent
  },

   {
    path: 'view-all-outsource-contract',
    component: OutsourceContractComponent , data: { title: 'view' }
  },
  {
    path: 'create-new-outsource-contract',
    component: OutsourceContractComponent , data: { title: 'create' }
  },
  {
    path: 'edit-outsource-contract',
    component: OutsourceContractComponent , data: { title: 'edit' }
  },
   {
    path: 'view-all-projects',
    component: ProjectsComponent , data: { title: 'view' }
  },
   {
    path: 'create-new-projects',
    component: ProjectsComponent , data: { title: 'create' }
  },
   {
    path: 'edit-projects',
    component: ProjectsComponent , data: { title: 'edit' }
  },
   {
    path: 'view-all-posts',
    component: PostsComponent , data: { title: 'view' }
  },
  {
    path: 'create-new-posts',
    component: PostsComponent , data: { title: 'create' }
  },
  {
    path: 'edit-posts',
    component: PostsComponent , data: { title: 'edit' }
  },
   {
    path: 'view-all-location',
    component: LocationComponent , data: { title: 'view' }
  },
  {
    path: 'create-new-location',
    component: LocationComponent , data: { title: 'create' }
  },
  {
    path: 'edit-location',
    component: LocationComponent , data: { title: 'edit' }
  },
   {
    path: 'view-all-tasks',
    component: TasksComponent , data: { title: 'view' }
  },
  {
    path: 'create-new-tasks',
    component: TasksComponent , data: { title: 'create' }
  },
  {
    path: 'edit-tasks',
    component: TasksComponent , data: { title: 'edit' }
  },
   {
    path: 'view-all-leaves',
    component: LeavesComponent , data: { title: 'view' }
  },
   {
    path: 'create-new-leaves',
    component: LeavesComponent , data: { title: 'create' }
  },
   {
    path: 'edit-leaves',
    component: LeavesComponent , data: { title: 'edit' }
  },
   {
    path: 'view-all-pay-element',
    component: PayElementComponent , data: { title: 'view' }
  },
  {
    path: 'create-new-pay-element',
    component: PayElementComponent , data: { title: 'create' }
  },
  {
    path: 'edit-pay-element',
    component: PayElementComponent , data: { title: 'edit' }
  },
   {
    path: 'view-all-time-type',
    component: TimeTypeComponent , data: { title: 'view' }
  },
    {
    path: 'create-new-time-type',
    component: TimeTypeComponent , data: { title: 'create' }
  },
    {
    path: 'edit-time-type',
    component: TimeTypeComponent , data: { title: 'edit' }
  }
];
@NgModule({
  declarations: [
    HierarchyComponent,
    OutsourceContractComponent,
    ProjectsComponent,
    PostsComponent,
    LocationComponent,
    TasksComponent,
    LeavesComponent,
    PayElementComponent,
    TimeTypeComponent
  ],
  imports: [
        RouterModule.forChild(routes),
        SahringModule,
  ]
})
export class OrganizationalMasterDataModule { }

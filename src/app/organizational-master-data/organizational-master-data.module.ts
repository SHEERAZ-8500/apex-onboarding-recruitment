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
    path: 'outsource-contarct',
    component: OutsourceContractComponent 
  },
   {
    path: 'projects',
    component: ProjectsComponent 
  },
   {
    path: 'posts',
    component: PostsComponent 
  },
   {
    path: 'location',
    component: LocationComponent 
  },
   {
    path: 'tasks',
    component: TasksComponent 
  },
   {
    path: 'leaves',
    component: LeavesComponent 
  },
   {
    path: 'pay-element',
    component: PayElementComponent 
  },
   {
    path: 'time-type',
    component: TimeTypeComponent 
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

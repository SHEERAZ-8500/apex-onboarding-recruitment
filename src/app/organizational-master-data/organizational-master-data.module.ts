import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SahringModule } from '../shared/modules/sahring.module';
import { HierarchyComponent } from './hierarchy/hierarchy.component';


const routes: Routes = [
  {
    path: 'hierarchy',
    component: HierarchyComponent 
  }
];
@NgModule({
  declarations: [
    HierarchyComponent
  ],
  imports: [
        RouterModule.forChild(routes),
        SahringModule,
  ]
})
export class OrganizationalMasterDataModule { }

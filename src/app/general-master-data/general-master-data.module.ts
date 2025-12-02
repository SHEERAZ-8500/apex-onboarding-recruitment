import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SahringModule } from '../shared/modules/sahring.module';
import { SkillsComponent } from './skills/skills.component';
import { IdTypeComponent } from './id-type/id-type.component';


const routes: Routes = [
  {
    path: 'skills',
    component: SkillsComponent
  },
  {
    path: 'id-type',
    component: IdTypeComponent
  }
];
@NgModule({
  declarations: [
    SkillsComponent,
    IdTypeComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SahringModule,
  ]
})
export class GeneralMasterDataModule { }

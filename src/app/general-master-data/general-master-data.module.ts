import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SahringModule } from '../shared/modules/sahring.module';
import { SkillsComponent } from './skills/skills.component';


const routes: Routes = [
  {
    path: 'skills',
    component: SkillsComponent
  }
];
@NgModule({
  declarations: [
    SkillsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SahringModule,
  ]
})
export class GeneralMasterDataModule { }

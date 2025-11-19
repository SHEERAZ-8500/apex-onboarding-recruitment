import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SahringModule } from '../shared/modules/sahring.module';

const routes: Routes = [

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    SahringModule,
  ]
})
export class AssesmentModule { }

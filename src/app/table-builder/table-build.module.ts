import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableLisitngComponent } from './table-lisitng/table-lisitng.component';
import { RouterModule, Routes } from '@angular/router';
import { BuildTableComponent } from './build-table/build-table.component';
import { SahringModule } from '../shared/modules/sahring.module';

const routes: Routes = [
  {
    path: 'table-listing',
    component: TableLisitngComponent 
  },
  {
    path: 'build-table',
    component: BuildTableComponent
  }
];
@NgModule({
  declarations: [
    TableLisitngComponent,
    BuildTableComponent
  ],
  imports: [
    
    RouterModule.forChild(routes),
    SahringModule,
  ]
})
export class TableBuildModule { }

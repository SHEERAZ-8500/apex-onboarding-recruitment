import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableLisitngComponent } from './table-lisitng/table-lisitng.component';
import { RouterModule, Routes } from '@angular/router';
import { BuildTableComponent } from './build-table/build-table.component';
import { SahringModule } from '../shared/modules/sahring.module';
import { CreateLookupTableComponent } from './create-lookup-table/create-lookup-table.component';
import { AddNewRowLookupTableComponent } from './add-new-row-lookup-table/add-new-row-lookup-table.component';
import { CreateNewRowInTableComponent } from './create-new-row-in-table/create-new-row-in-table.component';

const routes: Routes = [
  {
    path: 'table-listing',
    component: TableLisitngComponent
  },
  {
    path: 'build-table',
    component: BuildTableComponent
  },
  {
    path: 'create-lookup-table',
    component: CreateLookupTableComponent
  }
  ,
  {
    path: 'add-new-row-lookup-table',
    component: AddNewRowLookupTableComponent
  },
  {
    path: 'create-new-row-in-table',
    component: CreateNewRowInTableComponent
  }
];
@NgModule({
  declarations: [
    TableLisitngComponent,
    BuildTableComponent,
    CreateLookupTableComponent,
    AddNewRowLookupTableComponent,
    CreateNewRowInTableComponent
  ],
  imports: [

    RouterModule.forChild(routes),
    SahringModule,
  ]
})
export class TableBuildModule { }

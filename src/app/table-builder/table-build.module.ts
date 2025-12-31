import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableLisitngComponent } from './table-lisitng/table-lisitng.component';
import { RouterModule, Routes } from '@angular/router';
import { BuildTableComponent } from './build-table/build-table.component';
import { SahringModule } from '../shared/modules/sahring.module';
import { CreateLookupTableComponent } from './create-lookup-table/create-lookup-table.component';
import { AddNewRowLookupTableComponent } from './add-new-row-lookup-table/add-new-row-lookup-table.component';
import { CreateNewRowInTableComponent } from './create-new-row-in-table/create-new-row-in-table.component';
import { ViewAllLookupTablesComponent } from './view-all-lookup-tables/view-all-lookup-tables.component';
import { ViewAllLookupEnumsComponent } from './view-all-lookup-enums/view-all-lookup-enums.component';
import { ViewAllIndependentTableComponent } from './view-all-independent-table/view-all-independent-table.component';
import { CreateNewIndependentTableComponent } from './create-new-independent-table/create-new-independent-table.component';


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
  },
  {
    path: 'add-new-row-lookup-table',
    component: AddNewRowLookupTableComponent
  },
   {
    path: 'add-new-column-lookup-table',
    component: AddNewRowLookupTableComponent
  },
  {
    path: 'create-new-row-in-table',
    component: CreateNewRowInTableComponent
  }
  ,
    {
    path: 'create-new-column-in-table',
    component: CreateNewRowInTableComponent
  },
  {
    path: 'view-all-lookup-tables',
    component: ViewAllLookupTablesComponent
  },
  {
    path: 'view-all-lookup-enums',
    component: ViewAllLookupEnumsComponent
  },
  {
    path: 'view-all-independent-tables',
    component: ViewAllIndependentTableComponent
  }

];
@NgModule({
  declarations: [
    TableLisitngComponent,
    BuildTableComponent,
    CreateLookupTableComponent,
    AddNewRowLookupTableComponent,
    CreateNewRowInTableComponent,
    ViewAllLookupTablesComponent,
    ViewAllLookupEnumsComponent,
    ViewAllIndependentTableComponent,
     CreateNewIndependentTableComponent
  ],
  imports: [

    RouterModule.forChild(routes),
    SahringModule,
  ]
})
export class TableBuildModule { }

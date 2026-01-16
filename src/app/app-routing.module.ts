import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfferCardComponent } from './shared/components/offer-card/offer-card.component';
import { OffersComponent } from './features/offers/offers.component';
import { ContactComponent } from './features/contact/contact.component';
import { EmployesComponent } from './features/employes/employes.component';
import { JobsComponent } from './features/jobs/jobs.component';
import { LayOutOneComponent } from './lay-outs/lay-out-one/lay-out-one.component';
import { LayOutTwoComponent } from './lay-outs/lay-out-two/lay-out-two.component';
import { LogInComponent } from './features/Auth/log-in/log-in.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

import { ViewAllFormSubmissionsComponent } from './view-all-form-submissions/view-all-form-submissions.component';

import { ViewAllNotificationsComponent } from './view-all-notifications/view-all-notifications.component';

const routes: Routes = [
  { path: '', redirectTo: 'log-in', pathMatch: 'full' },
  {
    path: 'panel', component: LayOutOneComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },

      { path: 'offers', component: OffersComponent },
      { path: 'contact', component: ContactComponent },

      { path: 'employes', component: EmployesComponent },
      { path: 'jobs-details', component: JobsComponent },
      { path: 'view-all-submissions/:id', component: ViewAllFormSubmissionsComponent },
      { path: 'view-all-notifications', component: ViewAllNotificationsComponent },
      { path: 'table', loadChildren: () => import('./table-builder/table-build.module').then(m => m.TableBuildModule) },
      { path: 'assesment', loadChildren: () => import('./assessments/assesment.module').then(m => m.AssesmentModule) },
      { path: 'chat', loadChildren: () => import('./features/chatting/chat.module').then(m => m.ChatModule) },

      { path: 'email', loadChildren: () => import('./features/emails/email.module').then(m => m.EmailModule) },
      { path: 'general-master-data', loadChildren: () => import('./general-master-data/general-master-data.module').then(m => m.GeneralMasterDataModule) },

      { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },

      { path: 'permissions', loadChildren: () => import('./permissions/permissions.module').then(m => m.PermissionsModule) },

      { path: 'requisition-lookups', loadChildren: () => import('./requisition-lookups/requisition-lookups.module').then(m => m.RequisitionLookupsModule) },
      { path: 'organizational-master-data', loadChildren: () => import('./organizational-master-data/organizational-master-data.module').then(m => m.OrganizationalMasterDataModule) },
      { path: 'out-sourcing-master-data', loadChildren: () => import('./out-sorucing-master-data/out-sourcing-master-data.module').then(m => m.OutSourcingMasterDataModule) },
      { path: 'employees-master-data', loadChildren: () => import('./employees/employees-data-master/employees-master-data.module').then(m => m.EmployeesMasterDataModule) },
      { path: 'forms', loadChildren: () => import('./forms/forms.module').then(m => m.FormsModule) },
      { path: 'onboarding', loadChildren: () => import('./onboarding/onboarding/onboarding.module').then(m => m.OnboardingModule) },



    ]
  },
  { path: '', loadChildren: () => import('./features/Auth/auth.module').then(m => m.AuthModule) },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

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
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { FormRenderComponent } from './form-render/form-render.component';
import { ViewAllFormsComponent } from './view-all-forms/view-all-forms.component';
import { ViewAllFormSubmissionsComponent } from './view-all-form-submissions/view-all-form-submissions.component';
import { ViewFormSubmitedDataComponent } from './view-form-submited-data/view-form-submited-data.component';
import { FormDefinationUpdateComponent } from './form-defination-update/form-defination-update.component';
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
      { path: 'create-form', component: FormBuilderComponent },
      { path: 'form-render/:id', component: FormRenderComponent },
      { path: 'view-all-forms', component: ViewAllFormsComponent },
      { path: 'view-all-submissions/:id', component: ViewAllFormSubmissionsComponent },
      { path: 'view-form-submitted-data/:id', component: ViewFormSubmitedDataComponent },
      { path: 'update-form/:id', component: FormDefinationUpdateComponent },
      { path: 'view-all-notifications', component: ViewAllNotificationsComponent },
      { path: 'table', loadChildren: () => import('./table-builder/table-build.module').then(m => m.TableBuildModule) },
      { path: 'assesment', loadChildren: () => import('./assessments/assesment.module').then(m => m.AssesmentModule) },
      { path: 'chat', loadChildren: () => import('./features/chatting/chat.module').then(m => m.ChatModule) },

      { path: 'email', loadChildren: () => import('./features/emails/email.module').then(m => m.EmailModule) },
      { path: 'general-master-data', loadChildren: () => import('./general-master-data/general-master-data.module').then(m => m.GeneralMasterDataModule) },

      { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },




    ]
  },
  { path: '', loadChildren: () => import('./features/Auth/auth.module').then(m => m.AuthModule) },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

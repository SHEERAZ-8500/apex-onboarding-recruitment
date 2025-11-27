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
import { ChatComponent } from './features/chat/chat.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { FormRenderComponent } from './form-render/form-render.component';
import { EmailComponent } from './features/email/email.component';
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
      { path: 'chat', component: ChatComponent },
      { path: 'create-form', component: FormBuilderComponent },
      { path: 'form-render/:id', component: FormRenderComponent },
      { path: 'email', component: EmailComponent },
      { path: 'view-all-forms', component: ViewAllFormsComponent },
      { path: 'view-all-submissions/:id', component: ViewAllFormSubmissionsComponent },
      { path: 'view-form-submitted-data/:id', component: ViewFormSubmitedDataComponent },
      { path: 'update-form/:id', component: FormDefinationUpdateComponent },
      { path: 'view-all-notifications', component:ViewAllNotificationsComponent  },
      { path: 'table', loadChildren: () => import('./table-builder/table-build.module').then(m => m.TableBuildModule) },
      { path: 'assesment', loadChildren: () => import('./assessments/assesment.module').then(m => m.AssesmentModule) },






    ]
  },
  {
    path: '', component: LayOutTwoComponent, children: [
      { path: 'log-in', component: LogInComponent },

    ]
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

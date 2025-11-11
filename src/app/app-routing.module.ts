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
      { path: 'form', component: FormBuilderComponent },
      { path: 'form-render', component: FormRenderComponent },


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

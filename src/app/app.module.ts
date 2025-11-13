import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { SideNavBarComponent } from './shared/components/side-nav-bar/side-nav-bar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ResponsiveBotstrapSideNavBarComponent } from './shared/components/responsive-botstrap-side-nav-bar/responsive-botstrap-side-nav-bar.component';
import { OfferCardComponent } from './shared/components/offer-card/offer-card.component';
import { OffersComponent } from './features/offers/offers.component';
import { CommonModule } from '@angular/common';
import { ContactCardComponent } from './shared/components/contact-card/contact-card.component';
import { ContactComponent } from './features/contact/contact.component';
import { CandidateTableComponent } from './shared/components/candidate-table/candidate-table.component';
import { EmployesComponent } from './features/employes/employes.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { JobsComponent } from './features/jobs/jobs.component';
import { LayOutOneComponent } from './lay-outs/lay-out-one/lay-out-one.component';
import { LayOutTwoComponent } from './lay-outs/lay-out-two/lay-out-two.component';
import { LogInComponent } from './features/Auth/log-in/log-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ChatComponent } from './features/chat/chat.component';
import { EmailComponent } from './features/email/email.component';


@NgModule({
  declarations: [
    AppComponent,
    FormBuilderComponent,
    SideNavBarComponent,
    HeaderComponent,
    ResponsiveBotstrapSideNavBarComponent,
    OfferCardComponent,
    OffersComponent,
    ContactCardComponent,
    ContactComponent,
    CandidateTableComponent,
    EmployesComponent,
    LoaderComponent,
    JobsComponent,
    LayOutOneComponent,
    LayOutTwoComponent,
    LogInComponent,
    DashboardComponent,
    ChatComponent,
    EmailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

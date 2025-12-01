import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SahringModule } from '../../shared/modules/sahring.module';
import { LogInComponent } from './log-in/log-in.component';
import { ResetPagesComponent } from './reset-pages/reset-pages.component';
import { NgOtpInputModule } from 'ng-otp-input';
const routes: Routes = [
  {
    path: '',
    component: LogInComponent
  },
  {
    path: 'otp-reset',
    component: ResetPagesComponent
  },
  {
    path: 'reset-password',
    component: ResetPagesComponent
  },
  {
    path: 'create-password',
    component: ResetPagesComponent
  }
];

@NgModule({
  declarations: [LogInComponent, ResetPagesComponent],
  imports: [
    RouterModule.forChild(routes),
    NgOtpInputModule,
    SahringModule,
  ]
})
export class AuthModule { }

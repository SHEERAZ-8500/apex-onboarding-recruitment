import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SahringModule } from '../../shared/modules/sahring.module';
import { LogInComponent } from './log-in/log-in.component';

const routes: Routes = [
  {
    path: '',
    component: LogInComponent
  }
];

@NgModule({
  declarations: [LogInComponent],
  imports: [
    RouterModule.forChild(routes),
    SahringModule,
  ]
})
export class AuthModule { }

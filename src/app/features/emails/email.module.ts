import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailComponent } from './email/email.component';
import { SahringModule } from '../../shared/modules/sahring.module';



const routes: Routes = [
  {
    path: '',
    component: EmailComponent
  },

];
@NgModule({
  declarations: [EmailComponent],
  imports: [
    RouterModule.forChild(routes),
    SahringModule,
  ]
})
export class EmailModule { }

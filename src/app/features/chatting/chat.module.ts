import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SahringModule } from '../../shared/modules/sahring.module';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  {
    path: '',
    component: ChatComponent
  },

];

@NgModule({
  declarations: [ChatComponent],
  imports: [
    RouterModule.forChild(routes),
    SahringModule,
  ]
})
export class ChatModule { }

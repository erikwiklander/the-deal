import { MessageTableComponent } from './message-table/message-table.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MessageComponent } from './message/message.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'message', component: MessageComponent },
  { path: 'table', component: MessageTableComponent },
  { path: '**', redirectTo: '/welcome' }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }

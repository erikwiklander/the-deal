import { TestComponent } from './test/test.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'test', component: TestComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: '**', redirectTo: '/welcome' }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }

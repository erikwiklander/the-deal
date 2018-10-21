import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule,
  MatCheckboxModule, MatIconModule, MatToolbarModule, MatInputModule, MatCardModule, MatMenuModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AppRoutingModule } from './app-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { TestComponent } from './test/test.component';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';

import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    WelcomeComponent,
    TestComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    AppRoutingModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatMenuModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

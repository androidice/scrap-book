import { BrowserModule } from '@angular/platform-browser';
import {ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { SharedModule } from './shared';

export const routes: ModuleWithProviders = RouterModule.forRoot([], { useHash: false });

export const firebaseConfig = {
  apiKey: "AIzaSyDw-VGTzkc8BrlibvgP-lhsY3dMBi7wDhA",
  authDomain: "custom-801ba.firebaseapp.com",
  databaseURL: "https://custom-801ba.firebaseio.com",
  projectId: "custom-801ba",
  storageBucket: "custom-801ba.appspot.com",
  messagingSenderId: "842267089351"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserModule,
    HomeModule,
    LoginModule,
    RegisterModule,
    SharedModule,
    routes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

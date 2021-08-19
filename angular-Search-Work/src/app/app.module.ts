import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {environment} from "../environments/environment";
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import {FormsModule} from "@angular/forms";
import { UpworkComponent } from './components/upwork/upwork.component';
import { AdminhomeComponent } from './components/adminhome/adminhome.component';
import { EnterpriseComponent } from './components/enterprise/enterprise.component';

var firebase ={
  apiKey: "AIzaSyD0U3twKwVDewxIWzoQ5IhY7-_f2YC7RDs",
  authDomain: "project-cnpm-2020.firebaseapp.com",
  databaseURL: "https://project-cnpm-2020-default-rtdb.firebaseio.com",
  projectId: "project-cnpm-2020",
  storageBucket: "project-cnpm-2020.appspot.com",
  messagingSenderId: "161188907842",
  appId: "1:161188907842:web:8dc805252a8e6cf31b16db",
  measurementId: "G-3P2CP0VXYM"

}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
    UpworkComponent,
    AdminhomeComponent,
    EnterpriseComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(firebase),
        AngularFireDatabaseModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

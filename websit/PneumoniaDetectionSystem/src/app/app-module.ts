import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Admin } from './components/admin/admin';
import { Navbar } from './components/admin/navbar/navbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateDoctor } from './components/admin/create-doctor/create-doctor';
import { UserDetails } from './components/admin/user-details/user-details';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Auth } from './services/auth';
import { provideHttpClient } from '@angular/common/http';
import { Doctor } from './components/doctorDashboard/doctor/doctor';
import { NavBar } from './components/doctorDashboard/nav-bar/nav-bar';
import { PatientHistory } from './components/doctorDashboard/patient-history/patient-history';

@NgModule({
  declarations: [
    App,
    Admin,
    Navbar,
    CreateDoctor,
    UserDetails,
    Login,
    Register,
    Doctor,
    NavBar,
    PatientHistory,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    Auth,
    
  ],
  bootstrap: [App]
})
export class AppModule { }

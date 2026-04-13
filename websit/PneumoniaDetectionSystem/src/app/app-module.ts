import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Login } from './components/login/login';
import { authGuardGuard } from './guards/auth.guard-guard';
import { Register } from './components/register/register';

import { Admin } from './components/admin/admin';
import { Navbar } from './components/admin/navbar/navbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateDoctor } from './components/admin/create-doctor/create-doctor';
import { UserDetails } from './components/admin/user-details/user-details';
import { Auth } from './services/auth';
import { Doctor } from './doctorDashboard/doctor/doctor';
import { PatientHistory } from './doctorDashboard/patient-history/patient-history';
import { NavBar } from './doctorDashboard/nav-bar/nav-bar';


@NgModule({
  declarations: [
    App,
    Login,
    Register,
    Admin,
    Doctor,
    PatientHistory,
    NavBar,
    Navbar,
    CreateDoctor,
    UserDetails
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient()
  ],
  bootstrap: [App]
})
export class AppModule {}
import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
<<<<<<< HEAD
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Login } from './components/login/login';
import { AuthGuard } from './guards/auth.guard';
import { Register } from './components/register/register';
=======

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
>>>>>>> origin/Admin-dashboard

@NgModule({
  declarations: [
    App,
<<<<<<< HEAD
    Login,
    Register
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
=======
    Admin,
    Navbar,
    CreateDoctor,
    UserDetails,
    Login,
    Register,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
>>>>>>> origin/Admin-dashboard
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
<<<<<<< HEAD
    AuthGuard
  ],
  bootstrap: [App]
})
export class AppModule { }
=======
    Auth,
    
  ],
  bootstrap: [App]
})
export class AppModule { }
>>>>>>> origin/Admin-dashboard

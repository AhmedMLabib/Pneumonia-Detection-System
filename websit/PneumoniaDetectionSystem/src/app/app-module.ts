import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Login } from './components/login/login';
import { Patient } from './components/patient/patient';
import { AuthGuard } from './guards/auth.guard';
import { Register } from './components/register/register';

@NgModule({
  declarations: [
    App,
    Login,
    Patient,
    Register
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    AuthGuard
  ],
  bootstrap: [App]
})
export class AppModule { }
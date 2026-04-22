import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { HomeComponent } from './home/home.component';
import { ServiceComponent } from './service/service.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [App,HomeComponent, ServiceComponent],
  imports: [BrowserModule, AppRoutingModule,HttpClientModule,FormsModule],
  bootstrap: [App]
})
export class AppModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Admin } from './components/admin/admin';
import { adminGuardGuard } from './guards/admin-guard-guard';
import { CreateDoctor } from './components/admin/create-doctor/create-doctor';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Doctor } from './doctorDashboard/doctor/doctor';
import { DoctorGuard } from './guards/doctor-guard';
import { PatientHistory } from './doctorDashboard/patient-history/patient-history';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  {
    path: 'admin-dashboard',
    component: Admin,
    canActivate: [adminGuardGuard],
  },
  {
    path: 'create-doctor',
    component: CreateDoctor,
    canActivate: [adminGuardGuard],
  },
  {
    path: 'doctor-dashboard',
    component: Doctor,
    canActivate: [DoctorGuard],
  },
  {
    path: 'patient-history/:id',
    component: PatientHistory,
    canActivate: [DoctorGuard],
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}


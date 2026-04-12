import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Admin } from './components/admin/admin';
import { adminGuardGuard } from './guards/admin-guard-guard';
import { CreateDoctor } from './components/admin/create-doctor/create-doctor';
import { Login } from './components/login/login';
import { Register } from './components/register/register';

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
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}


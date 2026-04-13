import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../interface/patient';
import { Observable } from 'rxjs';
import { Auth } from './auth';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  
  apiUrl = 'http://localhost:3000/user'
  constructor(private http:HttpClient, private authSer: Auth){}

  getPatients(): Observable<Patient[]> {
    const token = this.authSer.getToken();
    const headers: any = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return this.http.get<Patient[]>(`${this.apiUrl}/get_users_names`, {
      headers
    });
  }

  getReports(patientId: number): Observable<any> {
    const token = this.authSer.getToken();
    const headers: any = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return this.http.get(`${this.apiUrl}/get_users_reports/${patientId}`, {
      headers
    });
  }

}

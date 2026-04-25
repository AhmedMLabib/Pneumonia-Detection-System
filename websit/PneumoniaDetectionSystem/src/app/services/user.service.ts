import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from './auth';
import { Report } from '../interface/report';

export interface UserInfo {
  id: number;
  name: string;
  email: string;
  age: number;
  phone: string;
  address: string;
  image: string;
  next_check: string;
  histories: Report[];
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private auth: Auth) {}

  private get headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`,
    });
  }

  getUserInfo(): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${this.apiUrl}/user/info`, {
      headers: this.headers,
    });
  }
}

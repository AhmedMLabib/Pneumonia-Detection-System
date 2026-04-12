import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: any;
  access_token: string;
  user_type: string;
  user_name: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  static isLoggedIn() {
    throw new Error('Method not implemented.');
  }
  static isPatient() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/user/login`, data)
      .pipe(
        tap((res: LoginResponse) => {
          localStorage.setItem('token', res.access_token);
          localStorage.setItem('user_type', res.user.user_type);
          localStorage.setItem('user_name', res.user.name);
        }),
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user_type');
    localStorage.removeItem('user_name');
    this.router.navigate(['login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserType(): string | null {
    return localStorage.getItem('user_type');
  }

  getUserName(): string | null {
    return localStorage.getItem('user_name');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isPatient(): boolean {
    const t = this.getUserType();
    return t ? t.toLowerCase() === 'patient' : false;
  }
}

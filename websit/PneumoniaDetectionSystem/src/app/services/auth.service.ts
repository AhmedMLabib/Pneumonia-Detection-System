import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
  user_type: string;
}

export interface LoginResponse {
  token: string;
  user_type: string;
  user_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, data).pipe(
      tap((res: LoginResponse) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user_type', res.user_type);
        localStorage.setItem('user_name', res.user_name);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user_type');
    localStorage.removeItem('user_name');
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
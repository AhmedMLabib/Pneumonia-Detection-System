import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';
  isLoading = false;
  errorMessage = '';
  showPassword = false;
  showConfirm = false;

  constructor(private http: HttpClient, private router: Router) {}

  onRegister(): void {
    this.errorMessage = '';

    if (!this.fullName) { this.errorMessage = 'Please enter your full name.'; return; }
    if (!this.email) { this.errorMessage = 'Please enter your email.'; return; }
    if (!this.password) { this.errorMessage = 'Please enter a password.'; return; }
    if (this.password.length < 6) { this.errorMessage = 'Password must be at least 6 characters.'; return; }
    if (this.password !== this.confirmPassword) { this.errorMessage = 'Passwords do not match.'; return; }

    this.isLoading = true;

    const body = {
      name: this.fullName,
      email: this.email,
      password: this.password,
      user_type: 'Patient'
    };

    this.http.post<any>('http://localhost:3000/api/register', body).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading = false;
        if (err.status === 0) this.errorMessage = 'Cannot connect to server.';
        else if (err.status === 409) this.errorMessage = 'Email already registered.';
        else this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
      }
    });
  }

  togglePassword(): void { this.showPassword = !this.showPassword; }
  toggleConfirm(): void { this.showConfirm = !this.showConfirm; }
}

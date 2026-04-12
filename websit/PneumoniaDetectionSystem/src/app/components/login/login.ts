import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, LoginRequest } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loginData: LoginRequest = { email: '', password: '', user_type: '' };
  isLoading = false;
  errorMessage = '';
  showPassword = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.errorMessage = '';
    if (!this.loginData.email) { this.errorMessage = 'Please enter your email.'; return; }
    if (!this.loginData.password) { this.errorMessage = 'Please enter your password.'; return; }

    this.isLoading = true;
    this.authService.login(this.loginData).subscribe({
      next: (res) => {
        this.isLoading = false;
        const type = res.user_type ? res.user_type.toLowerCase() : '';
        if (type === 'patient') this.router.navigate(['/patient']);
        else if (type === 'admin') this.router.navigate(['/admin']);
        else if (type === 'doctor') this.router.navigate(['/doctor']);
        else this.errorMessage = 'Unknown user type.';
      },
      error: (err) => {
        this.isLoading = false;
        if (err.status === 401) this.errorMessage = 'Invalid email or password.';
        else if (err.status === 0) this.errorMessage = 'Cannot connect to server.';
        else this.errorMessage = 'Login failed. Please try again.';
      }
    });
  }

  togglePassword(): void { this.showPassword = !this.showPassword; }
}
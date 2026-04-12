import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
<<<<<<< HEAD
  styleUrl: './register.css'
})
export class Register {

=======
  styleUrl: './register.css',
})
export class Register {
>>>>>>> origin/Admin-dashboard
  fullName = '';
  age = '';
  phone = '';
  email = '';
  password = '';
  confirmPassword = '';
  gender = '';
  address = '';
  imagePreview: string | null = null;
  isLoading = false;
  errorMessage = '';
  showPassword = false;
  showConfirm = false;

<<<<<<< HEAD
  constructor(private http: HttpClient, private router: Router) {}
=======
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}
  selectedFile: File | null = null;

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }
>>>>>>> origin/Admin-dashboard

  onRegister(): void {
    this.errorMessage = '';

<<<<<<< HEAD
    if (!this.fullName) { this.errorMessage = 'Please enter your full name.'; return; }
    if (!this.age) { this.errorMessage = 'Please enter your age.'; return; }
    if (!this.phone) { this.errorMessage = 'Please enter your phone number.'; return; }
    if (!this.email) { this.errorMessage = 'Please enter your email.'; return; }
    if (!this.password) { this.errorMessage = 'Please enter a password.'; return; }
    if (this.password.length < 6) { this.errorMessage = 'Password must be at least 6 characters.'; return; }
    if (this.password !== this.confirmPassword) { this.errorMessage = 'Passwords do not match.'; return; }
=======
    if (!this.fullName) {
      this.errorMessage = 'Please enter your full name.';
      return;
    }
    if (!this.age) {
      this.errorMessage = 'Please enter your age.';
      return;
    }
    if (!this.phone) {
      this.errorMessage = 'Please enter your phone number.';
      return;
    }
    if (!this.email) {
      this.errorMessage = 'Please enter your email.';
      return;
    }
    if (!this.password) {
      this.errorMessage = 'Please enter a password.';
      return;
    }
    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters.';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }
>>>>>>> origin/Admin-dashboard

    this.isLoading = true;

    const body = {
      name: this.fullName,
      age: this.age,
      phone: this.phone,
      email: this.email,
      password: this.password,
<<<<<<< HEAD
      user_type: 'Patient'
    };

    this.http.post<any>('http://localhost:3000/api/register', body).subscribe({
=======
      gender: this.gender,
      address: this.address,
      image: this.imagePreview,
    };

    const fd = new FormData();

    fd.append('name', this.fullName);
    fd.append('age', this.age);
    fd.append('phone', this.phone);
    fd.append('email', this.email);
    fd.append('password', this.password);
    fd.append('gender', this.gender);
    fd.append('address', this.address);

    if (this.selectedFile) {
      fd.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.http.post<any>('http://localhost:3000/user/register', fd).subscribe({
>>>>>>> origin/Admin-dashboard
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading = false;
        if (err.status === 0) this.errorMessage = 'Cannot connect to server.';
<<<<<<< HEAD
        else if (err.status === 409) this.errorMessage = 'Email already registered.';
        else this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
      }
    });
  }

  togglePassword(): void { this.showPassword = !this.showPassword; }
  toggleConfirm(): void { this.showConfirm = !this.showConfirm; }
=======
        else if (err.status === 409)
          this.errorMessage = 'Email already registered.';
        else
          this.errorMessage =
            err.error?.message || 'Registration failed. Please try again.';
      },
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
  toggleConfirm(): void {
    this.showConfirm = !this.showConfirm;
  }
>>>>>>> origin/Admin-dashboard

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.imagePreview = null;
  }
}

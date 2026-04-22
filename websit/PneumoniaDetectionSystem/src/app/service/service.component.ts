import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-service',
  standalone: false,
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {

  selectedFile: File | null = null;
  result: any = null;
  loading = false;
  error = '';

  resultForm: any = null;
  loadingForm = false;
  errorForm = '';

  symptoms = {
    
  };

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadXRay() {
    if (!this.selectedFile) return;

    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + token });

    const formData = new FormData();
    formData.append('image', this.selectedFile);

    this.loading = true;
    this.error = '';
    this.result = null;

    this.http.post('http://127.0.0.1:3000/predict/image', formData, { headers })
      .subscribe({
        next: (res: any) => {
          this.result = res;
          this.loading = false;
        },
        error: () => {
          this.error = 'Something went wrong. Please try again.';
          this.loading = false;
        }
      });
  }

  submitSymptoms() {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    });

    this.loadingForm = true;
    this.errorForm = '';
    this.resultForm = null;

    this.http.post('http://127.0.0.1:3000/predict/form', this.symptoms, { headers })
      .subscribe({
        next: (res: any) => {
          this.resultForm = res;
          this.loadingForm = false;
        },
        error: () => {
          this.errorForm = 'Something went wrong. Please try again.';
          this.loadingForm = false;
        }
      });
  }
}

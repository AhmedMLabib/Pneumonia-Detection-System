import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-create-doctor',
  standalone: false,
  templateUrl: './create-doctor.html',
  styleUrl: './create-doctor.css',
})
export class CreateDoctor {
  doctorForm!: FormGroup;
  selectedFile: File | null = null; 
  constructor(
    private fb: FormBuilder,
    private _admin_ser: AdminService,
  ) {}

  ngOnInit(): void {
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(80)]],
      phone: ['', [Validators.required, Validators.pattern(/^01[0-9]{9}$/)]],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      image: [null, Validators.required],
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.doctorForm.get(controlName);
    return !!(control && control.invalid && control.touched);
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit() {
    if (this.doctorForm.valid) {
      const fd = new FormData();
      Object.keys(this.doctorForm.controls).forEach((key) => {
        if (key !== 'image') {
          fd.append(key, this.doctorForm.get(key)?.value);
        }
      });

      if (this.selectedFile) {
        fd.append('image', this.selectedFile, this.selectedFile.name);
      }

      this._admin_ser.create_doctor(fd).subscribe({
        next: (res) => {
          alert('Doctor Created Successfully!');
          this.doctorForm.reset();
          this.selectedFile = null;
        },
        error: (err) => {
          console.error(err);
          alert('Error creating doctor');
        },
      });
    } else {
      this.doctorForm.markAllAsTouched();
    }
  }
}

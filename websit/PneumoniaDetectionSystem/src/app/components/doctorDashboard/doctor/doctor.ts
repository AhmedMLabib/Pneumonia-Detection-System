import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../../services/doctor.service';
import { Router } from '@angular/router';
import { Patient } from '../../../interface/patient';

@Component({
  selector: 'app-doctor',
  standalone: false,
  templateUrl: './doctor.html',
  styleUrl: './doctor.css',
})
export class Doctor implements OnInit{

  constructor(private doctorService: DoctorService, private router: Router){}


  

  patients: Patient[] = [];
  filteredPatients: Patient[] = [];
  paginatedPatients: Patient[] = [];
  searchTerm = '';

  ngOnInit(){

    this.loadPatients();
    this.updatePage();
    console.log('doctor Loaded');
    console.log('TOKEN:', localStorage.getItem('token'));
    console.log('TYPE:', localStorage.getItem('user_type'));
  }

  loadPatients() {
    this.doctorService.getPatients().subscribe({
      next: (data) => {
        console.log(data)
        this.patients = data;
        this.filteredPatients = data;

        this.totalPages = Math.ceil(this.filteredPatients.length / this.pageSize);

        this.updatePagination();
        this.updatePaginatedPatients();
      },
      error: (err) => {
        console.error('Error loading patients:', err);
        this.patients = [];
      }
    });
  }

  goToHistory(patient: Patient) {
    this.router.navigate(['/patient-history', patient.id], {
      state: { patient }
    });
  }

  currentPage = 1;
  totalPages = 0;
  pageSize = 5;
  visiblePages: number[] = [];
  static_url = 'http://127.0.0.1:3000/media/uploads/';

  

  updatePaginatedPatients() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;

    this.paginatedPatients = this.filteredPatients.slice(start, end);
  }
  updatePagination() {
    const pages = [];

    const start = Math.max(2, this.currentPage - 1);
    const end = Math.min(this.totalPages - 1, this.currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    this.visiblePages = pages;
  }
  updatePage(){
    const pages = [];

    const start = Math.max(2, this.currentPage - 1);
    const end = Math.min(this.totalPages - 1, this.currentPage + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    this.visiblePages = pages;
  }

  changePage(page: number) {
    if(page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePage();
  }

  onSearch(value: string) {
    this.searchTerm = value.toLowerCase().trim();
    if (!this.searchTerm) {
      this.filteredPatients = [...this.patients];
    } else {
      this.filteredPatients = this.patients.filter(patient =>
        patient.name.toLowerCase().includes(this.searchTerm)
      );
    }

    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredPatients.length / this.pageSize) || 1;
    this.updatePagination();
    this.updatePaginatedPatients();
  }
  
}

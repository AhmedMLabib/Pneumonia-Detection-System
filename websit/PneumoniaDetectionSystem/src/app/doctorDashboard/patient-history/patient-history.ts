import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../../services/doctor.service';
import { Report } from '../../interface/report';

@Component({
  selector: 'app-patient-history',
  standalone: false,
  templateUrl: './patient-history.html',
  styleUrl: './patient-history.css',
})
export class PatientHistory implements OnInit{

  reports: Report[]=[]
  patientId!: number;
  patient:any;

  constructor(
      private route: ActivatedRoute,
      private doctorService: DoctorService
    ) {
      this.patient = history.state.patient;
    }

  backendUrl = 'http://localhost:3000';

    getImageUrl(image: string | null): string {
      if (!image) return '';

      const normalized = image.replace(/\\/g, '/');

      return `http://localhost:3000/${normalized}`;
    }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.patientId = +params['id'];
      this.loadReports();

      // fallback لو مفيش state
      if (!this.patient) {
        this.patient = {
          name: 'Unknown',
          age: '',
          email: ''
        };
      }
    });
  }

  loadReports(){
    this.doctorService.getReports(this.patientId).subscribe(data =>{
      this.reports = data.histories;
    });
  }
}

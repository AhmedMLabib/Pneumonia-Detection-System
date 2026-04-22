import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../../../services/doctor.service';
import { Report } from '../../../interface/report';
@Component({
  selector: 'app-patient-history',
  standalone: false,
  templateUrl: './patient-history.html',
  styleUrl: './patient-history.css',
})
export class PatientHistory implements OnInit{

  reports!: Report[];
  patientId!: number;
  patient:any;

  constructor(
      private route: ActivatedRoute,
      private doctorService: DoctorService
    ) {
      this.patient = history.state.patient;
    }

  static_url = 'http://127.0.0.1:3000/media/uploads/';
  report_static_url = 'http://127.0.0.1:3000/media/reports/';

    

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
      console.log(data);
      this.reports = data.histories;
    });
  }
}

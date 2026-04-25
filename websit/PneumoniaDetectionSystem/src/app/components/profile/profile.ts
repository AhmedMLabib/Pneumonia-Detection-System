import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { UserService, UserInfo } from '../../services/user.service';
import { Report } from '../../interface/report';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  userInfo!: UserInfo;
  histories: Report[] = [];
  reports: Report[] = [];
  isLoading = true;
  errorMessage = '';
  showAllHistory = false;
  showAllReports = false;

  constructor(
    private userService: UserService,
    private auth: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.userService.getUserInfo().subscribe({
      next: (info) => {
        this.userInfo = info;
        this.histories = info.histories || [];
        this.reports = this.histories.filter((h) => h.report_url);
        this.isLoading = false;
      },
      error: (err) => {
        if (err.status === 401) {
          this.auth.logout();
        } else {
          this.errorMessage = 'Failed to load profile. Please try again.';
        }
        this.isLoading = false;
      },
    });
  }

  get displayedHistories(): Report[] {
    return this.showAllHistory ? this.histories : this.histories.slice(0, 2);
  }

  get displayedReports(): Report[] {
    return this.showAllReports ? this.reports : this.reports.slice(0, 2);
  }

  toggleHistory(): void {
    this.showAllHistory = !this.showAllHistory;
  }

  toggleReports(): void {
    this.showAllReports = !this.showAllReports;
  }

  onEditProfile(): void {
    this.router.navigate(['/edit-profile']);
  }

  onDownloadReport(reportUrl: string): void {
    window.open(`http://localhost:3000/${reportUrl}`, '_blank');
  }

  onViewAssessment(id: number): void {
    this.router.navigate(['/assessment', id]);
  }

  onLogout(): void {
    this.auth.logout();
  }

  getProfileImage(): string {
    if (this.userInfo?.image) {
      return `http://localhost:3000/${this.userInfo.image}`;
    }
    return '/logo.png';
  }

  getDiagnosisClass(diagnosis: string): string {
    return diagnosis?.toLowerCase().includes('pneumonia')
      ? 'text-danger fw-semibold'
      : 'text-success fw-semibold';
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }
}

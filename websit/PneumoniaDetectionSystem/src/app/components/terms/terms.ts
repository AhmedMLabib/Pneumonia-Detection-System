import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terms',
  standalone: false,
  templateUrl: './terms.html',
  styleUrl: './terms.css'
})
export class Terms {

  constructor(private authService: Auth, private router: Router) {}

  onAccept(): void {
    this.router.navigate(['/register']);
  }

  onDecline(): void {
    this.router.navigate(['/login']);
  }
}

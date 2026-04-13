import { Component } from '@angular/core';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  constructor(private authServ:Auth){};
    logout(){
      this.authServ.logout();
    }
}

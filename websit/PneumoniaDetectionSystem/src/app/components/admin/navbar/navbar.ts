import { Component } from '@angular/core';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(private authServ:Auth){};
  logout(){
    this.authServ.logout();
  }
}

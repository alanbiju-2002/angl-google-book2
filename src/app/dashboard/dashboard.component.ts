import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

import { BookListComponent } from "../component/book-list/book-list.component";


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,  BookListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout() {
    this.authService.clearAuthToken();
    this.router.navigate(['/login']);
  }
}

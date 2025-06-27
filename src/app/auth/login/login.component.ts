import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  // Get users from localStorage (includes both default and newly registered users)
  private getStoredUsers(): any[] {
    const usersStr = localStorage.getItem('registeredUsers');
    return usersStr ? JSON.parse(usersStr) : [
      // Default users for testing
      { id: 1, fullName: 'Test User', emailId: 'user@example.com', password: 'password123', createdAt: new Date().toISOString() },
      { id: 2, fullName: 'Admin User', emailId: 'admin@example.com', password: 'admin123', createdAt: new Date().toISOString() },
      { id: 3, fullName: 'Test Account', emailId: 'test@test.com', password: 'test123', createdAt: new Date().toISOString() }
    ];
  }

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const loginData = this.loginForm.value;

      // Simulate API call with setTimeout
      setTimeout(() => {
        // Get all registered users from localStorage
        const allUsers = this.getStoredUsers();
        
        // Check if user exists in stored data
        const user = allUsers.find(
          u => u.emailId === loginData.emailId && u.password === loginData.password
        );

        this.isLoading = false;

        if (user) {
          // Simulate successful login
          this.successMessage = 'Login successful! Redirecting...';
          
          // Store user info in localStorage (for demo purposes)
          localStorage.setItem('currentUser', JSON.stringify({
            id: user.id,
            fullName: user.fullName,
            emailId: user.emailId,
            isLoggedIn: true,
            loginTime: new Date().toISOString()
          }));

          // Redirect after 1.5 seconds
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 1500);
        } else {
          this.errorMessage = 'Invalid email or password. Please try again.';
        }
      }, 1500); // Simulate network delay
    }
  }

  // Method to get current user (for other components to use)
  static getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Method to logout (for other components to use)
  static logout() {
    localStorage.removeItem('currentUser');
  }
}
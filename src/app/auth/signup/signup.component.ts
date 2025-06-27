import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiResponse, AuthService, SignupRequest } from '../../services/auth.service';


@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const formValue = this.signupForm.value;

      // Simulate API call with setTimeout
      setTimeout(() => {
        // Check if email already exists in localStorage
        const existingUsers = this.getStoredUsers();
        const emailExists = existingUsers.some(user => user.emailId === formValue.emailId);

        this.isLoading = false;

        if (emailExists) {
          this.errorMessage = 'An account with this email already exists.';
        } else {
          // Create new user and store in localStorage
          const newUser = {
            id: Date.now(), // Simple ID generation
            fullName: formValue.fullName,
            emailId: formValue.emailId,
            password: formValue.password, // In real app, this should be hashed
            createdAt: new Date().toISOString()
          };

          // Add to existing users
          existingUsers.push(newUser);
          localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

          this.successMessage = 'Account created successfully! Redirecting to login...';
          
          // Redirect to login page after 2 seconds
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        }
      }, 1500); // Simulate network delay
    }
  }

  private getStoredUsers(): any[] {
    const usersStr = localStorage.getItem('registeredUsers');
    return usersStr ? JSON.parse(usersStr) : [
      // Default users for testing
      { id: 1, fullName: 'Test User', emailId: 'user@example.com', password: 'password123', createdAt: new Date().toISOString() },
      { id: 2, fullName: 'Admin User', emailId: 'admin@example.com', password: 'admin123', createdAt: new Date().toISOString() },
      { id: 3, fullName: 'Test Account', emailId: 'test@test.com', password: 'test123', createdAt: new Date().toISOString() }
    ];
  }

  // Static method to get all registered users (for other components to use)
  static getAllUsers() {
    const usersStr = localStorage.getItem('registeredUsers');
    return usersStr ? JSON.parse(usersStr) : [];
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginRequest {
  emailId: string;
  password: string;
}

export interface SignupRequest {
  userId: number;
  emailId: string;
  fullName: string;
  password: string;
}

export interface ApiResponse {
  success?: boolean;
  message?: string;
  data?: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://api.freeprojectapi.com/api/UserApp';

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/login`, credentials);
  }

  signup(userData: SignupRequest): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/CreateNewUser`, userData);
  }

  // Helper method to check if user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Helper method to store auth token
  setAuthToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Helper method to clear auth token
  clearAuthToken(): void {
    localStorage.removeItem('authToken');
  }
}

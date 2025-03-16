import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  verified: boolean;  // Correspond à la propriété envoyée par l'API
  loggedIn: boolean;   // Correspond à la propriété envoyée par l'API
  verificationToken: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private baseUrl = 'http://localhost:8080/api/auth';
  private adminURL = 'http://localhost:8080/api/admin';
  constructor(private http: HttpClient,private router: Router) { }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials)
      .pipe(
        catchError((error: any) => throwError(error)) // Handle error appropriately
      );
  }
  loginAdmin(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.adminURL}/login`, credentials)
      .pipe(
        catchError((error: any) => throwError(error)) // Handle error appropriately
      );
  }

  register(user: { firstName: string, lastName: string, email: string, password: string, confirmPassword: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, user)
      .pipe(
        catchError((error: any) => throwError(error)) // Handle error appropriately
      );
  }

  verifyEmail(token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/verify?token=${token}`)
      .pipe(
        catchError((error: any) => throwError(error)) // Handle error appropriately
      );
  }
  /*logout(): void {
    // Clear user authentication data (e.g., tokens)
    localStorage.removeItem('authToken');
    // Redirect to the landing page
    this.router.navigate(['/home']);
  }*/
  // Méthode pour la déconnexion
  logout(userId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, { userId }, { responseType: 'json' });
  }
}

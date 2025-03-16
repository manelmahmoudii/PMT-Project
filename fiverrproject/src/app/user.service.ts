import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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
export class UserService {
  
  private baseUrl = 'http://localhost:8080/api/user';
  constructor(private http: HttpClient,private router: Router) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/AddUser`, user);
  }
  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/update/${id}`, user);
  }
  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  getCurrentUser(): User {
    // Cette méthode devrait retourner l'utilisateur connecté
    // Par exemple, à partir du local storage ou d'un service d'authentification
    return JSON.parse(localStorage.getItem('currentUser')!); // Exemple d'utilisation du localStorage
  }
  searchUsersByName(firstname: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/search?firstname=${firstname}`);
 }
}

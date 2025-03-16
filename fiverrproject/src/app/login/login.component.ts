import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-in-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  isAdminLogin: boolean = false; // Variable pour gérer le mode de connexion admin

  constructor(
    private fb: FormBuilder,
    private authentificationService: AuthentificationService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Utilisé pour la connexion utilisateur
      username: [''], // Utilisé pour la connexion admin
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/.*[0-9].*/)]],
    });
  }

  ngOnInit() { }

  submit() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      if (credentials.email.includes('admin')) {
        this.authentificationService.loginAdmin(credentials).subscribe(
          response => {
            console.log('Admin login successful', response);
            localStorage.setItem('currentAdmin', JSON.stringify(response.admin));
            this.router.navigate(['/admin-dashboard']);
          },
          error => {
            console.log('Admin login failed', error);
            this.errorMessage = 'Admin login failed. Please check your credentials.';
          }
        );
      } else {
        this.authentificationService.login(credentials).subscribe(
          response => {
            console.log('User login successful', response);
            localStorage.setItem('currentUser', JSON.stringify(response.user));
            this.router.navigate(['/user-dashboard']);
          },
          error => {
            console.log('User login failed', error);
            this.errorMessage = 'User login failed. Please check your credentials.';
          }
        );
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
    
  }
}

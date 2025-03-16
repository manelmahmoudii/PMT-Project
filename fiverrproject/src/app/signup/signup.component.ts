import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from '../authentification.service';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-in-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  showPassword = false;
  showConfirmPassword = false;

  constructor(private fb: FormBuilder, private authentificationService: AuthentificationService, private router: Router) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/.*[0-9].*/)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void { }

  passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('password')!;
    const confirmPassword = form.get('confirmPassword')!;
    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { 'passwordMismatch': true };
    } else {
      confirmPassword.setErrors(null);
      return null;
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  submit(): void {
    if (this.signupForm.valid) {
      const { firstName, lastName, email, password, confirmPassword } = this.signupForm.value;
      this.authentificationService.register({ firstName, lastName, email, password, confirmPassword }).subscribe(
        response => {
          this.successMessage = 'Un email de vérification a été envoyé. Veuillez vérifier votre boîte de réception.';
          this.errorMessage = null;
        },
        error => {
          this.errorMessage = error.error.message || 'Une erreur est survenue. Veuillez réessayer.';
          this.successMessage = null;
        }
      );
    }
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '../authentification.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-ajouteruser',
  templateUrl: './ajouteruser.component.html',
  styleUrls: ['./ajouteruser.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-in-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class AjouteruserComponent {
  newUser: User = {
    firstName: '', // Remplacez par les données réelles
    lastName: '',
    email: '',
    verified: false,
    loggedIn: false,
    id: 0,
    password: '',
    verificationToken: ''
  };
  constructor(    private userService: UserService, private router: Router
  ) {}
  @Output() goBackEvent = new EventEmitter<void>(); // Événement pour revenir à la liste des utilisateurs

  onSubmit() {
    
    // Appel au service pour créer un nouvel utilisateur
    this.userService.createUser(this.newUser).subscribe(
      (response) => {
        console.log('User added successfully', response);
        // Réinitialiser le formulaire si nécessaire
        this.resetForm();
      },
      (error) => {
        console.error('Error adding user', error);
      }
    );
  }

  // Méthode pour réinitialiser le formulaire après soumission
  resetForm() {
    this.newUser = {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      verified: false,
      loggedIn: false,
      verificationToken: ''
    };
  }

  onUser() {
    // Émettre l'événement pour indiquer qu'on veut afficher le formulaire
    this.goBackEvent.emit();
    this.router.navigate(['/admin-dashboard']) ; }

}


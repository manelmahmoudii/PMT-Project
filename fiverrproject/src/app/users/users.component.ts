import { Component, EventEmitter, Output } from '@angular/core';
import { AuthentificationService, User } from '../authentification.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-in-out', style({ opacity: 1 })),
      ]),
    ]),
  ],

})
export class UsersComponent {
  users: User[] = [];
  searchTerm: string = '';  // Terme de recherche
  constructor(    private userService: UserService, private router: Router
  ) {}


  ngOnInit() {
    this.loadUsers();
  }

  // Méthode pour récupérer les utilisateurs
  loadUsers() {
    this.userService.getUsers().subscribe((data: User[]) => {
      console.log(data);  // Vérifie le format des données reçues
      this.users = data;
    });
  
  }
  onSearch() {
    if (this.searchTerm) {
       this.userService.searchUsersByName(this.searchTerm).subscribe((data: User[]) => {
          this.users = data; // Mettre à jour la liste des utilisateurs avec les résultats de la recherche
       });
    } else {
       this.loadUsers(); // Si le champ de recherche est vide, recharger tous les utilisateurs
    }
 }

  
  navigateToAddUser() {
    this.router.navigate(['/ajouteruser']);
  }
  @Output() addUserEvent = new EventEmitter<void>();
  @Output() EditUserEvent = new EventEmitter<any>();

  onAddUser() {
    // Émettre l'événement pour indiquer qu'on veut afficher le formulaire
    this.addUserEvent.emit();
  }
  onEditContact(users: User) {
    // Émettre l'événement pour indiquer qu'on veut afficher le formulaire
    this.EditUserEvent.emit(users);
  }
  onDeleteUser(id: number) {
    if (confirm('Are you sure you want to delete this users?')) {
      this.userService.deleteContact(id).subscribe(() => {
        // Filtre la liste des contacts après suppression
        this.users = this.users.filter(users => users.id !== id);
      }, error => {
        console.error('Error deleting contact', error);
      });
    }
  }

}
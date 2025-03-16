import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../user.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-modifieruser',
  templateUrl: './modifieruser.component.html',
  styleUrls: ['./modifieruser.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-in-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class ModifieruserComponent {
  Users: any[] = [];
  @Input() selectedUser: any; // Recevoir le contact sélectionné
  @Output() UserUpdated = new EventEmitter<void>();
  @Output() goBackEvent = new EventEmitter<void>();
  constructor(private userService: UserService) { } 
  onEditUser(user: any) {
    this.selectedUser = { ...user }; // Clone the selected contact to avoid immediate changes
  }
  onUpdateUser() {
    console.log('Updating contact:', this.selectedUser); // Vérifiez le contenu de selectedContact
    if (!this.selectedUser || !this.selectedUser.id) {
      console.error('Selected contact is invalid', this.selectedUser);
      return; // Sortir si selectedContact est invalide
    }
    
    this.userService.updateUser(this.selectedUser.id, this.selectedUser)
      .subscribe(updatedUser => {
        // Met à jour la liste des contacts avec les nouvelles informations
        const index = this.Users.findIndex(c => c.id === updatedUser.id);
        if (index !== -1) {
          this.Users[index] = updatedUser;
        }
        this.selectedUser = null; // Cacher le formulaire après la mise à jour
        this.UserUpdated.emit(); // Émettre un événement pour notifier le parent
      }, error => {
        console.error('Error updating contact', error);
      });
  
  }
  onUser() {
    // Émettre l'événement pour indiquer qu'on veut afficher le formulaire
    this.goBackEvent.emit();
    }
}

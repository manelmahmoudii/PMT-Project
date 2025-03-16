import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { ProjectsService } from '../projects.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-modifierprojet',
  templateUrl: './modifierprojet.component.html',
  styleUrls: ['./modifierprojet.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-in-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class ModifierprojetComponent {
  projects: any[] = [];
  @Input() selectedprojects: any; // Recevoir le contact sélectionné
  @Output() projectUpdated = new EventEmitter<void>();
  @Output() goBackEvent = new EventEmitter<void>();
  constructor(private projectService: ProjectsService,private http: HttpClient) {}
 
  onEditProject(projects: any) {
    this.selectedprojects= { ...projects }; // Clone the selected contact to avoid immediate changes
  }
  onUpdateProject() {
    console.log('Updating contact:', this.selectedprojects); // Vérifiez le contenu de selectedContact
    if (!this.selectedprojects || !this.selectedprojects.id) {
      console.error('Selected contact is invalid', this.selectedprojects);
      return; // Sortir si selectedContact est invalide
    }
    
    this.projectService.updateProject(this.selectedprojects.id, this.selectedprojects)
      .subscribe(updatedProject => {
        // Met à jour la liste des contacts avec les nouvelles informations
        const index = this.projects.findIndex(c => c.id === updatedProject.id);
        if (index !== -1) {
          this.projects[index] = updatedProject;
        }
        this.selectedprojects = null; // Cacher le formulaire après la mise à jour
        this.projectUpdated.emit(); // Émettre un événement pour notifier le parent
      }, error => {
        console.error('Error updating contact', error);
      });
  
  }
  onProject() {
    // Émettre l'événement pour indiquer qu'on veut afficher le formulaire
    this.goBackEvent.emit();
    }
}

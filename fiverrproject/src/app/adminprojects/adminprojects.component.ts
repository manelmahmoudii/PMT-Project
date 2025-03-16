import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Project, ProjectsService } from '../projects.service';
import { HttpClient } from '@angular/common/http';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-adminprojects',
  templateUrl: './adminprojects.component.html',
  styleUrls: ['./adminprojects.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-in-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class AdminprojectsComponent implements OnInit {
  projects: Project[] = [];
  newProject: Project = { 
    id:0,
    name: '', 
    description: '', 
    startDate: '', 
    endDate: '', 
    tasks: [] // Initialisez tasks comme un tableau vide
  };
  selectedFile: File | null = null;
  constructor(private projectService: ProjectsService,private http: HttpClient) {}

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.projectService.getProjects().subscribe(
      (data: Project[]) => {
        this.projects = data;
        console.log(this.projects); // Vérifiez ici la sortie des données
      },
      (error) => {
        console.error('Erreur lors de la récupération des projets:', error);
      }
    );
  }
  @Output() addProjectEvent = new EventEmitter<void>();
  @Output() EditProjectEvent = new EventEmitter<any>();

  onAddProject() {
    // Émettre l'événement pour indiquer qu'on veut afficher le formulaire
    this.addProjectEvent.emit();
  }
  onEditProject(project: Project) {
    // Émettre l'événement pour indiquer qu'on veut afficher le formulaire
    this.EditProjectEvent.emit(project);
  }

  onDeleteProject(id: number) {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.projectService.deleteContact(id).subscribe(() => {
        // Filtre la liste des contacts après suppression
        this.projects = this.projects.filter(contact => contact.id !== id);
      }, error => {
        console.error('Error deleting contact', error);
      });
    }
  }
  

}
import { Component, EventEmitter, Output } from '@angular/core';
import { Project, ProjectsService } from '../projects.service';
import { HttpClient } from '@angular/common/http';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-ajouterprojet',
  templateUrl: './ajouterprojet.component.html',
  styleUrls: ['./ajouterprojet.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-in-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class AjouterprojetComponent {
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
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.newProject.name);
    formData.append('description', this.newProject.description);
    formData.append('startDate', this.newProject.startDate);
    formData.append('endDate', this.newProject.endDate);
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    this.http.post<Project>('http://localhost:8080/api/projects', formData)
      .subscribe((response) => {
        this.projects.push(response);
        this.newProject = {id:0, name: '', description: '', startDate: '', endDate: '' ,tasks: [] };
        this.selectedFile = null;
      });
  }
  @Output() goBackEventt = new EventEmitter<void>(); 
  onProject() {
    // Émettre l'événement pour indiquer qu'on veut afficher le formulaire
    this.goBackEventt.emit();
    }

}

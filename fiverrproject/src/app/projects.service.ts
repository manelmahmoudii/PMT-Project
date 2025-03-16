import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
export interface Task {
  id: number;
  
  title: string;
  status: string;
  user: {
    id:number;
    firstName: string;
    lastName: string;
  };
  
}

export interface Project {
  id: number;
  name: string;
  description: string;
  startDate: string; // Utilisation de string pour les dates au format ISO
  endDate: string;
  imageUrl?: string;
  tasks: Task[];
}
@Injectable({
  providedIn: 'root'
})

export class ProjectsService {
  
  private Url = 'http://localhost:8080/api/tasks';

  private apiUrl = 'http://localhost:8080/api/projects';
  constructor(private http: HttpClient, private userService: UserService) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  // Ajouter un nouveau projet
  addProject(project: Project, file: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', file); // Ajouter le fichier
    formData.append('project', JSON.stringify(project)); // Ajouter le projet

    return this.http.post<string>(`${this.apiUrl}`, formData);
  }
  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  updateProject(id: number, project: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, project);
  }
   // Récupérer un projet par son ID
   getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  createTask(task: Task, projectId: number): Observable<Task> {
    const currentUser = this.userService.getCurrentUser();
    const payload = {
      ...task,
      user: {
        id: currentUser.id,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName
      }
    };
    const params = {
      projectId: projectId.toString(),
      userId: currentUser.id.toString()
    };
    // Supprimer l'en-tête Content-Type
    return this.http.post<Task>(`${this.Url}/add`, payload, { headers, params });
}
  deleteTask(taskId: number, userId: number): Observable<void> {
    return this.http.delete<void>(`${this.Url}/${taskId}?userId=${userId}`);
  }
}

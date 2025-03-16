import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
export interface Task {
  id: number;
  title: string;
  status: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
  };
  project: { // Ajout de la propriété project
    id: number;
    name: string;
    description: string;
  };
}
@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private Url = 'http://localhost:8080/api/tasks';
  constructor(private http: HttpClient, private userService: UserService) { }
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.Url);
  }
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.Url}/delete/${id}`);
  }
  
  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.Url}/update/${id}`, task);
  }
}

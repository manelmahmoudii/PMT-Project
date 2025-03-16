import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Task, TaskService } from '../task.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { Project } from '../projects.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-in-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class TasksComponent {
  projects: Project[]= [];
  tasks: Task[] = [];
  @Output() EditTaskEvent = new EventEmitter<any>();
  constructor(private taskService: TaskService, private router: Router) {}
  ngOnInit() {
    this.loadTasks();
  }

  // Méthode pour récupérer les utilisateurs
  loadTasks() {
    this.taskService.getTasks().subscribe((data: Task[]) => {
      console.log(data);  // Vérifie le format des données reçues
      this.tasks = data;
    });
  
  }
  onEditTask(tasks: Task) {
    // Émettre l'événement pour indiquer qu'on veut afficher le formulaire
    this.EditTaskEvent.emit(tasks);
  }
  deleteTask(id: number) {
    // Demande de confirmation avant de supprimer
    const confirmation = window.confirm("Are you sure you want to delete this Task?");
    if (confirmation) {
      this.taskService.deleteTask(id).subscribe(
        () => {
        
          this.tasks = this.tasks.filter(tasks => tasks.id !== id);
          // Actualise la liste des tâches ou fait une action pour indiquer la suppression
        },
        (error) => {
          console.error('Erreur lors de la suppression de la tâche:', error);
          alert('Une erreur est survenue lors de la suppression de la tâche');
        }
      );
    }
  }

}

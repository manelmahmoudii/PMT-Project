import { Component } from '@angular/core';
import { Project, ProjectsService, Task } from '../projects.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-selectproject',
  templateUrl: './selectproject.component.html',
  styleUrls: ['./selectproject.component.css']
})
export class SelectprojectComponent {
  projects: Project[] = [];
  selectedProject: Project | null = null;
  taskTitle: string = '';
  taskStatus: string = '';
  constructor(private route: ActivatedRoute,public  projectService: ProjectsService,private userService: UserService) {}
  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!; // Utilisation de `+` pour convertir en nombre
    this.loadProjectDetails(id);
  }

  loadProjectDetails(id: number) {
    this.projectService.getProjectById(id).subscribe({
      next: (data: Project) => {
        this.selectedProject = data; // Assurez-vous que cela correspond à la structure de votre projet
      },
      error: (err) => {
        console.error('Erreur lors du chargement du projet :', err);
      }
    });
  }
  createNewTask() {
    if (this.selectedProject) {
      const newTask: Task = {
        id: 0,
        title: this.taskTitle,
        status: this.taskStatus,
        user: {
          id: this.userService.getCurrentUser().id, 
          firstName: this.userService.getCurrentUser().firstName,
          lastName: this.userService.getCurrentUser().lastName
        }
      };
  
      this.projectService.createTask(newTask, this.selectedProject!.id).subscribe({
        next: (task) => {
          console.log('Tâche créée:', task);
          this.taskTitle = ''; // Réinitialiser le champ de saisie
          this.taskStatus = ''; 
          this.selectedProject!.tasks.push(task); // Ajouter la tâche dans la liste des tâches du projet
        },
        error: (err) => {
          console.error('Erreur lors de la création de la tâche:', err);
        }
      });
    }
  }
   // Nouvelle méthode pour supprimer une tâche
   deleteTask(taskId: number) {
    const userId = this.userService.getCurrentUser().id;
    const taskToDelete = this.selectedProject?.tasks.find(task => task.id === taskId);

    // Vérifie si la tâche appartient à l'utilisateur
    if (taskToDelete && taskToDelete.user.id !== userId) {
      alert("You cannot delete this task because it does not belong to you.");
      return;
    }

    // Confirmation de suppression
    const confirmation = confirm("Are you sure you want to delete this task?");
    if (!confirmation) return;

    this.projectService.deleteTask(taskId, userId).subscribe({
      next: () => {
        console.log('Task deleted successfully');
        if (this.selectedProject) {
          this.selectedProject.tasks = this.selectedProject.tasks.filter(task => task.id !== taskId);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de la tâche:', err);
      }
    });
  }
}
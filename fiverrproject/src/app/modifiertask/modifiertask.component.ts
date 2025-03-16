import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-modifiertask',
  templateUrl: './modifiertask.component.html',
  styleUrls: ['./modifiertask.component.css']
})
export class ModifiertaskComponent {
  @Output() TaskUpdated = new EventEmitter<void>();
  @Input() selectedTask: any;
  
  Tasks: any[] = [];
  constructor(private taskService: TaskService) { } 

  onEditTask(task: any) {
    this.selectedTask = { ...task }; // Clone the selected contact to avoid immediate changes
  }
  onUpdateTask() {
    console.log('Updating contact:', this.selectedTask); // Vérifiez le contenu de selectedContact
    if (!this.selectedTask || !this.selectedTask.id) {
      console.error('Selected contact is invalid', this.selectedTask);
      return; // Sortir si selectedContact est invalide
    }
    
    this.taskService.updateTask(this.selectedTask.id, this.selectedTask)
      .subscribe(updatedTask => {
        // Met à jour la liste des contacts avec les nouvelles informations
        const index = this.Tasks.findIndex(c => c.id === updatedTask.id);
        if (index !== -1) {
          this.Tasks[index] = updatedTask;
        }
        this.selectedTask = null; // Cacher le formulaire après la mise à jour
        this.TaskUpdated.emit(); // Émettre un événement pour notifier le parent
      }, error => {
        console.error('Error updating contact', error);
      });
  
  }

}

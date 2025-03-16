import { Component, Input, OnInit } from '@angular/core';
import { AuthentificationService, User } from '../authentification.service';

@Component({
  selector: 'app-mainadmin',
  templateUrl: './mainadmin.component.html',
  styleUrls: ['./mainadmin.component.css']
})
export class MainadminComponent  {
  @Input() selectedComponent: string = 'home'; 
  showAddProjectForm: boolean = false;
  showProjectForm: boolean  = false;
  showEditProjectsForm:boolean  = false;
  selectedprojects: any; 

  selectedTask: any; 
  showTaskForm: boolean  = false;
  showEditTasksForm:boolean  = false;

  showAddUserForm: boolean = false;
  showUserForm: boolean  = false;
  showEditUsersForm:boolean  = false;
  selectedUser: any; 
  toggleEditTasksForm(task: any) {
    
    this.selectedTask = { ...task }; // Copie le contact à modifier

    this.showEditTasksForm = true; // Affiche le formulaire de modification
    // Cache le formulaire d'ajout
  }
  // Méthode pour afficher le formulaire d'ajout
  toggleAddUserForm() {
    this.showAddUserForm = true;
  }
  toggleAddProjectForm(){
    this.showProjectForm = false;
    this.showAddProjectForm = true;
  }
  toggleEditProjectsForm(contact: any) {
    
    this.selectedprojects = { ...contact }; // Copie le contact à modifier

    this.showEditProjectsForm = true; // Affiche le formulaire de modification
    this.showAddProjectForm = false; // Cache le formulaire d'ajout
  }
  onProjectUpdated() {
    this.showEditProjectsForm = false; // Masquer le formulaire de modification
    this.showProjectForm = true; // Afficher la liste des contacts
  }
  toggleEditUsersForm(contact: any) {
    this.selectedUser = { ...contact }; // Copie le contact à modifier
    this.showEditUsersForm = true; // Affiche le formulaire de modification
    this.showAddUserForm = false; // Cache le formulaire d'ajout
  }
  onUserUpdated() {
    this.showEditUsersForm = false; // Masquer le formulaire de modification
    this.showUserForm = true; // Afficher la liste des contacts
  }
  onTaskUpdated() {
    this.showEditTasksForm = false; // Masquer le formulaire de modification
    this.showTaskForm = true; // Afficher la liste des contacts
  }
  toggleProjectForm(){
    this.showAddProjectForm = false;
    this.showProjectForm = !this.showProjectForm; 
  }
  toggleUserForm() {
    this.showAddUserForm = false;
    this.showUserForm = !this.showUserForm; // Inverse l'état pour afficher/masquer le formulaire
  }
  
  
}

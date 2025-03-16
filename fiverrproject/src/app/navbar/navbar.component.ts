import { Component } from '@angular/core';
import { Project, ProjectsService } from '../projects.service';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  errorMessage: string | null = null;

  projects: Project[] = [];
  constructor(private projectService: ProjectsService, private authentificationservice: AuthentificationService, private router: Router) {}
  logout() {
    // Afficher une boîte de dialogue de confirmation
    const confirmLogout = window.confirm("Are you sure you want to log out?");

    if (confirmLogout) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        const userId = currentUser?.id;

        if (userId) {
            this.authentificationservice.logout(userId).subscribe(
                response => {
                    console.log('Déconnexion réussie :', response);
                    this.router.navigate(['/login']);
                },
                (error: HttpErrorResponse) => {
                    console.error('Échec de déconnexion :', error.message);
                    this.errorMessage = `Erreur de déconnexion : ${error.message}`;
                }
            );
        } else {
            this.router.navigate(['/login']);
        }
    } else {
        // Action à prendre si l'utilisateur annule la déconnexion
        console.log("Déconnexion annulée par l'utilisateur.");
    }
}
}

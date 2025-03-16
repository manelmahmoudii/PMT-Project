import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboardadmin',
  templateUrl: './dashboardadmin.component.html',
  styleUrls: ['./dashboardadmin.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-in-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class DashboardadminComponent {
  
  
  selectedComponent: string = 'home'; // Valeur initiale, peut être 'home', 'user', ou 'task'

  selectComponent(component: string) {
    this.selectedComponent = component;
  }

}

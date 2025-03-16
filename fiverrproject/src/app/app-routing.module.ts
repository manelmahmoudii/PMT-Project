import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardadminComponent } from './dashboardadmin/dashboardadmin.component';
import { AjouteruserComponent } from './ajouteruser/ajouteruser.component';
import { UsersComponent } from './users/users.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { SelectprojectComponent } from './selectproject/selectproject.component';
import { ContactComponent } from './contact/contact.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: 'signup', component: SignupComponent} ,
  {path: 'login', component: LoginComponent} ,
  {path: 'users', component: UsersComponent} ,
  {path: 'user-dashboard', component: UserdashboardComponent} ,
  {path: 'project-details/:id', component: SelectprojectComponent} ,
  {path: 'contact', component: ContactComponent} ,
  {path: 'admin-dashboard', component: DashboardadminComponent} ,
  {path: 'ajouteruser', component: AjouteruserComponent} ,
  {path: '', component: HomeComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

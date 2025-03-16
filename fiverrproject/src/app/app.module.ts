import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainadminComponent } from './mainadmin/mainadmin.component';
import { DashboardadminComponent } from './dashboardadmin/dashboardadmin.component';
import { UsersComponent } from './users/users.component';
import { AjouteruserComponent } from './ajouteruser/ajouteruser.component';
import { FormsModule } from '@angular/forms';
import { ModifieruserComponent } from './modifieruser/modifieruser.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactComponent } from './contact/contact.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { AdminprojectsComponent } from './adminprojects/adminprojects.component';
import { AjouterprojetComponent } from './ajouterprojet/ajouterprojet.component';
import { ModifierprojetComponent } from './modifierprojet/modifierprojet.component';
import { SelectprojectComponent } from './selectproject/selectproject.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TasksComponent } from './tasks/tasks.component';
import { ModifiertaskComponent } from './modifiertask/modifiertask.component';
import { HhhghgComponent } from './hhhghg/hhhghg.component';  // Importer FormsModule



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardadminComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    MainadminComponent,
    UsersComponent,
    AjouteruserComponent,
    ModifieruserComponent,
    ProjectsComponent,
    ContactComponent,
    UserdashboardComponent,
    AdminprojectsComponent,
    AjouterprojetComponent,
    ModifierprojetComponent,
    SelectprojectComponent,
    NavbarComponent,
    TasksComponent,
    ModifiertaskComponent,
    HhhghgComponent
 ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
      
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

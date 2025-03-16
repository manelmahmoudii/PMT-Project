package com.example.webservices.model;


import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class TaskDTO {
	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String title;
	    private String status;
	    private LocalDate dueDate;
	    
	  

	    @ManyToOne(fetch = FetchType.LAZY) // Changez en LAZY si vous ne voulez pas charger les projets à chaque fois
	    @JoinColumn(name = "project_id") // Clé étrangère pour le projet
	    @JsonBackReference // Côté "enfant" de la relation
	    private ProjectDTO project;
	    @ManyToOne
	    @JoinColumn(name = "user_id") // Clé étrangère pour le user
	    private Users user;

	    private boolean completed;


	 public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	 public LocalDate getDueDate() { // Changement ici
	        return dueDate; // Getter pour la date d'échéance
	    }

	    public void setDueDate(LocalDate dueDate) { // Changement ici
	        this.dueDate = dueDate; // Setter pour la date d'échéance
	    }
	public ProjectDTO  getProject() {
		return project;
	}

	public void setProject(ProjectDTO  project) {
		this.project = project;
	}
	 public Users getUser() { 
		 return user; }
	    public void setUser(Users user) {
	    	this.user = user; }
	    
	public boolean isCompleted() {
		return completed; }
	
    public void setCompleted(boolean completed) {
    	this.completed = completed; }

	}

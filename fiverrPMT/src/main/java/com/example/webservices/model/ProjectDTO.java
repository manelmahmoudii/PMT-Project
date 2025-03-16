package com.example.webservices.model;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class ProjectDTO  {
	  @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	  private String name;
	    private String description;
	    // Ajout des attributs pour les dates
	    private LocalDate startDate; // Date de début
	    private LocalDate endDate;   // Date de fin
	    private String imageUrl;
	    
	    
	    @OneToMany(mappedBy = "project",  fetch = FetchType.LAZY)
	    @JsonManagedReference 
	    @JsonBackReference
	    private List<TaskDTO> tasks;
	   
	    
	    
	    
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	
	  public LocalDate getEndDate() {
	        return endDate; // Getter pour la date de fin
	    }

	    public void setEndDate(LocalDate endDate) {
	        this.endDate = endDate; // Setter pour la date de fin
	    }
	    
	    
	  public LocalDate getStartDate() {
			return startDate;
		}

		public void setStartDate(LocalDate startDate) {
			this.startDate = startDate;
		}

		public String getImageUrl() {
	        return imageUrl;
	    }

	    public void setImageUrl(String imageUrl) {
	        this.imageUrl = imageUrl;
	    }


	public List<TaskDTO> getTasks() {
		return tasks;
	}

	public void setTasks(List<TaskDTO> tasks) {
		this.tasks = tasks;
	}

		
}

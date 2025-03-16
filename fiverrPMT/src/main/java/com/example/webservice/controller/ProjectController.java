package com.example.webservice.controller;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.webservice.repository.ProjectRepository;
import com.example.webservice.service.FileStorageService;
import com.example.webservice.service.ProjectService;
import com.example.webservices.model.ProjectDTO ;
import com.example.webservices.model.TaskDTO;
import java.util.Optional;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
	 @Autowired
	    private ProjectService projectService;
	 @Autowired
	    private ProjectRepository projectRepository;
	 @Autowired
	    private FileStorageService fileStorageService;
	 
	 
	// Endpoint pour téléverser une image
	 @PostMapping("/{projectId}/uploadimage")
	 public ResponseEntity<String> uploadImage(@PathVariable Long projectId, @RequestParam("file") MultipartFile file) {
	     // Vérifiez si le fichier est présent
	     if (file.isEmpty()) {
	         return ResponseEntity.badRequest().body("Le fichier est vide");
	     }

	     Optional<ProjectDTO> projectOptional = projectRepository.findById(projectId);
	     if (projectOptional.isPresent()) {
	         ProjectDTO project = projectOptional.get();
	         try {
	             String imagePath = fileStorageService.saveFile(file);
	             project.setImageUrl(imagePath);
	             projectRepository.save(project);
	             return ResponseEntity.ok("Image uploadée avec succès: " + imagePath);
	             
	         } catch (IOException e) {
	             e.printStackTrace();
	             return ResponseEntity.status(500).body("Erreur lors du téléversement de l'image");
	         }
	     } else {
	         return ResponseEntity.status(404).body("Projet non trouvé");
	     }
	 }

	 @GetMapping
	    public List<ProjectDTO> getAllProjects() {
	        return projectService.getAllProjects()
	                             .stream()
	                             .map(this::convertToDto)
	                             .collect(Collectors.toList());
	    }

	    private ProjectDTO convertToDto(ProjectDTO  project) {
	        ProjectDTO projectDto = new ProjectDTO();
	        projectDto.setId(project.getId());
	        projectDto.setName(project.getName());
	        projectDto.setDescription(project.getDescription());
	        projectDto.setStartDate(project.getStartDate());

	        projectDto.setEndDate(project.getEndDate());
	        // Ajoutez cette ligne pour inclure l'URL de l'image
	        projectDto.setImageUrl(project.getImageUrl());
	        List<TaskDTO> taskDtos = project.getTasks()
	                                        .stream()
	                                        .map(task -> {
	                                            TaskDTO taskDto = new TaskDTO();
	                                            taskDto.setId(task.getId());
	                                            taskDto.setTitle(task.getTitle());
	                                            taskDto.setStatus(task.getStatus());
	                                            taskDto.setDueDate(task.getDueDate());
	                                            return taskDto;
	                                        })
	                                        .collect(Collectors.toList());
	        projectDto.setTasks(taskDtos);
	        return projectDto;
	    }
	    @GetMapping("/{id}")
	    public ResponseEntity<ProjectDTO> getProjectById(@PathVariable Long id) {
	        ProjectDTO project = projectService.getProjectById(id);
	        if (project != null) {
	            return ResponseEntity.ok(project);
	        }
	        return ResponseEntity.notFound().build();
	    }

	    @PostMapping
	    public ResponseEntity<ProjectDTO> createProject(
	            @RequestParam("name") String name,
	            @RequestParam("description") String description,
	            @RequestParam("startDate") String startDate,
	            @RequestParam("endDate") String endDate,
	            @RequestParam(value = "file", required = false) MultipartFile file) {
	        ProjectDTO newProject = new ProjectDTO();
	        newProject.setName(name);
	        newProject.setDescription(description);
	        try {
	            newProject.setStartDate(LocalDate.parse(startDate));
	            newProject.setEndDate(LocalDate.parse(endDate));
	        } catch (Exception e) {
	            return ResponseEntity.badRequest().body(null);
	        }

	        // Si un fichier est fourni, essayez de l'enregistrer
	        if (file != null && !file.isEmpty()) {
	            try {
	                String imagePath = fileStorageService.saveFile(file);
	                newProject.setImageUrl(imagePath); // Assurez-vous que l'URL est correctement définie
	            } catch (IOException e) {
	                e.printStackTrace();
	                return ResponseEntity.status(500).body(null);
	            }
	        }

	        // Enregistrer le projet dans la base de données
	        ProjectDTO createdProject = projectService.createProject(newProject);
	        return ResponseEntity.ok(createdProject);
	    }


	    @PutMapping("/{id}")
	    public ProjectDTO  updateProject(@PathVariable Long id, @RequestBody ProjectDTO  project) {
	        return projectService.updateProject(id, project);
	    }

	    @DeleteMapping("/{id}")
	    public void deleteProject(@PathVariable Long id) {
	        projectService.deleteProject(id);
	    }
}
